var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CtLit, html, property } from '@conectate/ct-lit/ct-lit';
class CtSpinner extends CtLit {
    constructor() {
        super(...arguments);
        this.active = true;
    }
    render() {
        return html `
<style>
    :host {
        display: inline-block;
        height: 44px;
        width: 44px;
    }
    .l {
        background: url(https://www.gstatic.com/billing-ui/images/activityindicator/quantum_spinner_multicolored_87px_ae39165462d434417c9d93122bc4315c.gif);
        -webkit-background-size: contain;
        background-size: contain;
        background-repeat: no-repeat;
        display: inline-block;
        height: inherit;
        width: inherit;
        margin-right: 24px;
    }
</style>
${this.active ? html `<span class="l"></span>` : ''}
`;
    }
}
__decorate([
    property({ type: Boolean })
], CtSpinner.prototype, "active", void 0);
window.customElements.define('ct-spinner', CtSpinner);
