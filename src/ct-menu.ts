import { Placement, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
import { html } from "lit";

import { CtLit, css, customElement, property, query } from "./ct-lit.js";
import {
	closeFloatingMenuSurface,
	createFloatingMenuPanel,
	getFloatingMenuSurface,
	isEventInsideMenuTree,
	menuPanelStyles,
	openFloatingMenuSurface,
	setTransformOrigin,
	shouldKeepMenuOpen,
	staggerMenuItems,
	type FloatingMenuOwner
} from "./ct-menu-shared.js";

type Align = "top" | "top-right" | "top-left" | "bottom" | "bottom-right" | "bottom-left";

/** Maps legacy `align` values to Floating UI placements. */
const ALIGN_TO_PLACEMENT: Record<Align, Placement> = {
	top: "bottom",
	"top-right": "bottom-end",
	"top-left": "bottom-start",
	bottom: "top",
	"bottom-right": "top-end",
	"bottom-left": "top-start"
};

/**
 * # `ct-menu`
 * @element ct-menu
 * @description A dropdown menu component that displays a list of selectable items.
 * The menu surface is portaled to `document.body` with `position: fixed` so it is
 * not clipped by overflow/transform ancestors.
 * @slot - Contains the menu items to be displayed when opened
 * @slot trigger - The trigger element that opens/closes the dropdown menu
 * @slot dropdown-trigger - (Deprecated) The trigger element that opens/closes the dropdown menu
 * @fires open - Fired when the menu opens or closes. `detail` is the open state.
 * @csspart menu - The dropdown menu container
 * @cssproperty --color-surface - Background color of the menu (default: #fff)
 * @cssproperty --color-on-surface - Text color of menu items (default: #474747)
 * @cssproperty --border-radius - Border radius of the menu (default: 8px)
 * @cssproperty --z-index-menu - Z-index of the floating menu (default: 1000)
 */
@customElement("ct-menu")
export class CtMenu extends CtLit implements FloatingMenuOwner {
	@query("#items") $items!: HTMLSlotElement;

	/**
	 * Preferred alignment of the menu relative to the trigger.
	 * Floating UI may flip/shift to keep the menu in view.
	 */
	@property({ type: String }) align: Align = "top-right";

	/** Whether the menu is open */
	@property({ type: Boolean, reflect: true }) opened = false;

	/** Used by nested submenus to walk up the menu tree after portaling. */
	_parentMenuOwner: FloatingMenuOwner | null = null;

	private _panel: HTMLElement | null = null;
	private _cleanupAutoUpdate?: () => void;
	private _closeGeneration = 0;

	static styles = css`
		:host {
			display: inline-block;
			position: relative;
			cursor: pointer;
			color: inherit;
		}

		#items {
			display: none;
		}
	`;

	render() {
		return html`
			<slot name="dropdown-trigger" @click=${this._onTriggerClick}></slot>
			<slot name="trigger" @click=${this._onTriggerClick}></slot>
			<slot id="items"></slot>
		`;
	}

	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("click", this._handleOutsideClick);
		document.addEventListener("keydown", this._handleKeydown);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener("click", this._handleOutsideClick);
		document.removeEventListener("keydown", this._handleKeydown);
		void this._teardownPanel({ immediate: true });
	}

	updated(changed: Map<PropertyKey, unknown>) {
		if (changed.has("opened")) {
			if (this.opened) {
				this._openPanel();
			} else {
				this._teardownPanel();
				this._closeNestedSubmenus();
			}
			this.setAttribute("aria-expanded", String(this.opened));
			this.dispatchEvent(new CustomEvent("open", { detail: this.opened }));
		}

		if (changed.has("align") && this.opened) {
			void this._updatePosition();
		}
	}

	/** Opens the menu */
	open(e?: Event) {
		e?.stopPropagation();
		this.opened = true;
	}

	/** Closes the menu */
	close() {
		this.opened = false;
	}

	/** Toggles the menu open state */
	toggle(e?: Event) {
		e?.stopPropagation();
		this.opened = !this.opened;
	}

	private _onTriggerClick = (e: Event) => {
		e.stopPropagation();
		this.opened = !this.opened;
	};

	private _handleOutsideClick = (e: MouseEvent) => {
		if (!this.opened) return;
		if (!isEventInsideMenuTree(e.composedPath(), this, this._panel)) {
			this.close();
		}
	};

	private _handleKeydown = (e: KeyboardEvent) => {
		if (e.key === "Escape" && this.opened) {
			this.close();
		}
	};

	private _getReference(): Element {
		const triggers = this.shadowRoot?.querySelectorAll("slot[name='trigger'], slot[name='dropdown-trigger']");
		if (triggers) {
			for (let i = 0; i < triggers.length; i++) {
				const [el] = (triggers[i] as HTMLSlotElement).assignedElements({ flatten: true });
				if (el) return el;
			}
		}
		return this;
	}

	private _getItemNodes(): Node[] {
		return this.$items?.assignedNodes({ flatten: false }) ?? [];
	}

	private async _openPanel() {
		this._closeGeneration++;
		await this.updateComplete;
		if (!this.opened) return;

		if (!this._panel) {
			this._panel = createFloatingMenuPanel(this, menuPanelStyles);
			this._panel.addEventListener("click", this._onPanelClick);
		}

		const nodes = this._getItemNodes();
		for (const node of nodes) {
			this._panel.appendChild(node);
		}

		if (!this._panel.isConnected) {
			document.body.appendChild(this._panel);
		}

		openFloatingMenuSurface(getFloatingMenuSurface(this._panel));

		this._startPositioning();
		staggerMenuItems(Array.from(this._panel.children));
	}

	private async _teardownPanel(options?: { immediate?: boolean }) {
		this._stopPositioning();

		if (!this._panel) return;

		const panel = this._panel;
		const generation = ++this._closeGeneration;
		const surface = getFloatingMenuSurface(panel);

		if (!options?.immediate) {
			await closeFloatingMenuSurface(surface);
			// Reopened (or another close started) while the animation was running.
			if (generation !== this._closeGeneration || this.opened) return;
			if (this._panel !== panel) return;
		} else {
			surface?.classList.remove("active", "closing");
		}

		while (panel.firstChild) {
			this.appendChild(panel.firstChild);
		}

		panel.removeEventListener("click", this._onPanelClick);
		panel.remove();
		this._panel = null;
	}

	private _onPanelClick = (e: Event) => {
		if (!shouldKeepMenuOpen(e.composedPath())) {
			this.close();
		}
	};

	private _closeNestedSubmenus() {
		const roots: ParentNode[] = [this];
		if (this._panel) roots.push(this._panel);
		for (const root of roots) {
			root.querySelectorAll("ct-submenu").forEach(el => {
				(el as HTMLElement & { close(): void }).close();
			});
		}
	}

	private _startPositioning() {
		const reference = this._getReference();
		const floating = this._panel;
		if (!floating) return;

		this._stopPositioning();
		this._cleanupAutoUpdate = autoUpdate(reference, floating, () => {
			void this._updatePosition();
		});
	}

	private _stopPositioning() {
		this._cleanupAutoUpdate?.();
		this._cleanupAutoUpdate = undefined;
	}

	private async _updatePosition() {
		const floating = this._panel;
		if (!floating || !this.opened) return;

		const reference = this._getReference();
		const placement = ALIGN_TO_PLACEMENT[this.align] ?? "bottom-end";

		const {
			x,
			y,
			placement: finalPlacement
		} = await computePosition(reference, floating, {
			placement,
			strategy: "fixed",
			middleware: [offset(4), flip({ padding: 8 }), shift({ padding: 8 })]
		});

		Object.assign(floating.style, {
			left: `${x}px`,
			top: `${y}px`
		});

		const surface = getFloatingMenuSurface(floating);
		if (surface) setTransformOrigin(surface, finalPlacement);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-menu": CtMenu;
	}
}
