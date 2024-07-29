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

import "@conectate/ct-button";
import "@conectate/ct-card";
import "@conectate/ct-input";

import { CtLit, css, customElement, html, property, query } from "@conectate/ct-lit";
import { TemplateResult } from "lit";

import { CtDialog, showCtDialog } from "./ct-dialog.js";

export function showCtPrompt(title: string, body: string, ok?: string, cancel?: string, neutral?: string, options?: { wordwrap?: boolean }): Promise<string | undefined> {
	let ctPromp = new CTPromp();

	ctPromp.ttl = title;
	ctPromp.body = body;
	ctPromp.ok = ok ? ok : "OK";
	ctPromp.wordwrap = options?.wordwrap || false;
	neutral && (ctPromp.neutral = neutral);
	cancel && (ctPromp.cancel = cancel);
	ctPromp.dialog = showCtDialog(ctPromp);
	return ctPromp.onResult();
}

@customElement("ct-promp")
class CTPromp extends CtLit {
	@property({ type: String }) body: string | TemplateResult = "";
	@property({ type: String }) ttl: string = "Title";
	@property({ type: String }) ok: string = "OK";
	@property({ type: String }) neutral?: string = "";
	@property({ type: String }) cancel?: string = "Cancel";
	@property({ type: Boolean, reflect: true }) wordwrap: boolean = false;
	@query("#buttons") $buttons!: HTMLDivElement;
	@query("#neutral") $neutral!: HTMLButtonElement;
	@query("#cancel") $cancel!: HTMLButtonElement;
	@query("#in") $in!: HTMLInputElement;
	reject!: (reason?: any) => void;
	solve!: (param?: string | null) => void;
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
				color: var(--color-surface, #383838);
				max-height: 62vh;
				overflow: hidden auto;
			}
			:host([wordwrap]) .body {
				white-space: pre-wrap;
				word-wrap: break-word;
			}
			.actions {
				margin: 20px 24px 24px;
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
				<div class="actions">
					<ct-input id="in"></ct-input>
				</div>
				<div id="buttons" class="buttons">
					<ct-button id="cancel" @click="${this.cancelbtn}" shadow>${this.cancel}</ct-button>
					<ct-button id="ok" @click="${this.okbtn}" raised>${this.ok}</ct-button>
				</div>
			</ct-card>
		`;
	}
	firstUpdated() {
		this.computeBtns(this.ok, this.neutral, this.cancel);
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
