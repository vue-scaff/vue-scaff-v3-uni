<template>
  <web-view :src="link" v-if="link" />
</template>

<script>
export default {
  data() {
    return {
      link: null,
    };
  },

  async onLoad({ link }) {
    if (/^http/.test(link)) {
      return (this.link = link);
    }

    // Toast Error Message
    uni.$u.toast(`please check the link`);

    // Wait 2s
    await this.$utils.wait(2000);

    // Navigator Back
    uni.navigateBack();
  },
};
</script>
