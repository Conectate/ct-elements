import "@conectate/ct-icon/ct-icon";

import type { icon } from "@conectate/ct-icon/icon-list";
import { CtLit, customElement, property, query } from "@conectate/ct-lit";
import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @element ct-list-item
 *
 * @slot prefix - Content placed above the main content
 * @slot - Default content placed in the middle
 * @slot suffix - Content placed below the main content
 */
@customElement("ct-list-item")
export class CtListItem extends CtLit {
	static styles = [
		css`
			:host,
			a {
				display: flex;
				flex: 1;
				outline: none;
				cursor: pointer;
				color: inherit;
				text-decoration: none;
			}

			button {
				cursor: pointer;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background: none;
				border: none;
				display: inline-flex;
				align-items: center;
				white-space: nowrap;
				font-family: inherit;
				font-size: inherit;
				font-weight: 500;
				text-align: start;
				padding: 8px 16px;
				flex: 1;
				line-height: 1.75;
				color: inherit;
				outline-color: var(--color-primary);
				outline-offset: -5px;
				transition: background 0.2s ease-in-out;
			}
			:host(:hover) {
				background: #7c7c7c36;
			}

			.text {
				flex: 1;
			}
			ct-icon {
				--ct-icon-size: 21px;
				margin-right: 16px;
				width: 21px;
				height: 21px;
				min-width: 21px;
				min-height: 21px;
			}
		`
	];
	@query("button") public button!: HTMLButtonElement;
	@property({ type: String }) svg = "";
	@property({ type: String }) icon?: icon;
	/** Inner Text */
	@property({ type: String }) text = "";
	/** @deprecated use href instead */
	@property({ type: String }) link?: string;
	/** Link */
	@property({ type: String }) href?: string;
	/** Link */
	@property({ type: String }) target?: "_self" | "_top" | "_blank";

	render() {
		let button = html`<button>
			<slot name="prefix"></slot>
			${this.icon || this.svg ? html`<ct-icon .svg=${this.svg} icon=${ifDefined(this.icon)}></ct-icon>` : ""}
			<div class="text">${this.text}<slot></slot></div>
			<slot name="sufix"></slot>
			<slot name="suffix"></slot>
		</button>`;
		let href = this.href || this.link;
		if (href) return html`<a href="${href}" target="${ifDefined(this.target)}"> ${button}</a> `;
		return button;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-list-item": CtListItem;
	}
}
