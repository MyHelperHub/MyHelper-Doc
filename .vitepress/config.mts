import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "MyHelper",
  description: "跨平台桌面效率工具",
  appearance: true,
  lastUpdated: true,
  
  themeConfig: {
    // 本地化文本配置
    outlineTitle: '本页目录',
    lastUpdatedText: '最后更新',
    darkModeSwitchLabel: '主题',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '插件', link: '/plugin/development' },
      { text: '社区', link: '/community/contributing' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '系统要求', link: '/guide/requirements' },
            { text: '安装配置', link: '/guide/installation' },
          ]
        },
        {
          text: '核心功能',
          items: [
            { text: '快捷启动器', link: '/guide/launcher' },
            { text: '桌面便签', link: '/guide/sticky-notes' },
            { text: '智能剪贴板', link: '/guide/clipboard' },
            { text: '插件系统', link: '/guide/plugin-system' },
          ]
        }
      ],
      '/plugin/': [
        {
          text: '插件开发',
          items: [
            { text: '开发指南', link: '/plugin/development' },
            { text: '插件市场', link: '/plugin/marketplace' },
          ]
        }
      ],
      '/community/': [
        {
          text: '社区',
          items: [
            { text: '贡献指南', link: '/community/contributing' },
            { text: '问题反馈', link: '/community/issues' },
            { text: '联系我们', link: '/community/contact' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MyHelperHub/myhelper' }
    ]
  }
})
