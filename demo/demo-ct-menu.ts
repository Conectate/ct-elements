import "@conectate/components/ct-card";
import "@conectate/components/ct-icon";
import "@conectate/components/ct-list/ct-list-item.js";
import "@conectate/components/ct-menu";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";

@customElement("demo-ct-menu")
export class DemoCtMenu extends CtLit {
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
	name = "ct-menu";
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
					<ct-menu>
						<ct-icon-button icon="more_vert" slot="trigger"></ct-icon-button>
						<ct-list-item icon="settings" text="Settings"></ct-list-item>
						<ct-list-item icon="home" text="Home" href="/home"></ct-list-item>
					</ct-menu>
				</div>
			</code-example>
		`;
	}
}
