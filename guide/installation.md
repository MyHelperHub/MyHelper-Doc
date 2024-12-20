# 安装指南

让我们一起把 MyHelper 安装到你的电脑上吧！🚀

## 💻 系统要求

### Windows 系统
- 🪟 Windows 10 或更高版本
- 💪 x64 架构处理器
- 📦 至少 100MB 可用空间
- 🌐 稳定的网络连接

### macOS 系统
- 🍎 macOS 10.15 或更高版本
- 💪 Intel 或 Apple Silicon 芯片
- 📦 至少 100MB 可用空间
- 🌐 稳定的网络连接

### Linux 系统
- 🐧 Ubuntu 20.04/Debian 11 或更高版本
- 💪 x64 架构处理器
- 📦 至少 100MB 可用空间
- 🌐 稳定的网络连接

## 📥 下载安装

### Windows 安装向导
1. 🎯 从[官网](https://myhelper.app/download)下载最新版安装包
2. 🖱️ 双击运行安装程序
3. 📝 按照向导提示完成安装
4. ✨ 享受 MyHelper 带来的效率提升

### macOS 安装体验
1. 🎯 从[官网](https://myhelper.app/download)下载最新版 DMG
2. 🖱️ 双击打开 DMG 文件
3. 🚀 将应用拖入 Applications 文件夹
4. ✨ 开始你的效率之旅

### Linux 快速部署
```bash
# Ubuntu/Debian 一键安装
curl -fsSL https://myhelper.app/gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/myhelper.gpg
echo "deb [signed-by=/usr/share/keyrings/myhelper.gpg] https://myhelper.app/apt stable main" | sudo tee /etc/apt/sources.list.d/myhelper.list
sudo apt update && sudo apt install myhelper

# 或者使用便携版
wget https://myhelper.app/download/myhelper.AppImage
chmod +x myhelper.AppImage
./myhelper.AppImage
```

## ⚙️ 初始配置

### 首次启动设置
1. 🌍 选择你喜欢的语言
2. 🎨 挑选适合的主题风格
3. 🔌 浏览推荐的插件
4. 📂 设置数据存储位置

### 数据目录说明
```
📁 数据存储位置：
Windows: %APPDATA%\MyHelper
macOS:   ~/Library/Application Support/MyHelper
Linux:   ~/.config/myhelper
```

## ❓ 常见问题

### 安装失败？
- 🔍 检查系统版本是否满足要求
- 💾 确保有足够的磁盘空间
- 🛡️ 暂时关闭杀毒软件
- 👑 使用管理员权限安装

### 启动问题？
- 🔄 检查是否有其他实例在运行
- 📝 查看日志文件排查错误
- 🔄 尝试重新安装最新版本
- 🧹 清理旧版本残留文件

### 权限问题？
- 🔒 Windows 需要管理员权限
- 🍎 macOS 需要允许来自身份不明开发者
- 🐧 Linux 需要适当的系统权限

## 🔄 更新升级

### 自动更新
1. 🔍 应用会定期检查新版本
2. 💡 发现新版本时会提示更新
3. 🚀 点击确认后自动下载安装
4. ✨ 享受新版本带来的功能

### 手动更新
1. 📥 从官网下载最新版本
2. 🗑️ 卸载旧版本(可选)
3. 📦 安装新版本
4. ✨ 开始使用新版本

## 🗑️ 卸载应用

### Windows 卸载
1. ⚙️ 打开控制面板
2. 📋 找到"程序和功能"
3. 🔍 找到 MyHelper 并卸载
4. 🧹 清理残留文件(可选)

### macOS 卸载
1. 📂 打开访达
2. 📱 进入应用程序文件夹
3. 🗑️ 将 MyHelper 移到废纸篓
4. 🧹 清理相关文件(可选)

### Linux 卸载
```bash
# Ubuntu/Debian 一键卸载
sudo apt remove myhelper
sudo apt autoremove  # 清理依赖

# 清理配置文件
rm -rf ~/.config/myhelper
```

## 📚 参考资源
- [🚀 快速入门](/guide/getting-started)
- [❓ 常见问题](/guide/faq)
- [🐛 问题反馈](https://github.com/MyHelperHub/myhelper/issues)
- [👥 用户社区](/community/forum)