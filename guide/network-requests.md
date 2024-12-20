# 网络请求

## 基础网络请求

MyHelper 提供了强大的网络请求功能，支持各种 HTTP 方法和高级特性。

### GET 请求

```typescript
import { NetworkHelper } from '@myhelper/api';

const networkHelper = new NetworkHelper();

// 基本 GET 请求
const response = await networkHelper.get('https://api.example.com/users');

// 带查询参数的 GET 请求
const userResponse = await networkHelper.get('https://api.example.com/users', {
  params: {
    page: 1,
    limit: 10,
    sort: 'name'
  }
});

// 带请求头的 GET 请求
const authResponse = await networkHelper.get('https://api.example.com/profile', {
  headers: {
    'Authorization': 'Bearer token123'
  }
});
```

### POST 请求

```typescript
// 发送 JSON 数据
const createResponse = await networkHelper.post('https://api.example.com/users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// 发送表单数据
const formData = new FormData();
formData.append('file', fileBlob);
formData.append('name', 'profile.jpg');

const uploadResponse = await networkHelper.post('https://api.example.com/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
```

## 高级功能

### 请求拦截器

```typescript
// 添加请求拦截器
networkHelper.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
```

### 响应拦截器

```typescript
// 添加响应拦截器
networkHelper.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 处理未授权错误
      refreshToken();
    }
    return Promise.reject(error);
  }
);
```

## 错误处理

```typescript
try {
  const response = await networkHelper.get('https://api.example.com/data');
} catch (error) {
  if (error.code === 'NETWORK_ERROR') {
    console.error('网络连接失败');
  } else if (error.response) {
    // 服务器返回错误状态码
    console.error(`服务器错误: ${error.response.status}`);
  } else if (error.request) {
    // 请求已发送但没有收到响应
    console.error('没有收到响应');
  } else {
    // 发送请求时出错
    console.error('���求配置错误:', error.message);
  }
}
```

## 请求配置

### 基础配置

```typescript
const networkHelper = new NetworkHelper({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### 请求重试

```typescript
const networkHelper = new NetworkHelper({
  retry: {
    retries: 3,
    retryDelay: 1000,
    retryCondition: (error) => {
      return error.code === 'NETWORK_ERROR';
    }
  }
});
```

## 并发请求

### 并行请求

```typescript
const [users, posts, comments] = await Promise.all([
  networkHelper.get('/users'),
  networkHelper.get('/posts'),
  networkHelper.get('/comments')
]);
```

### 请求取消

```typescript
const controller = new AbortController();

const response = await networkHelper.get('/long-operation', {
  signal: controller.signal
});

// 取消请求
controller.abort();
```

## 文件上传下载

### 文件上传

```typescript
// 上传单个文件
const formData = new FormData();
formData.append('file', file);

const response = await networkHelper.post('/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`上传进度: ${percentCompleted}%`);
  }
});
```

### 文件下载

```typescript
const response = await networkHelper.get('/download/file', {
  responseType: 'blob',
  onDownloadProgress: (progressEvent) => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    console.log(`下载进度: ${percentCompleted}%`);
  }
});

// 创建下载链接
const url = window.URL.createObjectURL(response.data);
const link = document.createElement('a');
link.href = url;
link.download = 'filename.pdf';
link.click();
```

## 最佳实践

1. **安全性**
   - 使用 HTTPS
   - 实现请求签名
   - 防止 CSRF 攻击

2. **性能优化**
   - 实现请求缓存
   - 使用请求合并
   - 避免重复请求

3. **可靠性**
   - 实现请求重试
   - 添加超时处理
   - 优雅降级策略

4. **用户体验**
   - 显示加载状态
   - 提供进度反馈
   - 友好的错误提示 