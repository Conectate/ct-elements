import "./ct-icon.js";
import "./ct-list-item.js";

import { Placement, autoUpdate, computePosition, flip, offset, shift } from "@floating-ui/dom";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import { CtLit, css, customElement, property, query } from "./ct-lit.js";
import {
	FloatingMenuOwner,
	closeFloatingMenuSurface,
	createFloatingMenuPanel,
	getFloatingMenuSurface,
	isEventInsideMenuTree,
	menuPanelStyles,
	openFloatingMenuSurface,
	resolveFloatingMenuOwner,
	setTransformOrigin,
	shouldKeepMenuOpen,
	staggerMenuItems
} from "./ct-menu-shared.js";
import type { icon } from "./icon-list.js";

type SubmenuPlacement = Extract<Placement, "right-start" | "right-end" | "left-start" | "left-end" | "right" | "left">;

/**
 * # `ct-submenu`
 * @element ct-submenu
 * @description Nested menu that opens beside its trigger inside a `ct-menu` (or another `ct-submenu`).
 * The surface is portaled to `document.body` with `position: fixed`.
 *
 * @slot trigger - Row that opens the submenu (use `keep-open` on list items)
 * @slot - Submenu items
 *
 * @fires open - Fired when the submenu opens or closes. `detail` is the open state.
 *
 * @csspart trigger - Default trigger button
 * @csspart menu - The floating menu surface
 *
 * @cssproperty --color-surface - Background color of the menu
 * @cssproperty --color-on-surface - Text color of menu items
 * @cssproperty --border-radius - Border radius of the menu
 * @cssproperty --z-index-menu - Z-index of the floating menu
 *
 * @example
 * ```html
 * <ct-menu>
 *   <ct-icon-button slot="trigger" icon="more_vert"></ct-icon-button>
 *   <ct-list-item text="Profile"></ct-list-item>
 *   <ct-submenu text="More" icon="folder">
 *     <ct-list-item text="Archive"></ct-list-item>
 *     <ct-list-item text="Delete"></ct-list-item>
 *   </ct-submenu>
 * </ct-menu>
 * ```
 */
@customElement("ct-submenu")
export class CtSubmenu extends CtLit implements FloatingMenuOwner {
	@query("#items") $items!: HTMLSlotElement;
	@query("#trigger-wrap") $triggerWrap!: HTMLDivElement;

	/** Label for the built-in trigger when no `trigger` slot content is provided */
	@property({ type: String }) text = "";

	/** Optional icon for the built-in trigger */
	@property({ type: String }) icon?: icon | (string & {});

	/** Preferred side placement; Floating UI may flip when there is not enough space */
	@property({ type: String }) placement: SubmenuPlacement = "right-start";

	/** Open on pointer hover (with a short close delay so the cursor can reach the panel) */
	@property({ type: Boolean }) hover = true;

	/** Whether the submenu is open */
	@property({ type: Boolean, reflect: true }) opened = false;

	/**
	 * Always true so a parent `ct-menu` does not close when interacting with this submenu.
	 * Reflected as `keep-open`.
	 */
	@property({ type: Boolean, reflect: true, attribute: "keep-open" }) keepOpen = true;

	/**
	 * When true, shows the bottom border
	 * Typically used for the last item or for custom styling
	 */
	@property({ type: Boolean, reflect: true }) showoutline = false;

	/** Used by nested submenus / outside-click detection after portaling. */
	_parentMenuOwner: FloatingMenuOwner | null = null;

	private _panel: HTMLElement | null = null;
	private _cleanupAutoUpdate?: () => void;
	private _closeTimer?: ReturnType<typeof setTimeout>;
	private _openTimer?: ReturnType<typeof setTimeout>;
	private _closeGeneration = 0;

	static styles = css`
		:host {
			display: flex;
			flex: 1;
			min-width: 220px;
			outline: none;
			cursor: pointer;
			color: inherit;
			--ct-icon-size: 21px;
		}

		#items {
			display: none;
		}

		#trigger-wrap {
			display: flex;
			flex: 1;
			width: 100%;
		}

		#trigger-wrap ct-list-item {
			flex: 1;
			width: 100%;
		}

		:host([opened]) #trigger-wrap {
			background: #7c7c7c36;
		}

		.chevron {
			margin-right: 8px;
			opacity: 0.7;
			width: 21px;
			height: 21px;
			min-width: 21px;
			min-height: 21px;
		}
	`;

