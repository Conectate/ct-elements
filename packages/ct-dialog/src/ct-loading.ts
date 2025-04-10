import "@conectate/ct-card";
import "@conectate/ct-spinner";
import "@conectate/lit-if";

import { CtLit, customElement, html } from "@conectate/ct-lit";

import { CtDialog, showCtDialog } from "./ct-dialog.js";

/**
 * ## `ct-loading`
 * A dialog component that displays a loading spinner with customizable text.
 *
 * ### Usage
 * ```javascript
 * import { showCtLoading } from '@conectate/ct-dialog';
 *
 * // Show a loading dialog
 * const loadingDialog = showCtLoading();
 *
 * // Show a loading dialog with custom text
 * const customLoadingDialog = showCtLoading(undefined, 'Processing');
 *
 * // Close the dialog when operation completes
 * loadingDialog.close();
 * ```
 *
 * @group ct-elements
 * @element ct-loading
 */
@customElement("ct-loading")
export class CtLoading extends CtLit {
	/**
	 * Text to display next to the spinner
	 */
	ttl: string = "Loading";

	/**
	 * Reference to the internal dialog instance
	 */
	dialog!: CtDialog;

	render() {
		return html`
			<style>
				:host {
					display: block;
				}
				.body {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin: 0 auto;
				}
				ct-spinner {
					margin-right: 24px;
				}
			</style>
			<ct-card shadow decorator>
				<div class="card-content">
					<span class="body"> <ct-spinner></ct-spinner>${this.ttl}... </span>
				</div>
			</ct-card>
		`;
	}

	static get properties() {
		return {
			ttl: { type: String }
		};
	}
}
declare global {
	interface HTMLElementTagNameMap {
		"ct-loading": CtLoading;
	}
}

/**
 * Displays a loading dialog with a spinner and optional custom text
 *
 * @param {string} [id] - Optional identifier for the dialog
 * @param {string} [str] - Optional custom text to display (default: "Loading")
 * @returns {CtDialog} The created dialog instance
 *
 * @example
 * ```javascript
 * // Display a loading dialog
 * const dialog = showCtLoading();
 *
 * // Do some async operation
 * await someAsyncOperation();
 *
 * // Close the loading dialog when complete
 * dialog.close();
 * ```
 */
export function showCtLoading(id?: string, str?: string): CtDialog {
	let ctConfirm = document.createElement("ct-loading") as CtLoading;
	if (str) ctConfirm.ttl = str;
	ctConfirm.dialog = showCtDialog(ctConfirm, id);
	return ctConfirm.dialog;
}

/**
 * Displays a loading dialog and returns the CtLoading instance
 *
 * @param {string} [id] - Optional identifier for the dialog
 * @param {string} [str] - Optional custom text to display (default: "Loading")
 * @returns {CtLoading} The created CtLoading instance
 */
export function showCtLoading2(id?: string, str?: string): CtLoading {
	let ctConfirm = document.createElement("ct-loading") as CtLoading;
	if (str) ctConfirm.ttl = str;
	ctConfirm.dialog = showCtDialog(ctConfirm, id);
	return ctConfirm;
}
export { CtDialog };
// @ts-ignore
window.showCtLoading = showCtLoading;
