/**
	@license
	Copyright (c) 2020 Herberth Obregón. All rights reserved.
	This code may only be used under the BSD style license found at
	https://wc.conectate.app/LICENSE.txt The complete set of authors may be found at
	https://wc.conectate.app/AUTHORS.txt The complete set of contributors may be
	found at https://wc.conectate.app/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
	part of the Conectate Open Source Project is also subject to an additional IP rights grant
	found at https://wc.conectate.app/PATENTS.txt
 */

import { customElement, unsafeHTML } from "@conectate/ct-lit";
import { html } from "lit";

import { CtInput } from "./ct-input";

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
