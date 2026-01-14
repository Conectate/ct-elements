---
outline: deep
---

# ct-router

A simple but powerful client-side routing system for web applications that supports dynamic imports, authentication checks, and browser history integration.

## Installation

Install via npm or pnpm:

```sh
pnpm i @conectate/components pwa-helpers
# or
npm i @conectate/components pwa-helpers
```

## Basic Usage

The router works by mapping paths to elements or render functions.

```ts
import { CtRouter, Page } from "@conectate/components/ct-router.js";

const pages: Page[] = [
	{
		path: "/",
		element: html`<page-home></page-home>`,
		title: () => "Home - My App",
		auth: null
	},
	{
		path: "/profile/:username",
		element: "page-profile", // Can be a tag name
		from: () => import("./pages/page-profile.js"), // Lazy load
		title: () => "User Profile",
		auth: true // Requires authentication
	}
];

// In your main layout
render() {
	return html`
		<ct-router .pages=${pages} .auth=${this.isLoggedIn}></ct-router>
	`;
}
```

## Global Navigation

You can trigger navigation from anywhere in your code using the `href` utility.

```ts
import { href } from "@conectate/components/ct-router.js";

// Navigate to a new path
href("/settings");

// Navigate with a custom window title
href("/dashboard", "Admin Dashboard");
```

## Properties

| Property | Attribute | Type | Default | Description |
| -------- | --------- | ---- | ------- | ----------- |
| `pages` | - | `Page[]` | `[]` | Array of route definitions |
| `auth` | `auth` | `boolean` | `false` | Global authentication state |
| `loginFallback`| `login-fallback`| `string`| `"/login"` | Path to redirect if auth is required |
| `queryParams` | - | `object` | `{}` | Current URL query parameters |
| `params` | - | `object` | `{}` | Current route path parameters |

## Route Definition (`Page`)

| Property | Type | Description |
| -------- | ---- | ----------- |
| `path` | `string` | Route pattern (e.g., `/user/:id`) |
| `element`| `any` | Element, tag name, or template to render |
| `from` | `function` | Async function to import the page component |
| `auth` | `boolean \| null`| Auth requirement: `true` (required), `false` (public), `null` (any) |
| `title` | `function` | Returns the window title for this route |
| `renderRoot`| `function` | Custom render function for non-Lit frameworks |

## Events

| Event Name | Detail | Description |
| ---------- | ------ | ----------- |
| `location-changed`| `LocationChanged`| Fired when the URL path changes |
| `login-needed`| `{ path: string }`| Fired when a protected route is accessed while `auth` is false |
| `loading` | `boolean` | Fired when a lazy-loaded component starts/ends loading |
| `error-import`| `{ error: any }`| Fired if a dynamic import fails |

## Advanced Features

### Navigation Guards

You can use the `on` method to register a callback that runs before navigation (e.g., to prevent leaving a page with unsaved changes).

```ts
const router = document.querySelector('ct-router');
router.on('beforeunload', async () => {
	if (hasUnsavedChanges) {
		return confirm("You have unsaved changes. Leave?");
	}
	return true;
});
```

### Path Parameters and Query Strings

Parameters are automatically extracted from the URL and passed to the component via properties or event details.

- URL: `/profile/herberth?tab=settings`
- `params`: `{ username: "herberth" }`
- `queryParams`: `{ tab: "settings" }`

## Accessibility (a11y)

The router automatically updates the `document.title` based on the active route's title function, which is critical for screen reader users to understand navigation.


