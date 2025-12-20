# @conectate/components (Conectate Components)

> IMPORTANT: The Conectate Elements are a work in progress and subject to major changes.

`@conectate/components` is a collection of [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) maintained by [@herberthobregon](https://github.com/herberthobregon) that implement [Material Design](https://material.io/design/).

This repo builds and publishes **one single npm package**:

- `@conectate/components`

And components are imported by subpath, for example:

- `import "@conectate/components/ct-button"`
- `import "@conectate/components/ct-icon/ct-icon-button.js"`

## Components

All components live under [`src/`](./src/) and are exposed via subpath imports from `@conectate/components`.

Examples:

- `@conectate/components/ct-button`
- `@conectate/components/ct-dialog`
- `@conectate/components/ct-icon`
- `@conectate/components/ct-icon/icon-list.js`

## Quick start with `ct-button`

#### 1) Install

Install from NPM:

```sh
pnpm i @conectate/components
```

#### 2) Write Raw HTML and JavaScript (without frameworks)

Import the component's JavaScript module, use the component in your HTML, and control it with JavaScript, just like you would with a built-in element such as `<button>`:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Example App</title>

    <!-- Add support for Web Components to older browsers. -->
    <script src="./node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>

    <!-- Your application must load the Roboto and Material Icons fonts. -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
  <body>
    <!-- Use Web Components in your HTML like regular built-in elements. -->
    <ct-button id="myButton" raised>Click Me!</ct-button>

    <!-- The Conectate Elements use standard JavaScript modules. -->
    <script type="module">
      // Importing this module registers <ct-button> as an element that you
      // can use in this page.
      //
      // ====================================================================
      // Note this import is a BARE MODULE specifier, so it must be converted
      // to a path using a server such as es-dev-server.
      // ====================================================================
      import '@conectate/components/ct-button';

      // Standard DOM APIs work with Web Components just like they do for
      // built-in elements.
      const button = document.querySelector('#myButton');
      button.addEventListener('click', () => {
        alert('You clicked!');
      });
    </script>
  </body>
</html>
```

#### 3) Serve

Serve your HTML with any server or build process that supports **bare module specifier resolution** (see next section):

```sh
npm install -g vite
vite
```

## Bare module specifiers

The Conectate Elements are published as standard [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) that use _bare module specifiers_. Bare module specifiers are not yet supported by browsers, so it is necessary to use a tool that transforms
them to a _path_ (for example from `@conectate/components/ct-button` to `./node_modules/@conectate/components/dist/ct-button/ct-button.js`).

### Deep imports (optional)

If you need a specific internal module, you can deep import it as long as it exists in the published `dist/` output, for example:

```js
// for ct-button.js
import "@conectate/components/ct-button";
// Import subpath components
import "@conectate/components/ct-button/ct-button-menu.js";
import "@conectate/components/ct-icon/ct-icon-button.js";
```

> Note: deep imports are more coupled to internal file layout. Prefer `@conectate/components/<component>` when possible.

## Development (this repo)

```sh
pnpm install
pnpm demo
```

Build output is generated into `dist/`:

```sh
pnpm build
```

Two great choices for tools that do this are:

- During local development, use open-wc's [`es-dev-server`](https://open-wc.org/developing/es-dev-server.html) with the `--node-resolve` flag.
- For your production deployment, build your application with [Webpack](http://webpack.js.org/) or [Rollup](https://rollupjs.org/guide/en/) with the [`rollup-plugin-node-resolve`](https://github.com/rollup/rollup-plugin-node-resolve) plugin.

## Fonts

Most applications should include the following tags in their main HTML file to ensure that text and icons
render correctly:

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
```

The Conectate Elements default to using the [Roboto](https://fonts.google.com/specimen/Roboto) font for text. This fonts are _not_ automatically loaded, so it is the application's responsiblity to ensure that they are loaded.
