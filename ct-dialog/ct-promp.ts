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
import { CtLit, html, unsafeHTML } from '@conectate/ct-lit';
import '@conectate/ct-card/ct-card';
import '@conectate/ct-button/ct-button';
import '@conectate/ct-input/ct-input';
import { showCtDialog, CtDialog } from './ct-dialog';

export function showCtPrompt(title: string, body: string, ok?: string, cancel?: string, neutral?: string): Promise<string | undefined> {
    let ctPromp = new CTPromp();
    ctPromp.ttl = title;
    ctPromp.body = body;
    ctPromp.ok = ok ? ok : 'OK';
    neutral && (ctPromp.neutral = neutral);
    cancel && (ctPromp.cancel = cancel);
    ctPromp.dialog = showCtDialog(ctPromp);
    return ctPromp.onResult();
}

export class CTPromp extends CtLit {
    body: string = "";
    ttl: string = "Title";
    ok: string = 'OK';
    neutral: string = '';
    cancel: string = 'Cancel';
    reject!: (reason?: any) => void;
    solve!: (param?: string | null) => void;
    dialog!: CtDialog;

    render() {
        return html`<style>
    :host {
        display: block;
    }

    .title {
        font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
        font-size: 1.5em;
        font-weight: 400;
        margin: 24px 24px 0;
    }

    .body {
        margin: 20px 24px 24px;
        color: #383838;
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

    paper-button {
        display: block;
        font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
        padding: 0.45em 1.7em;
        font-size: 0.95em;
        border-radius: 8px;
        text-transform: none;
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
        .buttons_vert .ok,.buttons_vert .cancel{
            margin-top: 8px;
        }
    }

    ct-card{
        display: flex;
        flex-direction: column;
        max-height: 80vh;
        margin: 0;
    }

    #in{
        display:block;
        margin-top:16px;
    }
</style>
<ct-card shadow border>
    <div class="title">
        ${this.ttl}
    </div>
    <div class="body" id="confirmBody">
        ${unsafeHTML(this.body)}
        <ct-input id="in"></ct-input>
    </div>

    
    <div id="buttons" class="buttons">
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
            cancel: { type: String },
        };
    }

    firstUpdated() {
        this.mapIDs();
        this.computeBtns(this.ok, this.neutral, this.cancel);
    }

    computeBtns(ok: string, neutral: string, cancel: string) {
        let auxok = ok || "", auxcancel = cancel || "", auxneutral = neutral || "";
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

    async okbtn(e : Event) {
        await this.dialog.closeDialog(e, 'click');
        this.solve(this.$.in.value);
    }

    async cancelbtn(e: Event) {
        await this.dialog.closeDialog(e, 'click');
        this.solve();
    }

    onResult() : Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            // @ts-ignore
            this.solve = resolve;
            this.reject = reject;
        })
    }
}

window.customElements.define('ct-promp', CTPromp);

// @ts-ignore
window.showCtPrompt = showCtPrompt;
// @ts-ignore
//window.showCtConfirmCupertino = showCtConfirmCupertino;