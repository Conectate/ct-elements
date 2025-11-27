import "@conectate/ct-card";
import "@conectate/ct-collapse";

import "./code-example/code-example.js";

import { CtCollapse } from "@conectate/ct-collapse";
import { CtLit, css, customElement, html, query } from "@conectate/ct-lit";

@customElement("demo-ct-collapse")
export class DemoCtCollapse extends CtLit {
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
	name = "ct-collapse";
	@query("ct-collapse") $collapse!: CtCollapse;
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
			<ct-card>
				<div class="card-content">
					<ct-button @click=${() => this.$collapse.toggle()}>Toggle</ct-button>
					<ct-collapse>
						<div>
							<h1>Hello World</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
								pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</ct-collapse>
				</div>
			</ct-card>
		`;
	}
}
