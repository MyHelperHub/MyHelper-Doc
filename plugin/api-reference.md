# API 参考

MyHelper 插件 API 提供了丰富的功能接口，让您可以轻松扩展应用功能。

## 核心 API

### Plugin Context
插件上下文对象，提供了访问各种 API 的入口：

```typescript
interface PluginContext {
  // 插件信息
  readonly id: string
  readonly name: string
  readonly version: string
  
  // 生命周期
  onMounted(callback: () => void): void
  onUnmounted(callback: () => void): void
  
  // 系统 API
  readonly system: SystemAPI
  // 窗口 API
  readonly window: WindowAPI
  // 存储 API
  readonly storage: StorageAPI
  // 通知 API
  readonly notification: NotificationAPI
  // 剪贴板 API
  readonly clipboard: ClipboardAPI
  // 网络 API
  readonly network: NetworkAPI
  // 文件 API
  readonly file: FileAPI
  // 主题 API
  readonly theme: ThemeAPI
  // 多语言 API
  readonly i18n: I18nAPI
}
```

## 系统 API

### SystemAPI
系统相关的 API：

```typescript
interface SystemAPI {
  // 系统信息
  readonly platform: 'win32' | 'darwin' | 'linux'
  readonly arch: 'x64' | 'arm64'
  readonly version: string
  
  // 系统操作
  restart(): Promise<void>
  shutdown(): Promise<void>
  sleep(): Promise<void>
  
  // 系统事件
  onResume(callback: () => void): void
  onSuspend(callback: () => void): void
  
  // 系统对话框
  dialog: {
    showOpenDialog(options: OpenDialogOptions): Promise<string[]>
    showSaveDialog(options: SaveDialogOptions): Promise<string>
    showMessageBox(options: MessageBoxOptions): Promise<number>
  }
  
  // 系统快捷键
  shortcut: {
    register(key: string, callback: () => void): void
    unregister(key: string): void
  }
}
```

## 窗口 API

### WindowAPI
窗口管理相关的 API：

```typescript
interface WindowAPI {
  // 窗口创建
  create(options: WindowOptions): Promise<Window>
  register(name: string, options: WindowOptions): void
  
  // 窗口操作
  open(name: string): Promise<Window>
  close(name: string): Promise<void>
  
  // 窗口状态
  minimize(name: string): Promise<void>
  maximize(name: string): Promise<void>
  restore(name: string): Promise<void>
  
  // 窗口事件
  onCreated(callback: (window: Window) => void): void
  onClosed(callback: (window: Window) => void): void
  onFocus(callback: (window: Window) => void): void
  onBlur(callback: (window: Window) => void): void
}

interface Window {
  readonly id: string
  readonly name: string
  
  // 窗口属性
  title: string
  bounds: Rectangle
  alwaysOnTop: boolean
  
  // 窗口方法
  close(): Promise<void>
  show(): Promise<void>
  hide(): Promise<void>
  focus(): Promise<void>
  
  // 窗口事件
  onMove(callback: () => void): void
  onResize(callback: () => void): void
}
```

## 存储 API

### StorageAPI
数据存储相关的 API：

```typescript
interface StorageAPI {
  // 基本操作
  get<T>(key: string): Promise<T>
  set<T>(key: string, value: T): Promise<void>
  remove(key: string): Promise<void>
  clear(): Promise<void>
  
  // 批量操作
  getMany(keys: string[]): Promise<any[]>
  setMany(items: Record<string, any>): Promise<void>
  
  // 查询操作
  keys(): Promise<string[]>
  has(key: string): Promise<boolean>
  
  // 事件监听
  onChange(callback: (changes: StorageChange) => void): void
  onError(callback: (error: Error) => void): void
  
  // 高级功能
  encrypt(key: string, value: any): Promise<void>
  decrypt(key: string): Promise<any>
}
```

## 通知 API

### NotificationAPI
系统通知相关的 API：

```typescript
interface NotificationAPI {
  // 显示通知
  show(title: string, options?: NotificationOptions): Promise<void>
  
  // 通知权限
  requestPermission(): Promise<'granted' | 'denied'>
  
  // 通知事件
  onClick(callback: (notification: Notification) => void): void
  onClose(callback: (notification: Notification) => void): void
  
  // 通知管理
  getAll(): Promise<Notification[]>
  clear(id: string): Promise<void>
  clearAll(): Promise<void>
}
```

## 剪贴板 API

### ClipboardAPI
剪贴板操作相关的 API：

