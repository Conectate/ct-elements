import "./demo-ct-bottom-sheet.js";
import "./demo-ct-button.js";
import "./demo-ct-card.js";
import "./demo-ct-chartjs.js";
import "./demo-ct-checkbox.js";
import "./demo-ct-collapse.js";
import "./demo-ct-date.js";
import "./demo-ct-dialog.js";
import "./demo-ct-icon.js";
import "./demo-ct-img.js";
import "./demo-ct-input.js";
import "./demo-ct-list.js";
import "./demo-ct-loading-bar.js";
import "./demo-ct-loading-placeholder.js";
import "./demo-ct-menu.js";
import "./demo-ct-phone-input.js";
import "./demo-ct-qr-tools.js";
import "./demo-ct-radio.js";
import "./demo-ct-router.js";
import "./demo-ct-scroll-threshold.js";
import "./demo-ct-select.js";
import "./demo-ct-snackbar.js";
import "./demo-ct-spinner.js";
import "./demo-ct-tabs.js";
import "./demo-ct-tooltip.js";

import { CtLit, css, customElement, html } from "@conectate/ct-lit";

import { applyTheme } from "./styles/shared-styles.js";

@customElement("demo-main")
export class DemoMain extends CtLit {
	constructor() {
		super();
		applyTheme();
	}

	static styles = [
		css`
			:host {
				display: block;
				font-family: "Roboto", "Ubuntu", sans-serif;
				padding-bottom: 128px;
			}
		`
	];

	render() {
		return html`
			<demo-ct-input></demo-ct-input>
			<demo-ct-select></demo-ct-select>
			<demo-ct-radio></demo-ct-radio>
			<demo-ct-date></demo-ct-date>
			<demo-ct-icon></demo-ct-icon>
			<!-- <demo-ct-bottom-sheet></demo-ct-bottom-sheet> -->
			<demo-ct-checkbox></demo-ct-checkbox>
			<demo-ct-button></demo-ct-button>
			<demo-ct-dialog> </demo-ct-dialog>
			<demo-ct-tooltip></demo-ct-tooltip>
			<demo-ct-card></demo-ct-card>
			<demo-ct-chartjs></demo-ct-chartjs>
			<demo-ct-collapse></demo-ct-collapse>
			<demo-ct-img></demo-ct-img>
			<demo-ct-list></demo-ct-list>
			<demo-ct-loading-bar></demo-ct-loading-bar>
			<demo-ct-loading-placeholder></demo-ct-loading-placeholder>
			<demo-ct-menu></demo-ct-menu>
			<demo-ct-phone-input></demo-ct-phone-input>
			<demo-ct-qr-tools></demo-ct-qr-tools>
			<demo-ct-router></demo-ct-router>
			<demo-ct-scroll-threshold></demo-ct-scroll-threshold>
			<demo-ct-snackbar></demo-ct-snackbar>
			<demo-ct-spinner></demo-ct-spinner>
			<demo-ct-tabs></demo-ct-tabs>
		`;
	}
}
