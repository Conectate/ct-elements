import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CtButton } from './ct-button';
/**
 * @element ct-button-split
 */
@customElement('ct-button-split')
export class CtButtonSplit extends LitElement {
	static CtButtonStyle = css`
		ct-button-split ct-button {
			border: none;
			padding-right: 6px;
			background: transparent;
			border-radius: var(--radius) 0 0 var(--radius);
			color: inherit;
			--color-primary-hover: transparent;
			--color-primary-active: transparent;
			--color-on-primary: transparent;
		}
	`;
	static styles = [
		CtButton.styles,
		css`
			:host {
				display: inline-flex;
				padding: 0;
			}
			::slotted(ct-button) {
				border: none;
				padding-right: 6px;
				background: transparent;
				border-radius: var(--radius) 0 0 var(--radius);
			}
			::slotted(ct-button-menu) {
				border-left: 1px solid #80808076;
				margin-right: 6px;
			}
			::slotted(ct-list-item) {
				min-width: 152px;
			}
		`
	];

	@property({ type: Boolean, reflect: true }) raised = false;
	@property({ type: Boolean, reflect: true }) shadow = false;
	@property({ type: Boolean, reflect: true }) flat = false;
	@property({ type: Boolean, reflect: true }) light = false;

	render() {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ct-button-split': CtButtonSplit;
	}
}
