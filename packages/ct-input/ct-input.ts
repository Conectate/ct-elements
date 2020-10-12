/**
	@license
	Copyright (c) 2020 Herberth Obregón. All rights reserved.
	This code may only be used under the BSD style license found at
	http://wc.conectate.today/LICENSE.txt The complete set of authors may be found at
	http://wc.conectate.today/AUTHORS.txt The complete set of contributors may be
	found at http://wc.conectate.today/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
	part of the Conectate Open Source Project is also subject to an additional IP rights grant
	found at http://wc.conectate.today/PATENTS.txt
*/
import { CtLit, html, property, css } from "@conectate/ct-lit";
import { CSSResult } from "lit-element";

/**
 * ## `ct-input`
 * Input element
 *
 * @group Conectate Elements
 * @element ct-input
 * @demo demo/index.html
 * @slot prefix - Content placed start the main content
 * @slot suffix - Content placed end the main content
 */
export class CtInput extends CtLit {
	static styles: CSSResult[] = [
		css`
			:host {
				display: inline-block;
				margin-bottom: 8px;
			}
			.inbody {
				width: 100%;
			}

			@keyframes quantumWizPaperInputAddUnderline {
				0% {
					-webkit-transform: scaleX(0);
					transform: scaleX(0);
				}

				to {
					-webkit-transform: scaleX(1);
					transform: scaleX(1);
				}
			}

			@keyframes quantumWizPaperInputRemoveUnderline {
				0% {
					-webkit-transform: scaleX(1);
					transform: scaleX(1);
					opacity: 1;
				}

				to {
					-webkit-transform: scaleX(1);
					transform: scaleX(1);
					opacity: 0;
				}
			}

			#container.active > .underlinee {
				-webkit-animation: quantumWizPaperInputAddUnderline 0.3s
					cubic-bezier(0.4, 0, 0.2, 1);
				animation: quantumWizPaperInputAddUnderline 0.3s
					cubic-bezier(0.4, 0, 0.2, 1);
				-webkit-transform: scaleX(1);
				transform: scaleX(1);
			}

			#container.active > .underline,
			#container.xactive > .underline {
				-webkit-transform: scaleX(1);
				transform: scaleX(1);
			}

			.underline {
				-webkit-transform: scaleX(0);
				transform: scaleX(0);
				background-color: var(--primary-color, #2cb5e8);
				bottom: 0;
				height: 2px;
				left: 8px;
				right: 8px;
				margin: 0;
				padding: 0;
				position: absolute;
				border-radius: 0 0 6px 6px;

				-webkit-transform: scaleX(0);
				transform: scaleX(0);
				transition: all 300ms;
			}

			.undeline .error {
				background-color: #c53929;
			}

			:host([block]) {
				display: block;
			}

			:host([disabled]) {
				pointer-events: none;
				opacity: 0.33;
			}

			:host([hidden]) {
				display: none !important;
			}

			:host([required]) .label:after {
				content: var(--ct-indicator, "*");
				color: #ed4f32;
				width: 1.5em;
				margin-left: 4px;
				text-align: center;
			}

			#container:hover,
			#container:focus {
				background: rgba(26, 57, 96, 0.15);
			}

			#container {
				/* display: flex;
		flex-direction: row;
		flex: 1; 
		align-items: center;*/
				position: relative;
				margin: 0 auto;
				border-radius: 16px;
				background: rgba(121, 130, 142, 0.1);
				color: var(--on-surface, #535353);
				transition: all 0.2s;
				padding: 0em 1em;
				overflow: hidden;
			}

			.row {
				display: flex;
				flex-direction: row;
				flex: 1;
				align-items: center;
				position: relative;
			}

			:host(:not([disabled])) #container.error {
				background: rgba(255, 0, 45, 0.15);
			}

			#container.error > div > div > .float-label,
			#container.error > div > input::placeholder {
				color: #ed4f32 !important;
			}

			#container.active {
				background: rgba(26, 57, 96, 0.03);
			}

			::slotted(*),
			#container.has-value > div > .charCount {
				transition: all 0.2s;
			}
			::slotted([slot="suffix"]),
			[name="suffix"] {
				display: inline-block;
			}

			::slotted([slot="prefix"]),
			[name="prefix"] {
				display: inline-block;
				margin-right: 0.5em;
			}

			input::placeholder {
				font-size: 0.9em;
			}

			input:not([type]),
			input[type="color"],
			input[type="date"],
			input[type="datetime-local"],
			input[type="datetime"],
			input[type="email"],
			input[type="month"],
			input[type="number"],
			input[type="password"],
			input[type="search"],
			input[type="tel"],
			input[type="text"],
			input[type="time"],
			input[type="url"],
			input[type="week"],
			select,
			textarea {
				height: 3.3em;
				box-sizing: border-box;
				background: none;
				font: inherit;
				border: none;
				outline: none;
				margin: 0;
				width: 100%;
				display: inline-block;
				color: inherit;
				font-family: inherit;
				font-weight: inherit;
				font-size: inherit;
				letter-spacing: inherit;
				word-spacing: inherit;
				line-height: inherit;
				text-shadow: inherit;
				transition: all 0.2s;
				caret-color: var(--primary-color, #2cb5e8);
			}

			input:invalid {
				outline: none;
			}

			#input.has-value,
			#input.error {
				padding-top: 1.1em;
			}

			input::selection {
				background: var(--primary-color, #2cb5e8);
				color: white;
			}

			::-webkit-input-placeholder {
				color: inherit;
				opacity: 0.5;
			}

			.label {
				margin: 5px 8px 8px;
				color: var(--on-surface, #535353);
				display: block;
				font-weight: 500;
				font-size: 0.8rem;
				max-width: 100%;
				transition: all 0.2s;
			}

			.float-label {
				font-size: 11px;
				font-weight: 700;
				display: block;
				position: absolute;
				top: 6px;
				font-size: 0.75em;
				font-weight: 700;
				color: #676767;
				opacity: 0;
				transition: all 0.2s ease-in-out;
				width: 100%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}

			#container.has-value:not(.error) > div > div > .float-label:not(.error) {
				opacity: 1;
				visibility: visible;
			}

			#container.error > div > div > .float-label.error {
				opacity: 1;
				visibility: visible;
			}

			.charCount {
				text-align: right;
				padding-left: 8px;
				font-size: 0.75em;
			}
		`
	];

