import '../packages/ct-bottom-sheet';
import './demo-ct-select';
import './demo-ct-checkbox';
import './demo-ct-radio';
import './demo-ct-buttom';
import './demo-ct-bottom-sheet';

import { CtLit, css, customElement, html, property, query } from '../packages/ct-lit';
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
		return html`<demo-ct-select></demo-ct-select>
			<demo-ct-bottom-sheet></demo-ct-bottom-sheet>
			<demo-ct-checkbox></demo-ct-checkbox>
			<demo-ct-radio></demo-ct-radio>
			<demo-ct-buttom></demo-ct-buttom> `;
	}
}
