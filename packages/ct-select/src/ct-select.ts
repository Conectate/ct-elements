import "./ct-select-dialog.js";

import { sleep } from "@conectate/ct-helpers";
import { CtLit, customElement, property, query } from "@conectate/ct-lit";
import { PropertyValues, TemplateResult, css, html } from "lit";

import { showCtSelect } from "./ct-select-dialog.js";

export interface KeyValueCtSelect<V = any> {
	text?: string;
	value?: V;
	[x: string]: any;
}
/**
 *
 *
 * @group Conectate Elements
 * @element ct-select
 * @demo demo/index.html
 * @hero hero.svg
 * @homepage open.grupoconectate.com
 * This is my element
 * @prop {T[]} items - items of select
 * @fires value - Cuando el valor del select Cambia
 * @fires items - Cuando se setean nuevos items al element
 * @fires dismiss - Cuando se cierra el dialogo
 * @cssProp --ct-indicator - Indicador de required
 * @cssProp --ct-input-padding - Padding del input
 * @cssProp --ct-input-height - Altura del input
 * @cssProp --border-radius - Border radius del input
 * @cssProp --color-error - Color de error
 */
@customElement("ct-select")
export class CtSelect<T extends KeyValueCtSelect = KeyValueCtSelect> extends CtLit {
	static styles = [
		css`
			:host {
				display: inline-block;
				margin-bottom: 8px;
				min-width: 250px;
				cursor: pointer;
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
				content: var(--ct-indicator, "*");
				color: var(--color-error, #ed4f32);
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
				border-radius: var(--border-radius, 16px);
				background: rgba(121, 130, 142, 0.1);
				transition: all 0.2s;
				padding: var(--ct-input-padding, 0em 1em);
			}

			#container.error {
				background: rgba(255, 0, 45, 0.15);
			}

			#container.error > input::placeholder {
				color: var(--color-error, #ed4f32) !important;
			}

			#container.active {
				background: rgba(26, 57, 96, 0.05);
			}

			::slotted(*),
			#container.has-value > .charCount {
				transition: all 0.2s;
			}

			::slotted([slot="prefix"]) {
				display: inline-block;
				margin-right: 0.5em;
			}

			#input.has-value,
			#container.has-value > ::slotted([slot="prefix"]) {
				padding-top: 1.1em;
			}

			input:invalid {
				outline: none;
			}

			#input {
				height: var(--ct-input-height, 3.3em);
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
				line-height: var(--ct-input-height, 3.3em);
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
				color: var(--color-on-surface, #535353);
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
			.da {
				-webkit-tap-highlight-color: rgba(31, 45, 61, 0);
				box-sizing: border-box;
				margin: 0;
				font-family: inherit;
				text-transform: none;
				display: inline-block;
				width: 100%;
				height: calc(1.5em + 1.5rem + 2px);
				padding: 0.75rem 2.25rem 0.75rem 1.25rem;
				font-size: 1rem;
				font-weight: 400;
				line-height: 1.5;
				color: #4a5568;
				vertical-align: middle;
				background: #fff
					url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5'%3E%3Cpath fill='%232D3748' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") no-repeat
					right 1.25rem center/8px 10px;
				border: 1px solid #e2e8f0;
				border-radius: 0.375rem;
				box-shadow: inset 0 1px 2px rgba(31, 45, 61, 0.075);
				appearance: none;
				transition: all 0.15s ease-in-out;
			}
		`
	];
	@query("#container") $container!: HTMLElement;
	@query("#input") $input!: HTMLInputElement;
	@query("#c") $c!: HTMLElement;
	@property({ type: Boolean, reflect: true }) disabled = false;
	@property({ type: String }) raw_placeholder = "";
	@property({ type: String }) okPlaceholder: string = "Ok";
	@property({ type: String }) cancelPlaceholder: string = "Cancel";
	/**
	 * Placeholder when you select more of 3 items
	 */
	@property({ type: String }) selectedPlaceholder: string = "Items selected";
	/**
	 * Label of select
	 */
	@property({ type: String }) label: string = "";
	/**
	 * if the required and this.value is null
	 */
	@property({ type: Boolean }) invalid: boolean = false;
	@property({ type: String }) valuePlaceholder = "";
	@property({ type: String }) placeholder = "";
	/**
	 * Search placeholder
	 */
	@property({ type: String }) searchPlaceholder = "Search...";
	@property({ type: Boolean }) preventClick = false;
	@property({ type: String }) order?: "asc" | "desc";
	@property({ type: String }) textProperty: string = "text";
	@property({ type: String }) valueProperty: string = "value";
	/**
	 * Esto si se necesita que se puedan seleccionar muchos
	 */
	@property({ type: Boolean }) multi: boolean = false;
	/**
	 * Items para seleccionar
	 */
	@property({ type: Array }) items: T[] = [];
	@property({ type: String }) ttl: string = "";
	/**
	 * Activate searchable option
	 */
	@property({ type: Boolean }) searchable: boolean = false;
	@property({ type: Boolean }) required: boolean = false;

	_value?: T["value"];
	_text: any;

