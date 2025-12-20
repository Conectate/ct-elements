import "../ct-input/ct-input-container.js";

import { CtLit, customElement, property, query } from "../ct-lit/ct-lit.js";
import { TemplateResult, css, html } from "lit";

/**
 * ## `ct-date`
 * A simple cross-platform date input component with optional time selection.
 *
 * ### Usage
 * ```html
 * <!-- Basic date input -->
 * <ct-date label="Select Date"></ct-date>
 *
 * <!-- Date input with time selection -->
 * <ct-date label="Select Date and Time" showhour></ct-date>
 *
 * <!-- Date input without day selection -->
 * <ct-date label="Select Month/Year" nodd></ct-date>
 * ```
 *
 * ### Events
 * - `value`: Fired when a valid date is selected, with timestamp in seconds as detail
 *
 * ### Features
 * - Supports date input with or without time
 * - Optional day field
 * - Timezone awareness option
 * - Range validation for year input
 * - Format parsing from pasted text
 *
 * @group ct-elements
 * @element ct-date
 * @fires value - Fired when a valid date is selected with timestamp in seconds as detail
 */
@customElement("ct-date")
export class CtDate extends CtLit {
	/**
	 * When true, hides the day input field
	 */
	@property({ type: Boolean }) nodd = false;
	/**
	 * Show hour and minutes
	 */
	@property({ type: Boolean }) showhour = false;
	/**
	 * Return timestamp with timezone value
	 */
	@property({ type: Boolean }) usetimezone = false;
	@property({ type: String }) placeholder = "";

	@property({ type: Number }) minYYYY = 1800;
	@property({ type: Number }) maxYYYY = 2300;

