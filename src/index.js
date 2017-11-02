import Vue from 'vue';

import * as AllComponents from './components';
import store from './store';

new Vue({
  el: '#vk-app',
  store,
  render: h => h(AllComponents.VkApp),
  components: AllComponents
});