```typescript
interface ClipboardAPI {
  // 读取操作
  readText(): Promise<string>
  readHTML(): Promise<string>
  readImage(): Promise<Image>
  readFiles(): Promise<File[]>
  
  // 写入操作
  writeText(text: string): Promise<void>
  writeHTML(html: string): Promise<void>
  writeImage(image: Image): Promise<void>
  writeFiles(files: File[]): Promise<void>
  
  // 监听变化
  onChange(callback: (type: ClipboardType) => void): void
  
  // 历史记录
  getHistory(): Promise<ClipboardItem[]>
  clearHistory(): Promise<void>
}
```

## 网络 API

### NetworkAPI
网络请求相关的 API：

```typescript
interface NetworkAPI {
  // HTTP 请求
  get<T>(url: string, options?: RequestOptions): Promise<T>
  post<T>(url: string, data?: any, options?: RequestOptions): Promise<T>
  put<T>(url: string, data?: any, options?: RequestOptions): Promise<T>
  delete<T>(url: string, options?: RequestOptions): Promise<T>
  
  // WebSocket
  createWebSocket(url: string, options?: WebSocketOptions): WebSocket
  
  // 网络状态
  isOnline(): Promise<boolean>
  getNetworkType(): Promise<NetworkType>
  
  // 事件监听
  onOnline(callback: () => void): void
  onOffline(callback: () => void): void
}
```

## 文件 API

### FileAPI
文件操作相关的 API：

```typescript
interface FileAPI {
  // 基本操作
  read(path: string): Promise<Buffer>
  write(path: string, data: Buffer): Promise<void>
  copy(src: string, dest: string): Promise<void>
  move(src: string, dest: string): Promise<void>
  delete(path: string): Promise<void>
  
  // 目录操作
  createDir(path: string): Promise<void>
  readDir(path: string): Promise<string[]>
  removeDir(path: string): Promise<void>
  
  // 文件信息
  stat(path: string): Promise<FileStat>
  exists(path: string): Promise<boolean>
  
  // 监听变化
  watch(path: string, callback: (event: FileEvent) => void): void
}
```

## 主题 API

### ThemeAPI
主题相关的 API：

```typescript
interface ThemeAPI {
  // 主题切换
  setTheme(theme: Theme): Promise<void>
  getTheme(): Promise<Theme>
  
  // 主题变量
  setVariable(name: string, value: string): void
  getVariable(name: string): string
  
  // 主题事件
  onChange(callback: (theme: Theme) => void): void
  
  // 自定义主题
  register(theme: CustomTheme): void
  unregister(name: string): void
}
```

## 多语言 API

### I18nAPI
国际化相关的 API：

```typescript
interface I18nAPI {
  // 语言切换
  setLocale(locale: string): Promise<void>
  getLocale(): Promise<string>
  
  // 文本翻译
  t(key: string, params?: Record<string, any>): string
  
  // 语言管理
  addMessages(locale: string, messages: Record<string, string>): void
  getMessages(locale: string): Record<string, string>
  
  // 事件监听
  onLocaleChange(callback: (locale: string) => void): void
}
```

## 工具函数

### 常用工具
```typescript
// 版本比较
function compareVersion(v1: string, v2: string): number

// 深度合并
function deepMerge<T>(target: T, source: T): T

// 防抖函数
function debounce<T>(fn: T, delay: number): T

// 节流函数
function throttle<T>(fn: T, delay: number): T
```

## 类型定义

### 通用类型
```typescript
// 矩形区域
interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

// 点坐标
interface Point {
  x: number
  y: number
}

// 大小尺寸
interface Size {
  width: number
  height: number
}
```

## 错误处理

### 错误类型
```typescript
// 插件错误
class PluginError extends Error {
  readonly code: string
  readonly plugin: string
}

// API 错误
class APIError extends Error {
  readonly code: string
  readonly api: string
}
```

## 最佳实践

### API 使用建议
1. 使用 TypeScript 获得更好的类型提示
2. 合理处理异步操作
3. 注意错误处理
4. 及时清理资源

### 性能优化
1. 缓存频繁使用的数据
2. 避免频繁的 API 调用
3. 使用防抖和节流
4. 合理使用事件监听

## 常见问题

### API 调用问题
- 权限不足
- 参数错误
- 异步操作失败
- 资源未释放

### 类型问题
- 类型定义错误
- 类型推导失败
- 类型兼容性
- 类型断言使用

## 更多资源

- [API 示例](https://github.com/MyHelperHub/plugin-examples)
- [API 更新日志](https://github.com/MyHelperHub/myhelper/releases)
- [问题反馈](https://github.com/MyHelperHub/myhelper/issues)
- [开发者社区](/community/forum) 