	render() {
		return html`
			<div id="trigger-wrap" part="trigger" @click=${this._onTriggerClick} @pointerenter=${this._onTriggerEnter} @pointerleave=${this._onTriggerLeave} @keydown=${this._onTriggerKeydown}>
				<slot name="trigger">
					<ct-list-item keep-open hideoutline text=${this.text} icon=${ifDefined(this.icon)} ?showoutline=${this.showoutline}>
						<ct-icon class="chevron" slot="suffix" icon="chevron_right"></ct-icon>
					</ct-list-item>
				</slot>
			</div>
			<slot id="items"></slot>
		`;
	}

	connectedCallback() {
		super.connectedCallback();
		this.keepOpen = true;
		this._parentMenuOwner = this._resolveParentOwner();
		document.addEventListener("click", this._handleOutsideClick);
		document.addEventListener("keydown", this._handleKeydown);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		document.removeEventListener("click", this._handleOutsideClick);
		document.removeEventListener("keydown", this._handleKeydown);
		this._clearTimers();
		void this._teardownPanel({ immediate: true });
	}

	updated(changed: Map<PropertyKey, unknown>) {
		if (changed.has("opened")) {
			if (this.opened) {
				this._closeSiblingSubmenus();
				this._openPanel();
			} else {
				this._teardownPanel();
				this._closeNestedSubmenus();
			}
			this.setAttribute("aria-expanded", String(this.opened));
			this.dispatchEvent(new CustomEvent("open", { detail: this.opened }));
		}

		if (changed.has("placement") && this.opened) {
			void this._updatePosition();
		}
	}

	open(e?: Event) {
		e?.stopPropagation();
		this.opened = true;
	}

	close() {
		this.opened = false;
	}

	toggle(e?: Event) {
		e?.stopPropagation();
		this.opened = !this.opened;
	}

	private _onTriggerClick = (e: Event) => {
		e.stopPropagation();
		this.opened = !this.opened;
	};

	/** Keeps this submenu (and ancestors) open while the pointer moves across portaled panels. */
	keepHoverOpen() {
		this._clearTimers();
		const parent = this._parentMenuOwner;
		if (parent instanceof CtSubmenu && parent !== this) {
			parent.keepHoverOpen();
		}
	}

	private _onTriggerEnter = () => {
		if (!this.hover) return;
		this.keepHoverOpen();
		this._openTimer = setTimeout(() => {
			this.opened = true;
		}, 100);
	};

	private _onTriggerLeave = (e: PointerEvent) => {
		if (!this.hover) return;
		if (this._isRelatedTargetInTree(e)) return;
		this._scheduleClose();
	};

	private _onPanelEnter = () => {
		if (!this.hover) return;
		this.keepHoverOpen();
	};

	private _onPanelLeave = (e: PointerEvent) => {
		if (!this.hover) return;
		// Moving into a nested submenu panel (also on document.body) must not close this one.
		if (this._isRelatedTargetInTree(e)) return;
		this._scheduleClose();
	};

	private _scheduleClose() {
		this._clearTimers();
		this._closeTimer = setTimeout(() => {
			if (this._hasOpenNestedSubmenu()) return;
			if (this._isPointerOverTree()) return;
			this.opened = false;
			// If we closed because the pointer left a nested panel to outside,
			// let the parent submenu decide whether it should close too.
			if (this._parentMenuOwner instanceof CtSubmenu && this._parentMenuOwner.hover && this._parentMenuOwner.opened) {
				this._parentMenuOwner._scheduleClose();
			}
		}, 180);
	}

	private _clearTimers() {
		if (this._openTimer) clearTimeout(this._openTimer);
		if (this._closeTimer) clearTimeout(this._closeTimer);
		this._openTimer = undefined;
		this._closeTimer = undefined;
	}

	private _isRelatedTargetInTree(e: PointerEvent): boolean {
		const related = e.relatedTarget;
		if (!(related instanceof Node)) return false;
		const path: EventTarget[] = [];
		let node: Node | null = related;
		while (node) {
			path.push(node);
			node = node instanceof ShadowRoot ? node.host : node.parentNode;
		}
		return isEventInsideMenuTree(path, this, this._panel);
	}

	private _isPointerOverTree(): boolean {
		if (this.matches(":hover") || this.$triggerWrap?.matches(":hover")) return true;
		if (this._panel?.matches(":hover")) return true;
		for (const nested of this._getOpenNestedSubmenus()) {
			if (nested._isPointerOverTree()) return true;
		}
		return false;
	}

	private _hasOpenNestedSubmenu(): boolean {
		return this._getOpenNestedSubmenus().length > 0;
	}

