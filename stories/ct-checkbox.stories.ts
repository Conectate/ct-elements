import "@conectate/ct-button";

import { html } from "lit";

import { LitStory } from "./types";

export default {
	title: "ct-elements/ct-button",
	component: "ct-button",
	argTypes: {
		primaryColor: {
			control: "color",
			defaultValue: "#00aeff",
			description: "demo description"
		}
	}
};
export const Normal: LitStory = {
	story: args => html` <ct-button>${args.txt}</ct-button>`,
	args: {
		txt: "Hello!",
		items: ["Hello!", "World!"],
		primaryColor: "#00aeff"
	}
};

export const Raised: LitStory = {
	story: args => html` <ct-button raised>${args.txt}</ct-button>`,
	args: Normal.args
};

export const Shadow: LitStory = {
	story: args => html` <ct-button shadow>${args.txt}</ct-button>`,
	args: Normal.args
};

export const Flat: LitStory = {
	story: args => html` <ct-button flat>${args.txt}</ct-button>`,
	args: Normal.args
};
export const Light: LitStory = {
	story: args => html` <ct-button light>${args.txt}</ct-button>`,
	args: Normal.args
};
