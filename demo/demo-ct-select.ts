import "@conectate/ct-select";
import "@conectate/ct-card";

import "./code-example/code-example";

import { CtLit, css, customElement, html, query } from "@conectate/ct-lit";
import { CtSelect } from "@conectate/ct-select";
import { html as stripIndent } from "common-tags";

@customElement("demo-ct-select")
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
				font-family: monospace;
			}
		`
	];
	name = "ct-select";
	render() {
		return html`
			<header class="card-content">
				<h1>&lt;/${this.name}&gt;</h1>
			</header>
			<main class="card-content">${this.example()}</main>
		`;
	}

	@query("#ct-select") ctSelect!: CtSelect;
	example() {
		let code = stripIndent`
		<!-- getItems(): {text: string;value: number;}[] -->

		<ct-select label="Normal"  .items=\${this.getItems()} .value=\${1}></ct-select>
		<ct-select label="Multi Select" multi .items=\${this.getItems()}></ct-select>
		<ct-select id="ct-select"
			label="Multi Select with Custom View"
			multi
			.items=\${this.getItems()}
			.renderItem="\${(item: any, i: number) =>
				html\`<render-item
					.text="\${item.text}"
					?selected=\${(this.ctSelect.value as any[])?.includes(item.value)}
					.subtext=\${\`Sub \${item.text}\`}
					.value=\${item.value}
				></render-item>\`}"
		></ct-select>`.replaceAll("\t", "    ");

		return html`
			<code-example class="language-html" .rawcode=${code}>
				<div slot="demo">
					<ct-select .items=${this.getItems()} label="Normal" .value=${1}></ct-select>
					<ct-select .items=${this.getItems()} label="Normal searchable" .value=${1} searchable></ct-select>
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
					></ct-select>
				</div>
			</code-example>
		`;
	}

	getItems() {
		let items: { text: string; value: number }[] = [];
		for (let i = 0; i < 5; i++) {
			items.push({ text: "Item " + i, value: i });
		}
		return items;
	}
}
