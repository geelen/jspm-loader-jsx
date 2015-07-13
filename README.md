# JSPM Loader: JSX
> A hot-reloading JSX plugin for JSPM

To use in your project:

```js
jspm install jsx=npm:jspm-loader-jsx
jspm-server
```

Then in your application:

```js
// config.js - ensure you have the following
System.config({
  babelOptions: {
    blacklist: []
  }
});
```
```js
// main.js
import MyComponent from 'my-component.jsx!'
```
```jsx
// my-component.jsx
import React from 'react'
export default MyComponent extends React.Component {
  //...
}
```

**Note:** this plugin only works with ES6 JSX files.  And be sure your `System.js` has `babelOptions: { blacklist: [] }`, since JSX transpilation is disabled by default.

## To use JSX live-reload

If your file is called `my-component.js`, this plugin will look for a React component named `MyComponent` in the file as the default export. If it finds it, it will try to apply [react-hot-api](https://github.com/gaearon/react-hot-api) so the component can be reloaded *while preserving state*. It's amazing.
 
If no `MyComponent` is defined, or it's not a React component, it will fall back to setting `__hotReload = true`. See [jspm-server](https://github.com/geelen/jspm-server#how-it-works) for more information.

### Troubleshooting

If you're finding the page reloading a lot, look in the console for information. A generally-safe approach is adding `export let __hotReload = true` to your `main.js` (whereever your `React.render` call is). Then, if a single file can't be hot-reloaded, it will bubble up and the whole React app will be reloaded. You'll lose whatever state is in the application, but at least the whole browser won't reload.

## With thanks

- Guy Bedford for JSPM
- Dan Abramov for React Hot Api

---
Glen Maddern, 2015.
