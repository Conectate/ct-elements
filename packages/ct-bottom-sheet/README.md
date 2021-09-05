<h1 align="center">@conectate/ct-bottom-sheet</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/ct-bottom-sheet?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/ct-bottom-sheet.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/ct-bottom-sheet"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/ct-bottom-sheet.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
</p>

The `<ct-bottom-sheet>` module contains extensions to turn modal dialogs into bottom sheets, among other functionality like showing a grid of items.

## Basic Example

```typescript
// import { ... } from 'lit';
// @conectate/ct-lit is a base class wrapper of lit
import { CtLit, css, customElement, html, property } from '@conectate/ct-lit';

import { CtBottomSheet } from '@conectate/ct-bottom-sheet';

@customElement('demo-ct-bottom-sheet')
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

	@query('ct-bottom-sheet') botton!: CtBottomSheet;

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

```
