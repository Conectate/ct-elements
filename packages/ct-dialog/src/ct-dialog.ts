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

import { getClient, sleep } from "@conectate/ct-helpers";
import { CtLit, css, customElement, html, property, state } from "@conectate/ct-lit";

let ctDialogs: { id: string; dialog: CtDialog }[] = [];
// @ts-ignore
window.ctDialogs != null || (window.ctDialogs = []);
// @ts-ignore
ctDialogs = window.ctDialogs;

let dialogID = 0;
let toDelete: CtDialog | null = null;

export function showCtDialog(el: HTMLElement, id?: string, history?: ConectateHistory): CtDialog {
	let ctDialog: CtDialog;
	// Inserto el ID del dialogo que voy a mostrar
	ctDialog = new CtDialog();
	ctDialog.dialogID = id || `${dialogID++}`;
	ctDialogs.push({ id: ctDialog.dialogID, dialog: ctDialog });
	history && (ctDialog.history = history);
	ctDialog.show();
	ctDialog.element = el;
	return ctDialog;
}

export function closeCtDialog(id?: CtDialog) {
	return new Promise(async resolve => {
		let m = document.querySelectorAll("ct-dialog") as NodeListOf<CtDialog>;
		for (let mod = 0; mod < m.length; mod++) {
			let modal = m[mod];
			if (modal == null) return;
			if (id == modal || id == null) {
				await modal.close();
			}
		}
		resolve(0);
	});
}

// @ts-ignore
window.showCtDialog = showCtDialog;
// @ts-ignore
window.closeCtDialog = closeCtDialog;

type typeDialog = "alert" | "cupertino" | "slide-right" | "slide-left" | "bottom-sheet";
export enum DialogSizePreferences {
	/** Para pantalla completa */
	fullsreen = 0,
	/** Para que se muestre al 80% de la ventada y 21cm de ancho */
	fullsize = 1
}

export interface ConectateHistory {
	title: string;
	href: string;
}

let _closeViaPopState = async (e: PopStateEvent) => {
	// Si el dialogo que se esta cerrando es el mismo que el que se abrio, lo cierro [REF.1]
	if (ctDialogs.length == 0) return;
	let dialogPop = ctDialogs[ctDialogs.length - 1];
	if (dialogPop.dialog) {
		// Lo elimino de la lista de dialogos
		if (toDelete == dialogPop.dialog) {
			toDelete = null;
			dialogPop.dialog.destroy();
		} else {
			await dialogPop.dialog.close(e, "popstate");
		}
	}
};

let _clseDialogESC = (e: KeyboardEvent) => {
	if (e.key === "Escape") {
		if (ctDialogs.length == 0) return;
		let dialogPop = ctDialogs[ctDialogs.length - 1];
		if (dialogPop.dialog.interactiveDismissDisabled) return;
		dialogPop.dialog.close(e, "keyup");
	}
};

window.addEventListener("popstate", _closeViaPopState, false);
document.addEventListener("keyup", _clseDialogESC, false);
/**
 * @cssProp --ct-dialog-width - Ancho del dialogo
 * @cssProp --ct-dialog-height - Alto del dialogo
 * @fires close - Se dispara cuando se cierra el dialogo
 * @fires open - Se dispara cuando se abre el dialogo
 */
@customElement("ct-dialog")
export class CtDialog extends CtLit {
	/** En algunas version  */
	static checkForCriOS = false;
	static styles = [
		css`
			@keyframes in-modalFadeEffect {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}

			@keyframes in-scale-ct {
				from {
					transform: scale(0.1);
				}
				to {
					transform: scale(1);
				}
			}

			@keyframes in-scale-cupertino {
				from {
					transform: scale(1.2);
				}
				to {
					transform: scale(1);
				}
			}

			@keyframes in-slide-right {
				from {
					transform: translateX(100%);
					transition-timing-function: ease-in-out;
				}
				to {
					transform: translateX(0);
				}
			}
			@keyframes in-slide-left {
				from {
					transform: translateX(-100%);
					transition-timing-function: ease-in-out;
				}
				to {
					transform: translateX(0);
				}
			}

			@keyframes in-bottom-sheet {
				from {
					transform: translateY(100%);
					transition-timing-function: ease-in-out;
				}
				to {
					transform: translateY(0);
				}
			}
		`,
		css`
			:host {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: fixed;
				z-index: 110;
				left: env(safe-area-inset-right, 0);
				top: env(safe-area-inset-top, 0);
				right: env(safe-area-inset-right, 0);
				bottom: env(safe-area-inset-bottom, 0);
				overflow-y: auto;
				overflow-x: hidden;
				animation: in-modalFadeEffect 0.2s;
				font-family: "Roboto", sans-serif !important;
				box-align: center;
				box-orient: vertical;
				box-sizing: border-box;
				--mdc-theme-secondary: var(--color-primary);
				--mdc-theme-primary: var(--color-primary);
				--mdc-checkbox-unchecked-color: var(--color-on-background);
			}
			:host([type="bottom-sheet"]) {
				justify-content: flex-end;
			}

			.overlay {
				position: fixed;
				left: env(safe-area-inset-right, 0);
				top: env(safe-area-inset-top, 0);
				right: env(safe-area-inset-right, 0);
				bottom: env(safe-area-inset-bottom, 0);
				background-color: rgba(0, 0, 0, 0.55);
				animation: in-modalFadeEffect 0.2s;
				z-index: -1;
			}

			.anim-normal {
				animation: in-scale-cupertino 0.25s;
			}
			.anim-cupertino {
				animation: in-scale-cupertino 0.25s;
			}
			.anim-slide-right {
				animation: in-slide-right 0.5s;
			}
			.anim-slide-left {
				animation: in-slide-left 0.5s;
			}
			.anim-bottom-sheet {
				animation: in-bottom-sheet 0.5s;
			}

			.no-anim {
				animation: none;
			}

			.c {
				display: block;
				position: relative;
				max-height: var(--ct-dialog-height, 80%);
				max-height: var(--ct-dialog-height, 85dvh);
				max-width: var(--ct-dialog-width, 25cm);
				width: 100%;
				/* height: max-content; */
				overflow: auto;
				margin: 0;
				box-sizing: border-box;
				z-index: 200;
			}
		`
	];
	dialogID?: string;
	@property({ type: Boolean }) interactiveDismissDisabled: boolean = false;
	@property({ type: String, reflect: true }) role: string = "alert";
	@property({ type: String, reflect: true }) type: typeDialog = "alert";
	@property({ type: String, reflect: true, attribute: "aria-modal" })
	ariaModal: string = "true";

