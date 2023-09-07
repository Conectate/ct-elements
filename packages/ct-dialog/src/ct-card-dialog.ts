import "@conectate/ct-card/ct-card";

import { CtLit, customElement, html } from "@conectate/ct-lit";

import { ConectateHistory, CtDialog, showCtDialog } from "./ct-dialog.js";

export function showCtCardDialog(el: HTMLElement, id?: string, history?: ConectateHistory) {
	let cardDialog = document.createElement("ct-card-dialog") as CtCardDialog;
	cardDialog.el = el;
	cardDialog.dialog = showCtDialog(cardDialog, id, history);
	return cardDialog.dialog;
}
// @ts-ignore
window.showCtCardDialog = showCtCardDialog;

@customElement("ct-card-dialog")
export class CtCardDialog extends CtLit {
	el!: any;
	dialog!: CtDialog;

	static get properties() {
		return {
			el: { type: Object }
		};
	}

	render() {
		return html`
			<style>
				:host {
					display: block;
					position: relative;
					margin: 16px auto;
					overflow: auto;
					border-radius: var(--border-radius, 16px);
					background: var(--color-background, #fff);
					box-shadow:
						0 8px 16px 0 rgba(10, 14, 29, 0.02),
						0 8px 40px 0 rgba(10, 14, 29, 0.06);
					color: var(--color-on-surface);
				}

				:host(::-webkit-scrollbar) {
					width: 9px;
				}

				:host(::-webkit-scrollbar-track) {
					border-radius: 8px;
				}

				:host(::-webkit-scrollbar-thumb) {
					background-color: var(--color-primary);
					outline: 1px solid slategrey;
					border-radius: 8px;
				}
			</style>
			${this.el}
		`;
	}
}
declare global {
	interface HTMLElementTagNameMap {
		"ct-card-dialog": CtCardDialog;
	}
}
