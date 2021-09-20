import '../packages/ct-radio';
import '../packages/ct-card';
import './code-example/code-example';

import { CtLit, css, customElement, html } from '../packages/ct-lit';

@customElement('demo-ct-radio')
export class DemoCtRadio extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				max-width: 800px;
				margin: 0 auto;
			}
			header > h1 {
				margin-bottom: 0;
			}
			ct-card {
				margin: 16px 24px;
			}
		`,
		css`
			.group {
				display: inline-flex;
				padding: 8px;
				border: 1px solid #88888867;
				border-radius: 16px;
			}
		`
	];
	render() {
		return html`
			<ct-card shadow>
				<header class="card-content">
					<h1>&lt;/ct-radio&gt;</h1>
				</header>
				<main class="card-content">${this.example()}</main>
			</ct-card>
		`;
	}
	example() {
		return html` <code-example
			class="language-html"
			.codestyle=${DemoCtRadio.styles[1].toString()}
			.code=${`
		<ct-radio>Normal</ct-radio>
		<ct-radio checked>Checked</ct-radio>
		<ct-radio checked></ct-radio>
		<div class="group">
			<ct-radio .checked=\${this.checked} name="form1">Form 1 - Option 1</ct-radio>
			<ct-radio name="form1">Form 1 - Option 2</ct-radio>
		</div>`}
		>
			<div slot="demo">
				<ct-radio>Normal</ct-radio>
				<ct-radio checked>Checked</ct-radio>
				<ct-radio checked></ct-radio>
				<div class="group">
					<ct-radio name="form1">Form 1 - Option 1</ct-radio>
					<ct-radio name="form1">Form 1 - Option 2</ct-radio>
				</div>
			</div>
		</code-example>`;
	}
}
