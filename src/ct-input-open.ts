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

import { html } from "lit";

import { CtInput } from "./ct-input.js";
import { customElement, unsafeHTML } from "./ct-lit.js";

/**
 * # `ct-input-open`
 *
 * @group ct-elements
 * @element ct-input-open
 */
@customElement("ct-input-open")
export class CtInputOpen extends CtInput {
	render() {
		return html`${unsafeHTML(`<style>${CtInput.styles.map(s => s.toString())}</style>`)}${super.render()}`;
	}
	createRenderRoot() {
		return this;
	}
}
