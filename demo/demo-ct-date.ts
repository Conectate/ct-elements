import "@conectate/components/ct-card";
import "@conectate/components/ct-date";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";

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
				<ct-date label="date" @value=${this.changeDate}></ct-date>
				<ct-date label="date" showhour @value=${this.changeDate}></ct-date>
			</div>
		</code-example>`;
	}

	changeDate(e: CustomEvent) {
		console.log(e.detail);
	}
}
