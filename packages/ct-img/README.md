# `ct-img`

HTML image loader, this component if the lazy loading of the browser is available it will use it, otherwise it will create an IntersectionObserver to find the scroll position and thus display the image at the precise moment.
You can configure which is the scroll target if it was not the body

> To use `lazy loading` you must specify `srcset` as attribute instead of `src`.

## Example

```html
<!-- Lazy loading -->
<ct-img srcset="https://example.com/img.png" lazy></ct-img>
<!-- Lazy loading with custom scroll target (viewport) in lit-element -->
<ct-img srcset="https://example.com/img.png" lazy .viewport=${this.customEleent}></ct-img>

<!-- Lazy loading with custom scroll target (viewport) in vanilla-->
<ct-img id="img" srcset="https://example.com/img.png" lazy></ct-img>
<script>
    document.getElementById('img').viewport = document.getElementById('scrollTarget');
</script>

<!-- background size: contain -->
<ct-img src="https://example.com/img.png" contain></ct-img>
```
## Attributes

| Attribute             | Type              | Description                 |
|-----------------------|-------------------|-----------------------------|
| `background-position` | `'left'|'right'` | Position of Backgroud       |
| `contain`             | `Boolean`         | For contain background size |

## Properties

| Property         | Attribute        | Type                    | Default                                          |
|------------------|------------------|-------------------------|--------------------------------------------------|
| `$`              |                  | `{ [x: string]: any; }` |                                                  |
| `alt`            | `alt`            | `string`                | ""                                               |
| `lazy`           | `lazy`           | `boolean`               | false                                            |
| `onErrorSrc`     | `onErrorSrc`     | `string`                | "'data:image/svg+xml,' + encodeURIComponent('<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path fill=\"#CCC\" d=\"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z\"/></svg>')" |
| `placeholderImg` | `placeholderImg` | `string`                | ""                                               |
| `round`          | `round`          | `boolean`               | false                                            |
| `src`            | `src`            | `string`                | ""                                               |
| `srcset`         | `srcset`         | `string \| undefined`   |                                                  |
| `viewport`       | `viewport`       | `HTMLElement`           | "body"                                           |

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
| `move`      | `(array: any[], old_index: number, new_index: number): void` | Move item in array<br /><br />**array**: Array object<br />**old_index**: Old Index<br />**new_index**: New Index |
| `push`      | `(name: string, value: any): void`               | Set Value and fire event with the same name      |
| `scrollToY` | `(scrollTargetY?: number \| undefined, time?: number \| undefined, easing?: "easeInOutSine" \| "easeOutSine" \| "easeInOutQuint" \| "easeInOutCubic" \| undefined, target?: Element \| undefined): void` | **scrollTargetY**: pixels to scroll. Ej:<br />const ticketsBlockPositionY = this.$.contact.getBoundingClientRect().top + window.scrollTarget.scrollTop;<br />**time**: Time to scroll<br />**target**: scrollTarget Element |
| `set`       | `(name: string, value: any): void`               | Set Value and fire event with the same name      |
| `setAt`     | `(listTarget: string, index: number, el: any): void` |                                                  |
| `splice`    | `(name: string, index: number, pos: number, value: any): void` | Set Value and fire event with the same name      |
