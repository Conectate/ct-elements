import "@conectate/components/ct-card";
import "@conectate/components/ct-list/ct-list-item.js";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";

@customElement("demo-ct-list")
export class DemoCtList extends CtLit {
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
	name = "ct-list";
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
						<ct-list-item text="Settings"></ct-list-item>
						<ct-list-item icon="settings" text="Settings"></ct-list-item>
						<ct-list-item icon="home" text="Home" href="/home"></ct-list-item>
						<ct-list-item>
							<span slot="prefix">🔔</span>
							Custom content here
							<span slot="suffix">3</span>
						</ct-list-item>
					</ct-card>
				</div>
			</code-example>
		`;
	}
}
