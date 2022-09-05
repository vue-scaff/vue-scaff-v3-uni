<style lang="less" scoped>
.screen {
  width: 100vw;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stage {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.text {
  .h1,
  .h2 {
    white-space: nowrap;
    word-break: normal;
  }
}

.sheet {
  .h1,
  .h2 {
    font-family: 'heaver';
    display: contents;
    white-space: nowrap;
    word-wrap: normal;
    font-weight: lighter;
    margin: 0 auto;
    line-height: 1.24;
  }

  .h1 {
    color: #e23;
    letter-spacing: -5rpx;
    -webkit-text-stroke-color: #100;
  }

  .h2 {
    color: #000;
    letter-spacing: -2rpx;
  }
}

:deep(.typography) {
  .stage;
  .flex;
  .text;
  .sheet;
}
</style>

<template>
  <div class="screen">
    <slot />
  </div>
</template>
