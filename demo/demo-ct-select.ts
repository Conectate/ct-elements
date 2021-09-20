import '../packages/ct-select';
import '../packages/ct-card';

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
				max-width: 800px;
				margin: 0 auto;
			}
			header > h1 {
				margin-bottom: 0;
			}
			ct-card {
				margin: 16px 24px;
			}
		`
	];

	render() {
		return html`
			<ct-card shadow>
				<header class="card-content">
					<h1>ct-select</h1>
				</header>
				<main class="card-content">${this.example()}</main>
			</ct-card>
		`;
	}

	@query('#ct-select') ctSelect!: CtSelect;
	example() {
		return html`<ct-select .items=${this.getItems()} label="Normal" .value=${1}></ct-select>
			<ct-select .items=${this.getItems()} label="Multi Select" multi></ct-select>
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
			></ct-select>`;
	}

	getItems() {
		let items: { text: string; value: number }[] = [];
		for (let i = 0; i < 5; i++) {
			items.push({ text: 'Item ' + i, value: i });
		}
		return items;
	}
}
