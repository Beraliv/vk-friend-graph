import Vue from 'vue';
import * as Components from './components';
import store from './store';

new Vue({
	store,
  el: '#vk-app',
  render: h => h(Components.VkApp),
  components: Components
})
