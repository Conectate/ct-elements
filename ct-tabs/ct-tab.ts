import { CtLit, html, property } from '@conectate/ct-lit';

export class CtTab extends CtLit {
	@property({ type: Boolean, reflect: true }) selected = false;

	render() {
		return html`
			<style>
				* {
					padding: 0;
					margin: 0;
					box-sizing: border-box;
				}
				:host {
					display: flex;
					position: relative;
					text-decoration: none;
					color: inherit;
					flex: 25;
					flex-direction: row;
					align-items: center;
					justify-content: center;
					transition: all 250ms;
					cursor: pointer;
					padding: 8px;
					box-sizing: border-box;
					height: 52px;
				}

				:host([selected]):after {
					border-top-width: 3px;
					border-top-style: solid;
					-webkit-border-radius: 0.4rem 0.4rem 0 0;
					border-color: var(--ct-tabs-border-color, var(--primary-color, #0e92c1));
					border-radius: 0.4rem 0.4rem 0 0;
					bottom: 0;
					content: '';
					height: 0;
					left: 16px;
					position: absolute;
					right: 16px;
				}
				:host([selected]) {
					font-weight: bold;
					/* flex: 30; */
					color: var(--ct-tabs-border-color, var(--primary-color, #0e92c1));
				}
				@media (max-width: 1001px) {
					:host {
						height: 41px;
						font-size: 0.92em;
					}
				}
			</style>
			<slot></slot>
		`;
	}
}

window.customElements.define('ct-tab', CtTab);
