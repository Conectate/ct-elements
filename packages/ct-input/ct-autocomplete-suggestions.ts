import { CtLit, html, property } from "@conectate/ct-lit";
import '@conectate/ct-card/ct-card'

/* var DIRECTION = {
    UP: 'up',
    DOWN: 'down'
};

var KEY_CODES = {
    LEFT_ARROW: 37,
    RIGHT_ARROW: 39,
    UP_ARROW: 38,
    DOWN_ARROW: 40,
    ENTER: 13,
    ESCAPE: 27
}; */

export class CtAutocompleteSuggestions extends CtLit {
    render() {
        return html`<style>
    .wrapper {
        position: absolute;
        width: 100%;
        z-index: 1000;
        background-color: var(--app-surface);
        color: var(--on-surface);
        max-height: 252px;
        overflow-y: auto;
        box-shadow: 0 4px 28px 4px rgba(0, 0, 0, 0.4);
        margin: 0;
        opacity: 0;        
        transform: scale(0);
        transition: all 200ms;
    }

    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
        .wrapper {
            background: var(--app-blur-surface, rgba(255, 255, 255, 0.5));
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
    }
    
    .wrapper:not(:empty) {
        opacity: 1;
        transform-origin: center top 0px;
        transform: scale(1);
    } 

    .wrapper::-webkit-scrollbar {
        width: 6px;
    }

    .wrapper::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    .wrapper::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
        border-radius: 8px;
    }

</style>
<div>
    <!-- unselectable is needed to fix an issue related to the focus being taken away when clicking in the
    results scrollbar -->
    <ct-card shadow class="wrapper" id="suggestionsWrapper">     
        ${(this.queryFn(this.source, this.text)).map((item, index) => html`<div @click=${this.onClickTemplate}>${this.renderItem(item, index)}</div>`)}   
    </ct-card>        
</div>
`
    }

    @property({ type: Object }) renderItem = (item: any, index: number) => html`<button>item ${index}</button>`
    @property({ type: Array }) source: any[] = [];
    @property({ type: Array }) queryResult: any[] = [];
    @property({ type: String }) text = '';
    @property({ type: Boolean }) remote = false;
    @property({ type: Object }) klasses = {
        wrapper: true,
        active: false
    }

    onClickTemplate() {
        this.klasses = {
            wrapper: true,
            active: false
        }
        this.hiddeSugg();
    }

    hiddeSugg() {
        this.source = [];
    }

    /**
     * Query function is called on each keystroke to query the data source and returns the suggestions that matches
     * with the filtering logic included.
     * @param {Array} datasource An array containing all items before filtering
     * @param {string} query Current value in the input field
     * @returns {Array} an array containing only those items in the data source that matches the filtering logic.
     */
    queryFn(datasource: any[], query: string) {
        this.queryResult = [];
        if (this.remote) {
            return datasource;
        }
        if (datasource == null) {
            return this.queryResult;
        }
        datasource.forEach((item: { text: string, value: any }) => {
            var objText, objValue;
            if (typeof item == 'object') {
                objText = item.text;
                objValue = item.value;
            } else {
                objText = objValue = item;
            }
            query = this.removeAcento(query).toLowerCase();
            let temp = this.removeAcento(objText).toLowerCase();
            if (query.length > 0 && temp.indexOf(query) > -1) {
                // NOTE: the structure of the result object matches with the current template. For custom templates, you
                // might need to return more data
                this.queryResult.push({
                    text: objText,
                    value: objValue
                });
            }
        });
        console.log('filtro');
        return this.queryResult;
    }

    /**
     * Elimina el acento de la entrada
     * @param {string} input A string to convert
     * @returns {string} An raw string.
     */
    removeAcento(input: string): string {
        // Cadena de caracteres original a sustituir.
        let original = "áàäêéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ";
        // Cadena de caracteres ASCII que reemplazarán los originales.
        let ascii = "aaaeeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
        let output = input;
        for (let i = 0; i < original.length; i++) {
            // Reemplazamos los caracteres especiales.
            output = output.replace(original.charAt(i), ascii.charAt(i));
        }
        return output;
    }

}


window.customElements.define('ct-autocomplete-suggestions', CtAutocompleteSuggestions);