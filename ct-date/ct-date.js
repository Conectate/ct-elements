var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CtLit, html, property } from "@conectate/ct-lit/ct-lit";
import "@conectate/ct-input/ct-input-container";
import "@conectate/lit-if/lit-if";
export class CtDate extends CtLit {
    constructor() {
        super();
        this.placeholder = "";
        this.usetimezone = false;
        this.minYYYY = 1800;
        this.maxYYYY = 2300;
        this.nodd = false;
        this.invalid = false;
        this.$ = {};
        this.loadValue();
    }
    render() {
        return html `
			<style>
				:host {
					display: inline-block;
					color: rgba(0, 0, 0, 0.54);
					margin-bottom: 8px;
				}

				span {
					min-width: 150px;
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
				}

				::-webkit-input-placeholder {
					color: inherit;
					opacity: 0.5;
				}

				#container {
					flex: 1;
					margin: 0;
				}

				.sep {
					font-size: 1.2em;
					font-weight: bold;
				}
				#dd,
				#mm {
					min-width: 32px;
				}
				#yyyy {
					min-width: 50px;
				}
			</style>

			<ct-input-container
				id="container"
				?invalid=${this.invalid}
				.label="${this.label}"
				.placeholder="${this.placeholder}"
				.value=${this.placeholder}
				?required="${this.required}"
			>
				<slot name="prefix" slot="prefix"></slot>
				<span slot="input" @focus=${this._onFocus}>
					<lit-if ?if="${!this.nodd}">
						<input
							id="dd"
							maxlength="2"
							size="2"
							placeholder="DD"
							.value=${`${this._dd || ""}`}
							@input=${() => (this.dd = parseInt(this.$.dd?.value || "0"))}
							onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						/>
						<span class="sep">/</span>
					</lit-if>
					<input
						id="mm"
						maxlength="2"
						size="2"
						placeholder="MM"
						.value=${`${this._mm || ""}`}
						@input=${() => (this.mm = parseInt(this.$.mm?.value || "0"))}
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
					/>
					<span class="sep">/</span>
					<input
						id="yyyy"
						maxlength="4"
						size="4"
						placeholder="YYYY"
						.value=${`${this._yyyy || ""}`}
						@input=${() => (this.yyyy = parseInt(this.$.yyyy?.value || "0"))}
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
					/>
				</span>
			</ct-input-container>
		`;
    }
    firstUpdated(cp) {
        super.firstUpdated(cp);
        this.mapIDs();
    }
    getSplitter() {
        return this.usetimezone ? '/' : '-';
    }
    view() {
        setInterval(() => {
            console.log("activeElement", this.shadowRoot?.activeElement == this.$.mm);
        }, 1000);
    }
    static get properties() {
        return {
            required: { type: Boolean },
            label: { type: String },
            hidden: { type: Boolean },
            /**
             * No Day Value
             */
            nodd: { type: Boolean },
            invalid: { type: Boolean },
            _value: { type: Number },
            _dd: { type: Number },
            _mm: { type: Number },
            _yyyy: { type: Number },
            dd: { type: Number },
            mm: { type: Number },
            yyyy: { type: Number }
        };
    }
    set value(val) {
        if (val != this._value) {
            let old = this._value;
            this._value = val;
            this.loadValue(val);
            this.requestUpdate("value", old);
        }
    }
    get value() {
        return this._value;
    }
    set dd(val) {
        if (val != this._dd) {
            let old = this._dd;
            val = this.checkDD(val);
            this._dd = val;
            this._computeValue(this.dd, this.mm, this.yyyy);
            this.requestUpdate("dd", old);
        }
    }
    get dd() {
        return this._dd;
    }
    set mm(val) {
        if (val != this._mm) {
            let old = this._mm;
            val = this.checkMM(val);
            this._mm = val;
            this._computeValue(this.dd, this.mm, this.yyyy);
            this.requestUpdate("mm", old);
        }
    }
    get mm() {
        return this._mm;
    }
    set yyyy(val) {
        if (val != this._yyyy) {
            let old = this._yyyy;
            val = this.checkYYYY(val);
            this._yyyy = val;
            this._computeValue(this.dd, this.mm, this.yyyy);
            this.requestUpdate("yyyy", old);
        }
    }
    get yyyy() {
        return this._yyyy;
    }
    /**
     * Return value in yyyy-mm-dd format
     */
    get valueFormat() {
        return `${this.yyyy}-${this.DDMM(this.mm)}-${this.DDMM(this.dd)}`;
    }
    resetInvalid() {
        this.invalid = false;
        //this.$.container?.invalid = false;
    }
    /**
     * format yyyy-mm-dd in UI from timestamp
     * @param value timestamp value in seconds
     */
    loadValue(value) {
        if (value && value != -1) {
            if (this.usetimezone) {
                this.dd = new Date(value * 1000).getDate();
                this.mm = new Date(value * 1000).getMonth() + 1;
                this.yyyy = new Date(value * 1000).getFullYear();
            }
            else {
                this.dd = new Date(value * 1000).getUTCDate();
                this.mm = new Date(value * 1000).getUTCMonth() + 1;
                this.yyyy = new Date(value * 1000).getUTCFullYear();
            }
        }
        else {
            this.dd = 0;
            this.mm = 0;
            this.yyyy = 0;
        }
    }
    /**
     * Cuando Hago focus en el input
     * @private
     */
    _onFocus() {
        if (this.$.container) {
            this.resetInvalid();
        }
    }
    checkDD(dd) {
        this.resetInvalid();
        if (dd > 3 && dd < 10 && (dd + "").length == 1) {
            this.shadowRoot?.activeElement == this.$.dd && this.$.mm?.focus();
        }
        else if ((dd + "").length == 2) {
            if (dd > 31)
                dd = 31;
            this.shadowRoot?.activeElement == this.$.dd && this.$.mm?.focus();
        }
        return dd;
    }
    checkMM(mm) {
        this.resetInvalid();
        // Agregar el 0 si esta entre 1 - 9
        if (mm > 1 && mm < 10 && (mm + "").length == 1) {
            this.shadowRoot?.activeElement == this.$.mm && this.$.yyyy?.focus();
        }
        else if ((mm + "").length == 2) {
            if (mm > 12)
                mm = 12;
            this.shadowRoot?.activeElement == this.$.mm && this.$.yyyy?.focus();
        }
        return mm;
    }
    checkYYYY(yyyy, strict = false) {
        // Veo que todo este bien
        if (this.minYYYY >= yyyy && (strict || `${yyyy}`.length == 4)) {
            yyyy = this.minYYYY;
        }
        else if (yyyy > this.maxYYYY) {
            if (this.usetimezone) {
                yyyy = new Date().getFullYear();
            }
            else {
                yyyy = new Date().getUTCFullYear();
            }
        }
        return yyyy;
    }
    validate() {
        if (this.nodd) {
            this.dd = 2;
        }
        let str = `${this.yyyy}`;
        if (str.length == 2) {
            this.yyyy = parseInt(`20${str}`);
        }
        this.yyyy = this.checkYYYY(this.yyyy, true);
        if (this.dd != null &&
            this.mm != null &&
            this.yyyy != null &&
            this._yyyy > this.minYYYY &&
            this._yyyy < this.maxYYYY &&
            this.value != -1 &&
            this.value != null) {
            this.resetInvalid();
        }
        else {
            console.error(this, this.dd, this.mm, this.yyyy, this.value);
            this.invalid = true;
            this.$.container.invalid = true;
        }
        return !this.invalid;
    }
    _computeValue(dd, mm, yyyy) {
        if (this.nodd) {
            this.dd = 2;
        }
        if (this.validNumber(dd) &&
            this.validNumber(mm) &&
            this.validNumber(yyyy) &&
            yyyy > this.minYYYY &&
            yyyy < this.maxYYYY) {
            //console.log("set value", dd, mm, yyyy);
            //console.log("set", `${yyyy}-${mm}-${dd}`, parseInt(new Date(`${yyyy}-${this.DDMM(mm)}-${this.DDMM(dd)}`).getTime() / 1000));
            let val = Math.floor(new Date(`${yyyy}${this.getSplitter()}${this.DDMM(mm)}${this.getSplitter()}${this.DDMM(dd)}`).getTime() / 1000);
            if (this.value != val) {
                this.value = val;
                this.dispatchEvent(new CustomEvent("value", { detail: val }));
            }
        }
        else if (dd == 0 && mm == 0 && yyyy == 0) {
            this.value = undefined;
            this.dispatchEvent(new CustomEvent("value", { detail: undefined }));
        }
    }
    validNumber(num) {
        return num != null && num != 0 && num != NaN;
    }
    DDMM(n) {
        if (n < 10) {
            return "0" + n;
        }
        return n;
    }
}
__decorate([
    property({ type: String })
], CtDate.prototype, "placeholder", void 0);
__decorate([
    property({ type: Boolean })
], CtDate.prototype, "usetimezone", void 0);
__decorate([
    property({ type: Number })
], CtDate.prototype, "minYYYY", void 0);
__decorate([
    property({ type: Number })
], CtDate.prototype, "maxYYYY", void 0);
window.customElements.define("ct-date", CtDate);
