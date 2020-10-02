import { CtLit, html, property } from '@conectate/ct-lit';

class CtSpinner extends CtLit {
	@property({ type: Boolean }) active: boolean = true;

	render() {
		return html`
			<style>
				:host {
					display: inline-block;
					height: 44px;
					width: 44px;
				}
				.l {
					background: url(https://www.gstatic.com/billing-ui/images/activityindicator/quantum_spinner_multicolored_87px_ae39165462d434417c9d93122bc4315c.gif);
					-webkit-background-size: contain;
					background-size: contain;
					background-repeat: no-repeat;
					display: inline-block;
					height: inherit;
					width: inherit;
					margin-right: 24px;
				}
			</style>
			${this.active ? html`<span class="l"></span>` : ''}
		`;
	}
}

window.customElements.define('ct-spinner', CtSpinner);
