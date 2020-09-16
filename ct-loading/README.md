[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@conectate/ct-loading-placeholder)
[![NPM](https://badge.fury.io/js/%40conectate%2Fct-loading-placeholder.svg)](https://badge.fury.io/js/%40conectate%2Fct-loading-placeholder.svg)
[![GitHub version](https://badge.fury.io/gh/conectate%2Fct-loading-placeholder.svg)](https://badge.fury.io/gh/conectate%2Fct-loading-placeholder)
[![Known Vulnerabilities](https://snyk.io/test/github/conectate/ct-loading-placeholder/badge.svg?targetFile=package.json)](https://snyk.io/test/github/conectate/ct-loading-placeholder?targetFile=package.json)

# ct-loading-placeholder

`ct-loading-placeholder` is a simple element to use skeleton loading such as Facebook.

## Installation

To include this, type:

```sh
$ yarn add @conectate/ct-loading-placeholder
```
or
```sh
$ npm i @conectate/ct-loading-placeholder
```

## Usage

### Import lib

```javascript
import '@conectate/ct-loading-placeholder/ct-loading-placeholder';
```

### Use in your HTML
```html
<ct-loading-placeholder style="height:24px;width:100px;border-radius: 16px;"></ct-loading-placeholder>
```

### Styling

Custom property | Description | Default
----------------|-------------|---------
`--loading-placeholder-color-1` | Primary color for animation | `#E0E0E0`
`--loading-placeholder-color-2` | Secondary color for animation | `#C0C0C0`

## Demo

[![Demo](https://raw.githubusercontent.com/Conectate/ct-loading-placeholder/master/demo/ct-loading-placeholder.gif)](https://raw.githubusercontent.com/Conectate/ct-loading-placeholder/master/demo/ct-loading-placeholder.gif)


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

## History
- v0.2.1 CHANGE keys to gruops in custom regex
- v0.2.0 ADD href method
- v0.1.8 You can use a html`` or string to define template
- v0.1.0 Initial Release

## License

See [LICENSE](/LICENSE)