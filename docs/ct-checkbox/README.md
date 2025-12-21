[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-checkbox)

# ct-checkbox

A customizable checkbox web component built with LitElement.

## Installation

```sh
# npm
npm i @conectate/components/ct-checkbox

# yarn
yarn add @conectate/components/ct-checkbox

# pnpm
pnpm i @conectate/components/ct-checkbox
```

## Usage

### Basic Usage

```javascript
import '@conectate/components/ct-checkbox';

// Then use in your HTML
<ct-checkbox>Check me</ct-checkbox>
```

### Examples

```html
<!-- Basic checkbox -->
<ct-checkbox>Basic checkbox</ct-checkbox>

<!-- Pre-checked checkbox -->
<ct-checkbox checked>Pre-checked</ct-checkbox>

<!-- With label property -->
<ct-checkbox label="Using label property"></ct-checkbox>

<!-- Indeterminate state -->
<ct-checkbox indeterminate>Indeterminate</ct-checkbox>

<!-- Disabled checkbox -->
<ct-checkbox disabled>Disabled</ct-checkbox>

<!-- With value and name -->
<ct-checkbox name="accept" value="terms">Accept terms</ct-checkbox>
```

### Event Handling

```javascript
// Listen for state changes
const checkbox = document.querySelector('ct-checkbox');
checkbox.addEventListener('checked', (e) => {
  console.log('Checkbox checked:', e.detail.checked);
});

// Standard change event is also dispatched
checkbox.addEventListener('change', (e) => {
  console.log('Change event fired');
});
```

## Theming

The ct-checkbox component can be customized using CSS custom properties:

```css
ct-checkbox {
	/* Size and shape */
	--ct-checkbox-box-size: 24px;
	--ct-checkbox-box-border-radius: 8px;
	--ct-checkbox-height: var(--ct-checkbox-box-size);
	--ct-checkbox-box-border-size: 3px;

	/* Colors */
	--color-primary: #2cb5e8;
	--color-on-primary: #fff;
	--color-on-background: #535353;
}
```

## API

### Properties

| Property        | Attribute       | Type      | Default | Description                        |
| --------------- | --------------- | --------- | ------- | ---------------------------------- |
| `checked`       | `checked`       | `boolean` | `false` | Checkbox checked state             |
| `indeterminate` | `indeterminate` | `boolean` | `false` | Checkbox indeterminate state       |
| `disabled`      | `disabled`      | `boolean` | `false` | Disables the checkbox              |
| `value`         | `value`         | `any`     | -       | Value associated with the checkbox |
| `name`          | `name`          | `string`  | `""`    | Name attribute for form submission |
| `label`         | `label`         | `string`  | `""`    | Text label (alternative to slot)   |

### Methods

| Name      | Description                          |
| --------- | ------------------------------------ |
| `click()` | Programmatically clicks the checkbox |

### Events

| Event Name | Detail                      | Description                      |
| ---------- | --------------------------- | -------------------------------- |
| `checked`  | `{checked: boolean}`        | Fires when checked state changes |
| `change`   | Native event (redispatched) | Standard input change event      |

### Slots

| Name        | Description                           |
| ----------- | ------------------------------------- |
| `(default)` | Content is used as the checkbox label |

## Styling

### Shadow Parts

The component uses internal styling but can be customized with CSS custom properties.

### CSS Custom Properties

| Property                          | Description                                 |
| --------------------------------- | ------------------------------------------- |
| `--ct-checkbox-box-size`          | Size of the checkbox (default: 24px)        |
| `--ct-checkbox-box-border-radius` | Border radius of checkbox (default: 8px)    |
| `--ct-checkbox-height`            | Height of the checkbox component            |
| `--ct-checkbox-box-border-size`   | Border size of unchecked box (default: 3px) |
| `--color-primary`                 | Color used for the checked state            |
| `--color-on-primary`              | Color of the checkmark                      |
| `--color-on-background`           | Color of the unchecked checkbox border      |

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

- v1.0.1 Initial Release

## License

See [LICENSE](/LICENSE)
