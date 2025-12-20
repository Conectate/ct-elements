import "../ct-icon/ct-icon.js";

import { CtLit, customElement, property } from "../ct-lit/ct-lit.js";
import { css, html } from "lit";

@customElement("ct-select-item")
export class CtSelectItem extends CtLit {
	static styles = [
		css`
			:host {
				display: flex;
				align-items: center;
				cursor: pointer;
				background-color: var(--color-surface, #fff);
				transition: background-color 0.2s ease-in-out;
				padding: 8px;
				border-bottom: 1px solid var(--color-outline, #89898936);
			}
			button {
				min-width: 170px;
				color: var(--color-on-surface, #535353);
				margin: 0;
				height: 38px;
				width: 100%;
				background: none;
				outline: none;
				border: none;
				text-align: initial;
				cursor: pointer;
				transition: all 0.15s ease;
			}
			:host(:hover) {
				background-color: #85858516;
			}

			:host([selected]) {
				background-color: #8585851f;
			}
			.cicle {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 24px;
				min-width: 24px;
				height: 24px;
				min-height: 24px;
				border-radius: 50%;
				background-color: var(--color-primary-light, #2cb5e82b);
				color: var(--color-primary, #2cb5e8);
				margin-right: 16px;
				transition: all 0.15s ease;
			}
			:host([selected]) .cicle {
				background-color: var(--color-primary, #2cb5e8);
				color: var(--color-on-primary, #fff);
			}
			ct-icon {
				font-size: 16px;
				--ct-icon-size: 16px;
			}

			[hidden] {
				display: none;
			}
		`
	];
	@property({ type: Number }) value = 0;
	@property({ type: Boolean, reflect: true }) multi = false;
	@property({ type: Boolean, reflect: true }) selected = false;

	render() {
		return html`<div class="cicle" ?hidden=${!this.multi && !this.selected}><ct-icon icon="${this.selected ? `check` : ""}"></ct-icon></div>
			<button>
				<b><slot></slot></b>
			</button> `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-select-item": CtSelectItem;
	}
}
