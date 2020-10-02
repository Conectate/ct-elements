# Ct-tabs

````html
<ct-tabs>
    <ct-tab ?selected=${this.pageSelected == 1} @click=${() => (this.pageSelected = 1)}>Tab 1</ct-tab>
    <ct-tab ?selected=${this.pageSelected == 2} @click=${() => (this.pageSelected = 2)}>Tab 1</ct-tab>
</ct-tabs>
````
