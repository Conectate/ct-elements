import "@conectate/ct-icon";

import { CtLit, css, customElement, html, property, query, state } from "@conectate/ct-lit";
import { stripIndent } from "common-tags";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import * as Prism from "prismjs";

// import Dark from "prismjs/themes/prism-okaidia.css";

@customElement("code-example")
export class CodeExample extends CtLit {
	@query("#markup") private markup?: HTMLDivElement;
	@query(".demo-example") private demo?: HTMLDivElement;

	@property() codeTheme: "dark" | "light" = "light";
	@state() _code = "";
	@property() codestyle = "";

	static styles = [
		/* toCssTemplateString(Light),
		css`
			.token.attr-name,
			.token.builtin,
			.token.char,
			.token.inserted,
			.token.selector,
			.token.string {
				color: #567f01;
			}

			.token.punctuation {
				color: #737373;
			}

			.language-css .token.function {
				color: inherit;
			}
		`, */
		// unsafeCSS(Dark),
		css`
			.token.attr-name {
				color: #a6e22e;
			}
			.token.selector,
			.token.string,
			.token.attr-value,
			.token.char,
			.token.builtin,
			.token.inserted {
				color: #e6db74;
			}
			.token.atrule,
			.token.function,
			.token.class-name {
				color: #a6e22e;
			}
			.token.keyword {
				color: #f92672;
			}
			.token.operator,
			.token.entity,
			.token.url,
			.language-css .token.string,
			.style .token.string,
			.token.variable {
				color: #f92672;
			}
		`,
		css`
			:host {
				display: flex;
				margin: 1rem 0 2rem 0;
				flex-direction: column;
				border-radius: var(--border-radius, 16px);
				border: 1px solid var(--spectrum-global-color-gray-100);
				width: 100%;
				position: relative;
			}

			.demo-example {
				max-width: 100%;
				overflow: auto;
				flex: 1;
				padding: 16px;
				border-radius: 6px 6px 0 0;
				background: var(--spectrum-global-color-gray-100, #323232);
			}

			.demo-example .flex {
				display: flex;
			}

			@media (max-width: 768px) {
				.demo-example {
					padding: var(--spectrum-global-dimension-size-200) var(--spectrum-global-dimension-size-200);
				}
			}

			#markup {
				display: grid;
				grid-template-columns: 100%;
				grid-template-rows: 100%;
				padding: 0.75rem 1.5rem;
				border-radius: 0 0 6px 6px;
				background: var(--spectrum-global-color-gray-75, #2f2f2f);
				line-height: 1.3em;
				position: relative;
				overflow: auto;
			}

			pre {
				grid-area: 1/1/1/1;
			}

			.copy-holder {
				grid-area: 1/1/1/1;
				width: 100%;
				height: 100%;
				pointer-events: none;
				display: grid;
				position: sticky;
				left: 0;
				top: 0;
				grid-template-columns: 100%;
				grid-template-rows: 100%;
			}

			.copy {
				place-self: end;
				pointer-events: all;
				cursor: pointer;
				margin: 0 -1em -0.25em 0;
				display: flex;
				align-items: center;
			}
		`
	];
	public set rawcode(code: string) {
		this._code = code;
	}

	public get rawcode(): string {
		return stripIndent`${this._code || this.textContent}` || "";
	}

	public get language(): "markup" | "javascript" {
		if (this.classList.contains("language-javascript")) {
			return "javascript";
		}
		return "markup";
	}

	public get showDemo() {
		return this.classList.contains("language-html") || this.classList.contains("language-html-live");
	}

	private get highlightedCode() {
		const highlightedHtml = Prism.highlight(this.rawcode, Prism.languages[this.language], this.language);

		const code = unsafeHTML(highlightedHtml);

		return html` <pre><code>${code}</code></pre> `;
	}

	protected render() {
		const { highlightedCode } = this;
		return html`
			${this.showDemo
				? html`
						<div class="demo-example">
							<slot name="demo"></slot>
						</div>
				  `
				: undefined}
			<bdo id="markup" dir="ltr" class=${this.codeTheme}>
				${highlightedCode}
				<div class="copy-holder">
					<div class="copy" @click=${this.copyToClipboard}>
						<ct-icon icon="file_copy"></ct-icon>
						Copy to Clipboard
					</div>
				</div>
			</bdo>
		`;
	}

	private copyToClipboard(): void {
		console.log("copy");
	}

	private shouldManageTabOrderForScrolling = (): void => {
		[this.markup, this.demo].map(el => {
			if (!el) return;
			const { offsetWidth, scrollWidth } = el;
			if (offsetWidth < scrollWidth) {
				el.tabIndex = 0;
			} else {
				el.removeAttribute("tabindex");
			}
		});
	};

	protected updated(): void {
		requestAnimationFrame(() => {
			this.shouldManageTabOrderForScrolling();
		});
	}

	public connectedCallback(): void {
		super.connectedCallback();
		window.addEventListener("resize", this.shouldManageTabOrderForScrolling);
		// console.log(Dark);
	}

	public disconnectedCallback(): void {
		window.removeEventListener("resize", this.shouldManageTabOrderForScrolling);
		super.disconnectedCallback();
	}
}
