---
title: Theme
order: 3
---

# Theme

## Built-in themes

The menu contains the following themes, which you can choose to use.

Just set the 'theme' field in the menu options:

```js
this.$contextmenu({
  theme: 'mac dark',
  items: [
  ],
  //...
});
```

|Theme|Explain|Image|
|--|--|--|
|`default`|Default theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-default.jpg)|
|`default dark`|Default theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-default-dark.jpg)|
|`flat`|Simple flat theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-flat.jpg)|
|`flat dark`|Simple flat theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-flat-dark.jpg)|
|`win10`|Win10 like theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-win10.jpg)|
|`win10 dark`|Win10 like theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-win10-dark.jpg)|
|`mac`|Mac like theme|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-mac.jpg)|
|`mac dark`|Mac like theme with dark|![example-default-dark.jpg](https://raw.githubusercontent.com/imengyu/vue3-context-menu/main/screenshot/example-mac-dark.jpg)|

## Custom Theme

You can write your own theme, just make sure that the theme name is different from the built-in name.

All CSS style definitions are in [`/ContextMenu.scss`](https://github.com/imengyu/vue3-context-menu/blob/main/library/ContextMenu.scss). You can copy all the styles, modify them as needed, and store them in your file.

### Custom Theme Example

For example, the following is the implementation of an example theme `my-theme-name. Your own theme can also be implemented in this way:

```scss
.mx-context-menu.my-theme-name {
  & {
    //Overwrite the value of the default css variable here
    --mx-menu-backgroud: #ececec;
    --mx-menu-hover-backgroud: #0165e1;
  }
  
  //Customize menu outer style
  padding: 8px 0;
  box-shadow: 0px 5px 7px 1px var(--mx-menu-shadow-color);
  border: 1px solid var(--mx-menu-border-color);

  //Customize the style of menu item
  .mx-context-menu-item {
    border-radius: 5px;
    margin: 0 6px;
    padding: 3px 6px;
  }

  //Please view the complete style of each part in ContextMenu.scss
}
.mx-menu-bar.my-theme-name {
  //Customize the style of the menu bar
}
```

Then import the theme file and use it in theme:

```js
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import 'your-style-file-path.scss'
```

```js
this.$contextmenu({
  theme: 'my-theme-name',
  items: [
  ],
  //...
});
```
