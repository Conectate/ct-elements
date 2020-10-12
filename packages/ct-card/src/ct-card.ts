/**
 @license
 Copyright (c) 2020 Herberth Obregón. All rights reserved.
 This code may only be used under the BSD style license found at
 http://wc.conectate.today/LICENSE.txt The complete set of authors may be found at
 http://wc.conectate.today/AUTHORS.txt The complete set of contributors may be
 found at http://wc.conectate.today/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
 part of the Conectate Open Source Project is also subject to an additional IP rights grant
 found at http://wc.conectate.today/PATENTS.txt
 */
import {
	LitElement,
	html,
	property,
	customElement,
	css
} from "lit-element";

declare global {
	interface HTMLElementTagNameMap {
		'ct-card': CtCard;
	}
}

/**
 *
 *
 * @group Conectate Elements
 * @element ct-card
 * @demo demo/index.html
 * @homepage wc.conectate.today
 * @attr shadow - Add box-shadow to element
 * @attr border - Add box-shadow to element
 * @attr padding - Add box-shadow to element
 */
@customElement("ct-card")
export default class CtCard extends LitElement {
	/**
	 * Add border-top to card with --app-grad  CSS var
	 */
	@property({ type: Boolean }) border = false;

	static styles = css`
		:host {
			display: block;
			position: relative;
			margin: 16px auto;
			border: 1px solid var(--on-surface-dividers, #dadce0);
			border-radius: 16px;
			color: var(--on-surface);
			background-color: var(--app-surface, #fff);
		}
		:host([shadow]) {
			box-shadow: 0 8px 16px 0 rgba(10, 14, 29, 0.02),
				0 8px 40px 0 rgba(10, 14, 29, 0.06);
			/* box-shadow: 0 4px 28px 4px rgba(0, 0, 0, 0.1); */
			border: none;
		}
		:host([border]) {
			overflow: hidden;
		}
		:host([padding]){
			color: var(--on-surface, #535353);
			padding: 16px;
		}

		:host ::slotted(.card-actions) {
			border-top: 1px solid #8e8e8e1c;
		}

		:host ::slotted(.card-content),
		:host([data-content]) {
			color: var(--on-surface, #535353);
			padding: 16px;
		}
		.div {
			height: 6px;
			min-height: 6px;
			background: var(
				--app-color,
				linear-gradient(90deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)
			);
			border-radius: 8px 8px 0 0;
		}
	`;

	render() {
		return html`
			<div class="${this.border ? "div" : ""}"></div>
			<slot></slot>
		`;
	}
}
