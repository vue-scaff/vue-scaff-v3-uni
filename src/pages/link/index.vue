<style lang="less">
.page {
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <div class="page">
    <u-button type="error" @click="link">press me link to webview</u-button>
  </div>
</template>

<script>
export default {
  methods: {
    link() {
      uni.navigateTo({ url: `/pages/subpackages/index?link=https://vue-scaff.com` });
    },
  },
};
</script>
