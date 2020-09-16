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
import { html, CtLit, property, css } from '@conectate/ct-lit';
import './ct-textarea-autogrow';

/**
	`ct-textarea`
	Input element
	@group Conectate Elements
	@element ct-textarea
	@demo demo/index.html
	@homepage wc.conectate.today
	@slot prefix - Content placed start the main content
	@slot suffix - Content placed end the main content
 */
class CtTextarea extends CtLit {
	static styles = [
		css`
			:host {
				display: inline-block;
				margin-bottom: 8px;
				max-width: 100%;
			}
			:host > div {
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

			#container.active > .underline {
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
				border-radius: 0 0 8px 8px;

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

			:host([required]) > .label:after {
				content: var(--ct-indicator, '*');
				color: #ed4f32;
				position: absolute;
				width: 1.5em;
				text-align: center;
			}

			.row {
				display: flex;
				flex-direction: row;
				align-items: center;
				position: relative;
				flex: 1;
				max-width: 100%;
			}

			#container:hover,
			#container:focus {
				background: rgba(26, 57, 96, 0.15);
			}

			#container {
				display: flex;
				flex-direction: row;
				flex: 1;
				align-items: center;
				position: relative;
				margin: 0 auto;
				border-radius: 16px;
				background: rgba(121, 130, 142, 0.1);
				color: var(--on-surface, #535353);
				transition: all 0.2s;
				padding: 0em 1em;
				overflow: hidden;
			}

			#container.error {
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
			::slotted([slot='suffix']) {
				display: inline-block;
			}

			::slotted([slot='prefix']) {
				display: inline-block;
				padding-right: 0.5em;
			}

			ct-textarea-autogrow:not([type]),
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
				min-height: 1em;
				box-sizing: border-box;
				background: none;
				font: inherit;
				border: none;
				outline: none;
				margin: 1.15em 0;
				padding: 0;
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

			ct-textarea-autogrow:invalid {
				outline: none;
			}

			#input.has-value {
				margin: 1.7em 0 0.6em;
			}

			input::selection {
				background: var(--primary-color, #2cb5e8);
				color: white;
			}

			::-webkit-input-placeholder {
				color: inherit;
				opacity: 0.5;
			}

			h4 {
				margin: 5px 8px 8px;
				color: inherit;
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

			#container.has-value > div > div > .float-label {
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
			<div>
				${this.label ? html`<h4 class="label">${this.label}</h4>` : html``}

				<div id="container">
					<div class="row">
						<slot name="prefix"></slot>
						<div class="row">
							${this.placeholder && html`<label class="float-label" for="input" aria-live="assertive">${this._placeholder}</label>`}
							<ct-textarea-autogrow
								id="input"
								@focus="${this._onFocus}"
								@blur="${this._onBlur}"
								.rows=${this.rows}
								.value="${this._value}"
								@input="${this._onInput}"
								.inputmode="${this.inputmode}"
								.minlength="${this.minlength}"
								.maxlength="${this.maxlength}"
								.min="${this.min}"
								.max="${this.max}"
								.step="${this.step}"
								.placeholder="${this._placeholder || this.rawPlaceholder}"
								.readonly="${this.readonly}"
								.size="${this.size}"
								.autocapitalize="${this.autocapitalize}"
								.autocorrect="${this.autocorrect}"
								.tabindex="${this.tabIndex}"
							></ct-textarea-autogrow>
							<slot name="suffix"></slot>
							${this.charCounter ? html`<div class="charCount">${this.countChar}/${this.maxlength}</div>` : ``}
						</div>
					</div>
					<div class="underline"></div>
				</div>
			</div>
		`;
	}

