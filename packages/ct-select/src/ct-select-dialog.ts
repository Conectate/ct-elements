import "@conectate/ct-button";
import "@conectate/ct-card";
import "@conectate/ct-dialog";
import "@conectate/ct-input";

import "./ct-select-item.js";

import { CtDialog, showCtDialog } from "@conectate/ct-dialog";
import { CtLit, property, query, state, unsafeHTML } from "@conectate/ct-lit";
import { css, html } from "lit";

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
	// @property({ type: String }) value!: number | string | object | object[];
	/**
	 * If true, multiple options can be selected.
	 */
	@property({ type: Boolean, reflect: true }) multi = false;
	@property({ type: String }) selectedPlaceholder = "items selected";
	@property({ type: Array }) multiValue: object[] = [];
	@property({ type: Object }) dialog!: CtDialog;
	@query("#search") $search!: HTMLElementTagNameMap["ct-input"];
	@property({ type: Object }) renderItem = (item: any, index: number, array: any[]) => html`
		<ct-select-item ?multi=${this.multi} ?selected="${this.multi && ((this.multiValue as object[]) ||= []).includes(item[this.valueProperty])}">
			${unsafeHTML(item[this.textProperty])}
		</ct-select-item>
	`;

	static styles = [
		css`
			:host {
				display: block;
				/* height: 100%; */
			}
			.item {
				width: 100%;
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
		return html`
			<ct-card shadow decorator>
				<div class="title">${this.ttl}</div>
				${this.searchable
					? html` <ct-input id="search" @value="${(e: CustomEvent<string>) => this._filter(e.detail)}" .placeholder="${this.searchPlaceholder}"> </ct-input> `
					: ``}
				<div class="body" id="confirmBody">
					${items.map(
						(i: any, index: number, arr: any[]) => html`
							<div class="item " @click="${(e: MouseEvent) => this.onClickItem(e, i[this.valueProperty])}">${this.renderItem(i, index, arr)}</div>
						`
					)}
				</div>
				<div id="buttons" class="buttons">
					<ct-button id="cancel" @click="${this.cancelbtn}" shadow>${this.cancel}</ct-button>
					${this.multi ? html` <ct-button raised id="ok" @click="${this.okbtn}">${this.ok}</ct-button> ` : ``}
				</div>
			</ct-card>
		`;
	}

	firstUpdated() {
		this.computeBtns(this.ok, this.neutral, this.cancel);
		this.itemsFiltered = [...this.items];
		setTimeout(() => {
			this.$search.focus();
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
		for (let index = 0; index < items.length; index++) {
			if (this.items[index][this.searchProperty || this.textProperty] == null) continue;
			let text = removeAcento(this.items[index][this.searchProperty || this.textProperty].toLowerCase());
			let texts = removeAcento(searchText.toLowerCase());
			if (text.includes(texts)) auxArray.push(this.items[index]);
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
			this.solve(value);
			await this.dialog.closeDialog();
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
		await this.dialog.closeDialog();
		this.solve(this.multiValue);
	}

	async cancelbtn() {
		await this.dialog.closeDialog();
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
