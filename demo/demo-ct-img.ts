import "@conectate/components/ct-card";
import "@conectate/components/ct-img";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";

@customElement("demo-ct-img")
export class DemoCtImg extends CtLit {
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
			ct-img {
				width: 150px;
				height: 150px;
				margin: 0.5rem;
			}
		`
	];
	name = "ct-img";
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
					<ct-img src="https:/picsum.photos/300/200" alt="Description"></ct-img>
					<ct-img srcset="https:/picsum.photos/300/200" lazy alt="Description"></ct-img>
					<ct-img src="https:/picsum.photos/300/200" placeholderImg="https:/picsum.photos/200/200" alt="Description"></ct-img>
					<ct-img src="https:/picsum.photos/300/200" round alt="Profile picture"></ct-img>
					<ct-img src="https:/picsum.photos/300/200" contain alt="Large image"></ct-img>
				</div>
			</code-example>
		`;
	}
}
