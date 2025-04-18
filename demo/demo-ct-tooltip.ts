import { css, CtLit, customElement, html } from "@conectate/ct-lit";
import '@conectate/ct-tooltip';
@customElement("demo-ct-tooltip")
export class DemoCtTooltip extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				max-width: 800px;
				margin: 0 auto;
			}
			header > h1 {
				margin-bottom: 0;
				font-family: monospace;
			}
		`,
		css`
			.group {
				display: inline-flex;
				padding: 8px;
				border: 1px solid #88888867;
				border-radius: var(--border-radius, 16px);
			}
		`
	];
	name = "ct-radio";
	render() {
		return html`
			<header class="card-content">
				<h1>&lt;/${this.name}&gt;</h1>
			</header>
			<main class="card-content">${this.example()}</main>
		`;
	}
	example() {
		return html` <code-example class="language-html" .codestyle=${DemoCtTooltip.styles[0].toString()}>
			${`
		<ct-radio>Normal</ct-radio>
		<ct-radio checked>Checked</ct-radio>
		<ct-radio checked></ct-radio>
		<div class="group">
			<ct-radio name="form1">Form 1 - Option 1</ct-radio>
			<ct-radio name="form1" checked>Form 1 - Option 2</ct-radio>
		</div>`.replaceAll("\t", "    ")}
			<span slot="demo">
				<h1><span >Tooltip</span></h1>
                <ct-tooltip for="span" >Este es un texto de ayuda</ct-tooltip>
			</span>
		</code-example>`;
	}
}

declare global {
    interface HTMLElementTagNameMap {
        "demo-ct-tooltip": DemoCtTooltip;
    }
}