	private _getOpenNestedSubmenus(): CtSubmenu[] {
		const nested: CtSubmenu[] = [];
		const roots: ParentNode[] = [this];
		if (this._panel) roots.push(this._panel);
		for (const root of roots) {
			root.querySelectorAll("ct-submenu").forEach(el => {
				if (el !== this && (el as CtSubmenu).opened) nested.push(el as CtSubmenu);
			});
		}
		return nested;
	}

	private _onTriggerKeydown = (e: KeyboardEvent) => {
		if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			e.stopPropagation();
			this.opened = true;
		} else if (e.key === "ArrowLeft" && this.opened) {
			e.preventDefault();
			e.stopPropagation();
			this.close();
		}
	};

	private _handleOutsideClick = (e: MouseEvent) => {
		if (!this.opened) return;
		if (!isEventInsideMenuTree(e.composedPath(), this, this._panel)) {
			this.close();
		}
	};

	private _handleKeydown = (e: KeyboardEvent) => {
		if (e.key === "Escape" && this.opened) {
			e.stopPropagation();
			this.close();
			this._focusTrigger();
		}
	};

	private _focusTrigger() {
		const assigned = (this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null)?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
		const fallback = this.$triggerWrap?.querySelector("ct-list-item, button, [tabindex]") as HTMLElement | null;
		(assigned ?? fallback)?.focus?.();
	}

	private _resolveParentOwner(): FloatingMenuOwner | null {
		// `closest("ct-submenu")` matches itself — start from parentElement.
		const direct = this.parentElement?.closest("ct-submenu") || this.closest("ct-menu");
		if (direct) return direct;
		// After portaling we live inside a floating panel on document.body —
		// resolve the owner through the panel registry instead of the DOM tree.
		return resolveFloatingMenuOwner(this);
	}

	private _getReference(): Element {
		const slot = this.shadowRoot?.querySelector('slot[name="trigger"]') as HTMLSlotElement | null;
		const [assigned] = slot?.assignedElements({ flatten: true }) ?? [];
		return assigned || this.$triggerWrap || this;
	}

	private _getItemNodes(): Node[] {
		return this.$items?.assignedNodes({ flatten: false }) ?? [];
	}

	private async _openPanel() {
		this._closeGeneration++;
		await this.updateComplete;
		if (!this.opened) return;

		// Refresh parent ref in case we were moved into a portaled panel.
		if (!this._parentMenuOwner || this._parentMenuOwner === this) {
			this._parentMenuOwner = this._resolveParentOwner();
		}

		if (!this._panel) {
			this._panel = createFloatingMenuPanel(this, menuPanelStyles);
			this._panel.style.zIndex = "calc(var(--z-index-menu, 1000) + 1)";
			this._panel.addEventListener("click", this._onPanelClick);
			this._panel.addEventListener("pointerenter", this._onPanelEnter);
			this._panel.addEventListener("pointerleave", this._onPanelLeave);
		}

		for (const node of this._getItemNodes()) {
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
		this._clearTimers();

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
		panel.removeEventListener("pointerenter", this._onPanelEnter);
		panel.removeEventListener("pointerleave", this._onPanelLeave);
		panel.remove();
		this._panel = null;
	}

	private _onPanelClick = (e: Event) => {
		if (!shouldKeepMenuOpen(e.composedPath())) {
			this.close();
			let owner = this._parentMenuOwner;
			while (owner) {
				owner.close();
				owner = (owner as FloatingMenuOwner & { _parentMenuOwner?: FloatingMenuOwner | null })._parentMenuOwner ?? null;
			}
		}
	};

	private _closeSiblingSubmenus() {
		const parent: ParentNode | null = this.parentElement;
		if (!parent) return;
		parent.querySelectorAll(":scope > ct-submenu").forEach(el => {
			if (el !== this) (el as CtSubmenu).close();
		});
	}

	private _closeNestedSubmenus() {
		const roots: ParentNode[] = [this];
		if (this._panel) roots.push(this._panel);
		for (const root of roots) {
			root.querySelectorAll("ct-submenu").forEach(el => {
				if (el !== this) (el as CtSubmenu).close();
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

		const {
			x,
			y,
			placement: finalPlacement
		} = await computePosition(reference, floating, {
			placement: this.placement,
			strategy: "fixed",
			middleware: [offset(0), flip({ fallbackPlacements: ["left-start", "right-start", "left-end", "right-end"], padding: 8 }), shift({ padding: 8 })]
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
		"ct-submenu": CtSubmenu;
	}
}
