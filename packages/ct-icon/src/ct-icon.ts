import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { icon } from "./icon-list.js";

function addFont(family: string, css2?: boolean) {
	const link = document.createElement("link");
	link.id = `ctIcon${family}`;
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = `https://fonts.googleapis.com/${css2 ? "css2" : "css"}?family=${family}`;
	document.head.appendChild(link);
}

/**
 * @element ct-icon
 */
@customElement("ct-icon")
export class CtIcon extends LitElement {
	/** Select Font Style */
	static Font: "Icons" | "Symbols" = "Symbols";
	static FontStyle: "Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded" = "Rounded";

	@property({ type: String, reflect: true }) font: "Icons" | "Symbols" = "Symbols";
	@property({ type: String, reflect: true }) fontstyle: "Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded" = "Rounded";

	static FontLoaded: string[] = [];
	static styles = [
		css`
			:host {
				display: inline-flex;
				user-select: none;
				font-weight: normal;
				font-style: normal;
				font-size: var(--ct-icon-size, 24px);
				line-height: 1;
				letter-spacing: normal;
				text-transform: none;
				white-space: nowrap;
				word-wrap: normal;
				direction: ltr;
				-webkit-font-smoothing: antialiased;
			}
			span::before {
				content: attr(data-icon);
			}
		`,
		css`
			:host([font="Icons"]) {
				font-family: "Material Icons Round";
			}
			:host([fontStyle="Outlined"][font="Icons"]) {
				font-family: "Material Icons Outlined";
			}
			:host([fontStyle="Fill"][font="Icons"]) {
				font-family: "Material Icons Fill";
			}
			:host([fontStyle="Sharp"][font="Icons"]) {
				font-family: "Material Icons Sharp";
			}
			:host([fontStyle="Two Tone"][font="Icons"]) {
				font-family: "Material Icons Two Tone";
			}
			:host([fontStyle="Round"][font="Icons"]) {
				font-family: "Material Icons Round";
			}
		`,
		css`
			:host([font="Symbols"]) {
				font-family: "Material Symbols Round";
			}
			:host([fontStyle="Outlined"][font="Symbols"]) {
				font-family: "Material Symbols Outlined";
			}
			:host([fontStyle="Fill"][font="Symbols"]) {
				font-family: "Material Symbols Fill";
			}
			:host([fontStyle="Sharp"][font="Symbols"]) {
				font-family: "Material Symbols Sharp";
			}
			:host([fontStyle="Two Tone"][font="Symbols"]) {
				font-family: "Material Symbols Two Tone";
			}
			:host([fontStyle="Rounded"][font="Symbols"]) {
				font-family: "Material Symbols Rounded";
			}
		`
	];
	constructor() {
		super();
		this.loadFonts(CtIcon.FontStyle, CtIcon.Font);
	}

	loadFonts(FontStyle?: "Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded", Font?: "Icons" | "Symbols") {
		if (FontStyle) this.fontstyle = FontStyle;
		if (Font) this.font = Font;
		let style = this.fontstyle.replace(/\s/, "+");
		if (this.font == "Icons" && !CtIcon.FontLoaded.includes(`ctIcon${style}`)) {
			CtIcon.FontLoaded.push(`ctIcon${style}`);
			addFont(`Material+Icons+${style}`);
		} else if (this.font == "Symbols" && !CtIcon.FontLoaded.includes(`ctIconSymbols${style}`)) {
			CtIcon.FontLoaded.push(`ctIconSymbols${style}`);
			addFont(`Material+Symbols+${style}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`, true);
		}
	}

	protected firstUpdated() {
		this.loadFonts();
	}
	/** If the desired icon does not exist icon in Google Fonts, you can use an `SVG` by sending it as a `string` */
	@property({ type: String }) svg?: string;
	/** Icon name described in Google Fonts
	 * @see https://fonts.google.com/icons
	 */
	@property({ type: String }) icon!: icon;
	render() {
		if (this.svg)
			return html`<style>
					:host {
						width: var(--ct-icon-size, 24px);
						height: var(--ct-icon-size, 24px);
					}
					svg {
						width: 100%;
						height: 100%;
						fill: currentColor;
					}
				</style>
				${unsafeHTML(this.svg)}`;
		else if (this.icon) {
			return html`<span data-icon=${this.icon}></span>`;
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-icon": CtIcon;
	}
}
