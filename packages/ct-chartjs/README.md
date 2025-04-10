[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-router)

# ct-chartjs

It's a simple wrapper of [chart.js](https://www.chartjs.org/) for LitElement

## Installation

To include this, type:

```sh
$ pnpm i @conectate/ct-chartjs
# or
$ npm i @conectate/ct-chartjs
```

## Usage

```typescript
import '@conectate/ct-chartjs'

export class xElement extends LitElement {
    render(){
        return html`<ct-chartjs
                    delay="200"
                    type="doughnut"
                    .data=${{ ... }}
                    .options=${{ ... }}
                ></ct-chartjs>`
    }
}
```

## Follow me

[![Herberth Obregón](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://x.com/herberthobregon)

[https://x.com/herberthobregon](https://x.com/herberthobregon)

[https://dev.to/herberthobregon](https://dev.to/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

- v0.1.0 Initial Release

## License

See [LICENSE](/LICENSE)