	@property({ type: String }) label = "";
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean }) hidden = false;

	@property({ type: Boolean }) invalid: boolean = false;
	@property({ type: String }) mm = "";
	@property({ type: String }) dd = "";
	@property({ type: String }) yyyy = "";
	@property({ type: String }) hh = "";
	@property({ type: String }) min = "";

	@query("#dd") $dd?: HTMLInputElement;
	@query("#mm") $mm?: HTMLInputElement;
	@query("#yyyy") $yyyy?: HTMLInputElement;
	@query("#hh") $hh?: HTMLInputElement;
	@query("#min") $min?: HTMLInputElement;
	@query("#container") $container?: HTMLElementTagNameMap["ct-input-container"];

	static styles: any[] = [
		css`
			:host {
				display: inline-flex;
				color: rgba(0, 0, 0, 0.54);
				margin-bottom: 8px;
			}

			span {
				display: flex;
				align-items: center;
			}

			*:focus {
				outline: 0;
			}

			input {
				font: inherit;
				outline: none;
				box-shadow: none;
				border: none;
				width: auto;
				text-align: center;
				background: transparent;
				color: inherit;
				height: 100%;
				padding: 0;
			}

			::-webkit-input-placeholder {
				color: inherit;
				opacity: 0.5;
			}

			#container {
				flex: 1;
				margin: 0;
			}
			#dd,
			#mm,
			#hh,
			#min {
				min-width: 2em;
			}
			#yyyy {
				min-width: 3em;
			}
		`
	];

	constructor() {
		super();
		// on paste "12/12/2020" or "12/12/2020 12:12", fill data properly
		this.addEventListener("paste", (e: ClipboardEvent) => {
			let data = e.clipboardData?.getData("text/plain");
			this.plainTextToDate(data);
		});
	}

	/**
	 * Parses a date string and sets component values
	 * Supports formats: DD/MM/YYYY, YYYY-MM-DD, and optional time HH:MM
	 * @param {string} data - The date string to parse
	 */
	plainTextToDate(data?: string) {
		if (data && (data.includes("/") || data.includes("-"))) {
			let splitter = data.includes("/") ? "/" : "-";
			let parts = data.split(" ");
			let date = parts[0].split(splitter);
			if (date.length == 3) {
				if (date[2].length == 4) {
					this.dd = date[0];
					this.mm = date[1];
					this.yyyy = date[2];
				} else if (date[0].length == 4) {
					this.dd = date[2];
					this.mm = date[1];
					this.yyyy = date[0];
				}
			}
			if (parts.length == 2) {
				let time = parts[1].split(":");
				if (time.length == 2) {
					this.hh = time[0];
					this.min = time[1];
				}
			}
		}
	}

	/**
	 * Renders the date input component
	 * @returns {TemplateResult} The rendered template
	 */
	render(): TemplateResult {
		return html`
			<ct-input-container id="container" ?invalid=${this.invalid} .label="${this.label}" .placeholder="${this.placeholder}" .value=${this.placeholder} ?required="${this.required}">
				<slot slot="prefix" name="prefix"></slot>
				<span slot="input" @focus=${this._onFocus}>
					<span ?hidden="${this.nodd}">
						<input
							id="dd"
							maxlength="2"
							size="2"
							placeholder="DD"
							type="tel"
							.value=${this.dd}
							@input=${() => this.validX("dd", this.$dd?.value || "", 0, 31)}
							onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						/>
						<span>/</span>
					</span>
					<input
						id="mm"
						maxlength="2"
						size="2"
						placeholder="MM"
						type="tel"
						.value=${this.mm}
						@input=${() => this.validX("mm", this.$mm?.value || "", 0, 12)}
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
					/>
					<span>/</span>
					<input
						id="yyyy"
						maxlength="4"
						size="4"
						placeholder="YYYY"
						type="tel"
						.value=${this.yyyy}
						@input=${() => this.validX("yyyy", this.$yyyy?.value || "", this.minYYYY, this.maxYYYY)}
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
					/>
					${this.showhour
						? html`<span>
								<span> @ </span>
								<input
									id="hh"
									maxlength="2"
									size="2"
									placeholder="HH"
									type="tel"
									.value=${this.hh}
									@input=${() => this.validX("hh", this.$hh?.value || "", 0, 24)}
									onkeypress="return event.charCode >= 48 && event.charCode <= 57"
								/>
								<span>:</span>
								<input
									id="min"
									maxlength="2"
									size="2"
									placeholder="mm"
									type="tel"
									.value=${this.min}
									@input=${() => this.validX("min", this.$min?.value || "", 0, 59)}
									onkeypress="return event.charCode >= 48 && event.charCode <= 57"
								/>
							</span>`
						: ""}
				</span>
			</ct-input-container>
		`;
	}

	/**
	 * Validates and sets a value for a specific part of the date/time
	 * @param {string} attr - The attribute to validate (yyyy, mm, dd, hh, min)
	 * @param {string} val - The value to validate
	 * @param {number} min - The minimum allowed value
	 * @param {number} max - The maximum allowed value
	 */
	validX(attr: "yyyy" | "mm" | "dd" | "hh" | "min", val: string, min: number, max: number) {
		this.resetInvalid();

		let v = parseInt(val);
		if (`${v}` == "NaN") {
			this[attr] = ``;
		} else if (v < min && `${v}`.length == `${min}`.length) {
			this[attr] = this.addZero(min);
		} else if (v > max) {
			this[attr] = this.addZero(max);
		} else {
			this[attr] = val;
		}
		if (!this.showhour) {
			this.hh = "";
			this.min = "";
		}
		// focus on next input
		if (attr == "dd" && (v > 9 || (this.dd.startsWith("0") && this.dd.length == 2))) {
			this.$mm?.focus();
		} else if (attr == "mm" && (v > 9 || (this.mm.startsWith("0") && this.mm.length == 2))) {
			this.$yyyy?.focus();
		}
		// this.fireValue();
		let unix = Math.floor(
			new Date(
				`${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}T${this.addZero(this.hh || "00", "0")}:${this.addZero(this.min || "00", "0")}${this.usetimezone ? "" : "Z"}`
			).getTime() / 1000
		);
		if (`NaN` != `${unix}`) {
			this.dispatchEvent(new CustomEvent("value", { detail: unix }));
		}
	}

	/**
	 * Sets the date value from a timestamp or string
	 * @param {number|string|undefined} val - Timestamp in seconds or date string
	 */
	set value(val: number | string | undefined) {
		this.loadValue(val);
	}

	/**
	 * Gets the current date value as a timestamp in seconds
	 * @returns {number|undefined} Timestamp in seconds or undefined if invalid
	 */
	get value(): number | undefined {
		// Si existe this.nodd, establece this.dd en '02'
		if (this.nodd) {
			this.dd = "01";
		}

		// Si this.showhour es verdadero y falta alguna de las propiedades requeridas, retorna undefined

		// Si falta alguna de las propiedades requeridas, retorna undefined
		if (!this.yyyy || !this.mm || !this.dd) {
			return undefined;
		} else if (this.showhour && (!this.hh || !this.min)) {
			return undefined;
		}

		// Construye una fecha basada en las propiedades proporcionadas
		let dateStr = `${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}T${
			this.showhour ? `${this.addZero(this.hh, "0")}:${this.addZero(this.min, "0")}` : "00:00:00"
		}${this.usetimezone ? "" : "Z"}`;

		// Obtiene el timestamp en segundos de la fecha construida
		let val = Math.floor(new Date(dateStr).getTime() / 1000);

		// Si val es NaN o 0, retorna undefined; de lo contrario, retorna val
		return val || undefined;
	}

	/**
	 * Gets the current date in standard format
	 * @returns {string|undefined} Date in YYYY-MM-DD or YYYY-MM-DDThh:mm format, or undefined if invalid
	 */
	get valueFormat() {
		if (this.showhour && (!this.yyyy || !this.mm || !this.dd || !this.hh || !this.min)) return undefined;
		if (!this.yyyy || !this.mm || !this.dd) return undefined;
		if (!this.showhour) return `${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}`;
		else return `${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}T${this.addZero(this.hh, "0")}:${this.addZero(this.min, "0")}${this.usetimezone ? "" : "Z"}`;
	}

	/**
	 * Resets the invalid state
	 */
	resetInvalid() {
		this.invalid = false;
		//this.$container?.invalid = false;
	}

	/**
	 * Loads a date value from a timestamp or string
	 * @param {number|string|undefined} value - Timestamp in seconds or date string
	 */
	loadValue(value?: number | string) {
		if (typeof value == "string") {
			this.plainTextToDate(value);
		} else {
			if (value != null && value != -1) {
				let d = new Date(value * 1000);
				if (this.usetimezone) {
					this.dd = `${d.getDate()}`.padStart(2, "0");
					this.mm = `${d.getMonth() + 1}`.padStart(2, "0");
					this.yyyy = `${d.getFullYear()}`.padStart(4, "0");
					this.hh = `${d.getHours()}`.padStart(2, "0");
					this.min = `${d.getMinutes()}`.padStart(2, "0");
				} else {
					this.dd = `${d.getUTCDate()}`.padStart(2, "0");
					this.mm = `${d.getUTCMonth() + 1}`.padStart(2, "0");
					this.yyyy = `${d.getUTCFullYear()}`.padStart(4, "0");
					this.hh = `${d.getUTCHours()}`.padStart(2, "0");
					this.min = `${d.getUTCMinutes()}`.padStart(2, "0");
				}
			} else {
				this.dd = "";
				this.mm = "";
				this.yyyy = "";
				this.hh = "";
				this.min = "";
			}
		}
	}

	/**
	 * Handles focus event on the input
	 * @private
	 */
	_onFocus() {
		if (this.$container) {
			this.resetInvalid();
		}
	}

	/**
	 * Validates the input and sets invalid state if needed
	 * @returns {boolean} True if valid, false otherwise
	 */
	validate() {
		this.resetInvalid();
		if (this.value == undefined) {
			this.invalid = true;
			this.$container!.invalid = true;
		}
		return !this.invalid;
	}

	/**
	 * Checks if a number is valid (not null, not zero, not NaN)
	 * @param {number} num - The number to validate
	 * @returns {boolean} True if valid, false otherwise
	 */
	validNumber(num: number) {
		return num != null && num != 0 && `${num}` != `NaN`;
	}

	/**
	 * Adds a leading zero to numbers less than 10
	 * @param {number|string} n - The number to format
	 * @param {string} onError - The value to use if n is NaN
	 * @returns {string} Formatted number with leading zero if needed
	 */
	addZero(n: number | string, onError = "1") {
		if (`${n}` == "") return "";
		n = Number(n);
		if (`${n}` == "NaN") {
			return `0${onError}`;
		}
		if (n < 10) {
			return `0${n}`;
		}
		return `${n}`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-date": CtDate;
	}
}
