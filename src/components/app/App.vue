<template>
  <div>
    <div v-if="isNotAuthorised">
      <vk-auth/>
    </div>
    <div v-else>
      <span class="authorisation">
        Authorised by user: {{ this.userId }}
      </span>
      <span class="measure">
        Cluster number: {{ this.clusterNumber }}
      </span>
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

  import jDBSCAN from '../../vendors/jDBSCAN';

  // TODO: import { Component } from 'component'; is not working
  // replaced temporary with relative path
  import VkAuth from '../auth/Auth.vue';

  import { combineGetters } from '../../helpers/functions';
  import {
    PROXIMITY_DEFAULT,
    AUTHORISE_WAIT_TIME_MS
  } from '../../helpers/const';

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
        },
        clusterNumber: this.getClusterNumber(),
        setIntervalId: undefined
      };
    },

    // TODO: add listener to resize event
    mounted() {
      this.authorise();

      setTimeout(() => {
        this.collectData();
      }, AUTHORISE_WAIT_TIME_MS);

      // TODO: replace w/ Rx or proper listening, not triggering  all the time
      this.setIntervalId = setInterval(() => {
        this.clusterNumber = this.getClusterNumber();
      }, AUTHORISE_WAIT_TIME_MS);
    },

    destroyed() {
      clearInterval(this.setIntervalId);
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
      }),

      getClusterNumber() {
        const coordinates = combineGetters(
          document,
          document => document.getElementById('l-nodes'),
          nodesRoot => nodesRoot.getElementsByTagName('circle'),
          nodesElements => [...nodesElements].map(circle => {
            const { cx, cy } = circle.attributes;
            return {
              x: cx.nodeValue,
              y: cy.nodeValue
            };
          })
        );

        const dbscanner = jDBSCAN()
          .eps(PROXIMITY_DEFAULT)
          .minPts(1)
          .distance('EUCLIDEAN')
          .data(coordinates);

        return combineGetters(
          dbscanner(),
          clusters => clusters.reduce((clusters, clusterIndex) => {
            clusters.add(clusterIndex);
            return clusters;
          }, new Set()),
          clusterSet => [...clusterSet],
          clusterIndices => clusterIndices.length
        );
      }
    }
  }
</script>

<style src="vue-d3-network/dist/vue-d3-network.css"></style>

<style scope>
  span.authorisation {
    display: block;
  }

  span.measure {
    display: block;
  }
</style>