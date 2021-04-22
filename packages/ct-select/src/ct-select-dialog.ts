import '@conectate/ct-card/ct-card';
import '@conectate/ct-button/ct-button';
import '@conectate/ct-input/ct-input';
import '@conectate/ct-dialog/ct-dialog';
import 'lit-virtualizer/lib/lit-virtualizer';

import { CtDialog, showCtDialog } from '@conectate/ct-dialog/ct-dialog';
import { CtLit, css, html, internalProperty, property, unsafeHTML } from '@conectate/ct-lit';
import { TemplateResult } from 'lit';

function removeAcento(input: string) {
	// Cadena de caracteres original a sustituir.
	let original = 'áàäêéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ';
	// Cadena de caracteres ASCII que reemplazarán los originales.
	let ascii = 'aaaeeeeiiiooouuunAAAEEEIIIOOOUUUNcC';
	let output = input;
	for (let i = 0; i < original.length; i++) {
		// Reemplazamos los caracteres especiales.
		output = output.replace(original.charAt(i), ascii.charAt(i));
	}
	return output;
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
	use_virtual_scroll: boolean;
}
export function showCtSelect(title: string, items: any[] = [], value: any[] = [], ok: string = 'Ok', cancel: string = 'Cancel', options: OptionsCtSelect) {
	let selectDialog = document.createElement('ct-select-dialog') as CtSelectDialog;
	selectDialog.use_virtual_scroll = options.use_virtual_scroll;
	selectDialog.ttl = title;
	selectDialog.items = items;
	selectDialog.ok = ok ? ok : 'OK';
	selectDialog.searchable = options.searchable;
	selectDialog.searchPlaceholder = options.searchPlaceholder;
	selectDialog.textProperty = options.textProperty;
	selectDialog.valueProperty = options.valueProperty;
	selectDialog.cancel = cancel ? cancel : 'Cancel';
	if (options.multi) {
		selectDialog.multi = options.multi;
		selectDialog.multiValue = value ? [...value] : [];
	}
	selectDialog.dialog = showCtDialog(selectDialog);
	// selectDialog.dialog.addEventListener("on-close", () => {
	// 	selectDialog.solve(undefined);
	// });
	return { dialog: selectDialog, result: selectDialog.onResult() };
}

// @ts-ignore
window.showCtSelect = showCtSelect;

export class CtSelectDialog extends CtLit {
	solve!: (value?: any) => void;
	reject!: (value?: any) => void;
	@property({ type: String }) ttl!: string;
	@property({ type: Boolean }) searchable = false;
	@property({ type: String }) searchPlaceholder: string = 'Search...';
	@property({ type: Array }) items: any[] = [];
	@internalProperty() private itemsFiltered: any[] = [];
	@internalProperty() private searchBoxText = '';
	@property({ type: Boolean }) use_virtual_scroll = false;
	@property({ type: String }) valueProperty!: string;
	@property({ type: String }) textProperty!: string;
	@property({ type: String }) ok!: string;
	@property({ type: String }) neutral!: string;
	@property({ type: String }) cancel!: string;
	/**
	 * Arrar of selected items
	 */
	@property({ type: String }) value!: string | string[];
	@internalProperty() private scrollTarget: any;
	/**
	 * If true, multiple options can be selected.
	 */
	@property({ type: Boolean, reflect: true }) multi = false;
	@property({ type: String }) selectedPlaceholder = 'items selected';
	@property({ type: Array }) multiValue: any[] = [];
	@property({ type: Object }) dialog!: CtDialog;
	renderItem2?: (item: any, index: number, array: any[]) => TemplateResult;
	@property({ type: Object }) renderItem = (item: any, index: number, array: any[]) => html` <button>${unsafeHTML(item[this.textProperty])}</button> `;

