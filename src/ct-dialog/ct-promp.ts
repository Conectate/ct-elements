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

import "../ct-button/ct-button.js";
import "../ct-card/ct-card.js";
import "../ct-input/ct-input.js";
import "../ct-input/ct-textarea.js";

import { CtLit, css, customElement, html, property, query } from "../ct-lit/ct-lit.js";
import { TemplateResult } from "lit";

import { CtDialog, showCtDialog } from "./ct-dialog.js";

/**
 * Displays a prompt dialog with an input field and returns user input
 *
 * @param {string} title - Dialog title
 * @param {string|TemplateResult} body - Content to display in the dialog
 * @param {string} [ok="OK"] - Text for the positive button
 * @param {string} [cancel="Cancel"] - Text for the negative button (will not display if not provided)
 * @param {string} [neutral] - Text for the neutral button (will not display if not provided)
 * @param {Object} [options] - Additional options
 * @param {boolean} [options.wordwrap=false] - Whether to allow text wrapping in the body
 * @param {string} [options.value] - Initial value for the input field
 * @param {string} [options.label] - Label for the input field
 * @param {string} [options.placeholder] - Placeholder text for the input field
 * @param {string} [options.rawplaceholder] - Raw placeholder text for the input field
 * @returns {Promise<string|undefined>} Promise that resolves with the input value, or undefined if canceled
 *
 * @example
 * ```javascript
 * // Basic prompt
 * const name = await showCtPrompt("Enter Name", "Please enter your name:");
 *
 * // Prompt with custom buttons and initial value
 * const email = await showCtPrompt(
 *   "Email Address",
 *   "Please provide your email:",
 *   "Submit",
 *   "Cancel",
 *   undefined,
 *   { label: "Email", placeholder: "user@example.com" }
 * );
 *
 * if (email) {
 *   console.log("Email provided:", email);
 * } else {
 *   console.log("User canceled prompt");
 * }
 * ```
 */
export function showCtPrompt(
	title: string,
	body: string | TemplateResult,
	ok?: string,
	cancel?: string,
	neutral?: string,
	options?: { wordwrap?: boolean; value?: string; label?: string; placeholder?: string; rawplaceholder?: string; textarea?: boolean }
): Promise<string | undefined> {
	let ctPromp = new CTPromp();

	ctPromp.ttl = title;
	ctPromp.body = body;
	ctPromp.ok = ok ? ok : "OK";
	ctPromp.options = options;
	ctPromp.wordwrap = options?.wordwrap || false;
	neutral && (ctPromp.neutral = neutral);
	cancel && (ctPromp.cancel = cancel);
	ctPromp.dialog = showCtDialog(ctPromp);
	return ctPromp.onResult();
}

/**
 * ## `ct-promp`
 * A dialog component that displays a prompt with an input field for user input.
 *
 * This component is typically used through the `showCtPrompt` function rather than directly.
 *
 * @group ct-elements
 * @element ct-promp
 */
@customElement("ct-promp")
class CTPromp extends CtLit {
	/**
	 * Content to display in the dialog
	 */
	@property({ type: String }) body: string | TemplateResult = "";

	/**
	 * Dialog title text
	 */
	@property({ type: String }) ttl: string = "Title";

	/**
	 * Text for the positive button
	 */
	@property({ type: String }) ok: string = "OK";

	/**
	 * Text for the neutral button (not displayed if empty)
	 */
	@property({ type: String }) neutral?: string = "";

	/**
	 * Text for the negative button (not displayed if empty)
	 */
	@property({ type: String }) cancel?: string = "Cancel";

	/**
	 * Whether to allow text wrapping in the body
	 */
	@property({ type: Boolean, reflect: true }) wordwrap: boolean = false;

	/**
	 * Additional configuration options
	 */
	@property({ type: Object }) options?: { wordwrap?: boolean; value?: string; label?: string; placeholder?: string; rawplaceholder?: string; textarea?: boolean };

