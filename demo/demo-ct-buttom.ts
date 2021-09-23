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
			ct-button-split,
			ct-button {
				margin: 8px;
			}
			.btns {
				display: flex;
				flex-wrap: wrap;
			}
		`
	];

	render() {
		return html` <div class="btns">
				<ct-button>Normal</ct-button>
				<ct-button shadow>shadow</ct-button>
				<ct-button raised>raised</ct-button>
				<ct-button light>light</ct-button>
				<ct-button flat>flat</ct-button>
				<ct-button gap><ct-icon icon="account_circle"></ct-icon>raised with ct-icon</ct-button>

				<ct-button><ct-icon slot="suffix" icon="account_circle"></ct-icon>raised with slot suffix ct-icon</ct-button>
			</div>
			<div><h4>V2</h4></div>

			<ct-button-split split><ct-icon icon="12mp"></ct-icon>View Cart</ct-button-split>

			<ct-button-split>Normal</ct-button-split>
			<ct-button-split raised>Raised</ct-button-split>
			<ct-button-split shadow>Shadow</ct-button-split>
			<ct-button-split light>light</ct-button-split>
			<br />
			<ct-button-split flat>Flat</ct-button-split>
			<ct-button-split class="btn" flat>Custom color</ct-button-split>
			<ct-button-split raised><ct-icon icon="account_circle"></ct-icon> Raised with ct-icon</ct-button-split>`;
	}
	firstUpdated() {
		this.shadowRoot?.querySelectorAll('ct-button').forEach((el) => {
			el.addEventListener('click', () => {
				console.log(el.innerHTML);
			});
		});
	}
}
