import { CtLit, css, customElement, html, property, query } from '@conectate/ct-lit';

/**
 * ## `ct-radio`
 * radio element
 *
 * @group ct-elements
 * @element ct-radio
 * @attr {boolean} checked
 */
@customElement('ct-radio')
export class CtRadio extends CtLit {
	@property({ type: Boolean, reflect: true }) disabled = false;
	@property({ type: Boolean, reflect: true }) checked = false;
	@property({ type: Object }) value: any;
	@property({ type: Object }) parent: any;
	@property({ type: String }) name!: string;
	static styles = [
		css`
			:host {
				display: inline-flex;
				position: relative;
				--ct-checkbox-box-size: 24px;
				--ct-checkbox-box-border-radius: 50%;
				--ct-checkbox-height: var(--ct-checkbox-box-size);
				--ct-checkbox-box-border-size: 3px;
			}

			:host([disabled]) {
				pointer-events: none;
				opacity: 0.33;
			}
			.c {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			#input {
				font-family: inherit;
				font-size: 100%;
				line-height: 1.15;
				margin: 0px;
				overflow: visible;
				box-sizing: border-box;
				padding: 0px;
				position: absolute;
				width: 100%;
				height: 100%;
				opacity: 0.0001;
				z-index: 1;
				cursor: pointer;
			}
		`,
		// Checkmark
		css`
			#checkmark {
				opacity: 0;
				transform: scale(0);
				transition: opacity 0.13s ease-in-out, transform 0.13s ease-in-out;
				height: 10px;
				width: 10px;
				overflow: hidden;
				background: var(--color-primary, #2cb5e8);
				border-radius: 50%;
			}

			#input:checked + #box #checkmark {
				transform: scale(1);
				opacity: 1;
			}
			@keyframes rotate {
				from {
					transform: rotate(0deg);
				}
				to {
					transform: rotate(360deg);
				}
			}
			#checkmark.rotate {
				animation: rotate 0.3s none ease-out;
				animation: rotate 0.3s none cubic-bezier(0.6, 0.49, 0.46, 0.85);
			}
		`,
		// Box
		css`
			#box {
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				box-sizing: border-box;
				width: var(--ct-checkbox-box-size);
				height: var(--ct-checkbox-box-size);
				margin: calc((var(--ct-checkbox-height) - var(--ct-checkbox-box-size)) / 2) 0;
				flex-grow: 0;
				color: var(--color-on-primary, #fff);
				flex-shrink: 0;
				margin: 8px;
			}
			#box::before {
				display: block;
				z-index: 0;
				inset: 0;
				content: '';
				box-sizing: border-box;
				position: absolute;
				width: var(--ct-checkbox-box-size);
				height: var(--ct-checkbox-box-size);
				border-radius: var(--ct-checkbox-box-border-radius);
				border-width: var(--ct-checkbox-box-border-size);
				border-style: solid;
				border-color: var(--color-on-background, #535353);
				transition: border 0.13s ease-in-out, box-shadow 0.13s ease-in-out;
			}
			#input:checked + #box::before {
				/* border-width: calc(var(--ct-checkbox-box-size) / 2); */
			}
			#input:checked + #box::before {
				border-color: var(--color-primary, #2cb5e8);
				color: var(--color-on-primary, #fff);
			}
		`
	];

	@query('#input') $input!: HTMLInputElement;
	render() {
		return html`
			<div class="c">
				<input id="input" type="checkbox" @change=${this.change} .checked=${this.checked} />
				<span id="box">
					<div id="checkmark" dir="ltr"></div>
				</span>

				<span id="label"><slot></slot></span>
			</div>
		`;
	}

	firstUpdated() {
		this.mapIDs();
	}

	click() {
		this.$.input.click();
	}

	change() {
		this.checked = this.$input.checked;
		let parent = this.parent || this.parentElement || this.parentNode;
		if (this.name && parent?.querySelectorAll) {
			// @ts-ignore
			let radios: CtRadio[] = parent.querySelectorAll('ct-radio') || [];
			for (let radio of radios) {
				if (radio.name == this.name && radio != this && this.checked) {
					radio.checked = false;
				}
			}
		}
		this.dispatchEvent(new CustomEvent('checked', { detail: { checked: this.$input.checked } }));
	}
}
