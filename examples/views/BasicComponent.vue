<template>
  <div class="box1" @contextmenu="onContextMenu($event)">
    Right click to show contextmenu !
  </div>
  <div class="box4">
    You can open examples\views\BasicComponent.vue file view complete source code.
  </div>

  <!--this is component mode of context-menu-->
  <context-menu
    ref="refTest"
    v-model:show="show"
    :options="optionsComponent"
  >
    <context-menu-item label="Simple item" @click="alertContextMenuItemClicked('Item1')" />
    <context-menu-item label="Item with a icon" icon="icon-reload-1" @click="alertContextMenuItemClicked('Item2')" />
    <context-menu-item label="Test item dynamic show and hide" :clickClose="false" @click="showItem=!showItem" />
    <context-menu-item v-if="showItem" label="Click the item above to show/hide me" />
    <context-menu-sperator v-if="showItem" />
    <context-menu-item :label="itemText" :clickClose="false" @click="changeLabelText" />
    <context-menu-group label="Menu with child" @subMenuOpen="handleSubMenuOpen">
      <template #icon>
        <i class="iconfont icon-yidong"></i>
      </template>
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1-1')" />
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1-2')" />
    </context-menu-group>
    <context-menu-group label="Menu with child child child" @subMenuOpen="handleSubMenuOpen">
      <context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item2-1')" />
      <context-menu-sperator />
      <context-menu-group label="Child with v-for 50">
        <context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="alertContextMenuItemClicked('Item2-3-' + index)" />
      </context-menu-group>
      <context-menu-group label="Childs" @subMenuOpen="handleSubMenuOpen">
        <context-menu-item label="Item1-1" @click="alertContextMenuItemClicked('Item3-1-1')" />
        <context-menu-item label="Item1-2" @click="alertContextMenuItemClicked('Item3-1-2')" />
        <context-menu-sperator />
        <context-menu-group label="Childs" @subMenuOpen="handleSubMenuOpen">
          <context-menu-item label="Item2-1" @click="alertContextMenuItemClicked('Item3-2-1')" />
          <context-menu-item label="Item2-2" @click="alertContextMenuItemClicked('Item3-2-2')" />
        </context-menu-group>
      </context-menu-group>
    </context-menu-group>
    <context-menu-item label="Test dynamic change theme" :clickClose="false" @click="optionsComponent.theme = (optionsComponent.theme === 'dark' ? '' : 'dark')" />
    <context-menu-group label="Test Menu item slot" @subMenuOpen="handleSubMenuOpen">
      <template #icon>
        <i class="iconfont icon-yidong"></i>
      </template>
      <context-menu-item>
        <template #label>
          Custom label slot <span class="test-tag">tag name</span>
        </template>
      </context-menu-item>
      <context-menu-item>
        <template #label>
          Custom shortcut slot
        </template>
        <template #shortcut>
          <span class="test-tag2">#shortcut: my</span>
        </template>
      </context-menu-item>
      <context-menu-item>
        <template #label>
          Custom icon slot
        </template>
        <template #icon>
          <i class="iconfont icon-terminal"></i>
        </template>
      </context-menu-item>
      <context-menu-item checked>
        <template #label>
          Custom check slot
        </template>
        <template #check>
          ✔
        </template>
      </context-menu-item>
      <context-menu-item showRightArrow>
        <template #label>
          Custom rightArrow slot
        </template>
        <template #rightArrow>
          >>
        </template>
      </context-menu-item>
    </context-menu-group>
  </context-menu>

  
  <!--Demo scripts-->
  <div class="box2">
    <pre>
      <code class="language-html">  
&lt;!--this is component mode of context-menu--&gt;
&lt;context-menu
v-model:show="show"
:options="optionsComponent"
&gt;
&lt;context-menu-item label="Simple item" @click="alertContextMenuItemClicked('Item1')" /&gt;
&lt;context-menu-item label="Item with a icon" icon="icon-reload-1" @click="alertContextMenuItemClicked('Item2')" /&gt;
&lt;context-menu-group label="Menu with child"&gt;
  &lt;context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1-1')" /&gt;
  &lt;context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item1-2')" /&gt;