	render() {
		return html`
			<div class="inbody">
				${this.label
					? html` <label for="input" class="label">${this.label}</label> `
					: html``}
				<div id="container">
					<div class="row">
						<slot name="prefix"></slot>
						<div class="row">
							${this.errorMessage &&
							html`
								<label
									class="float-label error"
									for="input"
									aria-live="assertive"
									>${this.errorMessage}</label
								>
							`}
							${this.placeholder &&
							html`
								<label class="float-label" for="input" aria-live="assertive"
									>${this.placeholder}</label
								>
							`}
							<input
								id="input"
								@focus="${this._onFocus}"
								@blur="${this._onBlur}"
								.value="${this._value}"
								@input="${this._onInput}"
								.type="${this.type}"
								autocomplete="${this.autocomplete}"
								.autofocus="${this.autofocus}"
								.inputMode="${this.inputmode}"
								.minlength="${this.minlength}"
								maxlength="${this.maxlength}"
								.min="${this.min}"
								.max="${this.max}"
								.step="${this.step}"
								name="${this.name}"
								.placeholder="${this.placeholder || this.rawPlaceholder}"
								.readonly="${this.readonly}"
								.size="${this.size}"
								.autocapitalize="${this.autocapitalize}"
								.accept="${this.accept}"
								.multiple="${this.multiple}"
							/>
						</div>
						<slot name="suffix"></slot>
						${this.charCounter
							? html`
									<div class="charCount">
										${this.countChar}/${this.maxlength > 1_000_000
											? "1000+"
											: this.maxlength}
									</div>
							  `
							: ``}
					</div>
					<div class="underline"></div>
				</div>
			</div>
		`;
	}
	@property({ type: String }) inputmode:
		| ""
		| "verbatim"
		| "latin"
		| "latin-name"
		| "latin-prose"
		| "full-width-latin"
		| "kana"
		| "kana-name"
		| "katakana"
		| "numeric"
		| "tel"
		| "email"
		| "url" = "";
	@property({ type: Number }) minlength = 0;
	@property({ type: String }) min = "";
	@property({ type: String }) max = "";
	@property({ type: String }) step = "";
	@property({ type: String }) autocomplete:
		| "on"
		| "off"
		| "additional-name"
		| "address-level1"
		| "address-level2"
		| "address-level3"
		| "address-level4"
		| "address-line1"
		| "address-line2"
		| "address-line3"
		| "bday"
		| "bday-year"
		| "bday-day"
		| "bday-month"
		| "billing"
		| "cc-additional-name"
		| "cc-csc"
		| "cc-exp"
		| "cc-exp-month"
		| "cc-exp-year"
		| "cc-family-name"
		| "cc-given-name"
		| "cc-name"
		| "cc-number"
		| "cc-type"
		| "country"
		| "country-name"
		| "current-password"
		| "email"
		| "family-name"
		| "fax"
		| "given-name"
		| "home"
		| "honorific-prefix"
		| "honorific-suffix"
		| "impp"
		| "language"
		| "mobile"
		| "name"
		| "new-password"
		| "nickname"
		| "organization"
		| "organization-title"
		| "pager"
		| "photo"
		| "postal-code"
		| "sex"
		| "shipping"
		| "street-address"
		| "tel-area-code"
		| "tel"
		| "tel-country-code"
		| "tel-extension"
		| "tel-local"
		| "tel-local-prefix"
		| "tel-local-suffix"
		| "tel-national"
		| "transaction-amount"
		| "transaction-currency"
		| "url"
		| "username"
		| "work" = "off";
	@property({ type: String }) name = "";
	@property({ type: String }) accept = "";
	@property({ type: Number }) size = 24;
	@property({ type: Boolean }) autofocus = false;
	@property({ type: Boolean }) readonly = false;
	@property({ type: Boolean }) multiple = false;
	__isFirstValueUpdate = true;
	_invalid = false;

