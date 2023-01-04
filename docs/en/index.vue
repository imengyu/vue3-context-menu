<template>
  <div class="big-home-area">
    <div class="big-title">
      <h1>vue3-context-menu</h1>
      <p>A simple, beautiful and simple context menu component</p>
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

$primary-color: #50af21;
$text-color: #000;
$second-text-color: #333;
$inverse-second-text-color: #b1b1b1;
$inverse-text-color: #fff;

html[class="dark"] {
  .hidden-dark {
    visibility: hidden;
  }
  .hidden-light {
    visibility: visible;
  }
  
  .big-title {
    h1 {
      color: $primary-color;
    }
    p {
      color: $inverse-second-text-color;

      &.big {
        color: $inverse-text-color;
      }
    }
  }
  .big-start {
    button {
      border: 1px solid #535353;
      color: $inverse-second-text-color;
      background-color: #3a3a3a;
    }
  }
}

.hidden-light {
  visibility: hidden;
}

.big-home-area {
  max-width: 1152px;
  margin: 0 auto;
}
.big-title {
  margin-top: 100px;

  h1 {
    color:$primary-color;
    line-height: 64px;
    font-size: 56px;
    font-weight: bold;
  }
  p {
    font-size: 26px;
    line-height: 34px;
    color: $second-text-color;

    &.big {
      font-size: 36px;
      line-height: 55px;
      color: $text-color;
      font-weight: bold;
    }

  }
}
.big-demo {
  img {
    position: absolute;
    right: 300px;
    top: -60px;
    z-index: -1;
  }
}

@media screen and (max-width: 1600px) {
  .big-demo img {
    right: 200px;
  }
}
@media screen and (max-width: 1450px) {
  .big-demo img {
    right: 100px;
  }
}
@media screen and (max-width: 1200px) {
  .big-demo img {
    position: relative;
    margin-top: 30px;
    right: 0;
    top: 0;
  }
  .big-home-area {
    padding: 0 50px;
  }
}

.big-start {
  padding: 20px 0 40px 0;

  button {
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 30px;
    outline: none;
    appearance: none;
    border: 1px solid #c2c2c2;
    color: $second-text-color;
    background-color: #f0f0f0;
    margin-right: 10px;

    &.primary {
      border: 1px solid $primary-color;
      color: $inverse-text-color;
      background-color: $primary-color;
    }
  }
}
</style>