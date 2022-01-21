import '@conectate/ct-input/ct-input-container';

import { CtLit, css, customElement, html, property, query } from '@conectate/ct-lit';

/**
 * Simple cross-platform Date input for LitElement and Web Components
 *
 * @element ct-date
 */
@customElement('ct-date')
export class CtDate extends CtLit {
	/**
	 * Hide Day Value
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
	@property({ type: String }) placeholder = '';

	@property({ type: Number }) minYYYY = 1800;
	@property({ type: Number }) maxYYYY = 2300;

	@property({ type: String }) label = '';
	@property({ type: Boolean }) required = false;
	@property({ type: Boolean }) hidden = false;

	@property({ type: Boolean }) invalid: boolean = false;
	@property({ type: String }) mm = '';
	@property({ type: String }) dd = '';
	@property({ type: String }) yyyy = '';
	@property({ type: String }) hh = '';
	@property({ type: String }) min = '';

	@query('#dd') $dd?: HTMLInputElement;
	@query('#mm') $mm?: HTMLInputElement;
	@query('#yyyy') $yyyy?: HTMLInputElement;
	@query('#hh') $hh?: HTMLInputElement;
	@query('#min') $min?: HTMLInputElement;
	@query('#container') $container?: HTMLElementTagNameMap['ct-input-container'];

	static styles = [
		css`
			:host {
				display: inline-flex;
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

			.sep {
				font-size: 1.2em;
				font-weight: bold;
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

	render() {
		return html`
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
					<span ?hidden="${this.nodd}">
						<input
							id="dd"
							maxlength="2"
							size="2"
							placeholder="DD"
							type="tel"
							.value=${this.dd}
							@input=${() => this.validX('dd', this.$dd?.value || '', 0, 31)}
							onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						/>
						<span class="sep">/</span>
					</span>
					<input
						id="mm"
						maxlength="2"
						size="2"
						placeholder="MM"
						type="tel"
						.value=${this.mm}
						@input=${() => this.validX('mm', this.$mm?.value || '', 0, 12)}
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
					/>
					<span class="sep">/</span>
					<input
						id="yyyy"
						maxlength="4"
						size="4"
						placeholder="YYYY"
						type="tel"
						.value=${this.yyyy}
						@input=${() => this.validX('yyyy', this.$yyyy?.value || '', this.minYYYY, this.maxYYYY)}
						onkeypress="return event.charCode >= 48 && event.charCode <= 57"
					/>
					<span ?hidden=${!this.showhour}>
						<span class="sep"> @ </span>
						<input
							id="hh"
							maxlength="2"
							size="2"
							placeholder="HH"
							type="tel"
							.value=${this.hh}
							@input=${() => this.validX('hh', this.$hh?.value || '', 0, 24)}
							onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						/>
						<span class="sep">:</span>
						<input
							id="min"
							maxlength="2"
							size="2"
							placeholder="mm"
							type="tel"
							.value=${this.min}
							@input=${() => this.validX('min', this.$min?.value || '', 0, 59)}
							onkeypress="return event.charCode >= 48 && event.charCode <= 57"
						/>
					</span>
				</span>
			</ct-input-container>
		`;
	}

	validX(attr: 'yyyy' | 'mm' | 'dd' | 'hh' | 'min', val: string, min: number, max: number) {
		this.resetInvalid();

		let v = parseInt(val);
		if (`${v}` == 'NaN') {
			this[attr] = ``;
		} else if (v < min && `${v}`.length == `${min}`.length) {
			this[attr] = this.addZero(min);
		} else if (v > max) {
			this[attr] = this.addZero(max);
		} else {
			this[attr] = val;
		}
		if (!this.showhour) {
			this.hh = '';
			this.min = '';
		}
		// focus on next input
		if (attr == 'dd' && (v > 9 || (this.dd.startsWith('0') && this.dd.length == 2))) {
			this.$mm?.focus();
		} else if (attr == 'mm' && (v > 9 || (this.mm.startsWith('0') && this.mm.length == 2))) {
			this.$yyyy?.focus();
		}
		this.fireValue();
	}

	fireValue() {
		let val = Math.floor(
			new Date(
				`${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}T${this.addZero(this.hh, '0')}:${this.addZero(this.min, '0')}${this.usetimezone ? '' : 'Z'}`
			).getTime() / 1000
		);
		if (`NaN` != `${val}`) {
			// console.log('fireValue', new Date(`${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}T${this.addZero(this.hh,'0')}:${this.addZero(this.min,'0')}`))
			this.dispatchEvent(new CustomEvent('value', { detail: val }));
		}
	}

	set value(val) {
		this.loadValue(val);
	}

	get value() {
		let val = Math.floor(
			new Date(
				this.showhour
					? `${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.nodd ? '02' : this.dd)}T${this.addZero(this.hh, '0')}:${this.addZero(this.min, '0')}${
							this.usetimezone ? '' : 'Z'
					  }`
					: `${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.nodd ? '02' : this.dd)}`
			).getTime() / 1000
		);
		return val || undefined;
	}

	/**
	 * Return value in yyyy-mm-dd format
	 */
	get valueFormat() {
		if (!this.showhour) return `${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}`;
		else return `${this.yyyy}-${this.addZero(this.mm)}-${this.addZero(this.dd)}T${this.addZero(this.hh, '0')}:${this.addZero(this.min, '0')}${this.usetimezone ? '' : 'Z'}`;
	}

	resetInvalid() {
		this.invalid = false;
		//this.$container?.invalid = false;
	}

	/**
	 * format yyyy-mm-dd in UI from timestamp
	 * @param value timestamp value in seconds
	 */
	loadValue(value?: number) {
		if (value && value != -1) {
			if (this.usetimezone) {
				this.dd = `${new Date(value * 1000).getDate()}`;
				this.mm = `${new Date(value * 1000).getMonth() + 1}`;
				this.yyyy = `${new Date(value * 1000).getFullYear()}`;
				this.hh = `${new Date(value * 1000).getHours()}`;
				this.min = `${new Date(value * 1000).getMinutes()}`;
			} else {
				this.dd = `${new Date(value * 1000).getUTCDate()}`;
				this.mm = `${new Date(value * 1000).getUTCMonth() + 1}`;
				this.yyyy = `${new Date(value * 1000).getUTCFullYear()}`;
				this.hh = `${new Date(value * 1000).getUTCHours()}`;
				this.min = `${new Date(value * 1000).getUTCMinutes()}`;
			}
		} else {
			this.dd = '';
			this.mm = '';
			this.yyyy = '';
			this.hh = '';
			this.min = '';
		}
	}

	/**
	 * Cuando Hago focus en el input
	 * @private
	 */
	_onFocus() {
		if (this.$container) {
			this.resetInvalid();
		}
	}

	validate() {
		this.resetInvalid();
		if (this.value == undefined) {
			this.invalid = true;
			this.$container!.invalid = true;
		}
		return !this.invalid;
	}

	validNumber(num: number) {
		return num != null && num != 0 && `${num}` != `NaN`;
	}

	addZero(n: number | string, onError = '1') {
		n = parseInt(n as string);
		if (`${n}` == 'NaN') {
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
		'ct-date': CtDate;
	}
}
