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
import { CtLit, html, property, css } from "@conectate/ct-lit";
import { sleep, PushID, getClient } from "@conectate/ct-helpers";

let ctDialogs: string[] = [];
// @ts-ignore
window.ctDialogs != null || (window.ctDialogs = []);
// @ts-ignore
ctDialogs = window.ctDialogs;
let pushID = new PushID();

export function showCtDialog(
	el: HTMLElement,
	id?: string,
	history?: ConectateHistory
): CtDialog {
	let ctDialog: CtDialog;
	let dialogID = id ? id : pushID.next(10);
	// Inserto el ID del dialogo que voy a mostrar
	if (ctDialogs.indexOf(dialogID) == -1) ctDialogs.push(dialogID);
	ctDialog = new CtDialog();
	ctDialog.dialogID = dialogID;
	history && (ctDialog.history = history);
	document.body.appendChild(ctDialog);
	ctDialog.element = el;
	// ctDialog.element2 = el;
	return ctDialog;
}

export function closeCtDialog(id?: string) {
	return new Promise(async (resolve) => {
		let m = document.querySelectorAll("ct-dialog") as NodeListOf<CtDialog>;
		for (let mod = 0; mod < m.length; mod++) {
			let modal = m[mod];
			if (modal == null) return;
			if (id == modal.dialogID || id == null) {
				await modal.closeDialog();
			}
		}
		resolve();
	});
}

// @ts-ignore
window.showCtDialog = showCtDialog;
// @ts-ignore
window.closeCtDialog = closeCtDialog;

type animationSupported =
	| "normal"
	| "cupertino"
	| "slide-right"
	| "slide-left"
	| "bottom-sheet";
export enum DialogSizePreferences {
	/** Para pantalla completa */
	fullsreen = 0,
	/** Para que se muestre al 80% de la ventada y 21cm de ancho */
	fullsize = 1
}
export class CtDialog extends CtLit {
	@property({ type: String, reflect: true }) role: string = "alert";
	@property({ type: String, reflect: true, attribute: "aria-modal" })
	ariaModal: string = "true";

	// Vars
	disableHistoryAPI: boolean = false;
	dialogID = new Date().getTime() + "";
	_closeDialog: any;
	_clseDialogESC: any;
	mappingContainer?: Promise<any>;
	history!: ConectateHistory;
	// @property({ type: Object }) element?: HTMLElement | TemplateResult;
	@property({ type: Object }) _element?: HTMLElement;
	@property({ type: String }) animation: animationSupported = "normal";
	@property({ type: Array }) preferences: any[] = [];

	resolveMapping!: (value?: {} | PromiseLike<{}>) => void;
	finish!: () => void;

	@property({ type: Object })
	get element() {
		return this._element;
	}

	set element(val) {
		let old = this._element;
		this._element = val;
		this.requestUpdate("element", old);
		/**
		 * [FIX]
		 * [Windows Vista] Chrome v75 height 0px;
		 * [MacOs] Overflow fix
		 */
		this.updateComplete.then(async () => {
			await sleep(300);
			let bodyY = document.body.getBoundingClientRect().height;
			let elementY = this._element!.offsetHeight;
			if ((elementY / bodyY) * 100 < 5) {
				console.warn("El elemento no es visible");
				if (this._element)
					this._element.style.height = `${Math.floor(bodyY * 0.8)}px`;
			} else if ((elementY / bodyY) * 100 >= 78) {
				// console.warn("El elemento esta desbordado");
				if (this.preferences.indexOf(DialogSizePreferences.fullsreen) == -1) {
					if (this._element)
						this._element.style.height = `${Math.floor(bodyY * 0.8)}px`;
				}
			}
		});

		if (getClient().os == "ios") {
			this.updateComplete.then(async () => {
				if (this._element) this._element.style.borderRadius = "0px";
			});
		}
	}

	static styles = css`
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

		:host {
			display: -webkit-box;
			display: -moz-box;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			position: fixed;
			z-index: 110;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			overflow-y: auto;
			overflow-x: hidden;
			-webkit-animation: in-modalFadeEffect 0.5s;
			animation: in-modalFadeEffect 0.2s;
			-webkit-align-items: center;
			align-items: center;
			-webkit-justify-content: center;
			justify-content: center;
			font-family: "Roboto", sans-serif !important;
			-webkit-box-align: center;
			box-align: center;
			-webkit-box-orient: vertical;
			box-orient: vertical;
			-webkit-flex-direction: column;
			flex-direction: column;
			box-sizing: border-box;
			--mdc-theme-secondary: var(--primary-color);
			--mdc-theme-primary: var(--primary-color);
			--mdc-checkbox-unchecked-color: var(--on-background);
		}

		.overlay {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
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
			max-height: 80%;
			max-width: 25cm;
			width: 100%;
			/* height: max-content; */
			overflow: auto;
			margin: 0;
			box-sizing: border-box;
			z-index: 200;
		}
	`;

