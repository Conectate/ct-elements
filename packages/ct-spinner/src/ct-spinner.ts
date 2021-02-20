import { LitElement, html, property, customElement, css } from "lit-element";

/**
 * ## `ct-spinner`
 * Spinner web Component
 *
 * @group ct-elements
 * @element ct-spinner
 * @cssProp --ct-spinner-1 - Spinner Color 1
 * @cssProp --ct-spinner-2 - Spinner Color 2
 */
@customElement("ct-spinner")
export class CtSpinner extends LitElement {
	@property({ type: Boolean, reflect: true }) active: boolean = true;
	static styles = css`
		:host([active]) {
			display: inline-flex;
			border: 4px solid #7e7e7e1c;
			width: 36px;
			height: 36px;
			border-radius: 50%;
			border-left-color: var(--ct-spinner-1, var(--color-primary, #2cb5e8));
			animation: spin 1s ease infinite;
		}
		@keyframes spin {
			0% {
				transform: rotate(0);
				border-left-color: var(--ct-spinner-1, var(--color-primary, #2cb5e8));
			}
			50% {
				transform: rotate(180deg);
				border-left-color: var(--ct-spinner-2, var(--color-secondary, #0fb8ad));
			}
			100% {
				transform: rotate(360deg);
				border-left-color: var(--ct-spinner-1, var(--color-primary, #2cb5e8));
			}
		}
	`;

	render() {
		return html``;
	}
}
