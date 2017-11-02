<template>
  <div>
    <div v-if="isNotAuthorised">
      <vk-auth/>
    </div>
    <div v-else>
      Authorised by user: {{ userId }}
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  // TODO: import { Component } from 'component'; is not working
  // replaced temporary with relative path
  import VkAuth from '../auth/Auth.vue';

  export default {
    name: 'VkApp',

    components: { VkAuth },

    mounted() {
      this.authorise();
    },

    computed: {
      ...mapGetters({
        accessToken: 'getAccessToken',
        userId: 'getUserId'
      }),

      isNotAuthorised() {
        return !this.accessToken || !this.userId;
      }
    },

    methods: {
      ...mapActions({
        authorise: 'authorise'
      })
    }
  }
</script>