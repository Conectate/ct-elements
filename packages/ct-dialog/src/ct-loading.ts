import '@conectate/lit-if';
import '@conectate/ct-card';
import '@conectate/ct-spinner';

import { CtLit, customElement, html } from '@conectate/ct-lit';

import { CtDialog, showCtDialog } from './ct-dialog';

@customElement('ct-loading')
export class CtLoading extends CtLit {
	ttl: string = 'Loading';
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
		'ct-loading': CtLoading;
	}
}

/**
 * This shows a dialogue box with a spinner and the text "loading"
 * @param {string} [id] - If one wants to set an explicit ID to the dialog, otherwise one will automatically be generated
 * @param {string} [str] - String to show in loading
 */
export function showCtLoading(id?: string, str?: string): CtDialog {
	let ctConfirm = document.createElement('ct-loading') as CtLoading;
	if (str) ctConfirm.ttl = str;
	ctConfirm.dialog = showCtDialog(ctConfirm, id);
	return ctConfirm.dialog;
}
export { CtDialog };
// @ts-ignore
window.showCtLoading = showCtLoading;
