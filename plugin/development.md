# 插件开发指南

MyHelper 插件系统基于 Vue 3 + TypeScript,提供了高度的开发自由度。你可以使用任何喜欢的第三方库和框架来开发插件,充分发挥创意。

## 开发环境准备

1. 安装 Node.js (推荐 v18 或更高版本)
2. 安装 Visual Studio Code
3. 安装 Rust 开发环境

## 创建插件项目

使用 MyHelper CLI 创建一个新的插件项目:

```bash
npm create myhelper-plugin@latest my-plugin
cd my-plugin
```

## 项目结构

```
my-plugin/
├── src/                # 源代码目录
│   ├── App.vue        # 主组件
│   └── main.ts        # 入口文件
├── public/            # 静态资源
├── myPlugin.json      # 插件配置文件
└── package.json       # 项目配置文件
```

## 配置文件

`myPlugin.json` 示例:

```json
{
  "windowId": "my-plugin",
  "title": "我的插件",
  "size": [800, 600],
  "position": [100, 100],
  "alwaysOnTop": false,
  "resizable": true,
  "icon": "icon.png"
}
```

## 开发自由度

### 使用第三方库
你可以自由使用任何 npm 包来扩展插件功能:

- UI 框架: Element Plus、Ant Design Vue、Naive UI 等
- 工具库: Lodash、Axios、Day.js 等
- 图表库: ECharts、Chart.js、D3.js 等
- 动画库: GSAP、Anime.js、Motion One 等
- 状态管理: Pinia、Vuex 等
- 任何其他你喜欢的库

### 自定义样式
- 可以使用任何 CSS 预处理器(Less、Sass、Stylus)
- 支持 CSS Modules、CSS in JS
- 可以引入任何 UI 框架的样式
- 完全自定义的主题设计

### 功能扩展
- 可以调用浏览器原生 API
- 可以进行网络请求
- 可以使用 WebSocket
- 可以使用 Web Workers
- 可以使用 Canvas/WebGL
- 可以集成任何 Web 技术

## 可用 API

### 窗口管理
```typescript
import { 
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow 
} from '@/plugin-api/plugin.api'

// 关闭窗口
await closeWindow()

// 最小化窗口
await minimizeWindow()

// 最大化窗口
await maximizeWindow()

// 恢复窗口
await restoreWindow()
```

### 配置存储
```typescript
import { getSelfConfig, setSelfConfig } from '@/plugin-api/plugin.api'

// 获取配置
const config = await getSelfConfig(['theme'])

// 设置配置
await setSelfConfig(['theme'], 'dark')
```

## UI 开发

### 使用 PrimeVue 组件
MyHelper 默认集成了 PrimeVue 组件库,当然你也可以使用其他任何喜欢的 UI 框架:

```vue
<template>
  <Toast />
  <div class="my-plugin">
    <i class="pi pi-times close-button" @click="handleClose"></i>
    <h3>{{ title }}</h3>
    <Button @click="handleClick">点击我</Button>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { closeWindow } from '@/plugin-api/plugin.api'
import { ref } from 'vue'

const toast = useToast()
const title = ref('我的插件')

const handleClick = () => {
  toast.add({
    severity: 'success',
    summary: '提示',
    detail: '点击成功！',
    life: 3000
  })
}

const handleClose = () => {
  closeWindow()
}
</script>
```

## 开发调试

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 获取帮助

- [问题反馈](https://github.com/MyHelperHub/myhelper/issues)
- QQ交流群：206028763