	// Vars
	disableHistoryAPI: boolean = false;
	_closeViaPopState: any;
	_clseDialogESC: any;
	/** Esto es para esperar que efectivamente se haya hecho el push state */
	mappingContainer?: Promise<any>;
	history!: ConectateHistory;
	// @property({ type: Object }) element?: HTMLElement | TemplateResult;
	@state() _element?: HTMLElement;
	@property({ type: Array }) preferences: any[] = [];

	resolveMapping!: (value?: {} | PromiseLike<{}>) => void;
	finish!: () => void;

	get element() {
		return this._element;
	}

	set element(val) {
		let old = this._element;
		this._element = val;
		this.requestUpdate("element", old);
		// Calc for dvh
		let client = getClient();
		let oldChrome = client.browser == "chrome" && client.browserVersion < 108;
		let oldSafari = client.browser == "safari" && client.browserVersion < 16.4;
		let oldFirefox = client.browser == "firefox";
		/**
		 * [FIX]
		 * [Windows Vista] Chrome v75 height 0px;
		 * [MacOs] Overflow fix
		 */
		this.updateComplete.then(async () => {
			await sleep(300);
			let bodyY = Math.min(document.body.getBoundingClientRect().height, window.innerHeight);
			let elementY = this._element!.offsetHeight;
			// console.log('bodyY', bodyY, 'elementY', elementY, elementY / bodyY);
			if (bodyY > elementY) {
				// Reviso si es menor al 5% de la pantalla
				if ((elementY / bodyY) * 100 < 5) {
					console.warn("[ct-dialog] El elemento no es visible");
					if (this._element) this._element.style.height = `var(--ct-dialog-height, ${Math.floor(bodyY * 0.8)}px)`;
				} else if ((elementY / bodyY) * 100 >= 80) {
					// console.warn("El elemento esta desbordado");
					if (this._element && !this.preferences.includes(DialogSizePreferences.fullsreen) && (oldChrome || oldSafari || oldFirefox)) {
						this._element.style.height = `var(--ct-dialog-height, ${Math.floor(bodyY * 0.8)}px)`;
					}
				}
			}
		});

		// if (getClient().os == "ios") {
		// 	this.updateComplete.then(async () => {
		// 		if (this._element) this._element.style.borderRadius = "0px";
		// 	});
		// }
	}

	render() {
		return html`
			${this.getStylesPref(this.preferences)}
			<div
				class="overlay"
				@click="${(e: MouseEvent) => {
					e.stopPropagation();
					if (this.interactiveDismissDisabled) return;
					this.close(e, "click");
				}}"
			></div>

			${this.element}
		`;
	}

