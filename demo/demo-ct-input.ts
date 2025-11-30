import "@conectate/ct-dialog/ct-promp.js";
import "@conectate/ct-input";
import "@conectate/ct-input/ct-textarea.js";

import { CtLit, css, customElement, html, query, state } from "@conectate/ct-lit";

@customElement("demo-ct-input")
export class DemoCtInput extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				margin: 0 auto;
				padding: 16px;
				border: 1px solid #ccc;
				border-radius: 4px;
				max-width: 600px;
			}
			ct-input {
				display: flex;
			}
		`
	];
	@state() macs = ["00-00-00-00-00-00", "BC-A9-93-73-74-A7", "AA-AC-AE-73-00-01"];
	@state() valueFromEvent = "";
	@query("#i1") i1?: HTMLElementTagNameMap["ct-input"];
	connectedCallback() {
		super.connectedCallback();
		// @ts-ignore
		window.test = this;
	}

	render() {
		return html`${this.macs.map(
				(m, i) =>
					html`<ct-input label="Value ${i}: ${m}" .value=${m} @value=${(e: CustomEvent<{ value: string }>) => (this.macs[i] = e.detail.value)}>
						<slot slot="suffix"><span @click=${() => this.deleteItem(i)}>DEL</span></slot>
					</ct-input>`
			)}
			<span @click=${() => this.addItem()}>ADD</span>
			<hr />

			<ct-input id="i1" @value=${this.handleValue}></ct-input>
			<ct-input id="i1" value="Init html raw attribute" placeholder="como estas"></ct-input>
			<ct-input id="i2" .value=${`Init value property`}></ct-input>
			${this.valueFromEvent ? html`<span>Value from event: ${this.valueFromEvent}</span>` : html``}

			<ct-input id="i2" errorMessage="Este es un error" required></ct-input>
			<ct-textarea id="i2" errorMessage="Este es un error" rows="3" required></ct-textarea>
			<ct-textarea id="i2" errorMessage="Este es un error" rows="3" required>
				<span slot="suffix">Suffix</span>
				<span slot="prefix">Prefix</span>
			</ct-textarea> `;
	}
	firstUpdated() {
		setTimeout(() => {
			this.i1!.value = "Init value JS";
		}, 1000);
	}
	handleValue(e: CustomEvent<string>) {
		this.valueFromEvent = e.detail;
	}
	addItem() {
		this.macs.push("");
		this.macs = [...this.macs];
	}
	deleteItem(i: number) {
		this.macs.splice(i, 1);
		this.macs = [...this.macs];
	}
}
