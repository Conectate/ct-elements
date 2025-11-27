import "@conectate/ct-card";
import "@conectate/ct-spinner";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/ct-lit";

@customElement("demo-ct-spinner")
export class DemoCtSpinner extends CtLit {
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
		`
	];
	name = "ct-spinner";
	render() {
		return html`
			<header class="card-content">
				<h1>&lt;/${this.name}&gt;</h1>
			</header>
			<main class="card-content">${this.example()}</main>
		`;
	}
	example() {
		return html`
			<code-example class="language-html">
				<div slot="demo">
					<ct-spinner></ct-spinner>
				</div>
			</code-example>
		`;
	}
}
