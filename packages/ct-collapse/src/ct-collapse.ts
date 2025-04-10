import { sleep } from "@conectate/ct-helpers";
import { CtLit, css, customElement, html, property, query } from "@conectate/ct-lit";

/**
 * ## `ct-collapse`
 * A collapsible content component that can smoothly expand and collapse with animation.
 *
 * ### Usage
 * ```html
 * <ct-collapse opened>
 *   <div>This content can be expanded or collapsed</div>
 * </ct-collapse>
 * ```
 *
 * ### Events
 * - None specific to this component
 *
 * ### Notes
 * - Only one child element is supported. If multiple elements are needed, wrap them in a container.
 * - The component automatically calculates required heights for smooth animations.
 *
 * @group ct-elements
 * @element ct-collapse
 */
@customElement("ct-collapse")
export class CtCollapse extends CtLit {
	/**
	 * Controls whether the content is expanded (true) or collapsed (false)
	 */
	@property({ type: Boolean }) opened = false;

	/**
	 * Reference to the content slot element
	 */
	@query("#content") $content!: HTMLSlotElement;

	/**
	 * Stores the main content element
	 * @private
	 */
	content: any;

	/**
	 * Stores assigned elements
	 * @private
	 */
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

	/**
	 * Renders the collapse component with a slot for content
	 * @returns {TemplateResult} The rendered template
	 */
	render(): any {
		return html` <slot id="content"></slot> `;
	}

	/**
	 * Lifecycle callback when the component is first updated
	 * Gets the assigned nodes and performs initial setup
	 */
	firstUpdated() {
		let elems = (this.$content.assignedNodes() as HTMLElement[]).filter(elem => elem.nodeType == Node.ELEMENT_NODE);
		this.content = elems[0];
		if (elems.length > 1) {
			console.warn("`ct-collapse` can have a ONE child, you can wrap him in a <div>");
		}
	}

	/**
	 * Handles property updates and triggers height calculation when opened state changes
	 * @param {Map<PropertyKey, any>} map - Map of changed properties
	 */
	update(map: Map<PropertyKey, any>) {
		super.update(map);
		if (map.has("opened")) {
			this.calcMaxHeight(this.opened);
		}
	}

	/**
	 * Toggles the opened state of the collapse component
	 */
	toggle() {
		this.opened = !this.opened;
	}

	/**
	 * Calculates and sets the max height for smooth animation
	 * @param {boolean} opened - Whether the collapse should be opened
	 * @private
	 */
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
