var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Chart } from "chart.js";
import { html, CtLit, property } from "@conectate/ct-lit/ct-lit";
import { sleep } from '@conectate/ct-helpers/ct-helpers';
let pie = {
    type: "pie",
    data: {
        labels: ["January", "February", "March"],
        datasets: [
            {
                data: [10, 20, 30],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)"
                ]
            }
        ]
    },
    options: {}
};
let line = {
    type: "line",
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgba(255, 99, 132,0.5)",
                borderColor: "rgba(255, 99, 132,.3)",
                data: [0, 10, 5, 2, 20, 30, 45]
            }
        ],
        borderWidth: 1
    },
    options: {}
};
let bar = {
    type: "bar",
    data: {
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
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
            }
        ]
    },
    options: {}
};
export default class CtChartJS extends CtLit {
    constructor() {
        super();
        this.type = pie.type;
        this.data = pie.data;
        this.options = {};
        this.autopaint = false;
        this.autoadjust = false;
        this.x_ = 400;
        this.y_ = 400;
        this.sizeChart = (x, y) => html `
			<style>
				canvas,
				.chart-size {
					height: ${y}px !important;
					width: 100% !important;
					max-width: ${x}px !important;
					min-width:100px;
				}
			</style>
		`;
        /**
         * Manually update chart
         */
        this.updateChart = () => {
            if (this.chart) {
                this.chart.update();
            }
        };
        this.resize = (evt) => {
            if (this.chart) {
                this.chart.resize();
            }
        };
    }
    render() {
        return html `
			<style>
				:host {
					display: block;
					max-width: 900px;
					margin: 0 auto;
				}
				.chart-size {
					position: relative;
					margin: 0 auto;
				}
			</style>
			${this.sizeChart(this.x_, this.y_)}
			<div class="chart-size">
				<canvas id="canvas" height="${this.y_}" width="${this.x_}"></canvas>
			</div>
		`;
    }
    async firstUpdated(_props) {
        this.mapIDs();
        await sleep(200);
        if (this.autopaint)
            this.init();
    }
    async init() {
        let data = this.data || {};
        let options = this.options || {};
        if ((data.labels?.length || 1) > 6 && this.autoadjust) {
            this.y_ = 500;
        }
        if ((data.labels?.length || 1) > 15 && this.autoadjust) {
            console.log(options);
            this.y_ = 600;
        }
        this.offsetWidth == 0 && await sleep(100);
        this.chart = new Chart(this.$.canvas, {
            type: this.type,
            data: data,
            options: { ...options, responsive: true, maintainAspectRatio: false }
        });
        window.addEventListener("resize", this.resize);
    }
    paint() {
        let data = this.data || {};
        let options = this.options || {};
        if (!this.chart) {
            let ctx = this.shadowRoot.querySelector("canvas").getContext("2d");
            this.chart = new Chart(ctx, {
                type: this.type,
                data: data,
                options: options
            });
        }
        else {
            this.chart.type = this.type;
            this.chart.data = data;
            this.chart.options = options;
            this.chart.update();
        }
        this.chart.data = this.observe(this.chart.data);
        for (let prop of Object.keys(this.chart.data)) {
            // @ts-ignore
            this.chart.data[prop] = this.observe(this.chart.data[prop]);
        }
        // @ts-ignore
        this.chart.data.datasets = this.chart.data.datasets.map((dataset) => {
            // @ts-ignore
            dataset.data = this.observe(dataset.data);
            return this.observe(dataset);
        });
        window.addEventListener("resize", this.resize);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("resize", this.resize);
    }
    /**
     * Use Proxy to watch object props change
     * @params obj
     */
    observe(obj) {
        let updateChart = this.updateChart;
        return new Proxy(obj, {
            set: (target, prop, val) => {
                // @ts-ignore
                target[prop] = val;
                Promise.resolve().then(updateChart);
                return true;
            }
        });
    }
}
__decorate([
    property({ type: Object })
], CtChartJS.prototype, "chart", void 0);
__decorate([
    property({ type: String })
], CtChartJS.prototype, "type", void 0);
__decorate([
    property({ type: Object })
], CtChartJS.prototype, "data", void 0);
__decorate([
    property({ type: Object })
], CtChartJS.prototype, "options", void 0);
__decorate([
    property({ type: Boolean })
], CtChartJS.prototype, "autopaint", void 0);
__decorate([
    property({ type: Boolean })
], CtChartJS.prototype, "autoadjust", void 0);
__decorate([
    property({ type: Number })
], CtChartJS.prototype, "x_", void 0);
__decorate([
    property({ type: Number })
], CtChartJS.prototype, "y_", void 0);
__decorate([
    property({ type: Object })
], CtChartJS.prototype, "sizeChart", void 0);
customElements.define("ct-chartjs", CtChartJS);
