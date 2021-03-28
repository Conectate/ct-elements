import { LitElement, TemplateResult, css, customElement, html, internalProperty, property } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { installRouter } from "pwa-helpers/router";

import { C2Regexp, C2RegexpType, EvaluateParams } from "./path_to_regexp";

export interface Page {
	path: string;
	element: string | TemplateResult | Element | HTMLElement;
	from: () => any;
	auth: boolean | null;
	title: (() => string) | (() => null);
	regex?: RegExp;
	groups?: string[];
	extra?: {
		[x: string]: any;
	};
}
export interface LocationChanged {
	//patternMatched like a: /:profile/preferences
	path: string;
	// pathname like a: /herberthobregon/preferences
	pathname: string;
	// if path is /home?hello=word then queryParams is { hello : "world" }
	queryParams?: { [x: string]: string };
	// if href is /herberth/preference and path is /:username/preference then params is { username : "herberth" }
	params?: { [x: string]: string };
}

interface Routes {
	path: string;
	element: string | TemplateResult | Element | HTMLElement;
	c2regexp: C2RegexpType;
	from: () => any;
	auth: boolean | null;
	title: (() => string) | (() => null);
}

declare global {
	interface Window {
		ctrouter: CtRouter;
		href(path: string, name?: string): void;
	}
	interface HTMLElementTagNameMap {
		"ct-router": CtRouter;
	}
}
type CtRouterListeners = "beforeunload";
/**
 * ## `ct-router`
 * It's a simple routing system that changes the viewport depending on the route given
 *
 * @element ct-router
 * @event login-needed It triggers when a page requires authentication but the user is not yet logged in
 * @event loading It fires when a page is imported diamicamente and it is fired again when it finishes loading the page
 * @event location-changed it shoots when the route changes
 */
@customElement("ct-router")
export class CtRouter extends LitElement {
	$: { content?: HTMLDivElement; drawerSlot?: HTMLSlotElement } = {};
	/**
	 * This is a dictionary of routes linked to its corresponding elements.
	 */
	@internalProperty() private _routes: { [x: string]: Routes } = {};
	/**
	 * This holds the next route to be viewed after the url has been changed.
	 */
	@internalProperty() private patternMatched: string = "";
	/**
	 * This holds the current route that is being viewed
	 */
	@internalProperty() private _currentView: any = "";
	/**
	 * Current Path
	 */
	@internalProperty() private pathname: string = "/";
	/**
	 * Login needed fallback path
	 */
	@property({ type: String }) loginFallback = "/login";
	/**
	 * Array de elementos {path,element(HTML),from,auth,title}
	 */
	@property({ type: Array }) pages: Page[] = [];
	/**
	 * This is an object that holds the values of the query parameters in the url
	 */
	@property({ type: Object }) queryParams: { [x: string]: string } = {};
	/**
	 * This is an object that holds the values of the parameters in the route
	 * pattern set in the current page element being viewed.
	 */
	@property({ type: Object }) params: { [x: string]: string } = {};
	/**
	 * Parametro para verificar el auto
	 */
	@property({ type: Boolean }) auth: boolean = false;

	private listeners: { name: CtRouterListeners; callback: () => Promise<boolean>; id: number }[] = [];
	private listenerID = 0;
	static styles = [
		css`
			:host {
				display: block;
			}
			@keyframes fadeEffect {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}
			#content {
				height: 100%;
				min-height: 100%;
			}
			#content > * {
				animation: fadeEffect 0.5s;
				min-height: 100%;
			}
		`
	];

	render() {
		return html`
			<slot id="drawerSlot" name="banner"></slot>
			<div id="content">${typeof this._currentView == "string" ? unsafeHTML(this._currentView) : this._currentView}</div>
		`;
	}

	constructor() {
		super();
		window.ctrouter = this;
		installRouter((l) => this.handleRoutes(l));
		window.addEventListener("location-changed", () => this.handleRoutes(window.location));
	}
	firstUpdated() {
		this._contentAdded(this.pages);
	}
	on(listener: CtRouterListeners, func: () => Promise<boolean>) {
		// onbeforeunload
		let id = this.listenerID++;
		this.listeners.push({ name: listener, callback: func, id });
		return id;
	}
	deleteListener(id: number) {
		this.listeners = this.listeners.filter((l) => l.id != id);
	}

	updated(m: Map<string, any>) {
		if (m.has("pages")) {
			this._contentAdded(this.pages || []);
		}
	}

	replaceState(data: object, title: string, url: string) {
		window.history?.replaceState(data, title, url);
		this._setPath(url);
	}

	async handleRoutes(location: Location) {
		/*
        Esto es por si hago un push state y luego hago un back entonces no cambie la URL
        ej: /herberth -> /herberth#showDialog -> /herberth
        */
		if (location.pathname != this.pathname) {
			let has = this.listeners.find((l) => l.name == "beforeunload");
			if (has) {
				let cont = await has.callback();
				if (cont) {
					this._setPath(location.pathname);
					this._setQueryParams(getQueryParams());
					this._pathChanged(this.pathname);
				} else {
					window.history?.replaceState(null, document.title, this.pathname);
				}
			} else {
				this._setPath(location.pathname);
				this._setQueryParams(getQueryParams());
				this._pathChanged(this.pathname);
			}
		}
	}

