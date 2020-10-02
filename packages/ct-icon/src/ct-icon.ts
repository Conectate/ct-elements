import { CtLit, customElement, html, property, unsafeHTML } from '@conectate/ct-lit';

@customElement('ct-icon')
export class CtIcon extends CtLit {
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
