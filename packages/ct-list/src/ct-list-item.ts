import '@conectate/ct-icon/ct-icon';

import { icon } from '@conectate/ct-icon/icon-list';
import { CtLit, css, customElement, html, property, query } from '@conectate/ct-lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * @element ct-list-item
 */
@customElement('ct-list-item')
export class CtListItem extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				outline: none;
				display: flex;
				flex-direction: row;
				align-items: center;
				cursor: pointer;
			}

			:host(:focus-visible) {
				box-shadow: 0 0 0 1px var(--color-primary);
			}
			button {
				cursor: pointer;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background: none;
				border: none;
				display: inline-flex;
				align-items: center;
				white-space: nowrap;
				font-family: inherit;
				font-size: inherit;
				font-weight: 500;
				text-align: start;
				padding: 8px 16px;
				width: 100%;
				line-height: 1.75;
				color: inherit;
				outline-color: var(--color-primary);
				outline-offset: -5px;
				transition: background 0.2s ease-in-out;
			}
			:host(:hover) {
				background: #7c7c7c36;
			}
			:host(:hover) {
				background: #7c7c7c36;
			}
			.name {
				flex: 1;
				white-space: pre-wrap;
				word-wrap: break-word;
			}
			a {
				color: inherit;
			}
			ct-icon {
				margin-right: 8px;
			}
		`
	];

	@query('button') button!: HTMLButtonElement;
	@property({ type: String }) svg = '';
	@property({ type: String }) icon?: icon;
	@property({ type: String }) link = '';
	@property({ type: String }) text = '';

	render() {
		return html`<button>
			${this.icon || this.svg ? html`<ct-icon .svg="${this.svg}" icon="${ifDefined(this.icon)}"></ct-icon>` : ''}
			<div class="name">${this.text}</div>
		</button>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ct-list-item': CtListItem;
	}
}
