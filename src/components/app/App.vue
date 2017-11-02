<template>
  <div>
    App Hello
    <vk-auth>
    </vk-auth>
  </div>
</template>

<script>
  import { VkAuth } from 'components';

  export default {
    name: 'VkApp',

    components: { VkAuth }
  }
</script>