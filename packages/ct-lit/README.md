# ct-lit

Enhanced wrapper for LitElement with additional utility methods.

[![Published on npm](https://img.shields.io/npm/v/@conectate/ct-lit.svg)](https://www.npmjs.com/package/@conectate/ct-lit)

## Installation

```bash
npm install @conectate/ct-lit
```

## Usage

`ct-lit` provides the `CtLit` class, which extends LitElement and adds useful utility methods. It also re-exports most commonly used functions and decorators from the `lit` library.

### Basic Example

```typescript
import { CtLit, html, customElement } from '@conectate/ct-lit';

@customElement('my-element')
export class MyElement extends CtLit {
  render() {
    return html`
      <div>Hello World!</div>
    `;
  }
}
```

### Utility Methods Example

```typescript
@customElement('my-element')
export class MyElement extends CtLit {
  firstUpdated() {
    // Select elements using simplified selectors
    const button = this.$$('#myButton');

    // Fire custom events easily
    this.fire('element-ready', { status: 'ok' });
  }

  handleClick() {
    // Helper for smooth scrolling
    this.scrollToY(500, 800, 'easeInOutQuint');
  }

  render() {
    return html`
      <div>
        <button id="myButton" @click=${this.handleClick}>Click me</button>

        <!-- Conditional rendering helper -->
        ${If(this.showContent, html`<div>Additional content</div>`)}
      </div>
    `;
  }
}
```

## API Reference

### CtLit Class

Extends the LitElement class with additional utility methods.

#### Methods

| Method      | Parameters                                                                 | Return Type                                       | Description                                             |
| ----------- | -------------------------------------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------- |
| `$$`        | `name: string`                                                             | `HTMLElement \| Element \| undefined \| null`     | Returns the first element that matches the CSS selector |
| `$$$`       | `name: string`                                                             | `NodeListOf<HTMLElement \| Element> \| undefined` | Returns all elements that match the CSS selector        |
| `mapIDs`    | -                                                                          | `void`                                            | Maps all elements with IDs to `this.$` (deprecated)     |
| `deepClone` | `ob: T`                                                                    | `T`                                               | Creates a deep clone of an object                       |
| `fire`      | `name: string, value: any`                                                 | `void`                                            | Dispatches a CustomEvent with the given name and value  |
| `scrollToY` | `scrollTargetY?: number, time?: number, easing?: string, target?: Element` | `void`                                            | Smoothly scrolls to a position on the page              |

### Helper Functions

| Function | Parameters                          | Return Type | Description                      |
| -------- | ----------------------------------- | ----------- | -------------------------------- |
| `If`     | `condition: boolean, template: any` | `any`       | Conditionally renders a template |

### Exports from Lit

The library re-exports the following from the `lit` library:

- `css`, `html`, `svg`, `unsafeCSS` from `lit`
- `property`, `query`, `queryAll`, `queryAssignedNodes`, `queryAsync`, `state` from `lit/decorators.js`
- `unsafeHTML` from `lit/directives/unsafe-html.js`
- `until` from `lit/directives/until.js`
- `LitElement` from `lit`

### Decorators

| Decorator       | Parameters        | Description              |
| --------------- | ----------------- | ------------------------ |
| `customElement` | `tagName: string` | Defines a custom element |

## License

MIT
