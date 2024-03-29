import "@conectate/ct-input/ct-input-container";

import { CtLit, html, query } from "@conectate/ct-lit";

class CtPhoneInput extends CtLit {
	code: string = "502";
	phone: string = "";
	invalid: boolean = false;
	label: string = "";
	errorMessage: string = "";
	required: boolean = false;
	value!: string | null;
	@query("#cd") $cd!: HTMLInputElement;
	@query("#phoneInput") $phoneInput!: HTMLInputElement;

	render() {
		return html`
			<style>
				:host {
					display: block;
					color: var(--color-on-surface, #535353);
				}

				*:focus {
					outline: 0;
				}

				input {
					display: inline-block;
					font: inherit;
					outline: none;
					box-shadow: none;
					border: none;
					width: auto;
					height: var(--ct-input-height, 3.3em);
					line-height: var(--ct-input-height, 3.3em);
					color: var(--color-on-surface, #535353);
				}

				.sep {
					font-size: 1.1em;
					min-width: 20px;
				}
				#cd {
					min-width: 36px;
					text-align: center;
					background: transparent;
				}
				#phoneInput {
					min-width: 140px;
					text-align: left;
					width: 100%;
					background: transparent;
				}

				.horiz {
					display: flex;
					flex-direction: row;
					align-items: center;
				}

				#c {
					width: 100%;
				}
			</style>
			<ct-input-container id="c" .invalid="${this.invalid}" .label="${this.label}" .errorMessage="${this.errorMessage}" ?required="${this.required}">
				<span class="horiz" slot="input">
					<span class="sep">( +</span>
					<input
						id="cd"
						.value="${this.code}"
						@input="${() => (this.code = this.$cd.value)}"
						maxlength="3"
						size="1"
						placeholder="XXX"
						type="tel"
						onkeypress="return event.charCode >= 48 &amp;&amp; event.charCode <= 57"
					/>
					<span class="sep">)</span>
					<input
						id="phoneInput"
						.value="${this.phone}"
						@input="${() => (this.phone = this.$phoneInput.value)}"
						maxlength="17"
						size="15"
						placeholder="XXXX XXXX"
						type="tel"
						onkeypress="return (event.charCode >= 48 &amp;&amp; event.charCode <= 57) || event.charCode == 45 || event.charCode == 32"
					/>
				</span>
			</ct-input-container>
		`;
	}

	updated(cp: Map<PropertyKey, unknown>) {
		super.update(cp);
		if (cp.has("value")) this.value && this.updateValue(this.value);
		if (cp.has("code")) this.focusPhone(this.code);
		if (cp.has("code") || cp.has("phone")) this._computeValue(this.code, this.phone);
	}

	static get properties() {
		return {
			required: { type: Boolean },
			label: { type: String },
			value: { type: String },
			code: { type: String },
			phone: { type: String },
			invalid: { type: Boolean }
		};
	}

	updateValue(phone: string) {
		if (phone && phone.split(",").length == 2) {
			let arr = phone.split(",");
			this.code = arr[0];
			this.phone = arr[1];
		} else {
			this.value = null;
			this.phone = "";
		}
	}

	focusPhone(code: string) {
		if (code.length == 3) {
			this.$phoneInput.focus();
		}
	}

	_computeValue(code: string, phone: string) {
		if (code.trim().length > 0 && phone.trim().length > 0) {
			this.value = code.trim().replace(/,/g, "") + "," + phone.trim().replace(/,/g, "");
			this.dispatchEvent(new CustomEvent("value", { detail: { value: this.value } }));
		}
	}

	validate() {
		if (this.code.trim().length > 0 && this.phone.trim().length > 4) {
			this.invalid = false;
		} else {
			this.invalid = true;
		}
		return !this.invalid;
	}
}

window.customElements.define("ct-phone-input", CtPhoneInput);
