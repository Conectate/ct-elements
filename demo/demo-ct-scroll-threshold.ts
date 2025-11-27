import "@conectate/ct-card";
import "@conectate/ct-scroll-threshold";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html, state } from "@conectate/ct-lit";

@customElement("demo-ct-scroll-threshold")
export class DemoCtScrollThreshold extends CtLit {
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
			#scroll {
				height: 250px;
				overflow-y: auto;
			}
		`
	];
	name = "ct-scroll-threshold";
	@state() items = Array.from(Array(20).keys());
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
						<div class="card-content" id="scroll">
							${this.items.map(i => html`<div>Item ${i}</div>`)}
							<ct-scroll-threshold @lower-threshold=${() => this.loadMore()} .scrollTarget=${this.shadowRoot?.querySelector("#scroll") as HTMLElement}></ct-scroll-threshold>
						</div>
					</ct-card>
				</div>
			</code-example>
		`;
	}
	loadMore() {
		this.items = [...this.items, ...Array.from(Array(20).keys())];
	}
}
