import '../packages/ct-button';
import '../packages/ct-button/src/ct-button-menu';
import '../packages/ct-menu/src/ct-menu';

import { CtLit, css, customElement, html } from '../packages/ct-lit';

@customElement('demo-ct-buttom')
export class DemoCtButtom extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
			ct-button-split,
			ct-button {
				margin: 8px;
			}
			.btns {
				display: flex;
				flex-wrap: wrap;
			}

			.menu {
				padding-right: 4px;
			}
			.menu ct-button-menu {
				border-left: 1px solid #80808076;
				margin-left: 8px;
			}
			ct-list-item {
				min-width: 152px;
			}
		`
	];

	render() {
		return html` <div class="btns">
				<ct-button>Normal </ct-button>
				<ct-button shadow>shadow</ct-button>
				<ct-button raised>raised</ct-button>
				<ct-button light>light</ct-button>
				<ct-button flat>flat</ct-button>
				<ct-button gap><ct-icon icon="account_circle"></ct-icon>raised with ct-icon</ct-button>

				<ct-button><ct-icon slot="suffix" icon="account_circle"></ct-icon>raised with slot suffix ct-icon</ct-button>
			</div>
			<div>
				<ct-button-split split><ct-icon icon="account_circle"></ct-icon>raised with ct-icon</ct-button-split>
			</div>
			<div>
				${['top-right', 'top-left', 'bottom-right', 'bottom-left'].map(
					(from) => html`<ct-button class="menu">
						From ${from}
						<ct-button-menu slot="suffix" from=${from as any} icon="expand_more" rotate>
							<ct-list-item .name=${`H@`} icon="car_rental"></ct-list-item>
							<ct-list-item .name=${`Her`} icon="car_rental"></ct-list-item>
							<ct-list-item .name=${`Her`} icon="quickreply"></ct-list-item>
							<ct-list-item name="Save" icon="save"></ct-list-item>
							<hr />
							<ct-list-item .name=${`Her`} icon="quickreply"></ct-list-item>
							<ct-list-item name="Save" icon="save"></ct-list-item>
							<ct-list-item .name=${`Her`} icon="quickreply"></ct-list-item>
							<ct-list-item name="Save" icon="save"></ct-list-item>
						</ct-button-menu>
					</ct-button>`
				)}
				<ct-button class="menu" shadow>
					Witn keep
					<ct-button-menu slot="suffix" keep icon="expand_more">
						<ct-list-item .name=${`H@`} icon="car_rental"></ct-list-item>
						<ct-list-item .name=${`Her`} icon="car_rental"></ct-list-item>
						<ct-list-item .name=${`Her`} icon="quickreply"></ct-list-item>
						<ct-list-item name="Save" icon="save"></ct-list-item>
						<hr />
						<ct-list-item .name=${`Her`} icon="quickreply"></ct-list-item>
						<ct-list-item name="Save" icon="save"></ct-list-item>
						<ct-list-item .name=${`Her`} icon="quickreply"></ct-list-item>
						<ct-list-item name="Save" icon="save"></ct-list-item>
					</ct-button-menu>
				</ct-button>
			</div>`;
	}
	firstUpdated() {
		this.shadowRoot?.querySelectorAll('ct-button').forEach((el) => {
			el.addEventListener('click', () => {
				console.log(el.innerHTML);
			});
		});
	}
}
