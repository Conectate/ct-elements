/**
@license
Copyright 2018 The Advanced REST Client authors
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/

import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

// Keeps track of the toast currently opened.
let currentSheet: CtBottomSheet | null = null;
/**
 *
 * Material design: [Bottom sheets](https://material.google.com/components/bottom-sheets.html#)
 *
 * # `<ct-bottom-sheet>`
 *
 * Bottom sheets slide up from the bottom of the screen to reveal more content.
 *
 * ### Example
 *
 * ```html
 * <ct-bottom-sheet>
 *    <div>
 *      <ct-icon icon="inbox" item-icon></ct-icon>
 *      Inbox
 *    </div>
 *    <div>
 *      <ct-icon icon="keep" item-icon></ct-icon>
 *      Keep
 *    </div>
 *    <div>
 *      <ct-icon icon="hangouts" item-icon></ct-icon>
 *      Hangouts
 *    </div>
 *  </ct-bottom-sheet>
 * ```
 *
 * ### Positioning
 *
 * Use the `fit-bottom` class to position the bar at the bottom of the app and with full width;
 *
 * Use `center-bottom` class to display the bar at the bottom centered on a page.
 *
 * ### Styling
 *
 * `<bottom-sheet>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--bottom-sheet-background-color` | The bottom-sheet background-color | `#fff`
 * `--bottom-sheet-color` | The bottom-sheet color | `#323232`
 * `--bottom-sheet-max-width` | Max width of the element | ``
 * `--bottom-sheet-max-height` | Max height of the element | ``
 * `--bottom-sheet-label-color` | Color of the label | `rgba(0, 0, 0, 0.54)`
 *
 * `--bottom-sheet-box-shadow` | Box shadow property of the element | `0 2px 5px 0 rgba(0, 0, 0, 0.26)`
 * @attr {boolean} fit-bottom - If true the bottom sheet will be positioned at the bottom of the app and with full width
 * @attr {boolean} center-bottom - If true the bottom sheet will be positioned at the bottom centered on a page
 * @attr {boolean} fixed-height - If true the bottom sheet will have a fixed height
 * @attr {boolean} fixed-width - If true the bottom sheet will have a fixed width
 * @attr {boolean} full-width - If true the bottom sheet will have full width
 * @attr {boolean} full-height - If true the bottom sheet will have full height
 * @attr {boolean} no-padding - If true the bottom sheet will have no padding
 * @attr {boolean} nopadding - If true the bottom sheet will have no padding
 * @attr {boolean} no-margin - If true the bottom sheet will have no margin
 * @attr {boolean} no-label - If true the bottom sheet will have no label
 * @attr {boolean} no-header - If true the bottom sheet will have no header
 * @attr {boolean} withbackdrop - If true the bottom sheet will have a backdrop
 *  @element ct-bottom-sheet
 */
