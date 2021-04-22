import '../packages/ct-select/src/ct-select';

import { CtLit, css, customElement, html, property } from '@conectate/ct-lit';

@customElement('main-element')
export class MainElement extends CtLit {
	static styles = css`
		:host {
			display: block;
		}
	`;
	data = { hola: { como: { estas: 1 } } };

	render() {
		return html`<ct-select
			multi
			.items=${[
				{ text: '1', value: 1 },
				{ text: '2', value: 2 },
				{ text: '3', value: 3 }
			]}
		></ct-select>`;
	}
}
