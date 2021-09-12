import '../packages/ct-button';
import '../packages/ct-button/src/ct-button-split';

import { CtLit, css, customElement, html } from '../packages/ct-lit';

@customElement('demo-ct-buttom')
export class DemoCtButtom extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	render() {
		return html`<ct-button>Vas</ct-button> <ct-button-split split><ct-icon icon="12mp"></ct-icon>View Cart</ct-button-split>

			<ct-button-split>hola mundo</ct-button-split>`;
	}
}
