[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-collapse)

# ct-collapse

A collapsible content component that can smoothly expand and collapse with animation.

## Installation

```sh
# npm
npm i @conectate/components/ct-collapse

# yarn
yarn add @conectate/components/ct-collapse

# pnpm
pnpm i @conectate/components/ct-collapse
```

## Usage

### Basic Usage

```javascript
import '@conectate/components/ct-collapse';

// Then use in your HTML
<ct-collapse>
  <div>This content can be expanded or collapsed</div>
</ct-collapse>
```

### Examples

```html
<!-- Basic collapsed content (default state) -->
<ct-collapse>
	<div>This content is collapsed by default</div>
</ct-collapse>

<!-- Initially expanded content -->
<ct-collapse opened>
	<div>This content is expanded by default</div>
</ct-collapse>

<!-- Multiple content elements should be wrapped in a container -->
<ct-collapse>
	<div>
		<h3>Collapsed Section Title</h3>
		<p>First paragraph</p>
		<p>Second paragraph</p>
	</div>
</ct-collapse>
```

### Controlling from JavaScript

```javascript
// Get reference to the element
const collapse = document.querySelector('ct-collapse');

// Toggle the collapse state
collapse.toggle();

// Or set directly
collapse.opened = true;  // expand
collapse.opened = false; // collapse
```

## API

### Properties

| Property | Attribute | Type      | Default | Description                                       |
| -------- | --------- | --------- | ------- | ------------------------------------------------- |
| `opened` | `opened`  | `boolean` | `false` | Controls whether content is expanded or collapsed |

### Methods

| Name       | Description                                  |
| ---------- | -------------------------------------------- |
| `toggle()` | Toggles between expanded and collapsed state |

### Events

This component doesn't emit any custom events.

### Slots

| Name        | Description                                                                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `(default)` | Content to be collapsed/expanded. Only one direct child element is supported. To include multiple elements, wrap them in a container element. |

## Styling

### CSS Custom Properties

The component uses internal styling but can be customized by wrapping in a container or styling the content within.

### Internal styles

The collapse animation is handled automatically. The component:

- Uses a 250ms transition for all properties
- Calculates the appropriate height for the content
- Manages overflow properties during transition

## Notes

- 🔔 Only **ONE** direct child element is supported. If you need to collapse multiple elements, wrap them in a container.
- The component automatically calculates required heights for smooth animations.
- The transition duration is fixed at 250ms.

## Follow me

[![Herberth Obregón](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://x.com/herberthobregon)

[https://x.com/herberthobregon](https://x.com/herberthobregon)

[https://dev.to/herberthobregon](https://dev.to/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

- v1.0.0 Initial Release

## License

See [LICENSE](/LICENSE)
