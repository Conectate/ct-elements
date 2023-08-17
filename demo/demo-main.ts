import './demo-ct-button';
import './demo-ct-checkbox';
import './demo-ct-radio';
import './demo-ct-select';

import { css, CtLit, customElement, html } from '@conectate/ct-lit';
import './demo-ct-bottom-sheet';
import './demo-ct-date';
import './demo-ct-icon';
import './demo-ct-input';
import { applyTheme } from './styles/shared-styles';

@customElement('demo-main')
export class DemoMain extends CtLit {
	constructor() {
		super();
		applyTheme();
	}

	static styles = [
		css`
			:host {
				display: block;
				font-family: 'Roboto', 'Ubuntu', sans-serif;
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