	getStylesPref(pref: DialogSizePreferences[]) {
		return pref.map(i => {
			switch (i) {
				case DialogSizePreferences.fullsreen:
					return html`
						<style>
							.c {
								max-height: 92% !important;
								max-height: 100dvh;
								max-width: 100vw !important;
								max-width: 100dvw !important;
							}
						</style>
					`;
			}
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("popstate", this._closeViaPopState, false);
		document.removeEventListener("keyup", this._clseDialogESC, false);
	}

	computeAnimation(anim: typeDialog) {
		switch (anim) {
			case "alert":
				return "anim-normal";
			case "cupertino":
				return "anim-cupertino";
			case "slide-left":
				return "anim-slide-left";
			case "slide-right":
				return "anim-slide-right";
			case "bottom-sheet":
				return "anim-bottom-sheet";
		}
	}

	constructor() {
		super();
		this.mappingContainer = new Promise(resolve => {
			this.resolveMapping = resolve;
		});
	}
	firstUpdated() {
		// Checkeo que no sea Chrome de iOS porque esa mierda no sirve aquí 😡
		if (CtDialog.checkForCriOS && navigator.userAgent.match(/CriOS\/([0-9\.]+)/)) this.disableHistoryAPI = true;

		if (this.history == null) this.history = { title: document.title, href: window.location.href };
		// Crea una entrada en el History API identica que solo va a servir para usar 'Atras' en Moviles y cerrar el dialogo
		if (!this.disableHistoryAPI) window.history.pushState({ dialogID: this.dialogID }, this.history.title, this.history.href);
		this.resolveMapping();
		if (this.element?.classList) {
			this.element.classList.add("c");
			this.element.classList.add(this.computeAnimation(this.type));
		}
	}

	enableHistoryAPI(value = true) {
		this.disableHistoryAPI = !value;
		return this;
	}

	fullscreenMode() {
		this.preferences = [...this.preferences, DialogSizePreferences.fullsreen];
		return this;
	}
	fullsizeMode() {
		this.preferences = [...this.preferences, DialogSizePreferences.fullsize];
		return this;
	}

	setAnimation(anim: typeDialog) {
		this.type = anim;
		return this;
	}

	show() {
		document.body.appendChild(this);
	}
	async waitForDefined(param: () => any, timeout = 10_000) {
		while (param() == undefined) {
			await new Promise(resolve => setTimeout(resolve, 200));
			timeout -= 200;
			if (timeout <= 0) return false;
		}
		return param();
	}

	close(e?: Event | null, type?: "click" | "keyup" | "popstate") {
		// Este dialog lo elimino de las lista de dialogos
		return new Promise(async resolve => {
			let finish = async () => {
				if (!document.body.contains(this)) {
					console.warn(`dialogID ya no se encuentra en el DOM`, this);
					resolve(e as Event);
					return;
				}

				// Si lo cerre manual o por ESC, elimino la entrada del History API. Como ya se eliminó el dialogo de la lista, `this.close()` no se ejecutará [REF.1]
				if (type != "popstate" && !this.disableHistoryAPI) {
					toDelete = this;
					window.history.back();
				} else {
					this.destroy();
				}
				await sleep(250);
				resolve(e as Event);
			};
			// espero que haga el mapping en el container
			await this.mappingContainer;

			let index = ctDialogs.findIndex(d => d.dialog == this);
			let isLast = index == ctDialogs.length - 1;
			if (!isLast) {
				// Cierro todos los dialogos que estan por encima de este
				for (let i = ctDialogs.length - 1; i > index; i--) {
					await ctDialogs[i].dialog.close();
				}
			}

			if (!document.body.animate) {
				await finish();
				return;
			}
			let anim = this.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: 250,
				fill: "both"
			});
			this.element!?.animate(this.getAnimOut(this.type), {
				duration: 270,
				fill: "both"
			});
			anim.onfinish = () => finish();
		});
	}

	getAnimOut(type: typeDialog) {
		switch (type) {
			case "alert":
				return [
					{ transform: "scale(1)", opacity: 1 },
					{ transform: "scale(1.2)", opacity: 0 }
				];
			case "cupertino":
				return [
					{ transform: "scale(1)", opacity: 1 },
					{ transform: "scale(0.1)", opacity: 0 }
				];
			case "slide-left":
				return [
					{ transform: "translateX(0)", opacity: 1 },
					{ transform: "translateX(-100%)", opacity: 0 }
				];
			case "slide-right":
				return [
					{ transform: "translateX(0)", opacity: 1 },
					{ transform: "translateX(100%)", opacity: 0 }
				];
			case "bottom-sheet":
				return [
					{ transform: "translateY(0)", opacity: 1 },
					{ transform: "translateY(100%)", opacity: 0 }
				];
		}
	}

	destroy() {
		ctDialogs.splice(
			ctDialogs.findIndex(d => d.dialog == this),
			1
		);
		// Elimino el dialogo
		document.body.removeChild(this);
		this.dispatchEvent(new CustomEvent("close"));
		this.dispatchEvent(new CustomEvent("on-close"));
	}

	/**
	 * @deprecated Use close() instead. The method will be removed in the next major version.
	 */
	closeDialog(e?: Event | null) {
		return this.close(e, "click");
	}

	static get properties() {
		return {
			/**
			 *
			 */
			dialogID: { type: String, reflect: true },
			/**
			 * Entrada para el History API de tipe {title,href}
			 */
			history: {
				type: Object
			},
			element: { type: Object },
			free: { type: Object }
		};
	}
}
declare global {
	interface HTMLElementTagNameMap {
		"ct-dialog": CtDialog;
	}
}
