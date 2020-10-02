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
import { CtLit, html } from '@conectate/ct-lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import '@conectate/ct-button/ct-button';
import '@conectate/ct-card/ct-card';
import { showCtDialog, CtDialog } from './ct-dialog';
import { getClient } from '@conectate/ct-helpers';

export function showCtConfirm(title: string, body: string, ok?: string, cancel?: string, neutral?: string, options?: { history?: boolean }) {
	let client = getClient();
	// Si el OS es de Apple
	// let ctConfirm = client.os == 'mac' || client.os == 'ios' ? new CTConfirmCupertino() : new CTConfirm();
	let ctConfirm = new CTConfirmCupertino();
	ctConfirm.ttl = title;
	ctConfirm.body = body;
	ctConfirm.ok = ok ? ok : 'Ok';
	neutral && (ctConfirm.neutral = neutral);
	cancel && (ctConfirm.cancel = cancel);
	ctConfirm.dialog = showCtDialog(ctConfirm).enableHistoryAPI(options?.history ?? true);
	return ctConfirm.onResult();
}

export function showCtConfirmCupertino(title: string, body: string, ok?: string, cancel?: string, neutral?: string) {
	let ctConfirm = new CTConfirmCupertino();
	ctConfirm.ttl = title;
	ctConfirm.body = body;
	ctConfirm.ok = ok ? ok : 'Ok';
	neutral && (ctConfirm.neutral = neutral);
	ctConfirm.cancel = cancel ? cancel : 'Cancel';
	ctConfirm.dialog = showCtDialog(ctConfirm);
	return ctConfirm.onResult();
}

export class CTConfirm extends CtLit {
	body: string = '';
	ttl: string = 'Title';
	ok: string = 'OK';
	neutral!: string;
	cancel!: string;
	reject!: (reason?: any) => void;
	solve!: (param: boolean | null | undefined) => void;
	dialog!: CtDialog;
	render() {
		return html`
			<style>
				:host {
					display: block;
					max-width: 19cm !important;
				}

				.title {
					font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
					font-size: 1.5em;
					font-weight: 400;
					margin: 24px 24px 0;
				}

				.body {
					margin: 20px 24px 24px;
					color: var(--medium-emphasis);
					white-space: pre-wrap;
					word-wrap: break-word;
					max-height: 62vh;
					overflow: hidden auto;
				}

				.flex {
					flex: 1;
				}

				.buttons {
					color: var(--primary-color);
					display: flex;
					flex-direction: row;
					text-align: center;
					font-weight: bold;
					padding: 16px;
				}

				#ok {
					color: #fff;
				}

				a {
					text-decoration: none;
					color: var(--primary-color);
				}

				@media (max-width: 800px) {
					.buttons_vert {
						flex-direction: column;
						text-align: right;
					}
					.buttons_vert #ok,
					.buttons_vert #cancel {
						margin-top: 8px;
					}
				}

				ct-card {
					display: flex;
					flex-direction: column;
					max-height: 80vh;
					margin: 0;
				}
			</style>
			<ct-card shadow border>
				<div class="title">
					${this.ttl}
				</div>
				<div class="body" id="confirmBody"></div>
				<div id="buttons" class="buttons">
					<ct-button id="neutral" @click="${this.neutralbtn}">${this.neutral}</ct-button>
					<div class="flex"></div>
					<ct-button id="cancel" @click="${this.cancelbtn}" shadow>${this.cancel}</ct-button>
					<ct-button id="ok" @click="${this.okbtn}" raised>${this.ok}</ct-button>
				</div>
			</ct-card>
		`;
	}

	static get properties() {
		return {
			body: { type: String },
			ttl: { type: String },
			ok: { type: String },
			neutral: { type: String },
			cancel: { type: String }
		};
	}

	firstUpdated() {
		this.$.cancel = this._('cancel');
		this.$.neutral = this._('neutral');
		this.$.confirmBody = this._('confirmBody');
		this.$.buttons = this._('buttons');

		this.computeBtns(this.ok, this.neutral, this.cancel);
		this.computeBody(this.body);
	}

	computeBtns(ok: string, neutral: string, cancel: string) {
		let auxok = ok || '',
			auxcancel = cancel || '',
			auxneutral = neutral || '';
		if (neutral == null) {
			this.$.neutral.style.display = 'none';
		}
		if (auxneutral.length > 15 || auxok.length > 15 || auxcancel.length > 15) {
			this.$.buttons.classList.add('buttons_vert');
		}
		if (cancel == null) {
			this.$.cancel.style.display = 'none';
		}
	}

	computeBody(body: string) {
		this.$.confirmBody.innerHTML = body;
		return body;
	}

	async okbtn(e: Event) {
		await this.dialog.closeDialog(e, 'click');
		this.solve(true);
	}

	async cancelbtn(e: Event) {
		await this.dialog.closeDialog(e, 'click');
		this.solve(false);
	}

