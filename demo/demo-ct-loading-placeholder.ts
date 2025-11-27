import "@conectate/ct-card";
import "@conectate/ct-loading-placeholder";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/ct-lit";

@customElement("demo-ct-loading-placeholder")
export class DemoCtLoadingPlaceholder extends CtLit {
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
			ct-loading-placeholder {
				width: 200px;
				height: 200px;
			}
		`
	];
	name = "ct-loading-placeholder";
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
					<ct-loading-placeholder></ct-loading-placeholder>
				</div>
			</code-example>
		`;
	}
}
