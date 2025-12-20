import "./ct-icon.js";

import { css } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { html, literal } from "lit/static-html.js";

import { CtLit, customElement, property } from "./ct-lit.js";
import type { icon } from "./icon-list.js";

/**
 * A customizable list item component that can display icons, text, and additional content.
 *
 * This component can be used standalone or within menu/list structures and provides
 * a flexible layout with slots for prefix, main content, and suffix elements.
 * It can act as a button or as a link depending on the properties provided.
 *
 * Features:
 * - Display text with optional icons
 * - Can act as a navigation link when href/link is provided
 * - Auto-closes parent menus when clicked (configurable)
 * - Customizable appearance with CSS variables
 * - Responsive hover and active states
 *
 * @element ct-list-item
 *
 * @slot prefix - Content placed before the main content (left side in LTR layouts)
 * @slot - Default slot for main content
 * @slot suffix - Content placed after the main content (right side in LTR layouts)
 *
 * @cssprop --ct-list-item--white-space - Controls text wrapping (default: nowrap)
 * @cssprop --ct-icon-size - Size of the icon displayed (default: 21px)
 * @cssprop --color-outline - Color of the bottom border (default: transparent)
 * @cssprop --color-primary - Color used for outline when focused
 *
 * @example
 * ```html
 * <!-- Basic usage with text -->
 * <ct-list-item text="Settings"></ct-list-item>
 *
 * <!-- With icon -->
 * <ct-list-item icon="settings" text="Settings"></ct-list-item>
 *
 * <!-- As a link -->
 * <ct-list-item icon="home" text="Home" href="/home"></ct-list-item>
 *
 * <!-- With custom content -->
 * <ct-list-item>
 *   <span slot="prefix">🔔</span>
 *   Custom content here
 *   <span slot="suffix">3</span>
 * </ct-list-item>
 * ```
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

			button,
			.btn {
				cursor: pointer;
				appearance: none;
				background: none;
				border: none;
				display: inline-flex;
				width: 100%;
				align-items: center;
				white-space: var(--ct-list-item--white-space, nowrap);
				font-family: inherit;
				font-size: inherit;
				font-weight: inherit;
				text-align: start;
				padding: 0;
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
				display: flex;
				flex-wrap: nowrap;
				flex: 1;
				border-bottom: 1px solid var(--color-outline, transparent);
			}
			.text span {
				padding: var(--ct-list-item--padding, 8px 16px 8px 0);
				flex: 1;
			}
			:host(:last-child) .text,
			:host([hideoutline]) .text {
				border-bottom: none;
			}

			ct-icon {
				margin: 0 16px;
				width: 21px;
				height: 21px;
				min-width: 21px;
				min-height: 21px;
			}
			.space {
				margin-right: 16px;
			}
		`
	];

	/**
	 * Custom SVG content for the icon (alternative to using the icon property)
	 */
	@property({ type: String }) svg = "";

	/**
	 * Material icon name to display
	 * @see https://fonts.google.com/icons
	 */
	@property({ type: String }) icon?: icon | (string & {});

	/**
	 * Text content to display in the list item
	 */
	@property({ type: String }) text = "";

	/**
	 * URL the item should navigate to when clicked
	 * @deprecated use href instead
	 */
	@property({ type: String }) link?: string;

	/**
	 * URL the item should navigate to when clicked
	 */
	@property({ type: String }) href?: string;

	/**
	 * Target attribute for the link
	 * Controls how the link opens (same window, new tab, etc.)
	 */
	@property({ type: String }) target?: "_self" | "_top" | "_blank";

	/**
	 * When true, clicking this item won't close parent menus
	 * Useful for items that trigger actions that should keep the menu open
	 */
	@property({ type: Boolean, reflect: true, attribute: "keep-open" }) keepOpen = false;

	/**
	 * When true, hides the bottom border
	 * Typically used for the last item or for custom styling
	 */
	@property({ type: Boolean, reflect: true }) hideoutline = false;

	/**
	 * When true, hides the bottom border
	 * Typically used for the last item or for custom styling
	 */
	@property({ type: String, reflect: true }) role: "button" | "menuitem" = "menuitem";

	/**
	 * Renders the list item as either a button or a link based on properties
	 * @returns Rendered template
	 */
	render() {
		let tag = this.role == "button" ? literal`button` : literal`div`;
		let button = html`<${tag} class="btn" @click=${this.closeMenu} aria-label=${this.text} role=${this.role}>
			<slot name="prefix"></slot>
			${this.icon || this.svg ? html`<ct-icon class="space" svg=${this.svg} icon=${ifDefined(this.icon ? this.icon : undefined)}></ct-icon>` : html`<div class="space"></div>`}
			<div class="text">
				<span>${this.text}<slot></slot></span>
				<slot name="suffix"></slot>
			</div>
		</${tag}>`;

		let href = this.href || this.link;
		if (href) return html`<a href="${href}" target="${ifDefined(this.target)}"> ${button}</a> `;
		return button;
	}

	/**
	 * Closes the parent menu when this item is clicked
	 * Respects the keepOpen property
	 * @param e Click event
	 */
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
