import { CtLit, css, customElement, html, property } from '@conectate/ct-lit';
/**
 * # `ct-menu`
 * @element ct-menu
 * @slot - Items in menu
 * @slot dropdown-trigger - Item trigger
 */
@customElement('ct-menu')
export class CtMenu extends CtLit {
	close!: (e: KeyboardEvent) => void;
	@property({ type: String }) align: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left' | null = 'top-right';
	@property({ type: Array }) addedNodes: (Node & { style?: { [x: string]: string } })[] = [];
	@property({ type: String }) icon!: string;
	opened = false;

	$!: {
		items: HTMLSlotElement;
		menu: HTMLDivElement;
	};

	static styles = css`
		:host {
			display: inline-block;
			position: relative;
			cursor: pointer;
			color: inherit;
		}

		.dd-menu {
			position: absolute;
			-webkit-transition: all 0.2s ease;
			transition: all 0.2s ease;
			z-index: 99;
			background: var(--color-surface, #fff);
			border-radius: 8px;
			box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
			opacity: 0;
			transform: scale(0);
			outline: none;
			padding: 8px 0;
		}

		.dd-menu.active {
			opacity: 1;
			-webkit-transform-origin: right top 0px;
			-webkit-transform: scale(1);
			transform-origin: right top 0px;
			transform: scale(1);
		}

		.dd-menu ::slotted(button) {
			min-width: 220px;
			color: var(--color-on-surface, #474747);
			margin: 0;
			padding: 8px 16px;
			min-height: 38px;
			width: 100%;
			background: none;
			outline: none;
			border: none;
			font-size: 1em;
			text-align: left;
			font-weight: 500;
			/* border-bottom: 0.5px solid var(--color-on-surface-dividers,#dadce0); */
		}
		.dd-menu ::slotted(button:last-of-type) {
			border: none;
		}

		.dd-menu ::slotted(*) {
			min-width: 220px;
			display: block;
			opacity: 0;
			transition: all 0.25s ease;
			transform: translateY(-30%);
			cursor: pointer;
			display: flex;
			align-items: center;
		}

		.dd-menu ::slotted(span:empty),
		.dd-menu ::slotted(hr) {
			height: 1px;
			background: var(--color-on-surface-dividers, #dadce0);
			margin: 4px 2px;
			border: 0.5px solid var(--color-on-surface-dividers, #dadce0);
		}
		.dd-menu ::slotted(h1) {
			padding: 8px 16px;
			font-size: 0.8em;
			color: var(--color-primary);
			font-weight: bold;
			text-transform: uppercase;
			letter-spacing: 0.15em;
			font-family: 'Google Sans', 'Ubuntu', arial, sans-serif;
			margin: 0;
		}

		.dd-menu ::slotted(button:hover) {
			background: var(--color-primary-light);
			color: var(--color-primary);
			transition: all 0.15s ease;
		}

		.dd-menu ::slotted(button:active) {
			background: #d2d2d2;
			transition: all 0.15s ease;
		}

		.dd-menu.active ::slotted(*) {
			opacity: 1;
			transform: translateY(0px);
		}

		@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
			.dd-menu {
				background: var(--color-blur-surface, rgba(255, 255, 255, 0.5));
				backdrop-filter: blur(10px);
				-webkit-backdrop-filter: blur(10px);
			}
		}
	`;
	render() {
		return html`
			<slot name="dropdown-trigger" @click="${this.toggle}"></slot>
			<div id="menu" class="dd-menu" @blur=${this._onFocusOut} tabindex="0">
				<slot id="items"></slot>
			</div>
		`;
	}

	_onFocusOut() {
		if (this.opened && !localStorage.ctmc) {
			this.opened = false;
			setTimeout(() => this.$.menu.classList.remove('active'), 250);
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		document.body.removeEventListener('keydown', this.close);
	}

	constructor() {
		super();
		this.close = (e: KeyboardEvent) => {
			if (e.key == 'Escape') {
				this.$.menu.classList.remove('active');
			}
		};
		document.body.addEventListener('keydown', this.close);
	}

	firstUpdated() {
		this.mapIDs();
		switch (this.align) {
			case 'top': {
				this.$.menu.style.top = '0';
				this.$.menu.style.right = '4px';
				this.$.menu.style.transformOrigin = 'center top 0px';
				break;
			}
			case 'top-right': {
				this.$.menu.style.top = '0';
				this.$.menu.style.right = '4px';
				this.$.menu.style.transformOrigin = 'right top 0px';
				break;
			}
			case 'top-left': {
				this.$.menu.style.top = '0';
				this.$.menu.style.right = '';
				this.$.menu.style.transformOrigin = 'left top 0px';
				break;
			}
			case 'bottom': {
				this.$.menu.style.bottom = '0';
				this.$.menu.style.right = '4px';
				this.$.menu.style.transformOrigin = 'center bottom 0px';
				break;
			}
			case 'bottom-right': {
				this.$.menu.style.bottom = '0';
				this.$.menu.style.right = '4px';
				this.$.menu.style.transformOrigin = 'right bottom 0px';
				break;
			}
			case 'bottom-left': {
				this.$.menu.style.bottom = '0';
				this.$.menu.style.right = '';
				this.$.menu.style.transformOrigin = 'left bottom 0px';
				break;
			}
			default: {
				this.$.menu.style.top = '8px';
				this.$.menu.style.right = '4px';
				this.$.menu.style.transformOrigin = 'right top 0px';
				break;
			}
		}
		this.addedNodes = this.$.items.assignedNodes().filter(function (node) {
			return node.nodeType === Node.ELEMENT_NODE;
		});
	}

	toggle(e: CustomEvent) {
		this.$.menu.focus();
		this.addedNodes.forEach((item, index) => {
			var delay = index * 40 + 'ms';
			let o = {
				'-webkit-transition-delay': delay,
				'-moz-transition-delay': delay,
				'-o-transition-delay': delay,
				'transition-delay': delay
			};
			for (let key in o) {
				item.style![key] = o[key as 'transition-delay'];
				setTimeout(() => (item.style![key] = ''), index * 40 + 1000);
			}
		});
		this.$.menu.classList.add('active');
		this.opened = true;
		e.stopPropagation();
	}
}
