import { CtLit, customElement, html, property } from '@conectate/ct-lit';
import { showCtSelect } from './ct-select-dialog';
import { sleep } from '@conectate/ct-helpers';
import { TemplateResult } from 'lit-element';
import './ct-select-dialog';

export interface KeyValueCtSelect {
	text: string;
	value: any;
	[x: string]: any;
}
/**
 *
 *
 * @group Conectate Elements
 * @element ct-select
 * @demo demo/index.html
 * @hero hero.svg
 * @homepage wc.conectate.today
 * This is my element
 * @prop {KeyValueCtSelect[]} items - items of select
 * @fires value - Cuando el valor del select Cambia
 * @fires items - Cuando se setean nuevos items al element
 */
@customElement('ct-select')
export class CtSelect extends CtLit {
	@property({ type: Boolean, reflect: true }) disabled = false;
	@property({ type: String }) raw_placeholder = '';
	okPlaceholder: string;
	cancelPlaceholder: string;
	selectedPlaceholder: string;
	label: any;
	invalid: any;
	valuePlaceholder: string;
	placeholder: string;
	searchPlaceholder: string;
	preventClick: boolean;
	order: any;
	textProperty: string;
	valueProperty: string;
	multi: any;
	_value: any;
	_text: any;
	_items: any;
	ttl: string = '';
	searchable = false;
	required: boolean = false;
	renderItem?: (item: any, index: number, array: any[]) => TemplateResult;

	render() {
		return html`
			<style>
				:host {
					display: inline-block;
					margin-bottom: 8px;
					min-width: 250px;
					cursor: pointer;
					color: var(--on-surface, #535353);
				}
				:host > div {
					width: 100%;
				}
				:host([block]) {
					display: block;
				}

				:host([disabled]) {
					pointer-events: none;
					opacity: 0.33;
				}

				:host([hidden]) {
					display: none !important;
				}

				:host([required]) > #c > .label:after {
					content: var(--ct-indicator, '*');
					color: #ed4f32;
					margin-left: 4px;
					width: 1.5em;
					text-align: center;
				}

				#container:hover,
				#container:focus {
					background: rgba(26, 57, 96, 0.15);
				}

				#container {
					display: flex;
					flex-direction: row;
					align-items: center;
					position: relative;
					margin: 0 auto;
					border-radius: 16px;
					background: rgba(121, 130, 142, 0.1);
					transition: all 0.2s;
					padding: 0em 1em;
				}

				#container.error {
					background: rgba(255, 0, 45, 0.15);
				}

				#container.error > input::placeholder {
					color: #ed4f32 !important;
				}

				#container.active {
					background: rgba(26, 57, 96, 0.05);
				}

				::slotted(*),
				#container.has-value > .charCount {
					transition: all 0.2s;
				}

				::slotted([slot='prefix']) {
					display: inline-block;
					margin-right: 0.5em;
				}

				#input.has-value,
				#container.has-value > ::slotted([slot='prefix']) {
					padding-top: 1.1em;
				}

				input:invalid {
					outline: none;
				}

				#input {
					height: 3.3em;
					box-sizing: border-box;
					background: none;
					font: inherit;
					border: none;
					outline: none;
					margin: 0;
					width: 100%;
					display: inline-block;
					color: inherit;
					font-family: inherit;
					font-weight: inherit;
					font-size: inherit;
					letter-spacing: inherit;
					word-spacing: inherit;
					line-height: 3.3em;
					text-shadow: inherit;
					transition: all 0.2s;
					pointer-events: none;
					user-select: none;
				}

				::-webkit-input-placeholder {
					color: inherit;
					opacity: 0.5;
				}

				iron-icon {
					display: inline-block;
					width: 1.5em;
					height: 1.5em;
					margin: 0.15625em 1em 0.15625em 0;
				}

				.h4 {
					margin: 5px 8px 8px;
					color: var(--on-surface, #535353);
					display: block;
					font-weight: 500;
					font-size: 0.8rem;
					max-width: 100%;
					transition: all 0.2s;
				}
				.icon {
					width: 24px;
					height: 24px;
				}
				.float-label {
					font-size: 11px;
					font-weight: 700;
					display: block;
					position: absolute;
					top: 6px;
					font-size: 0.75em;
					font-weight: 700;
					color: #676767;
					opacity: 0;
					transition: all 0.2s ease-in-out;
					width: 85%;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				#container.has-value > .float-label {
					opacity: 1;
					visibility: visible;
				}

				@keyframes bounce {
					0% {
						transform: translateX(0px);
						timing-function: ease-in;
					}
					37% {
						transform: translateX(5px);
						timing-function: ease-out;
					}
					55% {
						transform: translateX(-5px);
						timing-function: ease-in;
					}
					73% {
						transform: translateX(4px);
						timing-function: ease-out;
					}
					82% {
						transform: translateX(-4px);
						timing-function: ease-in;
					}
					91% {
						transform: translateX(2px);
						timing-function: ease-out;
					}
					96% {
						transform: translateX(-2px);
						timing-function: ease-in;
					}
					100% {
						transform: translateX(0px);
						timing-function: ease-in;
					}
				}
				.bounce {
					outline: 0;
					animation-name: bounce;
					animation-duration: 0.5s;
					animation-delay: 0.25s;
				}
			</style>
			<div id="c">
				${this.label ? html` <label class="label h4" for="input">${this.label}</label> ` : ''}
				<div id="container" @click="${this.onClickContainer}" class="${this.invalid ? 'error' : ''}">
					${this.placeholder && html` <label class="float-label">${this.placeholder}</label> `}
					<slot name="prefix"></slot>
					<input id="input" .value="${this.valuePlaceholder}" placeholder="${this.placeholder || this.raw_placeholder}" />
					<div class="icon">
						<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;fill:currentColor">
							<g><path d="M7 10l5 5 5-5z"></path></g>
						</svg>
					</div>
				</div>
			</div>
		`;
	}
	searchIn = '';
	timeout: any;
	constructor() {
		super();
		this.items = [];
		this.okPlaceholder = 'Ok';
		this.cancelPlaceholder = 'Cancel';
		this.selectedPlaceholder = 'Items selected';
		this.valuePlaceholder = '';
		this.placeholder = '';
		this.searchPlaceholder = 'Search...';
		this.preventClick = false;
		this.order = null;
		this.textProperty = 'text';
		this.valueProperty = 'value';
		this.timeout = setTimeout(() => {
			this.searchIn = '';
		}, 1000);

		this.addEventListener('input', (e: any) => {
			this.searchIn += e.data || '';
			clearTimeout(this.timeout);
			let items = this.items.filter((item) => item[this.textProperty].toLowerCase().startsWith(this.searchIn.toLowerCase()));
			//console.log(this.searchIn, items);
			if (items.length > 0) {
				this.$.input.value = items[0][this.textProperty];
			} else {
				let _a;
				this.$.input.value = (_a = this.items.find((item) => item[this.valueProperty] == this.value)) ? _a[this.textProperty] : undefined;
			}
			this.timeout = setTimeout(() => {
				if (items.length > 0) {
					// setear nuevo valor;
					if (!this.multi) this.value = items[0][this.valueProperty];
					else {
						this.value = [items[0][this.valueProperty]];
					}
				}
				this.searchIn = '';
			}, 1000);
		});
	}

