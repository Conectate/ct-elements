import '../packages/ct-bottom-sheet';
import './demo-ct-select';
import './demo-ct-checkbox';
import './demo-ct-radio';
import './demo-ct-bottom-sheet';

import { CtLit, css, customElement, html, query } from '../packages/ct-lit';

function addFont(family: string) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = `https://fonts.googleapis.com/css?family=${family}&display=swap`;
	document.head.appendChild(link);
}

@customElement('demo-main')
export class DemoMain extends CtLit {
	constructor() {
		super();
		addFont(`Ubuntu:400,500,700`);
		addFont(`Roboto:400,500,700`);
	}

	static styles = [
		css`
			:host {
				display: block;
				font-family: 'Roboto', 'Ubuntu', sans-serif;
			}
		`
	];

	render() {
		return html`<demo-ct-select></demo-ct-select>
			<demo-ct-bottom-sheet></demo-ct-bottom-sheet>
			<demo-ct-checkbox></demo-ct-checkbox>
			<demo-ct-radio></demo-ct-radio> `;
	}
}
