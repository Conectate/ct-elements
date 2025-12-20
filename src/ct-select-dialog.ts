import "./ct-button.js";
import "./ct-card.js";
import "./ct-checkbox.js";
import "./ct-dialog.js";
import "./ct-input.js";
import "./ct-select-item.js";

import { css, html } from "lit";
import { repeat } from "lit/directives/repeat.js";

import { CtDialog, showCtDialog } from "./ct-dialog.js";
import { CtLit, property, query, state, unsafeHTML } from "./ct-lit.js";

function removeAcento(input: string) {
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
interface KeyValueCtSelect {
	text?: string;
	value?: any;
	[x: string]: any;
}

/**
 *
 * @param title
 * @param items
 * @param value
 * @param ok
 * @param cancel
 * @param options Object of multi,searchable,searchPlaceholder
 * @returns {LitElement<ct-select-dialog>}
 */
export interface OptionsCtSelect {
	searchable: boolean;
	multi: boolean;
	searchPlaceholder: string;
	textProperty: string;
	valueProperty: string;
}
export function showCtSelect<V = any>(title: string, items: any[] = [], value: V | undefined, ok: string = "OK", cancel: string = "Cancel", options: OptionsCtSelect) {
	let selectDialog = new CtSelectDialog();
	selectDialog.ttl = title;
	selectDialog.items = items;
	selectDialog.ok = ok ? ok : "OK";
	selectDialog.searchable = options.searchable;
	selectDialog.searchPlaceholder = options.searchPlaceholder;
	selectDialog.textProperty = options.textProperty;
	selectDialog.valueProperty = options.valueProperty;
	selectDialog.cancel = cancel ? cancel : "Cancel";
	if (options.multi) {
		selectDialog.multi = options.multi;
		selectDialog.multiValue = value && Array.isArray(value) ? [...value] : [];
	} else {
		selectDialog.value = value;
	}
	selectDialog.dialog = showCtDialog(selectDialog);
	// selectDialog.dialog.addEventListener("on-close", () => {
	// 	selectDialog.solve(undefined);
	// });
	return { dialog: selectDialog, result: selectDialog.onResult() };
}

// @ts-ignore
window.showCtSelect = showCtSelect;

export class CtSelectBuilder {
	#title: string = "";
	#value: number | string | object | object[] | undefined;
	#positiveButton: string = "OK";
	#negativeButton: string = "Cancel";
	#items: KeyValueCtSelect[] = [];
	#searchable = false;
	#multi = false;
	#valueProperty = "value";
	#textProperty = "text";
	#searchProperty = "text";
	#searchPlaceholder = "";
	#renderItem?: (item: any, index: number, array: any[]) => any;

	title(title: string) {
		this.#title = title;
		return this;
	}

	value(value: number | string | object | object[] | undefined) {
		this.#value = value;
		return this;
	}

	positiveButton(text: string) {
		this.#positiveButton = text;
		return this;
	}

	negativeButton(text: string) {
		this.#negativeButton = text;
		return this;
	}

	items(items: any[], textProperty: string = "text", searchProperty: string = "text", valueProperty: string = "value") {
		this.#items = items;
		this.#textProperty = textProperty;
		this.#searchProperty = searchProperty;
		this.#valueProperty = valueProperty;
		return this;
	}

	searchable(params?: { placeholder?: string }) {
		this.#searchable = true;
		this.#searchPlaceholder = params?.placeholder ?? "Search";
		return this;
	}
	multi(multi = true) {
		this.#multi = multi;
		return this;
	}
	renderItem(item: (item: any, index: number, array: any[]) => any) {
		this.#renderItem = item;
		return this;
	}

	build() {
		let selectDialog = new CtSelectDialog();
		selectDialog.ttl = this.#title;
		selectDialog.items = this.#items;
		selectDialog.textProperty = this.#textProperty;
		selectDialog.searchProperty = this.#searchProperty;
		selectDialog.valueProperty = this.#valueProperty;
		selectDialog.ok = this.#positiveButton || "OK";
		selectDialog.searchable = this.#searchable;
		selectDialog.searchPlaceholder = this.#searchPlaceholder;
		selectDialog.cancel = this.#negativeButton || "Cancel";
		if (this.#multi) {
			selectDialog.multi = this.#multi;
			selectDialog.multiValue = this.#value ? [...(this.#value as object[])] : [];
		} else {
			selectDialog.value = this.#value;
		}
		if (this.#renderItem) selectDialog.renderItem = this.#renderItem;
		return selectDialog;
	}

	static show(selectDialog: CtSelectDialog) {
		selectDialog.dialog = showCtDialog(selectDialog);
		return { dialog: selectDialog, result: selectDialog.onResult() };
	}
}
// CtSelectDialog.Builder().title('').value([]).positiveButton('OK').negativeButton('Cancel').items([]).multi().searchable().show();
export class CtSelectDialog extends CtLit {
	static Builder() {
		return new CtSelectBuilder();
	}
	solve!: (value?: any) => void;
	reject!: (value?: any) => void;
	@query("#buttons") $buttons!: HTMLElement;
	@query("#cancel") $cancel!: HTMLElement;
	@property({ type: String }) ttl!: string;
	@property({ type: Boolean }) searchable = false;
	@property({ type: String }) searchPlaceholder: string = "Search...";
	@property({ type: Array }) items: any[] = [];
	@state() private itemsFiltered: any[] = [];
	@state() private searchBoxText = "";
	@property({ type: String }) valueProperty!: string;
	@property({ type: String }) textProperty!: string;
	@property({ type: String }) searchProperty!: string;
	@property({ type: String }) ok!: string;
	@property({ type: String }) neutral!: string;
	@property({ type: String }) cancel!: string;
	/**
	 * Arrar of selected items
	 */
	@property({ type: Object }) value?: any;
	/**
	 * If true, multiple options can be selected.
	 */
	@property({ type: Boolean, reflect: true }) multi = false;
	@property({ type: String }) selectedPlaceholder = "items selected";
	@property({ type: Array }) multiValue: object[] = [];
	@property({ type: Object }) dialog!: CtDialog;
	@query("#search") $search!: HTMLElementTagNameMap["ct-input"];
	@property({ type: Object }) renderItem = (item: any, index: number, array: any[], selected: boolean) => html`
		<ct-select-item ?multi=${this.multi} ?selected=${selected}> ${unsafeHTML(item[this.textProperty])} </ct-select-item>
	`;

	static styles = [
		css`
			:host {
				display: block;
				/* height: 100%; */
			}
			.item:hover {
				background: rgba(26, 57, 96, 0.05);
			}

			.item.selected {
				background: var(--color-surface-variant, rgba(26, 57, 96, 0.1));
			}

			.title {
				font-family: "Google Sans", "Ubuntu", "Roboto", sans-serif;
				font-size: 1.5em;
				font-weight: 400;
				margin: 24px 24px 0;
				color: var(--color-on-surface, #535353);
			}

			.body {
				margin: 20px 24px 24px;
				color: #383838;
				overflow-y: auto;
			}

			.body::-webkit-scrollbar {
				width: 9px;
			}

			.body::-webkit-scrollbar-track {
				border-radius: 8px;
			}

			.body::-webkit-scrollbar-thumb {
				background-color: var(--color-primary, #2cb5e8);
				outline: 1px solid slategrey;
				border-radius: 8px;
			}

			.flex {
				flex: 1;
			}

			.buttons {
				color: var(--color-primary, #2cb5e8);
				display: block;
				flex-direction: row;
				justify-items: flex-end;
				text-align: end;
				font-weight: bold;
				padding: 16px;
			}

			#ok {
				color: var(--color-on-primary, #fff);
			}

			a {
				text-decoration: none;
				color: var(--color-primary);
			}

			ct-input {
				margin: 16px 16px 0;
				display: block;
			}

			ct-card {
				display: flex;
				flex-direction: column;
				max-height: 100%;
				margin: 0;
				background: var(--color-surface, #fff);
			}

			@media (max-width: 800px) {
				.buttons_vert {
					flex-direction: column;
					text-align: right;
				}
			}
		`
	];

	render() {
		let items = [...this.itemsFiltered];
		if (items.length == 0 && this.searchBoxText.length == 0) items = this.items;
		let allSelected = items.length > 0 && items.every(item => this.multiValue?.includes(item[this.valueProperty]));
		return html`
			<ct-card shadow decorator>
				<div class="title">${this.ttl}</div>
				${this.searchable ? html` <ct-input id="search" @value="${(e: CustomEvent<string>) => this._filter(e.detail)}" .placeholder="${this.searchPlaceholder}"> </ct-input> ` : ``}
				${this.multi
					? html`<div style="padding: 8px 24px 0; text-align: right;">
							<ct-button style="font-weight: bold; cursor: pointer; --color-button: transparent; color: var(--color-primary);" @click="${() => this.toggleSelectAll()}"
								>${allSelected ? "Deselect All" : "Select All"}</ct-button
							>
						</div>`
					: ""}
				<div class="body" id="confirmBody">
					${repeat(
						items,
						(i: any) => i[this.valueProperty],
						(i: any, index: number) => {
							let isSelected = this.multi ? this.multiValue?.includes(i[this.valueProperty]) : this.value == i[this.valueProperty];
							return html`
								<div class="item ${isSelected ? "selected" : ""}" @click="${(e: MouseEvent) => this.onClickItem(e, i[this.valueProperty])}">
									${this.renderItem(i, index, items, isSelected)}
								</div>
							`;
						}
					)}
				</div>
				<div id="buttons" class="buttons">
					<ct-button id="cancel" @click="${this.cancelbtn}" shadow>${this.cancel}</ct-button>
					${this.multi ? html` <ct-button raised id="ok" @click="${this.okbtn}">${this.ok}</ct-button> ` : ``}
				</div>
			</ct-card>
		`;
	}

	toggleSelectAll() {
		let items = [...this.itemsFiltered];
		if (items.length == 0 && this.searchBoxText.length == 0) items = this.items;
		const allSelected = items.length > 0 && items.every(item => this.multiValue?.includes(item[this.valueProperty]));
		if (allSelected) {
			const values = items.map(i => i[this.valueProperty]);
			this.multiValue = this.multiValue.filter(v => !values.includes(v));
		} else {
			const values = items.map(i => i[this.valueProperty]);
			this.multiValue = [...new Set([...this.multiValue, ...values])];
		}
	}

	firstUpdated() {
		this.computeBtns(this.ok, this.neutral, this.cancel);
		this.itemsFiltered = [...this.items].sort((a, b) => {
			let aSelected = false;
			let bSelected = false;
			if (this.multi) {
				aSelected = this.multiValue.includes(a[this.valueProperty]);
				bSelected = this.multiValue.includes(b[this.valueProperty]);
			} else {
				aSelected = this.value != null && a[this.valueProperty] == this.value;
				bSelected = this.value != null && b[this.valueProperty] == this.value;
			}
			if (aSelected && !bSelected) return -1;
			if (!aSelected && bSelected) return 1;
			return 0;
		});
		if (this.searchable)
			setTimeout(() => {
				this.$search?.focus();
			}, 500);
	}

	/**
	 * Shows/Hides listbox items based on searchText
	 *
	 * @param searchText Text to be matched in item's label.
	 * @private
	 */
	_filter(searchText: string) {
		const items = this.items;
		let auxArray = [];
		this.searchBoxText = searchText;

		// Divide el texto de búsqueda en palabras individuales
		let searchTerms = removeAcento(searchText.toLowerCase()).trim().split(/\s+/);

		for (let index = 0; index < items.length; index++) {
			let itemText = this.items[index][this.searchProperty || this.textProperty];

			if (itemText == null) continue;

			// Convierte el texto del ítem a minúsculas y elimina acentos
			let normalizedItemText = removeAcento(itemText.toLowerCase()).trim();

			// Verifica si todos los términos de búsqueda están en el texto del ítem
			let matches = searchTerms.every(term => normalizedItemText.includes(term));

			if (matches) auxArray.push(this.items[index]);
		}

		this.itemsFiltered = [...auxArray];
	}

	typeOf(obj: any) {
		return {}.toString.call(obj).split(" ")[1].slice(0, -1).toLowerCase();
	}

	computeBtns(ok: string, neutral: string, cancel: string) {
		let auxok = ok || "",
			auxcancel = cancel || "";
		if (auxok.length > 15 || auxcancel.length > 15) {
			this.$buttons.classList.add("buttons_vert");
		}
		if (cancel == null) {
			this.$cancel.style.display = "none";
		}
	}

	async onClickItem(e: any, value: any) {
		if (!this.multi) {
			await this.dialog.close();
			this.solve(value);
		} else {
			let selected = Boolean(e.target.selected); //e.target.classList.contains('selected');
			// e.target.classList.toggle('selected', !selected);
			e.target.selected = !selected;
			if (selected) {
				console.log("removed");
				this.multiValue.splice(this.multiValue.indexOf(value), 1);
			} else if (value != null) {
				console.log("added");
				this.multiValue.push(value);
				this.multiValue = Array.from(new Set(this.multiValue));
			}
		}
	}

	async okbtn() {
		await this.dialog.close();
		this.solve(this.multiValue);
	}

	async cancelbtn() {
		await this.dialog.close();
		this.solve(undefined);
	}

	onResult(): Promise<any[] | any> {
		return new Promise((resolve, reject) => {
			this.solve = resolve;
			this.reject = reject;
		});
	}
}

window.customElements.define("ct-select-dialog", CtSelectDialog);
