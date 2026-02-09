/**
 * @license
 * Copyright (c) Conectate Team. All rights reserved.
 * This code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from "lit";
export type PropertyValues = Map<PropertyKey, any>;
export { css, html, svg, unsafeCSS } from "lit";
export { state as internalProperty, property, query, queryAll, queryAssignedNodes, queryAsync, state } from "lit/decorators.js";
export { unsafeHTML } from "lit/directives/unsafe-html.js";
export { until } from "lit/directives/until.js";
export { LitElement };

// From the TC39 Decorators proposal
interface ClassDescriptor {
	kind: "class";
	elements: ClassElement[];
	finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
}

// From the TC39 Decorators proposal
interface ClassElement {
	kind: "field" | "method";
	key: PropertyKey;
	placement: "static" | "prototype" | "own";
	initializer?: Function;
	extras?: ClassElement[];
	finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
	descriptor?: PropertyDescriptor;
}

type Constructor<T> = {
	// tslint:disable-next-line:no-any
	new (...args: any[]): T;
};

/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */
export const customElement = (tagName: string) => (classOrDescriptor: Constructor<HTMLElement> | ClassDescriptor) =>
	typeof classOrDescriptor === "function" ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);

/**
 * Legacy implementation of the customElement decorator for older browsers
 * @param tagName The name of the custom element to define
 * @param clazz The class to register as a custom element
 * @returns The class passed in
 * @internal
 */
const legacyCustomElement = (tagName: string, clazz: Constructor<HTMLElement>) => {
	if (!window.customElements.get(tagName)) {
		window.customElements.define(tagName, clazz);
	} else {
		console.warn(tagName, "already defined");
	}
	// Cast as any because TS doesn't recognize the return type as being a
	// subtype of the decorated class when clazz is typed as
	// `Constructor<HTMLElement>` for some reason.
	// `Constructor<HTMLElement>` is helpful to make sure the decorator is
	// applied to elements however.
	// tslint:disable-next-line:no-any
	return clazz as any;
};

/**
 * Standard implementation of the customElement decorator for modern browsers
 * @param tagName The name of the custom element to define
 * @param descriptor The class descriptor
 * @returns The modified descriptor
 * @internal
 */
const standardCustomElement = (tagName: string, descriptor: ClassDescriptor) => {
	const { kind, elements } = descriptor;
	return {
		kind,
		elements,
		// This callback is called once the class is otherwise fully defined
		finisher(clazz: Constructor<HTMLElement>) {
			if (!window.customElements.get(tagName)) {
				window.customElements.define(tagName, clazz);
			} else {
				console.warn(tagName, "already defined");
			}
		}
	};
};

let allShadowRoots: (HTMLElement | DocumentFragment)[] = [];
/**
 * CtLit - A wrapper class for LitElement with additional utility methods
 *
 * This class extends LitElement and provides convenient utility methods
 * for common operations such as element selection, event dispatching,
 * and scrolling animations.
 */
export class CtLit extends LitElement {
	connectedCallback(): void {
		if (location.host.includes("usac.edu.gt") && !location.host.includes("medicina")) return;
		super.connectedCallback();
		allShadowRoots.push(this.renderRoot);
	}

	patchQuerySelector() {
		let originalDocumentQuerySelector = document.querySelector;
		let originalDocumentQuerySelectorAll = document.querySelectorAll;

		document.querySelector = function (selectors: string) {
			for (let i = 0; i < allShadowRoots.length; i++) {
				const shadowRoot = allShadowRoots[i];
				const element = shadowRoot.querySelector(selectors);
				if (element) {
					return element;
				}
			}
			return originalDocumentQuerySelector.call(this, selectors);
		};

		document.querySelectorAll = function (selectors: string) {
			let elements: (HTMLElement | Element)[] = [];
			for (let i = 0; i < allShadowRoots.length; i++) {
				const shadowRoot = allShadowRoots[i];
				const element = shadowRoot.querySelectorAll(selectors);
				if (element && element.length > 0) {
					elements.push(...Array.from(element));
				}
			}
			const originalElements = originalDocumentQuerySelectorAll.call(this, selectors);
			elements.push(...Array.from(originalElements));
			return elements as any as NodeListOf<HTMLElement | Element>;
		};
	}

