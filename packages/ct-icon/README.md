<div align="center">
	<h1>@conectate/ct-icon</h1>
	<a href="https://npmcharts.com/compare/@conectate/ct-icon?minimal=true">
		<img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/ct-icon.svg" height="20">
	</a>
	<a href="https://www.npmjs.com/package/@conectate/ct-icon">
		<img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/ct-icon.svg" height="20">
	</a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors">
		<img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20">
	</a>
</div>

<br>

A versatile icon component system for displaying Material Icons and custom SVGs in web applications, with support for various styles and customization options.

> IMPORTANT: Check [https://fonts.google.com/icons](https://fonts.google.com/icons) for the list of available icons, fonts and styles.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
- [Basic Usage](#basic-usage)
- [Component API](#component-api)
    - [ct-icon](#ct-icon)
    - [ct-icon-button](#ct-icon-button)
- [Icon Styles](#icon-styles)
- [Styling](#styling)
- [Icon List](#icon-list)
- [TypeScript Support](#typescript-support)
- [Accessibility](#accessibility)
- [Follow Me](#follow-me)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install via npm, yarn, or pnpm:

```sh
# npm
npm i @conectate/ct-icon

# yarn
yarn add @conectate/ct-icon

# pnpm
pnpm i @conectate/ct-icon
```

## Components

This package includes the following components:

| Component        | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `ct-icon`        | Base icon component for displaying Material Icons or custom SVGs |
| `ct-icon-button` | Icon wrapped in a circular button with hover and active states   |

## Basic Usage

### Material Icons

```html
<!-- Basic icon usage -->
<ct-icon icon="settings"></ct-icon>

<!-- Changing icon style -->
<ct-icon icon="favorite" fontstyle="Fill"></ct-icon>

<!-- Icon with custom size -->
<ct-icon icon="home" style="--ct-icon-size: 36px;"></ct-icon>
```

### Icon Button

```html
<!-- Basic icon button -->
<ct-icon-button icon="search"></ct-icon-button>

<!-- Disabled icon button -->
<ct-icon-button icon="close" disabled></ct-icon-button>

<!-- Icon button with accessibility label -->
<ct-icon-button icon="menu" aria-label="Open menu"></ct-icon-button>
```

### Custom SVG Icons

```html
<!-- Using custom SVG content -->
<ct-icon svg="<svg viewBox='0 0 24 24'><path d='M12 2L2 7l10 5 10-5-10-5z'/></svg>"></ct-icon>

<!-- SVG in icon button -->
<ct-icon-button svg="<svg viewBox='0 0 24 24'><path d='M12 2L2 7l10 5 10-5-10-5z'/></svg>"></ct-icon-button>
```

### Using ES Modules

```javascript
import { CtIcon } from "@conectate/ct-icon";
import "@conectate/ct-icon";
import "@conectate/ct-icon-button";

// Set global icon font style
CtIcon.FontStyle = "Outlined";
CtIcon.Font = "Symbols";

// Dynamically create an icon
const myIcon = document.createElement("ct-icon");
myIcon.icon = "delete";
document.body.appendChild(myIcon);
```

## Component API

### ct-icon

The base icon component that displays Material Icons or custom SVGs.

#### Properties

| Property    | Type                                                                              | Default     | Description                                                       |
| ----------- | --------------------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `icon`      | `string`                                                                          | -           | Name of the Material Icon to display                              |
| `svg`       | `string`                                                                          | -           | Custom SVG content if the icon is not available in Material Icons |
| `font`      | `"Icons"` \| `"Symbols"`                                                          | `"Symbols"` | Which icon font family to use                                     |
| `fontstyle` | `"Outlined"` \| `"Fill"` \| `"Sharp"` \| `"Two Tone"` \| `"Round"` \| `"Rounded"` | `"Rounded"` | Style variant of the icon                                         |
| `ready`     | `boolean`                                                                         | `false`     | Whether the font has been loaded (read-only)                      |

#### Static Properties

| Property    | Type                                                                              | Default     | Description                |
| ----------- | --------------------------------------------------------------------------------- | ----------- | -------------------------- |
| `Font`      | `"Icons"` \| `"Symbols"`                                                          | `"Symbols"` | Global font family setting |
| `FontStyle` | `"Outlined"` \| `"Fill"` \| `"Sharp"` \| `"Two Tone"` \| `"Round"` \| `"Rounded"` | `"Rounded"` | Global font style setting  |

#### Static Methods

| Method        | Description                     | Parameters                            | Returns                        |
| ------------- | ------------------------------- | ------------------------------------- | ------------------------------ |
| `loadFonts()` | Loads the specified font styles | `FontStyle?: string`, `Font?: string` | `HTMLLinkElement \| undefined` |

### ct-icon-button

A button component that displays an icon.

#### Properties

| Property    | Type      | Default | Description                                                               |
| ----------- | --------- | ------- | ------------------------------------------------------------------------- |
| `icon`      | `string`  | -       | Name of the Material Icon to display                                      |
| `svg`       | `string`  | -       | Custom SVG content for the button                                         |
| `disabled`  | `boolean` | `false` | Whether the button is disabled                                            |
| `ariaLabel` | `string`  | `""`    | Accessible label for the button (falls back to icon name if not provided) |

## Icon Styles

The ct-icon component supports different styles from the Material Icons library:

| Style      | Description                         |
| ---------- | ----------------------------------- |
| `Outlined` | Icons with an outlined appearance   |
| `Fill`     | Solid, filled icons                 |
| `Sharp`    | Icons with sharp, straight edges    |
| `Two Tone` | Two-tone icons with varying opacity |
| `Round`    | Icons with rounded corners          |
| `Rounded`  | Rounded icon style (default)        |

You can set styles globally or per component:

```javascript
// Global setting
import { CtIcon } from "@conectate/ct-icon";
CtIcon.FontStyle = "Outlined";

// Per component
<ct-icon icon="favorite" fontstyle="Fill"></ct-icon>
```

## Styling

You can customize the components using CSS variables:

```css
ct-icon {
	--ct-icon-size: 24px; /* Icon size (default: 24px) */
}

ct-icon-button {
	/* Inherits --ct-icon-size from ct-icon */
	color: blue; /* Icon color */
}
```

## Icon List

The component provides access to all Material Icons available in the Google Fonts library. You can browse the available icons at:

[https://fonts.google.com/icons](https://fonts.google.com/icons)

When using TypeScript, the package provides type definitions for all available icons, giving you autocomplete support in compatible editors.

## TypeScript Support

The package includes full TypeScript definitions and provides autocompletion for icon names:

```typescript
import { CtIcon } from "@conectate/ct-icon";

// Icon names are typed
const icon = document.createElement("ct-icon");
icon.icon = "settings"; // Autocomplete works here
```

## Accessibility

To ensure your icons are accessible, consider the following best practices:

- Use `aria-label` for icon buttons to provide a text alternative
- Add `title` attributes to icons that convey information
- Avoid using icons alone for critical navigation or actions unless properly labeled

```html
<ct-icon-button icon="menu" aria-label="Open navigation menu"></ct-icon-button>
```

## Follow Me

[![Herberth Obregón](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://x.com/herberthobregon)

[https://x.com/herberthobregon](https://x.com/herberthobregon)

[https://dev.to/herberthobregon](https://dev.to/herberthobregon)

## Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to your branch: `git push origin feature-branch`
5. Open a pull request!

## License

See [LICENSE](/LICENSE)
