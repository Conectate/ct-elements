[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-helpers)
# ct-helpers

It's a simple wrapper for LitElement

## Installation

To include this, type:

```sh
$ yarn add @conectate/ct-helpers
```
or
```sh
$ npm i @conectate/ct-helpers
```

## Usage

```typescript
// Typescript
import { browserCapabilities, getClient, getGeoLocation, sleep, PushID } from "@conectate/ct-helpers";
let ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36'
async function main(){
    console.log(browserCapabilities(ua))
    // Set(4) { 'es2015', 'es2016', 'es2017', 'push' }
    console.log(getClient(ua))
    // {
    //   browser: 'edge',
    //   browserVersion: 44.18363,
    //   isMobile: false,
    //   os: 'windows',
    //   osVersion: 10
    // }
    console.log(await getGeoLocation())
    await sleep(1000);
    let pid = new PushID();
    let randomID_20length: string = pid.next(20);
}
main();
```

## Follow me
[![Herberth Obregón](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://twitter.com/herberthobregon)

[https://twitter.com/herberthobregon](https://twitter.com/herberthobregon)

[https://www.conectate.today/herberthobregon](https://www.conectate.today/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## License

See [LICENSE](/LICENSE)