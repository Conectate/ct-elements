[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://github.com/conectate/ct-router)
[![Published on webcomponents.org](https://badge.fury.io/js/%40conectate%2Fct-router.svg)](https://badge.fury.io/js/%40conectate%2Fct-router.svg)
[![GitHub version](https://badge.fury.io/gh/conectate%2Fct-router.svg)](https://badge.fury.io/gh/conectate%2Fct-router)
[![Known Vulnerabilities](https://snyk.io/test/github/conectate/ct-router/badge.svg?targetFile=package.json)](https://snyk.io/test/github/conectate/ct-router?targetFile=package.json)
# ct-router

It's a simple routing system that changes the viewport depending on the route given

## Installation

To include this, type:


```sh
$ yarn add @conectate/ct-router
```
or
```sh
$ npm i @conectate/ct-router
```
### TLDR;
#### Bind properties to templated elements in LitElement
You can insert JavaScript expressions as placeholders for HTML text content, attributes, Boolean attributes, properties, and event handlers.

- Text content: `<p>${...}</p>`
- Attribute: `<p id="${...}"></p>`
- Boolean attribute: `?disabled="${...}"`
- Property: `.value="${...}"`
- Event handler: `@event="${...}"`

## Usage

### Step 1
Add to your html\`\` (Litelement Template) like this:

```html
<ct-router id="ctrouter" 
  ?auth=${this.isLogged} 
  @login-needed=${this.loginNeeded} 
  @loading=${this.isLoading} 
  @location-changed=${this.pathChanged}>
</ct-router>
```
### Step 2
### Full LitElement example in Typescript
```typescript
import {CtLit, html, property, customElement } from '@conectate/ct-lit'; /* or 'lit-element' */
import '@conectate/ct-router/ct-router';
import { href } from '@conectate/ct-router/ct-router';

@customElement('my-router')
class MyRouter extends CtLit{
  @property({type : Boolean}) isLogged = false;

  /*
  You can use lit-html @event bindings in your template inside the render function to add event listeners to your component.
  You can use lit-html '?' bindings in your template inside the render function to add boolean property.
  */
  render(){
    return html`
    <ct-router id="ctrouter"
      loginFallback="/404"
      ?auth=${this.isLogged} 
      @login-needed=${this.loginNeeded} 
      @loading=${this.isLoading} 
      @location-changed=${this.pathChanged}>
    </ct-router>`
  }

  firstUpdated(_changedProperties: Map<string, any>) {
    this.mapIDs(); // map all ID's in this.$ , only in @conectate/ct-lit
    
    // set if user is not isAnonymous
    this.isLogged = true; // !firebase.auth().currentUser.isAnonymous
    
    this.$.ctrouter.pages = [
      {
        path: "/page1",
        element: html`<page-number1></page-number1>`, // you cand use html``
        from: () => import("./src/page-number1"),
        auth: false,
        title: () => `Page 1 • Example.com`
      },
      {
        path: "/profile",
        element: "<my-profile></my-profile>", // or you cand use a simple string
        from: () => import("./src/my-profile"),
        auth: true,
        title: () => `Profile • Example.com`
      },
      {
        path: "/404",
        element: html`<page-404></page-404>`,
        from: () => import("./src/page-404"),
        auth: false,
        title: () => null
      }
    ];
  }

  /* =================== (optional) DEBUG ROUTER =================== */
  /* You can view state of you web */
  printCurrentState(){
    // More details in interface LocationChanged 
    console.log('Current patternMatched',this.$.ctroute.path);
    console.log('Current pathname',this.$.ctroute.pathname);
    console.log('Current queryParams',this.$.ctroute.queryParams);
    console.log('Current params',this.$.ctroute.params);
    console.log('is Logged?',this.$.ctroute.auth);
  }

  loginNeeded(e : CustomEvent< { path: string } >){
    let path = e.detail.path;
    alert(`loginNeeded on: ${path}`);
  }

  isLoading(e : CustomEvent< boolean >){
    console.log('loading...', e.detail);
  }

  pathChanged(e : CustomEvent<LocationChanged>){
    console.log('path changed',location.href);
    console.log('patternMatched',this.$.ctroute.path,'==',e.detail.path);
    console.log('pathname',this.$.ctroute.pathname,'==',e.detail.pathname,'==',location.pathname);
    console.log(this.$.ctroute.queryParams,'==',e.detail.queryParams);
    console.log(this.$.ctroute.params,'==',e.detail.params);
  }
}

interface LocationChanged {
  //patternMatched like a: /:profile/preferences
  path: string,
  // pathname like a: /herberthobregon/preferences
  pathname: string, 
  // if path is /home?hello=word then queryParams is { hello : "world" }
  queryParams?: { [x:string] : string }, 
  // if href is /herberth/preference and path is /:username/preference then params is { username : "herberth" }
  params?: { [x:string] : string }
}
```

### Example in React
```tsx
class MyComponent extends React.Component {   
  constructor(props) {     
    super(props);     
    this.myRef = React.createRef();   
  }   

  render() {     
    return <ct-router ref={this.myRef}></ct-router>;   
  } 

  componentDidMount() {
    const ctrouter = this.myRef.current;
    ctrouter.addEventListener('login-needed',this.loginNeeded);
    ctrouter.addEventListener('loading',this.isLoading);
    ctrouter.addEventListener('location-changed',this.pathChanged);
    ctroute.pages = [
      {
        path: "/page1",
        element: html`<page-number1></page-number1>`, // you cand use html``
        from: () => import("./src/page-number1"),
        auth: false,
        title: () => `Page 1 • Example.com`
      },
      {
        path: "/profile",
        element: "<my-profile></my-profile>", // or you cand use a simple string
        from: () => import("./src/my-profile"),
        auth: true,
        title: () => `Profile • Example.com`
      },
      {
        path: "/404",
        element: html`<page-404></page-404>`,
        from: () => import("./src/page-404"),
        auth: false,
        title: () => null
      }
    ];
    this.printCurrentState();

    setTimeout(()=>{
      href('/404');
      this.printCurrentState();
    },1500);
  }

  loginNeeded(e : CustomEvent< { path: string } >){
    let path = e.detail.path;
    alert(`loginNeeded on: ${path}`);
  }

  isLoading(e : CustomEvent< boolean >){
    console.log('loading...', e.detail);
  }

  pathChanged(_e : CustomEvent<LocationChanged>){
    console.log('path changed',location.href);
    console.log('patternMatched',this.$.ctroute.path,'==',e.detail.path);
    console.log('pathname',this.$.ctroute.pathname,'==',e.detail.pathname,'==',location.pathname);
    console.log(this.$.ctroute.queryParams,'==',e.detail.queryParams);
    console.log(this.$.ctroute.params,'==',e.detail.params);
  }
}
```


If you plan to manage the dynamic imports, skip `from` attr
```js
this.$.ctroute.pages = [
  {
    path: "/page1",
    element: html`<page-number1></page-number1>`,
    from: () => null,
    auth: false,
    title: () => `Page 1 • Example.com`
  }
]
```


### Dinamic Routing
You can use `:id` to varible path and `*` for any path or your own `regexp`

```js
{
  path: "/page/:id",
  element: html`<page-number1></page-number1>`,
  from: () => null,
  auth: false,
  title: () => `Page 1 • Example.com`
}
```
or
```js
{
  path: "/register/:page?",
  // in this regexp use /(group 1)/(group 2)
  regex : /^\/(register|registro)\/([^\/]+)(?:\/)?$/i,
  groups : ['_group1','page'],
  element: html`<login-register></login-register>`,
  from: () => import("./src/login-register"),
  auth: null,
  title: () => `${window.register} • Example.com`
}
```

### Auth
There are pages that only a user with session started can see.
for this it passes a Boolean parameter to auth of `ct-router`

```html
?auth=${this.isLogged}
```

## Follow me
[![Herberth_thumb](https://user-images.githubusercontent.com/6503845/74269077-8bc2e100-4cce-11ea-8a6f-1ba34b8b5cf2.jpg)](https://twitter.com/herberthobregon)

[https://twitter.com/herberthobregon](https://twitter.com/herberthobregon)

[https://www.conectate.today/herberthobregon](https://www.conectate.today/herberthobregon)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

See [LICENSE](/LICENSE)