# @conectate/components/ct-list

<div align="center">
	<a href="https://npmcharts.com/compare/@conectate/components/ct-list?minimal=true">
		<img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/components/ct-list.svg" height="20">
	</a>
	<a href="https://www.npmjs.com/package/@conectate/components/ct-list">
		<img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/components/ct-list.svg" height="20">
	</a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors">
		<img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20">
	</a>
</div>

<br>

A versatile list item component for creating navigation menus, action lists, and interactive elements with icon support and flexible styling options.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)
    - [Properties](#properties)
    - [Slots](#slots)
    - [CSS Custom Properties](#css-custom-properties)
    - [Methods](#methods)
- [Common Patterns](#common-patterns)
    - [Navigation Menu](#navigation-menu)
    - [Settings List](#settings-list)
    - [Action Items](#action-items)
- [Integration](#integration)
    - [With ct-button-menu](#with-ct-button-menu)
    - [With Routers](#with-routers)
- [Styling Examples](#styling-examples)
- [Follow Me](#follow-me)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install via npm, yarn, or pnpm:

```sh
# npm
npm i @conectate/components/ct-list

# yarn
yarn add @conectate/components/ct-list

# pnpm
pnpm i @conectate/components/ct-list
```

## Features

- **Flexible Layout**: Slots for prefix, main content, and suffix elements
- **Icon Support**: Built-in support for Material Icons via ct-icon
- **Link Capability**: Can function as navigation links
- **Interactive**: Hover states and click handling
- **Menu Integration**: Automatically closes parent menus when clicked
- **Customizable**: Multiple styling options via CSS variables
- **Accessible**: Built with proper semantics and keyboard navigation support

## Basic Usage

Import the component and use it in your HTML:

```javascript
// Import the component
import '@conectate/components/ct-list/ct-list-item.js';
```

```html
<!-- Simple list item with text -->
<ct-list-item text="Settings"></ct-list-item>

<!-- With icon -->
<ct-list-item icon="settings" text="Settings"></ct-list-item>

<!-- As a navigation link -->
<ct-list-item icon="home" text="Home" href="/home"></ct-list-item>

<!-- Using custom SVG icon -->
<ct-list-item svg="<svg viewBox='0 0 24 24'><path d='M12 2L2 7l10 5 10-5-10-5z'/></svg>" text="Custom Icon"> </ct-list-item>
```

## Advanced Usage

### Custom Content with Slots

```html
<ct-list-item>
	<span slot="prefix">🔔</span>
	Notifications
	<span slot="suffix" class="badge">5</span>
</ct-list-item>
```

### Keep Menu Open

```html
<ct-button-menu>
	<ct-list-item text="Option 1"></ct-list-item>
	<ct-list-item text="Option with submenu" keep-open></ct-list-item>
	<ct-list-item text="Option 3"></ct-list-item>
</ct-button-menu>
```

### Open Links in New Tab

```html
<ct-list-item text="External Link" icon="open_in_new" href="https://example.com" target="_blank"> </ct-list-item>
```

## API Reference

### Properties

| Property      | Type      | Default     | Description                                   |
| ------------- | --------- | ----------- | --------------------------------------------- |
| `text`        | `string`  | `""`        | Text content to display in the item           |
| `icon`        | `string`  | `undefined` | Material Icon name to display                 |
| `svg`         | `string`  | `""`        | Custom SVG content for the icon               |
| `href`        | `string`  | `undefined` | URL the item navigates to when clicked        |
| `link`        | `string`  | `undefined` | Deprecated, use `href` instead                |
| `target`      | `string`  | `undefined` | Link target (`"_self"`, `"_top"`, `"_blank"`) |
| `keepOpen`    | `boolean` | `false`     | When true, parent menus won't close on click  |
| `hideoutline` | `boolean` | `false`     | Hides the bottom border                       |

### Slots

| Slot      | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `default` | Main content area, used with or instead of the `text` property |
| `prefix`  | Content shown before the main text (left side in LTR layouts)  |
| `suffix`  | Content shown after the main text (right side in LTR layouts)  |

### CSS Custom Properties

| Property                      | Description                         | Default       |
| ----------------------------- | ----------------------------------- | ------------- |
| `--ct-list-item--white-space` | Controls text wrapping              | `nowrap`      |
| `--ct-icon-size`              | Size of the icon                    | `21px`        |
| `--color-outline`             | Color of the bottom border          | `transparent` |
| `--color-primary`             | Color used for outline when focused | _inherited_   |

### Methods

| Method        | Description                 | Parameters          |
| ------------- | --------------------------- | ------------------- |
| `closeMenu()` | Closes parent menu elements | `event: MouseEvent` |

## Common Patterns

### Navigation Menu

```html
<nav>
	<ct-list-item icon="home" text="Home" href="/"></ct-list-item>
	<ct-list-item icon="person" text="Profile" href="/profile"></ct-list-item>
	<ct-list-item icon="settings" text="Settings" href="/settings"></ct-list-item>
	<ct-list-item icon="help" text="Help" href="/help"></ct-list-item>
</nav>
```

### Settings List

```html
<div class="settings-group">
	<h3>Account Settings</h3>
	<ct-list-item icon="account_circle" text="Profile Information"></ct-list-item>
	<ct-list-item icon="lock" text="Password & Security"></ct-list-item>
	<ct-list-item icon="notifications" text="Notification Preferences"></ct-list-item>
</div>
```

### Action Items

```html
<div class="actions">
	<ct-list-item icon="save" text="Save Changes" @click="${this.saveChanges}"></ct-list-item>
	<ct-list-item icon="delete" text="Delete Item" @click="${this.deleteItem}"></ct-list-item>
	<ct-list-item icon="share" text="Share" @click="${this.share}"></ct-list-item>
</div>
```

## Integration

### With ct-button-menu

Create dropdown menus with list items:

```html
<ct-button-menu>
	<button slot="trigger">Menu</button>
	<ct-list-item icon="content_cut" text="Cut"></ct-list-item>
	<ct-list-item icon="content_copy" text="Copy"></ct-list-item>
	<ct-list-item icon="content_paste" text="Paste"></ct-list-item>
</ct-button-menu>
```

### With Routers

Works with popular routing libraries:

```javascript
import { LitElement, html } from 'lit';
import '@conectate/components/ct-list/ct-list-item.js';
import { router } from 'your-router-library';

class AppNavigation extends LitElement {
  render() {
    return html`
      <nav>
        ${router.routes.map(route => html`
          <ct-list-item
            icon=${route.icon}
            text=${route.name}
            href=${route.path}
            ?selected=${router.currentPath === route.path}>
          </ct-list-item>
        `)}
      </nav>
    `;
  }
}
```

## Styling Examples

### Basic Styling

```css
ct-list-item {
	--ct-icon-size: 24px;
	--color-outline: #e0e0e0;
}
```

### Material Design Style

```css
ct-list-item {
	--ct-list-item--white-space: normal;
	--color-primary: #6200ee;
	border-radius: 4px;
	margin: 4px 0;
}

ct-list-item:hover {
	background-color: rgba(98, 0, 238, 0.08);
}
```

### Navigation Style

```css
ct-list-item {
	--ct-icon-size: 24px;
	height: 48px;
	border-radius: 0 24px 24px 0;
	margin-right: 8px;
}

ct-list-item[selected] {
	background-color: rgba(98, 0, 238, 0.12);
	color: #6200ee;
	font-weight: 500;
}
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
