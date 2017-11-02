# vue-vk-friend-graph
Vue / Vuex / Yarn / Babel / ES6 VK Friend Graph App

<p>
<a href="https://travis-ci.org/Beraliv/vue-vk-friend-graph"><img src="https://travis-ci.org/Beraliv/vue-vk-friend-graph.svg" alt="Build Status"></a>
<a href='https://david-dm.org/Beraliv/vue-vk-friend-graph'><img src='https://david-dm.org/Beraliv/vue-vk-friend-graph.svg' alt="Dependency Status"></a>
<a href="https://david-dm.org/Beraliv/vue-vk-friend-graph/?type=dev"><img src="https://david-dm.org/Beraliv/vue-vk-friend-graph/dev-status.svg" alt="devDependency Status"></a>
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT licence"></a>
</p>

## Commands

You can replace `yarn` with `npm run` here.

```bash
# build the changes
yarn build

# rebuild the changes
yarn watch

# run the bundled dist folder
yarn dev

# deploy changes with prebuild
yarn deploy
```

## Code splitting

As webpack supports both [dynamic import](https://webpack.js.org/guides/code-splitting-async/#dynamic-import-import-) and [`require.ensure`](https://webpack.js.org/guides/code-splitting-async/#require-ensure-) syntax, we would recommend you to stick to `require.ensure` for now because of [performance issue](https://github.com/webpack/webpack/issues/4636).

## Demo

You can see built example [here](https://beraliv.github.io/vue-vk-friend-graph/)

## Issues

For running it locally you need to:

- Run simultaneously `yarn watch` and `yarn dev` in two terminal tabs.
