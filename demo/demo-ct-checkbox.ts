import '../packages/ct-checkbox';

import { CtLit, css, customElement, html } from '../packages/ct-lit';

@customElement('demo-ct-checkbox')
export class DemoCtCheckbox extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	render() {
		return html`<ct-checkbox>Vas</ct-checkbox> <ct-checkbox checked>Vas</ct-checkbox> <ct-checkbox indeterminate>Vas</ct-checkbox> <ct-checkbox disabled>Vas</ct-checkbox>`;
	}
}
