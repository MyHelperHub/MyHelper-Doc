# 贡献指南

感谢你考虑为 MyHelper 做出贡献！本指南将帮助你了解如何参与项目开发。

## 开发环境设置

1. **安装依赖**

```bash
# 安装 Node.js 依赖
npm install

# 安装 Rust 工具链
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 安装 Tauri CLI
cargo install tauri-cli
```

2. **克隆仓库**

```bash
git clone https://github.com/MyHelperHub/MyHelper.git
cd MyHelper
```

3. **安装项目依赖**

```bash
npm install
cd plugin/mh-plugin && npm install
```

## 开发流程

1. **创建分支**

```bash
git checkout -b feature/your-feature-name
```

2. **开发**

```bash
# 启动开发服务器
npm run tauri dev
```

3. **提交代码**

```bash
git add .
git commit -m "feat: add new feature"
```

我们使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式修改
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

4. **推送代码**

```bash
git push origin feature/your-feature-name
```

5. **创建 Pull Request**

访问 [GitHub 仓库](https://github.com/MyHelperHub/MyHelper)创建 Pull Request。

## 插件开发

1. **创建插件**

```bash
cd plugin
npm create mh-plugin my-plugin
```

2. **开发插件**

```bash
cd my-plugin
npm run dev
```

3. **构建插件**

```bash
npm run build
```

4. **发布插件**

```bash
npm run publish
```

## 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 规则
- 保持代码简洁清晰
- 添加必要的注释
- 编写单元测试

## 文档贡献

1. **本地预览**

```bash
npm run docs:dev
```

2. **编写文档**

- 使用清晰的语言
- 提供代码示例
- 添加必要的图片说明
- 保持文档结构一致

3. **提交文档**

```bash
git add .
git commit -m "docs: update documentation"
git push
```

## 问题反馈

- 使用 [Issue 模板](https://github.com/MyHelperHub/MyHelper/issues/new/choose)
- 提供详细的问题描述
- 附上错误日志和复现步骤
- 标注操作系统和版本信息

## 发布流程

1. **版本号管理**

我们使用 [语义化版本](https://semver.org/lang/zh-CN/)：

- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

2. **发布检查清单**

- [ ] 更新版本号
- [ ] 更新更新日志
- [ ] 运行测试套件
- [ ] 检查文档更新
- [ ] 创建发布标签

## 社区参与

- 加入 [Discord 社区](https://discord.gg/myhelper)
- 参与 [讨论区](https://github.com/MyHelperHub/MyHelper/discussions)
- 关注 [Twitter](https://twitter.com/myhelper)
- 订阅 [邮件列表](https://myhelper.dev/newsletter)

## 行为准则

请阅读我们的[行为准则](CODE_OF_CONDUCT.md)，共同维护一个友好的社区环境。

## 许可证

MyHelper 使用 [GPL-3.0 许可证](LICENSE)。通过提交代码，你同意将你的代码按照该许可证开源。 