# ct-card-dialog

## Properties

| Property | Attribute | Type       |
| -------- | --------- | ---------- |
| `dialog` |           | `CtDialog` |
| `el`     | `el`      |            |

# ct-confirm

## Properties

| Property  | Attribute | Type                                            | Default |
| --------- | --------- | ----------------------------------------------- | ------- |
| `body`    | `body`    | `string`                                        | ""      |
| `cancel`  | `cancel`  | `string`                                        |         |
| `dialog`  |           | `CtDialog`                                      |         |
| `neutral` | `neutral` | `string`                                        |         |
| `ok`      | `ok`      | `string`                                        | "OK"    |
| `reject`  |           | `(reason?: any) => void`                        |         |
| `solve`   |           | `(param: boolean \| null \| undefined) => void` |         |
| `ttl`     | `ttl`     | `string`                                        | "Title" |

## Methods

| Method        | Type                                                  | Description |
| ------------- | ----------------------------------------------------- | ----------- |
| `cancelbtn`   | `(e: Event): Promise<void>`                           |             |
| `computeBody` | `(body: string): string`                              |             |
| `computeBtns` | `(ok: string, neutral: string, cancel: string): void` |             |
| `neutralbtn`  | `(e: Event): Promise<void>`                           |             |
| `okbtn`       | `(e: Event): Promise<void>`                           |             |
| `onResult`    | `(): Promise<boolean \| undefined>`                   |             |

# ct-confirm-cupertino

## Properties

| Property  | Attribute | Type                                            | Default |
| --------- | --------- | ----------------------------------------------- | ------- |
| `body`    | `body`    | `string`                                        | ""      |
| `cancel`  | `cancel`  | `string`                                        |         |
| `dialog`  |           | `CtDialog`                                      |         |
| `neutral` | `neutral` | `string`                                        |         |
| `ok`      | `ok`      | `string`                                        | "OK"    |
| `reject`  |           | `(reason?: any) => void`                        |         |
| `solve`   |           | `(param: boolean \| null \| undefined) => void` |         |
| `ttl`     | `ttl`     | `string`                                        | "Title" |

## Methods

| Method        | Type                                                  | Description |
| ------------- | ----------------------------------------------------- | ----------- |
| `cancelbtn`   | `(e: Event): Promise<void>`                           |             |
| `computeBody` | `(body: string): string`                              |             |
| `computeBtns` | `(ok: string, neutral: string, cancel: string): void` |             |
| `neutralbtn`  | `(e: Event): Promise<void>`                           |             |
| `okbtn`       | `(e: Event): Promise<void>`                           |             |
| `onResult`    | `(): Promise<boolean \| undefined>`                   |             |

# ct-dialog

## Properties

| Property            | Attribute     | Type                                                   | Default                       | Description                                      |
| ------------------- | ------------- | ------------------------------------------------------ | ----------------------------- | ------------------------------------------------ |
| `animation`         | `animation`   | `animationSupported`                                   | "normal"                      |                                                  |
| `ariaModal`         | `aria-modal`  | `string`                                               | "true"                        |                                                  |
| `dialogID`          | `dialogID`    | `string`                                               | "new Date().getTime() + \"\"" |                                                  |
| `disableHistoryAPI` |               | `boolean`                                              | false                         |                                                  |
| `element`           | `element`     | `HTMLElement \| undefined`                             |                               |                                                  |
| `finish`            |               | `() => void`                                           |                               |                                                  |
| `free`              | `free`        | `object`                                               |                               |                                                  |
| `history`           | `history`     | `ConectateHistory`                                     |                               | Entrada para el History API de tipe {title,href} |
| `mappingContainer`  |               | `Promise<any> \| undefined`                            |                               |                                                  |
| `preferences`       | `preferences` | `array`                                                | []                            |                                                  |
| `resolveMapping`    |               | `(value?: {} \| PromiseLike<{}> \| undefined) => void` |                               |                                                  |
| `role`              | `role`        | `string`                                               | "alert"                       |                                                  |

## Methods

| Method             | Type                                                                                                                              | Description |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `closeDialog`      | `(e?: Event \| null \| undefined, type?: string \| undefined): Promise<unknown>`                                                  |             |
| `computeAnimation` | `(anim: animationSupported): "anim-normal" \| "anim-cupertino" \| "anim-slide-left" \| "anim-slide-right" \| "anim-bottom-sheet"` |             |
| `enableHistoryAPI` | `(value?: boolean): this`                                                                                                         |             |
| `fullscreenMode`   | `(): this`                                                                                                                        |             |
| `fullsizeMode`     | `(): this`                                                                                                                        |             |
| `getStylesPref`    | `(pref: DialogSizePreferences[]): TemplateResult[]`                                                                               |             |
| `init`             | `(): Promise<void>`                                                                                                               |             |
| `setAnimation`     | `(anim: animationSupported): this`                                                                                                |             |

## Events

| Event      | Type                                                  |
| ---------- | ----------------------------------------------------- |
| `on-close` | `CustomEvent<{ event: Event \| null \| undefined; }>` |

# ct-loading

## Properties

| Property | Attribute | Type       | Default   |
| -------- | --------- | ---------- | --------- |
| `dialog` |           | `CtDialog` |           |
| `ttl`    | `ttl`     | `string`   | "Loading" |

## Methods

| Method | Type | Description |
| ------ | ---- | ----------- |

# ct-promp

## Properties

| Property  | Attribute | Type                                            | Default  |
| --------- | --------- | ----------------------------------------------- | -------- |
| `body`    | `body`    | `string`                                        | ""       |
| `cancel`  | `cancel`  | `string`                                        | "Cancel" |
| `dialog`  |           | `CtDialog`                                      |          |
| `neutral` | `neutral` | `string`                                        | ""       |
| `ok`      | `ok`      | `string`                                        | "OK"     |
| `reject`  |           | `(reason?: any) => void`                        |          |
| `solve`   |           | `(param?: string \| null \| undefined) => void` |          |
| `ttl`     | `ttl`     | `string`                                        | "Title"  |

## Methods

| Method        | Type                                                  | Description |
| ------------- | ----------------------------------------------------- | ----------- |
| `cancelbtn`   | `(e: Event): Promise<void>`                           |             |
| `computeBtns` | `(ok: string, neutral: string, cancel: string): void` |             |
| `okbtn`       | `(e: Event): Promise<void>`                           |             |
| `onResult`    | `(): Promise<string \| undefined>`                    |             |
