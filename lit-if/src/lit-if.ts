import {LitElement, html} from 'lit-element';
/**
 * Lit-IF
 * @prop {Boolean} if - condition to show content
 */
export class LitIf extends LitElement {
    if: boolean = false;
    render() {
        return html`${this.if ? html`<slot></slot>` : html``}`;
    }

    static get properties() {
        return {
            'if': {type: Boolean}
        };
    }
}

window.customElements.define('lit-if', LitIf);

export function If(condition: boolean, template: any) {
    return condition ? template : '';
}