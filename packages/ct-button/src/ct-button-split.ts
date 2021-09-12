import '@conectate/ct-icon';

import { LitElement, css, html } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';

import { rovingIndex } from './ct-button-helpers';

/**
 * 
 * ### CSS Custom Properties

| Custom property            | Description          | Default                                   |
| -------------------------- | -------------------- | ----------------------------------------- |
| `--color-primary`          | Primary color        | `#00aeff`                                 |
| `---color-on-primary`     | Dark Primary color   | `#00aeff`                                 |
| `--color-surface`   | Box-Shadow for hover | `0 2px 16px 4px rgba(99, 188, 240, 0.45)` |
| `--color-on-surface` | -                    | `#535353`                 |

 * @attr split - If true, the button will be split
 */
@customElement('ct-button-split')
export class CtButtonSplit extends LitElement {
	@property({ type: Boolean, reflect: true }) split = false;
	@property({ type: Boolean, attribute: 'aria-explanded' }) ariaExplanded = false;
	static styles = [
		css`
			:host {
				display: inline-flex;
				/* --color-primary: #2060df;
				--color-primary-hover: #19ace1;
				--color-primary-active: #169aca; */
				/* --color-primary-border: #b1c2ccb7; */
				/* --color-on-primary: #f5f8fe; */

				/* --color-surface: var(--color-surface, #fff); */
				/* --color-on-surface: #001c55; */

				--border: 1px solid currentColor;
				--radius: 26px;
				--menu-radius: 16px;
				--in-speed: 250ms;
				--out-speed: 250ms;
				background: var(--color-primary);
				color: var(--color-on-primary);
				fill: var(--color-on-primary);
				border-radius: var(--radius);
				touch-action: manipulation;
				user-select: none;
				-webkit-tap-highlight-color: #0000;
			}

			/* [hidden] {
                display: none!important;
            } */
			:host button {
				cursor: pointer;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background: none;
				border: none;
				display: inline-flex;
				align-items: center;
				gap: 1ch;
				white-space: nowrap;
				font-family: inherit;
				font-size: inherit;
				font-weight: 500;
				padding-block: 1.25ch;
				padding-inline: 2.5ch;
				color: var(--color-on-primary);
				outline-color: var(--color-primary);
				outline-offset: -5px;
			}

			:host button:is(:hover, :focus-visible) {
				background: var(--color-primary-hover);
				color: var(--color-on-primary);
			}
			:host button:active {
				background: var(--color-primary-active);
			}
			:host([split]) > button {
				border-radius: var(--radius) 0 0 var(--radius);
			}
			:host(:not([split])) > button {
				border-radius: var(--radius);
			}
		`,
		css`
			:host(:not([split])) .popup-btn {
				display: none;
			}
			.popup-btn {
				inline-size: 4ch;
				cursor: pointer;
				position: relative;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				border-left: var(--border);
				border-radius: 0 var(--radius) var(--radius) 0;
				transform: rotate(0);
				z-index: 80;
			}

			.popup-btn:is(:hover, :focus-within) {
				background: var(--color-primary-hover);
			}

			.popup-btn:focus {
				outline: none;
			}

			.popup-btn:active {
				background: var(--color-primary-active);
			}

			/* <Icon> */
			.popup-btn > ct-icon {
				transition: transform var(--in-speed) ease-in-out;
			}
			.popup-btn:focus-within > ct-icon {
				transform: rotate(180deg);
			}
			/* </Icon> */

			/* <ul> */
			.popup-btn:focus-within > .gui-popup {
				transition-duration: var(--in-speed);
				opacity: 1;
				transform: translateY(0);
				pointer-events: auto;
			}

			@media (prefers-reduced-motion: no-preference) {
				.popup-btn > .gui-popup {
					transform: translateY(5px);
					transition: opacity var(--out-speed) ease, transform var(--out-speed) ease;
				}
			}
			.gui-popup {
				--shadow: 220 70% 15%;
				--shadow-strength: 1%;

				opacity: 0;
				pointer-events: none;

				position: absolute;
				bottom: 80%;
				left: 25%;

				list-style-type: none;
				background: var(--color-surface, #fff);
				color: var(--color-on-surface, #535353);
				padding-inline: 0;
				padding-top: calc(var(--menu-radius) / 2);
				padding-bottom: calc(var(--menu-radius) / 2);
				border-radius: var(--menu-radius);
				overflow: hidden;
				display: flex;
				flex-direction: column;
				font-size: 0.9em;
				transition: opacity var(--out-speed) ease;

				box-shadow: 0 -2px 5px 0 hsl(var(--shadow) / calc(var(--shadow-strength) + 5%)), 0 1px 1px -2px hsl(var(--shadow) / calc(var(--shadow-strength) + 10%)),
					0 2px 2px -2px hsl(var(--shadow) / calc(var(--shadow-strength) + 12%)), 0 5px 5px -2px hsl(var(--shadow) / calc(var(--shadow-strength) + 13%)),
					0 9px 9px -2px hsl(var(--shadow) / calc(var(--shadow-strength) + 14%)), 0 16px 16px -2px hsl(var(--shadow) / calc(var(--shadow-strength) + 20%));

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
			* {
				box-sizing: border-box;
				margin: 0;
			}
		`
	];

	render() {
		return html`<button><slot></slot></button>
			<span
				class="popup-btn"
				aria-haspopup="true"
				aria-expanded="${this.ariaExplanded ? 'true' : 'false'}"
				title="Open for more actions"
				tabindex="-1"
				hidden
				@focus=${(e: FocusEvent) => this.setAriaExpanded(e, true)}
				@blur=${(e: FocusEvent) => this.setAriaExpanded(e, false)}
			>
				<ct-icon icon="expand_more"></ct-icon>
				<ul class="gui-popup">
					<li>
						<button>
							<ct-icon icon="car_rental"></ct-icon>
							Checkout
						</button>
					</li>
					<li>
						<button>
							<ct-icon icon="quickreply"></ct-icon>
							Quick Pay
						</button>
					</li>
					<li>
						<button>
							<ct-icon icon="save"></ct-icon>
							Save for later
						</button>
					</li>
				</ul>
			</span>`;
	}
	@query('.popup-btn') menu!: HTMLSpanElement;
	@queryAll('.popup-btn button') menu_btns!: NodeListOf<HTMLButtonElement>;

	firstUpdated() {
		if (!this.menu) return;
		this.menu.addEventListener('keyup', (e) => {
			if (e.code === 'Escape') (e.target as HTMLElement)?.blur();
		});
		rovingIndex({
			element: this.menu,
			target: 'button'
		});

		this.menu_btns!.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				setTimeout(() => {
					(e.target as HTMLElement)?.blur();
				}, 100);
			});
		});
	}

	setAriaExpanded(e: FocusEvent, value: boolean) {
		this.ariaExplanded = value;
		// console.log(e.target, value);
		// e.target?.setAttribute("aria-expanded", value);
	}
}
