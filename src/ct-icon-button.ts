import "./ct-icon.js";

import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";

import { icon } from "./icon-list.js";

/**
 * A circular button component that displays a Material Icon or custom SVG.
 *
 * This component builds upon the `ct-icon` component and provides button
 * functionality with hover and active states. It's perfect for creating
 * icon-based action buttons in your application.
 *
 * @element ct-icon-button
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <ct-icon-button icon="headphones"></ct-icon-button>
 *
 * <!-- Disabled state -->
 * <ct-icon-button icon="delete" disabled></ct-icon-button>
 *
 * <!-- With accessibility label -->
 * <ct-icon-button icon="search" aria-label="Search"></ct-icon-button>
 *
 * <!-- Using custom SVG -->
 * <ct-icon-button svg="<svg viewBox='0 0 24 24'><path d='M12 2L2 7l10 5 10-5-10-5z'/></svg>"></ct-icon-button>
 * ```
 *
 * @csspart button - The button element
 * @csspart icon - The icon element (forwarded from ct-icon)
 *
 * @cssproperty --ct-icon-size - Size of the icon (default: 24px)
 * @cssproperty --ct-icon-button-padding - Padding around the icon (calculated based on icon size)
 */
@customElement("ct-icon-button")
export class CtIconButton extends LitElement {
	static styles = css`
		:host {
			display: inline-flex;
			border-radius: 50%;
			outline: none;
			-webkit-tap-highlight-color: transparent;
		}
		:host(:hover) {
			background: #7c7c7c0d;
		}
		:host(:active) {
			background: #7c7c7c2a;
		}

		:host([disabled]) {
			pointer-events: none;
			opacity: 0.5;
		}
		button {
			line-height: 0px;
			vertical-align: top;
			display: inline-flex;
			position: relative;
			box-sizing: border-box;
			border: none;
			outline: none;
			background-color: transparent;
			fill: currentcolor;
			color: inherit;
			text-decoration: none;
			cursor: pointer;
			user-select: none;
			padding: calc((var(--ct-icon-size, 24px) * 2 - var(--ct-icon-size, 24px)) / 2);
		}
	`;

	/**
	 * Whether the button is disabled
	 */
	@property({ type: Boolean, reflect: true }) disabled = false;

	/**
	 * The name of the Material Icon to display
	 * @see https://fonts.google.com/icons
	 */
	@property({ type: String }) icon?: icon;

	/**
	 * Custom SVG content if the icon is not available in Google Fonts
	 */
	@property({ type: String }) svg?: string;

	/**
	 * Accessible label for the button
	 * If not provided, the icon name will be used as the aria-label
	 */
	@property({ type: String, attribute: "aria-label" })
	ariaLabel: string = "";

	/**
	 * Renders the icon button with proper accessibility attributes
	 */
	render() {
		return html`<button aria-label="${ifDefined(this.ariaLabel || this.icon)}" ?disabled="${this.disabled}">
			<ct-icon .icon=${this.icon} .svg=${this.svg}> ${this.innerHTML.includes("svg") ? html`<slot name="icon"></slot>` : nothing} </ct-icon>
			<span><slot></slot></span>
		</button>`;
	}
}
