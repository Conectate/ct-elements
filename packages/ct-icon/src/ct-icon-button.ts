import '@material/mwc-ripple';

import './ct-icon';

import { Ripple } from '@material/mwc-ripple';
import { LitElement, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { eventOptions } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { icon } from './icon-list';

/**
## `ct-icon-button`

## Example

```html
<ct-icon-button icon="headphones"></ct-icon-button>
```

 *  @element ct-icon-button
 */
@customElement('ct-icon-button')
export class CtIconButton extends LitElement {
	static styles = css`
		:host {
			display: inline-block;
			border-radius: 50%;
			outline: none;
			--mdc-ripple-color: currentcolor;
			-webkit-tap-highlight-color: transparent;
		}

		:host([disabled]) {
			pointer-events: none;
		}
		button {
			line-height: 0px;
			vertical-align: top;
			display: inline-block;
			position: relative;
			box-sizing: border-box;
			border: none;
			outline: none;
			background-color: transparent;
			fill: currentcolor;
			color: inherit;
			text-decoration: none;
			cursor: pointer;
			user-select: none;
			padding: calc((var(--ct-icon-size, 24px) * 2 - var(--ct-icon-size, 24px)) / 2);
		}
	`;
	@property({ type: Boolean, reflect: true }) disabled = false;

	@property({ type: String }) icon?: icon;
	@property({ type: String }) svg?: string;

	@property({ type: String, attribute: 'aria-label' })
	ariaLabel: string = '';

	@query('mwc-ripple') ripple!: Ripple;
	@state() protected shouldRenderRipple = false;

	render() {
		return html`<button
			aria-label="${ifDefined(this.ariaLabel || this.icon)}"
			?disabled="${this.disabled}"
			@focus="${this.handleRippleFocus}"
			@blur="${this.handleRippleBlur}"
			@mousedown="${this.handleRippleMouseDown}"
			@mouseenter="${this.handleRippleMouseEnter}"
			@mouseleave="${this.handleRippleMouseLeave}"
			@touchstart="${this.handleRippleTouchStart}"
			@touchend="${this.handleRippleDeactivate}"
			@touchcancel="${this.handleRippleDeactivate}"
		>
			<mwc-ripple unbounded></mwc-ripple>
			<ct-icon .icon=${this.icon} .svg=${this.svg}></ct-icon>
			<span><slot></slot></span>
		</button>`;
	}

	@eventOptions({ passive: true })
	protected handleRippleMouseDown(event?: Event) {
		const onUp = () => {
			window.removeEventListener('mouseup', onUp);

			this.handleRippleDeactivate();
		};

		window.addEventListener('mouseup', onUp);
		this.ripple.startPress(event);
	}

	@eventOptions({ passive: true })
	protected handleRippleTouchStart(event?: Event) {
		this.ripple.startPress(event);
	}

	protected handleRippleDeactivate() {
		this.ripple.endPress();
	}

	protected handleRippleMouseEnter() {
		this.ripple.startHover();
	}

	protected handleRippleMouseLeave() {
		this.ripple.endHover();
	}

	protected handleRippleFocus() {
		this.ripple.startFocus();
	}

	protected handleRippleBlur() {
		this.ripple.endFocus();
	}
}
