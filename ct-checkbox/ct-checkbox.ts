import { css, CtLit, customElement, html, property } from '@conectate/ct-lit';
import {getClient} from '@conectate/ct-helpers/ct-helpers';
import '@material/mwc-checkbox';
import { Checkbox } from '@material/mwc-checkbox';
// @ts-ignore HACK: temporary patch to fix a safari issue
Checkbox.prototype.createRenderRoot = function (): ShadowRoot {
    // tslint:disable-next-line:no-invalid-this
    return this.attachShadow({ mode: 'open', delegatesFocus: false });
};

@customElement('ct-checkbox')
export class CtCheckbox extends CtLit {
	_checked = false;
	@property({ type: Boolean }) indeterminate = false;
	@property({ type: Boolean }) disabled = false;
	@property({ type: Object }) value: any;
	static styles = [css`
		:host {
			display: inline-block;
		}
		.c {
			display: flex;
			flex-direction: row;
			align-items: center;
		}
		input{
			zoom: 1.5;
			margin-right: 8px;
		}
	`];

	render() {
		return html`
			<div class="c">
				<mwc-checkbox
					id="in"
					@change=${this.change}
					?checked=${this.checked}
					?indeterminate=${this.indeterminate}
					?disabled=${this.disabled}
					@checked=${(e: Event) => e.stopPropagation()}
				></mwc-checkbox>
				
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