	/**
	 * Reference to the buttons container
	 */
	@query("#buttons") $buttons!: HTMLDivElement;

	/**
	 * Reference to the neutral button
	 */
	@query("#neutral") $neutral!: HTMLButtonElement;

	/**
	 * Reference to the cancel button
	 */
	@query("#cancel") $cancel!: HTMLButtonElement;

	/**
	 * Reference to the input field
	 */
	@query("#in") $in!: HTMLElementTagNameMap["ct-textarea"];

	/**
	 * Function to reject the promise
	 * @private
	 */
	reject!: (reason?: any) => void;

	/**
	 * Function to resolve the promise
	 * @private
	 */
	solve!: (param?: string) => void;

	/**
	 * Reference to the dialog instance
	 */
	dialog!: CtDialog;

	static styles = [
		css`
			:host {
				display: block;
			}

			.title {
				font-family: "Google Sans", "Ubuntu", "Roboto", sans-serif;
				font-size: 1.5em;
				font-weight: 400;
				margin: 24px 24px 0;
			}

			.body {
				margin: 20px 24px 24px;
				color: var(--color-on-surface, #fff);
				max-height: 62vh;
				overflow: hidden auto;
			}
			:host([wordwrap]) .body {
				white-space: pre-wrap;
				word-wrap: break-word;
			}
			.actions {
				margin: 0 16px;
			}

			.buttons {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				color: var(--color-primary);
				font-weight: bold;
				padding: 16px;
			}

			#ok {
				color: var(--color-on-primary, #fff);
			}

			a {
				text-decoration: none;
				color: var(--color-primary);
			}

			@media (max-width: 800px) {
				.buttons_vert {
					flex-direction: column;
					text-align: right;
				}
				.buttons_vert .ok,
				.buttons_vert .cancel {
					margin-top: 8px;
				}
			}

			ct-card {
				display: flex;
				flex-direction: column;
				max-height: 80vh;
				margin: 0;
			}

			#in {
				display: block;
			}
		`
	];
	render() {
		return html`
			<ct-card shadow decorator>
				<div class="title">${this.ttl}</div>
				<div class="body">${this.body}</div>
				<div class="actions">${this.options?.textarea ? html`<ct-textarea id="in"></ct-textarea>` : html`<ct-input id="in"></ct-input>`}</div>
				<div id="buttons" class="buttons">
					<ct-button id="cancel" @click="${this.cancelbtn}" shadow>${this.cancel}</ct-button>
					<ct-button id="ok" @click="${this.okbtn}" raised>${this.ok}</ct-button>
				</div>
			</ct-card>
		`;
	}
	firstUpdated() {
		this.computeBtns(this.ok, this.neutral, this.cancel);
		if (this.options?.label) {
			this.$in.label = this.options.label;
		}
		if (this.options?.value) {
			this.$in.value = this.options.value;
		}
		if (this.options?.placeholder) {
			this.$in.placeholder = this.options.placeholder;
		}
		if (this.options?.rawplaceholder) {
			this.$in.rawPlaceholder = this.options.rawplaceholder;
		}
	}

	computeBtns(ok: string, neutral?: string, cancel?: string) {
		let auxok = ok || "",
			auxcancel = cancel || "",
			auxneutral = neutral || "";
		if (neutral == null) {
			this.$neutral.style.display = "none";
		}
		if (auxneutral.length > 15 || auxok.length > 15 || auxcancel.length > 15) {
			this.$buttons.classList.add("buttons_vert");
		}
		if (cancel == null) {
			this.$cancel.style.display = "none";
		}
	}

	async okbtn(e: Event) {
		await this.dialog.close(e, "click");
		this.solve(this.$in.value);
	}

	async cancelbtn(e: Event) {
		await this.dialog.close(e, "click");
		this.solve();
	}

	onResult(): Promise<string | undefined> {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			this.solve = resolve;
			this.reject = reject;
		});
	}
}
declare global {
	interface HTMLElementTagNameMap {
		"ct-promp": CTPromp;
	}
}
