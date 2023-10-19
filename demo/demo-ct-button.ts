import "@conectate/ct-button/ct-button";
import "@conectate/ct-button/ct-button-menu";
import "@conectate/ct-button/ct-button-split";
import "@conectate/ct-list/ct-list-item";
import "@conectate/ct-menu/ct-menu";

import { CtButtonSplit } from "@conectate/ct-button/ct-button-split";
import { CtLit, css, customElement, html } from "@conectate/ct-lit";

@customElement("demo-ct-button")
export class DemoCtButtom extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
			}
			ct-button-split,
			.btns ct-button {
				margin: 8px;
			}
			.btns {
				display: flex;
				flex-wrap: wrap;
			}
		`,
		CtButtonSplit.CtButtonStyle
	];

	render() {
		return html` <div class="btns">
				<ct-button>Normal </ct-button>
				<ct-button shadow>shadow</ct-button>
				<ct-button raised>raised</ct-button>
				<ct-button light>light</ct-button>
				<ct-button flat>flat</ct-button>
				<ct-button gap><ct-icon icon="account_circle" slot="prefix"></ct-icon>Button with [gap]</ct-button>

				<ct-button gap>
					raised with slot suffix ct-icon and gap
					<ct-icon slot="suffix" icon="account_circle"></ct-icon>
				</ct-button>
				<ct-button gap>
					<ct-icon slot="prefix" icon="home"></ct-icon>
					Home
				</ct-button>

				<ct-button gap>
					<ct-icon slot="prefix" id="t" icon="home" font="Icons" fontstyle="Round"></ct-icon>
					Home
				</ct-button>
			</div>

			<!--  -->
			<div>
				${["top-right", "top-left", "bottom-right", "bottom-left"].map(
					from => html`
						<ct-button-split shadow>
							<ct-button disabled>From ${from}</ct-button>
							<ct-button-menu from=${from as any} icon="expand_more" rotate>
								<ct-list-item text="H" icon="car_rental"></ct-list-item>
								<ct-list-item text="Her" icon="car_rental"></ct-list-item>
								<ct-list-item text="Her" icon="quickreply"></ct-list-item>
								<ct-list-item text="Save" icon="save"></ct-list-item>
								<hr />
								<ct-list-item text="Save" icon="save"></ct-list-item>
								<ct-list-item text="Save" icon="save"></ct-list-item>
							</ct-button-menu>
						</ct-button-split>
					`
				)}
				<ct-button-split raised>
					<ct-button>Keep</ct-button>
					<ct-button-menu icon="expand_more" rotate keep>
						<ct-list-item text="H" icon="car_rental"></ct-list-item>
						<ct-list-item text="Her" icon="car_rental"></ct-list-item>
						<ct-list-item text="Her" icon="quickreply"></ct-list-item>
						<ct-list-item text="Save" icon="save"></ct-list-item>
						<hr />
						<ct-list-item text="Save" icon="save"></ct-list-item>
						<ct-list-item text="Save" icon="save"></ct-list-item>
					</ct-button-menu>
				</ct-button-split>
				<ct-button-split raised>
					<ct-button>custom</ct-button>
					<ct-button-menu icon="expand_more" rotate keep>
						<div style="width:200px;height:200px"><button>hola</button></div>
					</ct-button-menu>
				</ct-button-split>

				<ct-button-split raised>
					<a><ct-button>with &lt;a&gt;</ct-button></a>
					<ct-button-menu icon="expand_more" rotate keep>
						<ct-list-item text="H" icon="car_rental"></ct-list-item>
						<ct-list-item text="Her" icon="car_rental"></ct-list-item>
						<ct-list-item text="Her" icon="quickreply"></ct-list-item>
						<ct-list-item text="Save" icon="save"></ct-list-item>
						<hr />
						<ct-list-item text="Save" icon="save"></ct-list-item>
						<ct-list-item text="Save" icon="save"></ct-list-item>
					</ct-button-menu>
				</ct-button-split>

				<ct-button-menu icon="expand_more" rotate>
					<ct-list-item text="H" icon="car_rental"></ct-list-item>
					<ct-list-item text="Her" icon="car_rental"></ct-list-item>
					<ct-list-item text="Her" icon="quickreply"></ct-list-item>
					<ct-list-item text="Save" icon="save"></ct-list-item>
					<hr />
					<ct-list-item text="Save" icon="save"></ct-list-item>
					<ct-list-item text="Save" icon="save"></ct-list-item>
				</ct-button-menu>
			</div>`;
	}
	firstUpdated() {
		this.shadowRoot?.querySelectorAll("ct-button").forEach(el => {
			el.addEventListener("click", () => {
				console.log(el.innerHTML);
			});
		});
	}
}
