import "@conectate/components/ct-card";
import "@conectate/components/ct-icon/ct-icon-button.js";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";

@customElement("demo-ct-icon")
export class DemoCtIcon extends CtLit {
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
	name = "ct-icon";
	render() {
		return html`
			<header class="card-content">
				<h1>&lt;/${this.name}&gt;</h1>
			</header>
			<main class="card-content">${this.example()}</main>
		`;
	}
	example() {
		return html` <code-example class="language-html">
			<div slot="demo">
				<ct-icon-button icon="power_off"></ct-icon-button>
				<ct-icon-button icon="power_off" style="--ct-icon-size: 16px;"></ct-icon-button>
				<ct-icon>
					<svg xmlns="http:/www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 512 512">
						<radialGradient id="a" cx="-37.129" cy="650.866" r="32" gradientTransform="matrix(16.1326 5.4553 43.7005 -129.2322 -27793.309 84523.438)" gradientUnits="userSpaceOnUse">
							<stop offset=".067" style="stop-color:#9168c0" />
							<stop offset=".343" style="stop-color:#5684d1" />
							<stop offset=".672" style="stop-color:#1ba1e3" />
						</radialGradient>
						<path
							d="M512 256.5c-137.5 8.4-247.1 118-255.5 255.5h-1C247.1 374.5 137.5 264.9 0 256.5v-1c137.5-8.4 247.1-118 255.5-255.5h1c8.4 137.5 118 247.1 255.5 255.5z"
							style="fill:url(#a)"
						/>
					</svg>
				</ct-icon>
				<ct-icon-button>
					<svg slot="icon" xmlns="http:/www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 512 512">
						<radialGradient id="a" cx="-37.129" cy="650.866" r="32" gradientTransform="matrix(16.1326 5.4553 43.7005 -129.2322 -27793.309 84523.438)" gradientUnits="userSpaceOnUse">
							<stop offset=".067" style="stop-color:#9168c0" />
							<stop offset=".343" style="stop-color:#5684d1" />
							<stop offset=".672" style="stop-color:#1ba1e3" />
						</radialGradient>
						<path
							d="M512 256.5c-137.5 8.4-247.1 118-255.5 255.5h-1C247.1 374.5 137.5 264.9 0 256.5v-1c137.5-8.4 247.1-118 255.5-255.5h1c8.4 137.5 118 247.1 255.5 255.5z"
							style="fill:url(#a)"
						/>
					</svg>
				</ct-icon-button>
			</div>
		</code-example>`;
	}
}
