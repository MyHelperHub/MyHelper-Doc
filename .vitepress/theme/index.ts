import DefaultTheme from 'vitepress/theme'
import { inBrowser } from 'vitepress'
import { onMounted } from 'vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  setup() {
    if (inBrowser) {
      // 初始加载时添加类
      onMounted(() => {
        document.documentElement.classList.add('page-ready')
      })
    }
  },
  enhanceApp({ router }) {
    if (inBrowser) {
      let isTransitioning = false

      router.onBeforeRouteChange = () => {
        if (isTransitioning) return
        isTransitioning = true

        const content = document.querySelector('.VPContent') as HTMLElement
        if (content) {
          content.classList.add('leaving')
        }
      }

      router.onAfterRouteChanged = () => {
        const content = document.querySelector('.VPContent') as HTMLElement
        if (content) {
          requestAnimationFrame(() => {
            content.classList.remove('leaving')
            content.classList.add('entering')
            
            setTimeout(() => {
              content.classList.remove('entering')
              isTransitioning = false
            }, 350) // 匹配新的 CSS 动画时间
          })
        }
      }
    }
  }
} 