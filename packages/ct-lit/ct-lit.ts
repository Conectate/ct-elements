import { LitElement } from 'lit-element';

export type PropertyValues = Map<PropertyKey, any>;
export { unsafeHTML } from 'lit-html/directives/unsafe-html';
export { until } from 'lit-html/directives/until';
export { html, svg, css, customElement, property,internalProperty, query, queryAll, queryAssignedNodes, queryAsync } from 'lit-element';

/**
 * It's a simple wrapper for LitElement
 */
export class CtLit extends LitElement {
	$: { [x: string]: HTMLElement | any } = {};

	/**
	 * Returns the first element within node's descendants whose ID is elementId.
	 * @param name
	 */
	_(name: string): HTMLElement | undefined | null {
		return (this.renderRoot as DocumentFragment).getElementById?.(name);
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
	 */
	mapIDs() {
		let nodeList = this.renderRoot.querySelectorAll('[id]');
		for (let i = 0; nodeList != null && i < nodeList.length; i++) {
			this.$[nodeList[i].id] = nodeList[i] as HTMLElement;
		}
	}

	/**
	 * Set Value and fire event with the same name
	 * @param name
	 * @param value
	 */
	set(name: string, value: any) {
		(this as any)[name] = value;
		this.dispatchEvent(new CustomEvent(name, { detail: value }));
	}

	/**
	 * Set Value and fire event with the same name
	 * @param name
	 * @param value
	 */
	push(name: string, value: any) {
		(this as any)[name].push(value);
		this.requestUpdate();
	}
	/**
	 * Delete item in list
	 * @param listTarget List Target
	 * @param index Index
	 */
	deleteAt(listTarget: string, index: number) {
		(this as any)[listTarget].splice(index, 1);
		this.requestUpdate();
	}

	/**
	 * Insert Object in list at index
	 * @param listTarget List Target
	 * @param index Index
	 * @param el Object
	 */
	insertAt(listTarget: string, index: number, el: any) {
		this.splice(listTarget, index, 0, el);
	}

	setAt(listTarget: string, index: number, el: any) {
		this.splice(listTarget, index, 1, el);
	}

	/**
	 * Clone all `native` types of object in a new object reference
	 * @param ob Original Object
	 */
	deepClone(ob: object) {
		return JSON.parse(JSON.stringify(ob));
	}

	/**
	 * Set Value and fire event with the same name
	 * @param name
	 * @param value
	 */
	splice(name: string, index: number, pos: number, value: any) {
		(this as any)[name].splice(index, pos, value);
		this.requestUpdate();
	}

	/**
	 * Move item in array
	 * @param array Array object
	 * @param old_index Old Index
	 * @param new_index New Index
	 */
	move(array: any[], old_index: number, new_index: number) {
		if (new_index >= array.length) {
			let k = new_index - array.length;
			while (k-- + 1) {
				this.push(name, undefined);
			}
		}
		// @ts-ignore
		array.splice(new_index, 0, this.splice(name, old_index, 1)[0]);
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
	scrollToY(scrollTargetY: number = 0, time: number = 600, easing: 'easeInOutSine' | 'easeOutSine' | 'easeInOutQuint' | 'easeInOutCubic' = 'easeInOutCubic', target: Element = (window as any).scrollTarget) {
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
}
/**
 * If render conditions
 * @param condition Condition
 * @param template StringTemplate
 */
export function If(condition: boolean, template: any) {
	return condition ? template : '';
}
