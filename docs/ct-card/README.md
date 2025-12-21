[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-card)

# ct-card

A stylized container component that provides a surface for displaying content.

## Installation

To include this, type:

```sh
$ pnpm i @conectate/components/ct-card
# or
$ npm i @conectate/components/ct-card
```

## Usage

```html
<!-- Basic card -->
<ct-card>Basic card</ct-card>

<!-- With decorator (top border) -->
<ct-card decorator>Card with decorator</ct-card>

<!-- With border -->
<ct-card withborder>Card with border</ct-card>

<!-- With padding -->
<ct-card padding>Card with padding</ct-card>

<!-- With theme -->
<ct-card primary>Primary themed card</ct-card>
<ct-card secondary>Secondary themed card</ct-card>
<ct-card tertiary>Tertiary themed card</ct-card>
<ct-card error>Error themed card</ct-card>
```

### Using Card Content and Actions

```html
<ct-card>
	<div class="card-content">This is the main content of the card.</div>
	<div class="card-actions">
		<button>Action 1</button>
		<button>Action 2</button>
	</div>
</ct-card>
```

## Theming

This component uses CSS custom properties for theming:

| Property                       | Description                                   |
| ------------------------------ | --------------------------------------------- |
| --border-radius                | Border radius of the card (default: 16px)     |
| --color-surface                | Background color                              |
| --color-on-surface             | Text color                                    |
| --color-primary-container      | Background for primary variant                |
| --color-on-primary-container   | Text color for primary variant                |
| --color-secondary-container    | Background for secondary variant              |
| --color-on-secondary-container | Text color for secondary variant              |
| --color-tertiary-container     | Background for tertiary variant               |
| --color-on-tertiary-container  | Text color for tertiary variant               |
| --color-error-container        | Background for error variant                  |
| --color-on-error-container     | Text color for error variant                  |
| --color-outline                | Border color when using withborder attribute  |
| --color-app                    | Color for the decorator (top border)          |
| --ct-card-box-shadow           | Custom box-shadow when using shadow attribute |

## API

### Properties

| Property   | Type    | Default | Description                   |
| ---------- | ------- | ------- | ----------------------------- |
| decorator  | Boolean | false   | Add border-top with color-app |
| withborder | Boolean | false   | Add border around the card    |
| primary    | Boolean | false   | Apply primary theme colors    |
| secondary  | Boolean | false   | Apply secondary theme colors  |
| tertiary   | Boolean | false   | Apply tertiary theme colors   |
| error      | Boolean | false   | Apply error theme colors      |
| shadow     | Boolean | false   | Add box-shadow (deprecated)   |
| padding    | Boolean | false   | Add 16px padding to the card  |

### Slots

| Name      | Description                   |
| --------- | ----------------------------- |
| (default) | Main content area of the card |

### CSS Classes

You can use these classes inside the card to get predefined styles:

| Class         | Description                          |
| ------------- | ------------------------------------ |
| .card-actions | For action buttons (adds top border) |
| .card-content | For content (adds padding)           |

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
