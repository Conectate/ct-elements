import "./ct-icon.js";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { icon } from "./icon-list.js";

/**
## `ct-icon-button`

## Example

```html
<ct-icon-button icon="headphones"></ct-icon-button>
```

 *  @element ct-icon-button
 */
@customElement("ct-icon-button")
export class CtIconButton extends LitElement {
	static styles = css`
		:host {
			display: inline-flex;
			border-radius: 50%;
			outline: none;
			-webkit-tap-highlight-color: transparent;
		}
		:host(:hover) {
			background: #7c7c7c0d;
		}
		:host(:active) {
			background: #7c7c7c2a;
		}

		:host([disabled]) {
			pointer-events: none;
		}
		button {
			line-height: 0px;
			vertical-align: top;
			display: inline-flex;
			position: relative;
			box-sizing: border-box;
			border: none;
			outline: none;
			background-color: transparent;
			fill: currentcolor;
			color: inherit;
			text-decoration: none;
			cursor: pointer;
			user-select: none;
			padding: calc((var(--ct-icon-size, 24px) * 2 - var(--ct-icon-size, 24px)) / 2);
		}
	`;
	@property({ type: Boolean, reflect: true }) disabled = false;

	@property({ type: String }) icon?: icon;
	@property({ type: String }) svg?: string;

	@property({ type: String, attribute: "aria-label" })
	ariaLabel: string = "";

	render() {
		return html`<button aria-label="${ifDefined(this.ariaLabel || this.icon)}" ?disabled="${this.disabled}">
			<ct-icon .icon=${this.icon} .svg=${this.svg}></ct-icon>
			<span><slot></slot></span>
		</button>`;
	}
}
