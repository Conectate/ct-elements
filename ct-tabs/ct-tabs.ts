import { CtLit, css, html } from '@conectate/ct-lit';
import { CtTab } from './ct-tab';
/**
 *
 * @cssProp --ct-tabs-background - can be used to document css custom properties.
 * @cssProp --ct-tabs-box-shadow - can be used to document css custom properties.
 * @cssProp --ct-tabs-border-color - can be used to document css custom properties.
 */
class CtTabs extends CtLit {
	static get styles() {
		return css`
			* {
				padding: 0;
				margin: 0;
				box-sizing: border-box;
			}
			:host {
				display: block;
				z-index: 10;
			}

			.tabs-container {
				background: var(--ct-tabs-background);
				box-shadow: var(--ct-tabs-box-shadow);
				padding: 0 8px;
				position: relative;
			}

			#container {
				width: 100%;
				overflow-x: auto;
				overflow-y: hidden;
			}
			#container::-webkit-scrollbar {
				width: 0.5em;
				height: 0.5em;
			}

			#container::-webkit-scrollbar-thumb {
				background-color: #cbd5e0;
				border-radius: 1rem;
			}

			#container::-webkit-scrollbar-track {
				background-color: #e2e8f0;
				border-radius: 1rem;
			}

			.tabs {
				font-family: 'Google Sans', 'Google Sans', 'Ubuntu', arial, sans-serif;
				display: flex;
				max-width: 900px;
				margin: 0 auto;
				font-weight: normal;
				z-index: 2;
				font-size: 0.94em;
				text-align: center;
				border-bottom: 1px solid rgba(129, 129, 129, 0.27);
				padding: 0;
			}

			.grad {
				position: absolute;
				top: 0;
				bottom: 0;
				right: 0;
				width: 35px;
				background: linear-gradient(-90deg, #94949465, transparent);
			}
		`;
	}
	render() {
		return html`
			<div class="tabs-container">
				<nav class="tabs" id="container">
					<slot id="content"></slot>
				</nav>
			</div>
		`;
	}

	_selected!: string;
	tabs: CtTab[] = [];
	handletabs = false;
	overflow = false;

	set selected(val) {
		if (val != this._selected) {
			let old = this._selected;
			this._selected = val;
			this.setTab(val);
			this.dispatchEvent(new CustomEvent('selected', { detail: { value: val } }));
			this.requestUpdate('selected', old);
		}
	}

	get selected() {
		return this._selected;
	}

	static get properties() {
		return {
			selected: { type: String },
			handletabs: { type: Boolean },
			overflow: { type: Boolean },
			tabs: { type: Array }
		};
	}

	firstUpdated() {
		this.mapIDs();
		this.setTab(this.selected);
		this.tabs = this.$.content.assignedNodes().filter((elem: { nodeType: number }) => elem.nodeType == Node.ELEMENT_NODE);
		if (this.handletabs) {
			this.tabs.forEach((item, index) => {
				item.addEventListener('click', () => {
					this.selected = `${index}`;
				});
			});
			this.selected = this.selected ?? '0';
		}
		setTimeout(() => (this.overflow = this.isOverflown()), 500);
	}

	setTab(selected: string) {
		this.tabs = this.$.content?.assignedNodes().filter((elem: { nodeType: number }) => elem.nodeType == Node.ELEMENT_NODE);

		if (this.selected != undefined) {
			this.tabs?.forEach((tab, index) => {
				if (`${index}` == selected) {
					tab.selected = true;
				} else {
					tab.selected = false;
				}
			});
		}
	}

	isOverflown() {
		return this.$.container.scrollHeight > this.$.container.clientHeight || this.$.container.scrollWidth > this.$.container.clientWidth;
	}
}

window.customElements.define('ct-tabs', CtTabs);
