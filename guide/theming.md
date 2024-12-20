# 主题定制指南

## 主题系统介绍

MyHelper 提供了灵活的主题定制系统，你可以：
- 修改颜色方案
- 自定义组件样式
- 创建自己的主题包
- 分享主题到社区

## 快速开始

### 使用预设主题

```typescript
import { useTheme } from '@myhelper/theme';

// 使用内置主题
const theme = useTheme();
theme.use('dark');  // 使用暗色主题
theme.use('light'); // 使用亮色主题
```

### 自定义主题

```typescript
theme.customize({
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    background: '#ffffff',
    text: '#2c3e50'
  }
});
```

## 主题配置

### 颜色系统

```typescript
interface ThemeColors {
  // 主要颜色
  primary: string;
  secondary: string;
  accent: string;
  
  // 背景颜色
  background: string;
  surface: string;
  
  // 文字颜色
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  
  // 状态颜色
  success: string;
  warning: string;
  error: string;
  info: string;
}
```

### 组件样式

```typescript
interface ThemeComponents {
  // 按钮样式
  button: {
    borderRadius: string;
    padding: string;
    fontSize: string;
  };
  
  // 输入框样式
  input: {
    height: string;
    borderColor: string;
    focusColor: string;
  };
  
  // 卡片样式
  card: {
    shadow: string;
    borderRadius: string;
  };
}
```

## CSS 变量

MyHelper 使用 CSS 变量实现主题切换：

```css
:root {
  /* 颜色变量 */
  --mh-color-primary: #3498db;
  --mh-color-secondary: #2ecc71;
  --mh-color-accent: #e74c3c;
  
  /* 尺寸变量 */
  --mh-spacing-unit: 8px;
  --mh-border-radius: 4px;
  
  /* 字体变量 */
  --mh-font-family: 'Inter', sans-serif;
  --mh-font-size-base: 14px;
}

/* 暗色主题 */
[data-theme="dark"] {
  --mh-color-background: #1a1a1a;
  --mh-color-surface: #2d2d2d;
  --mh-color-text: #ffffff;
}
```

## 创建主题包

1. **创建主题文件**

```typescript
// my-theme.ts
import { defineTheme } from '@myhelper/theme';

export default defineTheme({
  name: 'my-theme',
  colors: {
    // 颜色配置
  },
  components: {
    // 组件样式
  }
});
```

2. **注册主题**

```typescript
import myTheme from './my-theme';
import { registerTheme } from '@myhelper/theme';

registerTheme(myTheme);
```

## 响应式主题

### 媒体查询

```css
/* 根据屏幕尺寸调���主题 */
@media (max-width: 768px) {
  :root {
    --mh-spacing-unit: 6px;
    --mh-font-size-base: 12px;
  }
}
```

### 系统主题跟随

```typescript
// 监听系统主题变化
const theme = useTheme();
theme.followSystem(); // 自动跟随系统主题
```

## 主题切换动画

```css
/* 添加平滑过渡 */
:root {
  transition: all 0.3s ease;
}

.theme-transition {
  transition: background-color 0.3s ease,
              color 0.3s ease,
              border-color 0.3s ease;
}
```

## 最佳实践

1. **颜色管理**
   - 使用语义化的颜色命名
   - 保持适当的对比度
   - 考虑色盲用户

2. **组件一致性**
   - 统一组件风格
   - 保持间距规律
   - 注意视觉层级

3. **性能优化**
   - 避免过多的CSS变量
   - 合理使用过渡动画
   - 优化选择器性能

## 主题开发工具

1. **调色板生成器**
```typescript
import { generatePalette } from '@myhelper/theme';

const palette = generatePalette('#3498db', {
  variations: 9,  // 生成 9 个色阶
  saturation: 0.8 // 饱和度调整
});
```

2. **主题预览器**
```typescript
import { ThemePreview } from '@myhelper/theme';

const preview = new ThemePreview();
preview.show(myTheme); // 预览主题效果
```

## 发布主题

1. **打包主题**
```bash
npm run build:theme
```

2. **发布到主题市场**
```bash
npm run publish:theme
```

## 常见问题

1. **主题切换闪烁**
   - 使用 CSS 变量
   - 添加过渡动画
   - 预加载主题

2. **组件样式冲突**
   - 使用 CSS Modules
   - 遵循 BEM 命名
   - 合理使用作用域 