<template>
  <image
    class="yu-icon"
    :src="iconSrc"
    :style="iconStyle"
    :mode="mode"
    @click="handleClick"
  />
</template>

<script>
import { iconSvgs } from './icons.js'

// 轻量缓存：避免同一个图标(名称/颜色/尺寸)重复 encode
const _iconDataUriCache = new Map()
const _ICON_CACHE_MAX = 300

export default {
  name: 'YuIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: 24
    },
    color: {
      type: String,
      default: '#1a1a1a'
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    mode: {
      type: String,
      default: 'aspectFit'
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    actualSize() {
      if (typeof this.size === 'number') return this.size
      const sizeMap = { xs: 16, sm: 20, md: 24, lg: 32, xl: 40, xxl: 48 }
      return sizeMap[this.size] || 24
    },

    iconStyle() {
      return {
        width: this.actualSize + 'rpx',
        height: this.actualSize + 'rpx',
        cursor: this.clickable ? 'pointer' : 'default'
      }
    },

    iconSrc() {
      const key = this.resolveIconKey(this.name)
      const paths = key ? iconSvgs[key] : null

      if (!paths) {
        // 不做“降级”，直接报错并不渲染
        console.error(`Icon "${this.name}" not found`)
        return ''
      }

      const cacheKey = `${key}|${this.color}|${this.strokeWidth}|${this.actualSize}`
      const cached = _iconDataUriCache.get(cacheKey)
      if (cached) return cached

      // 用 data URI，避免 /static/*.svg 文件加载 500 / 大小写 / 路径问题
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.actualSize}" height="${this.actualSize}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="${this.strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
      const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

      // 防止无限增长（图标数量本身不大，这里简单清空即可）
      if (_iconDataUriCache.size >= _ICON_CACHE_MAX) _iconDataUriCache.clear()
      _iconDataUriCache.set(cacheKey, dataUri)
      return dataUri
    }
  },

  methods: {
    handleClick() {
      if (this.clickable) this.$emit('click')
    },

    resolveIconKey(rawName) {
      if (!rawName) return null

      const alias = {
        // 常见别名/大小写/你项目里出现的写法
        Close: 'XCircle',
        close: 'XCircle',

        QRcode: 'QrCode',
        qrcode: 'QrCode',
        qr: 'QrCode',

        Message: 'MessageSquare',
        message: 'MessageSquare',
        chat: 'MessageSquare',

        More: 'MoreHorizontal',
        more: 'MoreHorizontal',

        Help: 'HelpCircle',
        help: 'HelpCircle',

        Edit: 'Edit3',
        edit: 'Edit3'
      }

      const name = alias[rawName] || rawName

      // 1) 直接命中
      if (iconSvgs[name]) return name

      // 2) kebab-case -> PascalCase  (chevron-right -> ChevronRight)
      const pascal = String(name)
        .split('-')
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join('')
      if (iconSvgs[pascal]) return pascal

      // 3) 全小写 -> 首字母大写 (activity -> Activity)
      const cap = String(name).charAt(0).toUpperCase() + String(name).slice(1)
      if (iconSvgs[cap]) return cap

      return null
    }
  }
}
</script>

<style lang="scss" scoped>
.yu-icon {
  display: inline-block;

  &:active {
    transform: scale(0.9);
  }
}
</style>
