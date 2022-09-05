<style lang="less" scoped>
.typography(@size) {
  .img {
    width: calc(@size * 64 / 12);
  }
  .h1 {
    font-size: @size;
    -webkit-text-stroke-width: calc(@size * 64 / 1000);
  }
  .h2 {
    font-size: calc(@size * 64 / 100);
  }
}

.typography(80rpx);
</style>

<template>
  <main class="typography">
    <img class="img" mode="aspectFit" :src="src" />
    <div class="h1">
      <m-beta>{{ title }}</m-beta>
    </div>
    <div class="h2">{{ sub }}</div>
  </main>
</template>

<script>
export default {
  props: {
    logo: {
      type: [String],
      default: '',
    },

    title: {
      type: [String],
      default: '',
    },

    sub: {
      type: [String],
      default: '',
    },
  },

  computed: {
    src() {
      // return navigator.onLine ? `${this.state.oss}/${this.logo}` : this.$util.uri(this.logo);
      return this.custom.logo;
    },
  },
};
</script>
