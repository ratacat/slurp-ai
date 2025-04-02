# Compiled Documentation

Generated on 2025-04-02T21:16:01.007Z

### docs

#### _docs.md

> Source: https://reactjs.org/docs
> Scraped: 4/2/2025, 3:15:56 PM

[](https://surveys.savanta.com/survey/selfserve/21e3/210643?list=2)We want to hear from you![Take our 2021 Community Survey!](https://surveys.savanta.com/survey/selfserve/21e3/210643?list=2)

This site is no longer updated.[Go to react.dev](https://react.dev/blog/2023/03/16/introducing-react-dev)

[![](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K)React](index.md)

[v18.2.0](_versions.md) [Languages](_languages.md)[GitHub](https://github.com/facebook/react/)

# Page Not Found

We couldn't find what you were looking for.

Please contact the owner of the site that linked you to the original URL and let them know their link is broken.

#### _docs_accessibility.html.md

> Source: https://reactjs.org/docs/accessibility.html
> Scraped: 4/2/2025, 3:15:58 PM

## [](_docs_accessibility.html.md#why-accessibility)Why Accessibility?

Web accessibility (also referred to as [**a11y**](https://en.wiktionary.org/wiki/a11y)) is the design and creation of websites that can be used by everyone. Accessibility support is necessary to allow assistive technology to interpret web pages.

React fully supports building accessible websites, often by using standard HTML techniques.

## [](_docs_accessibility.html.md#standards-and-guidelines)Standards and Guidelines

### [](_docs_accessibility.html.md#wcag)WCAG

The [Web Content Accessibility Guidelines](https://www.w3.org/WAI/intro/wcag) provides guidelines for creating accessible web sites.

The following WCAG checklists provide an overview:
*   [WCAG checklist from Wuhcag](https://www.wuhcag.com/wcag-checklist/)
*   [WCAG checklist from WebAIM](https://webaim.org/standards/wcag/checklist)
*   [Checklist from The A11Y Project](https://a11yproject.com/checklist.html)

### [](_docs_accessibility.html.md#wai-aria)WAI-ARIA

The [Web Accessibility Initiative - Accessible Rich Internet Applications](https://www.w3.org/WAI/intro/aria) document contains techniques for building fully accessible JavaScript widgets.

Note that all `aria-*` HTML attributes are fully supported in JSX. Whereas most DOM properties and attributes in React are camelCased, these attributes should be hyphen-cased (also known as kebab-case, lisp-case, etc) as they are in plain HTML:
```
<input
  type="text"
  aria-label={labelText}  aria-required="true"  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```
## [](_docs_accessibility.html.md#semantic-html)Semantic HTML

Semantic HTML is the foundation of accessibility in a web application. Using the various HTML elements to reinforce the meaning of information in our websites will often give us accessibility for free.
*   [MDN HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

Sometimes we break HTML semantics when we add `<div>` elements to our JSX to make our React code work, especially when working with lists (`<ol>`, `<ul>` and `<dl>`) and the HTML `<table>`. In these cases we should rather use [React Fragments](_docs_fragments.html.md) to group together multiple elements.

For example,
```
import React, { Fragment } from 'react';
function ListItem({ item }) {
  return (
    <Fragment>      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>  );
}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```
You can map a collection of items to an array of fragments as you would any other type of element as well:
```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>      ))}
    </dl>
  );
}
```
When you don’t need any props on the Fragment tag you can use the [short syntax](_docs_fragments.html.md#short-syntax), if your tooling supports it:
```
function ListItem({ item }) {
  return (
    <>      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>  );
}
```
For more info, see [the Fragments documentation](_docs_fragments.html.md).

## [](_docs_accessibility.html.md#accessible-forms)Accessible Forms

### [](_docs_accessibility.html.md#labeling)Labeling

Every HTML form control, such as `<input>` and `<textarea>`, needs to be labeled accessibly. We need to provide descriptive labels that are also exposed to screen readers.

The following resources show us how to do this:
*   [The W3C shows us how to label elements](https://www.w3.org/WAI/tutorials/forms/labels/)
*   [WebAIM shows us how to label elements](https://webaim.org/techniques/forms/controls)
*   [The Paciello Group explains accessible names](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Although these standard HTML practices can be directly used in React, note that the `for` attribute is written as `htmlFor` in JSX:
```
<label htmlFor="namedInput">Name:</label><input id="namedInput" type="text" name="name"/>
```
### [](_docs_accessibility.html.md#notifying-the-user-of-errors)Notifying the user of errors

Error situations need to be understood by all users. The following link shows us how to expose error texts to screen readers as well:
*   [The W3C demonstrates user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
*   [WebAIM looks at form validation](https://webaim.org/techniques/formvalidation/)

## [](_docs_accessibility.html.md#focus-control)Focus Control

Ensure that your web application can be fully operated with the keyboard only:
*   [WebAIM talks about keyboard accessibility](https://webaim.org/techniques/keyboard/)

### [](_docs_accessibility.html.md#keyboard-focus-and-focus-outline)Keyboard focus and focus outline

Keyboard focus refers to the current element in the DOM that is selected to accept input from the keyboard. We see it everywhere as a focus outline similar to that shown in the following image:

[![Blue keyboard focus outline around a selected link.](https://reactjs.org/static/dec0e6bcc1f882baf76ebc860d4f04e5/4fcfe/keyboard-focus.png)](_static_dec0e6bcc1f882baf76ebc860d4f04e5_4fcfe_keyboard-focus.png.md)

Only ever use CSS that removes this outline, for example by setting `outline: 0`, if you are replacing it with another focus outline implementation.

### [](_docs_accessibility.html.md#mechanisms-to-skip-to-desired-content)Mechanisms to skip to desired content

Provide a mechanism to allow users to skip past navigation sections in your application as this assists and speeds up keyboard navigation.

Skiplinks or Skip Navigation Links are hidden navigation links that only become visible when keyboard users interact with the page. They are very easy to implement with internal page anchors and some styling:
*   [WebAIM - Skip Navigation Links](https://webaim.org/techniques/skipnav/)

Also use landmark elements and roles, such as `<main>` and `<aside>`, to demarcate page regions as assistive technology allow the user to quickly navigate to these sections.

Read more about the use of these elements to enhance accessibility here:
*   [Accessible Landmarks](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### [](_docs_accessibility.html.md#programmatically-managing-focus)Programmatically managing focus

Our React applications continuously modify the HTML DOM during runtime, sometimes leading to keyboard focus being lost or set to an unexpected element. In order to repair this, we need to programmatically nudge the keyboard focus in the right direction. For example, by resetting keyboard focus to a button that opened a modal window after that modal window is closed.

MDN Web Docs takes a look at this and describes how we can build [keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets).

To set focus in React, we can use [Refs to DOM elements](_docs_refs-and-the-dom.html.md).

Using this, we first create a ref to an element in the JSX of a component class:
```
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element    this.textInput = React.createRef();  }
  render() {
  // Use the `ref` callback to store a reference to the text input DOM  // element in an instance field (for example, this.textInput).    return (
      <input
        type="text"
        ref={this.textInput}      />
    );
  }
}
```
Then we can focus it elsewhere in our component when needed:
```
focus() {
  // Explicitly focus the text input using the raw DOM API
  // Note: we're accessing "current" to get the DOM node
  this.textInput.current.focus();
}
```
Sometimes a parent component needs to set focus to an element in a child component. We can do this by [exposing DOM refs to parent components](_docs_refs-and-the-dom.html.md#exposing-dom-refs-to-parent-components) through a special prop on the child component that forwards the parent’s ref to the child’s DOM node.
```
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />    </div>
  );
}
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />    );
  }
}
// Now you can set focus when required.
this.inputElement.current.focus();
```
When using a [HOC](_docs_higher-order-components.html.md) to extend components, it is recommended to [forward the ref](_docs_forwarding-refs.html.md) to the wrapped component using the `forwardRef` function of React. If a third party HOC does not implement ref forwarding, the above pattern can still be used as a fallback.

A great focus management example is the [react-aria-modal](https://github.com/davidtheclark/react-aria-modal). This is a relatively rare example of a fully accessible modal window. Not only does it set initial focus on the cancel button (preventing the keyboard user from accidentally activating the success action) and trap keyboard focus inside the modal, it also resets focus back to the element that initially triggered the modal.

> Note:
> 
> While this is a very important accessibility feature, it is also a technique that should be used judiciously. Use it to repair the keyboard focus flow when it is disturbed, not to try and anticipate how users want to use applications.

## [](_docs_accessibility.html.md#mouse-and-pointer-events)Mouse and pointer events

Ensure that all functionality exposed through a mouse or pointer event can also be accessed using the keyboard alone. Depending only on the pointer device will lead to many cases where keyboard users cannot use your application.

To illustrate this, let’s look at a prolific example of broken accessibility caused by click events. This is the outside click pattern, where a user can disable an opened popover by clicking outside the element.

![A toggle button opening a popover list implemented with the click outside pattern and operated with a mouse showing that the close action works.](https://reactjs.org/5523b05b22210c5a2fa0bd1f01339cb3/outerclick-with-mouse.gif)

This is typically implemented by attaching a `click` event to the `window` object that closes the popover:
```
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }
  componentDidMount() {    window.addEventListener('click', this.onClickOutsideHandler);  }
  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }
  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }
  onClickOutsideHandler(event) {    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {      this.setState({ isOpen: false });    }  }
  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```
This may work fine for users with pointer devices, such as a mouse, but operating this with the keyboard alone leads to broken functionality when tabbing to the next element as the `window` object never receives a `click` event. This can lead to obscured functionality which blocks users from using your application.

![A toggle button opening a popover list implemented with the click outside pattern and operated with the keyboard showing the popover not being closed on blur and it obscuring other screen elements.](https://reactjs.org/eca0ca825c8c5e2aa609cee72ef47e27/outerclick-with-keyboard.gif)

The same functionality can be achieved by using appropriate event handlers instead, such as `onBlur` and `onFocus`:
```
class BlurExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.timeOutId = null;
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }
  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }
  // We close the popover on the next tick by using setTimeout.  // This is necessary because we need to first check if  // another child of the element has received focus as  // the blur event fires prior to the new focus event.  onBlurHandler() {    this.timeOutId = setTimeout(() => {      this.setState({        isOpen: false      });    });  }
  // If a child receives focus, do not close the popover.  onFocusHandler() {    clearTimeout(this.timeOutId);  }
  render() {
    // React assists us by bubbling the blur and    // focus events to the parent.    return (
      <div onBlur={this.onBlurHandler}           onFocus={this.onFocusHandler}>        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}
```
This code exposes the functionality to both pointer device and keyboard users. Also note the added `aria-*` props to support screen-reader users. For simplicity’s sake the keyboard events to enable `arrow key` interaction of the popover options have not been implemented.

![A popover list correctly closing for both mouse and keyboard users.](https://reactjs.org/28ce2067489843caf05fe7ce22494542/blur-popover-close.gif)

This is one example of many cases where depending on only pointer and mouse events will break functionality for keyboard users. Always testing with the keyboard will immediately highlight the problem areas which can then be fixed by using keyboard aware event handlers.

A more complex user experience should not mean a less accessible one. Whereas accessibility is most easily achieved by coding as close to HTML as possible, even the most complex widget can be coded accessibly.

Here we require knowledge of [ARIA Roles](https://www.w3.org/TR/wai-aria/#roles) as well as [ARIA States and Properties](https://www.w3.org/TR/wai-aria/#states_and_properties). These are toolboxes filled with HTML attributes that are fully supported in JSX and enable us to construct fully accessible, highly functional React components.

Each type of widget has a specific design pattern and is expected to function in a certain way by users and user agents alike:
*   [ARIA Authoring Practices Guide (APG) - Design Patterns and Examples](https://www.w3.org/WAI/ARIA/apg/patterns/)
*   [Heydon Pickering - ARIA Examples](https://heydonworks.com/article/practical-aria-examples/)
*   [Inclusive Components](https://inclusive-components.design/)

## [](_docs_accessibility.html.md#other-points-for-consideration)Other Points for Consideration

### [](_docs_accessibility.html.md#setting-the-language)Setting the language

Indicate the human language of page texts as screen reader software uses this to select the correct voice settings:
*   [WebAIM - Document Language](https://webaim.org/techniques/screenreader/#language)

### [](_docs_accessibility.html.md#setting-the-document-title)Setting the document title

Set the document `<title>` to correctly describe the current page content as this ensures that the user remains aware of the current page context:
*   [WCAG - Understanding the Document Title Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

We can set this in React using the [React Document Title Component](https://github.com/gaearon/react-document-title).

### [](_docs_accessibility.html.md#color-contrast)Color contrast

Ensure that all readable text on your website has sufficient color contrast to remain maximally readable by users with low vision:
*   [WCAG - Understanding the Color Contrast Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
*   [Everything About Color Contrast And Why You Should Rethink It](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
*   [A11yProject - What is Color Contrast](https://a11yproject.com/posts/what-is-color-contrast/)

It can be tedious to manually calculate the proper color combinations for all cases in your website so instead, you can [calculate an entire accessible color palette with Colorable](https://colorable.jxnblk.com/).

Both the aXe and WAVE tools mentioned below also include color contrast tests and will report on contrast errors.

If you want to extend your contrast testing abilities you can use these tools:
*   [WebAIM - Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
*   [The Paciello Group - Color Contrast Analyzer](https://www.paciellogroup.com/resources/contrastanalyser/)

There are a number of tools we can use to assist in the creation of accessible web applications.

### [](_docs_accessibility.html.md#the-keyboard)The keyboard

By far the easiest and also one of the most important checks is to test if your entire website can be reached and used with the keyboard alone. Do this by:

1.  Disconnecting your mouse.
2.  Using `Tab` and `Shift+Tab` to browse.
3.  Using `Enter` to activate elements.
4.  Where required, using your keyboard arrow keys to interact with some elements, such as menus and dropdowns.

### [](_docs_accessibility.html.md#development-assistance)Development assistance

We can check some accessibility features directly in our JSX code. Often intellisense checks are already provided in JSX aware IDE’s for the ARIA roles, states and properties. We also have access to the following tool:

#### [](_docs_accessibility.html.md#eslint-plugin-jsx-a11y)eslint-plugin-jsx-a11y

The [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) plugin for ESLint provides AST linting feedback regarding accessibility issues in your JSX. Many IDE’s allow you to integrate these findings directly into code analysis and source code windows.

[Create React App](https://github.com/facebookincubator/create-react-app) has this plugin with a subset of rules activated. If you want to enable even more accessibility rules, you can create an `.eslintrc` file in the root of your project with this content:
```
{
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```
### [](_docs_accessibility.html.md#testing-accessibility-in-the-browser)Testing accessibility in the browser

A number of tools exist that can run accessibility audits on web pages in your browser. Please use them in combination with other accessibility checks mentioned here as they can only test the technical accessibility of your HTML.

#### [](_docs_accessibility.html.md#axe-axe-core-and-react-axe)aXe, aXe-core and react-axe

Deque Systems offers [aXe-core](https://github.com/dequelabs/axe-core) for automated and end-to-end accessibility tests of your applications. This module includes integrations for Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) or aXe, is an accessibility inspector browser extension built on `aXe-core`.

You can also use the [@axe-core/react](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/react) module to report these accessibility findings directly to the console while developing and debugging.

#### [](_docs_accessibility.html.md#webaim-wave)WebAIM WAVE

The [Web Accessibility Evaluation Tool](https://wave.webaim.org/extension/) is another accessibility browser extension.

#### [](_docs_accessibility.html.md#accessibility-inspectors-and-the-accessibility-tree)Accessibility inspectors and the Accessibility Tree

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) is a subset of the DOM tree that contains accessible objects for every DOM element that should be exposed to assistive technology, such as screen readers.

In some browsers we can easily view the accessibility information for each element in the accessibility tree:
*   [Using the Accessibility Inspector in Firefox](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
*   [Using the Accessibility Inspector in Chrome](https://developers.google.com/web/tools/chrome-devtools/accessibility/reference#pane)
*   [Using the Accessibility Inspector in OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### [](_docs_accessibility.html.md#screen-readers)Screen readers

Testing with a screen reader should form part of your accessibility tests.

Please note that browser / screen reader combinations matter. It is recommended that you test your application in the browser best suited to your screen reader of choice.

### [](_docs_accessibility.html.md#commonly-used-screen-readers)Commonly Used Screen Readers

#### [](_docs_accessibility.html.md#nvda-in-firefox)NVDA in Firefox

[NonVisual Desktop Access](https://www.nvaccess.org/) or NVDA is an open source Windows screen reader that is widely used.

Refer to the following guides on how to best use NVDA:
*   [WebAIM - Using NVDA to Evaluate Web Accessibility](https://webaim.org/articles/nvda/)
*   [Deque - NVDA Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### [](_docs_accessibility.html.md#voiceover-in-safari)VoiceOver in Safari

VoiceOver is an integrated screen reader on Apple devices.

Refer to the following guides on how to activate and use VoiceOver:
*   [WebAIM - Using VoiceOver to Evaluate Web Accessibility](https://webaim.org/articles/voiceover/)
*   [Deque - VoiceOver for OS X Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
*   [Deque - VoiceOver for iOS Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### [](_docs_accessibility.html.md#jaws-in-internet-explorer)JAWS in Internet Explorer

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) or JAWS, is a prolifically used screen reader on Windows.

Refer to the following guides on how to best use JAWS:
*   [WebAIM - Using JAWS to Evaluate Web Accessibility](https://webaim.org/articles/jaws/)
*   [Deque - JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### [](_docs_accessibility.html.md#other-screen-readers)Other Screen Readers

#### [](_docs_accessibility.html.md#chromevox-in-google-chrome)ChromeVox in Google Chrome

[ChromeVox](https://www.chromevox.com/) is an integrated screen reader on Chromebooks and is available [as an extension](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) for Google Chrome.

Refer to the following guides on how best to use ChromeVox:
*   [Google Chromebook Help - Use the Built-in Screen Reader](https://support.google.com/chromebook/answer/7031755?hl=en)
*   [ChromeVox Classic Keyboard Shortcuts Reference](https://www.chromevox.com/keyboard_shortcuts.html)

#### _docs_add-react-to-a-website.html.md

> Source: https://reactjs.org/docs/add-react-to-a-website.html
> Scraped: 4/2/2025, 3:15:59 PM

If you want to add some interactivity to your existing project, you don’t have to rewrite it in React. Add React to your existing stack, and render interactive React components anywhere.

### Note

**You need to install [Node.js](https://nodejs.org/en/) for local development.** Although you can [try React](https://react.dev/learn/installation#try-react) online or with a simple HTML page, realistically most JavaScript tooling you’ll want to use for development requires Node.js.

## Using React for an entire subroute of your existing website[](https://react.dev/learn/add-react-to-an-existing-project#using-react-for-an-entire-subroute-of-your-existing-website)

Let’s say you have an existing web app at `example.com` built with another server technology (like Rails), and you want to implement all routes starting with `example.com/some-app/` fully with React.

Here’s how we recommend to set it up:

1.  **Build the React part of your app** using one of the [React-based frameworks](https://react.dev/learn/start-a-new-react-project).
2.  **Specify `/some-app` as the _base path_** in your framework’s configuration (here’s how: [Next.js](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath), [Gatsby](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/)).
3.  **Configure your server or a proxy** so that all requests under `/some-app/` are handled by your React app.

This ensures the React part of your app can [benefit from the best practices](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework) baked into those frameworks.

Many React-based frameworks are full-stack and let your React app take advantage of the server. However, you can use the same approach even if you can’t or don’t want to run JavaScript on the server. In that case, serve the HTML/CSS/JS export ([`next export` output](https://nextjs.org/docs/advanced-features/static-html-export) for Next.js, default for Gatsby) at `/some-app/` instead.

## Using React for a part of your existing page[](https://react.dev/learn/add-react-to-an-existing-project#using-react-for-a-part-of-your-existing-page)

Let’s say you have an existing page built with another technology (either a server one like Rails, or a client one like Backbone), and you want to render interactive React components somewhere on that page. That’s a common way to integrate React—in fact, it’s how most React usage looked at Meta for many years!

You can do this in two steps:

1.  **Set up a JavaScript environment** that lets you use the [JSX syntax](https://react.dev/learn/writing-markup-with-jsx), split your code into modules with the [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) / [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) syntax, and use packages (for example, React) from the [npm](https://www.npmjs.com/) package registry.
2.  **Render your React components** where you want to see them on the page.

The exact approach depends on your existing page setup, so let’s walk through some details.

### Step 1: Set up a modular JavaScript environment[](https://react.dev/learn/add-react-to-an-existing-project#step-1-set-up-a-modular-javascript-environment)

A modular JavaScript environment lets you write your React components in individual files, as opposed to writing all of your code in a single file. It also lets you use all the wonderful packages published by other developers on the [npm](https://www.npmjs.com/) registry—including React itself! How you do this depends on your existing setup:
*   **If your app is already split into files that use `import` statements,** try to use the setup you already have. Check whether writing `<div />` in your JS code causes a syntax error. If it causes a syntax error, you might need to [transform your JavaScript code with Babel](https://babeljs.io/setup), and enable the [Babel React preset](https://babeljs.io/docs/babel-preset-react) to use JSX.
    
*   **If your app doesn’t have an existing setup for compiling JavaScript modules,** set it up with [Vite](https://vite.dev/). The Vite community maintains [many integrations with backend frameworks](https://github.com/vitejs/awesome-vite#integrations-with-backends), including Rails, Django, and Laravel. If your backend framework is not listed, [follow this guide](https://vite.dev/guide/backend-integration.html) to manually integrate Vite builds with your backend.
    

To check whether your setup works, run this command in your project folder:

npm install react react-dom

Then add these lines of code at the top of your main JavaScript file (it might be called `index.js` or `main.js`):

If the entire content of your page was replaced by a “Hello, world!”, everything worked! Keep reading.

### Note

Integrating a modular JavaScript environment into an existing project for the first time can feel intimidating, but it’s worth it! If you get stuck, try our [community resources](https://react.dev/community) or the [Vite Chat](https://chat.vite.dev/).

### Step 2: Render React components anywhere on the page[](https://react.dev/learn/add-react-to-an-existing-project#step-2-render-react-components-anywhere-on-the-page)

In the previous step, you put this code at the top of your main file:
```
import { createRoot } from 'react-dom/client';  

// Clear the existing HTML content  

document.body.innerHTML = '<div id="app"></div>';  

// Render your React component instead  

const root = createRoot(document.getElementById('app'));  

root.render(<h1>Hello, world</h1>);
```
Of course, you don’t actually want to clear the existing HTML content!

Delete this code.

Instead, you probably want to render your React components in specific places in your HTML. Open your HTML page (or the server templates that generate it) and add a unique [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id) attribute to any tag, for example:
```
<!-- ... somewhere in your html ... -->  

<nav id="navigation"></nav>  

<!-- ... more html ... -->
```
This lets you find that HTML element with [`document.getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) and pass it to [`createRoot`](https://react.dev/reference/react-dom/client/createRoot) so that you can render your own React component inside:

Notice how the original HTML content from `index.html` is preserved, but your own `NavigationBar` React component now appears inside the `<nav id="navigation">` from your HTML. Read the [`createRoot` usage documentation](https://react.dev/reference/react-dom/client/createRoot#rendering-a-page-partially-built-with-react) to learn more about rendering React components inside an existing HTML page.

When you adopt React in an existing project, it’s common to start with small interactive components (like buttons), and then gradually keep “moving upwards” until eventually your entire page is built with React. If you ever reach that point, we recommend migrating to [a React framework](https://react.dev/learn/start-a-new-react-project) right after to get the most out of React.

## Using React Native in an existing native mobile app[](https://react.dev/learn/add-react-to-an-existing-project#using-react-native-in-an-existing-native-mobile-app)

[React Native](https://reactnative.dev/) can also be integrated into existing native apps incrementally. If you have an existing native app for Android (Java or Kotlin) or iOS (Objective-C or Swift), [follow this guide](https://reactnative.dev/docs/integration-with-existing-apps) to add a React Native screen to it.

#### _docs_cdn-links.html.md

> Source: https://reactjs.org/docs/cdn-links.html
> Scraped: 4/2/2025, 3:16:00 PM

Both React and ReactDOM are available over a CDN.
```
<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```
The versions above are only meant for development, and are not suitable for production. Minified and optimized production versions of React are available at:
```
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```
To load a specific version of `react` and `react-dom`, replace `18` with the version number.

### [](_docs_cdn-links.html.md#why-the-crossorigin-attribute)Why the `crossorigin` Attribute?

If you serve React from a CDN, we recommend to keep the [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute set:
```
<script crossorigin src="..."></script>
```
We also recommend to verify that the CDN you are using sets the `Access-Control-Allow-Origin: *` HTTP header:

[![Access-Control-Allow-Origin: *](https://reactjs.org/static/89baed0a6540f29e954065ce04661048/13ae7/cdn-cors-header.png)](_static_89baed0a6540f29e954065ce04661048_13ae7_cdn-cors-header.png.md)

This enables a better [error handling experience](_blog_2017_07_26_error-handling-in-react-16.html.md) in React 16 and later.

#### _docs_code-splitting.html.md

> Source: https://reactjs.org/docs/code-splitting.html
> Scraped: 4/2/2025, 3:11:30 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
> 
> *   [`lazy`](https://react.dev/reference/react/lazy)
> *   [`<Suspense>`](https://react.dev/reference/react/Suspense)

## [](_docs_code-splitting.html.md#bundling)Bundling

Most React apps will have their files “bundled” using tools like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) or [Browserify](http://browserify.org/). Bundling is the process of following imported files and merging them into a single file: a “bundle”. This bundle can then be included on a webpage to load an entire app at once.

#### [](_docs_code-splitting.html.md#example)Example

**App:**
```
// app.js
import { add } from './math.js';
console.log(add(16, 26)); // 42
```
```
// math.js
export function add(a, b) {
  return a + b;
}
```
**Bundle:**
```
function add(a, b) {
  return a + b;
}
console.log(add(16, 26)); // 42
```
> Note:
> 
> Your bundles will end up looking a lot different than this.

If you’re using [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/), or a similar tool, you will have a Webpack setup out of the box to bundle your app.

If you aren’t, you’ll need to set up bundling yourself. For example, see the [Installation](https://webpack.js.org/guides/installation/) and [Getting Started](https://webpack.js.org/guides/getting-started/) guides on the Webpack docs.

## [](_docs_code-splitting.html.md#code-splitting)Code Splitting

Bundling is great, but as your app grows, your bundle will grow too. Especially if you are including large third-party libraries. You need to keep an eye on the code you are including in your bundle so that you don’t accidentally make it so large that your app takes a long time to load.

To avoid winding up with a large bundle, it’s good to get ahead of the problem and start “splitting” your bundle. Code-Splitting is a feature supported by bundlers like [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) and Browserify (via [factor-bundle](https://github.com/browserify/factor-bundle)) which can create multiple bundles that can be dynamically loaded at runtime.

Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

## [](_docs_code-splitting.html.md#import)`import()`

The best way to introduce code-splitting into your app is through the dynamic `import()` syntax.

**Before:**
```
import { add } from './math';
console.log(add(16, 26));
```
**After:**
```
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```
When Webpack comes across this syntax, it automatically starts code-splitting your app. If you’re using Create React App, this is already configured for you and you can [start using it](https://create-react-app.dev/docs/code-splitting/) immediately. It’s also supported out of the box in [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import).

If you’re setting up Webpack yourself, you’ll probably want to read Webpack’s [guide on code splitting](https://webpack.js.org/guides/code-splitting/). Your Webpack config should look vaguely [like this](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

When using [Babel](https://babeljs.io/), you’ll need to make sure that Babel can parse the dynamic import syntax but is not transforming it. For that you will need [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import).

## [](_docs_code-splitting.html.md#reactlazy)`React.lazy`

The `React.lazy` function lets you render a dynamic import as a regular component.

**Before:**
```
import OtherComponent from './OtherComponent';
```
**After:**
```
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
This will automatically load the bundle containing the `OtherComponent` when this component is first rendered.

`React.lazy` takes a function that must call a dynamic `import()`. This must return a `Promise` which resolves to a module with a `default` export containing a React component.

The lazy component should then be rendered inside a `Suspense` component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.
```
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
The `fallback` prop accepts any React elements that you want to render while waiting for the component to load. You can place the `Suspense` component anywhere above the lazy component. You can even wrap multiple lazy components with a single `Suspense` component.
```
import React, { Suspense } from 'react';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```
### [](_docs_code-splitting.html.md#avoiding-fallbacks)Avoiding fallbacks

Any component may suspend as a result of rendering, even components that were already shown to the user. In order for screen content to always be consistent, if an already shown component suspends, React has to hide its tree up to the closest `<Suspense>` boundary. However, from the user’s perspective, this can be disorienting.

Consider this tab switcher:
```
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';
const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));
function MyComponent() {
  const [tab, setTab] = React.useState('photos');
  function handleTabSelect(tab) {
    setTab(tab);
  };
  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}
```
In this example, if tab gets changed from `'photos'` to `'comments'`, but `Comments` suspends, the user will see a glimmer. This makes sense because the user no longer wants to see `Photos`, the `Comments` component is not ready to render anything, and React needs to keep the user experience consistent, so it has no choice but to show the `Glimmer` above.

However, sometimes this user experience is not desirable. In particular, it is sometimes better to show the “old” UI while the new UI is being prepared. You can use the new [`startTransition`](_docs_react-api.html.md#starttransition) API to make React do this:
```
function handleTabSelect(tab) {
  startTransition(() => {
    setTab(tab);
  });
}
```
Here, you tell React that setting tab to `'comments'` is not an urgent update, but is a [transition](_docs_react-api.html.md#transitions) that may take some time. React will then keep the old UI in place and interactive, and will switch to showing `<Comments />` when it is ready. See [Transitions](_docs_react-api.html.md#transitions) for more info.

### [](_docs_code-splitting.html.md#error-boundaries)Error boundaries

If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with [Error Boundaries](_docs_error-boundaries.html.md). Once you’ve created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there’s a network error.
```
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));
const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```
## [](_docs_code-splitting.html.md#route-based-code-splitting)Route-based code splitting

Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won’t disrupt the user experience.

A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

Here’s an example of how to setup route-based code splitting into your app using libraries like [React Router](https://reactrouter.com/) with `React.lazy`.
```
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```
## [](_docs_code-splitting.html.md#named-exports)Named Exports

`React.lazy` currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don’t pull in unused components.
```
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```
```
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```
```
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

#### _docs_components-and-props.html.md

> Source: https://reactjs.org/docs/components-and-props.html
> Scraped: 4/2/2025, 3:16:00 PM

Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. This page provides an introduction to the idea of components. You can find a [detailed component API reference here](_docs_react-component.html.md).

Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

## [](_docs_components-and-props.html.md#function-and-class-components)Function and Class Components

The simplest way to define a component is to write a JavaScript function:
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
This function is a valid React component because it accepts a single “props” (which stands for properties) object argument with data and returns a React element. We call such components “function components” because they are literally JavaScript functions.

You can also use an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) to define a component:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
The above two components are equivalent from React’s point of view.

Function and Class components both have some additional features that we will discuss in the [next sections](_docs_state-and-lifecycle.html.md).

## [](_docs_components-and-props.html.md#rendering-a-component)Rendering a Component

Previously, we only encountered React elements that represent DOM tags:

However, elements can also represent user-defined components:
```
const element = <Welcome name="Sara" />;
```
When React sees an element representing a user-defined component, it passes JSX attributes and children to this component as a single object. We call this object “props”.

For example, this code renders “Hello, Sara” on the page:
```
function Welcome(props) {  return <h1>Hello, {props.name}</h1>;
}
const root = ReactDOM.createRoot(document.getElementById('root'));
const element = <Welcome name="Sara" />;root.render(element);
```
**[Try it on CodePen](https://codepen.io/gaearon/pen/YGYmEG?editors=1010)**

Let’s recap what happens in this example:

1.  We call `root.render()` with the `<Welcome name="Sara" />` element.
2.  React calls the `Welcome` component with `{name: 'Sara'}` as the props.
3.  Our `Welcome` component returns a `<h1>Hello, Sara</h1>` element as the result.
4.  React DOM efficiently updates the DOM to match `<h1>Hello, Sara</h1>`.

> **Note:** Always start component names with a capital letter.
> 
> React treats components starting with lowercase letters as DOM tags. For example, `<div />` represents an HTML div tag, but `<Welcome />` represents a component and requires `Welcome` to be in scope.
> 
> To learn more about the reasoning behind this convention, please read [JSX In Depth](_docs_jsx-in-depth.html.md#user-defined-components-must-be-capitalized).

## [](_docs_components-and-props.html.md#composing-components)Composing Components

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

For example, we can create an `App` component that renders `Welcome` many times:
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
function App() {
  return (
    <div>
      <Welcome name="Sara" />      <Welcome name="Cahal" />      <Welcome name="Edite" />    </div>
  );
}
```
**[Try it on CodePen](https://codepen.io/gaearon/pen/KgQKPr?editors=1010)**

Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

Don’t be afraid to split components into smaller components.

For example, consider this `Comment` component:
```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
**[Try it on CodePen](https://codepen.io/gaearon/pen/VKQwEo?editors=1010)**

It accepts `author` (an object), `text` (a string), and `date` (a date) as props, and describes a comment on a social media website.

This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. Let’s extract a few components from it.

First, we will extract `Avatar`:
```
function Avatar(props) {
  return (
    <img className="Avatar"      src={props.user.avatarUrl}      alt={props.user.name}    />  );
}
```
The `Avatar` doesn’t need to know that it is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

We recommend naming props from the component’s own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:
```
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```
## [](_docs_components-and-props.html.md#props-are-read-only)Props are Read-Only

Whether you declare a component [as a function or a class](_docs_components-and-props.html.md#function-and-class-components), it must never modify its own props. Consider this `sum` function:
```
function sum(a, b) {
  return a + b;
}
```
Such functions are called [“pure”](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:
```
function withdraw(account, amount) {
  account.total -= amount;
}
```
React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the [next section](_docs_state-and-lifecycle.html.md), we will introduce a new concept of “state”. State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.

#### _docs_conditional-rendering.html.md

> Source: https://reactjs.org/docs/conditional-rendering.html
> Scraped: 4/2/2025, 3:16:00 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
> 
> *   [Conditional Rendering](https://react.dev/learn/conditional-rendering)

In React, you can create distinct components that encapsulate behavior you need. Then, you can render only some of them, depending on the state of your application.

Conditional rendering in React works the same way conditions work in JavaScript. Use JavaScript operators like [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) or the [conditional operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to create elements representing the current state, and let React update the UI to match them.

Consider these two components:
```
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}
function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```
We’ll create a `Greeting` component that displays either of these components depending on whether a user is logged in:
```
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {    return <UserGreeting />;  }  return <GuestGreeting />;}
const root = ReactDOM.createRoot(document.getElementById('root')); 
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

This example renders a different greeting depending on the value of `isLoggedIn` prop.

### [](_docs_conditional-rendering.html.md#element-variables)Element Variables

You can use variables to store elements. This can help you conditionally render a part of the component while the rest of the output doesn’t change.

Consider these two new components representing Logout and Login buttons:
```
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}
function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```
In the example below, we will create a [stateful component](_docs_state-and-lifecycle.html.md#adding-local-state-to-a-class) called `LoginControl`.

It will render either `<LoginButton />` or `<LogoutButton />` depending on its current state. It will also render a `<Greeting />` from the previous example:
```
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }
  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {      button = <LogoutButton onClick={this.handleLogoutClick} />;    } else {      button = <LoginButton onClick={this.handleLoginClick} />;    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />        {button}      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<LoginControl />);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

While declaring a variable and using an `if` statement is a fine way to conditionally render a component, sometimes you might want to use a shorter syntax. There are a few ways to inline conditions in JSX, explained below.

### [](_docs_conditional-rendering.html.md#inline-if-with-logical--operator)Inline If with Logical && Operator

You may [embed expressions in JSX](_docs_introducing-jsx.html.md#embedding-expressions-in-jsx) by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element:
```
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&        <h2>          You have {unreadMessages.length} unread messages.        </h2>      }    </div>
  );
}
const messages = ['React', 'Re: React', 'Re:Re: React'];
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Mailbox unreadMessages={messages} />);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

It works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

Therefore, if the condition is `true`, the element right after `&&` will appear in the output. If it is `false`, React will ignore and skip it.

Note that returning a falsy expression will still cause the element after `&&` to be skipped but will return the falsy expression. In the example below, `<div>0</div>` will be returned by the render method.
```
render() {
  const count = 0;  return (
    <div>
      {count && <h1>Messages: {count}</h1>}    </div>
  );
}
```
### [](_docs_conditional-rendering.html.md#inline-if-else-with-conditional-operator)Inline If-Else with Conditional Operator

Another method for conditionally rendering elements inline is to use the JavaScript conditional operator [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator).

In the example below, we use it to conditionally render a small block of text.
```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.    </div>
  );
}
```
It can also be used for larger expressions although it is less obvious what’s going on:
```
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />      }
    </div>  );
}
```
Just like in JavaScript, it is up to you to choose an appropriate style based on what you and your team consider more readable. Also remember that whenever conditions become too complex, it might be a good time to [extract a component](_docs_components-and-props.html.md#extracting-components).

### [](_docs_conditional-rendering.html.md#preventing-component-from-rendering)Preventing Component from Rendering

In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return `null` instead of its render output.

In the example below, the `<WarningBanner />` is rendered depending on the value of the prop called `warn`. If the value of the prop is `false`, then the component does not render:
```
function WarningBanner(props) {
  if (!props.warn) {    return null;  }
  return (
    <div className="warning">
      Warning!
    </div>
  );
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }
  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(<Page />);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Returning `null` from a component’s `render` method does not affect the firing of the component’s lifecycle methods. For instance `componentDidUpdate` will still be called.

#### _docs_create-a-new-react-app.html.md

> Source: https://reactjs.org/docs/create-a-new-react-app.html
> Scraped: 4/2/2025, 3:16:00 PM

If you want to build a new app or website with React, we recommend starting with a framework.

If your app has constraints not well-served by existing frameworks, you prefer to build your own framework, or you just want to learn the basics of a React app, you can [build a React app from scratch](https://react.dev/learn/build-a-react-app-from-scratch).

## Full-stack frameworks[](https://react.dev/learn/creating-a-react-app#full-stack-frameworks)

These recommended frameworks support all the features you need to deploy and scale your app in production. They have integrated the latest React features and take advantage of React’s architecture.

### Note

#### Full-stack frameworks do not require a server.[](https://react.dev/learn/creating-a-react-app#react-frameworks-do-not-require-a-server)

All the frameworks on this page support client-side rendering ([CSR](https://developer.mozilla.org/en-US/docs/Glossary/CSR)), single-page apps ([SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA)), and static-site generation ([SSG](https://developer.mozilla.org/en-US/docs/Glossary/SSG)). These apps can be deployed to a [CDN](https://developer.mozilla.org/en-US/docs/Glossary/CDN) or static hosting service without a server. Additionally, these frameworks allow you to add server-side rendering on a per-route basis, when it makes sense for your use case.

This allows you to start with a client-only app, and if your needs change later, you can opt-in to using server features on individual routes without rewriting your app. See your framework’s documentation for configuring the rendering strategy.

### React Router (v7)[](https://react.dev/learn/creating-a-react-app#react-router-v7)

**[React Router](https://reactrouter.com/start/framework/installation) is the most popular routing library for React and can be paired with Vite to create a full-stack React framework**. It emphasizes standard Web APIs and has several [ready to deploy templates](https://github.com/remix-run/react-router-templates) for various JavaScript runtimes and platforms.

To create a new React Router framework project, run:

npx create-react-router@latest

React Router is maintained by [Shopify](https://www.shopify.com/).

### Expo (for native apps)[](https://react.dev/learn/creating-a-react-app#expo)

**[Expo](https://expo.dev/) is a React framework that lets you create universal Android, iOS, and web apps with truly native UIs.** It provides an SDK for [React Native](https://reactnative.dev/) that makes the native parts easier to use. To create a new Expo project, run:

npx create-expo-app@latest

If you’re new to Expo, check out the [Expo tutorial](https://docs.expo.dev/tutorial/introduction/).

Expo is maintained by [Expo (the company)](https://expo.dev/about). Building apps with Expo is free, and you can submit them to the Google and Apple app stores without restrictions. Expo additionally provides opt-in paid cloud services.

## Other frameworks[](https://react.dev/learn/creating-a-react-app#other-frameworks)

There are other up-and-coming frameworks that are working towards our full stack React vision:
*   [TanStack Start (Beta)](https://tanstack.com/): TanStack Start is a full-stack React framework powered by TanStack Router. It provides a full-document SSR, streaming, server functions, bundling, and more using tools like Nitro and Vite.
*   [RedwoodJS](https://redwoodjs.com/): Redwood is a full stack React framework with lots of pre-installed packages and configuration that makes it easy to build full-stack web applications.

##### Deep Dive

#### Which features make up the React team’s full-stack architecture vision?[](https://react.dev/learn/creating-a-react-app#which-features-make-up-the-react-teams-full-stack-architecture-vision)

## Start From Scratch[](https://react.dev/learn/creating-a-react-app#start-from-scratch)

If your app has constraints not well-served by existing frameworks, you prefer to build your own framework, or you just want to learn the basics of a React app, there are other options available for starting a React project from scratch.

Starting from scratch gives you more flexibility, but does require that you make choices on which tools to use for routing, data fetching, and other common usage patterns. It’s a lot like building your own framework, instead of using a framework that already exists. The [frameworks we recommend](https://react.dev/learn/creating-a-react-app#full-stack-frameworks) have built-in solutions for these problems.

If you want to build your own solutions, see our guide to [build a React app from Scratch](https://react.dev/learn/build-a-react-app-from-scratch) for instructions on how to set up a new React project starting with a built tool like [Vite](https://vite.dev/), [Parcel](https://parceljs.org/), or [RSbuild](https://rsbuild.dev/).
* * *

_If you’re a framework author interested in being included on this page, [please let us know](https://github.com/reactjs/react.dev/issues/new?assignees=&labels=type%3A+framework&projects=&template=3-framework.yml&title=%5BFramework%5D%3A+)._

#### _docs_faq-ajax.html.md

> Source: https://reactjs.org/docs/faq-ajax.html
> Scraped: 4/2/2025, 3:15:58 PM

### [](_docs_faq-ajax.html.md#how-can-i-make-an-ajax-call)How can I make an AJAX call?

You can use any AJAX library you like with React. Some popular ones are [Axios](https://github.com/axios/axios), [jQuery AJAX](https://api.jquery.com/jQuery.ajax/), and the browser built-in [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

### [](_docs_faq-ajax.html.md#where-in-the-component-lifecycle-should-i-make-an-ajax-call)Where in the component lifecycle should I make an AJAX call?

You should populate data with AJAX calls in the [`componentDidMount`](_docs_react-component.html.md#mounting) lifecycle method. This is so you can use `setState` to update your component when the data is retrieved.

### [](_docs_faq-ajax.html.md#example-using-ajax-results-to-set-local-state)Example: Using AJAX results to set local state

The component below demonstrates how to make an AJAX call in `componentDidMount` to populate local component state.

The example API returns a JSON object like this:
```
{
  "items": [
    { "id": 1, "name": "Apples",  "price": "$2" },
    { "id": 2, "name": "Peaches", "price": "$5" }
  ] 
}
```
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```
Here is the equivalent with [Hooks](_docs_hooks-intro.html.md):
```
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
```

#### _docs_getting-started.html.md

> Source: https://reactjs.org/docs/getting-started.html
> Scraped: 4/2/2025, 3:15:58 PM

Welcome to the React documentation! This page will give you an introduction to 80% of the React concepts that you will use on a daily basis.

### You will learn
*   How to create and nest components
*   How to add markup and styles
*   How to display data
*   How to render conditions and lists
*   How to respond to events and update the screen
*   How to share data between components

## Creating and nesting components[](https://react.dev/learn#components)

React apps are made out of _components_. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

React components are JavaScript functions that return markup:
```
function MyButton() {  

return (  

<button>I'm a button</button>  

);  

}
```
Now that you’ve declared `MyButton`, you can nest it into another component:
```
export default function MyApp() {  

return (  

<div>  

<h1>Welcome to my app</h1>  

<MyButton />  

</div>  

);  

}
```
Notice that `<MyButton />` starts with a capital letter. That’s how you know it’s a React component. React component names must always start with a capital letter, while HTML tags must be lowercase.

Have a look at the result:
```
function MyButton() {
  return (
    <button\>
      I'm a button
    </button\>
  );
}
export default function MyApp() {
  return (
    <div\>
      <h1\>Welcome to my app</h1\>
      <MyButton />
    </div\>
  );
}
```
The `export default` keywords specify the main component in the file. If you’re not familiar with some piece of JavaScript syntax, [MDN](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) and [javascript.info](https://javascript.info/import-export) have great references.

## Writing markup with JSX[](https://react.dev/learn#writing-markup-with-jsx)

The markup syntax you’ve seen above is called _JSX_. It is optional, but most React projects use JSX for its convenience. All of the [tools we recommend for local development](https://react.dev/learn/installation) support JSX out of the box.

JSX is stricter than HTML. You have to close tags like `<br />`. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a `<div>...</div>` or an empty `<>...</>` wrapper:
```
function AboutPage() {  

return (  

<>  

<h1>About</h1>  

<p>Hello there.<br />How do you do?</p>  

</>  

);  

}
```
If you have a lot of HTML to port to JSX, you can use an [online converter.](https://transform.tools/html-to-jsx)

## Adding styles[](https://react.dev/learn#adding-styles)

In React, you specify a CSS class with `className`. It works the same way as the HTML [`class`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class) attribute:
```
<img className="avatar" />
```
Then you write the CSS rules for it in a separate CSS file:
```
/* In your CSS */  

.avatar {  

border-radius: 50%;  

}
```
React does not prescribe how you add CSS files. In the simplest case, you’ll add a [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) tag to your HTML. If you use a build tool or a framework, consult its documentation to learn how to add a CSS file to your project.

## Displaying data[](https://react.dev/learn#displaying-data)

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display `user.name`:
```
return (  

<h1>  

{user.name}  

</h1>  

);
```
You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces _instead of_ quotes. For example, `className="avatar"` passes the `"avatar"` string as the CSS class, but `src={user.imageUrl}` reads the JavaScript `user.imageUrl` variable value, and then passes that value as the `src` attribute:
```
return (  

<img  

className="avatar"  

src={user.imageUrl}  

/>  

);
```
You can put more complex expressions inside the JSX curly braces too, for example, [string concatenation](https://javascript.info/operators#string-concatenation-with-binary):
```
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};
export default function Profile() {
  return (
    <\>
      <h1\>{user.name}</h1\>
      <img
        className\="avatar"
        src\={user.imageUrl}
        alt\={'Photo of ' + user.name}
        style\={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </\>
  );
}
```
In the above example, `style={{}}` is not a special syntax, but a regular `{}` object inside the `style={ }` JSX curly braces. You can use the `style` attribute when your styles depend on JavaScript variables.

## Conditional rendering[](https://react.dev/learn#conditional-rendering)

In React, there is no special syntax for writing conditions. Instead, you’ll use the same techniques as you use when writing regular JavaScript code. For example, you can use an [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) statement to conditionally include JSX:
```
let content;  

if (isLoggedIn) {  

content = <AdminPanel />;  

} else {  

content = <LoginForm />;  

}  

return (  

<div>  

{content}  

</div>  

);
```
If you prefer more compact code, you can use the [conditional `?` operator.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) Unlike `if`, it works inside JSX:
```
<div>  

{isLoggedIn ? (  

<AdminPanel />  

) : (  

<LoginForm />  

)}  

</div>
```
When you don’t need the `else` branch, you can also use a shorter [logical `&&` syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND#short-circuit_evaluation):
```
<div>  

{isLoggedIn && <AdminPanel />}  

</div>
```
All of these approaches also work for conditionally specifying attributes. If you’re unfamiliar with some of this JavaScript syntax, you can start by always using `if...else`.

## Rendering lists[](https://react.dev/learn#rendering-lists)

You will rely on JavaScript features like [`for` loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) and the [array `map()` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to render lists of components.

For example, let’s say you have an array of products:
```
const products = [  

{ title: 'Cabbage', id: 1 },  

{ title: 'Garlic', id: 2 },  

{ title: 'Apple', id: 3 },  

];
```
Inside your component, use the `map()` function to transform an array of products into an array of `<li>` items:
```
const listItems = products.map(product =>  

<li key={product.id}>  

{product.title}  

</li>  

);  

return (  

<ul>{listItems}</ul>  

);
```
Notice how `<li>` has a `key` attribute. For each item in a list, you should pass a string or a number that uniquely identifies that item among its siblings. Usually, a key should be coming from your data, such as a database ID. React uses your keys to know what happened if you later insert, delete, or reorder the items.
```
const products = \[
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
\];
export default function ShoppingList() {
  const listItems = products.map(product \=>
    <li
      key\={product.id}
      style\={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    \>
      {product.title}
    </li\>
  );
  return (
    <ul\>{listItems}</ul\>
  );
}
```
## Responding to events[](https://react.dev/learn#responding-to-events)

You can respond to events by declaring _event handler_ functions inside your components:
```
function MyButton() {  

function handleClick() {  

alert('You clicked me!');  

}  

return (  

<button onClick={handleClick}>  

      Click me  

</button>  

);  

}
```
Notice how `onClick={handleClick}` has no parentheses at the end! Do not _call_ the event handler function: you only need to _pass it down_. React will call your event handler when the user clicks the button.

## Updating the screen[](https://react.dev/learn#updating-the-screen)

Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add _state_ to your component.

First, import [`useState`](https://react.dev/reference/react/useState) from React:
```
import { useState } from 'react';
```
Now you can declare a _state variable_ inside your component:
```
function MyButton() {  

const [count, setCount] = useState(0);  

// ...
```
You’ll get two things from `useState`: the current state (`count`), and the function that lets you update it (`setCount`). You can give them any names, but the convention is to write `[something, setSomething]`.

The first time the button is displayed, `count` will be `0` because you passed `0` to `useState()`. When you want to change state, call `setCount()` and pass the new value to it. Clicking this button will increment the counter:
```
function MyButton() {  

const [count, setCount] = useState(0);  

function handleClick() {  

setCount(count + 1);  

}  

return (  

<button onClick={handleClick}>  

      Clicked {count} times  

</button>  

);  

}
```
React will call your component function again. This time, `count` will be `1`. Then it will be `2`. And so on.

If you render the same component multiple times, each will get its own state. Click each button separately:
```
import { useState } from 'react';
export default function MyApp() {
  return (
    <div\>
      <h1\>Counters that update separately</h1\>
      <MyButton />
      <MyButton />
    </div\>
  );
}
function MyButton() {
  const \[count, setCount\] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <button onClick\={handleClick}\>
      Clicked {count} times
    </button\>
  );
}
```
Notice how each button “remembers” its own `count` state and doesn’t affect other buttons.

## Using Hooks[](https://react.dev/learn#using-hooks)

Functions starting with `use` are called _Hooks_. `useState` is a built-in Hook provided by React. You can find other built-in Hooks in the [API reference.](https://react.dev/reference/react) You can also write your own Hooks by combining the existing ones.

Hooks are more restrictive than other functions. You can only call Hooks _at the top_ of your components (or other Hooks). If you want to use `useState` in a condition or a loop, extract a new component and put it there.

## Sharing data between components[](https://react.dev/learn#sharing-data-between-components)

In the previous example, each `MyButton` had its own independent `count`, and when each button was clicked, only the `count` for the button clicked changed:

![Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. Both MyButton components contain a count with value zero.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child.dark.png&w=828&q=75)

![Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. Both MyButton components contain a count with value zero.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child.png&w=828&q=75)

Initially, each `MyButton`’s `count` state is `0`

![The same diagram as the previous, with the count of the first child MyButton component highlighted indicating a click with the count value incremented to one. The second MyButton component still contains value zero.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child_clicked.dark.png&w=828&q=75)

![The same diagram as the previous, with the count of the first child MyButton component highlighted indicating a click with the count value incremented to one. The second MyButton component still contains value zero.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_child_clicked.png&w=828&q=75)

The first `MyButton` updates its `count` to `1`

However, often you’ll need components to _share data and always update together_.

To make both `MyButton` components display the same `count` and update together, you need to move the state from the individual buttons “upwards” to the closest component containing all of them.

In this example, it is `MyApp`:

![Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. MyApp contains a count value of zero which is passed down to both of the MyButton components, which also show value zero.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent.dark.png&w=828&q=75)

![Diagram showing a tree of three components, one parent labeled MyApp and two children labeled MyButton. MyApp contains a count value of zero which is passed down to both of the MyButton components, which also show value zero.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent.png&w=828&q=75)

Initially, `MyApp`’s `count` state is `0` and is passed down to both children

![The same diagram as the previous, with the count of the parent MyApp component highlighted indicating a click with the value incremented to one. The flow to both of the children MyButton components is also highlighted, and the count value in each child is set to one indicating the value was passed down.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent_clicked.dark.png&w=828&q=75)

![The same diagram as the previous, with the count of the parent MyApp component highlighted indicating a click with the value incremented to one. The flow to both of the children MyButton components is also highlighted, and the count value in each child is set to one indicating the value was passed down.](https://react.dev/_next/image?url=%2Fimages%2Fdocs%2Fdiagrams%2Fsharing_data_parent_clicked.png&w=828&q=75)

On click, `MyApp` updates its `count` state to `1` and passes it down to both children

Now when you click either button, the `count` in `MyApp` will change, which will change both of the counts in `MyButton`. Here’s how you can express this in code.

First, _move the state up_ from `MyButton` into `MyApp`:
```
export default function MyApp() {  

const [count, setCount] = useState(0);  

function handleClick() {  

setCount(count + 1);  

}  

return (  

<div>  

<h1>Counters that update separately</h1>  

<MyButton />  

<MyButton />  

</div>  

);  

}  

function MyButton() {  

// ... we're moving code from here ...  

}
```
Then, _pass the state down_ from `MyApp` to each `MyButton`, together with the shared click handler. You can pass information to `MyButton` using the JSX curly braces, just like you previously did with built-in tags like `<img>`:
```
export default function MyApp() {  

const [count, setCount] = useState(0);  

function handleClick() {  

setCount(count + 1);  

}  

return (  

<div>  

<h1>Counters that update together</h1>  

<MyButton count={count} onClick={handleClick} />  

<MyButton count={count} onClick={handleClick} />  

</div>  

);  

}
```
The information you pass down like this is called _props_. Now the `MyApp` component contains the `count` state and the `handleClick` event handler, and _passes both of them down as props_ to each of the buttons.

Finally, change `MyButton` to _read_ the props you have passed from its parent component:
```
function MyButton({ count, onClick }) {  

return (  

<button onClick={onClick}>  

      Clicked {count} times  

</button>  

);  

}
```
When you click the button, the `onClick` handler fires. Each button’s `onClick` prop was set to the `handleClick` function inside `MyApp`, so the code inside of it runs. That code calls `setCount(count + 1)`, incrementing the `count` state variable. The new `count` value is passed as a prop to each button, so they all show the new value. This is called “lifting state up”. By moving state up, you’ve shared it between components.
```
import { useState } from 'react';
export default function MyApp() {
  const \[count, setCount\] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div\>
      <h1\>Counters that update together</h1\>
      <MyButton count\={count} onClick\={handleClick} />
      <MyButton count\={count} onClick\={handleClick} />
    </div\>
  );
}
function MyButton({ count, onClick }) {
  return (
    <button onClick\={onClick}\>
      Clicked {count} times
    </button\>
  );
}
```
## Next Steps[](https://react.dev/learn#next-steps)

By now, you know the basics of how to write React code!

Check out the [Tutorial](https://react.dev/learn/tutorial-tic-tac-toe) to put them into practice and build your first mini-app with React.

#### _docs_handling-events.html.md

> Source: https://reactjs.org/docs/handling-events.html
> Scraped: 4/2/2025, 3:16:00 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
> 
> *   [Responding to Events](https://react.dev/learn/responding-to-events)

Handling events with React elements is very similar to handling events on DOM elements. There are some syntax differences:
*   React events are named using camelCase, rather than lowercase.
*   With JSX you pass a function as the event handler, rather than a string.

For example, the HTML:
```
<button onclick="activateLasers()">
  Activate Lasers
</button>
```
is slightly different in React:
```
<button onClick={activateLasers}>  Activate Lasers
</button>
```
Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:
```
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```
In React, this could instead be:
```
function Form() {
  function handleSubmit(e) {
    e.preventDefault();    console.log('You clicked submit.');
  }
  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```
Here, `e` is a synthetic event. React defines these synthetic events according to the [W3C spec](https://www.w3.org/TR/DOM-Level-3-Events/), so you don’t need to worry about cross-browser compatibility. React events do not work exactly the same as native events. See the [`SyntheticEvent`](_docs_events.html.md) reference guide to learn more.

When using React, you generally don’t need to call `addEventListener` to add listeners to a DOM element after it is created. Instead, just provide a listener when the element is initially rendered.

When you define a component using an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), a common pattern is for an event handler to be a method on the class. For example, this `Toggle` component renders a button that lets the user toggle between “ON” and “OFF” states:
```
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    // This binding is necessary to make `this` work in the callback    this.handleClick = this.handleClick.bind(this);  }
  handleClick() {    this.setState(prevState => ({      isToggleOn: !prevState.isToggleOn    }));  }
  render() {
    return (
      <button onClick={this.handleClick}>        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

You have to be careful about the meaning of `this` in JSX callbacks. In JavaScript, class methods are not [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) by default. If you forget to bind `this.handleClick` and pass it to `onClick`, `this` will be `undefined` when the function is actually called.

This is not React-specific behavior; it is a part of [how functions work in JavaScript](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Generally, if you refer to a method without `()` after it, such as `onClick={this.handleClick}`, you should bind that method.

If calling `bind` annoys you, there are two ways you can get around this. You can use [public class fields syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) to correctly bind callbacks:
```
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.  handleClick = () => {    console.log('this is:', this);  };  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```
This syntax is enabled by default in [Create React App](https://github.com/facebookincubator/create-react-app).

If you aren’t using class fields syntax, you can use an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) in the callback:
```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    // This syntax ensures `this` is bound within handleClick    return (      <button onClick={() => this.handleClick()}>        Click me
      </button>
    );
  }
}
```
The problem with this syntax is that a different callback is created each time the `LoggingButton` renders. In most cases, this is fine. However, if this callback is passed as a prop to lower components, those components might do an extra re-rendering. We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.

## [](_docs_handling-events.html.md#passing-arguments-to-event-handlers)Passing Arguments to Event Handlers

Inside a loop, it is common to want to pass an extra parameter to an event handler. For example, if `id` is the row ID, either of the following would work:
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
The above two lines are equivalent, and use [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) respectively.

In both cases, the `e` argument representing the React event will be passed as a second argument after the ID. With an arrow function, we have to pass it explicitly, but with `bind` any further arguments are automatically forwarded.

#### _docs_hello-world.html.md

> Source: https://reactjs.org/docs/hello-world.html
> Scraped: 4/2/2025, 3:15:58 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> See [Quick Start](https://react.dev/learn) for an introduction to React.

The smallest React example looks like this:
```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
```
It displays a heading saying “Hello, world!” on the page.

**[Try it on CodePen](https://codepen.io/gaearon/pen/rrpgNB?editors=1010)**

Click the link above to open an online editor. Feel free to make some changes, and see how they affect the output. Most pages in this guide will have editable examples like this one.

## [](_docs_hello-world.html.md#how-to-read-this-guide)How to Read This Guide

In this guide, we will examine the building blocks of React apps: elements and components. Once you master them, you can create complex apps from small reusable pieces.

> Tip
> 
> This guide is designed for people who prefer **learning concepts step by step**. If you prefer to learn by doing, check out our [practical tutorial](_tutorial_tutorial.html.md). You might find this guide and the tutorial complementary to each other.

This is the first chapter in a step-by-step guide about main React concepts. You can find a list of all its chapters in the navigation sidebar. If you’re reading this from a mobile device, you can access the navigation by pressing the button in the bottom right corner of your screen.

Every chapter in this guide builds on the knowledge introduced in earlier chapters. **You can learn most of React by reading the “Main Concepts” guide chapters in the order they appear in the sidebar.** For example, [“Introducing JSX”](_docs_introducing-jsx.html.md) is the next chapter after this one.

## [](_docs_hello-world.html.md#knowledge-level-assumptions)Knowledge Level Assumptions

React is a JavaScript library, and so we’ll assume you have a basic understanding of the JavaScript language. **If you don’t feel very confident, we recommend [going through a JavaScript tutorial](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) to check your knowledge level** and enable you to follow along this guide without getting lost. It might take you between 30 minutes and an hour, but as a result you won’t have to feel like you’re learning both React and JavaScript at the same time.

> Note
> 
> This guide occasionally uses some newer JavaScript syntax in the examples. If you haven’t worked with JavaScript in the last few years, [these three points](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) should get you most of the way.

## [](_docs_hello-world.html.md#lets-get-started)Let’s Get Started!

Keep scrolling down, and you’ll find the link to the [next chapter of this guide](_docs_introducing-jsx.html.md) right before the website footer.

#### _docs_higher-order-components.html.md

> Source: https://reactjs.org/docs/higher-order-components.html
> Scraped: 4/2/2025, 3:11:30 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> Higher-order components are not commonly used in modern React code.

A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.

Concretely, **a higher-order component is a function that takes a component and returns a new component.**
```
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
Whereas a component transforms props into UI, a higher-order component transforms a component into another component.

HOCs are common in third-party React libraries, such as Redux’s [`connect`](https://react-redux.js.org/api/connect) and Relay’s [`createFragmentContainer`](https://relay.dev/docs/v10.1.3/fragment-container/#createfragmentcontainer).

In this document, we’ll discuss why higher-order components are useful, and how to write your own.

## [](_docs_higher-order-components.html.md#use-hocs-for-cross-cutting-concerns)Use HOCs For Cross-Cutting Concerns

> **Note**
> 
> We previously recommended mixins as a way to handle cross-cutting concerns. We’ve since realized that mixins create more trouble than they are worth. [Read more](_blog_2016_07_13_mixins-considered-harmful.html.md) about why we’ve moved away from mixins and how you can transition your existing components.

Components are the primary unit of code reuse in React. However, you’ll find that some patterns aren’t a straightforward fit for traditional components.

For example, say you have a `CommentList` component that subscribes to an external data source to render a list of comments:
```
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" is some global data source
      comments: DataSource.getComments()
    };
  }
  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }
  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }
  handleChange() {
    // Update component state whenever the data source changes
    this.setState({
      comments: DataSource.getComments()
    });
  }
  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```
Later, you write a component for subscribing to a single blog post, which follows a similar pattern:
```
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }
  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }
  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }
  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }
  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```
`CommentList` and `BlogPost` aren’t identical — they call different methods on `DataSource`, and they render different output. But much of their implementation is the same:
*   On mount, add a change listener to `DataSource`.
*   Inside the listener, call `setState` whenever the data source changes.
*   On unmount, remove the change listener.

You can imagine that in a large app, this same pattern of subscribing to `DataSource` and calling `setState` will occur over and over again. We want an abstraction that allows us to define this logic in a single place and share it across many components. This is where higher-order components excel.

We can write a function that creates components, like `CommentList` and `BlogPost`, that subscribe to `DataSource`. The function will accept as one of its arguments a child component that receives the subscribed data as a prop. Let’s call the function `withSubscription`:
```
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);
const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```
The first parameter is the wrapped component. The second parameter retrieves the data we’re interested in, given a `DataSource` and the current props.

When `CommentListWithSubscription` and `BlogPostWithSubscription` are rendered, `CommentList` and `BlogPost` will be passed a `data` prop with the most current data retrieved from `DataSource`:
```
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }
    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }
    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }
    render() {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```
Note that a HOC doesn’t modify the input component, nor does it use inheritance to copy its behavior. Rather, a HOC _composes_ the original component by _wrapping_ it in a container component. A HOC is a pure function with zero side-effects.

And that’s it! The wrapped component receives all the props of the container, along with a new prop, `data`, which it uses to render its output. The HOC isn’t concerned with how or why the data is used, and the wrapped component isn’t concerned with where the data came from.

Because `withSubscription` is a normal function, you can add as many or as few arguments as you like. For example, you may want to make the name of the `data` prop configurable, to further isolate the HOC from the wrapped component. Or you could accept an argument that configures `shouldComponentUpdate`, or one that configures the data source. These are all possible because the HOC has full control over how the component is defined.

Like components, the contract between `withSubscription` and the wrapped component is entirely props-based. This makes it easy to swap one HOC for a different one, as long as they provide the same props to the wrapped component. This may be useful if you change data-fetching libraries, for example.

## [](_docs_higher-order-components.html.md#dont-mutate-the-original-component-use-composition)Don’t Mutate the Original Component. Use Composition.

Resist the temptation to modify a component’s prototype (or otherwise mutate it) inside a HOC.
```
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log('Current props: ', this.props);
    console.log('Previous props: ', prevProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}
// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```
There are a few problems with this. One is that the input component cannot be reused separately from the enhanced component. More crucially, if you apply another HOC to `EnhancedComponent` that _also_ mutates `componentDidUpdate`, the first HOC’s functionality will be overridden! This HOC also won’t work with function components, which do not have lifecycle methods.

Mutating HOCs are a leaky abstraction—the consumer must know how they are implemented in order to avoid conflicts with other HOCs.

Instead of mutation, HOCs should use composition, by wrapping the input component in a container component:
```
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```
This HOC has the same functionality as the mutating version while avoiding the potential for clashes. It works equally well with class and function components. And because it’s a pure function, it’s composable with other HOCs, or even with itself.

You may have noticed similarities between HOCs and a pattern called **container components**. Container components are part of a strategy of separating responsibility between high-level and low-level concerns. Containers manage things like subscriptions and state, and pass props to components that handle things like rendering UI. HOCs use containers as part of their implementation. You can think of HOCs as parameterized container component definitions.

HOCs add features to a component. They shouldn’t drastically alter its contract. It’s expected that the component returned from a HOC has a similar interface to the wrapped component.

HOCs should pass through props that are unrelated to its specific concern. Most HOCs contain a render method that looks something like this:
```
render() {
  // Filter out extra props that are specific to this HOC and shouldn't be
  // passed through
  const { extraProp, ...passThroughProps } = this.props;
  // Inject props into the wrapped component. These are usually state values or
  // instance methods.
  const injectedProp = someStateOrInstanceMethod;
  // Pass props to wrapped component
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```
This convention helps ensure that HOCs are as flexible and reusable as possible.

## [](_docs_higher-order-components.html.md#convention-maximizing-composability)Convention: Maximizing Composability

Not all HOCs look the same. Sometimes they accept only a single argument, the wrapped component:
```
const NavbarWithRouter = withRouter(Navbar);
```
Usually, HOCs accept additional arguments. In this example from Relay, a config object is used to specify a component’s data dependencies:
```
const CommentWithRelay = Relay.createContainer(Comment, config);
```
The most common signature for HOCs looks like this:
```
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```
_What?!_ If you break it apart, it’s easier to see what’s going on.
```
// connect is a function that returns another function
const enhance = connect(commentListSelector, commentListActions);
// The returned function is a HOC, which returns a component that is connected
// to the Redux store
const ConnectedComment = enhance(CommentList);
```
In other words, `connect` is a higher-order function that returns a higher-order component!

This form may seem confusing or unnecessary, but it has a useful property. Single-argument HOCs like the one returned by the `connect` function have the signature `Component => Component`. Functions whose output type is the same as its input type are really easy to compose together.
```
// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))
// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```
(This same property also allows `connect` and other enhancer-style HOCs to be used as decorators, an experimental JavaScript proposal.)

The `compose` utility function is provided by many third-party libraries including lodash (as [`lodash.flowRight`](https://lodash.com/docs/#flowRight)), [Redux](https://redux.js.org/api/compose), and [Ramda](https://ramdajs.com/docs/#compose).

## [](_docs_higher-order-components.html.md#convention-wrap-the-display-name-for-easy-debugging)Convention: Wrap the Display Name for Easy Debugging

The container components created by HOCs show up in the [React Developer Tools](https://github.com/facebook/react/tree/main/packages/react-devtools) like any other component. To ease debugging, choose a display name that communicates that it’s the result of a HOC.

The most common technique is to wrap the display name of the wrapped component. So if your higher-order component is named `withSubscription`, and the wrapped component’s display name is `CommentList`, use the display name `WithSubscription(CommentList)`:
```
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```
## [](_docs_higher-order-components.html.md#caveats)Caveats

Higher-order components come with a few caveats that aren’t immediately obvious if you’re new to React.

### [](_docs_higher-order-components.html.md#dont-use-hocs-inside-the-render-method)Don’t Use HOCs Inside the render Method

React’s diffing algorithm (called [Reconciliation](_docs_reconciliation.html.md)) uses component identity to determine whether it should update the existing subtree or throw it away and mount a new one. If the component returned from `render` is identical (`===`) to the component from the previous render, React recursively updates the subtree by diffing it with the new one. If they’re not equal, the previous subtree is unmounted completely.

Normally, you shouldn’t need to think about this. But it matters for HOCs because it means you can’t apply a HOC to a component within the render method of a component:
```
render() {
  // A new version of EnhancedComponent is created on every render
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // That causes the entire subtree to unmount/remount each time!
  return <EnhancedComponent />;
}
```
The problem here isn’t just about performance — remounting a component causes the state of that component and all of its children to be lost.

Instead, apply HOCs outside the component definition so that the resulting component is created only once. Then, its identity will be consistent across renders. This is usually what you want, anyway.

In those rare cases where you need to apply a HOC dynamically, you can also do it inside a component’s lifecycle methods or its constructor.

### [](_docs_higher-order-components.html.md#static-methods-must-be-copied-over)Static Methods Must Be Copied Over

Sometimes it’s useful to define a static method on a React component. For example, Relay containers expose a static method `getFragment` to facilitate the composition of GraphQL fragments.

When you apply a HOC to a component, though, the original component is wrapped with a container component. That means the new component does not have any of the static methods of the original component.
```
// Define a static method
WrappedComponent.staticMethod = function() {/*...*/}
// Now apply a HOC
const EnhancedComponent = enhance(WrappedComponent);
// The enhanced component has no static method
typeof EnhancedComponent.staticMethod === 'undefined' // true
```
To solve this, you could copy the methods onto the container before returning it:
```
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Must know exactly which method(s) to copy :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```
However, this requires you to know exactly which methods need to be copied. You can use [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) to automatically copy all non-React static methods:
```
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```
Another possible solution is to export the static method separately from the component itself.
```
// Instead of...
MyComponent.someFunction = someFunction;
export default MyComponent;
// ...export the method separately...
export { someFunction };
// ...and in the consuming module, import both
import MyComponent, { someFunction } from './MyComponent.js';
```
### [](_docs_higher-order-components.html.md#refs-arent-passed-through)Refs Aren’t Passed Through

While the convention for higher-order components is to pass through all props to the wrapped component, this does not work for refs. That’s because `ref` is not really a prop — like `key`, it’s handled specially by React. If you add a ref to an element whose component is the result of a HOC, the ref refers to an instance of the outermost container component, not the wrapped component.

The solution for this problem is to use the `React.forwardRef` API (introduced with React 16.3). [Learn more about it in the forwarding refs section](_docs_forwarding-refs.html.md).

#### _docs_hooks-intro.html.md

> Source: https://reactjs.org/docs/hooks-intro.html
> Scraped: 4/2/2025, 3:15:59 PM

_Hooks_ are a new addition in React 16.8. They let you use state and other React features without writing a class.
```
import React, { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
This new function `useState` is the first “Hook” we’ll learn about, but this example is just a teaser. Don’t worry if it doesn’t make sense yet!

**You can start learning Hooks [on the next page](_docs_hooks-overview.html.md).** On this page, we’ll continue by explaining why we’re adding Hooks to React and how they can help you write great applications.

> Note
> 
> React 16.8.0 is the first release to support Hooks. When upgrading, don’t forget to update all packages, including React DOM. React Native has supported Hooks since [the 0.59 release of React Native](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059).

## [](_docs_hooks-intro.html.md#video-introduction)Video Introduction

At React Conf 2018, Sophie Alpert and Dan Abramov introduced Hooks, followed by Ryan Florence demonstrating how to refactor an application to use them. Watch the video here:

## [](_docs_hooks-intro.html.md#no-breaking-changes)No Breaking Changes

Before we continue, note that Hooks are:
*   **Completely opt-in.** You can try Hooks in a few components without rewriting any existing code. But you don’t have to learn or use Hooks right now if you don’t want to.
*   **100% backwards-compatible.** Hooks don’t contain any breaking changes.
*   **Available now.** Hooks are now available with the release of v16.8.0.

**There are no plans to remove classes from React.** You can read more about the gradual adoption strategy for Hooks in the [bottom section](_docs_hooks-intro.html.md#gradual-adoption-strategy) of this page.

**Hooks don’t replace your knowledge of React concepts.** Instead, Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. As we will show later, Hooks also offer a new powerful way to combine them.

**If you just want to start learning Hooks, feel free to [jump directly to the next page!](_docs_hooks-overview.html.md)** You can also keep reading this page to learn more about why we’re adding Hooks, and how we’re going to start using them without rewriting our applications.

## [](_docs_hooks-intro.html.md#motivation)Motivation

Hooks solve a wide variety of seemingly unconnected problems in React that we’ve encountered over five years of writing and maintaining tens of thousands of components. Whether you’re learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.

### [](_docs_hooks-intro.html.md#its-hard-to-reuse-stateful-logic-between-components)It’s hard to reuse stateful logic between components

React doesn’t offer a way to “attach” reusable behavior to a component (for example, connecting it to a store). If you’ve worked with React for a while, you may be familiar with patterns like [render props](_docs_render-props.html.md) and [higher-order components](_docs_higher-order-components.html.md) that try to solve this. But these patterns require you to restructure your components when you use them, which can be cumbersome and make code harder to follow. If you look at a typical React application in React DevTools, you will likely find a “wrapper hell” of components surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions. While we could [filter them out in DevTools](https://github.com/facebook/react-devtools/pull/503), this points to a deeper underlying problem: React needs a better primitive for sharing stateful logic.

With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. **Hooks allow you to reuse stateful logic without changing your component hierarchy.** This makes it easy to share Hooks among many components or with the community.

We’ll discuss this more in [Building Your Own Hooks](_docs_hooks-custom.html.md).

### [](_docs_hooks-intro.html.md#complex-components-become-hard-to-understand)Complex components become hard to understand

We’ve often had to maintain components that started out simple but grew into an unmanageable mess of stateful logic and side effects. Each lifecycle method often contains a mix of unrelated logic. For example, components might perform some data fetching in `componentDidMount` and `componentDidUpdate`. However, the same `componentDidMount` method might also contain some unrelated logic that sets up event listeners, with cleanup performed in `componentWillUnmount`. Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method. This makes it too easy to introduce bugs and inconsistencies.

In many cases it’s not possible to break these components into smaller ones because the stateful logic is all over the place. It’s also difficult to test them. This is one of the reasons many people prefer to combine React with a separate state management library. However, that often introduces too much abstraction, requires you to jump between different files, and makes reusing components more difficult.

To solve this, **Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data)**, rather than forcing a split based on lifecycle methods. You may also opt into managing the component’s local state with a reducer to make it more predictable.

We’ll discuss this more in [Using the Effect Hook](_docs_hooks-effect.html.md#tip-use-multiple-effects-to-separate-concerns).

### [](_docs_hooks-intro.html.md#classes-confuse-both-people-and-machines)Classes confuse both people and machines

In addition to making code reuse and code organization more difficult, we’ve found that classes can be a large barrier to learning React. You have to understand how `this` works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without [ES2022 public class fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields), the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.

Additionally, React has been out for about five years, and we want to make sure it stays relevant in the next five years. As [Svelte](https://svelte.dev/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/), and others show, [ahead-of-time compilation](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) of components has a lot of future potential. Especially if it’s not limited to templates. Recently, we’ve been experimenting with [component folding](https://github.com/facebook/react/issues/7323) using [Prepack](https://prepack.io/), and we’ve seen promising early results. However, we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path. Classes present issues for today’s tools, too. For example, classes don’t minify very well, and they make hot reloading flaky and unreliable. We want to present an API that makes it more likely for code to stay on the optimizable path.

To solve these problems, **Hooks let you use more of React’s features without classes.** Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don’t require you to learn complex functional or reactive programming techniques.

> Examples
> 
> [Hooks at a Glance](_docs_hooks-overview.html.md) is a good place to start learning Hooks.

## [](_docs_hooks-intro.html.md#gradual-adoption-strategy)Gradual Adoption Strategy

> **TLDR: There are no plans to remove classes from React.**

We know that React developers are focused on shipping products and don’t have time to look into every new API that’s being released. Hooks are very new, and it might be better to wait for more examples and tutorials before considering learning or adopting them.

We also understand that the bar for adding a new primitive to React is extremely high. For curious readers, we have prepared a [detailed RFC](https://github.com/reactjs/rfcs/pull/68) that dives into the motivation with more details, and provides extra perspective on the specific design decisions and related prior art.

**Crucially, Hooks work side-by-side with existing code so you can adopt them gradually.** There is no rush to migrate to Hooks. We recommend avoiding any “big rewrites”, especially for existing, complex class components. It takes a bit of a mind shift to start “thinking in Hooks”. In our experience, it’s best to practice using Hooks in new and non-critical components first, and ensure that everybody on your team feels comfortable with them. After you give Hooks a try, please feel free to [send us feedback](https://github.com/facebook/react/issues/new), positive or negative.

We intend for Hooks to cover all existing use cases for classes, but **we will keep supporting class components for the foreseeable future.** At Facebook, we have tens of thousands of components written as classes, and we have absolutely no plans to rewrite them. Instead, we are starting to use Hooks in the new code side by side with classes.

## [](_docs_hooks-intro.html.md#frequently-asked-questions)Frequently Asked Questions

We’ve prepared a [Hooks FAQ page](_docs_hooks-faq.html.md) that answers the most common questions about Hooks.

## [](_docs_hooks-intro.html.md#next-steps)Next Steps

By the end of this page, you should have a rough idea of what problems Hooks are solving, but many details are probably unclear. Don’t worry! **Let’s now go to [the next page](_docs_hooks-overview.html.md) where we start learning about Hooks by example.**

#### _docs_hooks-reference.html.md

> Source: https://reactjs.org/docs/hooks-reference.html
> Scraped: 4/2/2025, 3:11:31 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React:
> 
> *   [`react`: Hooks](https://react.dev/reference/react)

_Hooks_ are a new addition in React 16.8. They let you use state and other React features without writing a class.

This page describes the APIs for the built-in Hooks in React.

If you’re new to Hooks, you might want to check out [the overview](_docs_hooks-overview.html.md) first. You may also find useful information in the [frequently asked questions](_docs_hooks-faq.html.md) section.
*   [Basic Hooks](_docs_hooks-reference.html.md#basic-hooks)
    
    *   [`useState`](_docs_hooks-reference.html.md#usestate)
    *   [`useEffect`](_docs_hooks-reference.html.md#useeffect)
    *   [`useContext`](_docs_hooks-reference.html.md#usecontext)
*   [Additional Hooks](_docs_hooks-reference.html.md#additional-hooks)
    
    *   [`useReducer`](_docs_hooks-reference.html.md#usereducer)
    *   [`useCallback`](_docs_hooks-reference.html.md#usecallback)
    *   [`useMemo`](_docs_hooks-reference.html.md#usememo)
    *   [`useRef`](_docs_hooks-reference.html.md#useref)
    *   [`useImperativeHandle`](_docs_hooks-reference.html.md#useimperativehandle)
    *   [`useLayoutEffect`](_docs_hooks-reference.html.md#uselayouteffect)
    *   [`useDebugValue`](_docs_hooks-reference.html.md#usedebugvalue)
    *   [`useDeferredValue`](_docs_hooks-reference.html.md#usedeferredvalue)
    *   [`useTransition`](_docs_hooks-reference.html.md#usetransition)
    *   [`useId`](_docs_hooks-reference.html.md#useid)
*   [Library Hooks](_docs_hooks-reference.html.md#library-hooks)
    
    *   [`useSyncExternalStore`](_docs_hooks-reference.html.md#usesyncexternalstore)
    *   [`useInsertionEffect`](_docs_hooks-reference.html.md#useinsertioneffect)

## [](_docs_hooks-reference.html.md#basic-hooks)Basic Hooks

### [](_docs_hooks-reference.html.md#usestate)`useState`

> This content is out of date.
> 
> Read the new React documentation for [`useState`](https://react.dev/reference/react/useState).
```
const [state, setState] = useState(initialState);
```
Returns a stateful value, and a function to update it.

During the initial render, the returned state (`state`) is the same as the value passed as the first argument (`initialState`).

The `setState` function is used to update the state. It accepts a new state value and enqueues a re-render of the component.

During subsequent re-renders, the first value returned by `useState` will always be the most recent state after applying updates.

> Note
> 
> React guarantees that `setState` function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the `useEffect` or `useCallback` dependency list.

#### [](_docs_hooks-reference.html.md#functional-updates)Functional updates

If the new state is computed using the previous state, you can pass a function to `setState`. The function will receive the previous value, and return an updated value. Here’s an example of a counter component that uses both forms of `setState`:
```
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```
The ”+” and ”-” buttons use the functional form, because the updated value is based on the previous value. But the “Reset” button uses the normal form, because it always sets the count back to the initial value.

If your update function returns the exact same value as the current state, the subsequent rerender will be skipped completely.

> Note
> 
> Unlike the `setState` method found in class components, `useState` does not automatically merge update objects. You can replicate this behavior by combining the function updater form with object spread syntax:
> 
> ```
> const [state, setState] = useState({});
> setState(prevState => {
>   // Object.assign would also work
>   return {...prevState, ...updatedValues};
> });
> ```
> 
> Another option is `useReducer`, which is more suited for managing state objects that contain multiple sub-values.

#### [](_docs_hooks-reference.html.md#lazy-initial-state)Lazy initial state

The `initialState` argument is the state used during the initial render. In subsequent renders, it is disregarded. If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render:
```
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```
#### [](_docs_hooks-reference.html.md#bailing-out-of-a-state-update)Bailing out of a state update

If you update a State Hook to the same value as the current state, React will bail out without rendering the children or firing effects. (React uses the [`Object.is` comparison algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Note that React may still need to render that specific component again before bailing out. That shouldn’t be a concern because React won’t unnecessarily go “deeper” into the tree. If you’re doing expensive calculations while rendering, you can optimize them with `useMemo`.

#### [](_docs_hooks-reference.html.md#batching-of-state-updates)Batching of state updates

React may group several state updates into a single re-render to improve performance. Normally, this improves performance and shouldn’t affect your application’s behavior.

Before React 18, only updates inside React event handlers were batched. Starting with React 18, [batching is enabled for all updates by default](_blog_2022_03_08_react-18-upgrade-guide.html.md#automatic-batching). Note that React makes sure that updates from several _different_ user-initiated events — for example, clicking a button twice — are always processed separately and do not get batched. This prevents logical mistakes.

In the rare case that you need to force the DOM update to be applied synchronously, you may wrap it in [`flushSync`](_docs_react-dom.html.md#flushsync). However, this can hurt performance so do this only where needed.

### [](_docs_hooks-reference.html.md#useeffect)`useEffect`

> This content is out of date.
> 
> Read the new React documentation for [`useEffect`](https://react.dev/reference/react/useEffect).

Accepts a function that contains imperative, possibly effectful code.

Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s _render phase_). Doing so will lead to confusing bugs and inconsistencies in the UI.

Instead, use `useEffect`. The function passed to `useEffect` will run after the render is committed to the screen. Think of effects as an escape hatch from React’s purely functional world into the imperative world.

By default, effects run after every completed render, but you can choose to fire them [only when certain values have changed](_docs_hooks-reference.html.md#conditionally-firing-an-effect).

#### [](_docs_hooks-reference.html.md#cleaning-up-an-effect)Cleaning up an effect

Often, effects create resources that need to be cleaned up before the component leaves the screen, such as a subscription or timer ID. To do this, the function passed to `useEffect` may return a clean-up function. For example, to create a subscription:
```
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```
The clean-up function runs before the component is removed from the UI to prevent memory leaks. Additionally, if a component renders multiple times (as they typically do), the **previous effect is cleaned up before executing the next effect**. In our example, this means a new subscription is created on every update. To avoid firing an effect on every update, refer to the next section.

#### [](_docs_hooks-reference.html.md#timing-of-effects)Timing of effects

Unlike `componentDidMount` and `componentDidUpdate`, the function passed to `useEffect` fires **after** layout and paint, during a deferred event. This makes it suitable for the many common side effects, like setting up subscriptions and event handlers, because most types of work shouldn’t block the browser from updating the screen.

However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. (The distinction is conceptually similar to passive versus active event listeners.) For these types of effects, React provides one additional Hook called [`useLayoutEffect`](_docs_hooks-reference.html.md#uselayouteffect). It has the same signature as `useEffect`, and only differs in when it is fired.

Additionally, starting in React 18, the function passed to `useEffect` will fire synchronously **before** layout and paint when it’s the result of a discrete user input such as a click, or when it’s the result of an update wrapped in [`flushSync`](_docs_react-dom.html.md#flushsync). This behavior allows the result of the effect to be observed by the event system, or by the caller of [`flushSync`](_docs_react-dom.html.md#flushsync).

> Note
> 
> This only affects the timing of when the function passed to `useEffect` is called - updates scheduled inside these effects are still deferred. This is different than [`useLayoutEffect`](_docs_hooks-reference.html.md#uselayouteffect), which fires the function and processes the updates inside of it immediately.

Even in cases where `useEffect` is deferred until after the browser has painted, it’s guaranteed to fire before any new renders. React will always flush a previous render’s effects before starting a new update.

#### [](_docs_hooks-reference.html.md#conditionally-firing-an-effect)Conditionally firing an effect

The default behavior for effects is to fire the effect after every completed render. That way an effect is always recreated if one of its dependencies changes.

However, this may be overkill in some cases, like the subscription example from the previous section. We don’t need to create a new subscription on every update, only if the `source` prop has changed.

To implement this, pass a second argument to `useEffect` that is the array of values that the effect depends on. Our updated example now looks like this:
```
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```
Now the subscription will only be recreated when `props.source` changes.

> Note
> 
> If you use this optimization, make sure the array includes **all values from the component scope (such as props and state) that change over time and that are used by the effect**. Otherwise, your code will reference stale values from previous renders. Learn more about [how to deal with functions](_docs_hooks-faq.html.md#is-it-safe-to-omit-functions-from-the-list-of-dependencies) and what to do when the [array values change too often](_docs_hooks-faq.html.md#what-can-i-do-if-my-effect-dependencies-change-too-often).
> 
> If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn’t depend on _any_ values from props or state, so it never needs to re-run. This isn’t handled as a special case — it follows directly from how the dependencies array always works.
> 
> If you pass an empty array (`[]`), the props and state inside the effect will always have their initial values. While passing `[]` as the second argument is closer to the familiar `componentDidMount` and `componentWillUnmount` mental model, there are usually [better](_docs_hooks-faq.html.md#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [solutions](_docs_hooks-faq.html.md#what-can-i-do-if-my-effect-dependencies-change-too-often) to avoid re-running effects too often. Also, don’t forget that React defers running `useEffect` until after the browser has painted, so doing extra work is less of a problem.
> 
> We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

The array of dependencies is not passed as arguments to the effect function. Conceptually, though, that’s what they represent: every value referenced inside the effect function should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.

### [](_docs_hooks-reference.html.md#usecontext)`useContext`

> This content is out of date.
> 
> Read the new React documentation for [`useContext`](https://react.dev/reference/react/useContext).
```
const value = useContext(MyContext);
```
Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context. The current context value is determined by the `value` prop of the nearest `<MyContext.Provider>` above the calling component in the tree.

When the nearest `<MyContext.Provider>` above the component updates, this Hook will trigger a rerender with the latest context `value` passed to that `MyContext` provider. Even if an ancestor uses [`React.memo`](_docs_react-api.html.md#reactmemo) or [`shouldComponentUpdate`](_docs_react-component.html.md#shouldcomponentupdate), a rerender will still happen starting at the component itself using `useContext`.

Don’t forget that the argument to `useContext` must be the _context object itself_:
*   **Correct:** `useContext(MyContext)`
*   **Incorrect:** `useContext(MyContext.Consumer)`
*   **Incorrect:** `useContext(MyContext.Provider)`

A component calling `useContext` will always re-render when the context value changes. If re-rendering the component is expensive, you can [optimize it by using memoization](https://github.com/facebook/react/issues/15156#issuecomment-474590693).

> Tip
> 
> If you’re familiar with the context API before Hooks, `useContext(MyContext)` is equivalent to `static contextType = MyContext` in a class, or to `<MyContext.Consumer>`.
> 
> `useContext(MyContext)` only lets you _read_ the context and subscribe to its changes. You still need a `<MyContext.Provider>` above in the tree to _provide_ the value for this context.

**Putting it together with Context.Provider**
```
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
const ThemeContext = React.createContext(themes.light);
function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
function ThemedButton() {
  const theme = useContext(ThemeContext);  return (    <button style={{ background: theme.background, color: theme.foreground }}>      I am styled by theme context!    </button>  );
}
```
This example is modified for hooks from a previous example in the [Context Advanced Guide](_docs_context.html.md), where you can find more information about when and how to use Context.

## [](_docs_hooks-reference.html.md#additional-hooks)Additional Hooks

The following Hooks are either variants of the basic ones from the previous section, or only needed for specific edge cases. Don’t stress about learning them up front.

### [](_docs_hooks-reference.html.md#usereducer)`useReducer`

> This content is out of date.
> 
> Read the new React documentation for [`useReducer`](https://react.dev/reference/react/useReducer).
```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
An alternative to [`useState`](_docs_hooks-reference.html.md#usestate). Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method. (If you’re familiar with Redux, you already know how this works.)

`useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one. `useReducer` also lets you optimize performance for components that trigger deep updates because [you can pass `dispatch` down instead of callbacks](_docs_hooks-faq.html.md#how-to-avoid-passing-callbacks-down).

Here’s the counter example from the [`useState`](_docs_hooks-reference.html.md#usestate) section, rewritten to use a reducer:
```
const initialState = {count: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
> Note
> 
> React guarantees that `dispatch` function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the `useEffect` or `useCallback` dependency list.

#### [](_docs_hooks-reference.html.md#specifying-the-initial-state)Specifying the initial state

There are two different ways to initialize `useReducer` state. You may choose either one depending on the use case. The simplest way is to pass the initial state as a second argument:
```
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}  );
```
> Note
> 
> React doesn’t use the `state = initialState` argument convention popularized by Redux. The initial value sometimes needs to depend on props and so is specified from the Hook call instead. If you feel strongly about this, you can call `useReducer(reducer, undefined, reducer)` to emulate the Redux behavior, but it’s not encouraged.

#### [](_docs_hooks-reference.html.md#lazy-initialization)Lazy initialization

You can also create the initial state lazily. To do this, you can pass an `init` function as the third argument. The initial state will be set to `init(initialArg)`.

It lets you extract the logic for calculating the initial state outside the reducer. This is also handy for resetting the state later in response to an action:
```
function init(initialCount) {  return {count: initialCount};}
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':      return init(action.payload);    default:
      throw new Error();
  }
}
function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```
#### [](_docs_hooks-reference.html.md#bailing-out-of-a-dispatch)Bailing out of a dispatch

If you return the same value from a Reducer Hook as the current state, React will bail out without rendering the children or firing effects. (React uses the [`Object.is` comparison algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description).)

Note that React may still need to render that specific component again before bailing out. That shouldn’t be a concern because React won’t unnecessarily go “deeper” into the tree. If you’re doing expensive calculations while rendering, you can optimize them with `useMemo`.

### [](_docs_hooks-reference.html.md#usecallback)`useCallback`

> This content is out of date.
> 
> Read the new React documentation for [`useCallback`](https://react.dev/reference/react/useCallback).
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) callback.

Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

> Note
> 
> The array of dependencies is not passed as arguments to the callback. Conceptually, though, that’s what they represent: every value referenced inside the callback should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.
> 
> We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

### [](_docs_hooks-reference.html.md#usememo)`useMemo`

> This content is out of date.
> 
> Read the new React documentation for [`useMemo`](https://react.dev/reference/react/useMemo).
```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
Returns a [memoized](https://en.wikipedia.org/wiki/Memoization) value.

Pass a “create” function and an array of dependencies. `useMemo` will only recompute the memoized value when one of the dependencies has changed. This optimization helps to avoid expensive calculations on every render.

Remember that the function passed to `useMemo` runs during rendering. Don’t do anything there that you wouldn’t normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.

If no array is provided, a new value will be computed on every render.

**You may rely on `useMemo` as a performance optimization, not as a semantic guarantee.** In the future, React may choose to “forget” some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without `useMemo` — and then add it to optimize performance.

> Note
> 
> The array of dependencies is not passed as arguments to the function. Conceptually, though, that’s what they represent: every value referenced inside the function should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.
> 
> We recommend using the [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) rule as part of our [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) package. It warns when dependencies are specified incorrectly and suggests a fix.

### [](_docs_hooks-reference.html.md#useref)`useRef`

> This content is out of date.
> 
> Read the new React documentation for [`useRef`](https://react.dev/reference/react/useRef).
```
const refContainer = useRef(initialValue);
```
`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component.

A common use case is to access a child imperatively:
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
Essentially, `useRef` is like a “box” that can hold a mutable value in its `.current` property.

You might be familiar with refs primarily as a way to [access the DOM](_docs_refs-and-the-dom.html.md). If you pass a ref object to React with `<div ref={myRef} />`, React will set its `.current` property to the corresponding DOM node whenever that node changes.

However, `useRef()` is useful for more than the `ref` attribute. It’s [handy for keeping any mutable value around](_docs_hooks-faq.html.md#is-there-something-like-instance-variables) similar to how you’d use instance fields in classes.

This works because `useRef()` creates a plain JavaScript object. The only difference between `useRef()` and creating a `{current: ...}` object yourself is that `useRef` will give you the same ref object on every render.

Keep in mind that `useRef` _doesn’t_ notify you when its content changes. Mutating the `.current` property doesn’t cause a re-render. If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a [callback ref](_docs_hooks-faq.html.md#how-can-i-measure-a-dom-node) instead.

### [](_docs_hooks-reference.html.md#useimperativehandle)`useImperativeHandle`
```
useImperativeHandle(ref, createHandle, [deps])
```
`useImperativeHandle` customizes the instance value that is exposed to parent components when using `ref`. As always, imperative code using refs should be avoided in most cases. `useImperativeHandle` should be used with [`forwardRef`](_docs_react-api.html.md#reactforwardref):
```
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```
In this example, a parent component that renders `<FancyInput ref={inputRef} />` would be able to call `inputRef.current.focus()`.

### [](_docs_hooks-reference.html.md#uselayouteffect)`useLayoutEffect`

> This content is out of date.
> 
> Read the new React documentation for [`useLayoutEffect`](https://react.dev/reference/react/useLayoutEffect).

The signature is identical to `useEffect`, but it fires synchronously after all DOM mutations. Use this to read layout from the DOM and synchronously re-render. Updates scheduled inside `useLayoutEffect` will be flushed synchronously, before the browser has a chance to paint.

Prefer the standard `useEffect` when possible to avoid blocking visual updates.

> Tip
> 
> If you’re migrating code from a class component, note `useLayoutEffect` fires in the same phase as `componentDidMount` and `componentDidUpdate`. However, **we recommend starting with `useEffect` first** and only trying `useLayoutEffect` if that causes a problem.
> 
> If you use server rendering, keep in mind that _neither_ `useLayoutEffect` nor `useEffect` can run until the JavaScript is downloaded. This is why React warns when a server-rendered component contains `useLayoutEffect`. To fix this, either move that logic to `useEffect` (if it isn’t necessary for the first render), or delay showing that component until after the client renders (if the HTML looks broken until `useLayoutEffect` runs).
> 
> To exclude a component that needs layout effects from the server-rendered HTML, render it conditionally with `showChild && <Child />` and defer showing it with `useEffect(() => { setShowChild(true); }, [])`. This way, the UI doesn’t appear broken before hydration.

### [](_docs_hooks-reference.html.md#usedebugvalue)`useDebugValue`

> This content is out of date.
> 
> Read the new React documentation for [`useDebugValue`](https://react.dev/reference/react/useDebugValue).

`useDebugValue` can be used to display a label for custom hooks in React DevTools.

For example, consider the `useFriendStatus` custom Hook described in [“Building Your Own Hooks”](_docs_hooks-custom.html.md):
```
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);
  // ...
  // Show a label in DevTools next to this Hook  // e.g. "FriendStatus: Online"  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```
> Tip
> 
> We don’t recommend adding debug values to every custom Hook. It’s most valuable for custom Hooks that are part of shared libraries.

#### [](_docs_hooks-reference.html.md#defer-formatting-debug-values)Defer formatting debug values

In some cases formatting a value for display might be an expensive operation. It’s also unnecessary unless a Hook is actually inspected.

For this reason `useDebugValue` accepts a formatting function as an optional second parameter. This function is only called if the Hooks are inspected. It receives the debug value as a parameter and should return a formatted display value.

For example a custom Hook that returned a `Date` value could avoid calling the `toDateString` function unnecessarily by passing the following formatter:
```
useDebugValue(date, date => date.toDateString());
```
### [](_docs_hooks-reference.html.md#usedeferredvalue)`useDeferredValue`

> This content is out of date.
> 
> Read the new React documentation for [`useDeferredValue`](https://react.dev/reference/react/useDeferredValue).
```
const deferredValue = useDeferredValue(value);
```
`useDeferredValue` accepts a value and returns a new copy of the value that will defer to more urgent updates. If the current render is the result of an urgent update, like user input, React will return the previous value and then render the new value after the urgent render has completed.

This hook is similar to user-space hooks which use debouncing or throttling to defer updates. The benefits to using `useDeferredValue` is that React will work on the update as soon as other work finishes (instead of waiting for an arbitrary amount of time), and like [`startTransition`](_docs_react-api.html.md#starttransition), deferred values can suspend without triggering an unexpected fallback for existing content.

#### [](_docs_hooks-reference.html.md#memoizing-deferred-children)Memoizing deferred children

`useDeferredValue` only defers the value that you pass to it. If you want to prevent a child component from re-rendering during an urgent update, you must also memoize that component with [`React.memo`](_docs_react-api.html.md#reactmemo) or [`React.useMemo`](_docs_hooks-reference.html.md#usememo):
```
function Typeahead() {
  const query = useSearchQuery('');
  const deferredQuery = useDeferredValue(query);
  // Memoizing tells React to only re-render when deferredQuery changes,
  // not when query changes.
  const suggestions = useMemo(() =>
    <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  );
  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">
        {suggestions}
      </Suspense>
    </>
  );
}
```
Memoizing the children tells React that it only needs to re-render them when `deferredQuery` changes and not when `query` changes. This caveat is not unique to `useDeferredValue`, and it’s the same pattern you would use with similar hooks that use debouncing or throttling.

### [](_docs_hooks-reference.html.md#usetransition)`useTransition`

> This content is out of date.
> 
> Read the new React documentation for [`useTransition`](https://react.dev/reference/react/useTransition).
```
const [isPending, startTransition] = useTransition();
```
Returns a stateful value for the pending state of the transition, and a function to start it.

`startTransition` lets you mark updates in the provided callback as transitions:
```
startTransition(() => {
  setCount(count + 1);
});
```
`isPending` indicates when a transition is active to show a pending state:
```
function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }
  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
```
> Note:
> 
> Updates in a transition yield to more urgent updates such as clicks.
> 
> Updates in a transition will not show a fallback for re-suspended content. This allows the user to continue interacting with the current content while rendering the update.

### [](_docs_hooks-reference.html.md#useid)`useId`

> This content is out of date.
> 
> Read the new React documentation for [`useId`](https://react.dev/reference/react/useId).

`useId` is a hook for generating unique IDs that are stable across the server and client, while avoiding hydration mismatches.

> Note
> 
> `useId` is **not** for generating [keys in a list](_docs_lists-and-keys.html.md#keys). Keys should be generated from your data.

For a basic example, pass the `id` directly to the elements that need it:
```
function Checkbox() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Do you like React?</label>
      <input id={id} type="checkbox" name="react"/>
    </>
  );
};
```
For multiple IDs in the same component, append a suffix using the same `id`:
```
function NameFields() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id + '-firstName'}>First Name</label>
      <div>
        <input id={id + '-firstName'} type="text" />
      </div>
      <label htmlFor={id + '-lastName'}>Last Name</label>
      <div>
        <input id={id + '-lastName'} type="text" />
      </div>
    </div>
  );
}
```
> Note:
> 
> `useId` generates a string that includes the `:` token. This helps ensure that the token is unique, but is not supported in CSS selectors or APIs like `querySelectorAll`.
> 
> `useId` supports an `identifierPrefix` to prevent collisions in multi-root apps. To configure, see the options for [`hydrateRoot`](_docs_react-dom-client.html.md#hydrateroot) and [`ReactDOMServer`](_docs_react-dom-server.html.md).

## [](_docs_hooks-reference.html.md#library-hooks)Library Hooks

The following Hooks are provided for library authors to integrate libraries deeply into the React model, and are not typically used in application code.

### [](_docs_hooks-reference.html.md#usesyncexternalstore)`useSyncExternalStore`
```
const state = useSyncExternalStore(subscribe, getSnapshot[, getServerSnapshot]);
```
`useSyncExternalStore` is a hook recommended for reading and subscribing from external data sources in a way that’s compatible with concurrent rendering features like selective hydration and time slicing.

This method returns the value of the store and accepts three arguments:
*   `subscribe`: function to register a callback that is called whenever the store changes.
*   `getSnapshot`: function that returns the current value of the store.
*   `getServerSnapshot`: function that returns the snapshot used during server rendering.

The most basic example simply subscribes to the entire store:
```
const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
```
However, you can also subscribe to a specific field:
```
const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
);
```
When server rendering, you must serialize the store value used on the server, and provide it to `useSyncExternalStore`. React will use this snapshot during hydration to prevent server mismatches:
```
const selectedField = useSyncExternalStore(
  store.subscribe,
  () => store.getSnapshot().selectedField,
  () => INITIAL_SERVER_SNAPSHOT.selectedField,
);
```
> Note:
> 
> `getSnapshot` must return a cached value. If getSnapshot is called multiple times in a row, it must return the same exact value unless there was a store update in between.
> 
> A shim is provided for supporting multiple React versions published as `use-sync-external-store/shim`. This shim will prefer `useSyncExternalStore` when available, and fallback to a user-space implementation when it’s not.
> 
> As a convenience, we also provide a version of the API with automatic support for memoizing the result of getSnapshot published as `use-sync-external-store/with-selector`.

### [](_docs_hooks-reference.html.md#useinsertioneffect)`useInsertionEffect`
```
useInsertionEffect(didUpdate);
```
The signature is identical to `useEffect`, but it fires synchronously _before_ all DOM mutations. Use this to inject styles into the DOM before reading layout in [`useLayoutEffect`](_docs_hooks-reference.html.md#uselayouteffect). Since this hook is limited in scope, this hook does not have access to refs and cannot schedule updates.

> Note:
> 
> `useInsertionEffect` should be limited to css-in-js library authors. Prefer [`useEffect`](_docs_hooks-reference.html.md#useeffect) or [`useLayoutEffect`](_docs_hooks-reference.html.md#uselayouteffect) instead.

#### _docs_hooks-state.html.md

> Source: https://reactjs.org/docs/hooks-state.html
> Scraped: 4/2/2025, 3:11:31 PM

_Hooks_ are a new addition in React 16.8. They let you use state and other React features without writing a class.

The [introduction page](_docs_hooks-intro.html.md) used this example to get familiar with Hooks:
```
import React, { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
We’ll start learning about Hooks by comparing this code to an equivalent class example.

## [](_docs_hooks-state.html.md#equivalent-class-example)Equivalent Class Example

If you used classes in React before, this code should look familiar:
```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
The state starts as `{ count: 0 }`, and we increment `state.count` when the user clicks a button by calling `this.setState()`. We’ll use snippets from this class throughout the page.

> Note
> 
> You might be wondering why we’re using a counter here instead of a more realistic example. This is to help us focus on the API while we’re still making our first steps with Hooks.

## [](_docs_hooks-state.html.md#hooks-and-function-components)Hooks and Function Components

As a reminder, function components in React look like this:
```
const Example = (props) => {
  // You can use Hooks here!
  return <div />;
}
```
or this:
```
function Example(props) {
  // You can use Hooks here!
  return <div />;
}
```
You might have previously known these as “stateless components”. We’re now introducing the ability to use React state from these, so we prefer the name “function components”.

Hooks **don’t** work inside classes. But you can use them instead of writing classes.

## [](_docs_hooks-state.html.md#whats-a-hook)What’s a Hook?

Our new example starts by importing the `useState` Hook from React:
```
import React, { useState } from 'react';
function Example() {
  // ...
}
```
**What is a Hook?** A Hook is a special function that lets you “hook into” React features. For example, `useState` is a Hook that lets you add React state to function components. We’ll learn other Hooks later.

**When would I use a Hook?** If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component. We’re going to do that right now!

> Note:
> 
> There are some special rules about where you can and can’t use Hooks within a component. We’ll learn them in [Rules of Hooks](_docs_hooks-rules.html.md).

## [](_docs_hooks-state.html.md#declaring-a-state-variable)Declaring a State Variable

In a class, we initialize the `count` state to `0` by setting `this.state` to `{ count: 0 }` in the constructor:
```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {      count: 0    };  }
```
In a function component, we have no `this`, so we can’t assign or read `this.state`. Instead, we call the `useState` Hook directly inside our component:
```
import React, { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
```
**What does calling `useState` do?** It declares a “state variable”. Our variable is called `count` but we could call it anything else, like `banana`. This is a way to “preserve” some values between the function calls — `useState` is a new way to use the exact same capabilities that `this.state` provides in a class. Normally, variables “disappear” when the function exits but state variables are preserved by React.

**What do we pass to `useState` as an argument?** The only argument to the `useState()` Hook is the initial state. Unlike with classes, the state doesn’t have to be an object. We can keep a number or a string if that’s all we need. In our example, we just want a number for how many times the user clicked, so pass `0` as initial state for our variable. (If we wanted to store two different values in state, we would call `useState()` twice.)

**What does `useState` return?** It returns a pair of values: the current state and a function that updates it. This is why we write `const [count, setCount] = useState()`. This is similar to `this.state.count` and `this.setState` in a class, except you get them in a pair. If you’re not familiar with the syntax we used, we’ll come back to it [at the bottom of this page](_docs_hooks-state.html.md#tip-what-do-square-brackets-mean).

Now that we know what the `useState` Hook does, our example should make more sense:
```
import React, { useState } from 'react';
function Example() {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
```
We declare a state variable called `count`, and set it to `0`. React will remember its current value between re-renders, and provide the most recent one to our function. If we want to update the current `count`, we can call `setCount`.

> Note
> 
> You might be wondering: why is `useState` not named `createState` instead?
> 
> “Create” wouldn’t be quite accurate because the state is only created the first time our component renders. During the next renders, `useState` gives us the current state. Otherwise it wouldn’t be “state” at all! There’s also a reason why Hook names _always_ start with `use`. We’ll learn why later in the [Rules of Hooks](_docs_hooks-rules.html.md).

## [](_docs_hooks-state.html.md#reading-state)Reading State

When we want to display the current count in a class, we read `this.state.count`:
```
  <p>You clicked {this.state.count} times</p>
```
In a function, we can use `count` directly:
```
  <p>You clicked {count} times</p>
```
## [](_docs_hooks-state.html.md#updating-state)Updating State

In a class, we need to call `this.setState()` to update the `count` state:
```
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>    Click me
  </button>
```
In a function, we already have `setCount` and `count` as variables so we don’t need `this`:
```
  <button onClick={() => setCount(count + 1)}>    Click me
  </button>
```
## [](_docs_hooks-state.html.md#recap)Recap

Let’s now **recap what we learned line by line** and check our understanding.
```
 1:  import React, { useState } from 'react'; 2:
 3:  function Example() {
 4:    const [count, setCount] = useState(0); 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```
*   **Line 1:** We import the `useState` Hook from React. It lets us keep local state in a function component.
*   **Line 4:** Inside the `Example` component, we declare a new state variable by calling the `useState` Hook. It returns a pair of values, to which we give names. We’re calling our variable `count` because it holds the number of button clicks. We initialize it to zero by passing `0` as the only `useState` argument. The second returned item is itself a function. It lets us update the `count` so we’ll name it `setCount`.
*   **Line 9:** When the user clicks, we call `setCount` with a new value. React will then re-render the `Example` component, passing the new `count` value to it.

This might seem like a lot to take in at first. Don’t rush it! If you’re lost in the explanation, look at the code above again and try to read it from top to bottom. We promise that once you try to “forget” how state works in classes, and look at this code with fresh eyes, it will make sense.

### [](_docs_hooks-state.html.md#tip-what-do-square-brackets-mean)Tip: What Do Square Brackets Mean?

You might have noticed the square brackets when we declare a state variable:
```
  const [count, setCount] = useState(0);
```
The names on the left aren’t a part of the React API. You can name your own state variables:
```
  const [fruit, setFruit] = useState('banana');
```
This JavaScript syntax is called [“array destructuring”](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring). It means that we’re making two new variables `fruit` and `setFruit`, where `fruit` is set to the first value returned by `useState`, and `setFruit` is the second. It is equivalent to this code:
```
  var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair
```
When we declare a state variable with `useState`, it returns a pair — an array with two items. The first item is the current value, and the second is a function that lets us update it. Using `[0]` and `[1]` to access them is a bit confusing because they have a specific meaning. This is why we use array destructuring instead.

> Note
> 
> You might be curious how React knows which component `useState` corresponds to since we’re not passing anything like `this` back to React. We’ll answer [this question](_docs_hooks-faq.html.md#how-does-react-associate-hook-calls-with-components) and many others in the FAQ section.

### [](_docs_hooks-state.html.md#tip-using-multiple-state-variables)Tip: Using Multiple State Variables

Declaring state variables as a pair of `[something, setSomething]` is also handy because it lets us give _different_ names to different state variables if we want to use more than one:
```
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
```
In the above component, we have `age`, `fruit`, and `todos` as local variables, and we can update them individually:
```
  function handleOrangeClick() {
    // Similar to this.setState({ fruit: 'orange' })
    setFruit('orange');
  }
```
You **don’t have to** use many state variables. State variables can hold objects and arrays just fine, so you can still group related data together. However, unlike `this.setState` in a class, updating a state variable always _replaces_ it instead of merging it.

We provide more recommendations on splitting independent state variables [in the FAQ](_docs_hooks-faq.html.md#should-i-use-one-or-many-state-variables).

## [](_docs_hooks-state.html.md#next-steps)Next Steps

On this page we’ve learned about one of the Hooks provided by React, called `useState`. We’re also sometimes going to refer to it as the “State Hook”. It lets us add local state to React function components — which we did for the first time ever!

We also learned a little bit more about what Hooks are. Hooks are functions that let you “hook into” React features from function components. Their names always start with `use`, and there are more Hooks we haven’t seen yet.

**Now let’s continue by [learning the next Hook: `useEffect`.](_docs_hooks-effect.html.md)** It lets you perform side effects in components, and is similar to lifecycle methods in classes.

#### _docs_how-to-contribute.html.md

> Source: https://reactjs.org/docs/how-to-contribute.html
> Scraped: 4/2/2025, 3:15:58 PM

React is one of Facebook’s first open source projects that is both under very active development and is also being used to ship code to everybody on [facebook.com](https://www.facebook.com/). We’re still working out the kinks to make contributing to this project as easy and transparent as possible, but we’re not quite there yet. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

### [](_docs_how-to-contribute.html.md#code-of-conduct)[Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md)

Facebook has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### [](_docs_how-to-contribute.html.md#open-development)Open Development

All work on React happens directly on [GitHub](https://github.com/facebook/react). Both core team members and external contributors send pull requests which go through the same review process.

### [](_docs_how-to-contribute.html.md#semantic-versioning)Semantic Versioning

React follows [semantic versioning](https://semver.org/). We release patch versions for critical bugfixes, minor versions for new features or non-essential changes, and major versions for any breaking changes. When we make breaking changes, we also introduce deprecation warnings in a minor version so that our users learn about the upcoming changes and migrate their code in advance. Learn more about our commitment to stability and incremental migration in [our versioning policy](_docs_faq-versioning.html.md).

Every significant change is documented in the [changelog file](https://github.com/facebook/react/blob/main/CHANGELOG.md).

### [](_docs_how-to-contribute.html.md#branch-organization)Branch Organization

Submit all changes directly to the [`main branch`](https://github.com/facebook/react/tree/main). We don’t use separate branches for development or for upcoming releases. We do our best to keep `main` in good shape, with all tests passing.

Code that lands in `main` must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of `main` at any time.

### [](_docs_how-to-contribute.html.md#feature-flags)Feature Flags

To keep the `main` branch in a releasable state, breaking changes and experimental features must be gated behind a feature flag.

Feature flags are defined in [`packages/shared/ReactFeatureFlags.js`](https://github.com/facebook/react/blob/main/packages/shared/ReactFeatureFlags.js). Some builds of React may enable different sets of feature flags; for example, the React Native build may be configured differently than React DOM. These flags are found in [`packages/shared/forks`](https://github.com/facebook/react/tree/main/packages/shared/forks). Feature flags are statically typed by Flow, so you can run `yarn flow` to confirm that you’ve updated all the necessary files.

React’s build system will strip out disabled feature branches before publishing. A continuous integration job runs on every commit to check for changes in bundle size. You can use the change in size as a signal that a feature was gated correctly.

### [](_docs_how-to-contribute.html.md#bugs)Bugs

#### [](_docs_how-to-contribute.html.md#where-to-find-known-issues)Where to Find Known Issues

We are using [GitHub Issues](https://github.com/facebook/react/issues) for our public bugs. We keep a close eye on this and try to make it clear when we have an internal fix in progress. Before filing a new task, try to make sure your problem doesn’t already exist.

#### [](_docs_how-to-contribute.html.md#reporting-new-issues)Reporting New Issues

The best way to get your bug fixed is to provide a reduced test case. This [JSFiddle template](https://jsfiddle.net/Luktwrdm/) is a great starting point.

#### [](_docs_how-to-contribute.html.md#security-bugs)Security Bugs

Facebook has a [bounty program](https://www.facebook.com/whitehat/) for the safe disclosure of security bugs. With that in mind, please do not file public issues; go through the process outlined on that page.

### [](_docs_how-to-contribute.html.md#how-to-get-in-touch)How to Get in Touch
*   IRC: [#reactjs on freenode](https://webchat.freenode.net/?channels=reactjs)
*   [Discussion forums](_community_support.html.md#popular-discussion-forums)

There is also [an active community of React users on the Discord chat platform](https://www.reactiflux.com/) in case you need help with React.

### [](_docs_how-to-contribute.html.md#proposing-a-change)Proposing a Change

If you intend to change the public API, or make any non-trivial changes to the implementation, we recommend [filing an issue](https://github.com/facebook/react/issues/new). This lets us reach an agreement on your proposal before you put significant effort into it.

If you’re only fixing a bug, it’s fine to submit a pull request right away but we still recommend to file an issue detailing what you’re fixing. This is helpful in case we don’t accept that specific fix but want to keep track of the issue.

### [](_docs_how-to-contribute.html.md#your-first-pull-request)Your First Pull Request

Working on your first Pull Request? You can learn how from this free video series:

**[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)**

To help you get your feet wet and get you familiar with our contribution process, we have a list of **[good first issues](https://github.com/facebook/react/issues?q=is:open+is:issue+label:%22good+first+issue%22)** that contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.

### [](_docs_how-to-contribute.html.md#sending-a-pull-request)Sending a Pull Request

The core team is monitoring for pull requests. We will review your pull request and either merge it, request changes to it, or close it with an explanation. For API changes we may need to fix our internal uses at Facebook.com, which could cause some delay. We’ll do our best to provide updates and feedback throughout the process.

**Before submitting a pull request,** please make sure the following is done:

1.  Fork [the repository](https://github.com/facebook/react) and create your branch from `main`.
2.  Run `yarn` in the repository root.
3.  If you’ve fixed a bug or added code that should be tested, add tests!
4.  Ensure the test suite passes (`yarn test`). Tip: `yarn test --watch TestName` is helpful in development.
5.  Run `yarn test --prod` to test in the production environment.
6.  If you need a debugger, run `yarn test --debug --watch TestName`, open `chrome://inspect`, and press “Inspect”.
7.  Format your code with [prettier](https://github.com/prettier/prettier) (`yarn prettier`).
8.  Make sure your code lints (`yarn lint`). Tip: `yarn linc` to only check changed files.
9.  Run the [Flow](https://flowtype.org/) typechecks (`yarn flow`).
10.  If you haven’t already, complete the CLA.

### [](_docs_how-to-contribute.html.md#contributor-license-agreement-cla)Contributor License Agreement (CLA)

In order to accept your pull request, we need you to submit a CLA. You only need to do this once, so if you’ve done this for another Facebook open source project, you’re good to go. If you are submitting a pull request for the first time, just let us know that you have completed the CLA and we can cross-check with your GitHub username.

**[Complete your CLA here.](https://code.facebook.com/cla)**

### [](_docs_how-to-contribute.html.md#contribution-prerequisites)Contribution Prerequisites
*   You have [Node](https://nodejs.org/) installed at LTS and [Yarn](https://yarnpkg.com/en/) at v1.2.0+.
*   You have [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html) installed.
*   You have `gcc` installed or are comfortable installing a compiler if needed. Some of our dependencies may require a compilation step. On OS X, the Xcode Command Line Tools will cover this. On Ubuntu, `apt-get install build-essential` will install the required packages. Similar commands should work on other Linux distros. Windows will require some additional steps, see the [`node-gyp` installation instructions](https://github.com/nodejs/node-gyp#installation) for details.
*   You are familiar with Git.

### [](_docs_how-to-contribute.html.md#development-workflow)Development Workflow

After cloning React, run `yarn` to fetch its dependencies. Then, you can run several commands:
*   `yarn lint` checks the code style.
*   `yarn linc` is like `yarn lint` but faster because it only checks files that differ in your branch.
*   `yarn test` runs the complete test suite.
*   `yarn test --watch` runs an interactive test watcher.
*   `yarn test --prod` runs tests in the production environment.
*   `yarn test <pattern>` runs tests with matching filenames.
*   `yarn debug-test` is just like `yarn test` but with a debugger. Open `chrome://inspect` and press “Inspect”.
*   `yarn flow` runs the [Flow](https://flowtype.org/) typechecks.
*   `yarn build` creates a `build` folder with all the packages.
*   `yarn build react/index,react-dom/index --type=UMD` creates UMD builds of just React and ReactDOM.

We recommend running `yarn test` (or its variations above) to make sure you don’t introduce any regressions as you work on your change. However, it can be handy to try your build of React in a real project.

First, run `yarn build`. This will produce pre-built bundles in `build` folder, as well as prepare npm packages inside `build/packages`.

The easiest way to try your changes is to run `yarn build react/index,react-dom/index --type=UMD` and then open `fixtures/packaging/babel-standalone/dev.html`. This file already uses `react.development.js` from the `build` folder so it will pick up your changes.

If you want to try your changes in your existing React project, you may copy `build/node_modules/react/umd/react.development.js`, `build/node_modules/react-dom/umd/react-dom.development.js`, or any other build products into your app and use them instead of the stable version.

If your project uses React from npm, you may delete `react` and `react-dom` in its dependencies and use `yarn link` to point them to your local `build` folder. Note that **instead of `--type=UMD` you’ll want to pass `--type=NODE` when building**. You’ll also need to build the `scheduler` package:
```
cd ~/path_to_your_react_clone/
yarn build react/index,react/jsx,react-dom/index,scheduler --type=NODE
cd build/node_modules/react
yarn link
cd build/node_modules/react-dom
yarn link
cd ~/path/to/your/project
yarn link react react-dom
```
Every time you run `yarn build` in the React folder, the updated versions will appear in your project’s `node_modules`. You can then rebuild your project to try your changes.

If some package is still missing (e.g. maybe you use `react-dom/server` in your project), you can always do a full build with `yarn build`. Note that running `yarn build` without options takes a long time.

We still require that your pull request contains unit tests for any new functionality. This way we can ensure that we don’t break your code in the future.

### [](_docs_how-to-contribute.html.md#style-guide)Style Guide

We use an automatic code formatter called [Prettier](https://prettier.io/). Run `yarn prettier` after making any changes to the code.

Then, our linter will catch most issues that may exist in your code. You can check the status of your code styling by simply running `yarn linc`.

However, there are still some styles that the linter cannot pick up. If you are unsure about something, looking at [Airbnb’s Style Guide](https://github.com/airbnb/javascript) will guide you in the right direction.

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are “substantial”, and we ask that these be put through a bit of a design process and produce a consensus among the React core team.

The “RFC” (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project. You can contribute by visiting the [rfcs repository](https://github.com/reactjs/rfcs).

### [](_docs_how-to-contribute.html.md#license)License

By contributing to React, you agree that your contributions will be licensed under its MIT license.

### [](_docs_how-to-contribute.html.md#what-next)What Next?

Read the [next section](_docs_codebase-overview.html.md) to learn how the codebase is organized.

#### _docs_introducing-jsx.html.md

> Source: https://reactjs.org/docs/introducing-jsx.html
> Scraped: 4/2/2025, 3:16:00 PM

Consider this variable declaration:
```
const element = <h1>Hello, world!</h1>;
```
This funny tag syntax is neither a string nor HTML.

It is called JSX, and it is a syntax extension to JavaScript. We recommend using it with React to describe what the UI should look like. JSX may remind you of a template language, but it comes with the full power of JavaScript.

JSX produces React “elements”. We will explore rendering them to the DOM in the [next section](_docs_rendering-elements.html.md). Below, you can find the basics of JSX necessary to get you started.

### [](_docs_introducing-jsx.html.md#why-jsx)Why JSX?

React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display.

Instead of artificially separating _technologies_ by putting markup and logic in separate files, React [separates _concerns_](https://en.wikipedia.org/wiki/Separation_of_concerns) with loosely coupled units called “components” that contain both. We will come back to components in a [further section](_docs_components-and-props.html.md), but if you’re not yet comfortable putting markup in JS, [this talk](https://www.youtube.com/watch?v=x7cQ3mrcKaY) might convince you otherwise.

React [doesn’t require](_docs_react-without-jsx.html.md) using JSX, but most people find it helpful as a visual aid when working with UI inside the JavaScript code. It also allows React to show more useful error and warning messages.

With that out of the way, let’s get started!

### [](_docs_introducing-jsx.html.md#embedding-expressions-in-jsx)Embedding Expressions in JSX

In the example below, we declare a variable called `name` and then use it inside JSX by wrapping it in curly braces:
```
const name = 'Josh Perez';const element = <h1>Hello, {name}</h1>;
```
You can put any valid [JavaScript expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) inside the curly braces in JSX. For example, `2 + 2`, `user.firstName`, or `formatName(user)` are all valid JavaScript expressions.

In the example below, we embed the result of calling a JavaScript function, `formatName(user)`, into an `<h1>` element.
```
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}
const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};
const element = (
  <h1>
    Hello, {formatName(user)}!  </h1>
);
```
**[Try it on CodePen](https://codepen.io/gaearon/pen/PGEjdG?editors=1010)**

We split JSX over multiple lines for readability. While it isn’t required, when doing this, we also recommend wrapping it in parentheses to avoid the pitfalls of [automatic semicolon insertion](https://stackoverflow.com/q/2846283).

### [](_docs_introducing-jsx.html.md#jsx-is-an-expression-too)JSX is an Expression Too

After compilation, JSX expressions become regular JavaScript function calls and evaluate to JavaScript objects.

This means that you can use JSX inside of `if` statements and `for` loops, assign it to variables, accept it as arguments, and return it from functions:
```
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;  }
  return <h1>Hello, Stranger.</h1>;}
```
### [](_docs_introducing-jsx.html.md#specifying-attributes-with-jsx)Specifying Attributes with JSX

You may use quotes to specify string literals as attributes:
```
const element = <a href="https://www.reactjs.org"> link </a>;
```
You may also use curly braces to embed a JavaScript expression in an attribute:
```
const element = <img src={user.avatarUrl}></img>;
```
Don’t put quotes around curly braces when embedding a JavaScript expression in an attribute. You should either use quotes (for string values) or curly braces (for expressions), but not both in the same attribute.

> **Warning:**
> 
> Since JSX is closer to JavaScript than to HTML, React DOM uses `camelCase` property naming convention instead of HTML attribute names.
> 
> For example, `class` becomes [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className) in JSX, and `tabindex` becomes [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex).

### [](_docs_introducing-jsx.html.md#specifying-children-with-jsx)Specifying Children with JSX

If a tag is empty, you may close it immediately with `/>`, like XML:
```
const element = <img src={user.avatarUrl} />;
```
JSX tags may contain children:
```
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```
### [](_docs_introducing-jsx.html.md#jsx-prevents-injection-attacks)JSX Prevents Injection Attacks

It is safe to embed user input in JSX:
```
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```
By default, React DOM [escapes](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) any values embedded in JSX before rendering them. Thus it ensures that you can never inject anything that’s not explicitly written in your application. Everything is converted to a string before being rendered. This helps prevent [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks.

### [](_docs_introducing-jsx.html.md#jsx-represents-objects)JSX Represents Objects

Babel compiles JSX down to `React.createElement()` calls.

These two examples are identical:
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```
`React.createElement()` performs a few checks to help you write bug-free code but essentially it creates an object like this:
```
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```
These objects are called “React elements”. You can think of them as descriptions of what you want to see on the screen. React reads these objects and uses them to construct the DOM and keep it up to date.

We will explore rendering React elements to the DOM in the [next section](_docs_rendering-elements.html.md).

> **Tip:**
> 
> We recommend using the [“Babel” language definition](https://babeljs.io/docs/en/next/editors) for your editor of choice so that both ES6 and JSX code is properly highlighted.

#### _docs_lists-and-keys.html.md

> Source: https://reactjs.org/docs/lists-and-keys.html
> Scraped: 4/2/2025, 3:05:13 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React and include live examples:
> 
> *   [Rendering Lists](https://react.dev/learn/rendering-lists)

First, let’s review how you transform lists in JavaScript.

Given the code below, we use the [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function to take an array of `numbers` and double their values. We assign the new array returned by `map()` to the variable `doubled` and log it:
```
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);console.log(doubled);
```
This code logs `[2, 4, 6, 8, 10]` to the console.

In React, transforming arrays into lists of [elements](_docs_rendering-elements.html.md) is nearly identical.

### [](_docs_lists-and-keys.html.md#rendering-multiple-components)Rendering Multiple Components

You can build collections of elements and [include them in JSX](_docs_introducing-jsx.html.md#embedding-expressions-in-jsx) using curly braces `{}`.

Below, we loop through the `numbers` array using the JavaScript [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) function. We return a `<li>` element for each item. Finally, we assign the resulting array of elements to `listItems`:
```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>  <li>{number}</li>);
```
Then, we can include the entire `listItems` array inside a `<ul>` element:

[**Try it on CodePen**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

This code displays a bullet list of numbers between 1 and 5.

### [](_docs_lists-and-keys.html.md#basic-list-component)Basic List Component

Usually you would render lists inside a [component](_docs_components-and-props.html.md).

We can refactor the previous example into a component that accepts an array of `numbers` and outputs a list of elements.
```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    <li>{number}</li>  );  return (
    <ul>{listItems}</ul>  );
}
const numbers = [1, 2, 3, 4, 5];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<NumberList numbers={numbers} />);
```
When you run this code, you’ll be given a warning that a key should be provided for list items. A “key” is a special string attribute you need to include when creating lists of elements. We’ll discuss why it’s important in the next section.

Let’s assign a `key` to our list items inside `numbers.map()` and fix the missing key issue.
```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## [](_docs_lists-and-keys.html.md#keys)Keys

Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:
```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>    {number}
  </li>
);
```
The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often you would use IDs from your data as keys:
```
const todoItems = todos.map((todo) =>
  <li key={todo.id}>    {todo.text}
  </li>
);
```
When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort:
```
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs  <li key={index}>    {todo.text}
  </li>
);
```
We don’t recommend using indexes for keys if the order of items may change. This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’s article for an [in-depth explanation on the negative impacts of using an index as a key](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/). If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

Here is an [in-depth explanation about why keys are necessary](_docs_reconciliation.html.md#recursing-on-children) if you’re interested in learning more.

Keys only make sense in the context of the surrounding array.

For example, if you [extract](_docs_components-and-props.html.md#extracting-components) a `ListItem` component, you should keep the key on the `<ListItem />` elements in the array rather than on the `<li>` element in the `ListItem` itself.

**Example: Incorrect Key Usage**
```
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:    <li key={value.toString()}>      {value}
    </li>
  );
}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:    <ListItem value={number} />  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
**Example: Correct Key Usage**
```
function ListItem(props) {
  // Correct! There is no need to specify the key here:  return <li>{props.value}</li>;}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.    <ListItem key={number.toString()} value={number} />  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

A good rule of thumb is that elements inside the `map()` call need keys.

### [](_docs_lists-and-keys.html.md#keys-must-only-be-unique-among-siblings)Keys Must Only Be Unique Among Siblings

Keys used within arrays should be unique among their siblings. However, they don’t need to be globally unique. We can use the same keys when we produce two different arrays:
```
function Blog(props) {
  const sidebar = (    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>    <div key={post.id}>      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}      <hr />
      {content}    </div>
  );
}
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Blog posts={posts} />);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Keys serve as a hint to React but they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name:
```
const content = posts.map((post) =>
  <Post
    key={post.id}    id={post.id}    title={post.title} />
);
```
With the example above, the `Post` component can read `props.id`, but not `props.key`.

### [](_docs_lists-and-keys.html.md#embedding-map-in-jsx)Embedding map() in JSX

In the examples above we declared a separate `listItems` variable and included it in JSX:
```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>    <ListItem key={number.toString()}              value={number} />  );  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
JSX allows [embedding any expression](_docs_introducing-jsx.html.md#embedding-expressions-in-jsx) in curly braces so we could inline the `map()` result:
```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>        <ListItem key={number.toString()}                  value={number} />      )}    </ul>
  );
}
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Sometimes this results in clearer code, but this style can also be abused. Like in JavaScript, it is up to you to decide whether it is worth extracting a variable for readability. Keep in mind that if the `map()` body is too nested, it might be a good time to [extract a component](_docs_components-and-props.html.md#extracting-components).

#### _docs_optimizing-performance.html.md

> Source: https://reactjs.org/docs/optimizing-performance.html
> Scraped: 4/2/2025, 3:11:30 PM

Internally, React uses several clever techniques to minimize the number of costly DOM operations required to update the UI. For many applications, using React will lead to a fast user interface without doing much work to specifically optimize for performance. Nevertheless, there are several ways you can speed up your React application.

## [](_docs_optimizing-performance.html.md#use-the-production-build)Use the Production Build

If you’re benchmarking or experiencing performance problems in your React apps, make sure you’re testing with the minified production build.

By default, React includes many helpful warnings. These warnings are very useful in development. However, they make React larger and slower so you should make sure to use the production version when you deploy the app.

If you aren’t sure whether your build process is set up correctly, you can check it by installing [React Developer Tools for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi). If you visit a site with React in production mode, the icon will have a dark background:

[![React DevTools on a website with production version of React](https://reactjs.org/static/d0f767f80866431ccdec18f200ca58f1/0a47e/devtools-prod.png)](_static_d0f767f80866431ccdec18f200ca58f1_0a47e_devtools-prod.png.md)

If you visit a site with React in development mode, the icon will have a red background:

[![React DevTools on a website with development version of React](https://reactjs.org/static/e434ce2f7e64f63e597edf03f4465694/0a47e/devtools-dev.png)](_static_e434ce2f7e64f63e597edf03f4465694_0a47e_devtools-dev.png.md)

It is expected that you use the development mode when working on your app, and the production mode when deploying your app to the users.

You can find instructions for building your app for production below.

### [](_docs_optimizing-performance.html.md#create-react-app)Create React App

If your project is built with [Create React App](https://github.com/facebookincubator/create-react-app), run:

This will create a production build of your app in the `build/` folder of your project.

Remember that this is only necessary before deploying to production. For normal development, use `npm start`.

### [](_docs_optimizing-performance.html.md#single-file-builds)Single-File Builds

We offer production-ready versions of React and React DOM as single files:
```
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```
Remember that only React files ending with `.production.min.js` are suitable for production.

### [](_docs_optimizing-performance.html.md#brunch)Brunch

For the most efficient Brunch production build, install the [`terser-brunch`](https://github.com/brunch/terser-brunch) plugin:
```
# If you use npm
npm install --save-dev terser-brunch
# If you use Yarn
yarn add --dev terser-brunch
```
Then, to create a production build, add the `-p` flag to the `build` command:

Remember that you only need to do this for production builds. You shouldn’t pass the `-p` flag or apply this plugin in development, because it will hide useful React warnings and make the builds much slower.

### [](_docs_optimizing-performance.html.md#browserify)Browserify

For the most efficient Browserify production build, install a few plugins:
```
# If you use npm
npm install --save-dev envify terser uglifyify
# If you use Yarn
yarn add --dev envify terser uglifyify
```
To create a production build, make sure that you add these transforms **(the order matters)**:
*   The [`envify`](https://github.com/hughsk/envify) transform ensures the right build environment is set. Make it global (`-g`).
*   The [`uglifyify`](https://github.com/hughsk/uglifyify) transform removes development imports. Make it global too (`-g`).
*   Finally, the resulting bundle is piped to [`terser`](https://github.com/terser-js/terser) for mangling ([read why](https://github.com/hughsk/uglifyify#motivationusage)).

For example:
```
browserify ./index.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | terser --compress --mangle > ./bundle.js
```
Remember that you only need to do this for production builds. You shouldn’t apply these plugins in development because they will hide useful React warnings, and make the builds much slower.

### [](_docs_optimizing-performance.html.md#rollup)Rollup

For the most efficient Rollup production build, install a few plugins:
```
# If you use npm
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
# If you use Yarn
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
```
To create a production build, make sure that you add these plugins **(the order matters)**:
*   The [`replace`](https://github.com/rollup/rollup-plugin-replace) plugin ensures the right build environment is set.
*   The [`commonjs`](https://github.com/rollup/rollup-plugin-commonjs) plugin provides support for CommonJS in Rollup.
*   The [`terser`](https://github.com/TrySound/rollup-plugin-terser) plugin compresses and mangles the final bundle.
```
plugins: [
  // ...
  require('rollup-plugin-replace')({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-terser')(),
  // ...
]
```
For a complete setup example [see this gist](https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0).

Remember that you only need to do this for production builds. You shouldn’t apply the `terser` plugin or the `replace` plugin with `'production'` value in development because they will hide useful React warnings, and make the builds much slower.

### [](_docs_optimizing-performance.html.md#webpack)webpack

> **Note:**
> 
> If you’re using Create React App, please follow [the instructions above](_docs_optimizing-performance.html.md#create-react-app).  
> This section is only relevant if you configure webpack directly.

Webpack v4+ will minify your code by default in production mode.
```
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* additional options here */ })],
  },
};
```
You can learn more about this in [webpack documentation](https://webpack.js.org/guides/production/).

Remember that you only need to do this for production builds. You shouldn’t apply `TerserPlugin` in development because it will hide useful React warnings, and make the builds much slower.

`react-dom` 16.5+ and `react-native` 0.57+ provide enhanced profiling capabilities in DEV mode with the React DevTools Profiler. An overview of the Profiler can be found in the blog post [“Introducing the React Profiler”](_blog_2018_09_10_introducing-the-react-profiler.html.md). A video walkthrough of the profiler is also [available on YouTube](https://www.youtube.com/watch?v=nySib7ipZdk).

If you haven’t yet installed the React DevTools, you can find them here:
*   [Chrome Browser Extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
*   [Firefox Browser Extension](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
*   [Standalone Node Package](https://www.npmjs.com/package/react-devtools)

> Note
> 
> A production profiling bundle of `react-dom` is also available as `react-dom/profiling`. Read more about how to use this bundle at [fb.me/react-profiling](https://fb.me/react-profiling)

> Note
> 
> Before React 17, we use the standard [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) to profile components with the chrome performance tab. For a more detailed walkthrough, check out [this article by Ben Schwarz](https://calibreapp.com/blog/react-performance-profiling-optimization).

## [](_docs_optimizing-performance.html.md#virtualize-long-lists)Virtualize Long Lists

If your application renders long lists of data (hundreds or thousands of rows), we recommend using a technique known as “windowing”. This technique only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created.

[react-window](https://react-window.now.sh/) and [react-virtualized](https://bvaughn.github.io/react-virtualized/) are popular windowing libraries. They provide several reusable components for displaying lists, grids, and tabular data. You can also create your own windowing component, like [Twitter did](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3), if you want something more tailored to your application’s specific use case.

## [](_docs_optimizing-performance.html.md#avoid-reconciliation)Avoid Reconciliation

React builds and maintains an internal representation of the rendered UI. It includes the React elements you return from your components. This representation lets React avoid creating DOM nodes and accessing existing ones beyond necessity, as that can be slower than operations on JavaScript objects. Sometimes it is referred to as a “virtual DOM”, but it works the same way on React Native.

When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

Even though React only updates the changed DOM nodes, re-rendering still takes some time. In many cases it’s not a problem, but if the slowdown is noticeable, you can speed all of this up by overriding the lifecycle function `shouldComponentUpdate`, which is triggered before the re-rendering process starts. The default implementation of this function returns `true`, leaving React to perform the update:
```
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```
If you know that in some situations your component doesn’t need to update, you can return `false` from `shouldComponentUpdate` instead, to skip the whole rendering process, including calling `render()` on this component and below.

In most cases, instead of writing `shouldComponentUpdate()` by hand, you can inherit from [`React.PureComponent`](_docs_react-api.html.md#reactpurecomponent). It is equivalent to implementing `shouldComponentUpdate()` with a shallow comparison of current and previous props and state.

## [](_docs_optimizing-performance.html.md#shouldcomponentupdate-in-action)shouldComponentUpdate In Action

Here’s a subtree of components. For each one, `SCU` indicates what `shouldComponentUpdate` returned, and `vDOMEq` indicates whether the rendered React elements were equivalent. Finally, the circle’s color indicates whether the component had to be reconciled or not.

[![should component update](https://reactjs.org/static/5ee1bdf4779af06072a17b7a0654f6db/cd039/should-component-update.png)](_static_5ee1bdf4779af06072a17b7a0654f6db_cd039_should-component-update.png.md)

Since `shouldComponentUpdate` returned `false` for the subtree rooted at C2, React did not attempt to render C2, and thus didn’t even have to invoke `shouldComponentUpdate` on C4 and C5.

For C1 and C3, `shouldComponentUpdate` returned `true`, so React had to go down to the leaves and check them. For C6 `shouldComponentUpdate` returned `true`, and since the rendered elements weren’t equivalent React had to update the DOM.

The last interesting case is C8. React had to render this component, but since the React elements it returned were equal to the previously rendered ones, it didn’t have to update the DOM.

Note that React only had to do DOM mutations for C6, which was inevitable. For C8, it bailed out by comparing the rendered React elements, and for C2’s subtree and C7, it didn’t even have to compare the elements as we bailed out on `shouldComponentUpdate`, and `render` was not called.

## [](_docs_optimizing-performance.html.md#examples)Examples

If the only way your component ever changes is when the `props.color` or the `state.count` variable changes, you could have `shouldComponentUpdate` check that:
```
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
In this code, `shouldComponentUpdate` is just checking if there is any change in `props.color` or `state.count`. If those values don’t change, the component doesn’t update. If your component got more complex, you could use a similar pattern of doing a “shallow comparison” between all the fields of `props` and `state` to determine if the component should update. This pattern is common enough that React provides a helper to use this logic - just inherit from `React.PureComponent`. So this code is a simpler way to achieve the same thing:
```
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }
  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
Most of the time, you can use `React.PureComponent` instead of writing your own `shouldComponentUpdate`. It only does a shallow comparison, so you can’t use it if the props or state may have been mutated in a way that a shallow comparison would miss.

This can be a problem with more complex data structures. For example, let’s say you want a `ListOfWords` component to render a comma-separated list of words, with a parent `WordAdder` component that lets you click a button to add a word to the list. This code does _not_ work correctly:
```
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}
class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // This section is bad style and causes a bug
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```
The problem is that `PureComponent` will do a simple comparison between the old and new values of `this.props.words`. Since this code mutates the `words` array in the `handleClick` method of `WordAdder`, the old and new values of `this.props.words` will compare as equal, even though the actual words in the array have changed. The `ListOfWords` will thus not update even though it has new words that should be rendered.

## [](_docs_optimizing-performance.html.md#the-power-of-not-mutating-data)The Power Of Not Mutating Data

The simplest way to avoid this problem is to avoid mutating values that you are using as props or state. For example, the `handleClick` method above could be rewritten using `concat` as:
```
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar'])
  }));
}
```
ES6 supports a [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) for arrays which can make this easier. If you’re using Create React App, this syntax is available by default.
```
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```
You can also rewrite code that mutates objects to avoid mutation, in a similar way. For example, let’s say we have an object named `colormap` and we want to write a function that changes `colormap.right` to be `'blue'`. We could write:
```
function updateColorMap(colormap) {
  colormap.right = 'blue';
}
```
To write this without mutating the original object, we can use [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method:
```
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```
`updateColorMap` now returns a new object, rather than mutating the old one. `Object.assign` is in ES6 and requires a polyfill.

[Object spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) makes it easier to update objects without mutation as well:
```
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```
This feature was added to JavaScript in ES2018.

If you’re using Create React App, both `Object.assign` and the object spread syntax are available by default.

When you deal with deeply nested objects, updating them in an immutable way can feel convoluted. If you run into this problem, check out [Immer](https://github.com/mweststrate/immer) or [immutability-helper](https://github.com/kolodny/immutability-helper). These libraries let you write highly readable code without losing the benefits of immutability.

#### _docs_react-api.html.md

> Source: https://reactjs.org/docs/react-api.html
> Scraped: 4/2/2025, 3:15:58 PM

`React` is the entry point to the React library. If you load React from a `<script>` tag, these top-level APIs are available on the `React` global. If you use ES6 with npm, you can write `import React from 'react'`. If you use ES5 with npm, you can write `var React = require('react')`.

## [](_docs_react-api.html.md#overview)Overview

### [](_docs_react-api.html.md#components)Components

React components let you split the UI into independent, reusable pieces, and think about each piece in isolation. React components can be defined by subclassing `React.Component` or `React.PureComponent`.
*   [`React.Component`](_docs_react-api.html.md#reactcomponent)
*   [`React.PureComponent`](_docs_react-api.html.md#reactpurecomponent)

If you don’t use ES6 classes, you may use the `create-react-class` module instead. See [Using React without ES6](_docs_react-without-es6.html.md) for more information.

React components can also be defined as functions which can be wrapped:
*   [`React.memo`](_docs_react-api.html.md#reactmemo)

### [](_docs_react-api.html.md#creating-react-elements)Creating React Elements

We recommend [using JSX](_docs_introducing-jsx.html.md) to describe what your UI should look like. Each JSX element is just syntactic sugar for calling [`React.createElement()`](_docs_react-api.html.md#createelement). You will not typically invoke the following methods directly if you are using JSX.
*   [`createElement()`](_docs_react-api.html.md#createelement)
*   [`createFactory()`](_docs_react-api.html.md#createfactory)

See [Using React without JSX](_docs_react-without-jsx.html.md) for more information.

### [](_docs_react-api.html.md#transforming-elements)Transforming Elements

`React` provides several APIs for manipulating elements:
*   [`cloneElement()`](_docs_react-api.html.md#cloneelement)
*   [`isValidElement()`](_docs_react-api.html.md#isvalidelement)
*   [`React.Children`](_docs_react-api.html.md#reactchildren)

### [](_docs_react-api.html.md#fragments)Fragments

`React` also provides a component for rendering multiple elements without a wrapper.
*   [`React.Fragment`](_docs_react-api.html.md#reactfragment)

### [](_docs_react-api.html.md#refs)Refs
*   [`React.createRef`](_docs_react-api.html.md#reactcreateref)
*   [`React.forwardRef`](_docs_react-api.html.md#reactforwardref)

### [](_docs_react-api.html.md#suspense)Suspense

Suspense lets components “wait” for something before rendering. Today, Suspense only supports one use case: [loading components dynamically with `React.lazy`](_docs_code-splitting.html.md#reactlazy). In the future, it will support other use cases like data fetching.
*   [`React.lazy`](_docs_react-api.html.md#reactlazy)
*   [`React.Suspense`](_docs_react-api.html.md#reactsuspense)

### [](_docs_react-api.html.md#transitions)Transitions

_Transitions_ are a new concurrent feature introduced in React 18. They allow you to mark updates as transitions, which tells React that they can be interrupted and avoid going back to Suspense fallbacks for already visible content.
*   [`React.startTransition`](_docs_react-api.html.md#starttransition)
*   [`React.useTransition`](_docs_hooks-reference.html.md#usetransition)

### [](_docs_react-api.html.md#hooks)Hooks

_Hooks_ are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks have a [dedicated docs section](_docs_hooks-intro.html.md) and a separate API reference:
*   [Basic Hooks](_docs_hooks-reference.html.md#basic-hooks)
    
    *   [`useState`](_docs_hooks-reference.html.md#usestate)
    *   [`useEffect`](_docs_hooks-reference.html.md#useeffect)
    *   [`useContext`](_docs_hooks-reference.html.md#usecontext)
*   [Additional Hooks](_docs_hooks-reference.html.md#additional-hooks)
    
    *   [`useReducer`](_docs_hooks-reference.html.md#usereducer)
    *   [`useCallback`](_docs_hooks-reference.html.md#usecallback)
    *   [`useMemo`](_docs_hooks-reference.html.md#usememo)
    *   [`useRef`](_docs_hooks-reference.html.md#useref)
    *   [`useImperativeHandle`](_docs_hooks-reference.html.md#useimperativehandle)
    *   [`useLayoutEffect`](_docs_hooks-reference.html.md#uselayouteffect)
    *   [`useDebugValue`](_docs_hooks-reference.html.md#usedebugvalue)
    *   [`useDeferredValue`](_docs_hooks-reference.html.md#usedeferredvalue)
    *   [`useTransition`](_docs_hooks-reference.html.md#usetransition)
    *   [`useId`](_docs_hooks-reference.html.md#useid)
*   [Library Hooks](_docs_hooks-reference.html.md#library-hooks)
    
    *   [`useSyncExternalStore`](_docs_hooks-reference.html.md#usesyncexternalstore)
    *   [`useInsertionEffect`](_docs_hooks-reference.html.md#useinsertioneffect)
* * *

## [](_docs_react-api.html.md#reference)Reference

### [](_docs_react-api.html.md#reactcomponent)`React.Component`

> This content is out of date.
> 
> Read the new React documentation for [`Component`](https://react.dev/reference/react/Component).

`React.Component` is the base class for React components when they are defined using [ES6 classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):
```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
See the [React.Component API Reference](_docs_react-component.html.md) for a list of methods and properties related to the base `React.Component` class.
* * *

### [](_docs_react-api.html.md#reactpurecomponent)`React.PureComponent`

> This content is out of date.
> 
> Read the new React documentation for [`PureComponent`](https://react.dev/reference/react/PureComponent).

`React.PureComponent` is similar to [`React.Component`](_docs_react-api.html.md#reactcomponent). The difference between them is that [`React.Component`](_docs_react-api.html.md#reactcomponent) doesn’t implement [`shouldComponentUpdate()`](_docs_react-component.html.md#shouldcomponentupdate), but `React.PureComponent` implements it with a shallow prop and state comparison.

If your React component’s `render()` function renders the same result given the same props and state, you can use `React.PureComponent` for a performance boost in some cases.

> Note
> 
> `React.PureComponent`’s `shouldComponentUpdate()` only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend `PureComponent` when you expect to have simple props and state, or use [`forceUpdate()`](_docs_react-component.html.md#forceupdate) when you know deep data structures have changed. Or, consider using [immutable objects](https://immutable-js.com/) to facilitate fast comparisons of nested data.
> 
> Furthermore, `React.PureComponent`’s `shouldComponentUpdate()` skips prop updates for the whole component subtree. Make sure all the children components are also “pure”.
* * *

### [](_docs_react-api.html.md#reactmemo)`React.memo`

> This content is out of date.
> 
> Read the new React documentation for [`memo`](https://react.dev/reference/react/memo).
```
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```
`React.memo` is a [higher order component](_docs_higher-order-components.html.md).

If your component renders the same result given the same props, you can wrap it in a call to `React.memo` for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

`React.memo` only checks for prop changes. If your function component wrapped in `React.memo` has a [`useState`](_docs_hooks-state.html.md), [`useReducer`](_docs_hooks-reference.html.md#usereducer) or [`useContext`](_docs_hooks-reference.html.md#usecontext) Hook in its implementation, it will still rerender when state or context change.

By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.
```
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```
This method only exists as a **[performance optimization](_docs_optimizing-performance.html.md).** Do not rely on it to “prevent” a render, as this can lead to bugs.

> Note
> 
> Unlike the [`shouldComponentUpdate()`](_docs_react-component.html.md#shouldcomponentupdate) method on class components, the `areEqual` function returns `true` if the props are equal and `false` if the props are not equal. This is the inverse from `shouldComponentUpdate`.
* * *

### [](_docs_react-api.html.md#createelement)`createElement()`

> This content is out of date.
> 
> Read the new React documentation for [`createElement`](https://react.dev/reference/react/createElement).
```
React.createElement(
  type,
  [props],
  [...children]
)
```
Create and return a new [React element](_docs_rendering-elements.html.md) of the given type. The type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](_docs_components-and-props.html.md) type (a class or a function), or a [React fragment](_docs_react-api.html.md#reactfragment) type.

Code written with [JSX](_docs_introducing-jsx.html.md) will be converted to use `React.createElement()`. You will not typically invoke `React.createElement()` directly if you are using JSX. See [React Without JSX](_docs_react-without-jsx.html.md) to learn more.
* * *

### [](_docs_react-api.html.md#cloneelement)`cloneElement()`

> This content is out of date.
> 
> Read the new React documentation for [`cloneElement`](https://react.dev/reference/react/cloneElement).
```
React.cloneElement(
  element,
  [config],
  [...children]
)
```
Clone and return a new React element using `element` as the starting point. `config` should contain all new props, `key`, or `ref`. The resulting element will have the original element’s props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved if no `key` and `ref` present in the `config`.

`React.cloneElement()` is almost equivalent to:
```
<element.type {...element.props} {...props}>{children}</element.type>
```
However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won’t accidentally steal it from your ancestor. You will get the same `ref` attached to your new element. The new `ref` or `key` will replace old ones if present.

This API was introduced as a replacement of the deprecated `React.addons.cloneWithProps()`.
* * *

### [](_docs_react-api.html.md#createfactory)`createFactory()`

> This content is out of date.
> 
> Read the new React documentation for [`createFactory`](https://react.dev/reference/react/createFactory).
```
React.createFactory(type)
```
Return a function that produces React elements of a given type. Like [`React.createElement()`](_docs_react-api.html.md#createelement), the type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](_docs_components-and-props.html.md) type (a class or a function), or a [React fragment](_docs_react-api.html.md#reactfragment) type.

This helper is considered legacy, and we encourage you to either use JSX or use `React.createElement()` directly instead.

You will not typically invoke `React.createFactory()` directly if you are using JSX. See [React Without JSX](_docs_react-without-jsx.html.md) to learn more.
* * *

### [](_docs_react-api.html.md#isvalidelement)`isValidElement()`

> This content is out of date.
> 
> Read the new React documentation for [`isValidElement`](https://react.dev/reference/react/isValidElement).
```
React.isValidElement(object)
```
Verifies the object is a React element. Returns `true` or `false`.
* * *

### [](_docs_react-api.html.md#reactchildren)`React.Children`

> This content is out of date.
> 
> Read the new React documentation for [`Children`](https://react.dev/reference/react/Children).

`React.Children` provides utilities for dealing with the `this.props.children` opaque data structure.

#### [](_docs_react-api.html.md#reactchildrenmap)`React.Children.map`
```
React.Children.map(children, function[(thisArg)])
```
Invokes a function on every immediate child contained within `children` with `this` set to `thisArg`. If `children` is an array it will be traversed and the function will be called for each child in the array. If children is `null` or `undefined`, this method will return `null` or `undefined` rather than an array.

> Note
> 
> If `children` is a `Fragment` it will be treated as a single child and not traversed.

#### [](_docs_react-api.html.md#reactchildrenforeach)`React.Children.forEach`
```
React.Children.forEach(children, function[(thisArg)])
```
Like [`React.Children.map()`](_docs_react-api.html.md#reactchildrenmap) but does not return an array.

#### [](_docs_react-api.html.md#reactchildrencount)`React.Children.count`
```
React.Children.count(children)
```
Returns the total number of components in `children`, equal to the number of times that a callback passed to `map` or `forEach` would be invoked.

#### [](_docs_react-api.html.md#reactchildrenonly)`React.Children.only`
```
React.Children.only(children)
```
Verifies that `children` has only one child (a React element) and returns it. Otherwise this method throws an error.

> Note:
> 
> `React.Children.only()` does not accept the return value of [`React.Children.map()`](_docs_react-api.html.md#reactchildrenmap) because it is an array rather than a React element.

#### [](_docs_react-api.html.md#reactchildrentoarray)`React.Children.toArray`
```
React.Children.toArray(children)
```
Returns the `children` opaque data structure as a flat array with keys assigned to each child. Useful if you want to manipulate collections of children in your render methods, especially if you want to reorder or slice `this.props.children` before passing it down.

> Note:
> 
> `React.Children.toArray()` changes keys to preserve the semantics of nested arrays when flattening lists of children. That is, `toArray` prefixes each key in the returned array so that each element’s key is scoped to the input array containing it.
* * *

### [](_docs_react-api.html.md#reactfragment)`React.Fragment`

> This content is out of date.
> 
> Read the new React documentation for [`Fragment`](https://react.dev/reference/react/Fragment).

The `React.Fragment` component lets you return multiple elements in a `render()` method without creating an additional DOM element:
```
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```
You can also use it with the shorthand `<></>` syntax. For more information, see [React v16.2.0: Improved Support for Fragments](_blog_2017_11_28_react-v16.2.0-fragment-support.html.md).

### [](_docs_react-api.html.md#reactcreateref)`React.createRef`

> This content is out of date.
> 
> Read the new React documentation for [`createRef`](https://react.dev/reference/react/createRef).

`React.createRef` creates a [ref](_docs_refs-and-the-dom.html.md) that can be attached to React elements via the ref attribute.
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();  }
  render() {
    return <input type="text" ref={this.inputRef} />;  }
  componentDidMount() {
    this.inputRef.current.focus();  }
}
```
### [](_docs_react-api.html.md#reactforwardref)`React.forwardRef`

> This content is out of date.
> 
> Read the new React documentation for [`forwardRef`](https://react.dev/reference/react/forwardRef).

`React.forwardRef` creates a React component that forwards the [ref](_docs_refs-and-the-dom.html.md) attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:
*   [Forwarding refs to DOM components](_docs_forwarding-refs.html.md#forwarding-refs-to-dom-components)
*   [Forwarding refs in higher-order-components](_docs_forwarding-refs.html.md#forwarding-refs-in-higher-order-components)

`React.forwardRef` accepts a rendering function as an argument. React will call this function with `props` and `ref` as two arguments. This function should return a React node.
```
const FancyButton = React.forwardRef((props, ref) => (  <button ref={ref} className="FancyButton">    {props.children}
  </button>
));
// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
In the above example, React passes a `ref` given to `<FancyButton ref={ref}>` element as a second argument to the rendering function inside the `React.forwardRef` call. This rendering function passes the `ref` to the `<button ref={ref}>` element.

As a result, after React attaches the ref, `ref.current` will point directly to the `<button>` DOM element instance.

For more information, see [forwarding refs](_docs_forwarding-refs.html.md).

### [](_docs_react-api.html.md#reactlazy)`React.lazy`

> This content is out of date.
> 
> Read the new React documentation for [`lazy`](https://react.dev/reference/react/lazy).

`React.lazy()` lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren’t used during the initial render.

You can learn how to use it from our [code splitting documentation](_docs_code-splitting.html.md#reactlazy). You might also want to check out [this article](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) explaining how to use it in more detail.
```
// This component is loaded dynamically
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```
Note that rendering `lazy` components requires that there’s a `<React.Suspense>` component higher in the rendering tree. This is how you specify a loading indicator.

### [](_docs_react-api.html.md#reactsuspense)`React.Suspense`

> This content is out of date.
> 
> Read the new React documentation for [`Suspense`](https://react.dev/reference/react/Suspense).

`React.Suspense` lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. In the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](_blog_2018_11_27_react-16-roadmap.html.md).

Today, lazy loading components is the **only** use case supported by `<React.Suspense>`:
```
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));
function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```
It is documented in our [code splitting guide](_docs_code-splitting.html.md#reactlazy). Note that `lazy` components can be deep inside the `Suspense` tree — it doesn’t have to wrap every one of them. The best practice is to place `<Suspense>` where you want to see a loading indicator, but to use `lazy()` wherever you want to do code splitting.

> Note
> 
> For content that is already shown to the user, switching back to a loading indicator can be disorienting. It is sometimes better to show the “old” UI while the new UI is being prepared. To do this, you can use the new transition APIs [`startTransition`](_docs_react-api.html.md#starttransition) and [`useTransition`](_docs_hooks-reference.html.md#usetransition) to mark updates as transitions and avoid unexpected fallbacks.

#### [](_docs_react-api.html.md#reactsuspense-in-server-side-rendering)`React.Suspense` in Server Side Rendering

During server side rendering Suspense Boundaries allow you to flush your application in smaller chunks by suspending. When a component suspends we schedule a low priority task to render the closest Suspense boundary’s fallback. If the component unsuspends before we flush the fallback then we send down the actual content and throw away the fallback.

#### [](_docs_react-api.html.md#reactsuspense-during-hydration)`React.Suspense` during hydration

Suspense boundaries depend on their parent boundaries being hydrated before they can hydrate, but they can hydrate independently from sibling boundaries. Events on a boundary before it is hydrated will cause the boundary to hydrate at a higher priority than neighboring boundaries. [Read more](https://github.com/reactwg/react-18/discussions/130)

### [](_docs_react-api.html.md#starttransition)`React.startTransition`

> This content is out of date.
> 
> Read the new React documentation for [`startTransition`](https://react.dev/reference/react/startTransition).
```
React.startTransition(callback)
```
`React.startTransition` lets you mark updates inside the provided callback as transitions. This method is designed to be used when [`React.useTransition`](_docs_hooks-reference.html.md#usetransition) is not available.

> Note:
> 
> Updates in a transition yield to more urgent updates such as clicks.
> 
> Updates in a transition will not show a fallback for re-suspended content, allowing the user to continue interacting while rendering the update.
> 
> `React.startTransition` does not provide an `isPending` flag. To track the pending status of a transition see [`React.useTransition`](_docs_hooks-reference.html.md#usetransition).

#### _docs_react-component.html.md

> Source: https://reactjs.org/docs/react-component.html
> Scraped: 4/2/2025, 3:15:59 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.
> 
> These new documentation pages teach modern React:
> 
> *   [`React.Component`](https://react.dev/reference/react/Component)

This page contains a detailed API reference for the React component class definition. It assumes you’re familiar with fundamental React concepts, such as [Components and Props](_docs_components-and-props.html.md), as well as [State and Lifecycle](_docs_state-and-lifecycle.html.md). If you’re not, read them first.

## [](_docs_react-component.html.md#overview)Overview

React lets you define components as classes or functions. Components defined as classes currently provide more features which are described in detail on this page. To define a React component class, you need to extend `React.Component`:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
The only method you _must_ define in a `React.Component` subclass is called [`render()`](_docs_react-component.html.md#render). All the other methods described on this page are optional.

**We strongly recommend against creating your own base component classes.** In React components, [code reuse is primarily achieved through composition rather than inheritance](_docs_composition-vs-inheritance.html.md).

> Note:
> 
> React doesn’t force you to use the ES6 class syntax. If you prefer to avoid it, you may use the `create-react-class` module or a similar custom abstraction instead. Take a look at [Using React without ES6](_docs_react-without-es6.html.md) to learn more.

### [](_docs_react-component.html.md#the-component-lifecycle)The Component Lifecycle

Each component has several “lifecycle methods” that you can override to run code at particular times in the process. **You can use [this lifecycle diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) as a cheat sheet.** In the list below, commonly used lifecycle methods are marked as **bold**. The rest of them exist for relatively rare use cases.

#### [](_docs_react-component.html.md#mounting)Mounting

These methods are called in the following order when an instance of a component is being created and inserted into the DOM:
*   [**`constructor()`**](_docs_react-component.html.md#constructor)
*   [`static getDerivedStateFromProps()`](_docs_react-component.html.md#static-getderivedstatefromprops)
*   [**`render()`**](_docs_react-component.html.md#render)
*   [**`componentDidMount()`**](_docs_react-component.html.md#componentdidmount)

> Note:
> 
> This method is considered legacy and you should [avoid it](_blog_2018_03_27_update-on-async-rendering.html.md) in new code:
> 
> *   [`UNSAFE_componentWillMount()`](_docs_react-component.html.md#unsafe_componentwillmount)

#### [](_docs_react-component.html.md#updating)Updating

An update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:
*   [`static getDerivedStateFromProps()`](_docs_react-component.html.md#static-getderivedstatefromprops)
*   [`shouldComponentUpdate()`](_docs_react-component.html.md#shouldcomponentupdate)
*   [**`render()`**](_docs_react-component.html.md#render)
*   [`getSnapshotBeforeUpdate()`](_docs_react-component.html.md#getsnapshotbeforeupdate)
*   [**`componentDidUpdate()`**](_docs_react-component.html.md#componentdidupdate)

> Note:
> 
> These methods are considered legacy and you should [avoid them](_blog_2018_03_27_update-on-async-rendering.html.md) in new code:
> 
> *   [`UNSAFE_componentWillUpdate()`](_docs_react-component.html.md#unsafe_componentwillupdate)
> *   [`UNSAFE_componentWillReceiveProps()`](_docs_react-component.html.md#unsafe_componentwillreceiveprops)

#### [](_docs_react-component.html.md#unmounting)Unmounting

This method is called when a component is being removed from the DOM:
*   [**`componentWillUnmount()`**](_docs_react-component.html.md#componentwillunmount)

#### [](_docs_react-component.html.md#error-handling)Error Handling

These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.
*   [`static getDerivedStateFromError()`](_docs_react-component.html.md#static-getderivedstatefromerror)
*   [`componentDidCatch()`](_docs_react-component.html.md#componentdidcatch)

### [](_docs_react-component.html.md#other-apis)Other APIs

Each component also provides some other APIs:
*   [`setState()`](_docs_react-component.html.md#setstate)
*   [`forceUpdate()`](_docs_react-component.html.md#forceupdate)

### [](_docs_react-component.html.md#class-properties)Class Properties
*   [`defaultProps`](_docs_react-component.html.md#defaultprops)
*   [`displayName`](_docs_react-component.html.md#displayname)

### [](_docs_react-component.html.md#instance-properties)Instance Properties
*   [`props`](_docs_react-component.html.md#props)
*   [`state`](_docs_react-component.html.md#state)
* * *

## [](_docs_react-component.html.md#reference)Reference

### [](_docs_react-component.html.md#commonly-used-lifecycle-methods)Commonly Used Lifecycle Methods

The methods in this section cover the vast majority of use cases you’ll encounter creating React components. **For a visual reference, check out [this lifecycle diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).**

### [](_docs_react-component.html.md#render)`render()`

The `render()` method is the only required method in a class component.

When called, it should examine `this.props` and `this.state` and return one of the following types:
*   **React elements.** Typically created via [JSX](_docs_introducing-jsx.html.md). For example, `<div />` and `<MyComponent />` are React elements that instruct React to render a DOM node, or another user-defined component, respectively.
*   **Arrays and fragments.** Let you return multiple elements from render. See the documentation on [fragments](_docs_fragments.html.md) for more details.
*   **Portals**. Let you render children into a different DOM subtree. See the documentation on [portals](_docs_portals.html.md) for more details.
*   **String and numbers.** These are rendered as text nodes in the DOM.
*   **Booleans or `null` or `undefined`**. Render nothing. (Mostly exists to support `return test && <Child />` pattern, where `test` is boolean).

The `render()` function should be pure, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser.

If you need to interact with the browser, perform your work in `componentDidMount()` or the other lifecycle methods instead. Keeping `render()` pure makes components easier to think about.

> Note
> 
> `render()` will not be invoked if [`shouldComponentUpdate()`](_docs_react-component.html.md#shouldcomponentupdate) returns false.
* * *

### [](_docs_react-component.html.md#constructor)`constructor()`

**If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.**

The constructor for a React component is called before it is mounted. When implementing the constructor for a `React.Component` subclass, you should call `super(props)` before any other statement. Otherwise, `this.props` will be undefined in the constructor, which can lead to bugs.

Typically, in React constructors are only used for two purposes:
*   Initializing [local state](_docs_state-and-lifecycle.html.md) by assigning an object to `this.state`.
*   Binding [event handler](_docs_handling-events.html.md) methods to an instance.

You **should not call `setState()`** in the `constructor()`. Instead, if your component needs to use local state, **assign the initial state to `this.state`** directly in the constructor:
```
constructor(props) {
  super(props);
  // Don't call this.setState() here!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```
Constructor is the only place where you should assign `this.state` directly. In all other methods, you need to use `this.setState()` instead.

Avoid introducing any side-effects or subscriptions in the constructor. For those use cases, use `componentDidMount()` instead.

> Note
> 
> **Avoid copying props into state! This is a common mistake:**
> 
> ```
> constructor(props) {
>  super(props);
>  // Don't do this!
>  this.state = { color: props.color };
> }
> ```
> 
> The problem is that it’s both unnecessary (you can use `this.props.color` directly instead), and creates bugs (updates to the `color` prop won’t be reflected in the state).
> 
> **Only use this pattern if you intentionally want to ignore prop updates.** In that case, it makes sense to rename the prop to be called `initialColor` or `defaultColor`. You can then force a component to “reset” its internal state by [changing its `key`](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#recommendation-fully-uncontrolled-component-with-a-key) when necessary.
> 
> Read our [blog post on avoiding derived state](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md) to learn about what to do if you think you need some state to depend on the props.
* * *

### [](_docs_react-component.html.md#componentdidmount)`componentDidMount()`

`componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in `componentWillUnmount()`.

You **may call `setState()` immediately** in `componentDidMount()`. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the `render()` will be called twice in this case, the user won’t see the intermediate state. Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the `constructor()` instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.
* * *

### [](_docs_react-component.html.md#componentdidupdate)`componentDidUpdate()`
```
componentDidUpdate(prevProps, prevState, snapshot)
```
`componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).
```
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```
You **may call `setState()` immediately** in `componentDidUpdate()` but note that **it must be wrapped in a condition** like in the example above, or you’ll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance. If you’re trying to “mirror” some state to a prop coming from above, consider using the prop directly instead. Read more about [why copying props into state causes bugs](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md).

If your component implements the `getSnapshotBeforeUpdate()` lifecycle (which is rare), the value it returns will be passed as a third “snapshot” parameter to `componentDidUpdate()`. Otherwise this parameter will be undefined.

> Note
> 
> `componentDidUpdate()` will not be invoked if [`shouldComponentUpdate()`](_docs_react-component.html.md#shouldcomponentupdate) returns false.
* * *

### [](_docs_react-component.html.md#componentwillunmount)`componentWillUnmount()`

`componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

You **should not call `setState()`** in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.
* * *

### [](_docs_react-component.html.md#rarely-used-lifecycle-methods)Rarely Used Lifecycle Methods

The methods in this section correspond to uncommon use cases. They’re handy once in a while, but most of your components probably don’t need any of them. **You can see most of the methods below on [this lifecycle diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) if you click the “Show less common lifecycles” checkbox at the top of it.**

### [](_docs_react-component.html.md#shouldcomponentupdate)`shouldComponentUpdate()`
```
shouldComponentUpdate(nextProps, nextState)
```
Use `shouldComponentUpdate()` to let React know if a component’s output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received. Defaults to `true`. This method is not called for the initial render or when `forceUpdate()` is used.

This method only exists as a **[performance optimization](_docs_optimizing-performance.html.md).** Do not rely on it to “prevent” a rendering, as this can lead to bugs. **Consider using the built-in [`PureComponent`](_docs_react-api.html.md#reactpurecomponent)** instead of writing `shouldComponentUpdate()` by hand. `PureComponent` performs a shallow comparison of props and state, and reduces the chance that you’ll skip a necessary update.

If you are confident you want to write it by hand, you may compare `this.props` with `nextProps` and `this.state` with `nextState` and return `false` to tell React the update can be skipped. Note that returning `false` does not prevent child components from re-rendering when _their_ state changes.

We do not recommend doing deep equality checks or using `JSON.stringify()` in `shouldComponentUpdate()`. It is very inefficient and will harm performance.

Currently, if `shouldComponentUpdate()` returns `false`, then [`UNSAFE_componentWillUpdate()`](_docs_react-component.html.md#unsafe_componentwillupdate), [`render()`](_docs_react-component.html.md#render), and [`componentDidUpdate()`](_docs_react-component.html.md#componentdidupdate) will not be invoked. In the future React may treat `shouldComponentUpdate()` as a hint rather than a strict directive, and returning `false` may still result in a re-rendering of the component.
* * *

### [](_docs_react-component.html.md#static-getderivedstatefromprops)`static getDerivedStateFromProps()`
```
static getDerivedStateFromProps(props, state)
```
`getDerivedStateFromProps` is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or `null` to update nothing.

This method exists for [rare use cases](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#when-to-use-derived-state) where the state depends on changes in props over time. For example, it might be handy for implementing a `<Transition>` component that compares its previous and next children to decide which of them to animate in and out.

Deriving state leads to verbose code and makes your components difficult to think about. [Make sure you’re familiar with simpler alternatives:](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md)
*   If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](_docs_react-component.html.md#componentdidupdate) lifecycle instead.
*   If you want to **re-compute some data only when a prop changes**, [use a memoization helper instead](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#what-about-memoization).
*   If you want to **“reset” some state when a prop changes**, consider either making a component [fully controlled](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#recommendation-fully-uncontrolled-component-with-a-key) instead.

This method doesn’t have access to the component instance. If you’d like, you can reuse some code between `getDerivedStateFromProps()` and the other class methods by extracting pure functions of the component props and state outside the class definition.

Note that this method is fired on _every_ render, regardless of the cause. This is in contrast to `UNSAFE_componentWillReceiveProps`, which only fires when the parent causes a re-render and not as a result of a local `setState`.
* * *

### [](_docs_react-component.html.md#getsnapshotbeforeupdate)`getSnapshotBeforeUpdate()`
```
getSnapshotBeforeUpdate(prevProps, prevState)
```
`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle method will be passed as a parameter to `componentDidUpdate()`.

This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way.

A snapshot value (or `null`) should be returned.

For example:
```
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
  render() {
    return (
      <div ref={this.listRef}>{/* ...contents... */}</div>
    );
  }
}
```
In the above examples, it is important to read the `scrollHeight` property in `getSnapshotBeforeUpdate` because there may be delays between “render” phase lifecycles (like `render`) and “commit” phase lifecycles (like `getSnapshotBeforeUpdate` and `componentDidUpdate`).
* * *

### [](_docs_react-component.html.md#error-boundaries)Error boundaries

[Error boundaries](_docs_error-boundaries.html.md) are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`. Updating state from these lifecycles lets you capture an unhandled JavaScript error in the below tree and display a fallback UI.

Only use error boundaries for recovering from unexpected exceptions; **don’t try to use them for control flow.**

For more details, see [_Error Handling in React 16_](_blog_2017_07_26_error-handling-in-react-16.html.md).

> Note
> 
> Error boundaries only catch errors in the components **below** them in the tree. An error boundary can’t catch an error within itself.

### [](_docs_react-component.html.md#static-getderivedstatefromerror)`static getDerivedStateFromError()`
```
static getDerivedStateFromError(error)
```
This lifecycle is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.    return { hasError: true };  }
  render() {
    if (this.state.hasError) {      // You can render any custom fallback UI      return <h1>Something went wrong.</h1>;    }
    return this.props.children;
  }
}
```
> Note
> 
> `getDerivedStateFromError()` is called during the “render” phase, so side-effects are not permitted. For those use cases, use `componentDidCatch()` instead.
* * *

### [](_docs_react-component.html.md#componentdidcatch)`componentDidCatch()`
```
componentDidCatch(error, info)
```
This lifecycle is invoked after an error has been thrown by a descendant component. It receives two parameters:

1.  `error` - The error that was thrown.
2.  `info` - An object with a `componentStack` key containing [information about which component threw the error](_docs_error-boundaries.html.md#component-stack-traces).

`componentDidCatch()` is called during the “commit” phase, so side-effects are permitted. It should be used for things like logging errors:
```
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, info) {    // Example "componentStack":    //   in ComponentThatThrows (created by App)    //   in ErrorBoundary (created by App)    //   in div (created by App)    //   in App    logComponentStackToMyService(info.componentStack);  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```
Production and development builds of React slightly differ in the way `componentDidCatch()` handles errors.

On development, the errors will bubble up to `window`, this means that any `window.onerror` or `window.addEventListener('error', callback)` will intercept the errors that have been caught by `componentDidCatch()`.

On production, instead, the errors will not bubble up, which means any ancestor error handler will only receive errors not explicitly caught by `componentDidCatch()`.

> Note
> 
> In the event of an error, you can render a fallback UI with `componentDidCatch()` by calling `setState`, but this will be deprecated in a future release. Use `static getDerivedStateFromError()` to handle fallback rendering instead.
* * *

### [](_docs_react-component.html.md#legacy-lifecycle-methods)Legacy Lifecycle Methods

The lifecycle methods below are marked as “legacy”. They still work, but we don’t recommend using them in the new code. You can learn more about migrating away from legacy lifecycle methods in [this blog post](_blog_2018_03_27_update-on-async-rendering.html.md).

### [](_docs_react-component.html.md#unsafe_componentwillmount)`UNSAFE_componentWillMount()`
```
UNSAFE_componentWillMount()
```
> Note
> 
> This lifecycle was previously named `componentWillMount`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillMount()` is invoked just before mounting occurs. It is called before `render()`, therefore calling `setState()` synchronously in this method will not trigger an extra rendering. Generally, we recommend using the `constructor()` instead for initializing state.

Avoid introducing any side-effects or subscriptions in this method. For those use cases, use `componentDidMount()` instead.

This is the only lifecycle method called on server rendering.
* * *

### [](_docs_react-component.html.md#unsafe_componentwillreceiveprops)`UNSAFE_componentWillReceiveProps()`
```
UNSAFE_componentWillReceiveProps(nextProps)
```
> Note
> 
> This lifecycle was previously named `componentWillReceiveProps`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

> Note:
> 
> Using this lifecycle method often leads to bugs and inconsistencies
> 
> *   If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](_docs_react-component.html.md#componentdidupdate) lifecycle instead.
> *   If you used `componentWillReceiveProps` for **re-computing some data only when a prop changes**, [use a memoization helper instead](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#what-about-memoization).
> *   If you used `componentWillReceiveProps` to **“reset” some state when a prop changes**, consider either making a component [fully controlled](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md#recommendation-fully-uncontrolled-component-with-a-key) instead.
> 
> For other use cases, [follow the recommendations in this blog post about derived state](_blog_2018_06_07_you-probably-dont-need-derived-state.html.md).

`UNSAFE_componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Note that if a parent component causes your component to re-render, this method will be called even if props have not changed. Make sure to compare the current and next values if you only want to handle changes.

React doesn’t call `UNSAFE_componentWillReceiveProps()` with initial props during [mounting](_docs_react-component.html.md#mounting). It only calls this method if some of component’s props may update. Calling `this.setState()` generally doesn’t trigger `UNSAFE_componentWillReceiveProps()`.
* * *

### [](_docs_react-component.html.md#unsafe_componentwillupdate)`UNSAFE_componentWillUpdate()`
```
UNSAFE_componentWillUpdate(nextProps, nextState)
```
> Note
> 
> This lifecycle was previously named `componentWillUpdate`. That name will continue to work until version 17. Use the [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) to automatically update your components.

`UNSAFE_componentWillUpdate()` is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call `this.setState()` here; nor should you do anything else (e.g. dispatch a Redux action) that would trigger an update to a React component before `UNSAFE_componentWillUpdate()` returns.

Typically, this method can be replaced by `componentDidUpdate()`. If you were reading from the DOM in this method (e.g. to save a scroll position), you can move that logic to `getSnapshotBeforeUpdate()`.

> Note
> 
> `UNSAFE_componentWillUpdate()` will not be invoked if [`shouldComponentUpdate()`](_docs_react-component.html.md#shouldcomponentupdate) returns false.
* * *

## [](_docs_react-component.html.md#other-apis-1)Other APIs

Unlike the lifecycle methods above (which React calls for you), the methods below are the methods _you_ can call from your components.

There are just two of them: `setState()` and `forceUpdate()`.

### [](_docs_react-component.html.md#setstate)`setState()`
```
setState(updater[, callback])
```
`setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

Think of `setState()` as a _request_ rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. In the rare case that you need to force the DOM update to be applied synchronously, you may wrap it in [`flushSync`](_docs_react-dom.html.md#flushsync), but this may hurt performance.

`setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the `updater` argument below.

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

The first argument is an `updater` function with the signature:
```
(state, props) => stateChange
```
`state` is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `state` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:
```
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```
Both `state` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `state`.

The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

You may optionally pass an object as the first argument to `setState()` instead of a function:
```
setState(stateChange[, callback])
```
This performs a shallow merge of `stateChange` into the new state, e.g., to adjust a shopping cart item quantity:
```
this.setState({quantity: 2})
```
This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:
```
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```
Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the current state, we recommend using the updater function form, instead:
```
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```
For more detail, see:
*   [State and Lifecycle guide](_docs_state-and-lifecycle.html.md)
*   [In depth: When and why are `setState()` calls batched?](https://stackoverflow.com/a/48610973/458193)
*   [In depth: Why isn’t `this.state` updated immediately?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)
* * *

### [](_docs_react-component.html.md#forceupdate)`forceUpdate()`
```
component.forceUpdate(callback)
```
By default, when your component’s state or props change, your component will re-render. If your `render()` method depends on some other data, you can tell React that the component needs re-rendering by calling `forceUpdate()`.

Calling `forceUpdate()` will cause `render()` to be called on the component, skipping `shouldComponentUpdate()`. This will trigger the normal lifecycle methods for child components, including the `shouldComponentUpdate()` method of each child. React will still only update the DOM if the markup changes.

Normally you should try to avoid all uses of `forceUpdate()` and only read from `this.props` and `this.state` in `render()`.
* * *

## [](_docs_react-component.html.md#class-properties-1)Class Properties

### [](_docs_react-component.html.md#defaultprops)`defaultProps`

`defaultProps` can be defined as a property on the component class itself, to set the default props for the class. This is used for `undefined` props, but not for `null` props. For example:
```
class CustomButton extends React.Component {
  // ...
}
CustomButton.defaultProps = {
  color: 'blue'
};
```
If `props.color` is not provided, it will be set by default to `'blue'`:
```
  render() {
    return <CustomButton /> ; // props.color will be set to blue
  }
```
If `props.color` is set to `null`, it will remain `null`:
```
  render() {
    return <CustomButton color={null} /> ; // props.color will remain null
  }
```
* * *

### [](_docs_react-component.html.md#displayname)`displayName`

The `displayName` string is used in debugging messages. Usually, you don’t need to set it explicitly because it’s inferred from the name of the function or class that defines the component. You might want to set it explicitly if you want to display a different name for debugging purposes or when you create a higher-order component, see [Wrap the Display Name for Easy Debugging](_docs_higher-order-components.html.md#convention-wrap-the-display-name-for-easy-debugging) for details.
* * *

## [](_docs_react-component.html.md#instance-properties-1)Instance Properties

### [](_docs_react-component.html.md#props)`props`

`this.props` contains the props that were defined by the caller of this component. See [Components and Props](_docs_components-and-props.html.md) for an introduction to props.

In particular, `this.props.children` is a special prop, typically defined by the child tags in the JSX expression rather than in the tag itself.

### [](_docs_react-component.html.md#state)`state`

The state contains data specific to this component that may change over time. The state is user-defined, and it should be a plain JavaScript object.

If some value isn’t used for rendering or data flow (for example, a timer ID), you don’t have to put it in the state. Such values can be defined as fields on the component instance.

See [State and Lifecycle](_docs_state-and-lifecycle.html.md) for more information about the state.

Never mutate `this.state` directly, as calling `setState()` afterwards may replace the mutation you made. Treat `this.state` as if it were immutable.

#### _docs_react-without-es6.html.md

> Source: https://reactjs.org/docs/react-without-es6.html
> Scraped: 4/2/2025, 3:11:30 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.

Normally you would define a React component as a plain JavaScript class:
```
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
If you don’t use ES6 yet, you may use the `create-react-class` module instead:
```
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});
```
The API of ES6 classes is similar to `createReactClass()` with a few exceptions.

## [](_docs_react-without-es6.html.md#declaring-default-props)Declaring Default Props

With functions and ES6 classes `defaultProps` is defined as a property on the component itself:
```
class Greeting extends React.Component {
  // ...
}
Greeting.defaultProps = {
  name: 'Mary'
};
```
With `createReactClass()`, you need to define `getDefaultProps()` as a function on the passed object:
```
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },
  // ...
});
```
## [](_docs_react-without-es6.html.md#setting-the-initial-state)Setting the Initial State

In ES6 classes, you can define the initial state by assigning `this.state` in the constructor:
```
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```
With `createReactClass()`, you have to provide a separate `getInitialState` method that returns the initial state:
```
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```
## [](_docs_react-without-es6.html.md#autobinding)Autobinding

In React components declared as ES6 classes, methods follow the same semantics as regular ES6 classes. This means that they don’t automatically bind `this` to the instance. You’ll have to explicitly use `.bind(this)` in the constructor:
```
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    alert(this.state.message);
  }
  render() {
    // Because `this.handleClick` is bound, we can use it as an event handler.
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```
With `createReactClass()`, this is not necessary because it binds all methods:
```
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },
  handleClick: function() {
    alert(this.state.message);
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```
This means writing ES6 classes comes with a little more boilerplate code for event handlers, but the upside is slightly better performance in large applications.

If the boilerplate code is too unattractive to you, you may use [ES2022 Class Properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) syntax:
```
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
  }
  // Using an arrow here binds the method:
  handleClick = () => {
    alert(this.state.message);
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
```
You also have a few other options:
*   Bind methods in the constructor.
*   Use arrow functions, e.g. `onClick={(e) => this.handleClick(e)}`.
*   Keep using `createReactClass`.

## [](_docs_react-without-es6.html.md#mixins)Mixins

> **Note:**
> 
> ES6 launched without any mixin support. Therefore, there is no support for mixins when you use React with ES6 classes.
> 
> **We also found numerous issues in codebases using mixins, [and don’t recommend using them in the new code](_blog_2016_07_13_mixins-considered-harmful.html.md).**
> 
> This section exists only for the reference.

Sometimes very different components may share some common functionality. These are sometimes called [cross-cutting concerns](https://en.wikipedia.org/wiki/Cross-cutting_concern). `createReactClass` lets you use a legacy `mixins` system for that.

One common use case is a component wanting to update itself on a time interval. It’s easy to use `setInterval()`, but it’s important to cancel your interval when you don’t need it anymore to save memory. React provides [lifecycle methods](_docs_react-component.html.md#the-component-lifecycle) that let you know when a component is about to be created or destroyed. Let’s create a simple mixin that uses these methods to provide an easy `setInterval()` function that will automatically get cleaned up when your component is destroyed.
```
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};
var createReactClass = require('create-react-class');
var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // Use the mixin
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Call a method on the mixin
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
  }
});
const root = ReactDOM.createRoot(document.getElementById('example'));
root.render(<TickTock />);
```
If a component is using multiple mixins and several mixins define the same lifecycle method (i.e. several mixins want to do some cleanup when the component is destroyed), all of the lifecycle methods are guaranteed to be called. Methods defined on mixins run in the order mixins were listed, followed by a method call on the component.

#### _docs_react-without-jsx.html.md

> Source: https://reactjs.org/docs/react-without-jsx.html
> Scraped: 4/2/2025, 3:11:30 PM

> These docs are old and won’t be updated. Go to [react.dev](https://react.dev/) for the new React docs.

JSX is not a requirement for using React. Using React without JSX is especially convenient when you don’t want to set up compilation in your build environment.

Each JSX element is just syntactic sugar for calling `React.createElement(component, props, ...children)`. So, anything you can do with JSX can also be done with just plain JavaScript.

For example, this code written with JSX:
```
class Hello extends React.Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);
```
can be compiled to this code that does not use JSX:
```
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));
```
If you’re curious to see more examples of how JSX is converted to JavaScript, you can try out [the online Babel compiler](https://babeljs.io/repl/#?presets=react&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA).

The component can either be provided as a string, as a subclass of `React.Component`, or a plain function.

If you get tired of typing `React.createElement` so much, one common pattern is to assign a shorthand:
```
const e = React.createElement;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
```
If you use this shorthand form for `React.createElement`, it can be almost as convenient to use React without JSX.

Alternatively, you can refer to community projects such as [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) and [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) which offer a terser syntax.

#### _docs_release-channels.html.md

> Source: https://reactjs.org/docs/release-channels.html
> Scraped: 4/2/2025, 3:16:00 PM

All stable builds of React go through a high level of testing and follow semantic versioning (semver). React also offers unstable release channels to encourage early feedback on experimental features. This page describes what you can expect from React releases.

This versioning policy describes our approach to version numbers for packages such as `react` and `react-dom`. For a list of previous releases, see the [Versions](https://react.dev/versions) page.

## Stable releases[](https://react.dev/community/versioning-policy#stable-releases)

Stable React releases (also known as “Latest” release channel) follow [semantic versioning (semver)](https://semver.org/) principles.

That means that with a version number **x.y.z**:
*   When releasing **critical bug fixes**, we make a **patch release** by changing the **z** number (ex: 15.6.2 to 15.6.3).
*   When releasing **new features** or **non-critical fixes**, we make a **minor release** by changing the **y** number (ex: 15.6.2 to 15.7.0).
*   When releasing **breaking changes**, we make a **major release** by changing the **x** number (ex: 15.6.2 to 16.0.0).

Major releases can also contain new features, and any release can include bug fixes.

Minor releases are the most common type of release.

We know our users continue to use old versions of React in production. If we learn of a security vulnerability in React, we release a backported fix for all major versions that are affected by the vulnerability.

### Breaking changes[](https://react.dev/community/versioning-policy#breaking-changes)

Breaking changes are inconvenient for everyone, so we try to minimize the number of major releases – for example, React 15 was released in April 2016 and React 16 was released in September 2017, and React 17 was released in October 2020.

Instead, we release new features in minor versions. That means that minor releases are often more interesting and compelling than majors, despite their unassuming name.

### Commitment to stability[](https://react.dev/community/versioning-policy#commitment-to-stability)

As we change React over time, we try to minimize the effort required to take advantage of new features. When possible, we’ll keep an older API working, even if that means putting it in a separate package. For example, [mixins have been discouraged for years](https://legacy.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html) but they’re supported to this day [via create-react-class](https://legacy.reactjs.org/docs/react-without-es6.html#mixins) and many codebases continue to use them in stable, legacy code.

Over a million developers use React, collectively maintaining millions of components. The Facebook codebase alone has over 50,000 React components. That means we need to make it as easy as possible to upgrade to new versions of React; if we make large changes without a migration path, people will be stuck on old versions. We test these upgrade paths on Facebook itself – if our team of less than 10 people can update 50,000+ components alone, we hope the upgrade will be manageable for anyone using React. In many cases, we write [automated scripts](https://github.com/reactjs/react-codemod) to upgrade component syntax, which we then include in the open-source release for everyone to use.

### Gradual upgrades via warnings[](https://react.dev/community/versioning-policy#gradual-upgrades-via-warnings)

Development builds of React include many helpful warnings. Whenever possible, we add warnings in preparation for future breaking changes. That way, if your app has no warnings on the latest release, it will be compatible with the next major release. This allows you to upgrade your apps one component at a time.

Development warnings won’t affect the runtime behavior of your app. That way, you can feel confident that your app will behave the same way between the development and production builds — the only differences are that the production build won’t log the warnings and that it is more efficient. (If you ever notice otherwise, please file an issue.)

### What counts as a breaking change?[](https://react.dev/community/versioning-policy#what-counts-as-a-breaking-change)

In general, we _don’t_ bump the major version number for changes to:
*   **Development warnings.** Since these don’t affect production behavior, we may add new warnings or modify existing warnings in between major versions. In fact, this is what allows us to reliably warn about upcoming breaking changes.
*   **APIs starting with `unstable_`.** These are provided as experimental features whose APIs we are not yet confident in. By releasing these with an `unstable_` prefix, we can iterate faster and get to a stable API sooner.
*   **Alpha and Canary versions of React.** We provide alpha versions of React as a way to test new features early, but we need the flexibility to make changes based on what we learn in the alpha period. If you use these versions, note that APIs may change before the stable release.
*   **Undocumented APIs and internal data structures.** If you access internal property names like `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` or `__reactInternalInstance$uk43rzhitjg`, there is no warranty. You are on your own.

This policy is designed to be pragmatic: certainly, we don’t want to cause headaches for you. If we bumped the major version for all of these changes, we would end up releasing more major versions and ultimately causing more versioning pain for the community. It would also mean that we can’t make progress in improving React as fast as we’d like.

That said, if we expect that a change on this list will cause broad problems in the community, we will still do our best to provide a gradual migration path.

### If a minor release includes no new features, why isn’t it a patch?[](https://react.dev/community/versioning-policy#if-a-minor-release-includes-no-new-features-why-isnt-it-a-patch)

It’s possible that a minor release will not include new features. [This is allowed by semver](https://semver.org/#spec-item-7), which states **“\[a minor version\] MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes.”**

However, it does raise the question of why these releases aren’t versioned as patches instead.

The answer is that any change to React (or other software) carries some risk of breaking in unexpected ways. Imagine a scenario where a patch release that fixes one bug accidentally introduces a different bug. This would not only be disruptive to developers, but also harm their confidence in future patch releases. It’s especially regrettable if the original fix is for a bug that is rarely encountered in practice.

We have a pretty good track record for keeping React releases free of bugs, but patch releases have an even higher bar for reliability because most developers assume they can be adopted without adverse consequences.

For these reasons, we reserve patch releases only for the most critical bugs and security vulnerabilities.

If a release includes non-essential changes — such as internal refactors, changes to implementation details, performance improvements, or minor bugfixes — we will bump the minor version even when there are no new features.

## All release channels[](https://react.dev/community/versioning-policy#all-release-channels)

React relies on a thriving open source community to file bug reports, open pull requests, and [submit RFCs](https://github.com/reactjs/rfcs). To encourage feedback we sometimes share special builds of React that include unreleased features.

### Note

This section will be most relevant to developers who work on frameworks, libraries, or developer tooling. Developers who use React primarily to build user-facing applications should not need to worry about our prerelease channels.

Each of React’s release channels is designed for a distinct use case:
*   [**Latest**](https://react.dev/community/versioning-policy#latest-channel) is for stable, semver React releases. It’s what you get when you install React from npm. This is the channel you’re already using today. **User-facing applications that consume React directly use this channel.**   [**Canary**](https://react.dev/community/versioning-policy#canary-channel) tracks the main branch of the React source code repository. Think of these as release candidates for the next semver release. **[Frameworks or other curated setups may choose to use this channel with a pinned version of React.](https://react.dev/blog/2023/05/03/react-canaries) You can also use Canaries for integration testing between React and third party projects.**   [**Experimental**](https://react.dev/community/versioning-policy#experimental-channel) includes experimental APIs and features that aren’t available in the stable releases. These also track the main branch, but with additional feature flags turned on. Use this to try out upcoming features before they are released.

All releases are published to npm, but only Latest uses semantic versioning. Prereleases (those in the Canary and Experimental channels) have versions generated from a hash of their contents and the commit date, e.g. `18.3.0-canary-388686f29-20230503` for Canary and `0.0.0-experimental-388686f29-20230503` for Experimental.

**Both Latest and Canary channels are officially supported for user-facing applications, but with different expectations**:
*   Latest releases follow the traditional semver model.
*   Canary releases [must be pinned](https://react.dev/blog/2023/05/03/react-canaries) and may include breaking changes. They exist for curated setups (like frameworks) that want to gradually release new React features and bugfixes on their own release schedule.

The Experimental releases are provided for testing purposes only, and we provide no guarantees that behavior won’t change between releases. They do not follow the semver protocol that we use for releases from Latest.

By publishing prereleases to the same registry that we use for stable releases, we are able to take advantage of the many tools that support the npm workflow, like [unpkg](https://unpkg.com/) and [CodeSandbox](https://codesandbox.io/).

### Latest channel[](https://react.dev/community/versioning-policy#latest-channel)

Latest is the channel used for stable React releases. It corresponds to the `latest` tag on npm. It is the recommended channel for all React apps that are shipped to real users.

**If you’re not sure which channel you should use, it’s Latest.** If you’re using React directly, this is what you’re already using. You can expect updates to Latest to be extremely stable. Versions follow the semantic versioning scheme, as [described earlier.](https://react.dev/community/versioning-policy#stable-releases)

### Canary channel[](https://react.dev/community/versioning-policy#canary-channel)

The Canary channel is a prerelease channel that tracks the main branch of the React repository. We use prereleases in the Canary channel as release candidates for the Latest channel. You can think of Canary as a superset of Latest that is updated more frequently.

The degree of change between the most recent Canary release and the most recent Latest release is approximately the same as you would find between two minor semver releases. However, **the Canary channel does not conform to semantic versioning.** You should expect occasional breaking changes between successive releases in the Canary channel.

**Do not use prereleases in user-facing applications directly unless you’re following the [Canary workflow](https://react.dev/blog/2023/05/03/react-canaries).**

Releases in Canary are published with the `canary` tag on npm. Versions are generated from a hash of the build’s contents and the commit date, e.g. `18.3.0-canary-388686f29-20230503`.

#### Using the canary channel for integration testing[](https://react.dev/community/versioning-policy#using-the-canary-channel-for-integration-testing)

The Canary channel also supports integration testing between React and other projects.

All changes to React go through extensive internal testing before they are released to the public. However, there are a myriad of environments and configurations used throughout the React ecosystem, and it’s not possible for us to test against every single one.

If you’re the author of a third party React framework, library, developer tool, or similar infrastructure-type project, you can help us keep React stable for your users and the entire React community by periodically running your test suite against the most recent changes. If you’re interested, follow these steps:
*   Set up a cron job using your preferred continuous integration platform. Cron jobs are supported by both [CircleCI](https://circleci.com/docs/2.0/triggers/#scheduled-builds) and [Travis CI](https://docs.travis-ci.com/user/cron-jobs/).
    
*   In the cron job, update your React packages to the most recent React release in the Canary channel, using `canary` tag on npm. Using the npm cli:
    
    ```
    
    
    npm update react@canary react-dom@canary
    
    
    ```
    
    Or yarn:
    
    ```
    
    
    yarn upgrade react@canary react-dom@canary
    
    
    ```
    
*   Run your test suite against the updated packages.
    
*   If everything passes, great! You can expect that your project will work with the next minor React release.
    
*   If something breaks unexpectedly, please let us know by [filing an issue](https://github.com/facebook/react/issues).
    

A project that uses this workflow is Next.js. You can refer to their [CircleCI configuration](https://github.com/zeit/next.js/blob/c0a1c0f93966fe33edd93fb53e5fafb0dcd80a9e/.circleci/config.yml) as an example.

### Experimental channel[](https://react.dev/community/versioning-policy#experimental-channel)

Like Canary, the Experimental channel is a prerelease channel that tracks the main branch of the React repository. Unlike Canary, Experimental releases include additional features and APIs that are not ready for wider release.

Usually, an update to Canary is accompanied by a corresponding update to Experimental. They are based on the same source revision, but are built using a different set of feature flags.

Experimental releases may be significantly different than releases to Canary and Latest. **Do not use Experimental releases in user-facing applications.** You should expect frequent breaking changes between releases in the Experimental channel.

Releases in Experimental are published with the `experimental` tag on npm. Versions are generated from a hash of the build’s contents and the commit date, e.g. `0.0.0-experimental-68053d940-20210623`.

#### What goes into an experimental release?[](https://react.dev/community/versioning-policy#what-goes-into-an-experimental-release)

Experimental features are ones that are not ready to be released to the wider public, and may change drastically before they are finalized. Some experiments may never be finalized — the reason we have experiments is to test the viability of proposed changes.

For example, if the Experimental channel had existed when we announced Hooks, we would have released Hooks to the Experimental channel weeks before they were available in Latest.

You may find it valuable to run integration tests against Experimental. This is up to you. However, be advised that Experimental is even less stable than Canary. **We do not guarantee any stability between Experimental releases.**

#### How can I learn more about experimental features?[](https://react.dev/community/versioning-policy#how-can-i-learn-more-about-experimental-features)

Experimental features may or may not be documented. Usually, experiments aren’t documented until they are close to shipping in Canary or Latest.

If a feature is not documented, they may be accompanied by an [RFC](https://github.com/reactjs/rfcs).

We will post to the [React blog](https://react.dev/blog) when we’re ready to announce new experiments, but that doesn’t mean we will publicize every experiment.

You can always refer to our public GitHub repository’s [history](https://github.com/facebook/react/commits/main) for a comprehensive list of changes.

#### _docs_rendering-elements.html.md

> Source: https://reactjs.org/docs/rendering-elements.html
> Scraped: 4/2/2025, 3:16:00 PM

Elements are the smallest building blocks of React apps.

An element describes what you want to see on the screen:
```
const element = <h1>Hello, world</h1>;
```
Unlike browser DOM elements, React elements are plain objects, and are cheap to create. React DOM takes care of updating the DOM to match the React elements.

> **Note:**
> 
> One might confuse elements with a more widely known concept of “components”. We will introduce components in the [next section](_docs_components-and-props.html.md). Elements are what components are “made of”, and we encourage you to read this section before jumping ahead.

## [](_docs_rendering-elements.html.md#rendering-an-element-into-the-dom)Rendering an Element into the DOM

Let’s say there is a `<div>` somewhere in your HTML file:

We call this a “root” DOM node because everything inside it will be managed by React DOM.

Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like.

To render a React element, first pass the DOM element to [`ReactDOM.createRoot()`](_docs_react-dom-client.html.md#createroot), then pass the React element to `root.render()`:
```
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
const element = <h1>Hello, world</h1>;
root.render(element);
```
**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**

It displays “Hello, world” on the page.

## [](_docs_rendering-elements.html.md#updating-the-rendered-element)Updating the Rendered Element

React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object). Once you create an element, you can’t change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`.

Consider this ticking clock example:
```
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);}
setInterval(tick, 1000);
```
**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

It calls [`root.render()`](_docs_react-dom.html.md#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.

> **Note:**
> 
> In practice, most React apps only call `root.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](_docs_state-and-lifecycle.html.md).
> 
> We recommend that you don’t skip topics because they build on each other.

## [](_docs_rendering-elements.html.md#react-only-updates-whats-necessary)React Only Updates What’s Necessary

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

You can verify by inspecting the [last example](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) with the browser tools:

![DOM inspector showing granular updates](https://reactjs.org/c158617ed7cc0eac8f58330e49e48224/granular-dom-updates.gif)

Even though we create an element describing the whole UI tree on every tick, only the text node whose contents have changed gets updated by React DOM.

In our experience, thinking about how the UI should look at any given moment, rather than how to change it over time, eliminates a whole class of bugs.

#### _docs_state-and-lifecycle.html.md

> Source: https://reactjs.org/docs/state-and-lifecycle.html
> Scraped: 4/2/2025, 3:16:00 PM

This page introduces the concept of state and lifecycle in a React component. You can find a [detailed component API reference here](_docs_react-component.html.md).

Consider the ticking clock example from [one of the previous sections](_docs_rendering-elements.html.md#updating-the-rendered-element). In [Rendering Elements](_docs_rendering-elements.html.md#rendering-an-element-into-the-dom), we have only learned one way to update the UI. We call `root.render()` to change the rendered output:
```
const root = ReactDOM.createRoot(document.getElementById('root'));
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);}
setInterval(tick, 1000);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

In this section, we will learn how to make the `Clock` component truly reusable and encapsulated. It will set up its own timer and update itself every second.

We can start by encapsulating how the clock looks:
```
const root = ReactDOM.createRoot(document.getElementById('root'));
function Clock(props) {
  return (
    <div>      <h1>Hello, world!</h1>      <h2>It is {props.date.toLocaleTimeString()}.</h2>    </div>  );
}
function tick() {
  root.render(<Clock date={new Date()} />);}
setInterval(tick, 1000);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

However, it misses a crucial requirement: the fact that the `Clock` sets up a timer and updates the UI every second should be an implementation detail of the `Clock`.

Ideally we want to write this once and have the `Clock` update itself:

To implement this, we need to add “state” to the `Clock` component.

State is similar to props, but it is private and fully controlled by the component.

## [](_docs_state-and-lifecycle.html.md#converting-a-function-to-a-class)Converting a Function to a Class

You can convert a function component like `Clock` to a class in five steps:

1.  Create an [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes), with the same name, that extends `React.Component`.
2.  Add a single empty method to it called `render()`.
3.  Move the body of the function into the `render()` method.
4.  Replace `props` with `this.props` in the `render()` body.
5.  Delete the remaining empty function declaration.
```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

`Clock` is now defined as a class rather than a function.

The `render` method will be called each time an update happens, but as long as we render `<Clock />` into the same DOM node, only a single instance of the `Clock` class will be used. This lets us use additional features such as local state and lifecycle methods.

## [](_docs_state-and-lifecycle.html.md#adding-local-state-to-a-class)Adding Local State to a Class

We will move the `date` from props to state in three steps:

1.  Replace `this.props.date` with `this.state.date` in the `render()` method:
```
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      </div>
    );
  }
}
```
1.  Add a [class constructor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) that assigns the initial `this.state`:
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
Note how we pass `props` to the base constructor:
```
  constructor(props) {
    super(props);    this.state = {date: new Date()};
  }
```
Class components should always call the base constructor with `props`.

1.  Remove the `date` prop from the `<Clock />` element:

We will later add the timer code back to the component itself.

The result looks like this:
```
class Clock extends React.Component {
  constructor(props) {    super(props);    this.state = {date: new Date()};  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

## [](_docs_state-and-lifecycle.html.md#adding-lifecycle-methods-to-a-class)Adding Lifecycle Methods to a Class

In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

We want to [set up a timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) whenever the `Clock` is rendered to the DOM for the first time. This is called “mounting” in React.

We also want to [clear that timer](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) whenever the DOM produced by the `Clock` is removed. This is called “unmounting” in React.

We can declare special methods on the component class to run some code when a component mounts and unmounts:
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {  }
  componentWillUnmount() {  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
These methods are called “lifecycle methods”.

The `componentDidMount()` method runs after the component output has been rendered to the DOM. This is a good place to set up a timer:
```
  componentDidMount() {
    this.timerID = setInterval(      () => this.tick(),      1000    );  }
```
Note how we save the timer ID right on `this` (`this.timerID`).

While `this.props` is set up by React itself and `this.state` has a special meaning, you are free to add additional fields to the class manually if you need to store something that doesn’t participate in the data flow (like a timer ID).

We will tear down the timer in the `componentWillUnmount()` lifecycle method:
```
  componentWillUnmount() {
    clearInterval(this.timerID);  }
```
Finally, we will implement a method called `tick()` that the `Clock` component will run every second.

It will use `this.setState()` to schedule updates to the component local state:
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  tick() {    this.setState({      date: new Date()    });  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

Now the clock ticks every second.

Let’s quickly recap what’s going on and the order in which the methods are called:

1.  When `<Clock />` is passed to `root.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
2.  React then calls the `Clock` component’s `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the `Clock`’s render output.
3.  When the `Clock` output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the `Clock` component asks the browser to set up a timer to call the component’s `tick()` method once a second.
4.  Every second the browser calls the `tick()` method. Inside it, the `Clock` component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
5.  If the `Clock` component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped.

## [](_docs_state-and-lifecycle.html.md#using-state-correctly)Using State Correctly

There are three things you should know about `setState()`.

### [](_docs_state-and-lifecycle.html.md#do-not-modify-state-directly)Do Not Modify State Directly

For example, this will not re-render a component:
```
// Wrong
this.state.comment = 'Hello';
```
Instead, use `setState()`:
```
// Correct
this.setState({comment: 'Hello'});
```
The only place where you can assign `this.state` is the constructor.

### [](_docs_state-and-lifecycle.html.md#state-updates-may-be-asynchronous)State Updates May Be Asynchronous

React may batch multiple `setState()` calls into a single update for performance.

Because `this.props` and `this.state` may be updated asynchronously, you should not rely on their values for calculating the next state.

For example, this code may fail to update the counter:
```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
To fix it, use a second form of `setState()` that accepts a function rather than an object. That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:
```
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
We used an [arrow function](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) above, but it also works with regular functions:
```
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```
### [](_docs_state-and-lifecycle.html.md#state-updates-are-merged)State Updates are Merged

When you call `setState()`, React merges the object you provide into the current state.

For example, your state may contain several independent variables:
```
  constructor(props) {
    super(props);
    this.state = {
      posts: [],      comments: []    };
  }
```
Then you can update them independently with separate `setState()` calls:
```
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts      });
    });
    fetchComments().then(response => {
      this.setState({
        comments: response.comments      });
    });
  }
```
The merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`.

## [](_docs_state-and-lifecycle.html.md#the-data-flows-down)The Data Flows Down

Neither parent nor child components can know if a certain component is stateful or stateless, and they shouldn’t care whether it is defined as a function or a class.

This is why state is often called local or encapsulated. It is not accessible to any component other than the one that owns and sets it.

A component may choose to pass its state down as props to its child components:
```
<FormattedDate date={this.state.date} />
```
The `FormattedDate` component would receive the `date` in its props and wouldn’t know whether it came from the `Clock`’s state, from the `Clock`’s props, or was typed by hand:
```
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

This is commonly called a “top-down” or “unidirectional” data flow. Any state is always owned by some specific component, and any data or UI derived from that state can only affect components “below” them in the tree.

If you imagine a component tree as a waterfall of props, each component’s state is like an additional water source that joins it at an arbitrary point but also flows down.

To show that all components are truly isolated, we can create an `App` component that renders three `<Clock>`s:
```
function App() {
  return (
    <div>
      <Clock />      <Clock />      <Clock />    </div>
  );
}
```
[**Try it on CodePen**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Each `Clock` sets up its own timer and updates independently.

In React apps, whether a component is stateful or stateless is considered an implementation detail of the component that may change over time. You can use stateless components inside stateful components, and vice versa.

#### _docs_testing-environments.html.md

> Source: https://reactjs.org/docs/testing-environments.html
> Scraped: 4/2/2025, 3:11:00 PM

This document goes through the factors that can affect your environment and recommendations for some scenarios.

### [](_docs_testing-environments.html.md#test-runners)Test runners

Test runners like [Jest](https://jestjs.io/), [mocha](https://mochajs.org/), [ava](https://github.com/avajs/ava) let you write test suites as regular JavaScript, and run them as part of your development process. Additionally, test suites are run as part of continuous integration.
*   Jest is widely compatible with React projects, supporting features like mocked [modules](_docs_testing-environments.html.md#mocking-modules) and [timers](_docs_testing-environments.html.md#mocking-timers), and [`jsdom`](_docs_testing-environments.html.md#mocking-a-rendering-surface) support. **If you use Create React App, [Jest is already included out of the box](https://facebook.github.io/create-react-app/docs/running-tests) with useful defaults.**   Libraries like [mocha](https://mochajs.org/#running-mocha-in-the-browser) work well in real browser environments, and could help for tests that explicitly need it.
*   End-to-end tests are used for testing longer flows across multiple pages, and require a [different setup](_docs_testing-environments.html.md#end-to-end-tests-aka-e2e-tests).

### [](_docs_testing-environments.html.md#mocking-a-rendering-surface)Mocking a rendering surface

Tests often run in an environment without access to a real rendering surface like a browser. For these environments, we recommend simulating a browser with [`jsdom`](https://github.com/jsdom/jsdom), a lightweight browser implementation that runs inside Node.js.

In most cases, jsdom behaves like a regular browser would, but doesn’t have features like [layout and navigation](https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform). This is still useful for most web-based component tests, since it runs quicker than having to start up a browser for each test. It also runs in the same process as your tests, so you can write code to examine and assert on the rendered DOM.

Just like in a real browser, jsdom lets us model user interactions; tests can dispatch events on DOM nodes, and then observe and assert on the side effects of these actions [(example)](_docs_testing-recipes.html.md#events).

A large portion of UI tests can be written with the above setup: using Jest as a test runner, rendered to jsdom, with user interactions specified as sequences of browser events, powered by the `act()` helper [(example)](_docs_testing-recipes.html.md). For example, a lot of React’s own tests are written with this combination.

If you’re writing a library that tests mostly browser-specific behavior, and requires native browser behavior like layout or real inputs, you could use a framework like [mocha.](https://mochajs.org/)

In an environment where you _can’t_ simulate a DOM (e.g. testing React Native components on Node.js), you could use [event simulation helpers](_docs_test-utils.html.md#simulate) to simulate interactions with elements. Alternately, you could use the `fireEvent` helper from [`@testing-library/react-native`](https://testing-library.com/docs/react-native-testing-library/intro).

Frameworks like [Cypress](https://www.cypress.io/), [puppeteer](https://github.com/GoogleChrome/puppeteer) and [webdriver](https://www.seleniumhq.org/projects/webdriver/) are useful for running [end-to-end tests](_docs_testing-environments.html.md#end-to-end-tests-aka-e2e-tests).

### [](_docs_testing-environments.html.md#mocking-functions)Mocking functions

When writing tests, we’d like to mock out the parts of our code that don’t have equivalents inside our testing environment (e.g. checking `navigator.onLine` status inside Node.js). Tests could also spy on some functions, and observe how other parts of the test interact with them. It is then useful to be able to selectively mock these functions with test-friendly versions.

This is especially useful for data fetching. It is usually preferable to use “fake” data for tests to avoid the slowness and flakiness due to fetching from real API endpoints [(example)](_docs_testing-recipes.html.md#data-fetching). This helps make the tests predictable. Libraries like [Jest](https://jestjs.io/) and [sinon](https://sinonjs.org/), among others, support mocked functions. For end-to-end tests, mocking network can be more difficult, but you might also want to test the real API endpoints in them anyway.

### [](_docs_testing-environments.html.md#mocking-modules)Mocking modules

Some components have dependencies for modules that may not work well in test environments, or aren’t essential to our tests. It can be useful to selectively mock these modules out with suitable replacements [(example)](_docs_testing-recipes.html.md#mocking-modules).

On Node.js, runners like Jest [support mocking modules](https://jestjs.io/docs/en/manual-mocks). You could also use libraries like [`mock-require`](https://www.npmjs.com/package/mock-require).

### [](_docs_testing-environments.html.md#mocking-timers)Mocking timers

Components might be using time-based functions like `setTimeout`, `setInterval`, or `Date.now`. In testing environments, it can be helpful to mock these functions out with replacements that let you manually “advance” time. This is great for making sure your tests run fast! Tests that are dependent on timers would still resolve in order, but quicker [(example)](_docs_testing-recipes.html.md#timers). Most frameworks, including [Jest](https://jestjs.io/docs/en/timer-mocks), [sinon](https://sinonjs.org/releases/latest/fake-timers) and [lolex](https://github.com/sinonjs/lolex), let you mock timers in your tests.

Sometimes, you may not want to mock timers. For example, maybe you’re testing an animation, or interacting with an endpoint that’s sensitive to timing (like an API rate limiter). Libraries with timer mocks let you enable and disable them on a per test/suite basis, so you can explicitly choose how these tests would run.

### [](_docs_testing-environments.html.md#end-to-end-tests-aka-e2e-tests)End-to-end tests

End-to-end tests are useful for testing longer workflows, especially when they’re critical to your business (such as payments or signups). For these tests, you’d probably want to test how a real browser renders the whole app, fetches data from the real API endpoints, uses sessions and cookies, navigates between different links. You might also likely want to make assertions not just on the DOM state, but on the backing data as well (e.g. to verify whether the updates have been persisted to the database).

In this scenario, you would use a framework like [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev/) or a library like [Puppeteer](https://pptr.dev/) so you can navigate between multiple routes and assert on side effects not just in the browser, but potentially on the backend as well.

#### _docs_testing-recipes.html.md

> Source: https://reactjs.org/docs/testing-recipes.html
> Scraped: 4/2/2025, 3:11:00 PM

Common testing patterns for React components.

> Note:
> 
> This page assumes you’re using [Jest](https://jestjs.io/) as a test runner. If you use a different test runner, you may need to adjust the API, but the overall shape of the solution will likely be the same. Read more details on setting up a testing environment on the [Testing Environments](_docs_testing-environments.html.md) page.

### [](_docs_testing-recipes.html.md#setup--teardown)Setup/Teardown

For each test, we usually want to render our React tree to a DOM element that’s attached to `document`. This is important so that it can receive DOM events. When the test ends, we want to “clean up” and unmount the tree from the `document`.

A common way to do it is to use a pair of `beforeEach` and `afterEach` blocks so that they’ll always run and isolate the effects of a test to itself:
```
import { unmountComponentAtNode } from "react-dom";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
```
You may use a different pattern, but keep in mind that we want to execute the cleanup _even if a test fails_. Otherwise, tests can become “leaky”, and one test can change the behavior of another test. That makes them difficult to debug.
* * *

### [](_docs_testing-recipes.html.md#act)`act()`

When writing UI tests, tasks like rendering, user events, or data fetching can be considered as “units” of interaction with a user interface. `react-dom/test-utils` provides a helper called [`act()`](_docs_test-utils.html.md#act) that makes sure all updates related to these “units” have been processed and applied to the DOM before you make any assertions:
```
act(() => {
  // render components
});
// make assertions
```
This helps make your tests run closer to what real users would experience when using your application. The rest of these examples use `act()` to make these guarantees.

You might find using `act()` directly a bit too verbose. To avoid some of the boilerplate, you could use a library like [React Testing Library](https://testing-library.com/react), whose helpers are wrapped with `act()`.

> Note:
> 
> The name `act` comes from the [Arrange-Act-Assert](http://wiki.c2.com/?ArrangeActAssert) pattern.
* * *

### [](_docs_testing-recipes.html.md#rendering)Rendering

Commonly, you might want to test whether a component renders correctly for given props. Consider a simple component that renders a message based on a prop:
```
// hello.js
import React from "react";
export default function Hello(props) {
  if (props.name) {
    return <h1>Hello, {props.name}!</h1>;
  } else {
    return <span>Hey, stranger</span>;
  }
}
```
We can write a test for this component:
```
// hello.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Hello from "./hello";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("renders with or without a name", () => {
  act(() => {    render(<Hello />, container);  });  expect(container.textContent).toBe("Hey, stranger");
  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(container.textContent).toBe("Hello, Jenny!");
  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(container.textContent).toBe("Hello, Margaret!");
});
```
* * *

### [](_docs_testing-recipes.html.md#data-fetching)Data Fetching

Instead of calling real APIs in all your tests, you can mock requests with dummy data. Mocking data fetching with “fake” data prevents flaky tests due to an unavailable backend, and makes them run faster. Note: you may still want to run a subset of tests using an [“end-to-end”](_docs_testing-environments.html.md#end-to-end-tests-aka-e2e-tests) framework that tells whether the whole app is working together.
```
// user.js
import React, { useState, useEffect } from "react";
export default function User(props) {
  const [user, setUser] = useState(null);
  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }
  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);
  if (!user) {
    return "loading...";
  }
  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </details>
  );
}
```
We can write tests for it:
```
// user.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("renders user data", async () => {
  const fakeUser = {    name: "Joni Baez",    age: "32",    address: "123, Charming Avenue"  };  jest.spyOn(global, "fetch").mockImplementation(() =>    Promise.resolve({      json: () => Promise.resolve(fakeUser)    })  );
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<User id="123" />, container);
  });
  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);
  // remove the mock to ensure tests are completely isolated  global.fetch.mockRestore();});
```
* * *

### [](_docs_testing-recipes.html.md#mocking-modules)Mocking Modules

Some modules might not work well inside a testing environment, or may not be as essential to the test itself. Mocking out these modules with dummy replacements can make it easier to write tests for your own code.

Consider a `Contact` component that embeds a third-party `GoogleMap` component:
```
// map.js
import React from "react";
import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
  return (
    <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap id="example-map" center={props.center} />
    </LoadScript>
  );
}
// contact.js
import React from "react";
import Map from "./map";
export default function Contact(props) {
  return (
    <div>
      <address>
        Contact {props.name} via{" "}
        <a data-testid="email" href={"mailto:" + props.email}>
          email
        </a>
        or on their <a data-testid="site" href={props.site}>
          website
        </a>.
      </address>
      <Map center={props.center} />
    </div>
  );
}
```
If we don’t want to load this component in our tests, we can mock out the dependency itself to a dummy component, and run our tests:
```
// contact.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Contact from "./contact";
import MockedMap from "./map";
jest.mock("./map", () => {  return function DummyMap(props) {    return (      <div data-testid="map">        {props.center.lat}:{props.center.long}      </div>    );  };});
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("should render contact information", () => {
  const center = { lat: 0, long: 0 };
  act(() => {
    render(
      <Contact
        name="Joni Baez"
        email="test@example.com"
        site="http://test.com"
        center={center}
      />,
      container
    );
  });
  expect(
    container.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual("mailto:test@example.com");
  expect(
    container.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");
  expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});
```
* * *

### [](_docs_testing-recipes.html.md#events)Events

We recommend dispatching real DOM events on DOM elements, and then asserting on the result. Consider a `Toggle` component:
```
// toggle.js
import React, { useState } from "react";
export default function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? "Turn off" : "Turn on"}
    </button>
  );
}
```
We could write tests for it:
```
// toggle.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Toggle from "./toggle";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("changes value when clicked", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });
  // get a hold of the button element, and trigger some clicks on it
  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Turn on");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Turn off");
  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }  });
  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Turn on");
});
```
Different DOM events and their properties are described in [MDN](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent). Note that you need to pass `{ bubbles: true }` in each event you create for it to reach the React listener because React automatically delegates events to the root.

> Note:
> 
> React Testing Library offers a [more concise helper](https://testing-library.com/docs/dom-testing-library/api-events) for firing events.
* * *

### [](_docs_testing-recipes.html.md#timers)Timers

Your code might use timer-based functions like `setTimeout` to schedule more work in the future. In this example, a multiple choice panel waits for a selection and advances, timing out if a selection isn’t made in 5 seconds:
```
// card.js
import React, { useEffect } from "react";
export default function Card(props) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [props.onSelect]);
  return [1, 2, 3, 4].map(choice => (
    <button
      key={choice}
      data-testid={choice}
      onClick={() => props.onSelect(choice)}
    >
      {choice}
    </button>
  ));
}
```
We can write tests for this component by leveraging [Jest’s timer mocks](https://jestjs.io/docs/en/timer-mocks), and testing the different states it can be in.
```
// card.test.js
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Card from "./card";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});
it("should select null after timing out", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
  // move ahead in time by 100ms  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();
  // and then move ahead by 5 seconds  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).toHaveBeenCalledWith(null);
});
it("should cleanup on being removed", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();
  // unmount the app
  act(() => {
    render(null, container);
  });
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).not.toHaveBeenCalled();
});
it("should accept selections", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });
  act(() => {
    container
      .querySelector("[data-testid='2']")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(onSelect).toHaveBeenCalledWith(2);
});
```
You can use fake timers only in some tests. Above, we enabled them by calling `jest.useFakeTimers()`. The main advantage they provide is that your test doesn’t actually have to wait five seconds to execute, and you also didn’t need to make the component code more convoluted just for testing.
* * *

### [](_docs_testing-recipes.html.md#snapshot-testing)Snapshot Testing

Frameworks like Jest also let you save “snapshots” of data with [`toMatchSnapshot` / `toMatchInlineSnapshot`](https://jestjs.io/docs/en/snapshot-testing). With these, we can “save” the rendered component output and ensure that a change to it has to be explicitly committed as a change to the snapshot.

In this example, we render a component and format the rendered HTML with the [`pretty`](https://www.npmjs.com/package/pretty) package, before saving it as an inline snapshot:
```
// hello.test.js, again
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";
import Hello from "./hello";
let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
it("should render a greeting", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(    pretty(container.innerHTML)  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
  act(() => {
    render(<Hello name="Jenny" />, container);
  });
  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
  act(() => {
    render(<Hello name="Margaret" />, container);
  });
  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... gets filled automatically by jest ... */
});
```
It’s typically better to make more specific assertions than to use snapshots. These kinds of tests include implementation details so they break easily, and teams can get desensitized to snapshot breakages. Selectively [mocking some child components](_docs_testing-recipes.html.md#mocking-modules) can help reduce the size of snapshots and keep them readable for the code review.
* * *

### [](_docs_testing-recipes.html.md#multiple-renderers)Multiple Renderers

In rare cases, you may be running a test on a component that uses multiple renderers. For example, you may be running snapshot tests on a component with `react-test-renderer`, that internally uses `render` from `react-dom` inside a child component to render some content. In this scenario, you can wrap updates with `act()`s corresponding to their renderers.
```
import { act as domAct } from "react-dom/test-utils";
import { act as testAct, create } from "react-test-renderer";
// ...
let root;
domAct(() => {
  testAct(() => {
    root = create(<App />);
  });
});
expect(root).toMatchSnapshot();
```
* * *

### [](_docs_testing-recipes.html.md#something-missing)Something Missing?

If some common scenario is not covered, please let us know on the [issue tracker](https://github.com/reactjs/reactjs.org/issues) for the documentation website.

#### _docs_testing.html.md

> Source: https://reactjs.org/docs/testing.html
> Scraped: 4/2/2025, 3:15:58 PM

You can test React components similar to testing other JavaScript code.

There are a few ways to test React components. Broadly, they divide into two categories:
*   **Rendering component trees** in a simplified test environment and asserting on their output.
*   **Running a complete app** in a realistic browser environment (also known as “end-to-end” tests).

This documentation section focuses on testing strategies for the first case. While full end-to-end tests can be very useful to prevent regressions to important workflows, such tests are not concerned with React components in particular, and are out of the scope of this section.

### [](_docs_testing.html.md#tradeoffs)Tradeoffs

When choosing testing tools, it is worth considering a few tradeoffs:
*   **Iteration speed vs Realistic environment:** Some tools offer a very quick feedback loop between making a change and seeing the result, but don’t model the browser behavior precisely. Other tools might use a real browser environment, but reduce the iteration speed and are flakier on a continuous integration server.
*   **How much to mock:** With components, the distinction between a “unit” and “integration” test can be blurry. If you’re testing a form, should its test also test the buttons inside of it? Or should a button component have its own test suite? Should refactoring a button ever break the form test?

Different answers may work for different teams and products.

### [](_docs_testing.html.md#tools)Recommended Tools

**[Jest](https://facebook.github.io/jest/)** is a JavaScript test runner that lets you access the DOM via [`jsdom`](_docs_testing-environments.html.md#mocking-a-rendering-surface). While jsdom is only an approximation of how the browser works, it is often good enough for testing React components. Jest provides a great iteration speed combined with powerful features like mocking [modules](_docs_testing-environments.html.md#mocking-modules) and [timers](_docs_testing-environments.html.md#mocking-timers) so you can have more control over how the code executes.

**[React Testing Library](https://testing-library.com/react)** is a set of helpers that let you test React components without relying on their implementation details. This approach makes refactoring a breeze and also nudges you towards best practices for accessibility. Although it doesn’t provide a way to “shallowly” render a component without its children, a test runner like Jest lets you do this by [mocking](_docs_testing-recipes.html.md#mocking-modules).

### [](_docs_testing.html.md#learn-more)Learn More

This section is divided in two pages:
*   [Recipes](_docs_testing-recipes.html.md): Common patterns when writing tests for React components.
*   [Environments](_docs_testing-environments.html.md): What to consider when setting up a testing environment for React components.

