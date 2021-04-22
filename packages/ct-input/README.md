<h1 align="center">@conectate/ct-input</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/ct-input?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/ct-input.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/ct-input"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/ct-input.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
	<a href="https://www.webcomponents.org/element/conectate/ct-element"><img alt="Published on webcomponents.org" src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" height="20"/></a>

</p>

## `ct-input`
Input web component


## Install
```bash
yarn add @conectate/ct-input
#or
npm i @conectate/ct-input
```

## Usage
On HTML
```html
<ct-input active="true"></ct-input>
```
On `LitElement` with typescript
```typescript
import { LitElement, html, property, customElement, css } from "lit";

@customElement("ct-main")
export class CtMain extends LitElement {
	@property({ type: Boolean, reflect: true }) active = true;
	
    static styles = css`
		:host {
			display: block;
		}
	`;

	render() {
		return html`<ct-input label="Name" placeholder="Put your name" rawPlaceholcer="John Doe"></ct-input>`;
	}
}

```
### DEMO
<img src="https://raw.githubusercontent.com/Conectate/ct-elements/master/images/packages/ct-input.png"/>

## Properties

| Property         | Attribute        | Type                                             | Default            | Description                                      |
|------------------|------------------|--------------------------------------------------|--------------------|--------------------------------------------------|
| `accept`         | `accept`         | `string`                                         | ""                 |                                                  |
| `autocomplete`   | `autocomplete`   | `"on" \| "off" \| "additional-name" \| "address-level1" \| "address-level2" \| "address-level3" \| "address-level4" \| "address-line1" \| "address-line2" \| "address-line3" \| "bday" \| ... 50 more ... \| "work"` | "off"              |                                                  |
| `autofocus`      | `autofocus`      | `boolean`                                        | false              |                                                  |
| `charCounter`    | `charCounter`    | `boolean`                                        | false              | -                                                |
| `countChar`      | `countChar`      | `number`                                         | 0                  | Total chars on input                             |
| `disabled`       | `disabled`       | `boolean`                                        | false              | -                                                |
| `errorMessage`   | `errorMessage`   | `string`                                         | ""                 | Mensaje de error al no complir con el pattern    |
| `inputmode`      | `inputmode`      | `"" \| "email" \| "tel" \| "url" \| "verbatim" \| "latin" \| "latin-name" \| "latin-prose" \| "full-width-latin" \| "kana" \| "kana-name" \| "katakana" \| "numeric"` | ""                 |                                                  |
| `invalid`        |                  | `boolean`                                        |                    |                                                  |
| `label`          | `label`          | `string`                                         | ""                 | Change default icon to whatever you like         |
| `max`            | `max`            | `string`                                         | ""                 |                                                  |
| `maxlength`      | `maxlength`      | `number`                                         | "MAX_SAFE_INTEGER" | Max length on input                              |
| `min`            | `min`            | `string`                                         | ""                 |                                                  |
| `minlength`      | `minlength`      | `number`                                         | 0                  |                                                  |
| `multiple`       | `multiple`       | `boolean`                                        | false              |                                                  |
| `name`           | `name`           | `string`                                         | ""                 |                                                  |
| `noHover`        | `noHover`        | `boolean`                                        | false              | Do not show any effects when hovering the searchbox |
| `pattern`        | `pattern`        | `string \| RegExp`                               | ""                 | regexp                                           |
| `placeholder`    | `placeholder`    | `string`                                         | ""                 | Placeholder text when searchbox is empty         |
| `raiseForced`    | `raiseForced`    | `boolean`                                        | false              | Always raise the searchbox whether it is active or not, or whether is has value or not |
| `raiseOnActive`  | `raiseOnActive`  | `boolean`                                        | false              | Raise searchbox is it's focused                  |
| `raiseOnValue`   | `raiseOnValue`   | `boolean`                                        | false              | Raise searchbox if it has value                  |
| `rawPlaceholder` | `rawPlaceholder` | `string`                                         | ""                 | Placeholder text when searchbox is empty         |
| `readonly`       | `readonly`       | `boolean`                                        | false              |                                                  |
| `required`       | `required`       | `boolean`                                        | false              | -                                                |
| `size`           | `size`           | `number`                                         | 24                 |                                                  |
| `step`           | `step`           | `string`                                         | ""                 |                                                  |
| `type`           | `type`           | `string`                                         | "text"             | Input type                                       |
| `value`          |                  | `string`                                         |                    |                                                  |

## Methods

| Method      | Type                                             | Description                                      |
|-------------|--------------------------------------------------|--------------------------------------------------|
| `mapIDs`    | `(): void`                                       | Map all IDs for shadowRoot and save in `this.$` like a polymer element.<br />You should add in the first line of `firstUpdated()` |
| `validate`  | `(): boolean`                                    | Validate required input                                                 |

## Slots

| Name     | Description                           |
|----------|---------------------------------------|
| `prefix` | Content placed start the main content |
| `suffix` | Content placed end the main content   |