import '@conectate/ct-icon/ct-icon';

import { CtLit, css, customElement, html, property } from '@conectate/ct-lit';

/**
 * @element ct-list-item
 */
@customElement('ct-list-item')
export class CtListItem extends CtLit {
	static styles = [
		css`
			:host {
				border-radius: 8px;
				display: block;
				outline: none;
				padding: 8px;
				display: flex;
				flex-direction: row;
				align-items: center;
				cursor: pointer;
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

	@property({ type: String }) icon = '';
	@property({ type: String }) link = '';
	@property({ type: String }) name = '';

	render() {
		return html` <ct-icon .svg="${this.icon}"></ct-icon>
			<div class="name">${this.name}</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ct-list-item': CtListItem;
	}
}
