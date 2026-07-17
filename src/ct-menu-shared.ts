import { CSSResult, css } from "lit";

/** Duration of the menu open/close surface animation (ms). */
export const MENU_SURFACE_ANIMATION_MS = 220;

/** Shared surface styles for portaled menu panels. */
export const menuPanelStyles = css`
	:host {
		position: fixed;
		left: 0;
		top: 0;
		z-index: var(--z-index-menu, 1000);
		display: block;
	}

	.dd-menu {
		background: var(--color-surface, #fff);
		border-radius: var(--border-radius, 8px);
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
		outline: 1px solid #99999973;
		padding: max(calc(var(--border-radius, 8px) / 2), 8px) 0;
		opacity: 0;
		transform: scale(0.94);
		pointer-events: none;
		visibility: hidden;
		transition:
			opacity 0.18s ease,
			transform 0.22s cubic-bezier(0.34, 1.35, 0.64, 1),
			visibility 0s 0.22s;
	}

	.dd-menu.active {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
		visibility: visible;
		transition:
			opacity 0.18s ease,
			transform 0.28s cubic-bezier(0.34, 1.45, 0.64, 1),
			visibility 0s;
	}

	.dd-menu.closing {
		opacity: 0;
		transform: scale(0.96);
		pointer-events: none;
		visibility: hidden;
		transition:
			opacity 0.16s ease,
			transform 0.16s ease,
			visibility 0s 0.16s;
	}

	.dd-menu ::slotted(button) {
		min-width: 220px;
		color: var(--color-on-surface, #474747);
		margin: 0;
		padding: 8px 16px;
		min-height: 38px;
		width: 100%;
		background: none;
		outline: none;
		border: none;
		font-size: 1em;
		text-align: left;
		font-weight: 500;
	}

	.dd-menu ::slotted(button:last-of-type) {
		border: none;
	}

	.dd-menu ::slotted(*) {
		min-width: 220px;
		display: block;
		opacity: 0;
		transition: all 0.25s ease;
		transform: translateY(-30%);
		cursor: pointer;
		align-items: center;
	}

	.dd-menu ::slotted(span:empty),
	.dd-menu ::slotted(hr) {
		height: 1px;
		background: var(--color-outline, #dadce0);
		margin: 4px 2px;
		border: 0.5px solid var(--color-outline, #dadce0);
	}

	.dd-menu ::slotted(h1) {
		padding: 8px 16px;
		font-size: 0.8em;
		color: var(--color-primary);
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.15em;
		font-family: "Google Sans", "Ubuntu", arial, sans-serif;
		margin: 0;
	}

	.dd-menu ::slotted(button:hover) {
		background: var(--color-primary-light);
		color: var(--color-primary);
		transition: all 0.15s ease;
	}

	.dd-menu ::slotted(button:active) {
		background: #d2d2d2;
		transition: all 0.15s ease;
	}

	.dd-menu.active ::slotted(*) {
		opacity: 1;
		transform: translateY(0);
	}

	.dd-menu.closing ::slotted(*) {
		opacity: 1;
		transform: translateY(0);
		transition: none;
	}

	@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
		.dd-menu {
			background: var(--color-blur-surface, #ffffffbd);
			backdrop-filter: saturate(180%) blur(15px);
			-webkit-backdrop-filter: saturate(180%) blur(15px);
		}
	}
`;

export type FloatingMenuOwner = HTMLElement & { opened: boolean; close(): void };

/** Maps a floating panel element to its owning menu/submenu. */
export const floatingMenuOwners = new WeakMap<Element, FloatingMenuOwner>();

let floatingId = 0;

/**
 * Creates a shadow-DOM panel intended to be appended to `document.body`.
 * Light-DOM children of the returned host are projected into the menu surface.
 */
export function createFloatingMenuPanel(owner: FloatingMenuOwner, styles: CSSResult = menuPanelStyles): HTMLElement {
	const host = document.createElement("div");
	host.id = `ct-floating-menu-${++floatingId}`;
	host.setAttribute("data-ct-floating-menu", owner.localName);
	floatingMenuOwners.set(host, owner);

	const shadow = host.attachShadow({ mode: "open" });
	const sheet = styles.styleSheet;
	if (sheet && "adoptedStyleSheets" in shadow) {
		shadow.adoptedStyleSheets = [sheet];
	} else {
		const style = document.createElement("style");
		style.textContent = styles.cssText;
		shadow.appendChild(style);
	}

	const menu = document.createElement("div");
	menu.className = "dd-menu";
	menu.setAttribute("part", "menu");
	menu.setAttribute("role", "menu");
	menu.innerHTML = `<slot></slot>`;
	shadow.appendChild(menu);

	return host;
}