	firstUpdated() {
		this.mapIDs();
		this.computeValues();
	}

	typeOf(obj: any) {
		return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
	}

	computeValues() {
		if (this.multi) {
			let strBuilder = [];
			for (let j = 0; this.value && j < this.value.length; j++) {
				for (let i = 0; i < this.items.length; i++) {
					let items = this.items[i];
					let values = this.value[j];
					if (items[this.valueProperty] == values) {
						strBuilder.push(items[this.textProperty]);
					} else if (this.typeOf(values) == 'object') {
						if (JSON.stringify(items[this.valueProperty]) == JSON.stringify(values)) {
							strBuilder.push(items[this.textProperty]);
						}
					}
				}
			}
			this.valuePlaceholder = strBuilder.length > 2 ? strBuilder.length + ' ' + this.selectedPlaceholder : strBuilder.join(', ');
		} else {
			for (let i = 0; i < this.items.length; i++) {
				let items = this.items[i];
				if (items[this.valueProperty] == this.value) {
					this.valuePlaceholder = items[this.textProperty];
					return;
				}
			}
			this.valuePlaceholder = '';
			//this.value = null;
		}
	}

	set value(val) {
		if (this._value !== val) this.setValue(val);
	}

	async setValue(val: any) {
		this._value = val;
		await this.updateComplete;
		this.dispatchEvent(new CustomEvent('value', { detail: { value: val } }));
		this.computeValues();
		if (this.placeholder) {
			var isEmpty = this.value === '' || this.value == undefined;
			//console.log('if isEmpty', !isEmpty ? 'has-value' : !this.label ? 'has-value' : '--', this.$.container);
			this.$.container.classList.toggle('has-value', !isEmpty);
			this.$.input.classList.toggle('has-value', !isEmpty);
		}
	}

