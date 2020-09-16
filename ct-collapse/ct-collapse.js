var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CtLit, customElement, html, property } from '@conectate/ct-lit/ct-lit';
import { sleep } from '@conectate/ct-helpers/ct-helpers';
let CtCollapse = class CtCollapse extends CtLit {
    constructor() {
        super(...arguments);
        this.opened = false;
        this.elems = [];
    }
    render() {
        return html `
<style>
    :host {
        display: block;
        transition: all 250ms;
        overflow: hidden;
    }

    :host(:not(.open)){
        max-height:0!important;
    }
</style>
<div>
<slot id="content"></slot>
</div>
`;
    }
    firstUpdated() {
        this.mapIDs();
        let elems = this.$.content.assignedNodes().filter((elem) => elem.nodeType == Node.ELEMENT_NODE);
        this.content = elems[0];
        if (elems.length > 1) {
            console.warn('`ct-collapse` can have a ONE child, you can wrap him in a <div>');
        }
    }
    update(map) {
        super.update(map);
        if (map.has('opened')) {
            this.calcMaxHeight(this.opened);
        }
    }
    toggle() {
        this.opened = !this.opened;
    }
    async calcMaxHeight(val) {
        if (this.content) {
            this.style.maxHeight = `${this.content.offsetHeight}px`;
            await sleep(50);
            this.classList.toggle('open', val);
            await sleep(250);
            this.style.maxHeight = ``;
        }
        else if (val) {
            await sleep(50);
            this.calcMaxHeight(val);
        }
    }
};
__decorate([
    property({ type: Boolean })
], CtCollapse.prototype, "opened", void 0);
CtCollapse = __decorate([
    customElement('ct-collapse')
], CtCollapse);
export { CtCollapse };
