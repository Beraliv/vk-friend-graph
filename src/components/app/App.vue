<template>
  <div>
    <div v-if="isNotAuthorised">
      <vk-auth/>
    </div>
    <div v-else>
      Authorised by user: {{ userId }}
      <d3-network
        :net-nodes="users"
        :net-links="connections"
        :options="options"
      ></d3-network>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import D3Network from 'vue-d3-network';

  // TODO: import { Component } from 'component'; is not working
  // replaced temporary with relative path
  import VkAuth from '../auth/Auth.vue';

  export default {
    name: 'VkApp',

    components: { VkAuth, D3Network },

    data() {
      return {
        options: {
          nodeSize: 15,
          nodeLabels: true,
          canvas: false,
          size: {
            w: window.innerWidth,
            h: window.innerHeight
          }
        }
      };
    },

    // TODO: add listener to resize event
    mounted() {
      this.authorise();

      setTimeout(() => {
        this.collectData();
      }, 1000);
    },

    computed: {
      ...mapGetters({
        accessToken: 'getAccessToken',
        userId: 'getUserId',
        users: 'getUsers',
        connections: 'getConnections'
      }),

      isNotAuthorised() {
        return !this.accessToken || !this.userId;
      }
    },

    methods: {
      ...mapActions({
        authorise: 'authorise',
        collectData: 'collectData'
      })
    }
  }
</script>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>