import "@conectate/ct-icon";

import type { icon } from "@conectate/ct-icon/icon-list.js";
import { CtLit, customElement, property, query } from "@conectate/ct-lit";
import { css, html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

/**
 * @element ct-list-item
 *
 * @slot prefix - Content placed above the main content
 * @slot - Default content placed in the middle
 * @slot suffix - Content placed below the main content
 * @cssProp --ct-list-item--white-space - white-space
 */
@customElement("ct-list-item")
export class CtListItem extends CtLit {
	static styles = [
		css`
			:host {
				--ct-icon-size: 21px;
			}

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
				appearance: none;
				background: none;
				border: none;
				display: inline-flex;
				align-items: center;
				white-space: var(--ct-list-item--white-space, nowrap);
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

	@property({ type: Boolean, reflect: true, attribute: "keep-open" }) keepOpen = false;

	render() {
		let button = html`<button @click=${this.closeMenu}>
			<slot name="prefix"></slot>
			${this.icon || this.svg ? html`<ct-icon .svg=${this.svg} icon=${ifDefined(this.icon ? this.icon : undefined)}></ct-icon>` : ""}
			<div class="text">${this.text}<slot></slot></div>
			<slot name="sufix"></slot>
			<slot name="suffix"></slot>
		</button>`;
		let href = this.href || this.link;
		if (href) return html`<a href="${href}" target="${ifDefined(this.target)}"> ${button}</a> `;
		return button;
	}

	closeMenu(e: MouseEvent) {
		let menu = this.closest("ct-button-menu") || this.closest("md-menu");
		if (menu && !this.keepOpen) {
			this.blur();
			// @ts-ignore
			menu.open = false;
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-list-item": CtListItem;
	}
}
