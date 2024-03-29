import { CtLit, css, customElement } from "@conectate/ct-lit";
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

		@keyframes placeHolderShimmer {
			0% {
				background-position: -700px 0;
			}
			100% {
				background-position: +700px 0;
			}
		}
	`;
	render() {
		return html``;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-loading-placeholder": CtLoadingPlaceholder;
	}
}