	@property({ type: Boolean }) __isFirstValueUpdate = true;
	@property({ type: Boolean }) charCounter = false;
	@property({ type: Boolean }) readonly = false;
	@property({ type: Boolean }) _invalid = false;
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean }) noHover = false;
	@property({ type: String }) placeholder = '';
	@property({ type: String }) pattern?: string;
	@property({ type: String }) errorMessage?: string;
	@property({ type: String }) rawPlaceholder = '';
	@property({ type: String }) type = 'text';
	@property({ type: String }) autocorrect = 'off';
	@property({ type: String }) autocapitalize = 'none';
	@property({ type: String }) _value = '';
	@property({ type: String }) _placeholder = '';
	@property({ type: String }) label = '';
	@property({ type: Number }) countChar = 0;
	@property({ type: Number }) size = 30;
	@property({ type: Number }) min = 0;
	@property({ type: Number }) max = 5000;
	@property({ type: Number }) minlength = 0;
	@property({ type: Number }) maxlength = 5000;
	@property({ type: Number }) rows = 1;

	constructor() {
		super();
		this.value = '';
	}

	firstUpdated() {
		this.$.container = this._('container');
		this.$.input = this._('input');
		this.validate();
		this._onInput();
	}

	set value(val) {
		this._value = val || '';
		this.updateComplete.then((resp) => {
			this._onInput();
		});
	}

	get value() {
		return this._value;
	}

	static get properties() {
		return {
			rawPlaceholder: { type: String },
			required: {
				type: Boolean
			},
			disabled: {
				type: Boolean
			},
			/**
			 * The value of the searchbox
			 */
			_value: {
				type: String
			},

			/**
			 * Input type
			 */
			type: {
				type: String
			},
			/**
			 * Placeholder text when searchbox is empty
			 */
			placeholder: {
				type: String
			},

			_placeholder: {
				type: String
			},
			/**
			 * Mensaje de error al no complir con el pattern
			 */
			errorMessage: {
				type: String
			},
			invalid: {
				type: Boolean
			},
			/**
			 * regexp
			 */
			pattern: {
				type: String
			},

			/**
			 * Raise searchbox is it's focused
			 */
			raiseOnActive: {
				type: Boolean,
				value: false
			},
			/**
			 * Raise searchbox if it has value
			 */
			raiseOnValue: {
				type: Boolean,
				value: false
			},
			/**
			 * Always raise the searchbox whether it is active or not, or whether is has value or not
			 */
			raiseForced: {
				type: Boolean,
				value: false
			},
			/**
			 * Do not show any effects when hovering the searchbox
			 */
			noHover: {
				type: Boolean
			},
			/**
			 * Change default icon to whatever you like
			 */
			label: {
				type: String
			},
			/**
			 * Max length on input
			 */
			maxlength: {
				type: Number
			},
			/**
			 * Total chars on input
			 */
			countChar: {
				type: Number
			},
			charCounter: {
				type: Boolean
			}
		};
	}

	connectedCallback() {
		super.connectedCallback();
		this._placeholder = this.placeholder;
	}

	focus() {
		this.$.input.focus();
	}

	/**
	 * Cuando Hago focus en el input
	 * @private
	 */
	_onFocus() {
		this.$.container.classList.add('active');
		this.$.container.classList.remove('error');
		this.set('focused', true);
		this._placeholder = this.placeholder;
	}

	/**
	 * Cuando dejo de enfocar el element
	 * @private
	 */
	_onBlur() {
		this.$.container.classList.remove('active');
		this.set('focused', false);
		this.validate();
	}

	validate() {
		this.invalid = false;
		if (this.__isFirstValueUpdate) {
			this.__isFirstValueUpdate = false;
			if (this.$.input.value === undefined || this.$.input.value === '') return !this.invalid;
		}

		if (this.pattern) {
			let re = new RegExp(this.pattern);
			this.invalid = !re.test(this.$.input.value);
		} else if (this.required) {
			this.invalid = !(this.$.input.value.length > 0 && this.$.input.value.length >= this.min);
		}

		if (!this.invalid) {
			// remover error
			this.$.container.classList.remove('error');
			this.set('_placeholder', this.placeholder);
		} else {
			this.$.container.classList.add('error');
			// agregar error
			this.set('_placeholder', this.errorMessage ? this.errorMessage : this.placeholder);
		}
		return !this.invalid;
	}

	set invalid(val) {
		if (Object.keys(this.$).length == 0) {
			return;
		}
		this._invalid = val;
		if (!val) {
			// remover error
			this.$.container.classList.remove('error');
			this.set('_placeholder', this.placeholder);
		} else {
			this.$.container.classList.add('error');
			// agregar error
			this.set('_placeholder', this.errorMessage ? this.errorMessage : this.placeholder);
		}
	}

	get invalid() {
		return this._invalid;
	}

	_onInput() {
		this._value = this.$.input.value;
		this.fire('value', this.value);
		if (this.placeholder) {
			var isEmpty = this.value == '' || this.value == void 0;
			this.$.container.classList.toggle('has-value', !isEmpty);
			this.$.input.classList.toggle('has-value', !isEmpty);
		}
		this.countChar = this.value.length;
	}
}

window.customElements.define('ct-textarea', CtTextarea);