export function getFloatingMenuSurface(panel: HTMLElement): HTMLElement | null {
	return panel.shadowRoot?.querySelector(".dd-menu") ?? null;
}

/** Adds the open state so the surface fades/scales in with a light bounce. */
export function openFloatingMenuSurface(surface: HTMLElement | null) {
	if (!surface) return;
	surface.classList.remove("closing");
	// Restart transition when reopening mid-close.
	void surface.offsetWidth;
	surface.classList.add("active");
}

/** Removes the open state and resolves after the close animation finishes. */
export function closeFloatingMenuSurface(surface: HTMLElement | null): Promise<void> {
	if (!surface) return Promise.resolve();
	if (!surface.classList.contains("active") && !surface.classList.contains("closing")) {
		return Promise.resolve();
	}

	return new Promise(resolve => {
		surface.classList.add("closing");
		surface.classList.remove("active");

		let settled = false;
		const finish = () => {
			if (settled) return;
			settled = true;
			surface.removeEventListener("transitionend", onEnd);
			resolve();
		};

		const onEnd = (e: TransitionEvent) => {
			if (e.target !== surface) return;
			if (e.propertyName !== "opacity" && e.propertyName !== "transform") return;
			finish();
		};

		surface.addEventListener("transitionend", onEnd);
		setTimeout(finish, MENU_SURFACE_ANIMATION_MS + 40);
	});
}

/** Returns true when the event path hits this owner or one of its floating panels / nested submenus. */
export function isEventInsideMenuTree(path: EventTarget[], owner: FloatingMenuOwner, panel?: HTMLElement | null): boolean {
	if (path.includes(owner) || (panel && path.includes(panel))) return true;

	for (const node of path) {
		if (!(node instanceof Element)) continue;
		const panelOwner = floatingMenuOwners.get(node);
		if (!panelOwner) continue;
		if (panelOwner === owner) return true;
		// Nested submenu panels belong to the same tree when the submenu is (or was) under this owner.
		if (owner.contains(panelOwner) || panel?.contains(panelOwner)) return true;
		// After portaling, submenu hosts live inside a parent panel — walk via stored parent refs.
		let current: FloatingMenuOwner | null = panelOwner;
		const seen = new Set<FloatingMenuOwner>();
		while (current && !seen.has(current)) {
			seen.add(current);
			if (current === owner) return true;
			current = (current as FloatingMenuOwner & { _parentMenuOwner?: FloatingMenuOwner | null })._parentMenuOwner ?? null;
		}
	}
	return false;
}

/**
 * Resolves the menu/submenu that owns `start`, walking up through light DOM,
 * shadow roots and portaled floating panels (via `floatingMenuOwners`).
 */
export function resolveFloatingMenuOwner(start: Element): FloatingMenuOwner | null {
	let node: Node | null = start.parentNode;
	while (node) {
		if (node instanceof Element) {
			if (node.localName === "ct-submenu" || node.localName === "ct-menu") {
				return node as FloatingMenuOwner;
			}
			const owner = floatingMenuOwners.get(node);
			if (owner && owner !== start) return owner;
		}
		node = node instanceof ShadowRoot ? node.host : node.parentNode;
	}
	return null;
}

export function shouldKeepMenuOpen(path: EventTarget[]): boolean {
	return path.some(node => {
		if (!(node instanceof HTMLElement)) return false;
		if (node.localName === "ct-submenu") return true;
		if (node.hasAttribute("keep-open")) return true;
		return (node as HTMLElement & { keepOpen?: boolean }).keepOpen === true;
	});
}

export function staggerMenuItems(nodes: Element[]) {
	nodes.forEach((item, index) => {
		const el = item as HTMLElement;
		el.style.transitionDelay = `${index * 40}ms`;
		setTimeout(
			() => {
				el.style.transitionDelay = "";
			},
			index * 40 + 1000
		);
	});
}

export function setTransformOrigin(el: HTMLElement, placement: string) {
	const [side, alignment] = placement.split("-") as [string, string | undefined];
	const originX =
		side === "left" || side === "right"
			? side === "left"
				? "right"
				: "left"
			: alignment === "start"
				? "left"
				: alignment === "end"
					? "right"
					: "center";
	const originY =
		side === "top" || side === "bottom"
			? side === "top"
				? "bottom"
				: "top"
			: alignment === "start"
				? "top"
				: alignment === "end"
					? "bottom"
					: "center";
	el.style.transformOrigin = `${originX} ${originY}`;
}
