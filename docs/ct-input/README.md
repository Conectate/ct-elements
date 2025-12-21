<h1 align="center">@conectate/components/ct-input</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/components/ct-input?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/components/ct-input.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/components/ct-input"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/components/ct-input.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
	<a href="https://www.webcomponents.org/element/conectate/ct-element"><img alt="Published on webcomponents.org" src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" height="20"/></a>

</p>

A collection of customizable input components including text input, textarea, and autocomplete functionality.

## Installation

Install via npm or pnpm:

```sh
pnpm i @conectate/components/ct-input
# or
npm i @conectate/components/ct-input
```

## Basic Usage

```html
<!-- Basic text input -->
<ct-input label="Username"></ct-input>

<!-- Password input -->
<ct-input type="password" label="Password"></ct-input>

<!-- Input with error message -->
<ct-input label="Email" type="email" errorMessage="Please enter a valid email"></ct-input>

<!-- Textarea with auto-grow -->
<ct-textarea-autogrow label="Message"></ct-textarea-autogrow>
```

## Usage with ES Modules

If you are using frameworks like Lit, React, or Vue, import the component:

```ts
import "@conectate/components/ct-input";
import "@conectate/components/ct-input/ct-textarea.js";
import "@conectate/components/ct-input/ct-textarea-autogrow.js";
import "@conectate/components/ct-input/ct-input-autocomplete.js";
```

### Example with LitElement (TypeScript)

```ts
import { LitElement, customElement, html } from "lit";
import "@conectate/components/ct-input";

@customElement("my-form")
class MyForm extends LitElement {
	render() {
		return html`
			<ct-input
				label="Username"
				@input=${this.handleInput}
				required
			></ct-input>
		`;
	}

	handleInput(e) {
		console.log("Input value:", e.target.value);
	}
}
```

## Components

This package includes multiple input components:

- `ct-input`: Standard text input component
- `ct-textarea`: Multiline text input
- `ct-textarea-autogrow`: Textarea that grows with content
- `ct-input-autocomplete`: Input with autocomplete suggestions
- `ct-input-container`: Container component for inputs
- `ct-input-phone`: Phone number input
- `ct-autocomplete-suggestions`: Suggestions dropdown for autocomplete

## Properties

### ct-input

| Property       | Type               | Default                   | Description                             |
| -------------- | ------------------ | ------------------------- | --------------------------------------- |
| `type`         | `CtInputType`      | `"text"`                  | Input type (text, password, email, etc) |
| `value`        | `string`           | `""`                      | Input value                             |
| `label`        | `string`           | `""`                      | Label text                              |
| `placeholder`  | `string`           | `""`                      | Placeholder text                        |
| `errorMessage` | `string`           | `""`                      | Error message to display                |
| `disabled`     | `boolean`          | `false`                   | Disables the input                      |
| `required`     | `boolean`          | `false`                   | Makes the input required                |
| `pattern`      | `string \| RegExp` | `""`                      | Validation pattern                      |
| `charCounter`  | `boolean`          | `false`                   | Show character counter                  |
| `maxlength`    | `number`           | `Number.MAX_SAFE_INTEGER` | Maximum input length                    |
| `invalid`      | `boolean`          | `false`                   | Whether the input is invalid            |

## Slots

- **Default slot**: Content inside the input (rarely used)
- **prefix**: Content placed at the start of the input
- **suffix**: Content placed at the end of the input

## CSS Variables

You can customize the components using the following CSS variables:

```css
ct-input {
	--color-primary: #2cb5e8; /* Primary color for focus */
	--color-error: #ed4f32; /* Error color */
	--border-radius: 16px; /* Border radius of the input */
	--ct-input-color: inherit; /* Input text color */
	--ct-input-placeholder-color: rgba(0, 0, 0, 0.38); /* Placeholder color */
	--ct-input-background: transparent; /* Input background */
	--ct-input-height: 56px; /* Input height */
	--ct-input-padding: 0 12px; /* Input padding */
	--ct-input-font-size: 16px; /* Input font size */
	--ct-label-font-size: 12px; /* Label font size */
}
```

## Validation

The component includes built-in validation support:

```html
<ct-input label="Email" type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" errorMessage="Please enter a valid email address"></ct-input>
```

You can also validate programmatically:

```js
const input = document.querySelector('ct-input');
const isValid = input.validate();
```

## Accessibility (a11y)

The component supports proper focus states, keyboard navigation, and aria attributes for accessibility.

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
