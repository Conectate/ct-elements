import '@conectate/ct-icon';

import { icon } from '@conectate/ct-icon/icon-list';
import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import { rovingIndex } from './ct-button-helpers';

type leftRight = 'left' | 'right';
type topBottom = 'top' | 'bottom';

/**
 * @group ct-elements
 * @element ct-button-menu
 *
 * @css --menu-outline
 * @css --ct-button-menu-box-shadow
 * @css --ct-button-menu-radius
 * @css --ct-button-menu-popup-radius
 */
@customElement('ct-button-menu')
export class CtButtonMenu extends LitElement {
	static styles = [
		css`
			:host {
				display: inline-flex;

				--in-speed: 250ms;
				--out-speed: 250ms;
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
			.popup-btn {
				cursor: pointer;
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				border-radius: 0 var(--ct-button-menu-radius, 26px) var(--ct-button-menu-radius, 26px) 0;
				transform: rotate(0);
				z-index: 80;
			}

			.popup-btn:is(:hover, :focus-within) {
				/* background: var(--color-primary-hover); */
				/* color: var(--color-on-primary); */
			}

			.popup-btn:focus {
				outline: none;
			}

			.popup-btn:active {
				/* background: var(--color-primary-active); */
			}

			/* <Icon> */
			.popup-btn > .dropdown-trigger {
				transition: transform var(--in-speed) ease-in-out;
			}
			:host([rotate]) :focus-within > .dropdown-trigger {
				transform: rotate(180deg);
			}
			/* </Icon> */

			/* <ul> */
			.popup-btn:focus-within > .gui-popup {
				transition-duration: var(--in-speed);
				opacity: 1;
				transform: translateY(0);
				pointer-events: auto;
				outline: 1px solid var(--color-disable, #0000002f);
			}

			@media (prefers-reduced-motion: no-preference) {
				.popup-btn > .gui-popup {
					transform: translateY(5px);
					transition: opacity var(--out-speed) ease, transform var(--out-speed) ease;
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

			@media (max-width: 400px) {
				.gui-popup {
					left: -200%;
				}
			}
			.gui-popup button {
				color: var(--color-on-surface, #535353);
				width: 100%;
			}
		`
	];
	@property() anim_selector = 'ct-list-item';
	@property({ type: Boolean, reflect: true }) rotate = false;
	/** Location from opened */
	@property({ type: String }) from?: topBottom | leftRight | `${topBottom}-${leftRight}` = 'bottom-left';
	/** Template Result of Trigger */
	@property({ type: Object }) dropDownTrigger?: TemplateResult<any>;
	@property({ type: Boolean }) use_slot = false;
	/** keep popup after click, you must close programmatically */
	@property({ type: Boolean, reflect: true }) keep = false;
	/** Dropdown icon */
	@property() icon: icon = 'expand_more';

	render() {
		return html` <span
			class="popup-btn"
			aria-haspopup="true"
			aria-expanded="false"
			title="Open for more actions"
			tabindex="-1"
			hidden
			@click=${this.setAriaExpanded(true)}
			@focus=${this.setAriaExpanded(true)}
			@blur=${this.setAriaExpanded(false)}
		>
			<span class="dropdown-trigger center">
				${this.dropDownTrigger ? this.dropDownTrigger : this.use_slot ? html`<slot name="dropdown"></slot>` : html`<ct-icon icon="${this.icon}"></ct-icon>`}
			</span>
			<!-- <ct-icon icon="expand_more"></ct-icon> -->
			<div class="gui-popup">
				<slot></slot>
			</div>
		</span>`;
	}

	@query('.gui-popup') popup!: HTMLSpanElement;
	firstUpdated() {
		this.addEventListener('keyup', (e) => {
			if (e.code === 'Escape') (e.target as this)?.blur();
		});

		if (!this.keep) {
			this.addEventListener('click', (ev) => {
				ev.stopPropagation();
				ev.preventDefault();
			});
			this.popup.addEventListener('click', (e) => {
				e.stopPropagation();
				setTimeout(() => {
					(e.target as this)?.blur();
					this.blur();
				}, 100);
			});
		}

		switch (this.from) {
			case 'top': {
				this.popup.style.top = '80%';
				this.popup.style.right = '0';
				this.popup.style.transformOrigin = 'center top 0px';
				break;
			}
			case 'top-right': {
				this.popup.style.top = '80%';
				this.popup.style.right = '30%';
				this.popup.style.transformOrigin = 'right top 0px';
				break;
			}
			case 'top-left': {
				this.popup.style.top = '80%';
				this.popup.style.left = '0';
				this.popup.style.transformOrigin = 'left top 0px';
				break;
			}
			case 'bottom': {
				this.popup.style.bottom = '80%';
				this.popup.style.right = '0';
				this.popup.style.transformOrigin = 'center bottom 0px';
				break;
			}
			case 'bottom-right': {
				this.popup.style.bottom = '80%';
				this.popup.style.right = '30%';
				this.popup.style.transformOrigin = 'right bottom 0px';
				break;
			}
			default:
			case 'bottom-left': {
				this.popup.style.bottom = '80%';
				this.popup.style.left = '30%';
				this.popup.style.transformOrigin = 'left bottom 0px';
				break;
			}
		}
		this.extra();
	}
	close() {
		this.blur();
	}

	setAriaExpanded(value: boolean) {
		return (e: FocusEvent) => {
			let el = e.target as HTMLElement;
			el?.setAttribute('aria-expanded', `${value}`);
		};
	}

	@query('.popup-btn') menu!: HTMLSpanElement;
	// @queryAll('.popup-btn ct-list-item') private menu_btns!: NodeListOf<HTMLElementTagNameMap['ct-list-item']>;

	extra() {
		setTimeout(() => {
			let btns: HTMLButtonElement[] = [];
			let menu_btns: NodeListOf<HTMLElement> = this.querySelectorAll(this.anim_selector);
			menu_btns.forEach((btn) => btns.push((btn as any).button || btn.shadowRoot?.firstElementChild || btn.firstChild || btn));
			if (btns.length > 0)
				rovingIndex({
					element: this.menu,
					targets: btns
				});
		}, 2000);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ct-button-menu': CtButtonMenu;
	}
}
