import "@conectate/components/ct-card";
import "@conectate/components/ct-snackbar";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";
import { showSnackBar } from "@conectate/components/ct-snackbar";

@customElement("demo-ct-snackbar")
export class DemoCtSnackbar extends CtLit {
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
	name = "ct-snackbar";
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
					<ct-card>
						<div class="card-content">
							<ct-button @click=${() => showSnackBar("Hello World")}>Show Snackbar</ct-button>
						</div>
					</ct-card>
				</div>
			</code-example>
		`;
	}
}
