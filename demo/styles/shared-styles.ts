import { css } from 'lit';

export let defaultTheme = css`
	:root {
		--color-primary: #2cb5e8;
		--color-primary-medium: #2cb5e8b0;
		--color-primary-light: #2cb5e82b;
		--color-primary-hover: #19ace1;
		--color-primary-active: #169aca;
		--color-on-primary: #fff;

		--color-secondary: #0fb8ad;
		/* Color de objeto en cima de color de acento */
		--color-on-secondary: #fff;

		/* Fondos */
		--color-background: #f9f9f9;
		/* Fondos Textos que aparecen en los fondos */
		--color-on-background: #535353; /* Gris */

		/* Fondos que estan en cima de los fondos (ct-cards) */
		--color-surface: #ffffff;
		/* Fondos Textos que aparecen en los ct-cards */
		--color-on-surface: #535353; /* Gris */

		/* Color de objeto en cima de error */
		--color-error: #b10808;
		--color-on-error: #fff;

		--high-emphasis: #000000de;
		--medium-emphasis: #00000099;
		--color-disable: #00000047;

		/* Blur */
		--color-blur: rgba(255, 255, 255, 0.7);
		--color-blur-surface: rgba(255, 255, 255, 0.6);
		--color-on-surface-opaque: #8e8e8e; /* Texto sencundarios */
		--color-on-surface-dividers: #7c7c7c30; /* divisores */
		--color-app: linear-gradient(90deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
		--dark-primary-color: #218cb3;
	}
	@media (prefers-color-scheme: dark) {
		:root {
			--color-primary: #2cb5e8;
			--color-primary-medium: #2cb5e8b0;
			--color-primary-light: #2cb5e82b;
			--color-on-primary: #fff;

			--color-secondary: #0fb8ad;
			--color-on-secondary: #fff;

			/* Fondos */
			--color-background: #111e23;
			/* Fondos Textos que aparecen en los fondos */
			--color-on-background: #fff;

			/* Fondos que estan en cima de los fondos (ct-cards) */
			--color-surface: #1a2c34;
			/* Fondos Textos que aparecen en los ct-cards */
			--color-on-surface: #fff;

			--color-error: #cf6679;
			--color-on-error: #fff;

			--high-emphasis: #ffffffde;
			--medium-emphasis: #ffffff99;
			--color-disable: #ffffff61;

			--color-on-surface-opaque: #8e8e8e; /* Texto sencundarios */
			--color-on-surface-dividers: #bbbbbb24; /* divisores */
			--color-blur: rgba(35, 35, 37, 0.7);
			--color-blur-surface: #1a2c34b3;
			--color-app: linear-gradient(90deg, #0fb8ad 0%, #1fc8db 51%, #2cb5e8 75%);
			--dark-primary-color: #218cb3;
		}
	}

	html {
		height: 100%;
		width: 100%;
		max-height: 100%;
		max-width: 100%;
	}

	body {
		position: relative;
		margin: 0;
		padding: 0;
		font-size: 14px;
		background: var(--color-background);
		color: var(--color-on-background);
		height: 100%;
		font-family: 'Roboto', sans-serif !important;
		transition: all 0.2s;
	}

	@media print {
		@page {
			size: letter;
			margin: 0.6cm;
		}
		body,
		html {
			-webkit-print-color-adjust: exact !important;
			height: auto !important;
			max-height: none !important;
			background: #fff;
		}
	}
`;
export function addCSS(src: string) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = src;
	document.head.appendChild(link);
}
export function addFont(family: string) {
	const link = document.createElement('link');
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = `https://fonts.googleapis.com/css?family=${family}&display=swap`;
	document.head.appendChild(link);
}

export function applyTheme() {
	addFont(`Ubuntu:400,500,700`);
	addFont(`Roboto:400,500,700`);
	addCSS(`https://unpkg.com/intro.js/minified/introjs.min.css`);
	// addFont(`Material+Icons+Round`);
	// addFont(`Google+Sans:400,500,700`);
	// addFont(`Product+Sans:400,500,700`);
	const style = document.createElement('style');
	style.id = 'ctStyles';
	style.innerHTML = defaultTheme.toString();
	document.head.appendChild(style);
}
