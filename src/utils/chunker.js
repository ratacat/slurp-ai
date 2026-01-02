/**
 * Semantic chunking utility for RAG systems
 * Splits markdown content by headings while respecting token limits
 */

/**
 * Estimate token count (rough approximation: 1 token ≈ 4 characters)
 * @param {string} text - Text to estimate
 * @returns {number} Estimated token count
 */
function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

/**
 * Parse markdown into sections based on headings
 * @param {string} markdown - Markdown content
 * @returns {Array<{level: number, heading: string, content: string, startLine: number}>}
 */
function parseMarkdownSections(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let currentSection = null;
  let contentLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);

    if (headingMatch) {
      // Save previous section
      if (currentSection) {
        currentSection.content = contentLines.join('\n').trim();
        sections.push(currentSection);
      }

      // Start new section
      currentSection = {
        level: headingMatch[1].length,
        heading: headingMatch[2].trim(),
        content: '',
        startLine: i,
      };
      contentLines = [];
    } else if (currentSection) {
      contentLines.push(line);
    } else {
      // Content before first heading
      if (!currentSection && line.trim()) {
        currentSection = {
          level: 0,
          heading: '',
          content: '',
          startLine: 0,
        };
        contentLines.push(line);
      }
    }
  }

  // Save last section
  if (currentSection) {
    currentSection.content = contentLines.join('\n').trim();
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Build heading hierarchy for context
 * @param {Array} sections - Parsed sections
 * @param {number} index - Current section index
 * @returns {string} Heading hierarchy string
 */
function buildHeadingHierarchy(sections, index) {
  const currentLevel = sections[index].level;
  const hierarchy = [];

  // Walk backwards to find parent headings
  for (let i = index; i >= 0; i--) {
    const section = sections[i];
    if (section.level < currentLevel || i === index) {
      if (section.heading) {
        hierarchy.unshift({
          level: section.level,
          heading: section.heading,
        });
      }
    }
    // Stop at level 1 or 2 (major sections)
    if (section.level <= 1 && i !== index) break;
  }

  return hierarchy;
}

/**
 * Split text into overlapping chunks respecting sentence boundaries
 * @param {string} text - Text to split
 * @param {number} maxTokens - Maximum tokens per chunk
 * @param {number} overlapTokens - Overlap tokens between chunks
 * @returns {Array<string>} Array of text chunks
 */
function splitTextWithOverlap(text, maxTokens, overlapTokens) {
  if (estimateTokens(text) <= maxTokens) {
    return [text];
  }

  const chunks = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let currentChunk = [];
  let currentTokens = 0;

  for (const sentence of sentences) {
    const sentenceTokens = estimateTokens(sentence);

    if (currentTokens + sentenceTokens > maxTokens && currentChunk.length > 0) {
      // Save current chunk
      chunks.push(currentChunk.join(' '));

      // Start new chunk with overlap
      const overlapSentences = [];
      let overlapCount = 0;
      for (let i = currentChunk.length - 1; i >= 0 && overlapCount < overlapTokens; i--) {
        overlapSentences.unshift(currentChunk[i]);
        overlapCount += estimateTokens(currentChunk[i]);
      }

      currentChunk = overlapSentences;
      currentTokens = overlapCount;
    }

    currentChunk.push(sentence);
    currentTokens += sentenceTokens;
  }

  // Add remaining content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join(' '));
  }

  return chunks;
}

/**
 * Chunk markdown content for RAG systems
 * @param {string} markdown - Markdown content to chunk
 * @param {Object} options - Chunking options
 * @param {number} [options.maxTokens=1000] - Maximum tokens per chunk
 * @param {number} [options.overlapTokens=100] - Overlap tokens between chunks
 * @param {string} [options.sourceUrl=''] - Source URL for metadata
 * @param {string} [options.title=''] - Document title
 * @returns {Array<{id: string, content: string, metadata: Object}>} Array of chunks
 */
