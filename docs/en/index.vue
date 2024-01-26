<template>
  <div class="big-home-area">
    <div class="big-title">
      <h1>vue3-context-menu</h1>
      <p>A simple, beautiful context menu component</p>
      <p></p>
    </div>
    <div class="big-start">
      <button class="primary" @click="goStart">Get started</button>
      <button @click="goView">View Demo</button>
    </div>
    <div class="big-demo">
      <img class="hidden-dark" src="https://imengyu.top/assets/images/demo-light.png" />
      <img class="hidden-light" src="https://imengyu.top/assets/images/demo-dark.png" />
    </div>
  </div>
</template>

<script lang="ts" setup>
function goStart() {
  location.href = './guide/install.html'
}
function goView() {
  window.open('https://imengyu.top/pages/vue3-context-menu-demo/');
}
</script>

<style lang="scss">
@import '../index.scss';
</style>