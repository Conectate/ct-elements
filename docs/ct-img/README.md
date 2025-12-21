# @conectate/components/ct-img

<div align="center">
	<a href="https://npmcharts.com/compare/@conectate/components/ct-img?minimal=true">
		<img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/components/ct-img.svg" height="20">
	</a>
	<a href="https://www.npmjs.com/package/@conectate/components/ct-img">
		<img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/components/ct-img.svg" height="20">
	</a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors">
		<img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20">
	</a>
</div>

<br>

An advanced image loader component with smart lazy loading capabilities, elegant loading transitions, and extensive customization options.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Basic Usage](#basic-usage)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)
    - [Properties](#properties)
    - [Attributes](#attributes)
    - [Events](#events)
    - [CSS Custom Properties](#css-custom-properties)
- [Lazy Loading](#lazy-loading)
- [Styling Examples](#styling-examples)
- [Performance Tips](#performance-tips)
- [Browser Support](#browser-support)
- [Follow Me](#follow-me)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install via npm, yarn, or pnpm:

```sh
# npm
npm i @conectate/components/ct-img

# yarn
yarn add @conectate/components/ct-img

# pnpm
pnpm i @conectate/components/ct-img
```

## Features

- **Smart Lazy Loading**: Uses native browser lazy-loading where available, with fallback to IntersectionObserver
- **Placeholder Support**: Display placeholder images while the main image loads
- **Error Handling**: Shows fallback image when the main image fails to load
- **Smooth Transitions**: Elegant fade-in animations when images load
- **Styling Options**: Support for circular images, contained backgrounds, and custom positions
- **Custom Viewport**: Define a custom scrollable container for precise lazy loading control
- **Accessibility**: Built with proper alt text support

## Basic Usage

Import the component and use it in your HTML:

```javascript
// Import the component
import '@conectate/components/ct-img';
```

```html
<!-- Basic image -->
<ct-img src="image.jpg" alt="Description"></ct-img>

<!-- Lazy loading (loads only when visible) -->
<ct-img srcset="image.jpg" lazy alt="Description"></ct-img>

<!-- Circular image (great for avatars) -->
<ct-img src="profile.jpg" round alt="Profile picture"></ct-img>

<!-- Image with placeholder while loading -->
<ct-img src="large-image.jpg" placeholder-img="placeholder.jpg" alt="Description"></ct-img>
```

## Advanced Usage

### Custom Viewport for Lazy Loading

You can define a custom scrollable element as the viewport for lazy loading:

```html
<div id="scrollContainer" style="height: 300px; overflow: auto;">
	<ct-img id="lazyImg" srcset="image.jpg" lazy alt="Lazy loaded image"></ct-img>
</div>

<script>
	document.getElementById('lazyImg').viewport = document.getElementById('scrollContainer');
</script>
```

### Using in LitElement

```javascript
import { LitElement, html } from 'lit';
import '@conectate/components/ct-img';

class MyElement extends LitElement {
  render() {
    return html`
      <ct-img
        src="image.jpg"
        lazy
        alt="My image">
      </ct-img>
    `;
  }
}
```

### Background Size and Position

```html
<!-- Contained background (doesn't crop) -->
<ct-img src="image.jpg" contain alt="Contained image"></ct-img>

<!-- Left-aligned background -->
<ct-img src="image.jpg" background-position="left" alt="Left-aligned image"></ct-img>

<!-- Right-aligned background -->
<ct-img src="image.jpg" background-position="right" alt="Right-aligned image"></ct-img>
```

## API Reference

### Properties

| Property               | Type          | Default           | Description                            |
| ---------------------- | ------------- | ----------------- | -------------------------------------- |
| `src`                  | `string`      | `""`              | URL of the image to display            |
| `srcset`               | `string`      | `undefined`       | Source set (use for lazy loading)      |
| `alt`                  | `string`      | `""`              | Alternative text for accessibility     |
| `lazy`                 | `boolean`     | `false`           | Enables lazy loading                   |
| `round`                | `boolean`     | `false`           | Makes the image circular               |
| `disable_anim`         | `boolean`     | `false`           | Disables fade-in animations            |
| `intersectionobserver` | `boolean`     | `false`           | Forces use of IntersectionObserver     |
| `viewport`             | `HTMLElement` | `document.body`   | Scrollable container for lazy loading  |
| `placeholderImg`       | `string`      | `""`              | URL of placeholder image while loading |
| `onErrorSrc`           | `string`      | `"[default SVG]"` | URL of image to show on error          |

### Attributes

| Attribute             | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| `contain`             | Uses background-size: contain instead of cover                 |
| `background-position` | Position of background: "left", "right", or "center" (default) |

### Events

| Event            | Description                                  |
| ---------------- | -------------------------------------------- |
| `loaded-changed` | Fired when the image has loaded successfully |

### CSS Custom Properties

| Property                 | Description                | Default |
| ------------------------ | -------------------------- | ------- |
| `--ct-img-border-radius` | Border radius of the image | `0px`   |

## Lazy Loading

For optimal lazy loading, use the `srcset` attribute instead of `src` when the `lazy` attribute is enabled:

```html
<ct-img srcset="image.jpg" lazy alt="Lazy loaded image"></ct-img>
```

The component will automatically:

1. Use native `loading="lazy"` if supported by the browser
2. Fall back to IntersectionObserver when native lazy loading is unavailable
3. Automatically load and use a polyfill for IntersectionObserver if needed

## Styling Examples

### Basic Responsive Image

```html
<style>
	.responsive-img {
		width: 100%;
		height: auto;
		max-width: 800px;
	}
</style>

<ct-img class="responsive-img" src="image.jpg" alt="Responsive image"></ct-img>
```

### Avatar Style

```html
<style>
	.avatar {
		width: 80px;
		height: 80px;
		--ct-img-border-radius: 50%;
		border: 3px solid white;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}
</style>

<ct-img class="avatar" src="profile.jpg" alt="User avatar"></ct-img>
```

### Gallery Image

```html
<style>
	.gallery-img {
		width: 300px;
		height: 200px;
		--ct-img-border-radius: 8px;
		transition: transform 0.3s ease;
	}
	.gallery-img:hover {
		transform: scale(1.05);
	}
</style>

<ct-img class="gallery-img" src="gallery-image.jpg" alt="Gallery image"></ct-img>
```

## Performance Tips

- Always use the `lazy` attribute for images below the fold
- Provide appropriately sized images (don't load huge images for small containers)
- Use the `placeholder-img` attribute with a low-resolution or blurred version of the image
- Consider using a CDN that can serve optimized images based on device capabilities

## Browser Support

- Modern browsers: Chrome, Firefox, Safari, Edge
- For older browsers, a polyfill for IntersectionObserver is automatically loaded as needed

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
