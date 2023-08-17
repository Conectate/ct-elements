import { css, CtLit, customElement, html, state } from '@conectate/ct-lit';

import '@conectate/ct-input/ct-input';
import '@conectate/ct-input/ct-textarea';
@customElement('demo-ct-input')
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
	@state() macs = ['00-00-00-00-00-00', 'BC-A9-93-73-74-A7', 'AA-AC-AE-73-00-01'];
	connectedCallback() {
		super.connectedCallback();
		// @ts-ignore
		window.test = this;
	}

	render() {
		return html`${this.macs.map(
				(m, i) => html`<ct-input label="Value ${i}: ${m}" .value=${m} @value=${(e: CustomEvent<{ value: string }>) => (this.macs[i] = e.detail.value)}>
					<slot slot="suffix"><span @click=${() => this.deleteItem(i)}>DEL</span></slot>
				</ct-input>`
			)}
			<span @click=${() => this.addItem()}>ADD</span>
			<hr />

			<ct-input id="i1" value="init"></ct-input> <ct-input id="i1" value="init" placeholder="como estas"></ct-input>

			<ct-input id="i2" .value=${`init value`}></ct-input>

			<ct-input id="i2" errorMessage="Este es un error" required></ct-input>
			<ct-textarea id="i2" errorMessage="Este es un error" rows="3" required></ct-textarea> `;
	}
	addItem() {
		this.macs.push('');
		this.macs = [...this.macs];
	}
	deleteItem(i: number) {
		this.macs.splice(i, 1);
		this.macs = [...this.macs];
	}
}
