import "@conectate/ct-button";

import "./render-item";

import { CtBottomSheet } from "@conectate/ct-bottom-sheet";
import { CtLit, css, customElement, html, query } from "@conectate/ct-lit";

@customElement("demo-ct-bottom-sheet")
export class DemoCtBottomSheet extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}

			ct-bottom-sheet {
				left: 0;
				right: 0;
				--bottom-sheet-max-width: 500px;
				margin: auto;
			}
		`
	];

	@query("ct-bottom-sheet") botton!: CtBottomSheet;
	render() {
		return html`<ct-button @click=${() => this.botton.open()} raised>Open</ct-button>

			<ct-bottom-sheet withbackdrop class="center-bottom" label="Open with ..." noPadding>
				<render-item text="Action #1"></render-item>
				<render-item text="Action #2"></render-item>
				<render-item text="Action #3"></render-item>
				<render-item text="Action #1"></render-item>
				<render-item text="Action #2"></render-item>
				<render-item text="Action #3"></render-item>
				<render-item text="Action #1"></render-item>
				<render-item text="Action #2"></render-item>
				<render-item text="Action #3"></render-item>
				<render-item text="Action #1"></render-item>
				<render-item text="Action #2"></render-item>
				<render-item text="Action #3"></render-item>
				<render-item text="Action #1"></render-item>
				<render-item text="Action #2"></render-item>
				<render-item text="Action #3"></render-item>
				<render-item text="Action #1"></render-item>
				<render-item text="Action #2"></render-item>
				<render-item text="Action #3"></render-item>
			</ct-bottom-sheet>`;
	}
}
