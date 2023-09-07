import { CtLit, css, customElement, html, property, query } from "@conectate/ct-lit";

@customElement("render-item")
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
	@property({ type: String }) text = "";
	@property({ type: String }) subtext = "";
	@property({ type: Number }) value = 0;
	@property({ type: Boolean, reflect: true }) selected = false;

	render() {
		return html`<div class="b">
			<div><b>${this.text}</b></div>
			<i>${this.subtext}</i>
		</div>`;
	}
}