	static styles = [
		css`
			:host {
				display: block;
				/* height: 100%; */
			}
			.item {
				width: 100%;
			}
			lit-virtualizer {
				height: 50vh;
			}

			.title {
				font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
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
				background-color: var(--color-primary);
				outline: 1px solid slategrey;
				border-radius: 8px;
			}

			.flex {
				flex: 1;
			}

			.buttons {
				color: var(--color-primary);
				display: block;
				flex-direction: row;
				text-align: right;
				font-weight: bold;
				padding: 16px;
			}

			paper-button {
				display: block;
				font-family: 'Google Sans', 'Ubuntu', 'Roboto', sans-serif;
				padding: 0.45em 1.7em;
				font-size: 0.95em;
				border-radius: 8px;
				text-transform: none;
			}

			#ok {
				color: #fff;
			}

			a {
				text-decoration: none;
				color: var(--color-primary);
			}

			button {
				min-width: 170px;
				color: var(--color-on-surface, #535353);
				margin: 0;
				padding: 6px 16px;
				height: 38px;
				width: 100%;
				background: none;
				outline: none;
				border: none;
				text-align: left;
				border-bottom: 1px solid var(--color-on-surface-dividers, #e8e8e8);
				cursor: pointer;
				transition: all 0.15s ease;
			}

			button:hover {
				background: var(--color-primary-light);
				color: var(--color-primary);
				border-radius: 8px;
			}

			:host([multi]) button {
				background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMCcgaGVpZ2h0PSczMCc+PHBhdGggZD0nTTE5IDV2MTRINVY1aDE0bTAtMkg1Yy0xLjEgMC0yIC45LTIgMnYxNGMwIDEuMS45IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6Jy8+PC9zdmc+')
					no-repeat 7px 6px;
				padding-left: 40px;
			}

			:host([multi]) button.selected {
				background: #def7ffee
					url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczMCcgaGVpZ2h0PSczMCc+PHBhdGggZD0nTTE5IDNINWMtMS4xMSAwLTIgLjktMiAydjE0YzAgMS4xLjg5IDIgMiAyaDE0YzEuMTEgMCAyLS45IDItMlY1YzAtMS4xLS44OS0yLTItMnptLTkgMTRsLTUtNSAxLjQxLTEuNDFMMTAgMTQuMTdsNy41OS03LjU5TDE5IDhsLTkgOXonLz48L3N2Zz4=')
					no-repeat 7px 6px;
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
				${this.searchable ? html` <ct-input @value="${(e: CustomEvent<string>) => this._filter(e.detail)}" .placeholder="${this.searchPlaceholder}"> </ct-input> ` : html``}
				<div class="body" id="confirmBody">
					${this.use_virtual_scroll
						? html` <lit-virtualizer
								.scrollTarget=${this.scrollTarget}
								.items=${items}
								.renderItem=${((i: any, index: number, arr: any[]) => html`
									<div class="item ${this.addSelectedClass(i[this.valueProperty])}" @click="${(e: MouseEvent) => this.onClickItem(e, i[this.valueProperty])}">
										${this.renderItem(i, index, arr)}
									</div>
								`) as any}
						  >
						  </lit-virtualizer>`
						: items.map(
								(i: any, index: number, arr: any[]) => html`
									<div class="item ${this.addSelectedClass(i[this.valueProperty])}" @click="${(e: MouseEvent) => this.onClickItem(e, i[this.valueProperty])}">
										${this.renderItem(i, index, arr)}
									</div>
								`
						  )}
				</div>
				<div id="buttons" class="buttons">
					<div class="flex"></div>
					<ct-button id="cancel" @click="${this.cancelbtn}" shadow>${this.cancel}</ct-button>
					${this.multi ? html` <ct-button raised id="ok" @click="${this.okbtn}">${this.ok}</ct-button> ` : html``}
				</div>
			</ct-card>
		`;
	}

	firstUpdated() {
		this.mapIDs();
		this.scrollTarget = this.$.confirmBody;
		this.computeBtns(this.ok, this.neutral, this.cancel);
		this.itemsFiltered = [...this.items];
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
			if (this.items[index][this.textProperty] == null) continue;
			let text = removeAcento(this.items[index][this.textProperty].toLowerCase());
			let texts = removeAcento(searchText.toLowerCase());
			if (text.indexOf(texts) > -1) auxArray.push(this.items[index]);
		}
		this.itemsFiltered = [...auxArray];
	}

	typeOf(obj: any) {
		return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
	}

	addSelectedClass(value: any) {
		if (this.typeOf(value) == 'object') {
			return this.multiValue.find((item) => JSON.stringify(item) == JSON.stringify(value)) ? 'selected' : '';
		}
		return this.multiValue.indexOf(value) > -1 ? 'selected' : '';
	}

	computeBtns(ok: string, neutral: string, cancel: string) {
		let auxok = ok || '',
			auxcancel = cancel || '';
		if (auxok.length > 15 || auxcancel.length > 15) {
			this.$.buttons.classList.add('buttons_vert');
		}
		if (cancel == null) {
			this.$.cancel.style.display = 'none';
		}
	}

	async onClickItem(e: any, value: any) {
		if (!this.multi) {
			this.solve(value);
			await this.dialog.closeDialog();
		} else {
			let selected = e.target.classList.contains('selected');
			e.target.classList.toggle('selected', !selected);
			if (selected) {
				this.multiValue.splice(this.multiValue.indexOf(value), 1);
			} else if (value != null) {
				this.multiValue.push(value);
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

window.customElements.define('ct-select-dialog', CtSelectDialog);
