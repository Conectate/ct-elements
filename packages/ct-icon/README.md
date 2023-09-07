<h1 align="center">@conectate/ct-icon</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/ct-icon?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/ct-icon.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/ct-icon"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/ct-icon.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
</p>

This is an implementation to be able to use the Material Icons with web components

> See: https://fonts.google.com/icons

## Installation

To include this, type in terminal:

```sh
yarn add @conectate/ct-icon
# or
npm i @conectate/ct-icon
```

## Example

```html
<!-- See: https://fonts.google.com/icons for more icons -->
<ct-icon icon="settings"></ct-icon>
<!-- Or -->
<ct-icon-button icon="headphones"></ct-icon-button>
```

### ES Modules

If you will use lit, react, vue, etc. need to import the web component.

#### `LitElement example (Typescript)`

```ts
import "@conectate/ct-icon";
import "@conectate/ct-icon-button";

// my-element.ts
import { LitElement, customElement, html } from "lit";

@customElement("my-element")
class MyElement extends LitElement {
	render() {
		return html`
			<ct-icon icon="print"></ct-icon>
			<ct-icon-button icon="headphones"></ct-icon-button>
		`;
	}
}
```

#### `Change font style`

```ts
import "@conectate/ct-icon";

import { CtIcon } from "@conectate/ct-icon";
// my-element.ts
import { LitElement, customElement, html } from "lit";

@customElement("my-element")
class MyElement extends LitElement {
	constructor() {
		// Select type
		CtIcon.FontStyle = "Sharp";
	}

	render() {
		return html`<style>
				/* Specify new font family */
				ct-icon {
					font-family: "Material Icons Sharp";
				}
			</style>

			<ct-icon icon="print"></ct-icon>`;
	}
}
```

## VS Code `intellisense` support

The component has support to autocomplete the more than 1000 existing icons by Google Fonts
![Visual Sttudio Code intellisense support](https://raw.githubusercontent.com/Conectate/ct-elements/master/images/vscode-intellisense.png)

## Properties

| Property    | Attribute     | Type                                               | Default   | Description                                                                                               |
| ----------- | ------------- | -------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| `FontStyle` | `static type` | `"Outlined"\|"Fill"\|"Sharp"\|"Two Tone"\|"Round"` | `"Round"` | Select Font Style with static propety - `CtIcon.FontStyle = "Round"`                                      |
| `icon`      | `icon`        | `icon`                                             |           | Icon name described in Google Fonts                                                                       |
| `svg`       | `svg`         | `string`                                           | ""        | If the desired icon does not exist icon in Google Fonts, you can use an `SVG` by sending it as a `string` |

## Follow me

[![Herberth_thumb](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://twitter.com/herberthobregon)

[https://twitter.com/herberthobregon](https://twitter.com/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

See [LICENSE](/LICENSE)
