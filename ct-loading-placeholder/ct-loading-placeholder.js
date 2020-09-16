/**
`loading-placeholder` is a simple element to use skeleton loading such as Facebook.

### Example

<loading-placeholder style="width:200px;height:200px;"></loading-placeholder>


### Styling

Custom property | Description | Default
----------------|-------------|---------
`--loading-placeholder-color-1` | Primary color for animation | `#E0E0E0`
`--loading-placeholder-color-2` | Secondary color for animation | `#C0C0C0`

@demo demo/index.html
 */
import { CtLit, html } from '@conectate/ct-lit/ct-lit';
class LoadingPlaceholder extends CtLit {
    render() {
        return html `
            <style>
            @keyframes placeHolderShimmer {
                0% {
                    background-position: -700px 0
                }
                100% {
                    background-position: +700px 0
                }
            }

            :host {
                display: flex;
                width: 100%;
                height: 100%;
                animation-duration: 1s;
                animation-fill-mode: forwards;
                animation-iteration-count: infinite;
                animation-name: placeHolderShimmer;
                animation-timing-function: linear;
                background: var(--loading-placeholder-color-1,#E0E0E0);
                background: linear-gradient(to right, var(--loading-placeholder-color-1,#E0E0E0) 8%, var(--loading-placeholder-color-2,#C0C0C0) 18%, var(--loading-placeholder-color-1,#E0E0E0) 33%);
                background-size: 1400px 140px;
            }
        </style>
            `;
    }
}
window.customElements.define('ct-loading-placeholder', LoadingPlaceholder);