	async neutralbtn(e: Event) {
		await this.dialog.closeDialog(e, 'click');
		this.solve(null);
	}

	onResult(): Promise<boolean | undefined> {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			this.solve = resolve;
			this.reject = reject;
		});
	}
}

export class CTConfirmCupertino extends CtLit {
	body: string = '';
	ttl: string = 'Title';
	ok: string = 'OK';
	neutral!: string;
	cancel!: string;
	reject!: (reason?: any) => void;
	solve!: (param: boolean | null | undefined) => void;
	dialog!: CtDialog;

	render() {
		return html`
			<style>
				:host {
					display: block;
					min-width: 276px !important;
					max-width: 400px !important;
					font-family: SFText, Helvetica, 'Google Sans', 'Ubuntu', sans-serif;
					display: block;
					max-height: 80vh;
					margin: 0;
					border-radius: 12px;
					background-color: var(--app-background, rgba(255, 255, 255, 0.85));
				}

				@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
					:host {
						background-color: var(--app-blur, rgba(255, 255, 255, 0.72));
						backdrop-filter: saturate(180%) blur(20px);
						-webkit-backdrop-filter: saturate(180%) blur(20px);
					}
				}

				.container {
					padding: 24px;
				}

				#title {
					font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
					font-size: 17px;
					color: var(--high-emphasis, #303030);
					font-weight: 600;
					text-align: center;
					margin: 0 0 4px;
				}

				.body {
					color: var(--on-background, #474747);
					font-size: 13px;
					text-align: center;
					white-space: pre-wrap;
					word-wrap: break-word;
					max-height: 60vh;
					overflow: hidden auto;
				}

				.flex {
					flex: 1;
				}

				.buttons {
					color: var(--primary-color);
					display: flex;
					flex-direction: row-reverse;
					text-align: center;
				}

				.btn {
					cursor: pointer;
					padding: 11px 20px;
					font-size: 17px;
					/* color: rgb(24, 126, 251); */
					border-top: 1px solid var(--on-surface-dividers);
					border-left: 1px solid var(--on-surface-dividers);
					flex: 1;
				}

				#cancel {
					font-weight: bold;
				}

				a {
					text-decoration: none;
					color: var(--primary-color);
				}

				.buttons_vert {
					flex-direction: column;
				}

				.buttons_vert .ok,
				.buttons_vert .cancel {
					margin-top: 8px;
				}
				[tabindex]{
					outline:none;
				}
			</style>
			<div role="dialog" aria-labelledby="title" tabindex="-1">
				<div class="container">
					<h2 id="title">
						${this.ttl}
					</h2>
					<div class="body" id="confirmBody">${unsafeHTML(this.body)}</div>
				</div>
				<div id="buttons" class="buttons">
					<div class="btn" role="button" tabindex="0" id="neutral" @click="${this.neutralbtn}" aria-disabled="${!!this.neutral}">
						${this.neutral}
					</div>
					<div class="btn" role="button" tabindex="0" id="ok" @click="${this.okbtn}">${this.ok}</div>
					<div class="btn" role="button" tabindex="0" id="cancel" @click="${this.cancelbtn}">
						${this.cancel}
					</div>
				</div>
			</div>
		`;
	}

	static get properties() {
		return {
			body: { type: String },
			ttl: { type: String },
			ok: { type: String },
			neutral: { type: String },
			cancel: { type: String }
		};
	}
	firstUpdated() {
		this.mapIDs();
		this.$.buttons.focus();

		this.computeBtns(this.ok, this.neutral, this.cancel);
		//this.computeBody(this.body);
	}

	computeBtns(ok: string, neutral: string, cancel: string) {
		let auxok = ok || '',
			auxcancel = cancel || '',
			auxneutral = neutral || '';
		if (neutral == null) {
			this.$.neutral.style.display = 'none';
		}
		if (auxneutral.length > 15 || auxok.length > 15 || auxcancel.length > 15) {
			this.$.buttons.classList.add('buttons_vert');
		}
		if (cancel == null) {
			this.$.cancel.style.display = 'none';
		}
	}

	computeBody(body: string) {
		this.$.confirmBody.innerHTML = body;
		return body;
	}

	async okbtn(e: Event) {
		await this.dialog.closeDialog(e, 'click');
		this.solve(true);
	}

	async cancelbtn(e: Event) {
		await this.dialog.closeDialog(e, 'click');
		this.solve(false);
	}

	async neutralbtn(e: Event) {
		await this.dialog.closeDialog(e, 'click');
		this.solve(null);
	}

	onResult(): Promise<boolean | undefined> {
		return new Promise((resolve, reject) => {
			// @ts-ignore
			this.solve = resolve;
			this.reject = reject;
		});
	}
}

window.customElements.define('ct-confirm', CTConfirm);
window.customElements.define('ct-confirm-cupertino', CTConfirmCupertino);

// @ts-ignore
window.showCtConfirm = showCtConfirm;
// @ts-ignore
window.showCtConfirmCupertino = showCtConfirmCupertino;
