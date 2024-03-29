import { CtLit, customElement, property, query } from "@conectate/ct-lit";
import { html } from "lit";

/**
 * # `ct-input-wrapper`
 *
 * @group ct-elements
 * @element ct-input-wrapper
 */
@customElement("ct-input-wrapper")
export class CtInputWrapper extends CtLit {
	@property({ type: String }) type:
		| "hidden"
		| "text"
		| "search"
		| "tel"
		| "url"
		| "email"
		| "password"
		| "datetime"
		| "date"
		| "month"
		| "week"
		| "time"
		| "datetime-local"
		| "number"
		| "range"
		| "color"
		| "checkbox"
		| "radio"
		| "file"
		| "submit"
		| "image"
		| "reset"
		| "button" = "file";
	@property({ type: String }) accept = "text";
	@property({ type: Boolean }) multiple = false;
	@query("#inputElement") $inputElement!: HTMLInputElement;

	render() {
		return html` <style>
				:host {
					display: block;
					position: relative;
				}

				#inputElement {
					bottom: 0;
					height: 100%;
					left: 0;
					margin: 0;
					opacity: 0;
					padding: 0;
					position: absolute;
					right: 0;
					top: 0;
					width: 100%;
				}
			</style>
			<slot></slot>
			<input @change=${this.callOnChange} .type="${this.type}" .accept="${this.accept}" id="inputElement" ?multiple=${this.multiple} />`;
	}

	callOnChange(e: any) {
		const files = (this.$inputElement as HTMLInputElement).files;
		if (files && files.length > 0) {
			this.dispatchEvent(
				new CustomEvent("files", {
					detail: { files: files }
				})
			);
		}
	}

	clear() {
		this.$inputElement.value = "";
	}
}
declare global {
	interface HTMLElementTagNameMap {
		"ct-input-wrapper": CtInputWrapper;
	}
}
