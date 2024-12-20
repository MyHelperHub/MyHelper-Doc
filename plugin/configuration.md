# 插件配置

本文详细介绍 MyHelper 插件的配置选项和使用方法。

## 配置文件

### plugin.json
插件的主要配置文件，定义了插件的基本信息和功能特性：

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "插件描述",
  "author": {
    "name": "作者名称",
    "email": "author@example.com",
    "url": "https://example.com"
  },
  "license": "MIT",
  "homepage": "https://github.com/author/my-plugin",
  "repository": {
    "type": "git",
    "url": "https://github.com/author/my-plugin.git"
  },
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "icon": "assets/icon.png",
  "features": {
    "window": {
      "width": 800,
      "height": 600,
      "resizable": true,
      "frame": true,
      "transparent": false
    },
    "permissions": [
      "clipboard",
      "notification",
      "storage",
      "network"
    ],
    "shortcuts": [
      {
        "key": "CommandOrControl+Shift+P",
        "action": "openWindow"
      }
    ]
  },
  "dependencies": {
    "required": ["plugin-a", "plugin-b"],
    "optional": ["plugin-c"]
  }
}
```

## 基本配置

### 插件信息
- `name`: 插件唯一标识符
- `version`: 遵循语义化版本
- `description`: 插件功能描述
- `author`: 作者信息
- `license`: 开源协议
- `homepage`: 项目主页
- `repository`: 代码仓库

### 入口文件
- `main`: 编译后的主入口文件
- `types`: TypeScript 类型定义文件
- `icon`: 插件图标路径

## 功能配置

### 窗口配置
```json
{
  "window": {
    "width": 800,
    "height": 600,
    "minWidth": 400,
    "minHeight": 300,
    "maxWidth": 1920,
    "maxHeight": 1080,
    "resizable": true,
    "frame": true,
    "transparent": false,
    "alwaysOnTop": false,
    "center": true,
    "skipTaskbar": false,
    "title": "插件标题",
    "icon": "assets/window-icon.png"
  }
}
```

### 权限配置
```json
{
  "permissions": {
    "clipboard": {
      "read": true,
      "write": true
    },
    "notification": true,
    "storage": {
      "scope": "plugin",
      "quota": "100MB"
    },
    "network": {
      "domains": ["api.example.com"],
      "protocols": ["https"]
    },
    "system": {
      "shell": false,
      "file": {
        "read": true,
        "write": false
      }
    }
  }
}
```

### 快捷键配置
```json
{
  "shortcuts": [
    {
      "key": "CommandOrControl+Shift+P",
      "action": "openWindow",
      "global": true
    },
    {
      "key": "Alt+S",
      "action": "search",
      "global": false
    }
  ]
}
```

## 依赖管理

### 插件依赖
```json
{
  "dependencies": {
    "required": [
      {
        "name": "plugin-a",
        "version": "^1.0.0"
      },
      {
        "name": "plugin-b",
        "version": ">=2.0.0"
      }
    ],
    "optional": [
      {
        "name": "plugin-c",
        "version": "*"
      }
    ]
  }
}
```

### 包依赖
```json
{
  "peerDependencies": {
    "@myhelper/core": "^2.0.0",
    "@myhelper/ui": "^1.0.0"
  },
  "dependencies": {
    "lodash": "^4.17.21",
    "axios": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^4.8.0",
    "vite": "^4.0.0"
  }
}
```

## 开发配置

### TypeScript 配置
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "lib": ["ESNext", "DOM"],
    "moduleResolution": "Node",
    "strict": true,
    "sourceMap": true,
    "declaration": true,
    "outDir": "dist",
    "types": ["@myhelper/types"]
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

### Vite 配置
```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyPlugin',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', '@myhelper/core'],
      output: {
        globals: {
          vue: 'Vue',
          '@myhelper/core': 'MyHelperCore'
        }
      }
    }
  }
})
```

## 本地化配置

### 语言配置
```json
{
  "i18n": {
    "defaultLocale": "zh-CN",
    "locales": ["zh-CN", "en-US", "ja-JP"],
    "fallbackLocale": "en-US"
  }
}
```

### 翻译文件
```json
{
  "locales": {
    "zh-CN": {
      "title": "我的插件",
      "description": "插件描述"
    },
    "en-US": {
      "title": "My Plugin",
      "description": "Plugin Description"
    }
  }
}
```

## 主题配置

### 主题支持
```json
{
  "theme": {
    "support": true,
    "dark": true,
    "light": true,
    "custom": true
  }
}
```

### 主题变量
```json
{
  "theme": {
    "variables": {
      "light": {
        "--primary-color": "#007AFF",
        "--background-color": "#FFFFFF"
      },
      "dark": {
        "--primary-color": "#0A84FF",
        "--background-color": "#000000"
      }
    }
  }
}
```

## 更新配置

### 更新检查
```json
{
  "update": {
    "auto": true,
    "interval": "1d",
    "url": "https://api.example.com/updates",
    "channel": "stable"
  }
}
```

### 版本控制
```json
{
  "version": "1.0.0",
  "compatibility": {
    "myhelper": ">=2.0.0",
    "node": ">=16.0.0"
  }
}
```

## 调试配置

### 开发模式
```json
{
  "development": {
    "port": 3000,
    "host": "localhost",
    "https": false,
    "hot": true,
    "sourcemap": true
  }
}
```

### 日志配置
```json
{
  "logging": {
    "level": "debug",
    "file": true,
    "console": true,
    "maxSize": "10MB",
    "maxFiles": 5
  }
}
```

## 最佳实践

### 配置检查
1. 使用 JSON Schema 验证
2. 检查必需字段
3. 验证版本号格式
4. 检查权限合理性

### 安全考虑
1. 最小权限原则
2. 验证域名白名单
3. 加密敏感配置
4. 安全的依赖版本

### 性能优化
1. 按需加载配置
2. 缓存配置文件
3. 优化��赖大小
4. 合理的更新策略

## 常见问题

### 配置问题
- 格式错误
- 字段缺失
- 版本冲突
- 权限不足

### 依赖问题
- 版本不兼容
- 循环依赖
- 缺失依赖
- 过时包引用

### 更新问题
- 更新失败
- 版本回退
- 配置迁移
- 兼容性问题

## 更多资源

- [配置模板](https://github.com/MyHelperHub/plugin-template/blob/main/plugin.json)
- [JSON Schema](https://github.com/MyHelperHub/plugin-schema)
- [配置验证工具](https://github.com/MyHelperHub/plugin-validator)
- [常见问题](/plugin/faq) 