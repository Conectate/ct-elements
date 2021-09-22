/**
@license
Copyright (c) 2020 Herberth Obregón. All rights reserved.
This code may only be used under the BSD style license found at
https://wc.conectate.app/LICENSE.txt The complete set of authors may be found at
https://wc.conectate.app/AUTHORS.txt The complete set of contributors may be
found at https://wc.conectate.app/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
part of the Conectate Open Source Project is also subject to an additional IP rights grant
found at https://wc.conectate.app/PATENTS.txt
 */

import '@material/mwc-ripple';

import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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
| `--color-primary`          | Primary color        | `#00aeff`                                 |
| `--dark-primary-color`     | Dark Primary color   | `#00aeff`                                 |
| `--ct-button-box-shadow`   | Box-Shadow for hover | `0 2px 16px 4px rgba(99, 188, 240, 0.45)` |
| `--ct-button-shadow-color` | -                    | `rgba(64, 117, 187, 0.1)`                 |



 * @group ct-elements
 * @element ct-button
 * @demo demo/index.html 
 * @homepage wc.conectate.app
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
	static styles = [
		css`
			:host {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				overflow: hidden;
				position: relative;
				font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
				/* --color-primary: #2060df;
				--color-primary-hover: #19ace1;
				--color-primary-active: #169aca; */
				/* --color-primary-border: #b1c2ccb7; */
				/* --color-on-primary: #f5f8fe; */

				/* --color-surface: var(--color-surface, #fff); */
				/* --color-on-surface: #001c55; */

				--border: 1px solid currentColor;
				--radius: 26px;
				--menu-radius: 16px;
				--in-speed: 250ms;
				--out-speed: 250ms;

				background: #00aeff00;
				color: var(--color-primary, #00aeff);
				outline-color: var(--color-primary, #19ace1);
				border: 1px solid rgba(128, 128, 128, 0.31);
				border-radius: var(--radius);
				touch-action: manipulation;
				user-select: none;
				-webkit-tap-highlight-color: #0000;
				transition: all 0.2s ease-in-out;
			}

			:host([flat]) {
				color: inherit;
				border: none;
				--color-primary-hover: rgba(173, 195, 222, 0.1);
				--color-primary-active: rgba(173, 195, 222, 0.2);
			}

			:host([raised]) {
				background: var(--color-primary, #00aeff);
				color: #fff;
				border: none;
			}

			:host([shadow]) {
				background: var(--ct-button-shadow-color, rgba(173, 195, 222, 0.2));
				border: none;
			}

			:host([light]) {
				background: transparent;
				border: 1px solid var(--color-primary, #00aeff);
			}

			:host([hidden]) {
				display: none !important;
			}

			:host button {
				cursor: pointer;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background: none;
				border: none;
				display: inline-flex;
				align-items: center;
				gap: 1ch;
				white-space: nowrap;
				font-family: inherit;
				font-size: inherit;
				font-weight: 500;
				padding: 6px 16px;
				line-height: 1.75;
				color: inherit;
				outline-color: var(--color-primary);
				outline-offset: -5px;
				border-radius: var(--radius);
				transition: background 0.2s ease-in-out;
			}

			:host(:is(:hover, :focus-visible)) {
				background: var(--color-primary-hover);
				color: var(--color-on-primary);
			}
			:host button:active {
				background: var(--color-primary-active);
			}

			:host([raised]:hover) {
				box-shadow: var(--ct-button-box-shadow, 0 2px 16px 4px rgba(99, 188, 240, 0.45));
			}
		`
	];
	@property({ type: String, reflect: true }) role = 'button';
	@property({ type: Boolean, reflect: true }) disabled = false;
	render() {
		return html` <slot name="prefix"></slot>
			<button><slot></slot></button>
			<slot name="suffix"></slot>`;
	}
}

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'ct-button': CtButton;
		}
	}
	interface HTMLElementTagNameMap {
		'ct-button': any;
	}
}
