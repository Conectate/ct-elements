import "./ct-card.js";

import { ConectateHistory, CtDialog, showCtDialog } from "./ct-dialog.js";
import { CtLit, customElement, html } from "./ct-lit.js";

/**
 * Creates and displays a card-styled dialog with the specified content
 *
 * @param {HTMLElement} el - The HTML element to display within the card dialog
 * @param {string} [id] - Optional identifier for the dialog
 * @param {ConectateHistory} [history] - Optional history object for browser history integration
 * @returns {CtDialog} The created dialog instance
 */
export function showCtCardDialog(el: HTMLElement, id?: string, history?: ConectateHistory) {
	let cardDialog = document.createElement("ct-card-dialog") as CtCardDialog;
	cardDialog.el = el;
	cardDialog.dialog = showCtDialog(cardDialog, id, history);
	return cardDialog.dialog;
}
// @ts-ignore
window.showCtCardDialog = showCtCardDialog;

/**
 * ## `ct-card-dialog`
 * A card-styled dialog component that presents content in a card format.
 *
 * ### Usage
 * ```javascript
 * import { showCtCardDialog } from "./ct-dialog.js";
 *
 * // Create content for the card dialog
 * const content = document.createElement('div');
 * content.innerHTML = `
 *   <h2>Card Title</h2>
 *   <p>This is card content with nice styling.</p>
 *   <button>Close</button>
 * `;
 *
 * // Show the card dialog
 * const dialog = showCtCardDialog(content);
 *
 * // Close dialog when needed
 * dialog.close();
 * ```
 *
 * @group ct-elements
 * @element ct-card-dialog
 */
@customElement("ct-card-dialog")
export class CtCardDialog extends CtLit {
	/**
	 * The HTML element to display within the card dialog
	 */
	el!: any;

	/**
	 * Reference to the internal dialog instance
	 */
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
