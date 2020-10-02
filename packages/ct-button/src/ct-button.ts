/**
@license
Copyright (c) 2020 Herberth Obregón. All rights reserved.
This code may only be used under the BSD style license found at
http://wc.conectate.today/LICENSE.txt The complete set of authors may be found at
http://wc.conectate.today/AUTHORS.txt The complete set of contributors may be
found at http://wc.conectate.today/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
part of the Conectate Open Source Project is also subject to an additional IP rights grant
found at http://wc.conectate.today/PATENTS.txt
 */
import { LitElement, html, property, customElement } from 'lit-element';
import '@material/mwc-ripple';

/**
## Example usage

### Standard

<img src="images/standard.png" width="84px" height="48px">

```html
<ct-button value="value1"></ct-button>
<ct-button shadow value="value2"></ct-button>
<ct-button raised value="value3"></ct-button>
<ct-button flat value="value4"></ct-button>
<ct-button light value="value5"></ct-button>
<ct-button disabled value="value5"></ct-button>

<script type="module">
    import "@conectate/ct-button";
</script>
```

## API

### Slots

_None_

### Properties/Attributes

| Name       | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `raised`   | `boolean` | `false` | Raised Style (primary color)        |
| `shadow`   | `boolean` | `false` | Shown with opaque black background. |
| `flat`     | `boolean` | `false` | Shown with a primary color border   |
| `light`    | `boolean` | `false` | Shown with a primary color border   |
| `disabled` | `boolean` | `false` | If `true`, Disable clicks           |

### Methods

_None_

### Events

| Name    | Detail             | Description                                                                                             |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| `value` | `{value : string}` | Fired when the user modifies the ct-input `value` state from an input device interaction on this radio. |

### CSS Custom Properties

| Custom property            | Description          | Default                                   |
| -------------------------- | -------------------- | ----------------------------------------- |
| `--primary-color`          | Primary color        | `#00aeff`                                 |
| `--dark-primary-color`     | Dark Primary color   | `#00aeff`                                 |
| `--ct-button-box-shadow`   | Box-Shadow for hover | `0 2px 16px 4px rgba(99, 188, 240, 0.45)` |
| `--ct-button-shadow-color` | -                    | `rgba(64, 117, 187, 0.1)`                 |



 * @group Conectate Elements
 * @element ct-button
 * @demo demo/index.html 
 * @homepage wc.conectate.today
 * @slot prefix - Content placed above the main content
 * @slot - Default content placed in the middle
 * @slot suffix - Content placed below the main content
 * @attr {Boolean} disabled - Disable clicks
 * @attr {Boolean} raised - Raised Style (primary color)
 * @attr {Boolean} shadow - Shown with opaque black background.
 * @attr {Boolean} flat - Shown with a primary color border
 * @attr {Boolean} light - Shown with a primary color border
 */
@customElement('ct-button')
export class CtButton extends LitElement {
	@property({ type: String, reflect: true }) role = 'button';
	render() {
		return html`<style>
				:host {
					display: inline-flex;
					overflow: hidden;
					position: relative;
					font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
					padding: 0.6em 1.7em;
					border-radius: 26px;
					font-size: 1em;
					color: var(--primary-color, #00aeff);
					text-transform: none;
					transition: background-color 200ms, box-shadow 350ms;
					border: 1px solid rgba(128, 128, 128, 0.31);
					background-color: transparent;
					cursor: pointer;
					outline: none;
					font-weight: bold;
					box-sizing: border-box;
					min-width: 5.14em;
					min-height: 2em;
					margin: 0 0.29em;
					flex-direction: row;
					align-items: center; /* vertical */
					justify-content: center; /*horizonal*/
					text-align: center;
				}

				:host([flat]) {
					color: inherit;
					border: none;
				}

				:host([raised]) {
					background: var(--primary-color, #00aeff);
					color: #fff;
					border: none;
				}

				:host([shadow]) {
					background: var(--ct-button-shadow-color, rgba(173, 195, 222, 0.2));
					border: none;
				}

				:host([light]) {
					background: transparent;
					border: 1px solid var(--primary-color, #00aeff);
				}

				:host([hidden]) {
					display: none !important;
				}

				:host([disabled]) {
					background: none;
					color: #a8a8a8;
					cursor: not-allowed;
					pointer-events: none;
				}

				:host([raised]:hover) {
					box-shadow: var(--ct-button-box-shadow, 0 2px 16px 4px rgba(99, 188, 240, 0.45));
				}
				.ripple {
					position: absolute;
					top: 0px;
					left: 0px;
					width: 100%;
					height: 100%;
					pointer-events: none;
					visibility: 0;
				}
			</style>
			<slot name="prefix"></slot>
			<slot></slot>
			<slot name="suffix"></slot>
			<div style="position:absolute;top: 0;bottom: 0;left: 0;right: 0; opacity:0;">
				<div style="height:100%">
					<mwc-ripple primary></mwc-ripple>
					<slot></slot>
				</div>
			</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ct-button': CtButton;
	}
}