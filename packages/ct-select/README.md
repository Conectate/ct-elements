# `ct-select`

## Basic Example

```typescript
// import { ... } from 'lit';

// @conectate/ct-lit is a base class wrapper of lit
import { CtLit, css, customElement, html, property } from "@conectate/ct-lit";

@customElement("my-select")
export class MySelect extends CtLit {
	items: { text: string; value: any }[] = [
		{ text: "Item 1", value: 1 },
		{ text: "Item 2", value: 2 },
		{ text: "Item 3", value: 3 }
	];
	render() {
		return html` <ct-select id="select" label="selecciona uno" .items=${this.items} @value=${this.onSelectItem}></ct-select> `;
	}

	firstUpdated() {
		this.mapIDs(); // map ID's in this.$ = { ... }
	}

	onSelectItem(e: CustomEvent<{ value: any }>) {
		console.log(this.$.select.value);
		// or
		console.log(e.detail.value);
	}
}
```