@customElement("ct-bottom-sheet")
export class CtBottomSheet extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
				position: fixed;
				background-color: var(--bottom-sheet-background-color, #fff);
				color: var(--bottom-sheet-color, #323232);
				min-height: 48px;
				min-width: 288px;
				bottom: 0px;
				left: 0px;
				box-sizing: border-box;
				box-shadow: var(--bottom-sheet-box-shadow, 0 2px 5px 0 rgba(0, 0, 0, 0.26));
				border-radius: 16px 16px 0 0;
				margin: 0 12px;
				font-size: 14px;
				cursor: default;
				-webkit-transition:
					-webkit-transform 0.3s,
					opacity 0.3s;
				transition:
					transform 0.3s,
					opacity 0.3s;
				opacity: 0;
				-webkit-transform: translateY(100px);
				transform: translateY(100px);
				max-width: var(--bottom-sheet-max-width);
				max-height: var(--bottom-sheet-max-height);
			}

			:host(.fit-bottom) {
				width: 100%;
				min-width: 0;
				border-radius: 0;
				margin: 0;
			}

			:host(.center-bottom) {
				left: initial;
			}

			:host(.bottom-sheet-open) {
				opacity: 1;
				-webkit-transform: translateY(0px);
				transform: translateY(0px);
			}
			.draggable {
				margin: 12px auto;
				max-width: 48px;
				cursor: move;
				border-radius: var(--border-radius, 16px);
				height: 4px;
				background: var(--bottom-sheet-draggable-background-color, #9292922d);
			}
			button {
				color: var(--color-on-surface, #535353);
				margin: 0;
				height: 38px;
				width: 100%;
				background: none;
				outline: none;
				border: none;
				cursor: pointer;
				border-top: 1px solid var(--bottom-sheet-border-color, #8181811c);
			}

			label {
				white-space: var(--arc-font-nowrap-white-space);
				overflow: var(--arc-font-nowrap-overflow);
				text-overflow: var(--arc-font-nowrap-text-overflow);
				font-size: var(--arc-font-caption-font-size);
				font-weight: var(--arc-font-caption-font-weight);
				line-height: var(--arc-font-caption-line-height);
				letter-spacing: var(--arc-font-caption-letter-spacing);

				color: var(--bottom-sheet-label-color, rgba(0, 0, 0, 0.54));
				display: block;
				font-size: 15px;
				font-weight: bold;
				display: flex;
				flex-direction: row;
				align-items: center;
				padding: 0 24px 12px;
			}

			[hidden] {
				display: none !important;
			}

			.scrollable {
				padding: 0 24px 24px;
				max-height: calc(100vh - 116px);
				-webkit-overflow-scrolling: touch;
				overflow: auto;
				max-width: 600px !important;
			}

			:host([no-padding]) .scrollable {
				padding: 0;
			}
		`
	];

	_fitInto!: HTMLElement;

	/**
	 * Returns the scrolling element.
	 */
	@query(".scrollable") scrollTarget!: HTMLElement;

	/**
	 * The label of the bottom sheet.
	 */
	@property({ type: String }) label = "";
	/**
	 * The label of the bottom sheet.
	 */
	@property({ type: String }) closelabel = "Close";

	/**
	 * Removes padding from the element styles
	 */
	@property({ type: Boolean, reflect: true }) noPadding = false;
	opened: boolean;
	sizingTarget!: HTMLElement;
	positionTarget!: HTMLElement;

	render() {
		const { label } = this;
		return html`<div class="draggable"></div>
			${label ? html`<label>${label}</label>` : ""}
			<div class="scrollable">
				<slot></slot>
			</div>
			<button @click=${this.close}>${this.closelabel}</button>`;
	}

	open() {}
	get fitInto() {
		return this._fitInto;
	}

	set fitInto(value) {
		const old = this._fitInto;
		if (old === value) {
			return;
		}
		this._fitInto = value;
		this._onFitIntoChanged(value);
	}

	constructor() {
		super();
		this.__onTransitionEnd = this.__onTransitionEnd.bind(this);
		this.fitInto = globalThis?.document?.body;
		this.opened = false;
	}
	close() {}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("transitionend", this.__onTransitionEnd);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener("transitionend", this.__onTransitionEnd);
	}

	firstUpdated() {
		this.sizingTarget = this.scrollTarget;
	}

	_openedChanged(opened: boolean) {
		if (opened) {
			if (currentSheet && currentSheet !== this) {
				currentSheet.close();
			}
			currentSheet = this;
			this.dispatchEvent(
				new CustomEvent("iron-announce", {
					bubbles: true,
					composed: true,
					detail: {
						text: "Menu opened"
					}
				})
			);
		} else if (currentSheet === this) {
			currentSheet = null;
		}
	}

	/**
	 * Overridden from `ArcOverlayMixin`.
	 */
	_renderOpened() {
		const node = this;
		node.classList.add("bottom-sheet-open");
	}

	/**
	 * Overridden from `ArcOverlayMixin`.
	 */
	_renderClosed() {
		const node = this;
		node.classList.remove("bottom-sheet-open");
	}

	/**
	 * @private
	 * @param {HTMLElement} fitInto
	 */
	_onFitIntoChanged(fitInto: HTMLElement) {
		this.positionTarget = fitInto;
	}

	__onTransitionEnd(e: TransitionEvent) {
		// there are different transitions that are happening when opening and
		// closing the toast. The last one so far is for `opacity`.
		// This marks the end of the transition, so we check for this to determine if this
		// is the correct event.
		if (e && e.target === this && e.propertyName === "opacity") {
			if (this.opened) {
				this._finishRenderOpened();
			} else {
				this._finishRenderOpened();
			}
		}
	}
	private _finishRenderOpened() {
		throw new Error("Method not implemented.");
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-bottom-sheet": CtBottomSheet;
	}
}
