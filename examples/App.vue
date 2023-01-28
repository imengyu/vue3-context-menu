<template>
  <div class="full test">
    <div class="test-top">
      <h1>Vue3 Context menu</h1>
      <router-link :to="{ name: 'BasicUseage' }">Base useage</router-link>
      <router-link :to="{ name: 'BasicCustomize' }">Base customize</router-link>
      <router-link :to="{ name: 'BasicComponent' }">Component useage</router-link>
      <router-link :to="{ name: 'ComponentCustomize' }">Component customize</router-link>
      <router-link :to="{ name: 'Theme' }">Themes</router-link>
      <router-link :to="{ name: 'InScaledBody' }">Use In scaled</router-link>
      <router-link :to="{ name: 'ChangeContainer' }">Change container</router-link>
    </div>
    <div class="test-host">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style>

.full {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

html, body, #app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}
.test {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}

.test .test-host {
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
.test .test-top {
  position: absolute;
  top: 0;
  left: 20px;
  right: 20px;
  height: 40px;
}

.test .test-top h1 {
  display: inline-block;
  margin: 0;
  color: #000;
  margin-left: 140px;
}
.test .test-top a {
  margin: 0 20px;
  color: #1a7ff1;
  text-decoration: underline;
}

.test img {
  width: 300px;
}

.horbox {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.box1 {
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  border: 1px solid #3676ff;
  background-color: #89bffc;
}
.box3 {
  position: relative;
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  border: 1px solid #ff9252;
  background-color: #ffefbc;
}
.box4 {
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  border: 1px dashed #ececec;
  background-color: #dadada;
}
.box6 {
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  user-select: none;
  color: #000;
  background-color: rgb(245, 245, 245);
  border: 1px dashed #7e7e7e;
}
.box5 {
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  user-select: none;
  color: #fff;
  background-color: #7e7e7e;
  border: 1px dashed #ececec;
}
.box2 {
  width: 80%;
  padding: 20px 60px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #777777;
  color: #fff;
}
code {
  border-radius: 10px;
}

</style>
