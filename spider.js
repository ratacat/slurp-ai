const axios = require('axios');

const API_KEY = 'sk-389f6034-020d-4384-a891-dd1b5cf61e5a';

async function runCrawl() {
  try {
    const response = await axios.post(
      'https://api.spider.cloud/crawl',
      {"limit":5,"return_format":"markdown","url":"https://www.reddit.com/r/LocalLLaMA/"},
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Execute the function
runCrawl();
