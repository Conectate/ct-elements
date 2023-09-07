import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * @element ct-scroll-threshold
 */
@customElement("ct-scroll-threshold")
export class CtScrollThreshold extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
			}
		`
	];
	@property({ type: Number }) threshold = 0.9;
	@property({ type: Object }) scrollTarget = document.body;
	observer?: IntersectionObserver & { POLL_INTERVAL?: number };
	@query("#threshold") $threshold!: HTMLDivElement;
	render() {
		return html`<slot></slot>
			<div id="threshold"></div>`;
	}

	firstUpdated() {
		this.#observe();
	}

	#observe(polyfilled: boolean = false) {
		if (window.IntersectionObserver) {
			this.observer = new window.IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							this.observer?.unobserve(this.$threshold);
							this.dispatchEvent(new CustomEvent("lower-threshold", { detail: {} }));
						}
					});
				},
				{ threshold: this.threshold, root: this.scrollTarget }
			);
			if (polyfilled) {
				// issue 23 - Edge does not reliably dispatch scroll events
				// issue 36 - Safari iOS does not reliably get scroll events with iron-scroll-target
				//  - At this point all pollyfilled browsers need polling :(
				this.observer.POLL_INTERVAL = 120;
			}
			// observe this element
			this.observer.observe(this.$threshold);
		} else {
			let polyfillScript = document.getElementById("polyfill-IntersectionObserver") as HTMLScriptElement;
			if (!polyfillScript) {
				// load the intersection-observer polyfill script
				polyfillScript = document.createElement("script");
				polyfillScript.id = "polyfill-IntersectionObserver";
				// The current version, 0.3.0, supports Safari which now has
				// native shadow DOM.  The version currently served by polyfill.io
				// does not support native shadow dom.
				//
				// Until the polyfill is updated to 0.3.0 or greater on polyfill.io
				// we will use version 0.3.0 and include it with the element.
				//
				polyfillScript.src = "https://unpkg.com/intersection-observer@0.12.0/intersection-observer.js";
				polyfillScript.async = true;
				document.head.appendChild(polyfillScript);
			}
			// listen for the polyfill to finish loading
			// then retry the initLazyLoad process
			polyfillScript.addEventListener("load", () => this.#observe(true));
		}
	}

	toggleScrollListener(enable: boolean) {
		if (enable) {
			this.observer?.observe(this.$threshold);
		} else {
			this.observer?.unobserve(this.$threshold);
		}
	}

	clearTriggers() {
		this.observer?.observe(this.$threshold);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.observer?.disconnect();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-scroll-threshold": CtScrollThreshold;
	}
}
