import "./ct-textarea-autogrow.js";

/**
    @license		
	Copyright (c) 2020 Herberth Obregón. All rights reserved.
	This code may only be used under the BSD style license found at
	https://open.grupoconectate.com/LICENSE.txt The complete set of authors may be found at
	https://open.grupoconectate.com/AUTHORS.txt The complete set of contributors may be
	found at https://open.grupoconectate.com/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
	part of the Conectate Open Source Project is also subject to an additional IP rights grant
	found at https://open.grupoconectate.com/PATENTS.txt
 */
// https://stackoverflow.com/a/56751153/4168512
import { CtLit, customElement, property, query, state } from "@conectate/ct-lit";
import { css, html } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

/**
	`ct-textarea`
	Input element
	@group ct-elements
	@element ct-textarea
	@demo demo/index.html
	@homepage open.grupoconectate.com
	@slot prefix - Content placed start the main content
	@slot suffix - Content placed end the main content
 */
@customElement("ct-textarea")
export class CtTextarea extends CtLit {
	static styles = [
		css`
			:host {
				display: inline-block;
				margin-bottom: 8px;
				max-width: 100%;
				min-width: 213px;
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
				background-color: var(--color-primary, #2cb5e8);
				bottom: 0;
				height: 2px;
				left: calc(var(--border-radius, 16px) / 2);
				right: calc(var(--border-radius, 16px) / 2);
				margin: 0;
				padding: 0;
				position: absolute;
				border-radius: 0 0 calc(var(--border-radius, 16px) / 2) calc(var(--border-radius, 16px) / 2);

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
				content: var(--ct-indicator, "*");
				color: var(--color-error, #ed4f32);
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
				border-radius: var(--border-radius, 16px);
				background: rgba(121, 130, 142, 0.1);
				color: var(--color-on-surface, #535353);
				transition: all 0.2s;
				padding: var(--ct-input-padding, 0em 1em);
				overflow: hidden;
			}

			#container.error {
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
			::slotted([slot="suffix"]) {
				display: inline-block;
			}

			::slotted([slot="prefix"]) {
				display: inline-block;
				padding-right: 0.5em;
			}

			ct-textarea-autogrow:not([type]),
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
				min-height: 1em;
				box-sizing: border-box;
				background: none;
				border: none;
				outline: none;
				margin: 1.15em 0;
				padding: 0;
				width: 100%;
				display: inline-block;
				color: inherit;
				font-family: var(--ct-textarea-font-family, inherit);
				font-weight: var(--ct-textarea-font-weight, inherit);
				font-size: inherit;
				letter-spacing: inherit;
				word-spacing: inherit;
				line-height: inherit;
				text-shadow: inherit;
				transition: all 0.2s;
				caret-color: var(--color-primary, #2cb5e8);
			}

			ct-textarea-autogrow:invalid {
				outline: none;
			}

			#input.has-value {
				margin: 1.7em 0 0.6em;
			}

			input::selection {
				background: var(--color-primary, #2cb5e8);
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

	/** Check if input is empty */
	@state() isEmpty = true;

	/**
	 * The value of the searchbox
	 */
	private initValue?: string = "";
	render() {
		return html`
			<div>
				${this.label ? html`<h4 class="label">${this.label}</h4>` : html``}

				<div id="container" class=${classMap({ "has-value": !this.isEmpty })}>
					<div class="row">
						<slot name="prefix"></slot>
						<div class="row">
							${this.placeholder && html`<label class="float-label" for="input" aria-live="assertive">${this._placeholder}</label>`}
							<ct-textarea-autogrow
								id="input"
								class=${classMap({ "has-value": !this.isEmpty })}
								@focus="${this._onFocus}"
								@blur="${this._onBlur}"
								@input="${this._onInput}"
								.rows="${this.rows}"
								.placeholder="${this.placeholder || this.rawPlaceholder}"
								?autofocus="${this.autofocus}"
								?readonly="${this.readonly}"
								inputMode="${ifDefined(this.inputmode)}"
								minlength="${ifDefined(this.minlength)}"
								maxlength="${ifDefined(this.maxlength)}"
								name="${ifDefined(this.name)}"
								autocapitalize="${ifDefined(this.autocapitalize)}"
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

	@state() private __isFirstValueUpdate = true;
	@state() private _placeholder = "";
	@state() private _invalid = false;

	/**
	 * -
	 */
	@property({ type: Boolean }) disabled = false;
	@property({ type: Boolean }) autofocus = false;
	@property({ type: String }) name?: string;
	@property({ type: Boolean }) charCounter = false;
	@property({ type: Boolean }) readonly = false;
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean }) noHover = false;
	@property({ type: String }) inputmode = "";
	@property({ type: String }) placeholder = "";
	@property({ type: String }) pattern?: string;
	@property({ type: String }) errorMessage?: string;
	@property({ type: String }) rawPlaceholder = "";
	@property({ type: String }) autocorrect = "off";
	@property({ type: String }) autocapitalize!: "off" | "none" | "on" | "sentences" | "words" | "characters";
	@property({ type: String }) label = "";
	@property({ type: Number }) countChar = 0;
	@property({ type: Number }) minlength = 0;
	@property({ type: Number }) maxlength = 5000;
	@property({ type: Number }) rows = 1;

	@query("#container") container!: HTMLElement;
	@query("#input") input!: HTMLInputElement;

	connectedCallback() {
		super.connectedCallback();
		this._placeholder = this.placeholder;
	}

	firstUpdated() {
		if (this.input) {
			this.input.value = this.initValue || this.getAttribute("value") || "";
		}
		this.validate();
		this._onInput();
	}

	_onInput() {
		this.fire("value", this.value);
		if (this.placeholder) {
			this.isEmpty = this.value == "" || this.value == void 0;
		}
		this.countChar = this.value!.length;
	}

	set value(val: string | number | undefined | null) {
		val ||= "";
		val = val.toString();
		this.initValue = val;
		if (this.input && this.input.value != val && val.length - 1 < this.maxlength) {
			if (this.input) {
				this.input.value = val;
				this._onInput();
			}
		}
	}

	get value(): string {
		return this.input?.value || "";
	}

	focus() {
		this.input.focus();
	}

	/**
	 * Cuando Hago focus en el input
	 * @private
	 */
	_onFocus() {
		this.container.classList.add("active");
		this.container.classList.remove("error");
		this._placeholder = this.placeholder;
	}

	/**
	 * Cuando dejo de enfocar el element
	 * @private
	 */
	_onBlur() {
		this.container.classList.remove("active");
		this.validate();
	}

	validate() {
		this.invalid = false;
		if (this.__isFirstValueUpdate) {
			this.__isFirstValueUpdate = false;
			if (this.input.value === undefined || this.input.value === "") return !this.invalid;
		}

		if (this.pattern) {
			let re = new RegExp(this.pattern);
			this.invalid = !re.test(this.input.value);
		} else if (this.required) {
			this.invalid = !(this.input.value.length > 0 && this.input.value.length >= (this.minlength || 0));
		}

		if (!this.invalid) {
			// remover error
			this.container.classList.remove("error");
			this._placeholder = this.placeholder;
		} else {
			this.container.classList.add("error");
			// agregar error
			this._placeholder = this.errorMessage ? this.errorMessage : this.placeholder;
		}
		return !this.invalid;
	}

	set invalid(val) {
		this._invalid = val;
		if (!val) {
			// remover error
			this.container.classList.remove("error");
			this._placeholder = this.placeholder;
		} else {
			this.container.classList.add("error");
			// agregar error
			this._placeholder = this.errorMessage ? this.errorMessage : this.placeholder;
		}
	}

	get invalid() {
		return this._invalid;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-textarea": CtTextarea;
	}
}
