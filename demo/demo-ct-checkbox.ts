import "@conectate/components/ct-checkbox";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";

@customElement("demo-ct-checkbox")
export class DemoCtCheckbox extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				--ct-checkbox-box-size: 18px;
			}
		`
	];

	render() {
		return html`<div><ct-checkbox>Checkbox Example</ct-checkbox></div>
			<div><ct-checkbox checked>Checked Example</ct-checkbox></div>
			<div><ct-checkbox indeterminate>Indeterminate Example</ct-checkbox></div>
			<div><ct-checkbox disabled>Disabled Example</ct-checkbox></div> `;
	}
}