&lt;/context-menu-group&gt;
&lt;context-menu-sperator /&gt;
&lt;context-menu-group label="Menu with child child child"&gt;
  &lt;context-menu-item label="Item1" @click="alertContextMenuItemClicked('Item2-1')" /&gt;
  &lt;context-menu-item label="Item2" @click="alertContextMenuItemClicked('Item2-2')" /&gt;
  &lt;context-menu-sperator /&gt;
  &lt;context-menu-group label="Child with v-for 50"&gt;
    &lt;context-menu-item v-for="index of 50" :key="index" :label="'Item3-'+index" @click="alertContextMenuItemClicked('Item2-3-' + index)" /&gt;
  &lt;/context-menu-group&gt;
  &lt;context-menu-group label="Childs"&gt;
    &lt;context-menu-item label="Item1-1" @click="alertContextMenuItemClicked('Item3-1-1')" /&gt;
    &lt;context-menu-item label="Item1-2" @click="alertContextMenuItemClicked('Item3-1-2')" /&gt;
    &lt;context-menu-sperator /&gt;
    &lt;context-menu-group label="Childs"&gt;
      &lt;context-menu-item label="Item2-1" @click="alertContextMenuItemClicked('Item3-2-1')" /&gt;
      &lt;context-menu-item label="Item2-2" @click="alertContextMenuItemClicked('Item3-2-2')" /&gt;
    &lt;/context-menu-group&gt;
  &lt;/context-menu-group&gt;
&lt;/context-menu-group&gt;
&lt;/context-menu&gt;
      </code>
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from 'vue'
import type { ContextMenuInstance, MenuItemContext, MenuOptions } from '../../library/ContextMenuDefine';

const showItem = ref(true)
const show = ref(false)
const itemText = ref('Test item dynamic change label')
const optionsComponent = reactive<MenuOptions>({
  iconFontClass: 'iconfont',
  customClass: "class-a",
  zIndex: 3,
  minWidth: 230,
  x: 500,
  y: 200,
  //menuTransitionProps: {
  //  name: 'fade',
  //}
});

const refTest = ref<ContextMenuInstance>();

onMounted(() => {
  (window as unknown as {
    hljs: {
      highlightAll: () => void
    }
  }).hljs?.highlightAll?.();
  window.addEventListener('blur', ()=>{
    console.log("窗口失去焦点",show.value)
    //show.value = false;
  })
});

watch(() => show.value, (newValue, oldValue) => {
  console.log("show的值变换了", oldValue, '->', newValue)
})

function handleSubMenuOpen(instance: MenuItemContext) 
{
  console.log('子弹窗大小：', instance.getSubMenuInstance()?.getMenuDimensions());
}

function onContextMenu(e : MouseEvent) {
  e.preventDefault();
  //Set the mouse position
  optionsComponent.x = e.x;
  optionsComponent.y = e.y;
  //Show menu
  show.value = true;

  setTimeout(() => {
    console.log('菜单大小', refTest.value?.getMenuDimensions());
    console.log('1s后显示第五个子菜单');
    refTest.value?.getMenuRef()?.getChildItem(5)?.showSubMenu();
  }, 1000);
}
function changeLabelText() {
  itemText.value = (itemText.value == 'My label CHANGED!' ? 'Test item dynamic change label' : 'My label CHANGED!');
}
function alertContextMenuItemClicked(name: string) {
  alert('You clicked ' + name + ' !');
}
</script>

<style>
.test-tag {
  background-color: #efefef;
  padding: 5px;
  border-radius: 5px;
  margin-left: 10px;
}
.test-tag2 {
  background-color: #ff9a9a;
  padding: 5px;
  border-radius: 25px;
  margin-left: 10px;
}
</style>