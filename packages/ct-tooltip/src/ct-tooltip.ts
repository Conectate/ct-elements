import { CtLit, css, customElement, html, property } from "@conectate/ct-lit";

export const tooltipStyles = css`
	/* Add this attribute to the element that needs a tooltip */
	[data-tooltip] {
		position: relative;
		cursor: pointer;
	}

	/* Hide the tooltip content by default */
	[data-tooltip]:before,
	[data-tooltip]:after {
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
		backdrop-filter: saturate(180%) blur(15px);
		transition: all 200ms;
	}

	/* Position tooltip above the element */
	[data-tooltip]:before {
		font-family: var(--font-family, "Google Sans", Ubuntu, Roboto, arial, sans-serif);
		position: absolute;
		bottom: 150%;
		left: 50%;
		margin-bottom: 5px;
		margin-left: -80px;
		padding: 7px;
		width: 160px;
		border-radius: 8px;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		content: attr(data-tooltip);
		text-align: center;
		font-size: 14px;
		line-height: 1.2;
	}

	[data-toleft]:before {
		margin-left: -140px;
	}
	[data-toright]:before {
		margin-left: -24px;
	}

	/* Triangle */
	[data-tooltip]:after {
		position: absolute;
		bottom: 150%;
		left: 50%;
		margin-left: -5px;
		width: 0;
		border-top: 5px solid rgba(0, 0, 0, 0.3);
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
		content: "";
		font-size: 0;
		line-height: 0;
	}

	[data-tobottom]:after {
		bottom: -37%;
		border-top: 0;
		border-bottom: 5px solid rgba(0, 0, 0, 0.3);
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
	}
	[data-tobottom]:before {
		bottom: -150%;
	}

	/* Show tooltip content on hover */
	[data-tooltip]:not([data-tooltip=""]):hover:before,
	[data-tooltip]:not([data-tooltip=""]):hover:after {
		visibility: visible;
		opacity: 1;
		z-index: 150;
	}
`;

@customElement("ct-tooltip")
export class CtTooltip extends CtLit {
	static styles = [
		css`
			:host {
				background-color: var(--color-surface);
				border-radius: var(--border-radius);
				bottom: calc(100% + 8px);
				box-shadow: 0 0 16px 0 var(--color-disable);
				inline-size: max-content;
				left: 50%;
				max-inline-size: min(calc(100vw - 48px), 400px);
				padding: 16px;
				position: absolute;
				text-align: initial;
				top: auto;
				writing-mode: horizontal-tb;
				z-index: 550;
				font-size: 13px;
				outline: none;
			}
			:host(:not([open])) {
				opacity: 0;
				transform: translateY(8px) translateX(calc(-50% + 0px));
				pointer-events: none;
				visibility: hidden;
				transition:
					opacity 0.5s cubic-bezier(0.5, 0, 0, 0.75),
					transform 0.5s cubic-bezier(0.5, 0, 0, 0.75),
					visibility 0s 0.5s;
			}
			:host([open]) {
				transform: translateY(0px) translateX(calc(-50% + 0px));
				opacity: 1;
				pointer-events: inherit;
				visibility: inherit;
				transition:
					opacity 0.5s cubic-bezier(0.5, 0, 0, 0.75),
					transform 0.5s cubic-bezier(0.5, 0, 0, 0.75),
					visibility 0s 0s;
			}
		`
	];
	@property({ type: String }) placement = "top";
	@property({ type: String }) for = "";
	@property({ type: Boolean, reflect: true }) open = false;
	public context!: HTMLElement | ShadowRoot;

	render() {
		return html`<slot></slot>`;
	}

	connectedCallback(): void {
		super.connectedCallback();
		if (!this.for) return;
		if (this.parentElement) {
			this.parentElement.style.position = "relative";
		}
		let cnx = this.context || this.parentElement;
		let el = cnx.querySelector(this.for) as HTMLElement;
		if (el) {
			el.tabIndex = -1;
			el.addEventListener("mouseenter", () => {
				this.open = true;
			});
			el.addEventListener("mouseleave", () => {
				// if focus is on the tooltip, don't close it
				let isTooltipFocused = document.activeElement === el || (cnx as ShadowRoot).activeElement === el;
				if (isTooltipFocused) return;
				this.close();
			});
			// if context active element changes, close the tooltip
			el.addEventListener("blur", () => {
				this.close();
			});
		}
	}

	close() {
		let cnx = this.context || this.parentElement;
		this.open = false;
		this.blur();
		let el = cnx.querySelector(this.for) as HTMLElement;
		if (el) el.blur();
	}
}
