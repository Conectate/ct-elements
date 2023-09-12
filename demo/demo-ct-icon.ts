import "@conectate/ct-card";
import "@conectate/ct-icon/ct-icon-button.js";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/ct-lit";

@customElement("demo-ct-icon")
export class DemoCtIcon extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				max-width: 800px;
				margin: 0 auto;
			}
			.mini {
				--ct-icon-size: 16px;
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
	name = "ct-icon";
	render() {
		return html`
			<header class="card-content">
				<h1>&lt;/${this.name}&gt;</h1>
			</header>
			<main class="card-content">${this.example()}</main>
		`;
	}
	example() {
		return html` <code-example class="language-html">
			${`
            <ct-icon-button icon="power_off"></ct-icon-button>
			<ct-icon-button class="mini" icon="power_off"></ct-icon-button>`.replaceAll("\t", "    ")}
			<div slot="demo">
				<ct-icon-button icon="power_off"></ct-icon-button>
				<ct-icon-button class="mini" icon="power_off"></ct-icon-button>
			</div>
		</code-example>`;
	}
}
