<h1 align="center">@conectate/components/ct-router</h1>

<p align="center">
	<a href="https://npmcharts.com/compare/@conectate/components/ct-router?minimal=true"><img alt="Downloads per month" src="https://img.shields.io/npm/dm/@conectate/components/ct-router.svg" height="20"/></a>
	<a href="https://www.npmjs.com/package/@conectate/components/ct-router"><img alt="NPM Version" src="https://img.shields.io/npm/v/@conectate/components/ct-router.svg" height="20"/></a>
	<a href="https://github.com/conectate/ct-elements/graphs/contributors"><img alt="Contributors" src="https://img.shields.io/github/contributors/conectate/ct-elements.svg" height="20"/></a>
</p>

# ct-router

It's a simple routing system that changes the viewport depending on the route given

## Installation

To include this, type:

```sh
$ pnpm i @conectate/components/ct-router
or
$ npm i @conectate/components/ct-router
```

### TLDR;

#### Bind properties to templated elements in LitElement

You can insert JavaScript expressions as placeholders for HTML text content, attributes, Boolean attributes, properties, and event handlers.

- Text content: `<p>${...}</p>`
- Attribute: `<p id="${...}"></p>`
- Boolean attribute: `?disabled="${...}"`
- Property: `.value="${...}"`
- Event handler: `@event="${...}"`

## Usage

### Step 1

Add to your html\`\` (Litelement Template) like this:

```html
<ct-router id="ctrouter" ?auth="${this.isLogged}" @login-needed="${this.loginNeeded}" @loading="${this.isLoading}" @location-changed="${this.pathChanged}"> </ct-router>
```

### Step 2

### Full LitElement example in Typescript

```typescript
import "@conectate/components/ct-router";

import { CtLit, customElement, html, property, state } from "@conectate/components/ct-lit"; /* or 'lit' */
import { href } from "@conectate/components/ct-router";

@customElement("my-router")
class MyRouter extends CtLit {
	@property({ type: Boolean }) isLogged = false;
	@query("#ctrouter") $ctrouter!: HTMLElementTagNameMap["ct-router"];
	/*
  You can use lit-html @event bindings in your template inside the render function to add event listeners to your component.
  You can use lit-html '?' bindings in your template inside the render function to add boolean property.
  */
	@state() private pages = [
		{
			path: "/page1",
			element: html`<page-number1></page-number1>`, // you cand use html``
			from: () => import("./src/page-number1"),
			auth: false,
			title: () => `Page 1 • Example.com`
		},
		{
			path: "/profile",
			element: "<my-profile></my-profile>", // or you cand use a simple string
			from: () => import("./src/my-profile"),
			auth: true,
			title: () => `Profile • Example.com`
		},
		{
			path: "/404",
			element: html`<page-404></page-404>`,
			from: () => import("./src/page-404"),
			auth: false,
			title: () => null
		}
	];

	render() {
		return html` <ct-router
			id="ctrouter"
			loginFallback="/404"
			.pages=${this.pages}
			?auth=${this.isLogged}
			@login-needed=${this.loginNeeded}
			@loading=${this.isLoading}
			@location-changed=${this.pathChanged}
		>
		</ct-router>`;
	}

	firstUpdated(_changedProperties: Map<string, any>) {
		// set if user is not isAnonymous
		this.isLogged = true; // !firebase.auth().currentUser.isAnonymous
	}

	/* =================== (optional) DEBUG ROUTER =================== */
	/* You can view state of you web */
	printCurrentState() {
		// More details in interface LocationChanged
		console.log("Current patternMatched", this.$ctrouter.path);
		console.log("Current pathname", this.$ctrouter.pathname);
		console.log("Current queryParams", this.$ctrouter.queryParams);
		console.log("Current params", this.$ctrouter.params);
		console.log("is Logged?", this.$ctrouter.auth);
	}

	loginNeeded(e: CustomEvent<{ path: string }>) {
		let path = e.detail.path;
		alert(`loginNeeded on: ${path}`);
	}

	isLoading(e: CustomEvent<boolean>) {
		console.log("loading...", e.detail);
	}

	pathChanged(e: CustomEvent<LocationChanged>) {
		console.log("path changed", location.href);
		console.log("patternMatched", this.$ctrouter.path, "==", e.detail.path);
		console.log("pathname", this.$ctrouter.pathname, "==", e.detail.pathname, "==", location.pathname);
		console.log(this.$ctrouter.queryParams, "==", e.detail.queryParams);
		console.log(this.$ctrouter.params, "==", e.detail.params);
	}
}

