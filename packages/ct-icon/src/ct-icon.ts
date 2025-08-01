import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

import { icon } from "./icon-list.js";

/**
 * Helper function to load Material Icon fonts from Google Fonts
 * @param family Font family name with '+' between words
 * @param css2 Whether to use CSS2 API format
 * @returns HTMLLinkElement The created link element
 */
function addFont(family: string, css: "css" | "css2" = "css") {
	const link = document.createElement("link");
	link.id = `ctIcon${family}`;
	link.rel = "stylesheet";
	link.type = "text/css";
	link.href = `https://fonts.googleapis.com/${css}?family=${family}`;
	document.head.appendChild(link);
	return link;
}

/**
 * A versatile icon component that displays Material Icons or custom SVG icons.
 *
 * The component automatically loads the required Google Fonts styles and provides
 * options to customize the appearance of the icons.
 *
 * @element ct-icon
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <ct-icon icon="settings"></ct-icon>
 *
 * <!-- With custom style -->
 * <ct-icon icon="favorite" fontstyle="Fill"></ct-icon>
 *
 * <!-- Using custom SVG -->
 * <ct-icon svg="<svg viewBox='0 0 24 24'><path d='M12 2L2 7l10 5 10-5-10-5z'/></svg>"></ct-icon>
 * ```
 *
 * @csspart icon - The icon element
 *
 * @cssproperty --ct-icon-size - Size of the icon (default: 24px)
 */
@customElement("ct-icon")
export class CtIcon extends LitElement {
	/**
	 * Global font family selection
	 * @type {"Icons" | "Symbols"}
	 */
	static Font: "Icons" | "Symbols" = "Symbols";

	/**
	 * Global font style selection
	 * @type {"Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded"}
	 */
	static FontStyle: "Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded" = "Rounded";

	/**
	 * Indicates if the font has been loaded globally
	 */
	static ready = false;

	/**
	 * Cache of loaded font stylesheets
	 */
	static FontLoaded = new Map<string, HTMLLinkElement>();
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
				content: "";
			}

			:host([ready]) span::before {
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

	/**
	 * Indicates if the font has been loaded for this instance
	 */
	@property({ type: Boolean, reflect: true }) ready = false;

	/**
	 * Font family to use for the icon
	 * @type {"Icons" | "Symbols"}
	 */
	@property({ type: String, reflect: true }) font: "Icons" | "Symbols" = "Symbols";

	/**
	 * Font style to use for the icon
	 * @type {"Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded"}
	 */
	@property({ type: String, reflect: true }) fontstyle: "Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded" = "Rounded";
	/**
	 * If the desired icon does not exist icon in Google Fonts, you can use an `SVG` by sending it as a `string`
	 */
	@property({ type: String }) svg?: string;

	/**
	 * Icon name described in Google Fonts
	 * @see https://fonts.google.com/icons
	 */
	@property({ type: String }) icon!: icon | (string & {});

	/**
	 * Component constructor. Sets up font styles and loading detection.
	 */
	constructor() {
		super();
		this.fontstyle = CtIcon.FontStyle;
		this.font = CtIcon.Font;
		let link = CtIcon.loadFonts(CtIcon.FontStyle, CtIcon.Font);
		this.ready = CtIcon.ready;
		if (!link) {
			this.ready = true;
		} else {
			link.addEventListener("load", () => {
				this.ready = CtIcon.ready = true;
			});
		}
	}

	/**
	 * Static method to load font stylesheets for Material Icons
	 * @param FontStyle The style variant of the icon font
	 * @param Font The font family to use
	 * @returns The created link element or undefined if already loaded
	 */
	static loadFonts(FontStyle?: "Outlined" | "Fill" | "Sharp" | "Two Tone" | "Round" | "Rounded", Font?: "Icons" | "Symbols"): HTMLLinkElement | undefined {
		let style = FontStyle?.replace(/\s/, "+");
		let key = `${Font}-${style}`;
		if (Font == "Icons" && !CtIcon.FontLoaded.has(key)) {
			CtIcon.FontLoaded.set(key, addFont(`Material+Icons+${style}`));
			return CtIcon.FontLoaded.get(key);
		} else if (Font == "Symbols" && !CtIcon.FontLoaded.has(key)) {
			CtIcon.FontLoaded.set(key, addFont(`Material+Symbols+${style}:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200`, "css2"));
			return CtIcon.FontLoaded.get(key);
		}
		return CtIcon.FontLoaded.get(key);
	}

	/**
	 * Lifecycle callback when the component is first updated
	 */
	protected firstUpdated() {
		CtIcon.loadFonts(this.fontstyle, this.font);
	}

	/**
	 * Renders the icon component, either as SVG or using the material icon font
	 */
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
