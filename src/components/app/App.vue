<template>
  <div>
    App Hello
    <vk-auth>
    </vk-auth>
  </div>
</template>

<script>
  // TODO: import { Component } from 'component'; is not working
  // replaced temporary with relative path
  import VkAuth from '../auth/Auth.vue';

  export default {
    name: 'VkApp',

    components: { VkAuth }
  }
</script>