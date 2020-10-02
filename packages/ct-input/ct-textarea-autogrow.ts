import { CtLit, html, customElement, property, unsafeHTML, css } from '@conectate/ct-lit';
import { CSSResult } from 'lit-element';

@customElement('ct-textarea-autogrow')
export class CtTextareaAutogrow extends CtLit {
	static styles: CSSResult[] = [
		css`
			:host {
				display: inline-block;
				position: relative;
				width: 400px;
				border: 1px solid;
				padding: 2px;
				overflow: hidden;
			}

			.mirror-text {
				visibility: hidden;
				word-wrap: break-word;
			}

			.fit {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			}

			textarea {
				position: relative;
				outline: none;
				border: none;
				resize: none;
				background: inherit;
				color: inherit;
				/* see comments in template */
				width: 100%;
				height: 100%;
				font-size: inherit;
				font-family: inherit;
				line-height: inherit;
				text-align: inherit;
				padding: 0;
			}

			::-webkit-input-placeholder {
				color: inherit;
				opacity: 0.5;
			}
		`
	];
	render() {
		return html`
			<!-- the mirror sizes the input/textarea so it grows with typing -->
			<!-- use &#160; instead &nbsp; of to allow this element to be used in XHTML -->
			<div id="mirror" class="mirror-text" aria-hidden="true">${unsafeHTML(this._valueForMirror(this._value))}</div>

			<!-- size the input/textarea with a div, because the textarea has intrinsic size in ff -->
			<div class="textarea-container fit">
				<textarea
					id="textarea"
					.value=${this._value}
					@input=${this._onInput}
					.name="${this.name}"
					aria-label="${this.label}"
					?autofocus="${this.autofocus}"
					.placeholder="${this.placeholder}"
					?readonly="${this.readonly}"
					?required="${this.required}"
					?disabled="${this.disabled}"
					rows="${this.rows}"
					minlength="${this.minlength}"
					maxlength="${this.maxlength}"
				></textarea>
			</div>
		`;
	}

	focus() {
		this.$.textarea.focus();
	}

	_onInput() {
		this.value = this.$.textarea?.value;
	}

	get value() {
		return this._value;
	}

	set value(value) {
		if (value == undefined) value = ``;
		value = `${value}`;
		if (this._value !== value) {
			let oldValue = this._value;
			this._value = value;
			this.dispatchEvent(new CustomEvent('value', { detail: { value: value } }));
			this.requestUpdate('value', oldValue);
		}
	}

	@property({ type: String }) name = '';

	/**
	 * Use this property instead of `bind-value` for two-way data binding.
	 */
	@property({ type: String }) _value = '';

	/**
	 * The initial number of rows.
	 *
	 * @attribute rows
	 * @type number
	 * @default 1
	 */
	@property({ type: Number }) rows: number = 1;

	/**
	 * The maximum number of rows this element can grow to until it
	 * scrolls. 0 means no maximum.
	 *
	 * @attribute maxRows
	 * @type number
	 * @default 0
	 */
	@property({ type: Number }) maxRows = 0;

	/**
	 * Bound to the textarea's `autocomplete` attribute.
	 */
	@property({ type: String }) autocomplete = 'off';

	/**
	 * Bound to the textarea's `autofocus` attribute.
	 */
	@property({ type: Boolean }) autofocus = false;

	/**
	 * Bound to the textarea's `inputmode` attribute.
	 */
	@property({ type: String }) inputmode = '';

	/**
	 * Bound to the textarea's `placeholder` attribute.
	 */
	@property({ type: String }) placeholder = '';

	/**
	 * Bound to the textarea's `readonly` attribute.
	 */
	@property({ type: Boolean }) readonly = false;

	/**
	 * Bound to the textarea's `readonly` attribute.
	 */
	@property({ type: Boolean }) disabled = false;

	/**
	 * Set to true to mark the textarea as required.
	 */
	@property({ type: Boolean }) required = false;

	/**
	 * The minimum length of the input value.
	 */
	@property({ type: Number }) minlength!: number;

	/**
	 * The maximum length of the input value.
	 */
	@property({ type: Number }) maxlength!: number;

	/**
	 * Bound to the textarea's `aria-label` attribute.
	 */
	@property({ type: String }) label = '';

	tokens: string[] = [];

	/**
	 * Returns the underlying textarea.
	 */
	get textarea(): HTMLTextAreaElement {
		return this.$.textarea;
	}

	/**
	 * Returns textarea's selection start.
	 */
	get selectionStart(): number {
		return this.$.textarea.selectionStart;
	}

	/**
	 * Returns textarea's selection end.
	 * @return {number}
	 */
	get selectionEnd() {
		return this.$.textarea.selectionEnd;
	}

	/**
	 * Sets the textarea's selection start.
	 */
	set selectionStart(value) {
		this.$.textarea.selectionStart = value;
	}

	/**
	 * Sets the textarea's selection end.
	 */
	set selectionEnd(value) {
		this.$.textarea.selectionEnd = value;
	}

	firstUpdated() {
		this.mapIDs();
	}

	_constrain(tokens: string[]) {
		var _tokens = tokens || [''];
		// Enforce the min and max heights for a multiline input to avoid
		// measurement
		if (this.maxRows > 0 && tokens.length > this.maxRows) {
			_tokens = tokens.slice(0, this.maxRows);
		} else {
			_tokens = tokens.slice(0);
		}
		while (this.rows > 0 && _tokens.length < this.rows) {
			_tokens.push('');
		}
		// Use &#160; instead &nbsp; of to allow this element to be used in XHTML.
		return _tokens.join('<br/>') + '&#160;';
	}

	_valueForMirror(val?: string) {
		let value = val ? val : this.value;
		this.tokens = value ? value.replace(/&/gm, '&amp;').replace(/"/gm, '&quot;').replace(/'/gm, '&#39;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;').split('\n') : [''];
		return this._constrain(this.tokens);
	}
}
