import "./demo-ct-bottom-sheet.js";
import "./demo-ct-button.js";
import "./demo-ct-checkbox.js";
import "./demo-ct-date.js";
import "./demo-ct-icon.js";
import "./demo-ct-input.js";
import "./demo-ct-radio.js";
import "./demo-ct-select.js";

import { css, CtLit, customElement, html } from "@conectate/ct-lit";

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
		`;
	}
}
