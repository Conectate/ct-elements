import "@conectate/components/ct-card";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html, state } from "@conectate/components/ct-lit";
import { writeQR } from "@conectate/components/ct-qr-tools";

@customElement("demo-ct-qr-tools")
export class DemoCtQrTools extends CtLit {
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
			canvas {
				width: 256px;
				height: 256px;
			}
		`
	];
	name = "ct-qr-tools";
	@state() text = "https:/google.com";
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
							<ct-input .value=${this.text} @value=${(e: any) => (this.text = e.detail.value)} label="QR Text"></ct-input>
							<canvas id="canvas"></canvas>
						</div>
					</ct-card>
				</div>
			</code-example>
		`;
	}

	async updated(changedProperties: Map<string | number | symbol, unknown>) {
		super.updated(changedProperties);
		let qr = await writeQR();
		let canvas = this.shadowRoot?.querySelector("#canvas");
		if (canvas) {
			qr.toCanvas(canvas, this.text, err => {
				if (err) console.error(err);
			});
		}
	}
}
