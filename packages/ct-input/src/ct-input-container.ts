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

import { CtLit, customElement, property, query, state } from "@conectate/ct-lit";
import { css, html } from "lit";
/**
 * `ct-input-container`
 * Input element
 *
 *
 * @group ct-elements
 * @element ct-input-container
 * @demo demo/index.html
 * @hero hero.svg
 * @homepage wc.conectate.app
 */
@customElement("ct-input-container")
export class CtInputContainer extends CtLit {
	static styles = [
		css`
			:host {
				display: inline-block;
				margin-bottom: 8px;
				color: var(--color-on-surface, #535353);
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
				content: var(--ct-indicator, "*");
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
				border-radius: var(--border-radius, 16px);
				background: rgba(121, 130, 142, 0.1);
				color: var(--color-on-surface, #535353);
				transition: all 0.2s;
				padding: var(--ct-input-padding, 0em 1em);
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
			::slotted([slot="suffix"]) {
				display: inline-block;
			}

			::slotted([slot="prefix"]) {
				display: inline-block;
				padding-right: 0.5em;
			}
			::slotted([slot="input"]) {
				height: var(--ct-input-height, 3.3em);
				box-sizing: border-box;
			}

			::slotted(input) {
				height: var(--ct-input-height, 3.3em);
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
				caret-color: var(--color-primary, #2cb5e8);
			}

			input:invalid {
				outline: none;
			}

			#container.has-value ::slotted([slot="input"]) {
				padding: 1.4em 0 0.6em;
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
	@query("#container") container!: HTMLElement;
	@state() private__isFirstValueUpdate = true;
	@property({ type: Boolean }) focused = false;

	/**
	 * The value of the searchbox
	 */
	@property({ type: String }) value = "";

	/**
	 * Placeholder text when searchbox is empty
	 */
	@property({ type: String }) placeholder = "";

	/**
	 * Input type
	 */
	@property({ type: String }) type = "text";

	@state() private _invalid = false;

	/**
	 * Mensaje de error al no complir con el pattern
	 */
	@property({ type: String }) errorMessage = "";
	@property({ type: String }) label = "";
	@property({ type: String }) autocorrect = "off";
	@property({ type: String }) autocapitalize = "none";
	@property({ type: Boolean }) noHover = false;
	@property({ type: Boolean }) charCounter = false;
	@property({ type: Number }) countChar = 0;
	@property({ type: Number }) size = 30;
	@property({ type: Number }) minlength = 0;
	@property({ type: Number }) maxlength = 5000;
	@property({ type: Number }) min = this.minlength;
	@property({ type: Number }) max = this.maxlength;

	/**
	 * Cuando Hago focus en el input
	 * @private
	 */
	_onFocus() {
		this.container.classList.add("active");
		this.container.classList.remove("error");
		this.focused = true;
	}

	/**
	 * Cuando dejo de enfocar el element
	 * @private
	 */
	_onBlur() {
		this.container.classList.remove("active");
		this.focused = false;
	}

	set invalid(val) {
		if (this.container == null) {
			return;
		}
		this._invalid = val;
		if (!val) {
			// remover error
			this.container.classList.remove("error");
		} else {
			this.container.classList.add("error");
		}
	}

	get invalid() {
		return this._invalid;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-input-container": CtInputContainer;
	}
}
