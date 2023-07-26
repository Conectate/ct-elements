/**
	@license
	Copyright (c) 2020 Herberth Obregón. All rights reserved.
	This code may only be used under the BSD style license found at
	https://wc.conectate.app/LICENSE.txt The complete set of authors may be found at
	https://wc.conectate.app/AUTHORS.txt The complete set of contributors may be
	found at https://wc.conectate.app/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
	part of the Conectate Open Source Project is also subject to an additional IP rights grant
	found at https://wc.conectate.app/PATENTS.txt
*/
import { CtLit, customElement, property, query, state } from '@conectate/ct-lit';
import { css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

export type CtInputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color';
export type CtInputAutoComplete =
	| 'on'
	| 'off'
	| 'one-time-code'
	| 'additional-name'
	| 'address-level1'
	| 'address-level2'
	| 'address-level3'
	| 'address-level4'
	| 'address-line1'
	| 'address-line2'
	| 'address-line3'
	| 'bday'
	| 'bday-year'
	| 'bday-day'
	| 'bday-month'
	| 'billing'
	| 'cc-additional-name'
	| 'cc-csc'
	| 'cc-exp'
	| 'cc-exp-month'
	| 'cc-exp-year'
	| 'cc-family-name'
	| 'cc-given-name'
	| 'cc-name'
	| 'cc-number'
	| 'cc-type'
	| 'country'
	| 'country-name'
	| 'current-password'
	| 'email'
	| 'family-name'
	| 'fax'
	| 'given-name'
	| 'home'
	| 'honorific-prefix'
	| 'honorific-suffix'
	| 'impp'
	| 'language'
	| 'mobile'
	| 'name'
	| 'new-password'
	| 'nickname'
	| 'organization'
	| 'organization-title'
	| 'pager'
	| 'photo'
	| 'postal-code'
	| 'sex'
	| 'shipping'
	| 'street-address'
	| 'tel-area-code'
	| 'tel'
	| 'tel-country-code'
	| 'tel-extension'
	| 'tel-local'
	| 'tel-local-prefix'
	| 'tel-local-suffix'
	| 'tel-national'
	| 'transaction-amount'
	| 'transaction-currency'
	| 'url'
	| 'username';
export type CtInputMode = 'verbatim' | 'latin' | 'latin-name' | 'latin-prose' | 'full-width-latin' | 'kana' | 'kana-name' | 'katakana' | 'numeric' | 'tel' | 'email' | 'url';
/**
 * ## `ct-input`
 * Input element
 *
 * @group ct-elements
 * @element ct-input
 * @demo demo/index.html
 * @attr value - The value of the input
 * @slot prefix - Content placed start the main content
 * @slot suffix - Content placed end the main content
 */
@customElement('ct-input')
export class CtInput extends CtLit {
	static styles = [
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
				-webkit-animation: quantumWizPaperInputAddUnderline 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				animation: quantumWizPaperInputAddUnderline 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
				background-color: var(--color-primary, #2cb5e8);
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
				background-color: var(--color-error, #ed4f32);
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
				content: var(--ct-indicator, '*');
				color: var(--color-error, #ed4f32);
				width: 1.5em;
				margin-left: 4px;
				text-align: center;
			}

			#container:hover,
			#container:focus {
				background: rgba(26, 57, 96, 0.15);
			}

			#container {
				position: relative;
				margin: 0 auto;
				border-radius: 16px;
				background: rgba(121, 130, 142, 0.1);
				color: var(--color-on-surface, #535353);
				transition: all 0.2s;
				padding: var(--ct-input-padding, 0em 1em);
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
				color: var(--color-error, #ed4f32) !important;
			}

			#container.active {
				background: rgba(26, 57, 96, 0.03);
			}

			::slotted(*),
			#container.has-value > div > .charCount {
				transition: all 0.2s;
			}
			::slotted([slot='suffix']),
			[name='suffix'] {
				display: inline-block;
			}

			::slotted([slot='prefix']) {
				display: inline-block;
				margin-right: 0.5em;
			}

			input::placeholder {
				font-size: 0.9em;
			}

			input:not([type]),
			input[type='color'],
			input[type='date'],
			input[type='datetime-local'],
			input[type='datetime'],
			input[type='email'],
			input[type='month'],
			input[type='number'],
			input[type='password'],
			input[type='search'],
			input[type='tel'],
			input[type='text'],
			input[type='time'],
			input[type='url'],
			input[type='week'],
			select,
			textarea {
				height: var(--ct-input-height, 3.3em);
				box-sizing: border-box;
				background: none;
				font: inherit;
				border: none;
				outline: none;
				margin: 0;
				width: 100%;
				display: inline-block;
				color: inherit;
				font-family: var(--ct-input-font-family, inherit);
				font-weight: var(--ct-input-font-weight, inherit);
				font-size: inherit;
				letter-spacing: inherit;
				word-spacing: inherit;
				line-height: inherit;
				text-shadow: inherit;
				transition: all 0.2s;
				caret-color: var(--color-primary, #2cb5e8);
			}

			input:invalid {
				outline: none;
			}

			#input.has-value,
			#input.error {
				padding-top: 1.1em;
			}

			input::selection {
				background: var(--color-primary, #2cb5e8);
				color: white;
			}

			::-webkit-input-placeholder {
				color: inherit;
				opacity: 0.5;
			}

			.label {
				margin: 5px 8px 8px;
				color: var(--color-on-surface, #535353);
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
	@query('input') $input!: HTMLInputElement;
	@query('container') $container!: HTMLElement;

	@property({ type: String }) inputmode!: CtInputMode;
	@property({ type: Number }) minlength = 0;
	@property({ type: Number }) min?: number;
	@property({ type: Number }) max?: number;
	@property({ type: Number }) step?: number;
	@property({ type: String }) autocapitalize!: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
	@property({ type: String }) autocomplete?: CtInputAutoComplete;
	@property({ type: String }) name?: string;
	@property({ type: String }) accept?: string;
	@property({ type: Number }) size = 24;
	@property({ type: Boolean }) readonly = false;
	@property({ type: Boolean }) multiple = false;
	__isFirstValueUpdate = true;

	/**
	 * -
	 */
	@property({ type: Boolean }) autofocus = false;

	/**
	 * -
	 */
	@property({ type: Boolean }) required = false;

	/**
	 * -
	 */
	@property({ type: Boolean, reflect: true }) disabled = false;

	/**
	 * Input type
	 */
	@property({ type: String }) type = 'text';
	/**
	 * Placeholder text when searchbox is empty
	 */
	@property({ type: String }) rawPlaceholder = '';
	/**
	 * Placeholder text when searchbox is empty
	 */
	@property({ type: String }) placeholder = '';
	/**
	 * Mensaje de error al no complir con el pattern
	 */
	@property({ type: String }) errorMessage = '';
	/**
	 * regexp
	 */
	@property({ type: String }) pattern: string | RegExp = '';

	/**
	 * Do not show any effects when hovering the searchbox
	 */
	@property({ type: Boolean }) noHover = false;
	/**
	 * Change default icon to whatever you like
	 */
	@property({ type: String }) label = '';
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

	/** determinate if input es invalid */
	@property({ type: Boolean }) invalid = false;

	/** determinate if input es invalid */
	@property({ type: Boolean }) active = false;

	/** Check if input is empty */
	@state() isEmpty = true;
	/**
	 * The value of the searchbox
	 */
	private initValue?: string = '';

	render() {
		return html`
			<div class="inbody">
				${this.label ? html` <label for="input" class="label">${this.label}</label> ` : html``}
				<div id="container" class=${classMap({ 'has-value': !this.isEmpty, error: this.invalid, active: this.active })}>
					<div class="row">
						<slot name="prefix"></slot>
						<div class="row">
							${this.errorMessage && html` <label class="float-label error" for="input" aria-live="assertive">${this.errorMessage}</label> `}
							${this.placeholder && html` <label class="float-label" for="input" aria-live="assertive">${this.placeholder}</label> `}
							<input
								id="input"
								class=${classMap({ 'has-value': !this.isEmpty, error: this.invalid && this.errorMessage })}
								@focus="${this._onFocus}"
								@blur="${this._onBlur}"
								@input="${this._onInput}"
								.type="${this.type}"
								.placeholder="${this.placeholder || this.rawPlaceholder}"
								.size="${this.size}"
								?autofocus="${this.autofocus}"
								?readonly="${this.readonly}"
								?multiple="${this.multiple}"
								autocomplete="${ifDefined(this.autocomplete) as any}"
								inputmode="${ifDefined(this.inputmode)}"
								minlength="${ifDefined(this.minlength)}"
								maxlength="${ifDefined(this.maxlength)}"
								min="${ifDefined(this.min)}"
								max="${ifDefined(this.max)}"
								step="${ifDefined(this.step)}"
								name="${ifDefined(this.name)}"
								autocapitalize="${ifDefined(this.autocapitalize)}"
								accept="${ifDefined(this.accept)}"
							/>
						</div>
						<slot name="suffix"></slot>
						${this.charCounter ? html` <div class="charCount">${this.countChar}/${this.maxlength > 1_000_000 ? '1000+' : this.maxlength}</div> ` : ``}
					</div>
					<div class="underline"></div>
				</div>
			</div>
		`;
	}

	firstUpdated() {
		if (this.$input) {
			this.$input.value = this.initValue || this.getAttribute('value') || '';
		}
		this.validate();
		this._onInput();
	}

	_onInput() {
		this.fire('value', this.value);
		if (this.placeholder) {
			this.isEmpty = this.value == '' || this.value == null;
		}
		this.countChar = this.value!.length;
	}

	set value(val: string | number | undefined | null) {
		val ||= '';
		val = val.toString();
		this.initValue = val;
		if (this.$input && this.$input.value != val && val.length - 1 < this.maxlength) {
			if (this.$input) {
				this.$input.value = val;
				this._onInput();
			}
		}
	}

	get value(): string {
		return this.$input?.value || '';
	}
	get valueAsnumber() {
		return this.$input?.valueAsNumber;
	}
	get valueAsDate() {
		return this.$input?.valueAsDate;
	}

	focus() {
		this.$input?.focus();
	}

	/**
	 * Cuando Hago focus en el input
	 * @private
	 */
	_onFocus() {
		this.active = true;
		this.invalid = false;
		this.placeholder = this.placeholder;
	}

	/**
	 * Cuando dejo de enfocar el element
	 * @private
	 */
	_onBlur() {
		this.active = false;
		this.validate();
	}

	validate() {
		this.invalid = false;
		if (this.__isFirstValueUpdate) {
			this.__isFirstValueUpdate = false;
			if (this.$input?.value === undefined || this.$input?.value === '') return !this.invalid;
		}

		if (this.pattern) {
			let re = this.pattern instanceof RegExp ? this.pattern : new RegExp(this.pattern);
			this.invalid = !this.$input?.value.match(re);
		} else if (this.required) {
			this.invalid = !(this.$input?.value.length > 0 && this.$input?.value.length >= (this.min || 0));
		}
		return !this.invalid;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ct-input': CtInput;
	}
}
