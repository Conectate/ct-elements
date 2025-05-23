/**
 @license
 Copyright (c) 2020 Herberth Obregón. All rights reserved.
 This code may only be used under the BSD style license found at
 https://open.grupoconectate.com/LICENSE.txt The complete set of authors may be found at
 https://open.grupoconectate.com/AUTHORS.txt The complete set of contributors may be
 found at https://open.grupoconectate.com/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
 part of the Conectate Open Source Project is also subject to an additional IP rights grant
 found at https://open.grupoconectate.com/PATENTS.txt
 */
import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * `ct-card` is a container component that provides a stylized surface for displaying content.
 *
 * ## Usage
 *
 * ```html
 * <ct-card>Basic card</ct-card>
 *
 * <!-- With decorator (top border) -->
 * <ct-card decorator>Card with decorator</ct-card>
 *
 * <!-- With border -->
 * <ct-card withborder>Card with border</ct-card>
 *
 * <!-- With padding -->
 * <ct-card padding>Card with padding</ct-card>
 *
 * <!-- With theme -->
 * <ct-card primary>Primary themed card</ct-card>
 * <ct-card secondary>Secondary themed card</ct-card>
 * <ct-card tertiary>Tertiary themed card</ct-card>
 * <ct-card error>Error themed card</ct-card>
 * ```
 *
 * ## Theming
 *
 * This component uses CSS custom properties for theming:
 *
 * | Property                       | Description                                |
 * |--------------------------------|--------------------------------------------|
 * | --border-radius                | Border radius of the card (default: 16px)  |
 * | --color-surface                | Background color                           |
 * | --color-on-surface             | Text color                                 |
 * | --color-primary-container      | Background for primary variant              |
 * | --color-on-primary-container   | Text color for primary variant              |
 * | --color-secondary-container    | Background for secondary variant            |
 * | --color-on-secondary-container | Text color for secondary variant            |
 * | --color-tertiary-container     | Background for tertiary variant             |
 * | --color-on-tertiary-container  | Text color for tertiary variant             |
 * | --color-error-container        | Background for error variant                |
 * | --color-on-error-container     | Text color for error variant                |
 * | --color-outline                | Border color when using withborder attribute|
 * | --color-primary | --color-app  | Color for the decorator (top border)        |
 * | --ct-card-box-shadow           | Custom box-shadow when using shadow attribute |
 *
 * ## API
 *
 * ### Properties
 *
 * | Property    | Type    | Default | Description                              |
 * |-------------|---------|---------|------------------------------------------|
 * | decorator   | Boolean | false   | Add border-top with color-app            |
 * | withborder  | Boolean | false   | Add border around the card               |
 * | primary     | Boolean | false   | Apply primary theme colors               |
 * | secondary   | Boolean | false   | Apply secondary theme colors             |
 * | tertiary    | Boolean | false   | Apply tertiary theme colors              |
 * | error       | Boolean | false   | Apply error theme colors                 |
 *
 * ### Slots
 *
 * | Name    | Description                         |
 * |---------|-------------------------------------|
 * | (default) | Main content area of the card     |
 *
 * ### CSS Classes
 *
 * You can use these classes inside the card to get predefined styles:
 *
 * | Class         | Description                          |
 * |---------------|--------------------------------------|
 * | .card-actions | For action buttons (adds top border) |
 * | .card-content | For content (adds padding)           |
 *
 * @group ct-elements
 * @element ct-card
 * @demo demo/index.html
 * @homepage open.grupoconectate.com
 * @attr shadow - Add box-shadow to element
 * @attr decorator - Add box-shadow to element
 * @attr padding - Add box-shadow to element
 */
@customElement("ct-card")
export class CtCard extends LitElement {
	/**
	 * Add border-top to card with --color-app  CSS var
	 */
	@property({ type: Boolean, reflect: true }) decorator = false;
	@property({ type: Boolean, reflect: true }) withborder = false;
	@property({ type: Boolean, reflect: true }) primary = false;
	@property({ type: Boolean, reflect: true }) secondary = false;
	@property({ type: Boolean, reflect: true }) tertiary = false;
	@property({ type: Boolean, reflect: true }) error = false;

	static styles = [
		css`
			:host {
				display: block;
				position: relative;
				border-radius: var(--border-radius, 16px);
				color: var(--color-on-surface);
				background-color: var(--color-surface, #fff);
			}
			:host([primary]) {
				background-color: var(--color-primary-container, var(--color-surface, #fff));
				color: var(--color-on-primary-container, var(--color-primary, var(--color-on-surface, #000)));
			}
			:host([secondary]) {
				background-color: var(--color-secondary-container, var(--color-surface, #fff));
				color: var(--color-on-secondary-container, var(--color-secondary, var(--color-on-surface, #000)));
			}

			:host([tertiary]) {
				background-color: var(--color-tertiary-container, var(--color-surface, #fff));
				color: var(--color-on-tertiary-container, var(--color-tertiary, var(--color-on-surface, #000)));
			}

			:host([error]) {
				background-color: var(--color-error-container, var(--color-surface, #fff));
				color: var(--color-on-error-container, var(--color-error, var(--color-on-surface, #000)));
			}
			/** @deprecated */
			:host([shadow]) {
				box-shadow: var(--ct-card-box-shadow, 0 8px 16px 0 rgba(10, 14, 29, 0.02), 0 8px 40px 0 rgba(10, 14, 29, 0.06));
				/* box-shadow: 0 4px 28px 4px rgba(0, 0, 0, 0.1); */
				border: none;
			}
			:host([withborder]) {
				border: 1px solid var(--color-outline, #8d8d8d38);
			}
			:host([decorator]) {
				overflow: hidden;
			}
			:host([padding]) {
				padding: 16px;
			}

			:host ::slotted(.card-actions) {
				border-top: 1px solid #8e8e8e1c;
			}

			:host ::slotted(.card-content),
			:host([data-content]) {
				color: var(--color-on-surface, #535353);
				padding: 16px;
			}
			.dec {
				height: 6px;
				min-height: 6px;
				background: var(--color-app, var(--color-primary, linear-gradient(90deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%)));
				border-radius: 8px 8px 0 0;
			}
			@media only print {
				:host {
					border: 1px solid var(--color-outline, #8d8d8d38);
					--ct-card-box-shadow: none;
				}
			}
		`
	];

	render() {
		return html`
			${this.decorator ? html`<div class="dec"></div>` : ""}
			<slot></slot>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-card": CtCard;
	}
}
