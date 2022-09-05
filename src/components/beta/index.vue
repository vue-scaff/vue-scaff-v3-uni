<style lang="less" scoped>
.span {
  position: relative;
}

.sup {
  left: 100%;
  bottom: 50%;
  position: absolute;

  font-size: smaller;
  vertical-align: super;

  -webkit-text-stroke-color: transparent;

  font-family: fantasy;
}
</style>

<template>
  <div class="span">
    <slot />
    <div class="sup">BETA</div>
  </div>
</template>
