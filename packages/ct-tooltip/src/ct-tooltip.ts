import { css } from "lit";
export let tooltipStyles = css`
	/* Add this attribute to the element that needs a tooltip */
	[data-tooltip] {
		position: relative;
		cursor: pointer;
	}

	/* Hide the tooltip content by default */
	[data-tooltip]:before,
	[data-tooltip]:after {
		visibility: hidden;
		opacity: 0;
		pointer-events: none;
		backdrop-filter: saturate(180%) blur(15px);
		transition: all 200ms;
	}

	/* Position tooltip above the element */
	[data-tooltip]:before {
		font-family: var(--font-family, "Google Sans", Ubuntu, Roboto, arial, sans-serif);
		position: absolute;
		bottom: 150%;
		left: 50%;
		margin-bottom: 5px;
		margin-left: -80px;
		padding: 7px;
		width: 160px;
		border-radius: 8px;
		background-color: rgba(0, 0, 0, 0.3);
		color: #fff;
		content: attr(data-tooltip);
		text-align: center;
		font-size: 14px;
		line-height: 1.2;
	}

	[data-toleft]:before {
		margin-left: -140px;
	}
	[data-toright]:before {
		margin-left: -24px;
	}

	/* Triangle */
	[data-tooltip]:after {
		position: absolute;
		bottom: 150%;
		left: 50%;
		margin-left: -5px;
		width: 0;
		border-top: 5px solid rgba(0, 0, 0, 0.3);
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
		content: "";
		font-size: 0;
		line-height: 0;
	}

	[data-tobottom]:after {
		bottom: -37%;
		border-top: 0;
		border-bottom: 5px solid rgba(0, 0, 0, 0.3);
		border-right: 5px solid transparent;
		border-left: 5px solid transparent;
	}
	[data-tobottom]:before {
		bottom: -150%;
	}

	/* Show tooltip content on hover */
	[data-tooltip]:not([data-tooltip=""]):hover:before,
	[data-tooltip]:not([data-tooltip=""]):hover:after {
		visibility: visible;
		opacity: 1;
		z-index: 150;
	}
`;
