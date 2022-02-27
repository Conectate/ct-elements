import { CtLit, css, customElement, html, query } from '@conectate/ct-lit';

@customElement('demo-ct-dialog')
export class DemoCtDialog extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	render() {
		return html`<header>
			<h1>Demo ct-dialog</h1>
		</header>`;
	}
}
