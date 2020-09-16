[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-lit)
# ct-lit

It's a simple wrapper for LitElement

## Installation

To include this, type:

```sh
$ yarn add @conectate/ct-lit
```
or
```sh
$ npm i @conectate/ct-lit
```

## Usage

```typescript
// Typescript
import { CtLit, html, property, customElement, css } from '@conectate/ct-lit';

@customElement('my-demo')
export class MyDemo extends CtLit {

    static styles = css`
    :host {
        display: block;
    }
    `;

    render() {
        return html`
        `;
    }
}
```

## Properties

| Property | Type                    | Default |
|----------|-------------------------|---------|
| `$`      | `{ [x: string]: any; }` | {}      |

## Methods

| Method      | Type                                             | Description                                      |
|-------------|--------------------------------------------------|--------------------------------------------------|
| `$$`        | `(name: string): HTMLElement \| Element \| undefined \| null` | Returns the first element that is a descendant of node that matches selectors. |
| `$$$`       | `(name: string): NodeListOf<HTMLElement \| Element> \| undefined` | Returns all element descendants of node that match selectors. |
| `deepClone` | `(ob: object): any`                              | Clone all `native` types of object in a new object reference<br /><br />**ob**: Original Object |
| `deleteAt`  | `(listTarget: string, index: number): void`      | Delete item in list<br /><br />**listTarget**: List Target<br />**index**: Index |
| `fire`      | `(name: string, value: any): void`               | Fire a event with name and value                 |
| `insertAt`  | `(listTarget: string, index: number, el: any): void` | Insert Object in list at index<br /><br />**listTarget**: List Target<br />**index**: Index<br />**el**: Object |
| `mapIDs`    | `(): void`                                       | Map all IDs for shadowRoot and save in `this.$` like a polymer element.<br />You should add in the first line of `firstUpdated()` |
| `move`      | `(array: object, old_index: number, new_index: number): void` | Move item in array<br /><br />**array**: Array object<br />**old_index**: Old Index<br />**new_index**: New Index |
| `push`      | `(name: string, value: any): void`               | Set Value and fire event with the same name      |
| `scrollToY` | `(scrollTargetY?: number, time?: number, easing?: "easeInOutSine" \| "easeOutSine" \| "easeInOutQuint" \| "easeInOutCubic", target?: any): void` | **scrollTargetY**: pixels to scroll. Ej: <br />const ticketsBlockPositionY = this.$.contact.getBoundingClientRect().top + window.scrollTarget.scrollTop;<br />**time**: Time to scroll<br />**target**: scrollTarget Element |
| `set`       | `(name: string, value: any): void`               | Set Value and fire event with the same name      |
| `setAt`     | `(listTarget: string, index: number, el: any): void` |                                                  |
| `splice`    | `(name: string, index: number, pos: number, value: any): void` | Set Value and fire event with the same name      |


## Follow me
[![Herberth Obregón](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://twitter.com/herberthobregon)

[https://twitter.com/herberthobregon](https://twitter.com/herberthobregon)

[https://www.conectate.today/herberthobregon](https://www.conectate.today/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

See [LICENSE](/LICENSE)