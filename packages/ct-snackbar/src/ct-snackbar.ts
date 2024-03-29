import { sleep } from "@conectate/ct-helpers";
import { CtLit, customElement, property } from "@conectate/ct-lit";
import { css, html } from "lit";

export function showSnackBar(msg: string) {
	// @ts-ignore
	let _networkSnackbar: CtSnackbar | undefined = document.querySelector("ct-snackbar") as CtSnackbar;
	if (!_networkSnackbar) {
		_networkSnackbar = new CtSnackbar();
		// @ts-ignore
		document.body.appendChild(_networkSnackbar);
	}
	setTimeout(() => {
		_networkSnackbar?.open(msg);
	}, 250);
}
// @ts-ignore
window.showSnackBar = showSnackBar;

/**
 * @element ct-snackbar
 */
@customElement("ct-snackbar")
export class CtSnackbar extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				position: fixed;
				left: calc(50% - 160px);
				right: calc(50% - 160px);
				width: 320px;
				bottom: 0;
				background: var(--color-on-background, #3c3f41);
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
				color: var(--color-background, #e9e9e9);
				padding: 12px;
				visibility: hidden;
				border-radius: 16px 16px 0 0;
				text-align: center;
				will-change: transform;
				-webkit-transform: translate3d(0, 100%, 0);
				transform: translate3d(0, 100%, 0);
				transition-property: visibility, transform, opacity;
				transition-duration: 0.2s;
				font-weight: bold;
				cursor: pointer;
				z-index: 150;
			}

			:host(.opened) {
				visibility: visible;
				-webkit-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}

			@media (max-width: 1001px) {
				:host {
					left: 0;
					right: 0;
					width: auto;
				}

				:host(.opened) {
					-webkit-transform: translate3d(0, -113%, 0);
					transform: translate3d(0, -40px, 0);
				}
			}
			@media print {
				:host {
					display: none;
				}
			}
		`
	];
	[x: string]: any;
	render() {
		return html` <span id="msg" @click="${this.closePersist}">${this.msg}</span> `;
	}

	arr: string[] = [];
	alwaysVisible = false;
	alwaysMsg = "";
	@property({ type: String }) msg = "";

	async open(msg?: string) {
		// Si esta Abierto
		if (!msg) {
			return;
		}
		if (this.classList.length != 1) {
			this.msg = msg;
		} else {
			// Si no entonces lo agrego a la cola
			this.arr.push(msg);
			//y cierro el snack
			this.close();
			return null;
		}
		this.classList.add("opened");
		await sleep(4000);
		if (this.alwaysMsg != this.msg) {
			this.close();
		}
	}

	async close() {
		this.classList.remove("opened");
		if (this.arr.length != 0) {
			await sleep(200);
			this.open(this.arr.shift());
		} else if (this.alwaysVisible) {
			await sleep(200);
			this.msg = this.alwaysMsg;
			this.classList.add("opened");
		}
	}

	closePersist() {
		this.alwaysVisible = false;
		this.close();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"ct-snackbar": CtSnackbar;
	}
}
