/**
	@license
	Copyright (c) 2020 Herberth Obregón. All rights reserved.
	This code may only be used under the BSD style license found at
	http://wc.conectate.today/LICENSE.txt The complete set of authors may be found at
	http://wc.conectate.today/AUTHORS.txt The complete set of contributors may be
	found at http://wc.conectate.today/CONTRIBUTORS.txt Code distributed by Herberth Obregón as
	part of the Conectate Open Source Project is also subject to an additional IP rights grant
	found at http://wc.conectate.today/PATENTS.txt
 */
import { CtInput } from './ct-input';
import { unsafeHTML, html } from '@conectate/ct-lit';
export class CtInputOpen extends CtInput {
	render() {
		return html`${unsafeHTML(`<style>${CtInput.styles.map((s) => s.cssText)}</style>`)}${super.render()}`;
	}
	createRenderRoot() {
		return this;
	}
}
window.customElements.define('ct-input-open', CtInputOpen);
