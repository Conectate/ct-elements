/**
    @license
    Copyright (c) 2020 Herberth Obregón. All rights reserved.
    This code may only be used under the BSD style license found at
    https://open.grupoconectate.com/LICENSE.txt The complete set of authors may be found at
    https://open.grupoconectate.com/AUTHORS.txt The complete set of contributors may be
    found at https://open.grupoconectate.com/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
    part of the Conectate Open Source Project is also subject to an additional IP rights grant
    found at https://open.grupoconectate.com/PATENTS.txt
 */

import { LitElement, css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
/**
 * ## `ct-img`
 * Normal and lazy images loader element
 * @element ct-img
 * @attr {Boolean} contain - For contain background size
 * @attr {'left'|'right'} background-position - Position of Backgroud
 */
@customElement("ct-img")
export class CtImg extends LitElement {
	@property({ type: String }) srcset?: string;
	@property({ type: String }) alt: string = "";
	@property({ type: String }) src: string = "";
	@property({ type: Boolean }) lazy = false;
	@property({ type: Boolean }) disable_anim = false;
	@property({ type: Boolean }) round: boolean = false;
	/** Force use IntersectionObserver instead `img.loading=lazy` */
	@property({ type: Boolean }) intersectionobserver: boolean = false;
	@property({ type: Object }) viewport: HTMLElement = document.body;
	@property({ type: String }) placeholderImg: string = "";
	@property({ type: String }) onErrorSrc =
		"data:image/svg+xml," +
		encodeURIComponent(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>'
		);
	@query("#img") $img!: HTMLImageElement;
	@query("#divimg") $divimg!: HTMLDivElement;

	static styles = [
		css`
			:host {
				display: block;
				position: relative;
				overflow: hidden;
				background-size: cover;
				background-position: center;
				height: 100%;
			}
			#divimg {
				position: absolute;
				top: 0;
				cursor: pointer;
				background-position: center;
				background-size: cover;
				background-repeat: no-repeat;
				width: 100%;
				min-width: 100%;
				min-height: 100%;
				height: 100%;
				-webkit-transition: all 0.3s;
				transition: all 0.3s;
			}

			:host([contain]) #divimg {
				background-size: contain;
			}
			:host([background-position="left"]) #divimg {
				background-position: left;
			}
			:host([background-position="right"]) #divimg {
				background-position: right;
			}

			img {
				/*display: none;*/
				max-width: 100%;
				max-height: 100%;
				margin: 0 auto;
				opacity: 0;
				transition: 0.5s opacity;
			}
			.r {
				border-radius: 50%;
			}
			:host ::slotted(:not(slot)) {
				position: relative;
			}
		`
	];
	render() {
		let classes = { r: this.round };
		return html`
			<img id="img" alt=${ifDefined(this.alt)} @load=${this._onImgLoad} @error=${this._onImgError} />
			<div id="divimg" class=${classMap(classes)}></div>
			<slot></slot>
		`;
	}

	/**
	 * When disconnected, remove the intersectionObserver
	 * if lazy loading is in effect.
	 * @private
	 */
	disconnectedCallback() {
		super.disconnectedCallback();
		// @ts-ignore
		if (window.CtImgIntersectionObserver) {
			// @ts-ignore
			window.CtImgIntersectionObserver.observer.unobserve(this);
			// Firefox is frequently calling disconnectedCallback twice
			// per element.  So basically this counter is useless,
			// but on the bright side, it's no longer needed.
			// @ts-ignore
			if (window.CtImgIntersectionObserver.counter > 0) {
				// @ts-ignore
				window.CtImgIntersectionObserver.counter--;
			}
		}
	}

	updated(cp: Map<PropertyKey, unknown>) {
		super.updated(cp);
		if (cp.has("src")) this._srcChanged(this.src);
		if (cp.has("srcset") || cp.has("lazy")) this._lazyChanged(this.lazy);
		if (cp.has("placeholderImg")) this._placeholderImgChanged(this.placeholderImg);
	}

	_lazyChanged(lazy: boolean) {
		if (lazy) {
			this._initLazyLoad(false);
		}
	}

	/**
	 * initialize lazy loading process by
	 * creating an intersection observer and
	 * adding this element to the observation
	 * list.
	 *
	 * Waits for the polyfill to load, if necessary
	 *
	 * All instances of plastic-image share the same
	 * IntersectionObserver.
	 * @param {Boolean} polyfilled - is this being called after polyfill loaded
	 * @private
	 */
	_initLazyLoad(polyfilled: boolean = false) {
		// Native Load
		if (this.$img.loading && !this.intersectionobserver) {
			this.$img.loading = "lazy";
			this.$img.src = this.srcset || this.src;
		} else if (window.IntersectionObserver) {
			// @ts-ignore
			if (!window.CtImgIntersectionObserver) {
				var options = {
					root: this.viewport,
					rootMargin: "0px"
				};

				// @ts-ignore
				window.CtImgIntersectionObserver = {
					/* the number of elements sharing this observer */
					counter: 0,
					/* an IntersectionObserver with only default arguments */
					observer: new IntersectionObserver(entries => {
						entries.forEach(function (entry) {
							if (entry.isIntersecting) {
								let lazyImage = entry.target as CtImg;
								lazyImage.src = lazyImage.srcset as string;
								// @ts-ignore
								window.CtImgIntersectionObserver.observer.unobserve(lazyImage);
								// @ts-ignore
								window.CtImgIntersectionObserver.counter--;
							}
						});
					}, options)
				};
				if (polyfilled) {
					// issue 23 - Edge does not reliably dispatch scroll events
					// issue 36 - Safari iOS does not reliably get scroll events with iron-scroll-target
					// @ts-ignore - At this point all pollyfilled browsers need polling :(
					window.CtImgIntersectionObserver.observer.POLL_INTERVAL = 120;
				}
			}
			// @ts-ignore - observe this element
			window.CtImgIntersectionObserver.observer.observe(this);
			// @ts-ignore
			window.CtImgIntersectionObserver.counter++;
		} else {
			let polyfillScript = document.getElementById("polyfill-IntersectionObserver");
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
				// @ts-ignore
				polyfillScript.src = "https://unpkg.com/intersection-observer@0.12.0/intersection-observer.js";
				// @ts-ignore
				polyfillScript.async = true;
				document.head.appendChild(polyfillScript);
			}
			// listen for the polyfill to finish loading
			// then retry the initLazyLoad process
			polyfillScript.addEventListener("load", _ => this._initLazyLoad(true));
		}
	}

	_srcChanged(src: string) {
		this.$img.removeAttribute("src");
		this.$img.style.transition = "";
		this.$img.style.opacity = `0`;
		this.$divimg.style.transition = "";
		this.$divimg.style.opacity = `0`;
		if (src) {
			this.$img.src = src;
		}
	}

	_onImgLoad() {
		if (!this.disable_anim) {
			this.$img.style.transition = "0.5s opacity";
			this.$divimg.style.transition = "0.5s opacity";
		}
		this.$divimg.style.opacity = "1";
		let src = this.src || this.srcset!;
		this.$divimg.style.backgroundImage = `url('${src.replace(/\\/g, "%5C")}')`;
		this.dispatchEvent(new CustomEvent("loaded-changed"));
	}

	_onImgError() {
		if (!this.disable_anim) this.$divimg.style.transition = "0.5s opacity";
		this.$divimg.style.opacity = "1";
		if (!this.placeholderImg) {
			this.$divimg.style.backgroundImage = `url(${this.onErrorSrc})`;
		}
	}

	_placeholderImgChanged(placeholder: string) {
		this.$divimg.style.opacity = "1";
		this.$divimg.style.backgroundImage = `url(${placeholder})`;
	}
}
declare global {
	interface HTMLElementTagNameMap {
		"ct-img": CtImg;
	}
}
