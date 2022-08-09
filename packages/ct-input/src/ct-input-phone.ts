import './ct-input-container';

import { CtLit, customElement } from '@conectate/ct-lit';
import { css, html } from 'lit';

/**
 * @element ct-input-phone
 */
@customElement('ct-input-phone')
export class CtInputPhone extends CtLit {
	code?: number = 502;
	phone?: string = '';
	invalid: boolean = false;
	label: string = '';
	errorMessage: string = '';
	required: boolean = false;

	static styles = [
		css`
			:host {
				display: inline-flex;
				color: var(--color-on-surface, #535353);
			}

			*:focus {
				outline: 0;
			}
			ct-input-container {
				flex: 1;
			}

			input {
				display: inline-block;
				font: inherit;
				outline: none;
				box-shadow: none;
				border: none;
				width: auto;
				height: 3.3em;
				line-height: 3.3em;
				color: var(--color-on-surface, #535353);
				background: transparent;
			}

			#cd {
				min-width: 36px;
				text-align: center;
			}
			#phone {
				min-width: 140px;
				text-align: left;
				width: 100%;
			}
			.sep {
				font-size: 1.1em;
				min-width: 20px;
			}
			.horiz {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
		`
	];
	$!: {
		cd: HTMLInputElement;
		phone: HTMLInputElement;
	};
	render() {
		return html`
			<ct-input-container id="c" .invalid="${this.invalid}" .label="${this.label}" .errorMessage="${this.errorMessage}" ?required="${this.required}">
				<span class="horiz" slot="input">
					<span class="sep">( +</span>
					<input
						id="cd"
						.value="${`${(this.code ||= 502)}`}"
						@input="${() => (this.code = this.$.cd.valueAsNumber)}"
						maxlength="3"
						size="1"
						placeholder="XXX"
						type="tel"
						onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57"
					/>
					<span class="sep">)</span>
					<input
						id="phone"
						.value="${this.phone || ''}"
						@input="${() => (this.phone = this.$.phone.value)}"
						maxlength="17"
						size="15"
						pattern="[0-9]{5,}"
						placeholder="#### ####"
						type="tel"
						onkeypress="return (event.charCode >= 48 &amp;&amp; event.charCode <= 57) || event.charCode == 45 || event.charCode == 32"
					/>
				</span>
			</ct-input-container>
		`;
	}

	firstUpdated() {
		this.mapIDs();
	}

	updated(cp: Map<PropertyKey, unknown>) {
		super.update(cp);
		if (cp.has('code')) this.focusPhone(this.code);
	}

	static get properties() {
		return {
			required: { type: Boolean },
			label: { type: String },
			code: { type: Number },
			phone: { type: String },
			invalid: { type: Boolean }
		};
	}

	focusPhone(code?: number) {
		if (code && `${code}`.length == 3) {
			this.$.phone.focus();
		}
	}

	validate() {
		let code = this.code || 0,
			phone = this.phone || '';
		if (code > 0 && phone.trim().length > 4) {
			this.invalid = false;
		} else {
			this.invalid = true;
		}
		return !this.invalid;
	}
}
