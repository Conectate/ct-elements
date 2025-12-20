import { CtLit, customElement, property, query, state } from "../ct-lit/ct-lit.js";
import { TemplateResult, css, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { installRouter } from "pwa-helpers/router";

import { C2Regexp, C2RegexpType, EvaluateParams } from "./path_to_regexp.js";

export interface Page {
	path: string;
	element?: string | TemplateResult | Element | HTMLElement;
	renderRoot?: (root: any) => any;
	from?: () => Promise<any>;
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
	element?: string | TemplateResult | Element | HTMLElement;
	renderRoot?: (root: any) => any;
	c2regexp: C2RegexpType;
	from?: () => Promise<any>;
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
 * @event error-import it fires when the page is not found
 */
@customElement("ct-router")
export class CtRouter extends CtLit {
	/**
	 * This is a dictionary of routes linked to its corresponding elements.
	 */
	@state() private _routes: { [x: string]: Routes } = {};
	/**
	 * This holds the next route to be viewed after the url has been changed.
	 */
	@state() private patternMatched: string = "";
	/**
	 * This holds the current route that is being viewed
	 */
	@state() private _currentView: any = "";
	/**
	 * Current Path
	 */
	@state() private pathname: string = "/";

	@query("#root") root!: HTMLElement;
	unmountComponentAtNode?: (root: any) => any;
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
			<div id="root"></div>
		`;
	}

	constructor() {
		super();
		installRouter(l => this.handleRoutes(l));
		window.addEventListener("href-fire", () => this.handleRoutes(window.location));
		this._contentAdded(this.pages);
	}

	on(listener: CtRouterListeners, func: () => Promise<boolean>) {
		// onbeforeunload
		let id = this.listenerID++;
		this.listeners.push({ name: listener, callback: func, id });
		return id;
	}
	deleteListener(id: number) {
		this.listeners = this.listeners.filter(l => l.id != id);
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

	async handleRoutes(location: Location | URL) {
		/*
        Esto es por si hago un push state y luego hago un back entonces no cambie la URL
        ej: /herberth -> /herberth#showDialog -> /herberth
        */
		if (location.pathname != this.pathname) {
			let beforeunload = this.listeners.find(l => l.name == "beforeunload");
			if (beforeunload) {
				let cont = await beforeunload.callback();
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
						renderRoot: el.renderRoot,
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

		this.patternMatched = "";
		for (let i = 0; i < routePaths.length; i++) {
			let element = routes[routePaths[i].path]; // element,c2regexp,from,auth
			// console.log(routePaths[i].path,element.c2regexp.regexp);
			let c2 = EvaluateParams(path, element.c2regexp);
			if (c2 != null) {
				// Set params like a  {username : "herberthbregon", "jid" : 1234}
				this.params = c2;
				this.patternMatched = routePaths[i].path;
				break;
			}
		}

		// if pattern matched is created, change the view, if exausted all
		// route patterns, make view a not-found
		// console.log(this.patternMatched);
		if (this.patternMatched) {
			// Si la vista es protegida y no esta logeado entonces lo mando a /login y no esta autenticado
			if (routes[this.patternMatched].auth && !this.auth) {
				console.warn("You need to log in to perform this action");
				this.patternMatched = this.patternMatched = this.loginFallback;
				this.patternMatched = this.loginFallback;
				this.pathname = this.loginFallback;
				this._currentView = this._routes[this.loginFallback]?.element || html`<h1>Login Required</h1>`;
				let ce = new CustomEvent("login-needed", {
					detail: { path: window.location.pathname }
				});
				this.dispatchEvent(ce);
				window.dispatchEvent(ce);
			} else {
				this.patternMatched = this.patternMatched;
				this._currentView = this._routes[this.patternMatched].element || "";
				if (this._routes[this.patternMatched].renderRoot) {
					this.unmountComponentAtNode?.(this.root);
					this._routes[this.patternMatched].renderRoot!(this.root);
				}
			}
		} else {
			console.log("/404");
			this.patternMatched = "/404";
			this.pathname = "/404";
			// window.history.replaceState(null, document.title, '/404');
			this._currentView = this._routes["/404"]?.element || html`<h1>404 - Not Found</h1>`;
			if (this._routes[this.patternMatched].renderRoot) {
				this.unmountComponentAtNode?.(this.root);
				this._routes[this.patternMatched].renderRoot!(this.root);
			}
		}

		let ce = new CustomEvent("location-changed", {
			detail: {
				search: location.search,
				path: this.patternMatched,
				pathname: this.pathname,
				queryParams: this.queryParams,
				params: this.params
			}
		});
		this.dispatchEvent(ce);
		window.dispatchEvent(ce);
		if (this.patternMatched && routes[this.patternMatched]) {
			let fromImport = routes[this.patternMatched].from;
			if (fromImport) {
				this.dispatchEvent(new CustomEvent("loading", { detail: true }));
				fromImport()
					?.then(() => {
						if (this.patternMatched) this.dispatchEvent(new CustomEvent(this.patternMatched));
						setTimeout(() => this.dispatchEvent(new CustomEvent("loading", { detail: false })), 500);
					})
					.catch((e: any) => {
						console.error(e);
						this.dispatchEvent(new CustomEvent("error-import", { detail: { error: e } }));
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
	window.dispatchEvent(new CustomEvent("href-fire"));
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
