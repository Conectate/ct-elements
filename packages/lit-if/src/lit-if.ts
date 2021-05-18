import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
/**
 * Lit-IF
 * @prop {Boolean} if - condition to show content
 */
@customElement('lit-if')
export class LitIf extends LitElement {
	@property({ type: Boolean }) if = false;
	render() {
		return html`${this.if ? html`<slot></slot>` : ''}`;
	}
}
