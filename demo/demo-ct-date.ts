import "@conectate/ct-card";
import "@conectate/ct-date";

import "./code-example/code-example";

import { CtLit, css, customElement, html } from "@conectate/ct-lit";

@customElement("demo-ct-date")
export class DemoCtDate extends CtLit {
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
	name = "ct-date";
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
			${``.replaceAll("\t", "    ")}
			<div slot="demo">
				<ct-date label="date"></ct-date>
			</div>
		</code-example>`;
	}
}
