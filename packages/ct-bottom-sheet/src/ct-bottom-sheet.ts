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

import { ArcOverlayMixin } from '@advanced-rest-client/arc-overlay-mixin';
import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

import sheetStyles from './styles';

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
 * `--bottom-sheet-box-shadow` | Box shadow property of the element | `0 2px 5px 0 rgba(0, 0, 0, 0.26)`
 *  @element ct-bottom-sheet
 */
@customElement('ct-bottom-sheet')
export class CtBottomSheet extends ArcOverlayMixin(LitElement) {
	static styles = [sheetStyles];

	_fitInto!: HTMLElement;

	/**
	 * Returns the scrolling element.
	 */
	@query('.scrollable') scrollTarget!: HTMLElement;

	/**
	 * The label of the bottom sheet.
	 */
	@property({ type: String }) label = '';
	/**
	 * The label of the bottom sheet.
	 */
	@property({ type: String }) closelabel = 'Close';

	/**
	 * Removes padding from the element styles
	 */
	@property({ type: Boolean, reflect: true }) noPadding = false;

	render() {
		const { label } = this;
		return html`<div class="draggable"></div>
			${label ? html`<label>${label}</label>` : ''}
			<div class="scrollable">
				<slot></slot>
			</div>
			<button @click=${this.close}>${this.closelabel}</button>`;
	}

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
		this.fitInto = window.document.body;
		this.opened = false;
	}

	connectedCallback() {
		super.connectedCallback();
		this.addEventListener('transitionend', this.__onTransitionEnd);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('transitionend', this.__onTransitionEnd);
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
				new CustomEvent('iron-announce', {
					bubbles: true,
					composed: true,
					detail: {
						text: 'Menu opened'
					}
				})
			);
		} else if (currentSheet === this) {
			currentSheet = null;
		}
		super._openedChanged(opened);
	}

	/**
	 * Overridden from `ArcOverlayMixin`.
	 */
	_renderOpened() {
		const node = this;
		node.classList.add('bottom-sheet-open');
	}

	/**
	 * Overridden from `ArcOverlayMixin`.
	 */
	_renderClosed() {
		const node = this;
		node.classList.remove('bottom-sheet-open');
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
		if (e && e.target === this && e.propertyName === 'opacity') {
			if (this.opened) {
				this._finishRenderOpened();
			} else {
				this._finishRenderClosed();
			}
		}
	}
}