	firstUpdated() {
		this.mapIDs();
		this.validate();
		this._onInput();
	}

	set value(val) {
		if (val == undefined) val = ``;
		val = `${val}`;
		if (this._value != val && val?.length - 1 < this.maxlength) {
			this._value = val;
			if (this.$.input) this.$.input.value = val;
			this.updateComplete.then(() => {
				this._onInput();
			});
		}
	}

	get value() {
		return this._value;
	}

	/**
	 * -
	 */
	@property({ type: Boolean }) required = false;

	/**
	 * -
	 */
	@property({ type: Boolean, reflect: true }) disabled = false;
	/**
	 * The value of the searchbox
	 */
	@property({ type: String }) _value = "";

	/**
	 * Input type
	 */
	@property({ type: String }) type = "text";
	/**
	 * Placeholder text when searchbox is empty
	 */
	@property({ type: String }) rawPlaceholder = "";
	/**
	 * Placeholder text when searchbox is empty
	 */
	@property({ type: String }) placeholder = "";
	/**
	 * Mensaje de error al no complir con el pattern
	 */
	@property({ type: String }) errorMessage = "";
	/**
	 * regexp
	 */
	@property({ type: String }) pattern: string | RegExp = "";

	/**
	 * Do not show any effects when hovering the searchbox
	 */
	@property({ type: Boolean }) noHover = false;
	/**
	 * Change default icon to whatever you like
	 */
	@property({ type: String }) label = "";
	/**
	 * Max length on input
	 */
	@property({ type: Number }) maxlength = Number.MAX_SAFE_INTEGER;
	/**
	 * Total chars on input
	 */
	@property({ type: Number }) countChar = 0;

	/**
	 * -
	 */
	@property({ type: Boolean }) charCounter = false;

	/**
	 * Raise searchbox is it's focused
	 */
	@property({ type: Boolean }) raiseOnActive = false;
	/**
	 * Raise searchbox if it has value
	 */
	@property({ type: Boolean }) raiseOnValue = false;
	/**
	 * Always raise the searchbox whether it is active or not, or whether is has value or not
	 */
	@property({ type: Boolean }) raiseForced = false;

	connectedCallback() {
		super.connectedCallback();
		this.placeholder = this.placeholder;
	}

	focus() {
		this.$.input?.focus();
	}

	/**
	 * Cuando Hago focus en el input
	 * @private
	 */
	_onFocus() {
		this.$.container?.classList.add("active");
		this.$.container?.classList.remove("error");
		this.$.input?.classList.remove("error");
		this.set("focused", true);
		this.placeholder = this.placeholder;
	}

	/**
	 * Cuando dejo de enfocar el element
	 * @private
	 */
	_onBlur() {
		this.$.container?.classList.remove("active");
		this.set("focused", false);
		this.validate();
	}

	validate() {
		this.invalid = false;
		if (this.__isFirstValueUpdate) {
			this.__isFirstValueUpdate = false;
			if (this.$.input?.value === undefined || this.$.input?.value === "")
				return !this.invalid;
		}

		if (this.pattern) {
			let re =
				this.pattern instanceof RegExp
					? this.pattern
					: new RegExp(this.pattern);
			this.invalid = !this.$.input?.value.match(re);
		} else if (this.required) {
			this.invalid = !(
				this.$.input?.value.length > 0 && this.$.input?.value.length >= this.min
			);
		}

		if (!this.invalid) {
			// remover error
			this.$.container?.classList.remove("error");
			this.$.input?.classList.remove("error");
		} else {
			this.$.container?.classList.add("error");
			if (this.errorMessage) {
				this.$.input?.classList.add("error");
			}
		}
		return !this.invalid;
	}

	set invalid(val) {
		this._invalid = val;
		if (!val) {
			// remover error
			this.$.container?.classList.remove("error");
			this.$.input?.classList.remove("error");
		} else {
			this.$.container?.classList.add("error");
			if (this.errorMessage) {
				this.$.input?.classList.add("error");
			}
		}
	}

	get invalid() {
		return this._invalid;
	}

	_onInput() {
		this._value = this.$.input?.value;
		this.fire("value", this.value);
		if (this.placeholder) {
			var isEmpty = this.value == "" || this.value == void 0;
			this.$.container?.classList.toggle("has-value", !isEmpty);
			this.$.input?.classList.toggle("has-value", !isEmpty);
		}
		this.countChar = this.value.length;
	}
}

window.customElements.define("ct-input", CtInput);
