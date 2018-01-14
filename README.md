# vk-friend-graph
Vue / Vuex / Yarn / Babel / ES6 VK Friend Graph App

<p>
<a href="https://travis-ci.org/Beraliv/vk-friend-graph"><img src="https://travis-ci.org/Beraliv/vk-friend-graph.svg" alt="Build Status"></a>
<a href='https://david-dm.org/Beraliv/vk-friend-graph'><img src='https://david-dm.org/Beraliv/vk-friend-graph.svg' alt="Dependency Status"></a>
<a href="https://david-dm.org/Beraliv/vk-friend-graph/?type=dev"><img src="https://david-dm.org/Beraliv/vk-friend-graph/dev-status.svg" alt="devDependency Status"></a>
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

## Demo

You can see built example [here](https://beraliv.github.io/vk-friend-graph/)

The interface looks like that:


![UI](https://github.com/Beraliv/vk-friend-graph/blob/master/src/images/interface.png)

## Issues

**For running it locally you need to:**

- Run simultaneously `yarn watch` and `yarn dev` in two terminal tabs.

**If the demo is not working, you should:**

- Open DevTools > Application > Local Storage > [Website key](https://beraliv.github.io/vk-friend-graph/)
- Clear
- Reload the page

## Dependencies

- [vue-d3-network](https://github.com/emiliorizzo/vue-d3-network)
- [jDBSCAN](https://github.com/upphiminn/jDBSCAN)