function chunkMarkdown(markdown, options = {}) {
  const {
    maxTokens = 1000,
    overlapTokens = 100,
    sourceUrl = '',
    title = '',
  } = options;

  const sections = parseMarkdownSections(markdown);
  const chunks = [];
  let chunkIndex = 0;

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const hierarchy = buildHeadingHierarchy(sections, i);

    // Build context header from hierarchy
    const contextHeader = hierarchy
      .map((h) => `${'#'.repeat(h.level || 1)} ${h.heading}`)
      .join('\n');

    // Combine heading with content
    const fullContent = section.heading
      ? `${'#'.repeat(section.level)} ${section.heading}\n\n${section.content}`
      : section.content;

    const contentTokens = estimateTokens(fullContent);

    if (contentTokens <= maxTokens) {
      // Section fits in one chunk
      chunks.push({
        id: `chunk_${chunkIndex++}`,
        content: fullContent,
        tokens: contentTokens,
        metadata: {
          sourceUrl,
          title,
          headingHierarchy: hierarchy.map((h) => h.heading).filter(Boolean),
          sectionHeading: section.heading || null,
          chunkType: 'section',
        },
      });
    } else {
      // Split large section into multiple chunks
      const textChunks = splitTextWithOverlap(
        section.content,
        maxTokens - estimateTokens(contextHeader) - 50, // Reserve space for context
        overlapTokens,
      );

      for (let j = 0; j < textChunks.length; j++) {
        const chunkContent = section.heading
          ? `${'#'.repeat(section.level)} ${section.heading}${j > 0 ? ' (continued)' : ''}\n\n${textChunks[j]}`
          : textChunks[j];

        chunks.push({
          id: `chunk_${chunkIndex++}`,
          content: chunkContent,
          tokens: estimateTokens(chunkContent),
          metadata: {
            sourceUrl,
            title,
            headingHierarchy: hierarchy.map((h) => h.heading).filter(Boolean),
            sectionHeading: section.heading || null,
            chunkType: j === 0 ? 'section_start' : 'section_continuation',
            partIndex: j,
            totalParts: textChunks.length,
          },
        });
      }
    }
  }

  return chunks;
}

/**
 * Chunk multiple markdown files
 * @param {Array<{content: string, url: string, title: string}>} files - Files to chunk
 * @param {Object} options - Chunking options
 * @returns {Array} All chunks from all files
 */
function chunkMultipleFiles(files, options = {}) {
  const allChunks = [];

  for (const file of files) {
    const fileChunks = chunkMarkdown(file.content, {
      ...options,
      sourceUrl: file.url,
      title: file.title,
    });

    // Add file-level metadata
    fileChunks.forEach((chunk, index) => {
      chunk.metadata.fileIndex = files.indexOf(file);
      chunk.metadata.chunkIndexInFile = index;
    });

    allChunks.push(...fileChunks);
  }

  // Add global chunk indices
  allChunks.forEach((chunk, index) => {
    chunk.globalIndex = index;
  });

  return allChunks;
}

/**
 * Export chunks to JSONL format (one JSON object per line)
 * @param {Array} chunks - Chunks to export
 * @returns {string} JSONL string
 */
function chunksToJsonl(chunks) {
  return chunks.map((chunk) => JSON.stringify(chunk)).join('\n');
}

/**
 * Export chunks to individual markdown files content
 * @param {Array} chunks - Chunks to export
 * @returns {Array<{filename: string, content: string}>} Files to write
 */
function chunksToMarkdownFiles(chunks) {
  return chunks.map((chunk) => {
    const frontmatter = [
      '---',
      `id: ${chunk.id}`,
      `tokens: ${chunk.tokens}`,
      `source_url: ${chunk.metadata.sourceUrl || ''}`,
      `title: ${chunk.metadata.title || ''}`,
      `section: ${chunk.metadata.sectionHeading || ''}`,
      `hierarchy: ${chunk.metadata.headingHierarchy?.join(' > ') || ''}`,
      `chunk_type: ${chunk.metadata.chunkType}`,
      '---',
      '',
    ].join('\n');

    return {
      filename: `${chunk.id}.md`,
      content: frontmatter + chunk.content,
    };
  });
}

export {
  chunkMarkdown,
  chunkMultipleFiles,
  chunksToJsonl,
  chunksToMarkdownFiles,
  estimateTokens,
  parseMarkdownSections,
};
