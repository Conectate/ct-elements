import '../packages/ct-radio';

import { CtLit, css, customElement, html } from '../packages/ct-lit';

@customElement('demo-ct-radio')
export class DemoCtRadio extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	render() {
		return html`<ct-radio>Vas</ct-radio>
			<ct-radio checked><span>Vas</span></ct-radio>
			<ct-radio checked></ct-radio>
			<ct-radio name="form1">Vas</ct-radio>
			<ct-radio name="form1">Vas</ct-radio>`;
	}
}