	render() {
		return html`
			${this.getStylesPref(this.preferences)}
			<div
				class="overlay"
				@click="${(e: MouseEvent) => {
					this.closeDialog(e, "click");
					e.stopPropagation();
				}}"
			></div>

			${this.element}
		`;
	}

	getStylesPref(pref: DialogSizePreferences[]) {
		return pref.map((i) => {
			switch (i) {
				case DialogSizePreferences.fullsreen:
					return html`
						<style>
							.c {
								max-height: 100% !important;
								max-width: 100% !important;
							}
							.c > * {
								max-width: 100% !important;
							}
						</style>
					`;
				case DialogSizePreferences.fullsize:
					return html`
						<style>
							.c {
								height: 100% !important;
							}
							.c > * {
								height: 100% !important;
							}
						</style>
					`;
			}
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("popstate", this._closeDialog, false);
		document.removeEventListener("keyup", this._clseDialogESC, false);
	}

	computeAnimation(anim: animationSupported) {
		switch (anim) {
			case "normal":
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
		this.init();
	}
	async init() {
		this._closeDialog = async (e: CustomEvent) => {
			let lastID =
				ctDialogs.length > 0 ? ctDialogs[ctDialogs.length - 1] : undefined;
			if (lastID == this.dialogID) {
				this.closeDialog(e, "popstate");
			} else if (lastID == undefined) {
				// [REF.1]
				// @ts-ignore Elimino el null de control de la Lista
				ctDialogs.splice(ctDialogs.indexOf(undefined), 1);
				//ctDialogs.splice(ctDialogs.length - 1, 1);
			}
		};

		this._clseDialogESC = (e: KeyboardEvent) => {
			if (e.keyCode === 27) this.closeDialog(e, "keyup"); // esc
		};
		window.addEventListener("popstate", this._closeDialog, false);
		document.addEventListener("keyup", this._clseDialogESC, false);

		this.mappingContainer = new Promise((resolve) => {
			this.resolveMapping = resolve;
		});
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

	setAnimation(anim: animationSupported) {
		this.animation = anim;
		return this;
	}

	firstUpdated() {
		this.mapIDs();
		// Checkeo que no sea Chrome de iOS porque esa mierda no sirve aquí 😡
		if (navigator.userAgent.match(/CriOS\/([0-9\.]+)/))
			this.disableHistoryAPI = true;

		if (this.history == null)
			this.history = { title: document.title, href: window.location.href };
		// Crea una entrada en el History API identica que solo va a servir para usar 'Atras' en Moviles y cerrar el dialogo
		if (!this.disableHistoryAPI)
			window.history.pushState(
				{ dialogID: this.dialogID },
				this.history.title,
				this.history.href
			);
		this.resolveMapping();
		if (this.element!?.classList) {
			this.element!.classList.add("c");
			this.element!.classList.add(this.computeAnimation(this.animation));
		}
	}

	closeDialog(e?: Event | null, type?: string) {
		// Este dialog lo elimino de las lista de dialogos
		return new Promise(async (resolve) => {
			let finish = async () => {
				if (!document.body.contains(this)) {
					console.warn(
						`dialogID ya no se encuentra en el DOM ${this.dialogID}`,
						this
					);
					return;
				}
				document.body.removeChild(this);
				ctDialogs.splice(ctDialogs.indexOf(this.dialogID), 1);
				// Si lo mande a llamar manualmente y hay mas dialogos abiertos
				// entonces que inserte un null para que no cierre los demas dialogos en el popstate. [REF.1]
				if ((type == null || type == "click") && ctDialogs.length > 0) {
					// Se inserta la candidad de dialogos que hay ahorita ya que cada uno tiene un listener en el popstate
					if (ctDialogs.length > 1000) {
						while (ctDialogs.length > 0) {
							ctDialogs.pop();
						}
					}
					ctDialogs.push(...Array(ctDialogs.length));
				}
				// Deshabilitado en Chrome iOS
				if (type != "popstate" && !this.disableHistoryAPI) {
					window.history.back();
				}
				await sleep(70);
				resolve(e as Event);
				this.dispatchEvent(
					new CustomEvent("on-close", { detail: { event: e } })
				);
			};
			// espero que haga el mapping en el container
			await this.mappingContainer;
			if (!document.body.animate) {
				await finish();
				return;
			}
			let anim = this.animate([{ opacity: 1 }, { opacity: 0 }], {
				duration: 250,
				fill: "both"
			});
			this.element!?.animate(
				[
					{ transform: "scale(1)", opacity: 1 },
					{ transform: "scale(1.2)", opacity: 0 }
				],
				{
					duration: 270,
					fill: "both"
				}
			);
			anim.onfinish = finish;
		});
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

window.customElements.define("ct-dialog", CtDialog);

// TS

export interface ConectateHistory {
	title: string;
	href: string;
}
