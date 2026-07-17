import "../src/ct-card";
import "../src/ct-icon";
import "../src/ct-icon-button";
import "../src/ct-list-item.js";
import "../src/ct-menu";
import "../src/ct-submenu";
import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "../src/ct-lit";

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
						<ct-submenu text="More" icon="folder">
							<ct-list-item icon="archive" text="Archive"></ct-list-item>
							<ct-list-item icon="delete" text="Delete"></ct-list-item>
							<ct-submenu text="Share" icon="share" showoutline>
								<ct-list-item text="Copy link"></ct-list-item>
								<ct-list-item text="Email"></ct-list-item>
							</ct-submenu>
							<ct-list-item icon="delete" text="Delete"></ct-list-item>
						</ct-submenu>
					</ct-menu>
				</div>
			</code-example>
		`;
	}
}
