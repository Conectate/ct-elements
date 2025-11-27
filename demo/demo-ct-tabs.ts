import "@conectate/ct-card";
import "@conectate/ct-tabs";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/ct-lit";

@customElement("demo-ct-tabs")
export class DemoCtTabs extends CtLit {
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
	name = "ct-tabs";
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
					<ct-tabs selected="0" handletabs>
						<ct-tab>Tab 1</ct-tab>
						<ct-tab>Tab 2</ct-tab>
						<ct-tab>Tab 3</ct-tab>
					</ct-tabs>
				</div>
			</code-example>
		`;
	}
}
