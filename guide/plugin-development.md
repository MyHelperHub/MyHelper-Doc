# 插件开发指南

## 插件系统介绍

MyHelper 的插件系统基于 Vue3 + TypeScript，提供了丰富的 API 和完整的类型支持，让你能够轻松开发功能强大的插件。

## 快速开始

### 创建插件项目

1. 使用官方模板创建插件：

```bash
cd plugin
npm create mh-plugin my-plugin
```

2. 安装依赖：

```bash
cd my-plugin
npm install
```

3. 启动开发服务器：

```bash
npm run dev
```

## 项目结构

```
my-plugin/
├── src/
│   ├── components/     # 组件目录
│   ├── store/         # 状态管理
│   ├── utils/         # 工具函数
│   ├── App.vue        # 插件主组件
│   └── main.ts        # 入口文件
├── public/            # 静态资源
├── plugin.json        # 插件配置文件
└── package.json       # 项目配置文件
```

## 插件配置

`plugin.json` 示例：

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "我的第一个插件",
  "author": "你的名字",
  "main": "dist/index.js",
  "icon": "public/icon.png",
  "permissions": [
    "file",
    "network",
    "clipboard"
  ],
  "features": {
    "window": {
      "width": 800,
      "height": 600,
      "resizable": true
    }
  }
}
```

## API 使用

### 文件操作

```typescript
import { FileHelper } from '@myhelper/api';

const fileHelper = new FileHelper();

// 读取文件
async function readFile() {
  try {
    const content = await fileHelper.readFile('example.txt');
    console.log(content);
  } catch (error) {
    console.error('读取文件失败:', error);
  }
}
```

### 网络请求

```typescript
import { NetworkHelper } from '@myhelper/api';

const networkHelper = new NetworkHelper();

// 发送请求
async function fetchData() {
  try {
    const response = await networkHelper.get('https://api.example.com/data');
    console.log(response.data);
  } catch (error) {
    console.error('请求失败:', error);
  }
}
```

### 数据存储

```typescript
import { DatabaseHelper } from '@myhelper/api';

const dbHelper = new DatabaseHelper({
  type: 'sqlite',
  database: 'plugin-data.db'
});

// 保存数据
async function saveData() {
  try {
    await dbHelper.execute(
      'INSERT INTO settings (key, value) VALUES (?, ?)',
      ['theme', 'dark']
    );
  } catch (error) {
    console.error('保存失败:', error);
  }
}
```

## UI 开发

### 使用内置组件

```vue
<template>
  <mh-window title="我的插件">
    <mh-button @click="handleClick">点击我</mh-button>
    <mh-input v-model="text" placeholder="请输入" />
    <mh-table :data="tableData" :columns="columns" />
  </mh-window>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MhWindow, MhButton, MhInput, MhTable } from '@myhelper/ui';

const text = ref('');
const tableData = ref([]);
const columns = [
  { title: '名称', key: 'name' },
  { title: '值', key: 'value' }
];

function handleClick() {
  console.log('按钮被点击');
}
</script>
```

## 状态管理

```typescript
// store/index.ts
import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => ({
    settings: {},
    data: []
  }),
  actions: {
    async loadSettings() {
      // 加载设置
    },
    async saveSettings(settings: any) {
      // 保存设置
    }
  }
});
```

## 打包发布

1. 构建插件：

```bash
npm run build
```

2. 测试插件：

```bash
npm run test
```

3. 发布插件：

```bash
npm run publish
```

## 最佳实践

1. **性能优化**
   - 使用异步加载
   - 避免不必要的计算
   - 合理使用缓存

2. **错误处理**
   - ���用 try-catch 捕获异常
   - 提供友好的错误提示
   - 记录错误日志

3. **代码规范**
   - 遵循 TypeScript 规范
   - 编写清晰的注释
   - 保持代码简洁

4. **安全考虑**
   - 验证用户输入
   - 安全地处理敏感数据
   - 使用最小权限原则

## 调试技巧

1. **开发者工具**
   - 使用 Vue Devtools
   - 控制台调试
   - 网络请求分析

2. **日志记录**
```typescript
import { Logger } from '@myhelper/api';

const logger = new Logger('my-plugin');
logger.info('插件初始化');
logger.error('发生错误', error);
```

## 常见问题

1. **插件加载失败**
   - 检查配置文件
   - 验证依赖项
   - 查看错误日志

2. **API 调用错误**
   - 确认权限设置
   - 检查参数类型
   - 查看文档示例

3. **性能问题**
   - 优化数据结构
   - 减少不必要的渲染
   - 使用性能分析工具
 