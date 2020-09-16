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
import { html, CtLit, css } from '@conectate/ct-lit';

/**
 * `ct-input-container`
 * Input element
 *
 *
 * @group Conectate Elements
 * @element ct-input-container
 * @demo demo/index.html
 * @hero hero.svg
 * @homepage wc.conectate.today
 */
class CtInputContainer extends CtLit {
	_placeholder: string = '';
	_invalid = false;
	errorMessage = '';
	static styles = [
		css`
			:host {
				display: inline-block;
				margin-bottom: 8px;
				color: var(--on-surface, #535353);
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
				width: 1.5em;
				margin-left: 4px;
				text-align: center;
			}

			#container > div {
				display: flex;
				flex-direction: row;
				align-items: center;
				position: relative;
				flex: 1;
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
			}

			#container.error {
				background: rgba(255, 0, 45, 0.15);
			}

			#container.error > div > .float-label,
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
			::slotted([slot='input']) {
				height: 3.3em;
				box-sizing: border-box;
			}

			::slotted(input) {
				height: 3.3em;
				box-sizing: border-box;
				background: none;
				font: inherit;
				border: none;
				outline: none;
				margin: 0;
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

			#container.has-value ::slotted([slot='input']) {
				padding: 1.4em 0 0.6em;
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

			#container.has-value > div > .float-label {
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
			${this.label ? html` <h4 for="input" class="label">${this.label}</h4> ` : html``}

			<div id="container" class="${this.getHasValue(this.value)}">
				<slot name="prefix"></slot>
				<div>
					${this.placeholder && html` <label class="float-label">${this.placeholder}</label> `}
					<slot name="input" id="slots"></slot>
					<slot name="suffix"></slot>
					${this.charCounter ? html` <div class="charCount">${this.countChar}/${this.maxlength}</div> ` : ``}
				</div>
			</div>
		`;
	}

	getHasValue(value: string) {
		if (this.placeholder && value) {
			return `has-value`;
		}
		return ``;
	}

	__isFirstValueUpdate = true;
	value = '';
	placeholder = '';
	type = 'text';
	label = '';
	countChar = 0;
	noHover = false;
	size = 30;
	autocorrect = 'off';
	minlength = 0;
	maxlength = 5000;
	autocapitalize = 'none';
	min = this.minlength;
	max = this.maxlength;
	charCounter = false;

	firstUpdated() {
		this.$.container = this._('container');
	}

	static get properties() {
		return {
			required: {
				type: Boolean
			},
			disabled: {
				type: Boolean
			},
			/**
			 * The value of the searchbox
			 */
			value: {
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
			},
			binding: {
				type: Array
			},
			invalid: {
				type: Boolean,
				reflect: true
			},
			_invalid: {
				type: Boolean
			}
		};
	}

	connectedCallback() {
		super.connectedCallback();
		this._placeholder = this.placeholder;
	}

	/**
	 * Cuando Hago focus en el input
	 * @private
	 */
	_onFocus() {
		this.$.container.classList.add('active');
		this.$.container.classList.remove('error');
		this.set('focused', true);
		this.set('_placeholder', this.placeholder);
	}

	/**
	 * Cuando dejo de enfocar el element
	 * @private
	 */
	_onBlur() {
		this.$.container.classList.remove('active');
		this.set('focused', false);
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
}

window.customElements.define('ct-input-container', CtInputContainer);