	get value() {
		return this._value;
	}

	get text() {
		let items = [];
		// return []
		if (this.multi) {
			for (let j = 0; j < this.value.length; j++) {
				for (let i = 0; i < this.items.length; i++) {
					let el = this.items[i];
					if (el[this.valueProperty] == this.value[j]) {
						items.push(el[this.textProperty]);
					} else if (this.typeOf(this.value[j]) == 'object') {
						if (JSON.stringify(el[this.valueProperty]) == JSON.stringify(this.value[j])) {
							items.push(el[this.textProperty]);
						}
					}
				}
			}
		}
		// return String
		else {
			for (let i = 0; i < this.items.length; i++) {
				let el = this.items[i];
				if (el[this.valueProperty] == this.value) {
					return el[this.textProperty];
				}
			}
		}
		// Return [items? : any]
		if (this.multi) return items;
		// Not Found
		else return null;
	}

	set text(val) {
		this._text = val;
	}

	set items(val) {
		if (this.order) this._items = this.burbuja(val, this.textProperty, this.order);
		else this._items = val;
		this.updateComplete.then(() => {
			this.dispatchEvent(new CustomEvent('items', { detail: { value: val } }));
			this.computeValues();
		});
	}

	burbuja(miArray: any, attr: string, order: 'desc' | 'asc') {
		for (let i = 1; i < miArray.length; i++) {
			for (let j = 0; j < miArray.length - i; j++) {
				// > 123456789
				// < 987654321
				if (order != 'desc') {
					if (miArray[j][attr].charCodeAt(0) < miArray[j + 1][attr].charCodeAt(0)) {
						let k = miArray[j + 1];
						miArray[j + 1] = miArray[j];
						miArray[j] = k;
					}
				} else {
					if (miArray[j][attr].charCodeAt(0) > miArray[j + 1][attr].charCodeAt(0)) {
						let k = miArray[j + 1];
						miArray[j + 1] = miArray[j];
						miArray[j] = k;
					}
				}
			}
		}
		return miArray;
	}

	get items(): KeyValueCtSelect[] {
		return this._items;
	}

	static get properties() {
		return {
			/**
			 * Items para seleccionar
			 */
			_items: { type: Array },
			textProperty: { type: String },
			valueProperty: { type: String },
			order: { type: String },
			/**
			 * Label of select
			 */
			label: { type: String },
			/**
			 * Array de items selected
			 */
			value: { type: Object },
			placeholder: { type: String },
			valuePlaceholder: { type: String },
			/**
			 * Esto si se necesita que se puedan seleccionar muchos
			 */
			multi: { type: Boolean },
			ttl: { type: String },
			/**
			 * OK btn placeholder
			 */
			okPlaceholder: { type: String },
			/**
			 * Cancel Btn placeholder
			 */
			cancelPlaceholder: { type: String },
			/**
			 * Placeholder when you select more of 3 items
			 */
			selectedPlaceholder: { type: String },
			/**
			 * Search placeholder
			 */
			searchPlaceholder: { type: String },
			/**
			 * Activate searchable option
			 */
			searchable: { type: Boolean },
			preventClick: { type: Boolean },
			/**
			 * if the required and this.value is null
			 */
			invalid: { type: Boolean },
			required: { type: Boolean }
		};
	}

	/**
	 * Handle clic event of ct-select
	 * @param e Event-click
	 */
	onClickContainer() {
		if (!this.preventClick) {
			this.showDialog();
		}
	}

	/**
	 * Call programmatically click event
	 * @returns {Promise<void>}
	 */
	async showDialog(): Promise<void> {
		this.invalid = false;
		let ctSelect = showCtSelect(this.ttl ? this.ttl : this.label, this.items, this.value, this.okPlaceholder, this.cancelPlaceholder, {
			multi: this.multi,
			searchable: this.searchable,
			searchPlaceholder: this.searchPlaceholder,
			textProperty: this.textProperty,
			valueProperty: this.valueProperty
		});
		if (this.renderItem) ctSelect.dialog.renderItem = this.renderItem;
		let value = await ctSelect.result;
		if (value !== undefined) {
			this.value = value;
		} else {
			this.dispatchEvent(new CustomEvent('dismiss', { detail: {} }));
		}
		if (this.required && this.value == null) {
			this.invalid = true;
		}
		this.computeValues();
	}

	validate() {
		this.invalid = this.required == true && this.value == null;

		return !this.invalid;
	}

	async bounce() {
		this.$.c.classList.add('bounce');
		await sleep(1000);
		this.$.c.classList.remove('bounce');
	}
}
