import "@conectate/ct-card";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/ct-lit";

@customElement("demo-ct-card")
export class DemoCtCard extends CtLit {
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
			ct-card {
				margin-bottom: 1rem;
			}
		`
	];
	name = "ct-card";
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
					<ct-card>Basic card</ct-card>
					<ct-card decorator> <div class="card-content">Card with decorator</div></ct-card>
					<ct-card withborder> <div class="card-content">Card with border</div></ct-card>
					<ct-card padding> Card with padding</ct-card>
					<ct-card primary> <div class="card-content">Primary themed card</div></ct-card>
					<ct-card secondary> <div class="card-content">Secondary themed card</div></ct-card>
					<ct-card tertiary> <div class="card-content">Tertiary themed card</div></ct-card>
					<ct-card error> <div class="card-content">Error themed card</div></ct-card>
				</div>
			</code-example>
		`;
	}
}
