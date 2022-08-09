import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { icon } from './icon-list';

function addFont(family: string) {
	const link = document.createElement('link');
	link.id = `ctIcon${family}`;
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = `https://fonts.googleapis.com/css?family=${family}&display=swap`;
	document.head.appendChild(link);
}

/**
 * @element ct-icon
 */
@customElement('ct-icon')
export class CtIcon extends LitElement {
	/** Select Font Style */
	static FontStyle: 'Outlined' | 'Fill' | 'Sharp' | 'Two Tone' | 'Round' = 'Round';
	@property({ type: String, reflect: true }) font = 'Round';

	static FontLoaded: string[] = [];
	static styles = [
		css`
			:host {
				display: inline-flex;
				font-family: 'Material Icons Round';
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
			:host[font='Outlined'] {
				font-family: 'Material Icons Outlined';
			}
			:host[font='Fill'] {
				font-family: 'Material Icons Fill';
			}
			:host[font='Sharp'] {
				font-family: 'Material Icons Sharp';
			}
			:host[font='Two Tone'] {
				font-family: 'Material Icons Two Tone';
			}
			:host[font='Round'] {
				font-family: 'Material Icons Round';
			}
			span::before {
				content: attr(data-icon);
			}
		`
	];
	constructor() {
		super();
		let style = CtIcon.FontStyle.replace(/\s/, '+');
		if (!CtIcon.FontLoaded.includes(`ctIcon${style}`)) {
			CtIcon.FontLoaded.push(`ctIcon${style}`);
			addFont(`Material+Icons+${style}`);
		}
		this.font = CtIcon.FontStyle;
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
		'ct-icon': CtIcon;
	}
}
