# @conectate/ct-dialog

<div align="center">
	<a href="https://npmcharts.com/compare/@conectate/ct-dialog?minimal=true">
		<img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/ct-dialog.svg" height="20">
	</a>
	<a href="https://www.npmjs.com/package/@conectate/ct-dialog">
		<img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/ct-dialog.svg" height="20">
	</a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors">
		<img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20">
	</a>
</div>

<br>

A versatile dialog component system with multiple animation styles, confirmations, prompts, loading indicators, and more. Built with Web Components for maximum compatibility.

## Table of Contents

- [Installation](#installation)
- [Components](#components)
- [Basic Usage](#basic-usage)
- [Component API](#component-api)
    - [ct-dialog](#ct-dialog)
    - [ct-card-dialog](#ct-card-dialog)
    - [ct-loading](#ct-loading)
    - [ct-promp](#ct-promp)
    - [ct-confirm](#ct-confirm)
- [Dialog Types](#dialog-types)
- [Styling](#styling)
- [Accessibility](#accessibility)
- [Follow Me](#follow-me)
- [Contributing](#contributing)
- [License](#license)

## Installation

Install via npm, yarn, or pnpm:

```sh
# npm
npm i @conectate/ct-dialog

# yarn
yarn add @conectate/ct-dialog

# pnpm
pnpm i @conectate/ct-dialog
```

## Components

This package includes several dialog components:

| Component              | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `ct-dialog`            | Base dialog component with multiple animation types |
| `ct-card-dialog`       | Dialog with card styling                            |
| `ct-loading`           | Loading dialog with spinner                         |
| `ct-promp`             | Prompt dialog for text input                        |
| `ct-confirm`           | Confirmation dialog with customizable buttons       |
| `ct-confirm-cupertino` | iOS-styled confirmation dialog                      |

## Basic Usage

### Base Dialog

```javascript
import { showCtDialog, closeCtDialog } from "@conectate/ct-dialog";

// Create content for the dialog
const content = document.createElement('div');
content.innerHTML = `
	<h2>Dialog Title</h2>
	<p>This is a custom dialog content.</p>
	<button onclick="closeCtDialog()">Close</button>
`;

// Show the dialog
const dialog = showCtDialog(content);

// Configure dialog animation
dialog.setAnimation('slide-right');

// Close programmatically
dialog.close();
// Or close by ID
closeCtDialog(dialog);
```

### Card Dialog

```javascript
import { showCtCardDialog } from "@conectate/ct-dialog";

// Create content for the card dialog
const content = document.createElement('div');
content.innerHTML = `
	<h2>Card Title</h2>
	<p>This is card content with nice styling.</p>
	<button>Close</button>
`;

// Show the card dialog
const dialog = showCtCardDialog(content);
```

### Loading Dialog

```javascript
import { showCtLoading } from "@conectate/ct-dialog";

// Show a loading dialog
const loadingDialog = showCtLoading();

// Show a loading dialog with custom text
const customLoadingDialog = showCtLoading(undefined, 'Processing');

// Async operation example
async function fetchData() {
	const loading = showCtLoading(undefined, 'Fetching data');
	try {
		await fetch('/api/data');
	} finally {
		loading.close();
	}
}
```

### Prompt Dialog

```javascript
import { showCtPrompt } from "@conectate/ct-dialog";

// Basic prompt
async function getName() {
	const name = await showCtPrompt("Enter Name", "Please enter your name:");
	console.log("Name:", name);
}

// Prompt with custom buttons and options
async function getEmail() {
	const email = await showCtPrompt(
		"Email Address",
		"Please provide your email:",
		"Submit",
		"Cancel",
		undefined,
		{
			label: "Email",
			placeholder: "user@example.com",
			value: "default@example.com"
		}
	);

	if (email) {
		console.log("Email provided:", email);
	} else {
		console.log("User canceled prompt");
	}
}
```

### Confirmation Dialog

```javascript
import { showCtConfirm, showCtConfirmCupertino } from "@conectate/ct-dialog";

// Standard Material Design confirmation
async function confirmAction() {
	const confirmed = await showCtConfirm(
		"Confirm Action",
		"Are you sure you want to proceed?",
		"Yes",
		"No"
	);

	if (confirmed) {
		// User clicked "Yes"
		performAction();
	}
}

// Three-option dialog
async function chooseAction() {
	const result = await showCtConfirm(
		"Choose Action",
		"What would you like to do?",
		"Save",
		"Delete",
		"Cancel"
	);

	if (result === true) {
		// User clicked "Save"
		saveData();
	} else if (result === false) {
		// User clicked "Delete"
		deleteData();
	} else {
		// User clicked "Cancel"
		console.log("Action canceled");
	}
}

// iOS-style confirmation
async function confirmIOS() {
	const confirmed = await showCtConfirmCupertino(
		"Confirm Action",
		"Are you sure you want to proceed?",
		"Yes",
		"No"
	);
}
```

## Component API

### ct-dialog

The base dialog component that all other dialogs build upon.

#### Functions

| Function          | Description                                         | Parameters                                                          | Returns         |
| ----------------- | --------------------------------------------------- | ------------------------------------------------------------------- | --------------- |
| `showCtDialog()`  | Opens a dialog with the provided element as content | `element: HTMLElement`, `id?: string`, `history?: ConectateHistory` | `CtDialog`      |
| `closeCtDialog()` | Closes a specific dialog or all dialogs             | `dialog?: CtDialog`                                                 | `Promise<void>` |

#### Properties

| Property                     | Type      | Default   | Description                          |
| ---------------------------- | --------- | --------- | ------------------------------------ |
| `type`                       | `string`  | `"alert"` | Animation type for the dialog        |
| `interactiveDismissDisabled` | `boolean` | `false`   | Prevents closing by clicking outside |
| `role`                       | `string`  | `"alert"` | ARIA role for the dialog             |

#### Methods

| Method               | Description                                     | Parameters                         |
| -------------------- | ----------------------------------------------- | ---------------------------------- |
| `show()`             | Shows the dialog                                | -                                  |
| `close()`            | Closes the dialog                               | `event?: Event`, `source?: string` |
| `setAnimation()`     | Sets the animation type                         | `type: string`                     |
| `fullscreenMode()`   | Makes the dialog fullscreen                     | -                                  |
| `fullsizeMode()`     | Makes the dialog 80% of window size             | -                                  |
| `enableHistoryAPI()` | Enables or disables browser history integration | `value: boolean`                   |

### ct-card-dialog

A card-styled dialog component.

#### Functions

| Function             | Description                | Parameters                                                          | Returns    |
| -------------------- | -------------------------- | ------------------------------------------------------------------- | ---------- |
| `showCtCardDialog()` | Opens a card-styled dialog | `element: HTMLElement`, `id?: string`, `history?: ConectateHistory` | `CtDialog` |

### ct-loading

A loading dialog with a spinner.

#### Functions

| Function           | Description                                      | Parameters                     | Returns     |
| ------------------ | ------------------------------------------------ | ------------------------------ | ----------- |
| `showCtLoading()`  | Shows a loading dialog                           | `id?: string`, `text?: string` | `CtDialog`  |
| `showCtLoading2()` | Shows a loading dialog and returns the component | `id?: string`, `text?: string` | `CtLoading` |

#### Properties

| Property | Type     | Default     | Description                         |
| -------- | -------- | ----------- | ----------------------------------- |
| `ttl`    | `string` | `"Loading"` | Text to display next to the spinner |

### ct-promp

A dialog with an input field for user input.

#### Functions

| Function         | Description           | Parameters                                                                                                                       | Returns                      |
| ---------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `showCtPrompt()` | Shows a prompt dialog | `title: string`, `body: string\|TemplateResult`, `ok?: string`, `cancel?: string`, `neutral?: string`, `options?: PromptOptions` | `Promise<string\|undefined>` |

#### Options

| Option           | Type      | Default | Description                      |
| ---------------- | --------- | ------- | -------------------------------- |
| `wordwrap`       | `boolean` | `false` | Whether to wrap text in the body |
| `value`          | `string`  | -       | Initial value for the input      |
| `label`          | `string`  | -       | Label for the input              |
| `placeholder`    | `string`  | -       | Placeholder text                 |
| `rawplaceholder` | `string`  | -       | Raw placeholder text             |

### ct-confirm

A confirmation dialog with customizable buttons.

#### Functions

| Function                   | Description                             | Parameters                                                                                                               | Returns                             |
| -------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `showCtConfirm()`          | Shows a standard confirmation dialog    | `title: string`, `body: string`, `ok?: string`, `cancel?: string`, `neutral?: string`, `options?: { history?: boolean }` | `Promise<boolean\|null\|undefined>` |
| `showCtConfirmCupertino()` | Shows an iOS-styled confirmation dialog | `title: string`, `body: string`, `ok?: string`, `cancel?: string`, `neutral?: string`                                    | `Promise<boolean\|null\|undefined>` |

#### Return Values

| Value       | Description                               |
| ----------- | ----------------------------------------- |
| `true`      | User clicked the positive button (ok)     |
| `false`     | User clicked the negative button (cancel) |
| `null`      | User clicked the neutral button           |
| `undefined` | Dialog was dismissed in another way       |

## Dialog Types

The ct-dialog component supports different animation and display styles:

| Type           | Description                      |
| -------------- | -------------------------------- |
| `alert`        | Standard modal dialog (default)  |
| `cupertino`    | iOS-style dialog animation       |
| `slide-right`  | Dialog slides in from the right  |
| `slide-left`   | Dialog slides in from the left   |
| `bottom-sheet` | Dialog slides up from the bottom |

```javascript
const dialog = showCtDialog(content);
dialog.setAnimation('bottom-sheet');
```

## Styling

You can customize the dialog using CSS variables:

```css
ct-dialog {
	--ct-dialog-width: 600px; /* Dialog width */
	--ct-dialog-height: auto; /* Dialog height */
	--ct-dialog-background: white; /* Dialog background color */
	--ct-dialog-border-radius: 8px; /* Dialog border radius */
	--ct-dialog-box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12); /* Dialog shadow */
}

ct-card-dialog {
	--border-radius: 16px; /* Card border radius */
	--color-background: #fff; /* Card background color */
	--color-on-surface: #333; /* Card text color */
	--color-primary: #2cb5e8; /* Scrollbar color */
}
```

## Accessibility

The dialog component supports accessibility features including:

- ARIA roles and attributes
- Focus management
- Keyboard navigation (Escape to close)

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
