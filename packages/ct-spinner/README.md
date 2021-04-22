<h1 align="center">@conectate/ct-spinner</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/ct-spinner?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/ct-spinner.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/ct-spinner"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/ct-spinner.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
	<a href="https://www.webcomponents.org/element/conectate/ct-element"><img alt="Published on webcomponents.org" src="https://img.shields.io/badge/webcomponents.org-published-blue.svg" height="20"/></a>

</p>

## `ct-spinner`
Spinner web component

## Install
```bash
yarn add @conectate/ct-spinner
#or
npm i @conectate/ct-spinner
```

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
		return html`<ct-spinner></ct-spinner>`;
	}
}

```
### DEMO
<img src="https://raw.githubusercontent.com/Conectate/ct-elements/master/images/packages/ct-spinner.png"/>

<!--
```
<custom-element-demo>
  <template>
    <script type="module">
      import "https://unpkg.com/@conectate/ct-spinner?module";
    </script>
    <ct-spinner></ct-spinner>
  </template>
</custom-element-demo>
```
-->

```html
<ct-spinner></ct-spinner>
```

## Properties

| Property | Attribute | Type      | Default |
|----------|-----------|-----------|---------|
| `active` | `active`  | `boolean` | true    |

## CSS Custom Properties

| Property         | Description     |
|------------------|-----------------|
| `--ct-spinner-1` | Spinner Color 1 |
| `--ct-spinner-2` | Spinner Color 2 |