# MyHelper 插件开发指南 🔌

## 目录
- [环境准备](#环境准备)
- [快速开始](#快速开始)
- [插件配置](#插件配置)
- [API 参考](#api-参考)
- [UI 开发](#ui-开发)
- [发布流程](#发布流程)

## 环境准备

### 开发环境要求
- Node.js >= 16
- Rust >= 1.75
- npm >= 9.0
- Vue 3 + TypeScript 开发经验

## 快速开始

### 1. 创建插件项目
```bash
# 进入插件目录
cd plugin/my-plugin

# 安装依赖
npm install
```

### 2. 项目结构
```
my-plugin/
├── src/              # 前端代码
│   ├── components/   # Vue 组件
│   ├── plugin-api/   # 插件 API
│   ├── App.vue       # 主界面
│   └── main.ts       # 入口文件
├── public/           # 静态资源
├── myPlugin.json     # 插件配置文件
└── package.json      # 项目配置文件
```

## 插件配置

### myPlugin.json
必须严格按照以下格式配置（此文件名不可修改）：

```json
{
  "windowId": "mh-plugin",     // 插件窗口ID，必填且唯一
  "title": "新建插件",         // 插件窗口标题
  "size": [800, 600],         // 窗口大小 [宽, 高]
  "position": [-1, -1],       // 窗口位置 [x, y]，-1 表示居中
  "alwaysOnTop": false,       // 是否窗口置顶
  "resizable": true,          // 是否允许调整大小
  "icon": "./icon.png"        // 插件图标路径
}
```

**注意事项：**
- 所有字段都必须填写，不能缺少
- 字段类型必须严格匹配
- `windowId` 在所有插件中必须唯一
- `size` 和 `position` 必须是两个元素的数组
- `icon` 路径相对于插件根目录

## API 参考

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

### 剪贴板操作
```typescript
import { 
  ipcWriteClipboard,
  ipcPaste,
  ipcStartClipboardListener,
  ipcStopClipboardListener 
} from '@/api/ipc/clipboard.api'

// 写入剪贴板
await ipcWriteClipboard('文本内容')

// 读取剪贴板
const content = await ipcPaste()

// 监听剪贴板
ipcStartClipboardListener()
ipcStopClipboardListener()
```

## UI 开发

### 使用 PrimeVue 组件
MyHelper 默认集成了 PrimeVue 组件库，可以直接使用：

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
const title = ref('MyHelper Plugin')

const handleClick = () => {
  toast.add({
    severity: 'success',
    summary: 'MyHelper',
    detail: '欢迎使用 MyHelper!',
    life: 3000
  })
}

const handleClose = () => {
  closeWindow()
}
</script>

<style lang="less" scoped>
.my-plugin {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  
  .close-button {
    position: absolute;
    top: 5px;
    right: 12px;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
```

### 样式开发
- 支持 Less 预处理器
- 默认集成了 PrimeIcons 图标
- 可以使用 scoped style 隔离样式
- 支持自定义主题

## 开发调试

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 常见问题

### Q: 如何调试插件？
A: 使用 `npm run dev` 启动开发服务器，支持热重载和 Chrome DevTools 调试。

### Q: 如何更新插件？
A: 修改 `myPlugin.json` 中的版本号，重新打包提交即可。

### Q: 如何获取帮助？
A: 可以通过以下方式获取帮助：
- 问题反馈：[Issues](https://github.com/MyHelperHub/myhelper/issues)
- QQ交流群：206028763