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
import { CtLit, customElement, property, query, state } from "../ct-lit/ct-lit.js";
import { PropertyValues, css, html } from "lit";
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
				--default-color-active: #1a396008;
			}
			:host([dark]) {
				--default-color-active: #3f95ff17;
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
				width: 1.5em;
				margin-left: 4px;
				text-align: center;
			}

			.inbody {
				width: 100%;
			}

			@keyframes quantumWizPaperInputAddUnderline {
				0% {
					transform: scaleX(0);
				}
				to {
					transform: scaleX(1);
				}
			}

			@keyframes quantumWizPaperInputRemoveUnderline {
				0% {
					transform: scaleX(1);
					opacity: 1;
				}
				to {
					transform: scaleX(1);
					opacity: 0;
				}
			}

			#container.active > .underlinee {
				animation: quantumWizPaperInputAddUnderline 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				transform: scaleX(1);
			}

			#container.active > .underline {
				transform: scaleX(1);
			}

			.underline {
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
				transition: all 300ms;
			}

			.undeline .error {
				background-color: var(--color-error, #ed4f32);
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
				background: var(--default-color-active, #1a396008);
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

			ct-textarea-autogrow,
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
	static formAssociated = true;
	private internals?: ElementInternals = this.attachInternals?.();

	@query("#container") $container!: HTMLElement;
	@query("#input") $input!: HTMLInputElement;

	@property({ type: String }) inputmode = "";
	@property({ type: Number }) minlength = 0;
	@property({ type: Number }) maxlength = Number.MAX_SAFE_INTEGER;
	@property({ type: String }) autocapitalize!: "off" | "none" | "on" | "sentences" | "words" | "characters";
	@property({ type: String }) name?: string;
	@property({ type: Boolean }) readonly = false;
	@property({ type: Boolean, reflect: true }) dark = false;
	@property({ type: Boolean }) autofocus = false;
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean, reflect: true }) disabled = false;
	@property({ type: String }) rawPlaceholder = "";
	@property({ type: String }) placeholder = "";
	@property({ type: String }) errorMessage = "";
	@property({ type: String }) pattern?: string;
	@property({ type: Boolean }) noHover = false;
	@property({ type: String }) label = "";
	@property({ type: Number }) countChar = 0;
	@property({ type: Boolean }) charCounter = false;
	@property({ type: Boolean }) invalid = false;
	@property({ type: Boolean }) active = false;
	@property({ type: String }) value = "";

	@property({ type: Number }) rows = 1;
	@property({ type: Boolean }) autocorrect = false;

	@state() isEmpty = true;
	__isFirstValueUpdate = true;

	render() {
		return html`
			<div class="inbody">
				${this.label ? html`<label for="input" class="label">${this.label}</label>` : html``}

				<div id="container" class=${classMap({ "has-value": !this.isEmpty, error: this.invalid, active: this.active })}>
					<div class="row">
						<slot name="prefix"></slot>
						<div class="row">
							${this.errorMessage && html`<label class="float-label error" for="input" aria-live="assertive">${this.errorMessage}</label>`}
							${this.placeholder && html`<label class="float-label" for="input" aria-live="assertive">${this.placeholder}</label>`}
							<ct-textarea-autogrow
								id="input"
								class=${classMap({ "has-value": !this.isEmpty, error: this.invalid && !!this.errorMessage })}
								@focus="${this._onFocus}"
								@blur="${this._onBlur}"
								@input="${this._onInput}"
								@keypress=${this._handleKeyPress}
								.rows="${this.rows}"
								.placeholder="${this.placeholder || this.rawPlaceholder}"
								?autofocus="${this.autofocus}"
								?readonly="${this.readonly}"
								inputMode="${ifDefined(this.inputmode)}"
								minlength="${ifDefined(this.minlength)}"
								maxlength="${ifDefined(this.maxlength)}"
								name="${ifDefined(this.name)}"
								autocapitalize="${ifDefined(this.autocapitalize)}"
								.value="${this.value}"
							></ct-textarea-autogrow>
							<slot name="suffix"></slot>
							${this.charCounter ? html`<div class="charCount">${this.countChar}/${this.maxlength > 1_000_000 ? "1000+" : this.maxlength}</div>` : ``}
						</div>
					</div>
					<div class="underline"></div>
				</div>
			</div>
		`;
	}

	firstUpdated() {
		this.dark = localStorage.theme == "dark";
		if (this.$input) {
			this.$input.value = this.value;
		}
		this.validate();
	}

	willUpdate(changedProperties: PropertyValues<this>) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("value")) {
			this.value ||= "";
			if (this.$input && this.$input.value != this.value) {
				this.$input.value = this.value ?? "";
			}
			if (this.placeholder) {
				this.isEmpty = this.value == "" || this.value == null;
			}
			this.countChar = this.value?.length || 0;
			this.internals?.setFormValue(this.value);
		}
	}

	_onInput() {
		this.value = this.$input.value;
		this.dispatchEvent(new CustomEvent("value", { detail: Object.assign(this.value, { value: this.value }) }));
	}

	focus() {
		this.$input?.focus();
	}

	_onFocus() {
		this.active = true;
		this.invalid = false;
		this.internals?.setValidity({});
	}

	_onBlur() {
		this.active = false;
		this.validate();
	}

	validate() {
		this.invalid = false;
		if (this.__isFirstValueUpdate) {
			this.__isFirstValueUpdate = false;
			if (this.$input?.value === undefined || this.$input?.value === "") return !this.invalid;
		}

		if (this.pattern) {
			let re = new RegExp(this.pattern);
			this.invalid = !re.test(this.$input?.value);
			if (this.invalid && this.errorMessage) {
				this.internals?.setValidity({ customError: true }, this.errorMessage);
			} else {
				this.internals?.setValidity({});
			}
		} else if (this.required) {
			this.invalid = !(this.$input?.value.length > 0 && this.$input?.value.length >= (this.minlength || 0));
		}
		return !this.invalid;
	}

	private _handleKeyPress(event: KeyboardEvent) {
		if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
			this.dispatchEvent(new Event("enter-pressed", { bubbles: true, composed: true }));
			const form = this.closest("form");
			form?.requestSubmit();
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-textarea": CtTextarea;
	}
}
