import { LitElement, html, customElement } from 'lit-element';
/**

The progress bars are for situations where the percentage completed can be
determined. They give users a quick sense of how much longer an operation
will take.
Example:
```html
<ct-loading-bar></ct-loading-bar>
```


The following mixins are available for styling:


Custom property | Description | Default
----------------|-------------|---------
`--ct-loading-bar-c1` | Color of the container | `#4998ff`
`--ct-loading-bar-c2` | Color of the container | `#fff`
`--ct-loading-bar-c3` | Color of the container | `#4998ff`

 */
@customElement('ct-loading-bar')
export class CtLoadingBar extends LitElement {

    render() {
        return html`
<style>
:host {
    display: block;
}
@keyframes sidebar-loading {
    from {
        left: 50%;
        width: 0;
        z-index: 100;
    }

    33.3333% {
        left: 0;
        width: 100%;
        z-index: 10;
    }

    to {
        left: 0;
        width: 100%;
    }
}
.horizontal-loader {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: #fff;
}
.horizontal-loader-bar {
    height: 100%;
    content: "";
    display: inline-block;
    position: absolute;
    left: 50%;
    text-align: center;
}

.horizontal-loader-bar:nth-child(1) {
    -webkit-animation: sidebar-loading 3s linear infinite;
    animation: sidebar-loading 3s linear infinite;
    background: var(--ct-loading-bar-c1,#4998ff);
    border-radius: 8px;
}

.horizontal-loader-bar:nth-child(2) {
    background: var(--ct-loading-bar-c2,#fff);
    -webkit-animation: sidebar-loading 3s linear 1s infinite;
    animation: sidebar-loading 3s linear 1s infinite;
    border-radius: 8px;
}

.horizontal-loader-bar:nth-child(3) {
    background: var(--ct-loading-bar-c3,#4998ff);
    -webkit-animation: sidebar-loading 3s linear 2s infinite;
    animation: sidebar-loading 3s linear 2s infinite;
    border-radius: 8px;
}
</style>
<div class="horizontal-loader">
    <div class="horizontal-loader-bar"></div>
    <div class="horizontal-loader-bar"></div>
    <div class="horizontal-loader-bar"></div>
</div>
`;
    }
}