interface LocationChanged {
	//patternMatched like a: /:profile/preferences
	path: string;
	// pathname like a: /herberthobregon/preferences
	pathname: string;
	// if path is /home?hello=word then queryParams is { hello : "world" }
	queryParams?: { [x: string]: string };
	// if href is /herberth/preference and path is /:username/preference then params is { username : "herberth" }
	params?: { [x: string]: string };
}
```

### Example in React

> Important! Disable HMR in your Dev server. I recommend use `vitejs` for best performance.

```tsx
function App() {
	let pages: Page[] = [
		{
			path: "/",
			renderRoot: root => ReactDOM.render(<MainApp />, root!),
			auth: false,
			title: () => `Page 1 • Example.com`
		},
		{
			path: "/page2",
			renderRoot: root => ReactDOM.render(<Page2 />, root!),
			auth: false,
			title: () => `Page 2 • Example.com`
		},
		{
			path: "/404",
			renderRoot: root => ReactDOM.render(<Page404 />, root!),
			auth: false,
			title: () => `404 Not Found • Example.com`
		}
	];
	const router = useRef<HTMLElement>(null);
	useEffect(() => {
		const ctrouter = router.current;
		// ctrouter.addEventListener('login-needed',this.loginNeeded);
		// ctrouter.addEventListener('loading',this.isLoading);
		// ctrouter.addEventListener('location-changed',this.pathChanged);
	});
	return (
		<div>
			<header>My App</header>
			<CtRouter ref={router} pages={pages} unmountComponentAtNode={root => ReactDOM.unmountComponentAtNode(root)}></CtRouter>
		</div>
	);
}

export default App;
```

If you plan to manage the dynamic imports, skip `from` attr

```js
this.$ctrouter.pages = [
  {
    path: "/page1",
    element: html`<page-number1></page-number1>`,
    from: () => null,
    auth: false,
    title: () => `Page 1 • Example.com`
  }
]
```

### Dinamic Routing

You can use `:id` to varible path and `*` for any path or your own `regexp`

```js
{
  path: "/page/:id",
  element: html`<page-number1></page-number1>`,
  from: () => null,
  auth: false,
  title: () => `Page 1 • Example.com`
}
```

or

```js
{
  path: "/register/:page?",
  // in this regexp use /(group 1)/(group 2)
  regex : /^\/(register|registro)\/([^\/]+)(?:\/)?$/i,
  groups : ['_group1','page'],
  element: html`<login-register></login-register>`,
  from: () => import("./src/login-register"),
  auth: null,
  title: () => `${window.register} • Example.com`
}
```

### Auth

There are pages that only a user with session started can see.
for this it passes a Boolean parameter to auth of `ct-router`

```html
?auth=${this.isLogged}
```

# Add `beforeunload` listener example

The beforeunload event is fired when the `location` has changed, The document and its resources are about to be unloaded. The document is still visible and the event is still cancelable at this point.

⚠️⚠️⚠️ This listener mimics the behavior of `window.onbeforeunload` but is not the same. If you need to know if it reloads the page or if you are exiting your web page, use the `window.onbeforeunload` method.

```typescript
import {CtLit, html, property, customElement, internalProperty } from 'lit'; /* or 'lit' */
import { showCtConfirm } from '@conectate/components/ct-dialog/ct-confirm';
import '@conectate/components/ct-router';

@customElement('my-router')
class MyRouter extends LitElement{
  listenerID = 0;

  render(){
    return html`...`
  }
  firstUpdated(_changedProperties: Map<string, any>) {
    // get data from server
    // ...

    this.listenerID = window.ctrouter?.on('beforeunload', async () => {
      let rsp:boolean = await showCtConfirm('Reload site?', 'Changes you made may not be saved.', "Reload" , "Stay", undefined, { history: false });
      if (rsp) window.ctrouter.deleteListener(this.listenerID);
      return rsp;
		});
  }

  saveData(){
    window.ctrouter.deleteListener(this.listenerID);
    // To-Do Save info
  }
```

## Follow me

[![Herberth_thumb](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://x.com/herberthobregon)

[https://x.com/herberthobregon](https://x.com/herberthobregon)

[https://dev.to/herberthobregon](https://dev.to/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

See [LICENSE](/LICENSE)
