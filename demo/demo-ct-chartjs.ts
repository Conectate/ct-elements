import "@conectate/components/ct-card";
import "@conectate/components/ct-chartjs";

import "./code-example/code-example.js";

import { CtLit, css, customElement, html, state } from "@conectate/components/ct-lit";
import { ChartData, ChartType } from "chart.js";

@customElement("demo-ct-chartjs")
export class DemoCtChartjs extends CtLit {
	static styles = [
		css`
			:host {
				display: block;
				max-width: 800px;
				margin: 0 auto;
			}
			header > h1 {
				margin-bottom: 0;
				font-family: monospace;
			}
		`
	];

	name = "ct-chartjs";
	@state() type: ChartType = "pie";
	@state() data?: ChartData;
	@state() options = {};

	render() {
		if (!this.data) return html`Loading...`;
		return html`
			<header class="card-content">
				<h1>&lt;/${this.name}&gt;</h1>
			</header>
			<main class="card-content">${this.example()}</main>
		`;
	}
	example() {
		return html`
			<ct-card>
				<div class="card-content">
					<ct-chartjs .type=${this.type} .data=${this.data!} .options=${this.options} autopaint></ct-chartjs>
				</div>
				<div class="card-actions">
					<ct-button @click=${() => this.setType("pie")}>Pie</ct-button>
					<ct-button @click=${() => this.setType("line")}>Line</ct-button>
					<ct-button @click=${() => this.setType("bar")}>Bar</ct-button>
				</div>
			</ct-card>
		`;
	}

	firstUpdated() {
		this.setType("pie");
	}

	setType(type: ChartType) {
		this.type = type;
		if (type == "pie") {
			this.data = {
				labels: ["January", "February", "March"],
				datasets: [
					{
						data: [10, 20, 30],
						backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
						borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"]
					}
				]
			};
		} else if (type == "line") {
			this.data = {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
				datasets: [
					{
						label: "My First dataset",
						backgroundColor: "rgba(255, 99, 132,0.5)",
						borderColor: "rgba(255, 99, 132,.3)",
						data: [0, 10, 5, 2, 20, 30, 45]
					}
				]
			};
		} else if (type == "bar") {
			this.data = {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [
					{
						label: "# of Votes",
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(255, 206, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(255, 159, 64, 0.2)"
						],
						borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
						borderWidth: 1
					}
				]
			};
		}
	}
}
