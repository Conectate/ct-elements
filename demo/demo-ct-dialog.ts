import "@conectate/ct-button";
import "@conectate/ct-dialog/ct-loading.js";

import { showCtDialog } from "@conectate/ct-dialog/ct-dialog.js";
import { CtLit, css, customElement, html, state } from "@conectate/ct-lit";

@customElement("demo-ct-dialog")
export class DemoCtDialog extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	render() {
		return html`<header>
			<h1>Demo ct-dialog</h1>
			<ct-button @click=${() => this.openDialog()}>Open Dialog</ct-button>
		</header>`;
	}

	openDialog() {
		let element = new DemoCtDialogElement();
		element.name = "Demo Ct Dialog Element";
		element.dialog = showCtDialog(element);
		element.onSuccess = (e: { name: string }) => {
			console.log(e.name);
		};
	}
}

@customElement("demo-ct-dialog-element")
class DemoCtDialogElement extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				background-color: #fff;
				color: #000;
				padding: 16px;
				border-radius: 8px;
				box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
			}
			header {
				font-size: 1.5em;
				font-weight: bold;
				margin-bottom: 16px;
			}
		`
	];
	@state() name = "Demo Ct Dialog Element";
	public dialog!: HTMLElementTagNameMap["ct-dialog"];
	public onSuccess: ((e: { name: string }) => void) | null = null;

	render() {
		return html`<header>${this.name}</header>
			<main>Body</main>
			<footer>
				<ct-button @click=${() => this.closeDialog()}>Complete</ct-button>
			</footer> `;
	}

	async closeDialog() {
		await this.dialog.close();
		this.onSuccess?.({ name: this.name });
	}
}
