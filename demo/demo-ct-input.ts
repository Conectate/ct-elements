import { css, CtLit, customElement, html } from '@conectate/ct-lit';

import '@conectate/ct-input';
import '@conectate/ct-input/ct-textarea';
@customElement('demo-ct-input')
export class DemoCtInput extends CtLit {
	static styles = [
		css`
			:host {
				display: flex;
				padding: 16px;
				border: 1px solid #ccc;
				border-radius: 4px;
			}
			ct-textarea {
				/* display: block; */
			}
		`
	];

	render() {
		return html`<ct-input id="i1" value="init"></ct-input> <ct-input id="i1" value="init" placeholder="como estas"></ct-input>
			<ct-input id="i2" .value=${`init value`}></ct-input>

			<ct-input id="i2" errorMessage="Este es un error" required></ct-input>
			<ct-textarea id="i2" errorMessage="Este es un error" rows="3" required></ct-textarea> `;
	}
}
