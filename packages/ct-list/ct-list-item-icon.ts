import { CtLit, html } from '@conectate/ct-lit';
import '@conectate/ct-icon/ct-icon';

class CtListItemIcon extends CtLit {
	//https://web.whatsapp.com/send?phone=502595959
	//https://wa.me/502595995
	//tel:

	icon = '';
	link = '';
	name = '';

	render() {
		return html` <style>
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
			</style>
			<ct-icon .svg="${this.icon}"></ct-icon>
			<div class="name">${this.name}</div>`;
	}

	static get properties() {
		return {
			icon: { type: String },
			name: { type: String },
			link: { type: String }
		};
	}
}

window.customElements.define('ct-list-item-icon', CtListItemIcon);
