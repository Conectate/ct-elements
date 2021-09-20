import '../packages/ct-button';
import '../packages/ct-button/src/ct-button-split';

import { CtLit, css, customElement, html } from '../packages/ct-lit';

@customElement('demo-ct-buttom')
export class DemoCtButtom extends CtLit {
	static styles = [
		css`
			:host {
				display: flex;
				flex-wrap: wrap;
			}
			ct-button-split,
			ct-button {
				margin: 8px;
			}
			.btn {
				background: #ac2424;
			}
		`
	];

	render() {
		return html`<ct-button>Vas</ct-button> <ct-button-split split><ct-icon icon="12mp"></ct-icon>View Cart</ct-button-split>

			<ct-button-split>Normal</ct-button-split>
			<ct-button-split raised>Raised</ct-button-split>
			<ct-button-split shadow>Shadow</ct-button-split>
			<br />
			<ct-button-split flat>Flat</ct-button-split>
			<ct-button-split class="btn" flat>Custom color</ct-button-split>
			<ct-button-split raised><ct-icon icon="account_circle"></ct-icon> Raised with ct-icon</ct-button-split>`;
	}
	firstUpdated() {
		this.shadowRoot?.querySelectorAll('ct-button-split').forEach((el) => {
			el.addEventListener('click', () => {
				console.log(el.innerHTML);
			});
		});
	}
}
