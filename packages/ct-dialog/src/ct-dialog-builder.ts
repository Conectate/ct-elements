import { TemplateResult } from "lit";

import { CtDialog } from "./ct-dialog.js";

/**
 * ## CtDialogBuilder
 * A builder class for creating and configuring dialogs with various components.
 *
 * This class provides a fluent API for building dialogs with headers, buttons,
 * content, and lists, similar to Material Design dialog patterns.
 *
 * ### Usage
 * ```javascript
 * import { CtDialogBuilder } from '@conectate/ct-dialog';
 *
 * // Create a dialog builder
 * const builder = new CtDialogBuilder();
 *
 * // Configure the dialog
 * builder
 *   .title('Dialog Title')
 *   .content('This is the dialog content')
 *   .positiveButton('OK')
 *   .negativeButton('Cancel')
 *   .show();
 * ```
 */
export default class CtDialogBuilder {
	/**
	 * The dialog instance being configured
	 */
	dialog: CtDialog;

	/**
	 * Container element where dialog will be attached
	 */
	cnx!: HTMLElement;

	/**
	 * Reference to the dialog element
	 */
	dialogType!: HTMLElement;

	/**
	 * Border radius value for the dialog
	 */
	cornerRadiusValue = 16;

	/**
	 * Creates a new dialog builder
	 * @param {HTMLElement} cnx - Container element where dialog will be attached (default: document.body)
	 * @param {CtDialog} dialog - Optional existing dialog instance to configure
	 */
	constructor(cnx: HTMLElement = document.body, dialog = new CtDialog()) {
		this.cnx = cnx;
		this.dialog = dialog;
	}

	// ================================== Header ==================================
	/**
	 * Sets an icon for the dialog header
	 * @param {string} svg - SVG content for the icon
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	icon(svg: string) {}

	/**
	 * Sets the title for the dialog
	 * @param {string} title - Dialog title text
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	title(title: string) {}

	// ================================== Button ==================================

	/**
	 * Adds a positive action button (like "OK", "Accept", etc.)
	 * @param {string} positiveButton - Text for the positive button
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	positiveButton(positiveButton: string) {}

	/**
	 * Adds a negative action button (like "Cancel", "No", etc.)
	 * @param {string} negativeButton - Text for the negative button
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	negativeButton(negativeButton: string) {}

	/**
	 * Adds a neutral action button (like "Later", "Remind me", etc.)
	 * @param {string} neutralButton - Text for the neutral button
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	neutralButton(neutralButton: string) {}

	// ================================== BODY ==================================

	/**
	 * Sets the content text for the dialog
	 * @param {string} content - Content text
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	content(content: string) {}

	// ================= LISTAS =================
	/**
	 * Adds a simple list of items to the dialog
	 * @param {string[]} items - Array of text items
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	listItems(items: string[]) {}

	/**
	 * Adds a single-choice list to the dialog (like radio buttons)
	 * @param {string[]} items - Array of text items
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	listItemsSingleChoice(items: string[]) {}

	/**
	 * Adds a multi-choice list to the dialog (like checkboxes)
	 * @param {string[]} items - Array of text items
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	listItemsMultiChoice(items: string[]) {}

	/**
	 * Adds a custom list with a render function for each item
	 * @template T The type of items in the list
	 * @param {T[]} items - Array of items
	 * @param {function(T, number): TemplateResult} renderItem - Function to render each item
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	customListAdapter<T = any>(items: T[], renderItem: (item: T, index: number) => TemplateResult) {}

	// ================= View =================
	/**
	 * Shows the dialog
	 * @returns {CtDialog} The dialog instance
	 */
	show() {
		this.cnx.appendChild(this.dialogType);
	}

	/**
	 * Dismisses the dialog
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	dismiss() {}

	// ================= EVENTS =================
	/**
	 * Registers a callback to be called before the dialog is shown
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	onPreShow() {}

	/**
	 * Registers a callback to be called after the dialog is shown
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	onPostShow() {}

	/**
	 * Registers a callback to be called when the dialog is dismissed
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	onDismiss() {}

	// =============== CUSTOM ==========
	/**
	 * Sets the corner radius for the dialog
	 * @param {number} radius - Corner radius in pixels
	 * @returns {CtDialogBuilder} The builder instance for chaining
	 */
	cornerRadius(radius: number) {
		this.cornerRadiusValue = radius;
	}
}
// @ts-ignore
window.CtDialogBuilder = CtDialogBuilder;
