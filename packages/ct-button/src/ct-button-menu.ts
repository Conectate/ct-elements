import "@conectate/ct-icon";

import { icon } from "@conectate/ct-icon/icon-list";
import { LitElement, PropertyValueMap, TemplateResult, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { rovingIndex } from "./ct-button-helpers.js";

type leftRight = "left" | "right";
type topBottom = "top" | "bottom";

/**
 * @group ct-elements
 * @element ct-button-menu
 *
 * @css --menu-outline
 * @css --ct-button-menu-box-shadow
 * @css --ct-button-menu-radius
 * @css --ct-button-menu-popup-radius
 */
@customElement("ct-button-menu")
export class CtButtonMenu extends LitElement {
	static styles = [
		css`
			:host {
				display: inline-flex;
				--in-speed: 250ms;
				--out-speed: 250ms;
				cursor: pointer;
				position: relative;
				align-items: center;
				justify-content: center;
				border-radius: 0 var(--ct-button-menu-radius, 26px) var(--ct-button-menu-radius, 26px) 0;
				transform: rotate(0);
			}

			:host(:focus),
			:host(:focus-within) {
				z-index: 1000;
			}

			::slotted(span:empty),
			::slotted(hr) {
				height: 1px;
				background: var(--color-border, #8383835a);
				margin: 8px;
				border: none;
			}
		`,
		css`
			.center {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			/* <Icon> */
			.dropdown-trigger {
				transition: transform var(--in-speed) ease-in-out;
			}
			:host([rotate]) :focus-within > .dropdown-trigger {
				transform: rotate(180deg);
			}
			/* </Icon> */

			/* <ul> */
			:host(:focus-within) .gui-popup {
				transition-duration: var(--in-speed);
				opacity: 1;
				transform: translateY(0);
				pointer-events: auto;
			}

			@media (prefers-reduced-motion: no-preference) {
				.gui-popup {
					transform: translateY(5px);
					transition:
						opacity var(--out-speed) ease,
						transform var(--out-speed) ease;
				}
			}
			.gui-popup {
				opacity: 0;
				pointer-events: none;
				position: absolute;
				list-style-type: none;
				background: var(--color-menu, var(--color-surface, #fff));
				color: var(--color-on-surface, #535353);
				padding-inline: 0;
				padding-top: calc(var(--ct-button-menu-popup-radius, 16px) / 2);
				padding-bottom: calc(var(--ct-button-menu-popup-radius, 16px) / 2);
				border-radius: var(--ct-button-menu-popup-radius, 16px);
				overflow: hidden;
				display: flex;
				flex-direction: column;
				font-size: 0.9em;
				transition: opacity var(--out-speed) ease;
				box-shadow: var(--ct-button-menu-box-shadow, #0a0e1d05 0px 8px 16px 0px, #0a0e1d0f 0px 8px 40px 0px);
				outline: var(--menu-outline, none);
				/* fixes iOS trying to be helpful */
			}

			.gui-popup:focus {
				outline: none;
			}
			.gui-popup button {
				color: var(--color-on-surface, #535353);
				width: 100%;
			}
		`
	];
	@property() anim_selector = "ct-list-item";
	@property({ type: String, reflect: true }) title = "Open for more actions";
	@property({ type: Number, reflect: true }) tabindex = -1;
	@property({ type: Boolean, reflect: true }) rotate = false;
	@property({ type: Boolean, reflect: true }) open = false;
	/** Location from opened */
	@property({ type: String }) from?: topBottom | leftRight | `${topBottom}-${leftRight}` = "bottom-left";
	/** Template Result of Trigger */
	@property({ type: Object }) dropDownTrigger?: TemplateResult<any>;
	@property({ type: Boolean }) use_slot = false;
	/** keep popup after click, you must close programmatically */
	@property({ type: Boolean, reflect: true }) keep = false;
	/** Dropdown icon */
	@property() icon: icon = "expand_more";

	@query(".gui-popup") popup!: HTMLSpanElement;

	render() {
		return html` <span class="dropdown-trigger center">
				${this.dropDownTrigger ? this.dropDownTrigger : this.use_slot ? html`<slot name="dropdown"></slot>` : html`<ct-icon icon="${this.icon}"></ct-icon>`}
			</span>
			<!-- <ct-icon icon="expand_more"></ct-icon> -->
			<div class="gui-popup">
				<slot></slot>
			</div>`;
	}
	firstUpdated() {
		this.addEventListener("focusin", () => {
			this.open = true;
		});
		this.addEventListener("focusout", () => {
			this.open = false;
		});
		this.addEventListener("keyup", (e: KeyboardEvent) => {
			if (e.code === "Escape") this.open = false;
		});

		/* if (!this.keep) {
			this.addEventListener("click", ev => {
				ev.stopPropagation();
				ev.preventDefault();
			});
			this.popup.addEventListener("click", e => {
				e.stopPropagation();
				setTimeout(() => {
					(e.target as this)?.blur();
					this.blur();
				}, 100);
			});
		} */

		switch (this.from) {
			case "top": {
				this.popup.style.top = "80%";
				this.popup.style.right = "0";
				this.popup.style.transformOrigin = "center top 0px";
				break;
			}
			case "top-right": {
				this.popup.style.top = "80%";
				this.popup.style.right = "30%";
				this.popup.style.transformOrigin = "right top 0px";
				break;
			}
			case "top-left": {
				this.popup.style.top = "80%";
				this.popup.style.left = "0";
				this.popup.style.transformOrigin = "left top 0px";
				break;
			}
			case "bottom": {
				this.popup.style.bottom = "80%";
				this.popup.style.right = "0";
				this.popup.style.transformOrigin = "center bottom 0px";
				break;
			}
			case "bottom-right": {
				this.popup.style.bottom = "80%";
				this.popup.style.right = "30%";
				this.popup.style.transformOrigin = "right bottom 0px";
				break;
			}
			default:
			case "bottom-left": {
				this.popup.style.bottom = "80%";
				this.popup.style.left = "30%";
				this.popup.style.transformOrigin = "left bottom 0px";
				break;
			}
		}
		// this.extra();
	}
	close() {
		this.blur();
	}

	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		if (_changedProperties.has("open") && _changedProperties.get("open") != undefined) {
			if (this.open) {
				this.setAttribute("aria-expanded", "true");
			} else {
				this.setAttribute("aria-expanded", "false");
				this.popup.blur();
				this.blur();
			}
		}
	}

	extra() {
		setTimeout(() => {
			let btns: HTMLButtonElement[] = [];
			let menu_btns: NodeListOf<HTMLElement> = this.querySelectorAll(this.anim_selector);
			menu_btns.forEach(btn => btns.push((btn as any).button || btn.shadowRoot?.firstElementChild || btn.firstChild || btn));
			if (btns.length > 0)
				rovingIndex({
					element: this,
					targets: btns
				});
		}, 2000);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-button-menu": CtButtonMenu;
	}
}
