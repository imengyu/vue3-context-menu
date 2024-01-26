<template>
  <div class="big-home-area">
    <div class="big-title">
      <h1>vue3-context-menu</h1>
      <p class="big">简洁美观简单的右键菜单组件</p>
      <p></p>
    </div>
    <div class="big-start">
      <button class="primary" @click="goStart">立即开始</button>
      <button @click="goView">查看演示</button>
    </div>
    <div class="big-demo">
      <img class="hidden-dark" src="https://imengyu.top/assets/images/demo-light.png" />
      <img class="hidden-light" src="https://imengyu.top/assets/images/demo-dark.png" />
    </div>
  </div>
</template>

<script lang="ts" setup>
function goStart() {
  location.href = './guide/start.html'
}
function goView() {
  window.open('https://imengyu.top/pages/vue3-context-menu-demo/');
}
</script>

<style lang="scss">
@import './index.scss';
</style>