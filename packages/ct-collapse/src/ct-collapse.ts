import { sleep } from "@conectate/ct-helpers";
import { CtLit, css, customElement, html, property, query } from "@conectate/ct-lit";

/**
 * @element ct-collapse
 */
@customElement("ct-collapse")
export class CtCollapse extends CtLit {
	@property({ type: Boolean }) opened = false;
	@query("#content") $content!: HTMLSlotElement;
	content: any;
	elems: any[] = [];
	static styles: any = [
		css`
			:host {
				display: block;
				transition: all 250ms;
				overflow: hidden;
			}

			:host(:not(.open)) {
				max-height: 0 !important;
			}
		`
	];
	render(): any {
		return html` <slot id="content"></slot> `;
	}
	firstUpdated() {
		let elems = (this.$content.assignedNodes() as HTMLElement[]).filter(elem => elem.nodeType == Node.ELEMENT_NODE);
		this.content = elems[0];
		if (elems.length > 1) {
			console.warn("`ct-collapse` can have a ONE child, you can wrap him in a <div>");
		}
	}

	update(map: Map<PropertyKey, any>) {
		super.update(map);
		if (map.has("opened")) {
			this.calcMaxHeight(this.opened);
		}
	}

	toggle() {
		this.opened = !this.opened;
	}

	async calcMaxHeight(opened: boolean) {
		if (this.content) {
			this.style.maxHeight = `${this.content.offsetHeight}px`;
			if (!opened) {
				this.style.overflow = "hidden!important";
			}
			await sleep(50);
			this.classList.toggle("open", opened);
			await sleep(250);
			this.style.maxHeight = ``;
			if (opened) {
				this.style.overflow = "visible!important";
			}
		} else if (opened) {
			await sleep(50);
			this.calcMaxHeight(opened);
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-collapse": CtCollapse;
	}
}
