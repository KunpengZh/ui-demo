# ui-demo

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>

      import Vue from 'vue'

import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
routes: [
{
path: '/',
name: 'home',
component: Home
},
{
path: '/about',
name: 'about',
// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
component: () => import(/_ webpackChunkName: "about" _/ './views/About.vue')
}
]
})
