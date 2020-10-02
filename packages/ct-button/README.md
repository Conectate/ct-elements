# `<ct-button>`

[![Published on npm](https://img.shields.io/npm/v/@conectate/ct-button.svg)](https://www.npmjs.com/package/@conectate/ct-button)

## Installation

```sh
npm install @conectate/ct-button
```

```sh
yarn add @conectate/ct-button
```

> NOTE: Conectate Components are distributed as ES2020 JavaScript
> Modules, and use the Custom Elements API. They are compatible with all modern
> browsers including Chrome, Firefox, Safari, Edge, and IE11, but an additional
> tooling step is required to resolve _bare module specifiers_, as well as
> transpilation and polyfills for Edge and IE11.

## Example usage

### Standard

<img src="images/standard.png" width="84px" height="48px">

```html
<ct-button value="value1"></ct-button>
<ct-button shadow value="value2"></ct-button>
<ct-button raised value="value3"></ct-button>
<ct-button flat value="value4"></ct-button>
<ct-button light value="value5"></ct-button>
<ct-button disabled value="value5"></ct-button>

<script type="module">
	import '@conectate/ct-button';
</script>
```

## API

### Slots

_None_

### Properties/Attributes

| Name       | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `raised`   | `boolean` | `false` | Raised Style (primary color)        |
| `shadow`   | `boolean` | `false` | Shown with opaque black background. |
| `flat`     | `boolean` | `false` | Shown with a primary color border   |
| `light`    | `boolean` | `false` | Shown with a primary color border   |
| `disabled` | `boolean` | `false` | If `true`, Disable clicks           |

### Methods

_None_

### Events

| Name    | Detail             | Description                                                                                             |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| `value` | `{value : string}` | Fired when the user modifies the ct-input `value` state from an input device interaction on this radio. |

### CSS Custom Properties

| Custom property            | Description          | Default                                   |
| -------------------------- | -------------------- | ----------------------------------------- |
| `--primary-color`          | Primary color        | `#00aeff`                                 |
| `--dark-primary-color`     | Dark Primary color   | `#00aeff`                                 |
| `--ct-button-box-shadow`   | Box-Shadow for hover | `0 2px 16px 4px rgba(99, 188, 240, 0.45)` |
| `--ct-button-shadow-color` | -                    | `rgba(64, 117, 187, 0.1)`                 |