	/**
	 * Sets the path property
	 */
	_setPath(path: string) {
		this.pathname = path || "/";
	}

	/**
	 * Sets the queryParams property and updates the element's params and queryParams
	 * properties. It also calls the page element's updateView method if it exists
	 */
	_setQueryParams(queryParams: { [x: string]: string }) {
		this.queryParams = queryParams || {};
	}

	/**
	 * Called in the attached lifecycle method to put the children to the dictionary
	 * for easy referencing
	 */
	_contentAdded(pages: Page[]) {
		let newContentRoutes: { [key: string]: boolean } = {};
		for (let el of pages) {
			if (el && el.path) {
				let c2regexp: C2RegexpType;
				// Custom regex and keys
				if (el.regex != null && el.groups != null) {
					// regex : expresion regular
					// keys : Array(0)
					let regex = new RegExp(el.regex, "i");
					c2regexp = { regexp: regex, groups: el.groups };
				} else {
					c2regexp = C2Regexp(el.path);
				}
				if (!newContentRoutes[el.path]) {
					newContentRoutes[el.path] = true;
					this._routes[el.path] = {
						path: el.path,
						element: el.element,
						c2regexp: c2regexp,
						from: el.from,
						auth: el.auth,
						title: el.title
					};
				} else {
					console.warn(new Error(`The Path: '${el.path}' already use`));
				}
			}
		}
		// cuando termina de agregar nuevo contenido entonces acciono el pathChanged para ver si hay un mejor match
		this._pathChanged(this.pathname);
	}

	/**
	 * Here is the magic! This is called when the path changes. It tries to look for a the pattern
	 * that matches the path, then calls the _changeView method to change the view
	 */
	_pathChanged(path: string) {
		let routes = this._routes;
		this.params = {};
		let routePaths = this.pages;
		if (routePaths.length == 0) {
			return;
		}

		for (let i = 0; i < routePaths.length; i++) {
			let element = routes[routePaths[i].path]; // element,c2regexp,from,auth
			// console.log(routePaths[i].path,element.c2regexp.regexp);
			let c2 = EvaluateParams(path, element.c2regexp);
			if (c2 != null) {
				// Set params like a  {username : "herberthbregon", "jid" : 1234}
				this.params = c2;
			this.	patternMatched = routePaths[i].path;
				break;
			}
		}

		// if pattern matched is created, change the view, if exausted all
		// route patterns, make view a not-found
		//console.log(this.patternMatched);
		if (this.patternMatched) {
			// Si la vista es protegida y no esta logeado entonces lo mando a /login y no esta autenticado
			if (routes[this.patternMatched].auth && !this.auth) {
				console.warn("You need to log in to perform this action");
				this.patternMatched = this.patternMatched = this.loginFallback;
				let ce = new CustomEvent("login-needed", {
					detail: { path: window.location.pathname }
				});
				this.dispatchEvent(ce);
				window.dispatchEvent(ce);
				this._currentView = this._routes[this.loginFallback].element;
			} else {
				this.patternMatched = this.patternMatched;
				this._currentView = this._routes[this.patternMatched].element;
			}
		} else {
			this.patternMatched = this.patternMatched = "/404";
			console.log("/404");
			this._currentView = this._routes["/404"].element;
		}

		this.dispatchEvent(
			new CustomEvent("location-changed", {
				detail: {
					path: this.patternMatched,
					pathname: this.pathname,
					queryParams: this.queryParams,
					params: this.params
				}
			})
		);
		if (this.patternMatched && routes[this.patternMatched]) {
			let fromImport = routes[this.patternMatched].from;
			if (fromImport) {
				this.dispatchEvent(new CustomEvent("loading", { detail: true }));
				fromImport()
					.then(() => {
						if (this.patternMatched) this.dispatchEvent(new CustomEvent(this.patternMatched));
						setTimeout(() => this.dispatchEvent(new CustomEvent("loading", { detail: false })), 500);
					})
					.catch((e: any) => {
						console.error(e);
						if (`${e}`.includes("ChunkLoadError")) {
							setTimeout(() => location.reload(), 10000);
						}
						console.error("Can't lazy-import - " + fromImport);
					});
			} else {
				setTimeout(() => this.dispatchEvent(new CustomEvent("loading", { detail: false })), 800);
			}
			if (routes[this.patternMatched].title()) {
				document.title = routes[this.patternMatched].title() as string;
			}
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		// clear listeners
		this.listeners.length = 0;
	}
}

export function href(path: string, name: string = document.title) {
	window.history.pushState({}, name, path);
	window.dispatchEvent(new CustomEvent("location-changed"));
}

window.href = href;

export function getCtRouter() {
	return window.ctrouter;
}

export function getQuery(): URLSearchParams {
	let u = new URL(location.href);
	return u.searchParams;
}

/** @deprecated */
export function getQueryParams() {
	let pairs = window.location.search.substring(1).split("&"),
		obj: { [x: string]: any } = {},
		pair,
		i;

	for (i in pairs) {
		if (pairs[i] === "") continue;

		pair = pairs[i].split("=");
		obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	return obj || {};
}
