import { CtLit, html, property } from "@conectate/ct-lit";

class CtInputWrapper extends CtLit {
    @property({ type: String }) type: "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "submit" | "image" | "reset" | "button" = 'file';
    @property({ type: String }) accept = 'text';
    @property({ type: Boolean }) multiple = false;
    

    render() {
        return html`
<style>
    :host {
        display: block;
        position: relative;
    }

    #inputElement {
        bottom: 0;
        height: 100%;
        left: 0;
        margin: 0;
        opacity: 0;
        padding: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: 100%;
    }
</style>
<slot></slot>
<input @change=${this.callOnChange} .type="${this.type}" .accept="${this.accept}" id="inputElement" ?multiple=${this.multiple}>`;
    }


    firstUpdated() {
        this.mapIDs();
    }

    callOnChange(e: any) {
        const files = (this.$.inputElement as HTMLInputElement).files;
        if (files && files.length > 0) {
            this.dispatchEvent(new CustomEvent('files', {
                detail: { files: files }
            }));
        }
    }

    clear(){
        this.$.inputElement.value = '';
    }

}

window.customElements.define('ct-input-wrapper', CtInputWrapper);