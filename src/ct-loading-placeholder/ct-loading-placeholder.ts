import { CtLit, css, customElement, property } from "../ct-lit/ct-lit.js";
import { html } from "lit";

/**
`loading-placeholder` is a simple element to use skeleton loading such as Facebook.

### Example

<loading-placeholder style="width:200px;height:200px;"></loading-placeholder>


### Styling

Custom property | Description | Default
----------------|-------------|---------
`--loading-placeholder-color-1` | Primary color for animation | `#E0E0E0`
`--loading-placeholder-color-2` | Secondary color for animation | `#C0C0C0`

 * @element ct-loading-placeholder
 */
@customElement("ct-loading-placeholder")
export class CtLoadingPlaceholder extends CtLit {
	static styles = css`
		:host {
			display: flex;
			width: 100%;
			height: 100%;
			animation-duration: 1s;
			animation-fill-mode: forwards;
			animation-iteration-count: infinite;
			animation-name: placeHolderShimmer;
			animation-timing-function: linear;
			background: var(--loading-placeholder-color-1, #e0e0e0);
			background: linear-gradient(
				to right,
				var(--loading-placeholder-color-1, #e0e0e0) 8%,
				var(--loading-placeholder-color-2, #c0c0c0) 18%,
				var(--loading-placeholder-color-1, #e0e0e0) 33%
			);
			background-size: 1400px 140px;
		}
		:host([buffering]) {
			-webkit-animation: b 2s linear infinite;
			animation: b 2s linear infinite;
			background: -webkit-linear-gradient(
				135deg,
				hsla(0, 0%, 100%, 0.4) 25%,
				transparent 0,
				transparent 50%,
				hsla(0, 0%, 100%, 0.4) 0,
				hsla(0, 0%, 100%, 0.4) 75%,
				transparent 0,
				transparent
			);
			background: linear-gradient(
				-45deg,
				hsla(0, 0%, 100%, 0.4) 25%,
				transparent 0,
				transparent 50%,
				hsla(0, 0%, 100%, 0.4) 0,
				hsla(0, 0%, 100%, 0.4) 75%,
				transparent 0,
				transparent
			);
			background-size: 15px 15px;
			width: 100%;
		}

		@keyframes placeHolderShimmer {
			0% {
				background-position: -700px 0;
			}
			100% {
				background-position: +700px 0;
			}
		}
	`;
	@property({ type: Boolean, reflect: true }) buffering = false;
	render() {
		return html``;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-loading-placeholder": CtLoadingPlaceholder;
	}
}
