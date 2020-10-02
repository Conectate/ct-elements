import { CtLit, html } from '@conectate/ct-lit';
import '@conectate/ct-card/ct-card';
import { ConectateHistory, showCtDialog, CtDialog } from './ct-dialog';


export function showCtCardDialog(el: HTMLElement, id?: string, history?: ConectateHistory) {
    let cardDialog = document.createElement('ct-card-dialog') as CtCardDialog;
    cardDialog.el = el;
    cardDialog.dialog = showCtDialog(cardDialog, id, history);
    return cardDialog.dialog;
}
// @ts-ignore
window.showCtCardDialog = showCtCardDialog;

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
        position:relative;
        margin: 16px auto;
        overflow:auto;
        border-radius: 16px;
        background:var(--app-background,#FFF);
        box-shadow: 0 8px 16px 0 rgba(10,14,29,.02), 0 8px 40px 0 rgba(10,14,29,.06);
        color:var(--on-surface);
    }

    :host(::-webkit-scrollbar) {
        width: 9px;
    }

    :host(::-webkit-scrollbar-track) {
        border-radius: 8px;
    }

    :host(::-webkit-scrollbar-thumb) {
        background-color: var(--primary-color);
        outline: 1px solid slategrey;
        border-radius: 8px;
    }
</style>
${this.el}
`;
    }

    firstUpdated() {
        this.mapIDs();
    }
}

window.customElements.define('ct-card-dialog', CtCardDialog);