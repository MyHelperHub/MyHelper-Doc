# 插件开发入门

## 开发环境

- Node.js >= 16
- Rust >= 1.75
- npm >= 9.0
- Vue 3 + TypeScript 开发经验

## 快速开始

### 1. 准备工作

进入插件目录并安装依赖：
```bash
cd plugin/my-plugin
npm install
```

### 2. 项目结构
```
my-plugin/
├── src/
│   ├── components/     # Vue 组件
│   ├── plugin-api/     # 插件 API
│   ├── App.vue        # 主组件
│   └── main.ts        # 入口文件
├── myPlugin.json      # 插件配置
├── package.json      # 项目配置
└── README.md         # 说明文档
```

### 3. 配置插件

编辑 `myPlugin.json`：
```json
{
  "windowId": "my-plugin",     // 插件窗口ID，必填且唯一
  "title": "我的插件",         // 插件窗口标题
  "size": [800, 600],         // 窗口大小 [宽, 高]
  "position": [-1, -1],       // 窗口位置 [x, y]，-1 表示居中
  "alwaysOnTop": false,       // 是否窗口置顶
  "resizable": true,          // 是否允许调整大小
  "icon": "./icon.png"        // 插件图标路径
}
```

### 4. 开发插件

创建主组件 `src/App.vue`：
```vue
<template>
  <Toast />
  <div class="plugin-container">
    <i class="pi pi-times close-button" @click="handleClose"></i>
    <h3>{{ title }}</h3>
    <Button @click="handleClick">点击我</Button>
    <div class="content">
      <input v-model="text" placeholder="输入文本">
      <Button @click="copyText">复制</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import { closeWindow, ipcWriteClipboard } from '@/plugin-api/plugin.api'
import { ref } from 'vue'

const toast = useToast()
const title = ref('我的插件')
const text = ref('')

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

const copyText = async () => {
  if (!text.value) return
  
  try {
    await ipcWriteClipboard(text.value)
    toast.add({
      severity: 'success',
      summary: '成功',
      detail: '文本已复制到剪贴板',
      life: 3000
    })
    text.value = ''
  } catch (error) {
    console.error('复制失败:', error)
  }
}
</script>

<style lang="less" scoped>
.plugin-container {
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

  .content {
    margin: 20px 0;
    display: flex;
    gap: 10px;

    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }
}
</style>
```

## 可用 API

### 窗口管理
```typescript
import { 
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow 
} from '@/plugin-api/plugin.api'
```

### 配置存储
```typescript
import { getSelfConfig, setSelfConfig } from '@/plugin-api/plugin.api'
```

### 剪贴板操作
```typescript
import { 
  ipcWriteClipboard,
  ipcPaste,
  ipcStartClipboardListener,
  ipcStopClipboardListener 
} from '@/api/ipc/clipboard.api'
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