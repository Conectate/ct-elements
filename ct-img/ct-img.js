var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
    @license
    Copyright (c) 2020 Herberth Obregón. All rights reserved.
    This code may only be used under the BSD style license found at
    http://wc.conectate.today/LICENSE.txt The complete set of authors may be found at
    http://wc.conectate.today/AUTHORS.txt The complete set of contributors may be
    found at http://wc.conectate.today/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
    part of the Conectate Open Source Project is also subject to an additional IP rights grant
    found at http://wc.conectate.today/PATENTS.txt
 */
import { CtLit, html, property } from '@conectate/ct-lit/ct-lit';
/**
 * @attr contain - For contain background size
 * @attr background-position - Position of Backgroud
 */
class CtImg extends CtLit {
    constructor() {
        super(...arguments);
        this.alt = '';
        this.src = '';
        this.lazy = false;
        this.round = false;
        this.viewport = document.body;
        this.placeholderImg = '';
        this.onErrorSrc = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#CCC" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>');
    }
    render() {
        return html `
<style>
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
    .r{
        border-radius: 50%;
    }
    :host ::slotted(:not(slot)){
        position: relative;
    }
</style>

<img id="img" .alt="${this.alt}" @load=${this._onImgLoad} @error=${this._onImgError}>
<div id="divimg"></div>
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
    firstUpdated() {
        this.mapIDs();
    }
    updated(cp) {
        super.updated(cp);
        if (cp.has('srcset') || cp.has('lazy'))
            this._lazyChanged(this.lazy);
        if (cp.has('src'))
            this._srcChanged(this.src);
        if (cp.has('placeholderImg'))
            this._placeholderImgChanged(this.placeholderImg);
        if (cp.has('round'))
            this._roundChanged(this.round);
    }
    _lazyChanged(lazy) {
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
    _initLazyLoad(polyfilled = false) {
        // @ts-ignore
        if (window.IntersectionObserver) {
            // @ts-ignore
            if (!window.CtImgIntersectionObserver) {
                var options = {
                    root: this.viewport,
                    rootMargin: '0px'
                };
                // @ts-ignore
                window.CtImgIntersectionObserver = {
                    /* the number of elements sharing this observer */
                    counter: 0,
                    /* an IntersectionObserver with only default arguments */
                    observer: new IntersectionObserver((entries) => {
                        entries.forEach(function (entry) {
                            if (entry.isIntersecting) {
                                let lazyImage = entry.target;
                                lazyImage.src = lazyImage.srcset;
                                // @ts-ignore
                                window.CtImgIntersectionObserver.observer.unobserve(lazyImage);
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
        }
        else {
            this.set('src', this.srcset);
            let polyfillScript = document.getElementById('polyfill-IntersectionObserver');
            if (!polyfillScript) {
                // load the intersection-observer polyfill script
                polyfillScript = document.createElement("script");
                polyfillScript.id = 'polyfill-IntersectionObserver';
                // The current version, 0.3.0, supports Safari which now has
                // native shadow DOM.  The version currently served by polyfill.io
                // does not support native shadow dom.
                //
                // Until the polyfill is updated to 0.3.0 or greater on polyfill.io
                // we will use version 0.3.0 and include it with the element.
                //
                // @ts-ignore
                polyfillScript.src = "https://unpkg.com/intersection-observer@0.5.1/intersection-observer";
                // @ts-ignore
                polyfillScript.async = true;
                document.head.appendChild(polyfillScript);
            }
            // listen for the polyfill to finish loading
            // then retry the initLazyLoad process
            polyfillScript.addEventListener("load", _ => this._initLazyLoad(true));
        }
    }
    _roundChanged(round) {
        if (round) {
            this.$.divimg.classList.add('r');
        }
        else {
            this.$.divimg.classList.remove('r');
        }
    }
    _srcChanged(src) {
        this.$.img.removeAttribute('src');
        this.$.img.style.transition = '';
        this.$.img.style.opacity = 0;
        this.$.divimg.style.transition = '';
        this.$.divimg.style.opacity = 0;
        if (src) {
            this.$.img.src = src;
        }
    }
    _onImgLoad() {
        this.$.img.style.transition = '0.5s opacity';
        this.$.divimg.style.transition = '0.5s opacity';
        this.$.divimg.style.opacity = 1;
        this.$.divimg.style.backgroundImage = 'url(\'' + this.src + '\')';
        this.fire('loaded-changed', { value: this.src, img: this.$.img });
    }
    _onImgError() {
        this.$.divimg.style.transition = '0.5s opacity';
        this.$.divimg.style.opacity = 1;
        if (!this.placeholderImg) {
            this.$.divimg.style.backgroundImage = `url('${this.onErrorSrc}')`;
        }
    }
    _placeholderImgChanged(placeholder) {
        this.$.divimg.style.opacity = 1;
        this.$.divimg.style.backgroundImage = 'url(\'' + placeholder + '\')';
    }
}
__decorate([
    property({ type: String })
], CtImg.prototype, "srcset", void 0);
__decorate([
    property({ type: String })
], CtImg.prototype, "alt", void 0);
__decorate([
    property({ type: String })
], CtImg.prototype, "src", void 0);
__decorate([
    property({ type: Boolean })
], CtImg.prototype, "lazy", void 0);
__decorate([
    property({ type: Boolean })
], CtImg.prototype, "round", void 0);
__decorate([
    property({ type: Object })
], CtImg.prototype, "viewport", void 0);
__decorate([
    property({ type: String })
], CtImg.prototype, "placeholderImg", void 0);
__decorate([
    property({ type: String })
], CtImg.prototype, "onErrorSrc", void 0);
customElements.define('ct-img', CtImg);
