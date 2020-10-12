import { Chart } from 'chart.js';
import { html, CtLit, property } from '@conectate/ct-lit';
import { sleep } from '@conectate/ct-helpers';
let pie = {
	type: 'pie' as Chart.ChartType,
	data: {
		labels: ['January', 'February', 'March'],
		datasets: [
			{
				data: [10, 20, 30],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)']
			}
		]
	},
	options: {}
};

let line = {
	type: 'line',
	data: {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First dataset',
				backgroundColor: 'rgba(255, 99, 132,0.5)',
				borderColor: 'rgba(255, 99, 132,.3)',
				data: [0, 10, 5, 2, 20, 30, 45]
			}
		],
		borderWidth: 1
	},
	options: {}
};

let bar = {
	type: 'bar',
	data: {
		labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
		datasets: [
			{
				label: '# of Votes',
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
				borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
				borderWidth: 1
			}
		]
	},
	options: {}
};

declare global {
	interface HTMLElementTagNameMap {
		'ct-chartjs': CtChartJS;
	}
}


export default class CtChartJS extends CtLit {
	@property({ type: Object }) chart!: Chart.ChartConfiguration & Chart;
	@property({ type: String }) type: Chart.ChartType = pie.type;
	@property({ type: Object }) data: Chart.ChartData = pie.data;
	@property({ type: Object }) options: Chart.ChartOptions = {};
	@property({ type: Number }) delay = 0;
	@property({ type: Boolean }) autopaint = false;
	@property({ type: Boolean }) autoadjust = false;
	@property({ type: Number }) x_ = 400;
	@property({ type: Number }) y_ = 400;
	@property({ type: Object }) sizeChart = (x: number, y: number) =>
		html`
			<style>
				canvas,
				.chart-size {
					height: ${y}px !important;
					width: 100% !important;
					max-width: ${x}px !important;
					min-width: 100px;
				}
			</style>
		`;
	ctx!: CanvasRenderingContext2D;
	resize!: any;

	render() {
		return html`
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
	constructor() {
		super();
		this.resize = (evt: Event) => {
			if (this.chart) {
				this.chart.resize();
			}
		};
	}

	async firstUpdated(_props: Map<PropertyKey, unknown>) {
		this.mapIDs();
		await sleep(200);
		if (this.autopaint) {
			this.init();
		} else if (this.delay > 0) {
			await sleep(this.delay);
			this.init();
		}
	}

	async init() {
		let data: Chart.ChartData = this.data || {};
		let options: Chart.ChartOptions = this.options || {};

		if ((data.labels?.length || 1) > 6 && this.autoadjust) {
			this.y_ = 500;
		}
		if ((data.labels?.length || 1) > 15 && this.autoadjust) {
			console.log(options);
			this.y_ = 600;
		}
		this.offsetWidth == 0 && (await sleep(100));

		this.chart = new Chart(this.$.canvas, {
			type: this.type,
			data: data,
			options: { ...options, responsive: true, maintainAspectRatio: false }
		});
		window.addEventListener('resize', this.resize);
	}

	paint() {
		let data: Chart.ChartData = this.data || {};
		let options: Chart.ChartOptions = this.options || {};
		if (!this.chart) {
			let ctx: CanvasRenderingContext2D = this.shadowRoot!.querySelector('canvas')!.getContext('2d')!;
			this.chart = new Chart(ctx, {
				type: this.type,
				data: data,
				options: options
			});
		} else {
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
		this.chart.data.datasets = this.chart.data.datasets.map((dataset: Chart.ChartDataSets) => {
			// @ts-ignore
			dataset.data = this.observe(dataset.data);
			return this.observe(dataset);
		});
		window.addEventListener('resize', this.resize);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('resize', this.resize);
	}

	/**
	 * Use Proxy to watch object props change
	 * @params obj
	 */
	public observe<T extends object>(obj: T): T {
		let updateChart: () => void = this.updateChart;
		return new Proxy(obj, {
			set: (target: T, prop: string, val: unknown): boolean => {
				// @ts-ignore
				target[prop] = val;
				Promise.resolve().then(updateChart);
				return true;
			}
		});
	}
	/**
	 * Manually update chart
	 */
	public updateChart = (): void => {
		if (this.chart) {
			this.chart.update();
		}
	};
}

customElements.define('ct-chartjs', CtChartJS);
