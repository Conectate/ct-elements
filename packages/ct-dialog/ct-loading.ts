import { CtLit, html } from '@conectate/ct-lit';
import '@conectate/ct-card/ct-card';
import { showCtDialog, CtDialog } from './ct-dialog';
import '@conectate/lit-if/lit-if';


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
    .l {
        background: url(https://www.gstatic.com/billing-ui/images/activityindicator/quantum_spinner_multicolored_87px_ae39165462d434417c9d93122bc4315c.gif);
        -webkit-background-size: contain;
        background-size: contain;
        display: inline-block;
        height: 44px;
        width: 44px;
        margin-right: 24px;
    }
</style>
<ct-card shadow border>
    <div class="card-content">
        <span class="body">
            <span class="l"></span>${this.ttl}...
        </span>
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


window.customElements.define('ct-loading', CtLoading);

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
export { CtDialog }
// @ts-ignore
window.showCtLoading = showCtLoading;