	/**
	 * Returns the first element that is a descendant of node that matches selectors.
	 * @param name
	 * @returns {HTMLElement | Element | undefined | null}
	 */
	$$(name: string): HTMLElement | Element | undefined | null {
		return this.renderRoot.querySelector(name);
	}

	/**
	 * Returns all element descendants of node that match selectors.
	 * @param name
	 * @returns {NodeListOf<HTMLElement | Element> | undefined}
	 */
	$$$(name: string): NodeListOf<HTMLElement | Element> | undefined {
		return this.renderRoot.querySelectorAll(name);
	}
	/**
	 * Map all IDs for shadowRoot and save in `this.$` like a polymer element.
	 * You should add in the first line of `firstUpdated()`
	 * @deprecated
	 */
	mapIDs() {
		console.warn("mapIDs() is deprecated, use `@query` decorator from lit/decorators instead");
		// @ts-ignore
		this.$ = {};
		let nodeList = this.renderRoot.querySelectorAll("[id]");
		for (let i = 0; nodeList != null && i < nodeList.length; i++) {
			// @ts-ignore
			this.$[nodeList[i].id] = nodeList[i] as HTMLElement;
		}
	}

	/**
	 * Clone all `native` types of object in a new object reference
	 * @param ob Original Object
	 */
	deepClone<T extends object>(ob: T): T {
		return window.structuredClone != null ? structuredClone(ob) : JSON.parse(JSON.stringify(ob));
	}

	/**
	 * Fire a event with name and value
	 * @param name
	 * @param value
	 */
	fire(name: string, value: any) {
		this.dispatchEvent(new CustomEvent(name, { detail: value }));
	}

	/**
     * 
     * @param scrollTargetY pixels to scroll. Ej: 
        const ticketsBlockPositionY = this.$.contact.getBoundingClientRect().top + window.scrollTarget.scrollTop;
     * @param time Time to scroll
     * @param easing 
     * @param target scrollTarget Element
     */
	scrollToY(
		scrollTargetY: number = 0,
		time: number = 600,
		easing: "easeInOutSine" | "easeOutSine" | "easeInOutQuint" | "easeInOutCubic" = "easeInOutCubic",
		target: Element = (window as any).scrollTarget
	) {
		let currentTime = 0;
		const animationTime = time / 1000;

		// easing equations from https://github.com/danro/easing-js/blob/master/easing.js
		const easingEquations = {
			easeOutSine: (pos: number) => Math.sin(pos * (Math.PI / 2)),
			easeInOutSine: (pos: number) => -0.5 * (Math.cos(Math.PI * pos) - 1),
			easeInOutQuint: (pos: number) => {
				if ((pos /= 0.5) < 1) {
					return 0.5 * Math.pow(pos, 5);
				}
				return 0.5 * (Math.pow(pos - 2, 5) + 2);
			},
			easeInOutCubic: function (pos: number) {
				if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
				return 0.5 * (Math.pow(pos - 2, 3) + 2);
			}
		};

		// add animation loop
		function tick() {
			currentTime += 1 / 60;

			const p = currentTime / animationTime;
			const t = easingEquations[easing](p);

			const scrollTop = (target as any).pageYOffset || target.scrollTop || 0;

			const newPosition = scrollTop + (scrollTargetY - scrollTop) * t;

			if (p < 1) {
				window.requestAnimationFrame(tick);
				target.scrollTop = newPosition;
			}
		}
		tick();
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		allShadowRoots = allShadowRoots.filter(root => root !== this.renderRoot);
	}
}
/**
 * Conditional template rendering helper
 *
 * @param condition Boolean condition to evaluate
 * @param template The template to render if the condition is true
 * @returns The template if the condition is true, empty string otherwise
 *
 * @example
 * ```ts
 * render() {
 *   return html`
 *     ${If(this.isVisible, html`<div>Conditional content</div>`)}
 *   `;
 * }
 * ```
 */
export function If(condition: boolean, template: any) {
	return condition ? template : "";
}
