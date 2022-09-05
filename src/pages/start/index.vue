<template>
  <!-- Screen Welcome -->
  <m-screen>
    <m-typography :logo="start.logo" :title="start.title" :sub="start.sub" />
  </m-screen>
</template>

<script>
import { mapState } from 'vuex';
import map from '@/registry/mixin';

export default {
  mixins: [
    {
      computed: mapState(map),
    },
  ],

  data() {
    return {
      author: '',
      cash: 0,
    };
  },

  async mounted() {
    const { author, cash } = await this.$store.dispatch('start/GET_MOCK');

    this.author = author;
    this.cash = cash;
  },
};
</script>