	/**
	 * Array de items selected
	 */
	@property({ type: Object })
	set value(val: T["value"]) {
		if (this._value !== val) {
			this._value = val;
			this.setValue(val);
		}
	}
	get value() {
		return this._value!;
	}
	get text() {
		let items = [];
		// return []
		if (this.multi) {
			if (!Array.isArray(this.value)) {
				return;
			}
			for (let j = 0; j < this.value.length; j++) {
				for (let i = 0; i < this.items.length; i++) {
					let el = this.items[i];
					if (el[this.valueProperty] == this.value[j]) {
						items.push(el[this.textProperty]);
					} else if (this.typeOf(this.value[j]) == "object") {
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

	renderItem?: (item: T, index: number, array: T[]) => TemplateResult<1>;

	render() {
		return html`
			<div id="c">
				${this.label ? html` <label class="label h4" for="input">${this.label}</label> ` : ""}
				<div id="container" @click="${this.onClickContainer}" class="${this.invalid ? "error" : ""}">
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
	searchIn = "";
	timeout: any;
	constructor() {
		super();
		this.items = [];
		this.timeout = setTimeout(() => {
			this.searchIn = "";
		}, 1000);

		// Only for single select
		this.addEventListener("input", (e: any) => {
			if (this.multi) return;
			this.searchIn += e.data || "";
			clearTimeout(this.timeout);
			let items = this.items.filter(item => item[this.textProperty].toLowerCase().startsWith(this.searchIn.toLowerCase()));
			//console.log(this.searchIn, items);
			if (items.length > 0) {
				this.$input.value = items[0][this.textProperty];
			} else {
				this.$input.value = this.items.find(item => item[this.valueProperty] == this.value)?.[this.textProperty];
			}
			this.timeout = setTimeout(() => {
				if (items.length > 0) {
					let old = this.value;
					this.value = items[0][this.valueProperty];
					if (this.value !== old) this.dispatchEvent(new CustomEvent("value", { detail: { value: this.value, old } }));
				}
				this.searchIn = "";
			}, 1000);
		});
	}

	private get _orderedItems(): T[] {
		if (!this.order) return this.items;

		return [...this.items].sort((a, b) => {
			const aVal = a[this.textProperty];
			const bVal = b[this.textProperty];
			if (typeof aVal === "string" && typeof bVal === "string") {
				if (this.order === "asc") {
					return aVal.localeCompare(bVal);
				} else {
					return bVal.localeCompare(aVal);
				}
			}
			if (this.order === "asc") {
				return a[this.textProperty].charCodeAt(0) - b[this.textProperty].charCodeAt(0);
			} else {
				return b[this.textProperty].charCodeAt(0) - a[this.textProperty].charCodeAt(0);
			}
		});
	}

	firstUpdated() {
		this.computeValuesPlaceholder();
	}

	override willUpdate(changedProperties: PropertyValues) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("items") || changedProperties.has("order") || changedProperties.has("value")) {
			this.computeValuesPlaceholder();
		}
	}

	typeOf(obj: any) {
		return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
	}

	computeValuesPlaceholder() {
		if (this.multi) {
			if (!Array.isArray(this.value)) {
				return;
			}
			let strBuilder = [];
			for (let j = 0; this.value && j < this.value.length; j++) {
				for (let i = 0; i < this.items.length; i++) {
					let items = this.items[i];
					let values = this.value[j];
					if (items[this.valueProperty] == values) {
						strBuilder.push(items[this.textProperty]);
					} else if (this.typeOf(values) == "object") {
						if (JSON.stringify(items[this.valueProperty]) == JSON.stringify(values)) {
							strBuilder.push(items[this.textProperty]);
						}
					}
				}
			}
			this.valuePlaceholder = strBuilder.length > 3 ? strBuilder.length + " " + this.selectedPlaceholder : strBuilder.join(", ");
		} else {
			for (let i = 0; i < this.items.length; i++) {
				let items = this.items[i];
				if (items[this.valueProperty] == this.value) {
					this.valuePlaceholder = items[this.textProperty];
					return;
				}
			}
			this.valuePlaceholder = "";
			//this.value = null;
		}
	}

	async setValue(val?: T["value"]) {
		await this.updateComplete;
		this.computeValuesPlaceholder();
		if (this.placeholder) {
			var isEmpty = this.value == null;
			//console.log('if isEmpty', !isEmpty ? 'has-value' : !this.label ? 'has-value' : '--', this.$container);
			this.$container.classList.toggle("has-value", !isEmpty);
			this.$input.classList.toggle("has-value", !isEmpty);
		}
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
		let ctSelect = showCtSelect<T["value"]>(this.ttl ? this.ttl : this.label, this._orderedItems, this.value, this.okPlaceholder, this.cancelPlaceholder, {
			multi: this.multi,
			searchable: this.searchable,
			searchPlaceholder: this.searchPlaceholder,
			textProperty: this.textProperty,
			valueProperty: this.valueProperty
		});
		if (this.renderItem) ctSelect.dialog.renderItem = this.renderItem;
		let value = await ctSelect.result;
		if (value !== undefined) {
			let old = this.value;
			this.value = value;
			if (this.value !== old) this.dispatchEvent(new CustomEvent("value", { detail: { value: this.value, old } }));
		} else {
			this.dispatchEvent(new CustomEvent("dismiss", { detail: {} }));
		}
		if (this.required && this.value == null) {
			this.invalid = true;
		}
		this.computeValuesPlaceholder();
	}

	validate() {
		this.invalid = this.required == true && this.value == null;

		return !this.invalid;
	}

	async bounce() {
		this.$c.classList.add("bounce");
		await sleep(1000);
		this.$c.classList.remove("bounce");
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-select": CtSelect;
	}
}
