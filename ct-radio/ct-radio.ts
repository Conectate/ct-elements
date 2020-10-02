import '@material/mwc-radio';

import { getClient } from '@conectate/ct-helpers/ct-helpers';
import { CtLit, css, customElement, html, property } from '@conectate/ct-lit';
import { Radio } from '@material/mwc-radio';
import { CSSResult } from 'lit-element';

// @ts-ignore HACK: temporary patch to fix a safari issue
Radio.prototype.createRenderRoot = function (): ShadowRoot {
	// tslint:disable-next-line:no-invalid-this
	return this.attachShadow({ mode: 'open', delegatesFocus: false });
};

@customElement('ct-radio')
export class CtRadio extends CtLit {
	_checked = false;
	@property({ type: String }) name = '';
	@property({ type: Object }) value?: any;
	@property({ type: Boolean }) disabled = false;
	static styles: CSSResult[] = [
		css`
			:host {
				display: inline-block;
			}
			.c {
				display: flex;
				flex-direction: row;
				align-items: center;
			}

			input {
				zoom: 1.5;
				margin: 8px;
			}
		`
	];
	render() {
		return html`
			<div class="c">
				<mwc-radio id="in" @change=${this.change} ?checked=${this.checked} ?disabled=${this.disabled} .name=${this.name} @checked=${(e: Event) => e.stopPropagation()}></mwc-radio>
				<span><slot></slot></span>
			</div>
		`;
	}

	firstUpdated() {
		this.mapIDs();
	}

	clic() {
		this.$.in.click();
	}

	set checked(checked) {
		if (checked != this._checked) {
			let old = this._checked;
			this._checked = checked;
			this.requestUpdate('checked', old);
			// @ts-ignore
			let radios: CtRadio[] = this.parentElement?.querySelectorAll('ct-radio') || [];
			for (let radio of radios) {
				if (radio.name == this.name && radio != this && checked) {
					radio.checked = false;
				}
			}
			this.dispatchEvent(new CustomEvent('checked', { detail: { checked: checked } }));
		}
	}

	get checked() {
		return this._checked;
	}

	static get properties() {
		return {
			checked: { type: Boolean }
		};
	}

	change() {
		this.checked = this.$.in.checked;
	}
}
