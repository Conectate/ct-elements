---
outline: deep
---

<script setup>
import { ref } from 'vue'
import '@conectate/components/ct-dialog.js'
import { showCtDialog, closeCtDialog } from '@conectate/components/ct-dialog.js'

const openSimpleDialog = () => {
  const content = document.createElement('div') // or `new CustomView()` where is a custom element;
  content.style.padding = '24px'
  content.style.background = '#fff'
  content.innerHTML = `
    <h2 style="margin-top:0">Simple Dialog</h2>
    <p>This is a raw ct-dialog with custom content.</p>
    <button id="close-btn" style="padding: 8px 16px; cursor: pointer; background: #00aeff; color: white; border: none; border-radius: 4px;">Close Me</button>
  `
  const dialog = showCtDialog(content)
  content.querySelector('#close-btn').onclick = () => dialog.close()
}

const openSlideDialog = () => {
  const content = document.createElement('div')
  content.style.padding = '24px'
  content.style.background = '#fff'
  content.style.height = '100%'
  content.innerHTML = `<h2>Slide Panel</h2><p>Content comes from the right!</p>`
  showCtDialog(content).setAnimation('slide-right')
}
</script>

# ct-dialog

The core dialog component that handles modals, animations, and browser history integration.

## Installation

Install via npm or pnpm:

```sh
pnpm i @conectate/components
# or
npm i @conectate/components
```

## Basic Usage

### Using Helper Functions

The `showCtDialog` function is the standard way to display content in a modal.

```ts
import { showCtDialog } from "@conectate/components/ct-dialog.js";

const content = document.createElement('div');
content.innerHTML = '<div style="padding: 24px;">Hello Dialog</div>';

const dialog = showCtDialog(content);
```

### Example with Vue

<div style="margin: 1rem 0; display: flex; gap: 1rem;">
  <button @click="openSimpleDialog" style="padding: 8px 16px; cursor: pointer; background: #00aeff; color: white; border: none; border-radius: 4px;">
    Open Simple Dialog
  </button>
  <button @click="openSlideDialog" style="padding: 8px 16px; cursor: pointer; background: #00aeff; color: white; border: none; border-radius: 4px;">
    Open Slide Panel
  </button>
</div>

```vue
<template>
	<button @click="openDialog">Show Modal</button>
</template>

<script setup>
import { showCtDialog } from "@conectate/components/ct-dialog.js";

const openDialog = () => {
	const div = document.createElement('div');
	div.innerHTML = '<div style="padding: 24px;"><h3>My Modal</h3><p>Content</p></div>';
	const dialog = showCtDialog(div);

	// Optional: disable clicking outside to close
	dialog.interactiveDismissDisabled = true;
};
</script>
```

## Animation Types

The component supports several animation styles:

- `alert`: Standard center-scaling animation (default)
- `cupertino`: iOS-style scale and blur
- `slide-right`: Slides in from the right edge
- `slide-left`: Slides in from the left edge
- `bottom-sheet`: Slides up from the bottom

```ts
showCtDialog(content).setAnimation('bottom-sheet');
```

## Browser History API

By default, opening a `ct-dialog` adds an entry to the browser's history. This allows users on mobile devices to close the dialog using the hardware "Back" button.

To disable this behavior:

```ts
showCtDialog(content).enableHistoryAPI(false);
```

## Properties

| Property                     | Attribute | Type          | Default   | Description                              |
| ---------------------------- | --------- | ------------- | --------- | ---------------------------------------- |
| `type`                       | `type`    | `string`      | `"alert"` | Animation type                           |
| `interactiveDismissDisabled` | -         | `boolean`     | `false`   | Prevents closing by clicking the overlay |
| `role`                       | `role`    | `string`      | `"alert"` | ARIA role                                |
| `element`                    | -         | `HTMLElement` | -         | Content to display                       |
| `preferences`                | -         | `array`       | `[]`      | Size preferences (e.g. fullscreen)       |

## Methods

| Method                   | Description                                 |
| ------------------------ | ------------------------------------------- |
| `show()`                 | Attaches the dialog to the DOM              |
| `close(event?)`          | Closes the dialog with animation            |
| `setAnimation(type)`     | Sets the animation style                    |
| `fullscreenMode()`       | Sets the dialog to fullscreen               |
| `fullsizeMode()`         | Sets the dialog to 80% width with max-width |
| `enableHistoryAPI(bool)` | Enables or disables history integration     |

## CSS Variables

You can customize the dialog container using these variables:

```css
ct-dialog {
	/* Dimensions */
	--ct-dialog-width: 25cm;
	--ct-dialog-height: 80%;

	/* Layering */
	--zi-modal: 110; /* Z-index */
}

/* For overlays */
ct-dialog::part(overlay) {
	background-color: rgba(0, 0, 0, 0.65);
}
```

## Accessibility (a11y)

The component handles:

- **Focus Trap**: Keeps focus within the dialog while it's open.
- **Escape Key**: Closes the dialog when the Escape key is pressed.
- **Scroll Lock**: Automatically hides the background scrollbar when a dialog is active.
- **Semantic Roles**: Uses `aria-modal="true"` and appropriate roles.
