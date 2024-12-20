# 文件操作

## 基础文件操作

MyHelper 提供了一套完整的文件操作 API，让你能够轻松处理文件系统相关的任务。

### 读取文件

```typescript
import { FileHelper } from '@myhelper/api';

const fileHelper = new FileHelper();

// 读取文本文件
const content = await fileHelper.readFile('example.txt');

// 读取二进制文件
const buffer = await fileHelper.readFile('image.png', { encoding: 'binary' });

// 读取 JSON 文件
const config = await fileHelper.readJSON('config.json');
```

### 写入文件

```typescript
// 写入文本文件
await fileHelper.writeFile('output.txt', 'Hello World');

// 写入 JSON 文件
await fileHelper.writeJSON('config.json', { theme: 'dark' }, { pretty: true });

// 追加内容
await fileHelper.appendFile('log.txt', '新的日志条目\n');
```

## 文件监听

### 监听文件变化

```typescript
const watcher = fileHelper.watch('config.json', (event, path) => {
  console.log(`文件 ${path} 发生 ${event} 事件`);
});

// 停止监听
watcher.close();
```

### 批量监听

```typescript
const watcher = fileHelper.watch('**/*.{js,ts}', {
  ignored: ['node_modules/**'],
  persistent: true
});

watcher.on('change', (path) => {
  console.log(`文件 ${path} 已修改`);
});
```

## 文件信息

### 获取文件信息

```typescript
// 获取基本信息
const stats = await fileHelper.stat('example.txt');
console.log({
  size: stats.size,
  created: stats.birthtime,
  modified: stats.mtime,
  isFile: stats.isFile(),
  isDirectory: stats.isDirectory()
});

// 检查文件是否存在
const exists = await fileHelper.exists('example.txt');
```

### 文件路径操作

```typescript
import { Path } from '@myhelper/api';

// 规范化路径
const normalizedPath = Path.normalize('foo/bar/../baz');

// 拼接路径
const fullPath = Path.join('foo', 'bar', 'baz');

// 获取文件扩展名
const ext = Path.extname('file.txt'); // '.txt'
```

## 目录操作

### 创建目录

```typescript
// 创建单个目录
await fileHelper.mkdir('new-folder');

// 递归创建目录
await fileHelper.mkdir('path/to/new/folder', { recursive: true });
```

### 读取目录

```typescript
// 列出目录内容
const files = await fileHelper.readdir('some-folder');

// 递归列出所有文件
const allFiles = await fileHelper.readdir('some-folder', { recursive: true });

// 使用过滤器
const jsFiles = await fileHelper.readdir('src', {
  filter: (file) => file.endsWith('.js')
});
```

## 高级功能

### 文件流操作

```typescript
// 创建读取流
const readStream = fileHelper.createReadStream('large-file.txt');

// 创建写入流
const writeStream = fileHelper.createWriteStream('output.txt');

// 管道传输
readStream.pipe(writeStream);
```

### 文件压缩

```typescript
// 压缩文件
await fileHelper.compress('folder', 'archive.zip');

// 解压文件
await fileHelper.decompress('archive.zip', 'extracted-folder');
```

## 错误处理

```typescript
try {
  await fileHelper.readFile('non-existent.txt');
} catch (error) {
  if (error.code === 'FILE_NOT_FOUND') {
    console.error('文件不存在');
  } else if (error.code === 'PERMISSION_DENIED') {
    console.error('没有权限访问文件');
  } else {
    console.error('发生未知错误:', error);
  }
}
```

## 最佳实践

1. **异步操作**
   - 使用 async/await 处理异步操作
   - 避免同步方法阻塞主线程
   - 合理使用并发控制

2. **资源释放**
   - 及时关闭文件流
   - 使用 try-finally 确保资源释放
   - 实现自动清理机制

3. **性能优化**
   - 使用流处理大文件
   - 实现缓存机制
   - 避免频繁的文件操作

4. **安全考虑**
   - 验证文件路径
   - 限制文件访问范��
   - 处理敏感数据时加密 