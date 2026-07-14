<template>
  <div class="test">
    <div class="test-top">
      <h1>Vue3 Context menu</h1>
      <router-link :to="{ name: 'BasicUseage' }">Base useage</router-link>
      <router-link :to="{ name: 'BasicCustomize' }">Base customize</router-link>
      <router-link :to="{ name: 'BasicComponent' }">Component useage</router-link>
      <router-link :to="{ name: 'ComponentCustomize' }">Component customize</router-link>
      <router-link :to="{ name: 'Theme' }">Themes</router-link>
      <router-link :to="{ name: 'ChangeContainer' }">Change container</router-link>
      <router-link :to="{ name: 'MenuBar' }">MenuBar</router-link>
      <router-link :to="{ name: 'DestroyOnClose' }">DestroyOnClose</router-link>
      <router-link :to="{ name: 'MenuTrigger' }">MenuTrigger</router-link>
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

<style lang="scss">

html, body, #app {
  position: relative;
  width: 100%;
  margin: 0;
  background-color: #fafbfc;
}
.test {
  position: relative;

  .test-host {
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    margin-left: 24px;
    margin-right: 24px;
    gap: 8px;
    max-width: 1200px;
    margin: 0 auto;
  }
  .test-top {
    padding: 24px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;

    h1 {
      margin: 0;
      margin-right: 16px;
      color: #1a1a1a;
      font-size: 22px;
      font-weight: 600;
    }
    a {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      color: #555;
      text-decoration: none;
      font-size: 14px;
      background-color: #f0f0f0;
      transition: background-color 0.2s, color 0.2s;

      &:hover {
        background-color: #e0e0e0;
        color: #333;
      }
      &.router-link-active {
        background-color: #4a90d9;
        color: #fff;
      }
    }
  }

  img {
    width: 300px;
  }
}

.horbox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
}
.box1 {
  padding: 60px 20px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  border: none;
  border-radius: 8px;
  background-color: #e8f0fe;
  color: #2c5282;
}
.box3 {
  position: relative;
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  user-select: none;
  border: none;
  border-radius: 8px;
  background-color: #f0f0f0;
  color: #444;
}
.box4 {
  padding: 10px 0;
  text-align: center;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  background-color: #eaeaea;
  color: #555;
}
.box6 {
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  user-select: none;
  color: #333;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
}
.box5 {
  padding: 60px 0;
  text-align: center;
  font-size: 18px;
  user-select: none;
  color: #fff;
  background-color: #6b7280;
  border: none;
  border-radius: 8px;
}
.box2 {
  padding: 20px 60px;
  margin-top: 10px;
  border-radius: 8px;
  background-color: #6b7280;
  color: #fff;
}
code {
  border-radius: 8px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 4px;

  div {
    position: relative;
    padding: 10px;
    text-align: center;
    font-size: 13px;
    user-select: none;
    border: none;
    border-radius: 8px;
    background-color: #f0f0f0;
    color: #444;
  }
}

@media screen and (max-width: 1200px) {
  .test {
    .test-top {
      flex-wrap: wrap;
    }
  }
}
@media screen and (max-width: 800px) {
  .test {
    .test-top {
      padding: 16px 16px 0;

      h1 {
        width: 100%;
        font-size: 20px;
      }
    }
  }
  .fork-img img {
    width: 100px;
    height: 100px;
  }
  .horbox {
    flex-direction: column;
  }
}

@media screen and (max-width: 425px) {
  .test {
    .test-top {
      h1 {
        font-size: 18px;
      }
    }
  }
  .fork-img img {
    width: 80px;
    height: 80px;
  }
}
</style>
