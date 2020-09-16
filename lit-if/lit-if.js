var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, property, customElement } from 'lit-element/lit-element';
/**
 * Lit-IF
 * @prop {Boolean} if - condition to show content
 */
let LitIf = class LitIf extends LitElement {
    constructor() {
        super(...arguments);
        this.if = false;
    }
    render() {
        return html `${this.if ? html `<slot></slot>` : ''}`;
    }
};
__decorate([
    property({ type: Boolean })
], LitIf.prototype, "if", void 0);
LitIf = __decorate([
    customElement('lit-if')
], LitIf);
export { LitIf };
