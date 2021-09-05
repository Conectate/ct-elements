import '../packages/ct-select';

import { CtLit, css, customElement, html, property, query } from '../packages/ct-lit';
import { CtSelect } from '../packages/ct-select';

@customElement('render-item')
export class RenderItem extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				cursor: pointer;
				background-color: #fff;
				transition: background-color 0.2s ease-in-out;
			}
			:host(:hover) {
				background-color: #85858516;
			}

			:host([selected]) {
				background-color: #80000021;
			}
			.b {
				padding: 8px;
			}
		`
	];
	@property({ type: String }) text = '';
	@property({ type: String }) subtext = '';
	@property({ type: Number }) value = 0;
	@property({ type: Boolean, reflect: true }) selected = false;

	render() {
		return html`<div class="b">
			<div><b>${this.text}</b></div>
			<i>${this.subtext}</i>
		</div>`;
	}
}

@customElement('demo-ct-select')
export class DemoCtSelect extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];

	@query('#ct-select') ctSelect!: CtSelect;
	render() {
		return html`<header>
				<h1>Demo ct-select</h1>
			</header>
			<main>
				<ct-select
					id="ct-select"
					.items=${this.getItems()}
					label="Multi Select with Custom View"
					multi
					.renderItem=${(item: any, i: number) =>
						html`<render-item
							.text=${item.text}
							?selected=${(this.ctSelect.value as any[])?.includes(item.value)}
							.subtext=${`Sub ${item.text}`}
							.value=${item.value}
						></render-item>`}
				></ct-select>

				<ct-select .items=${this.getItems()} label="Select"></ct-select>
				<ct-select .items=${this.getItems()} label="Select Multi" multi></ct-select>
			</main> `;
	}

	getItems() {
		let items: { text: string; value: number }[] = [];
		for (let i = 0; i < 5; i++) {
			items.push({ text: 'Item ' + i, value: i });
		}
		return items;
	}
}
