import { LitElement, customElement, html, property } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

@customElement('ct-icon')
export class CtIcon extends LitElement {
	@property({ type: String }) svg: string = '';
	render() {
		return html`<style>
				:host {
					display: inline-flex;
					vertical-align: middle;
					width: 24px;
					height: 24px;
				}
				svg {
					width: 100%;
					height: 100%;
					fill: currentColor;
				}</style>${unsafeHTML(this.svg)}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ct-icon': CtIcon;
	}
}
