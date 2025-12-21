<h1 align="center">@conectate/components/ct-button</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/components/ct-button?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/components/ct-button.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/components/ct-button"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/components/ct-button.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
</p>

A customizable button web component with various styles and configurations.

## Installation

Install via npm or pnpm:

```sh
pnpm i @conectate/components/ct-button
# or
npm i @conectate/components/ct-button
```

## Basic Usage

```html
<ct-button>Click me</ct-button>
<ct-button raised>Raised Button</ct-button>
<ct-button shadow>Shadow Button</ct-button>
<ct-button flat>Flat Button</ct-button>
<ct-button light>Light Button</ct-button>
<ct-button disabled>Disabled Button</ct-button>
```

## Usage with ES Modules

If you are using frameworks like Lit, React, or Vue, import the component:

```ts
import "@conectate/components/ct-button";
```

### Example with LitElement (TypeScript)

```ts
import { LitElement, customElement, html } from "lit";
import "@conectate/components/ct-button";

@customElement("my-element")
class MyElement extends LitElement {
	render() {
		return html`
			<ct-button raised @click=${this.handleClick}>Click Me</ct-button>
		`;
	}

	handleClick() {
		console.log("Button clicked!");
	}
}
```

## Variants

The button comes in several variants:

- **Default**: Standard button
- **Raised**: Primary colored button
- **Shadow**: Button with opaque black background
- **Flat**: Button with a primary color border
- **Light**: Button with a primary color border (alternative style)

## Components

This package includes:

- `ct-button`: Standard button component
- `ct-button-menu`: Button with dropdown menu functionality
- `ct-button-split`: Split button with primary action and dropdown

## Properties

| Property   | Attribute  | Type      | Default    | Description                         |
| ---------- | ---------- | --------- | ---------- | ----------------------------------- |
| `raised`   | `raised`   | `boolean` | `false`    | Raised Style (primary color)        |
| `shadow`   | `shadow`   | `boolean` | `false`    | Shown with opaque black background. |
| `flat`     | `flat`     | `boolean` | `false`    | Shown with a primary color border   |
| `light`    | `light`    | `boolean` | `false`    | Shown with a primary color border   |
| `disabled` | `disabled` | `boolean` | `false`    | If `true`, Disable clicks           |
| `type`     | `type`     | `string`  | `"button"` | Button type (button, submit, reset) |

## Slots

- **Default slot**: Main content of the button
- **prefix**: Content placed above the main content
- **suffix**: Content placed below the main content

## CSS Variables

You can customize the component using the following CSS variables:

```css
ct-button {
	--color-primary: #00aeff; /* Primary color */
	--dark-primary-color: #00aeff; /* Dark Primary color */
	--ct-button-box-shadow: 0 2px 16px 4px rgba(99, 188, 240, 0.45); /* Box-Shadow for hover */
	--ct-button-shadow-color: rgba(64, 117, 187, 0.1); /* Shadow color */
	--ct-button-radius: 26px; /* Button border radius */
	--ct-button-padding: 0.4em 1em; /* Button padding */
}
```

## Accessibility (a11y)

The component has proper focus states and keyboard navigation support. Use `aria-label` for improved accessibility when needed.

## Follow Me

[![Herberth_thumb](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://x.com/herberthobregon)

[https://x.com/herberthobregon](https://x.com/herberthobregon)

## Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature-branch`
5. Open a pull request!

## License

See [LICENSE](/LICENSE)
