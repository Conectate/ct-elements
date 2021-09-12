import '@conectate/ct-icon';

import { CtLit, css, customElement, html, property, query } from '@conectate/ct-lit';

/**
 * ## `ct-checkbox`
 * Checkbox element
 *
 * @group ct-elements
 * @element ct-checkbox
 * @attr {boolean} checked
 * @attr {boolean} margin
 */
@customElement('ct-checkbox')
export class CtCheckbox extends CtLit {
	@property({ type: Boolean, reflect: true }) indeterminate?: boolean;
	@property({ type: Boolean, reflect: true }) disabled = false;
	@property({ type: Boolean, reflect: true }) checked = false;
	@property({ type: Object }) value: any;
	static styles = [
		css`
			:host {
				display: inline-flex;
				position: relative;
				--ct-checkbox-box-size: 24px;
				--ct-checkbox-box-border-radius: 8px;
				--ct-checkbox-height: var(--ct-checkbox-box-size);
				--ct-checkbox-box-border-size: 3px;
			}
			#input:focus-visible + .c {
				border-radius: 8px;
				box-shadow: 0 0 0 1px var(--color-primary);
			}

			:host([disabled]),
			:host([disabled]) #input:focus-visible {
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
			}
			:host([indeterminate]) #box #checkmark,
			#input:checked + .c > #box #checkmark {
				transform: scale(1);
				opacity: 1;
			}

			#checkmark {
				font-size: 20px;
				height: 20px;
				width: 20px;
				overflow: hidden;
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
			:host([indeterminate]) #box::before,
			#input:checked + .c > #box::before {
				border-width: calc(var(--ct-checkbox-box-size) / 2);
			}
			#input:checked + .c > #box::before,
			:host([indeterminate]) #box::before {
				border-color: var(--color-primary, #2cb5e8);
				color: var(--color-on-primary, #fff);
			}
		`
	];

	@query('#input') $input!: HTMLInputElement;
	render() {
		return html`
			<input id="input" type="checkbox" @change=${this.change} .checked=${this.checked} .disabled=${this.disabled} />
			<div class="c">
				<span id="box">
					<ct-icon
						id="checkmark"
						class="${this.indeterminate == false && this.checked ? 'rotate' : ''}"
						icon="${this.indeterminate ? 'horizontal_rule' : `check`}"
						dir="ltr"
					></ct-icon>
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
		if (this.checked) this.indeterminate = false;
		this.dispatchEvent(new CustomEvent('checked', { detail: { checked: this.$input.checked } }));
	}
}
