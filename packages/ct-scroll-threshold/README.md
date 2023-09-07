[![Published on NPM](https://img.shields.io/npm/v/@conectate/ct-scroll-threshold.svg)](https://www.npmjs.com/package/@conectate/ct-scroll-threshold)
[![Build status](https://travis-ci.org/PolymerElements/ct-scroll-threshold.svg?branch=master)](https://travis-ci.org/PolymerElements/ct-scroll-threshold)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@conectate/ct-scroll-threshold)

## &lt;ct-scroll-threshold&gt;

`ct-scroll-threshold` is a utility element that listens for `scroll` events from a
scrollable region and fires events to indicate when the scroller has reached a pre-defined
limit, specified in pixels from the upper and lower bounds of the scrollable region.
This element may wrap a scrollable region and will listen for `scroll` events bubbling
through it from its children. In this case, care should be taken that only one scrollable
region with the same orientation as this element is contained within. Alternatively,
the `scrollTarget` property can be set/bound to a non-child scrollable region, from which
it will listen for events.

Once a threshold has been reached, a `lower-threshold`<!--  or `upper-threshold` --> event will
be fired, at which point the user may perform actions such as lazily-loading more data
to be displayed. After any work is done, the user must then clear the threshold by
calling the `clearTriggers` method on this element, after which it will
begin listening again for the scroll position to reach the threshold again assuming
the content in the scrollable region has grown. If the user no longer wishes to receive
events (e.g. all data has been exhausted), the threshold property in question (e.g.
`lowerThreshold`) may be set to a falsy value to disable events and clear the associated
triggered property.

See: [Documentation](https://github.com/Conectate/ct-elements/tree/master/packages/ct-scroll-threshold),

<!-- [Demo](https://github.com/conectate/ct-scroll-threshold/demo/demo/index.html). -->

## Usage

### Installation

```bash
npm i --save @conectate/ct-scroll-threshold
# or
yarn add @conectate/ct-scroll-threshold
# or for disk savers
pnpm add @conectate/ct-scroll-threshold
```

### In an html file

```html
<html>
	<head>
		<script type="module">
			// Use bare imports!
			// you can use `vitejs` to sprin up a complete server:
			// npm i -g vite && vite
			import '@conectate/ct-scroll-threshold/ct-scroll-threshold.js';
		</script>
	</head>
	<body>
		<ct-scroll-threshold id="ctScrollTheshold">
			<div>content</div>
		</ct-scroll-threshold>

		<script>
			const ctScrollTheshold = document.querySelector('#ctScrollTheshold');
			ctScrollTheshold.addEventListener('lower-threshold', () => {
			    console.log('lower-threshold triggered');
			    // load async stuff. e.g. XHR
			    setTimeout(() => {
			        ctScrollTheshold.clearTriggers();
			    });
			});
		</script>
	</body>
</html>
```

### In a LitElement

```js
import { LitElement, html } from 'lit';
import '@conectate/ct-scroll-threshold';

class SampleElement extends LitElement {
    render() {
        return html`
            <ct-scroll-threshold id="ctScrollTheshold" @lower-threshold="${this._loadMoreData}">
                <div>content</div>
            </ct-scroll-threshold>
        `;
    }

    _loadMoreData() {
        console.log('lower-threshold triggered');
        // load async stuff. e.g. XHR
        setTimeout(() => {
            this.$.ctScrollTheshold.clearTriggers();
        });
    }
}
customElements.define('sample-element', SampleElement);
```

## Contributing

If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation

```sh
git clone https://github.com/@conectate/ct-elements.git
cd ct-elements
# with npm
npm i
npm run demo
# or without npm
yarn
yarn demo
# or with disk savers, pnpm
pnpm i
pnpm demo
```

### Running the demo locally

```sh
pnpm demo
```
