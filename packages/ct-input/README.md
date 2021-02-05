# ct-input

## `ct-input`
Input element

## Example

```javascript
demo/index.html
```

## Properties

| Property         | Attribute        | Type                                             | Default            | Description                                      |
|------------------|------------------|--------------------------------------------------|--------------------|--------------------------------------------------|
| `$`              |                  | `{ [x: string]: any; }`                          |                    |                                                  |
| `accept`         | `accept`         | `string`                                         | ""                 |                                                  |
| `autocomplete`   | `autocomplete`   | `"on" \| "off" \| "additional-name" \| "address-level1" \| "address-level2" \| "address-level3" \| "address-level4" \| "address-line1" \| "address-line2" \| "address-line3" \| "bday" \| ... 50 more ... \| "work"` | "off"              |                                                  |
| `autofocus`      | `autofocus`      | `boolean`                                        | false              |                                                  |
| `charCounter`    | `charCounter`    | `boolean`                                        | false              | -                                                |
| `countChar`      | `countChar`      | `number`                                         | 0                  | Total chars on input                             |
| `disabled`       | `disabled`       | `boolean`                                        | false              | -                                                |
| `errorMessage`   | `errorMessage`   | `string`                                         | ""                 | Mensaje de error al no complir con el pattern    |
| `inputmode`      | `inputmode`      | `"" \| "email" \| "tel" \| "url" \| "verbatim" \| "latin" \| "latin-name" \| "latin-prose" \| "full-width-latin" \| "kana" \| "kana-name" \| "katakana" \| "numeric"` | ""                 |                                                  |
| `invalid`        |                  | `boolean`                                        |                    |                                                  |
| `label`          | `label`          | `string`                                         | ""                 | Change default icon to whatever you like         |
| `max`            | `max`            | `string`                                         | ""                 |                                                  |
| `maxlength`      | `maxlength`      | `number`                                         | "MAX_SAFE_INTEGER" | Max length on input                              |
| `min`            | `min`            | `string`                                         | ""                 |                                                  |
| `minlength`      | `minlength`      | `number`                                         | 0                  |                                                  |
| `multiple`       | `multiple`       | `boolean`                                        | false              |                                                  |
| `name`           | `name`           | `string`                                         | ""                 |                                                  |
| `noHover`        | `noHover`        | `boolean`                                        | false              | Do not show any effects when hovering the searchbox |
| `pattern`        | `pattern`        | `string \| RegExp`                               | ""                 | regexp                                           |
| `placeholder`    | `placeholder`    | `string`                                         | ""                 | Placeholder text when searchbox is empty         |
| `raiseForced`    | `raiseForced`    | `boolean`                                        | false              | Always raise the searchbox whether it is active or not, or whether is has value or not |
| `raiseOnActive`  | `raiseOnActive`  | `boolean`                                        | false              | Raise searchbox is it's focused                  |
| `raiseOnValue`   | `raiseOnValue`   | `boolean`                                        | false              | Raise searchbox if it has value                  |
| `rawPlaceholder` | `rawPlaceholder` | `string`                                         | ""                 | Placeholder text when searchbox is empty         |
| `readonly`       | `readonly`       | `boolean`                                        | false              |                                                  |
| `required`       | `required`       | `boolean`                                        | false              | -                                                |
| `size`           | `size`           | `number`                                         | 24                 |                                                  |
| `step`           | `step`           | `string`                                         | ""                 |                                                  |
| `type`           | `type`           | `string`                                         | "text"             | Input type                                       |
| `value`          |                  | `string`                                         |                    |                                                  |

## Methods

| Method      | Type                                             | Description                                      |
|-------------|--------------------------------------------------|--------------------------------------------------|
| `$$`        | `(name: string): HTMLElement \| Element \| undefined \| null` | Returns the first element that is a descendant of node that matches selectors. |
| `$$$`       | `(name: string): NodeListOf<HTMLElement \| Element> \| undefined` | Returns all element descendants of node that match selectors. |
| `deepClone` | `(ob: object): any`                              | Clone all `native` types of object in a new object reference<br /><br />**ob**: Original Object |
| `deleteAt`  | `(listTarget: string, index: number): void`      | Delete item in list<br /><br />**listTarget**: List Target<br />**index**: Index |
| `fire`      | `(name: string, value: any): void`               | Fire a event with name and value                 |
| `focus`     | `(): void`                                       |                                                  |
| `insertAt`  | `(listTarget: string, index: number, el: any): void` | Insert Object in list at index<br /><br />**listTarget**: List Target<br />**index**: Index<br />**el**: Object |
| `mapIDs`    | `(): void`                                       | Map all IDs for shadowRoot and save in `this.$` like a polymer element.<br />You should add in the first line of `firstUpdated()` |
| `move`      | `(array: any[], old_index: number, new_index: number): void` | Move item in array<br /><br />**array**: Array object<br />**old_index**: Old Index<br />**new_index**: New Index |
| `push`      | `(name: string, value: any): void`               | Set Value and fire event with the same name      |
| `scrollToY` | `(scrollTargetY?: number \| undefined, time?: number \| undefined, easing?: "easeInOutSine" \| "easeOutSine" \| "easeInOutQuint" \| "easeInOutCubic" \| undefined, target?: Element \| undefined): void` | **scrollTargetY**: pixels to scroll. Ej:<br />const ticketsBlockPositionY = this.$.contact.getBoundingClientRect().top + window.scrollTarget.scrollTop;<br />**time**: Time to scroll<br />**target**: scrollTarget Element |
| `set`       | `(name: string, value: any): void`               | Set Value and fire event with the same name      |
| `setAt`     | `(listTarget: string, index: number, el: any): void` |                                                  |
| `splice`    | `(name: string, index: number, pos: number, value: any): void` | Set Value and fire event with the same name      |
| `validate`  | `(): boolean`                                    |                                                  |

## Slots

| Name     | Description                           |
|----------|---------------------------------------|
| `prefix` | Content placed start the main content |
| `suffix` | Content placed end the main content   |