<h1 align="center">@conectate/ct-spinner</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/ct-spinner?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/ct-spinner.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/ct-spinner"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/ct-spinner.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
</p>

## `ct-spinner`
Spinner web component

## Usage
On HTML
```html
<!-- Active -->
<ct-spinner active="true"></ct-spinner>
<!-- Inactive -->
<ct-spinner active="false"></ct-spinner>
```
On `LitElement` with typescript
```typescript
import { LitElement, html, property, customElement, css } from "lit-element";

@customElement("ct-main")
export class CtMain extends LitElement {
	@property({ type: Boolean, reflect: true }) active = true;
	
    static styles = css`
		:host {
			display: block;
		}
	`;

	render() {
		return html`<ct-spinner></ct-spinner>`;
	}
}

```
### DEMO
<img src="https://github.com/Conectate/ct-elements/raw/master/images/images/packages/ct-spinner.png"/>

## Properties

| Property | Attribute | Type      | Default |
|----------|-----------|-----------|---------|
| `active` | `active`  | `boolean` | true    |

## CSS Custom Properties

| Property         | Description     |
|------------------|-----------------|
| `--ct-spinner-1` | Spinner Color 1 |
| `--ct-spinner-2` | Spinner Color 2 |