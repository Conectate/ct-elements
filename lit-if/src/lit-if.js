import { LitElement, html } from 'lit-element/lit-element';
/**
 * Lit-IF
 * @prop {Boolean} if - condition to show content
 */
export class LitIf extends LitElement {
    constructor() {
        super(...arguments);
        this.if = false;
    }
    render() {
        return html `${this.if ? html `<slot></slot>` : html ``}`;
    }
    static get properties() {
        return {
            'if': { type: Boolean }
        };
    }
}
window.customElements.define('lit-if', LitIf);
export function If(condition, template) {
    return condition ? template : '';
}
