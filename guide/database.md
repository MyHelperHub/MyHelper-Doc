# 数据库操作

## 数据库基础

MyHelper 提供了强大的数据库操作功能，支持 SQLite 和 MySQL 等数据库系统。

### 连接数据库

```typescript
import { DatabaseHelper } from '@myhelper/api';

// SQLite 连接
const sqliteDb = new DatabaseHelper({
  type: 'sqlite',
  database: 'myapp.db'
});

// MySQL 连接
const mysqlDb = new DatabaseHelper({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'myapp',
  username: 'root',
  password: 'password'
});
```

## 基本操作

### 查询数据

```typescript
// 基本查询
const users = await db.query('SELECT * FROM users');

// 带参数查询
const user = await db.query(
  'SELECT * FROM users WHERE id = ?',
  [1]
);

// 条件查询
const activeUsers = await db.query(
  'SELECT * FROM users WHERE status = ? AND age > ?',
  ['active', 18]
);
```

### 插入数据

```typescript
// 插入单条记录
const result = await db.execute(
  'INSERT INTO users (name, email) VALUES (?, ?)',
  ['John Doe', 'john@example.com']
);

// 批量插入
const values = [
  ['John', 'john@example.com'],
  ['Jane', 'jane@example.com']
];

await db.execute(
  'INSERT INTO users (name, email) VALUES ?',
  [values]
);
```

### 更新数据

```typescript
// 更新记录
const result = await db.execute(
  'UPDATE users SET status = ? WHERE id = ?',
  ['inactive', 1]
);

console.log(`更新了 ${result.affectedRows} 条记录`);
```

### 删除数据

```typescript
// 删除记录
const result = await db.execute(
  'DELETE FROM users WHERE id = ?',
  [1]
);

console.log(`删除了 ${result.affectedRows} 条记录`);
```

## 事务处理

### 基本事务

```typescript
await db.transaction(async (trx) => {
  // 在事务中执行多个操作
  await trx.execute(
    'INSERT INTO orders (user_id, total) VALUES (?, ?)',
    [1, 100]
  );
  
  await trx.execute(
    'UPDATE users SET balance = balance - ? WHERE id = ?',
    [100, 1]
  );
});
```

### 嵌套事务

```typescript
await db.transaction(async (trx1) => {
  await trx1.execute('INSERT INTO logs (message) VALUES (?)', ['开始事务']);
  
  await trx1.transaction(async (trx2) => {
    await trx2.execute('UPDATE users SET status = ?', ['processing']);
  });
  
  await trx1.execute('INSERT INTO logs (message) VALUES (?)', ['事务完成']);
});
```

## 表操作

### 创建表

```typescript
await db.createTable('users', {
  id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
  name: { type: 'TEXT', notNull: true },
  email: { type: 'TEXT', unique: true },
  status: { type: 'TEXT', default: 'active' },
  created_at: { type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' }
});
```

### 修改表

```typescript
// 添加列
await db.execute('ALTER TABLE users ADD COLUMN age INTEGER');

// 删除列
await db.execute('ALTER TABLE users DROP COLUMN age');

// 修改列
await db.execute('ALTER TABLE users MODIFY COLUMN email VARCHAR(100)');
```

## 高级查询

### 连接查询

```typescript
const orders = await db.query(`
  SELECT orders.*, users.name as user_name
  FROM orders
  LEFT JOIN users ON orders.user_id = users.id
  WHERE orders.status = ?
`, ['completed']);
```

### 分组查询

```typescript
const statistics = await db.query(`
  SELECT category, COUNT(*) as count, SUM(price) as total
  FROM products
  GROUP BY category
  HAVING count > ?
`, [10]);
```

## 数据迁移

### 创建迁移

```typescript
// 创建迁移文件
await db.migration.create('create_users_table');

// 运行迁移
await db.migration.up();

// 回滚迁移
await db.migration.down();
```

### 迁移示例

```typescript
export async function up(db: DatabaseHelper) {
  await db.createTable('users', {
    id: { type: 'INTEGER', primaryKey: true, autoIncrement: true },
    name: { type: 'TEXT', notNull: true },
    email: { type: 'TEXT', unique: true }
  });
}

export async function down(db: DatabaseHelper) {
  await db.execute('DROP TABLE IF EXISTS users');
}
```

## 性能优化

### 使用连接池

```typescript
const db = new DatabaseHelper({
  type: 'mysql',
  pool: {
    min: 5,
    max: 20,
    idleTimeoutMillis: 30000
  }
});
```

### 批量操作

```typescript
// 使用事务进行批量插入
await db.transaction(async (trx) => {
  const values = generateBatchData(1000); // 生成大量数据
  
  // 分批处理
  for (let i = 0; i < values.length; i += 100) {
    const batch = values.slice(i, i + 100);
    await trx.execute('INSERT INTO items (name, value) VALUES ?', [batch]);
  }
});
```

## 最佳实践

1. **安全性**
   - 使用参数化查询
   - 实施访问控制
   - 加密敏感数据

2. **性能优化**
   - 合理使用索引
   - 优化查询语句
   - 实现数据缓存

3. **可维护性**
   - 使用迁移管理
   - 编写清晰的注释
   - 遵循命名规范

4. **错误处理**
   - 实现重试机制
   - 记录详细日志
   - 提供友好提示 