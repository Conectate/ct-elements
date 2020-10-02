import { CtLit, customElement, html, property } from '@conectate/ct-lit';
import { sleep } from '@conectate/ct-helpers';
// @ts-ignore
import { live } from '@open-wc/lit-helpers'

@customElement('ct-collapse')
export class CtCollapse extends CtLit {
    @property({ type: Boolean}) opened = false;
    content: any;
    elems: any[] = [];
    render() {
        return html`
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
        let elems = (this.$.content.assignedNodes() as HTMLElement[]).filter((elem) => elem.nodeType == Node.ELEMENT_NODE);
        this.content = elems[0];
        if (elems.length > 1) {
            console.warn('`ct-collapse` can have a ONE child, you can wrap him in a <div>')
        }
    }

    update(map: Map<PropertyKey, any>) {
        super.update(map);
        if (map.has('opened')) {
            this.calcMaxHeight(this.opened);
        }
    }

    toggle() {
        this.opened = !this.opened;
    }

    async calcMaxHeight(val: boolean) {
        if (this.content) {
            this.style.maxHeight = `${this.content.offsetHeight}px`;
            await sleep(50);
            this.classList.toggle('open', val);
            await sleep(250);
            this.style.maxHeight = ``;
        } else if (val) {
            await sleep(50);
            this.calcMaxHeight(val);
        }
    }
}