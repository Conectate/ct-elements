import "@conectate/components/ct-card";
import "@conectate/components/ct-router";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html } from "@conectate/components/ct-lit";
import { CtRouter } from "@conectate/components/ct-router";

@customElement("demo-ct-router")
export class DemoCtRouter extends CtLit {
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
	name = "ct-router";
	render() {
		return html`
			<header class="card-content">
				<h1>&lt;/${this.name}&gt;</h1>
			</header>
			<main class="card-content">${this.example()}</main>
		`;
	}
	example() {
		let router: CtRouter = new CtRouter();
		router.pages = [
			{ path: "/", element: html`<h1>Home</h1>`, auth: false, title: () => "Home" },
			{ path: "/profile/:profile", element: html`<h1>Profile</h1>`, auth: false, title: () => "Profile" },
			{ path: "/404", element: html`<h1>404</h1>`, auth: false, title: () => "404" }
		];
		return html`
			<code-example class="language-html">
				<div slot="demo">
					<ct-card>
						<div class="card-content">
							<ct-button @click=${() => router.handleRoutes(new URL(location.origin + "/"))}>Home</ct-button>
							<ct-button @click=${() => router.handleRoutes(new URL(location.origin + "/profile/juan"))}>Profile</ct-button>
							<ct-button @click=${() => router.handleRoutes(new URL(location.origin + "/unknown"))}>404</ct-button>
						</div>
						<div class="card-content">${router}</div>
					</ct-card>
				</div>
			</code-example>
		`;
	}
}
