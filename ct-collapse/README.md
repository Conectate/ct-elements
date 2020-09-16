[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-router)
[![LitElement Version](https://img.shields.io/badge/LitElement-v2.2.0-blue.svg)](https://www.polymer-project.org)
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

### Step 1️⃣
Class 

```typescript
import { LitElement, html, svg, css, customElement, property } from 'lit-element/lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

type PropertyValues = Map<PropertyKey, unknown>;

export { html, svg, css, customElement, unsafeHTML, property, PropertyValues };
class CtLit extends LitElement {
    $: { [x: string]: HTMLElement | any } = {};

    /**
     * Returns the first element within node's descendants whose ID is elementId.
     * @param name 
     */
    _(name: string): HTMLElement | null {
        return this.shadowRoot && this.shadowRoot.getElementById(name);
    }

    /**
     * Returns the first element that is a descendant of node that matches selectors.
     * @param name 
     */
    $$(name: string): HTMLElement | null {
        return this.shadowRoot && this.shadowRoot.querySelector(name);
    }

    /**
     * Returns all element descendants of node that match selectors.
     * @param name 
     */
    $$$(name: string) {
        return this.shadowRoot && this.shadowRoot.querySelectorAll(name);
    }
    /**
     * Map all IDs for shadowRoot and save in this.$ like a polymer element
     */
    mapIDs() {
        let nodeList = this.shadowRoot && this.shadowRoot.querySelectorAll('[id]');
        for (let i = 0; nodeList != null && i < nodeList.length; i++) {
            this.$[nodeList[i].id] = nodeList[i] as HTMLElement;
        }
    }

    /**
     * Set Value and fire event with the same name
     * @param name 
     * @param value 
     */
    set(name: string, value: any) {
        (this as any)[name] = value;
        this.dispatchEvent(new CustomEvent(name, { detail: value }));
    }

    /**
     * Set Value and fire event with the same name
     * @param name 
     * @param value 
     */
    push(name: string, value: any) {
        (this as any)[name].push(value);
        this.requestUpdate();
    }

    /**
     * Set Value and fire event with the same name
     * @param name 
     * @param value 
     */
    splice(name: string, index: number, pos: number, value: any) {
        (this as any)[name].splice(index, pos, value);
        this.requestUpdate();
    }

    /**
     * Set Value and fire event with the same name
     * @param name 
     * @param value 
     */
    unshift(name: string, value: any) {
        (this as any)[name].unshift(value);
        this.requestUpdate();
    }

    /**
     * Set Value and fire event with the same name
     * @param name 
     * @param value 
     */
    shift(name: string, value: any) {
        (this as any)[name].shift(value);
        this.requestUpdate();
    }

    /**
     * Set Value and fire event with the same name
     * @param name 
     * @param value 
     */
    move(name: string, old_index: number, new_index: number) {
        if (new_index >= (this as any)[name].length) {
            let k = new_index - (this as any)[name].length;
            while ((k--) + 1) {
                this.push(name, undefined);
            }
        }
        // @ts-ignore
        this.splice(name, new_index, 0, this.splice(name, old_index, 1)[0]);
    }

    deleteAt(listTarget: string, index: number) {
        (this as any)[listTarget].splice(index, 1);
        this.requestUpdate();
    }

    insertAt(listTarget: string, index: number, el: any) {
        this.splice(listTarget, index, 0, el);
    }

    setAt(listTarget: string, index: number, el: any) {
        this.splice(listTarget, index, 1, el);
    }

    
    /**
     * Fire a event with name and value
     * @param name 
     * @param value 
     */
    fire(name: string, value: any) {
        this.dispatchEvent(new CustomEvent(name, { detail: value }));
    }

    /**
     * 
     * @param scrollTargetY pixels to scroll. Ej: 
        const ticketsBlockPositionY = this.$.contact.getBoundingClientRect().top + window.scrollTarget.scrollTop;
     * @param time Time to scroll
     * @param easing 
     * @param target scrollTarget Element
     */
    scrollToY(scrollTargetY: number = 0, time: number = 600, easing: 'easeOutSine' | 'easeOutSine' | 'easeInOutQuint' = 'easeOutSine', target: Element = (window as any).scrollTarget) {
        let currentTime = 0;
        const animationTime = time / 1000;

        // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
        const easingEquations = {
            easeOutSine: (pos: number) => Math.sin(pos * (Math.PI / 2)),
            easeInOutSine: (pos: number) => (-0.5 * (Math.cos(Math.PI * pos) - 1)),
            easeInOutQuint: (pos: number) => {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            },
        };

        // add animation loop
        function tick() {
            currentTime += 1 / 60;

            const p = currentTime / animationTime;
            const t = easingEquations[easing](p);

            const scrollTop = (target as any).pageYOffset || target.scrollTop || 0;

            const newPosition = (scrollTop + ((scrollTargetY - scrollTop) * t));

            if (p < 1) {
                window.requestAnimationFrame(tick);
                target.scrollTop = newPosition;
            }
        }
        tick();
    }
}

export { CtLit };
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
5. Submit a pull request :D

## History
- v0.2.1 CHANGE keys to gruops in custom regex
- v0.2.0 ADD href method
- v0.1.8 You can use a html`` or string to define template
- v0.1.0 Initial Release

## License

See [LICENSE](/LICENSE)