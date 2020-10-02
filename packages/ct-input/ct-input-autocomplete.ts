import { CtLit, html, property } from "@conectate/ct-lit";
import { sleep } from "@conectate/ct-helpers";
import './ct-autocomplete-suggestions';
import './ct-input';

class CtInputAutocomplete extends CtLit {
	render() {
		return html`
<style>
	:host {
		display: inline-block;
		box-sizing: border-box;
		position: relative;
	}

	.input-wrapper {
		display: flex;
		flex-direction: row;
	}

	#autocompleteInput {
		flex: 1;
	}

	</style>

	<div class="input-wrapper" role="combobox"  aria-haspopup="true" aria-owns="suggestionsWrapper">
		<ct-input id="autocompleteInput" 
				.value="${this.text}" @value="${(e: any) => this.text = e.detail}"  
				.placeholder=${this.placeholder}
				.errorMessage=${this.errorMessage}
				?required=${this.required}
				@blur=${this.onBlur}
				.label="${this.label}">
			<slot name="prefix" slot="prefix"></slot>       
			<slot name="suffix" slot="suffix"></slot>
		</ct-input>
	</div>

	<ct-autocomplete-suggestions id="autocompleteSuggestions"
								.text="${this.text}"
								?remote=${this.remote}
								.renderItem=${this.renderItem} 
								.source="${this.source}">      
	</ct-autocomplete-suggestions>
`
	}

	@property({ type: String }) label = '';
	@property({ type: String }) placeholder = '';
	@property({ type: String }) errorMessage = '';
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean }) compute = false;
	@property({ type: Boolean }) remote = false;
	@property({ type: Number }) maxlength!:number;
	@property({ type: Array }) source: any[] = [];
	@property({ type: String }) textProperty = 'text';
	@property({ type: String }) valueProperty = 'value';
	@property({ type: String }) _text = '';
	@property({ type: Object }) _value = null;
	@property({ type: Object }) renderItem = (item: any, index: number) => html`<button>item ${index}</button>`

	async onBlur(){
		await sleep(500);
		this.$.autocompleteSuggestions.hiddeSugg();
	}

	get value() {
		return this._value;
	}

	set value(val) {
		if (this._value != val) {
			let old = this._value;
			this._value = val;
			this.requestUpdate('value', old);
			this.dispatchEvent(new CustomEvent('value', { detail: { value: val } }));
			// Si seteo un valor y este existe en el source entonces 
			for (let i = 0; this.compute && this.source && i < this.source.length; i++) {
				let el = this.source[i];
				if (val == el.value) {
					this.text = el.text;
					return;
				}
			}
		}
	}

	get text() {
		return this._text;
	}

	set text(text) {
		if (this._text != text) {
			let old = this._text;
			this._text = text;
			this.requestUpdate('text', old)
			this.dispatchEvent(new CustomEvent('text', { detail: { value: text } }));
			for (let i = 0; this.compute && this.source && i < this.source.length; i++) {
				let el = this.source[i];
				if (text == el.text) {
					this.value = el.value;
					return;
				}
			}
		}
	}

	validate(){
		return true;
	}

	// Element Lifecycle
	firstUpdated() {
		this.mapIDs();

	}

}

window.customElements.define('ct-input-autocomplete', CtInputAutocomplete);