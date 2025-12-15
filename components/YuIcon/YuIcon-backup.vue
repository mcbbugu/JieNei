<!-- 备份原始版本 -->
<template>
  <view 
    class="yu-icon" 
    :class="[sizeClass, { 'yu-icon--clickable': clickable }]"
    :style="iconStyle"
    @click="handleClick"
  >
    <view 
      class="yu-icon__svg"
    >
      <rich-text :nodes="svgContent" />
    </view>
  </view>
</template>

<script>
import { iconSvgs, iconColors, iconSizes } from './icons.js'

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
      default: iconColors.primary
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    svgContent() {
      const paths = iconSvgs[this.name]
      if (!paths) {
        console.warn(`Icon "${this.name}" not found`)
        return this.getDefaultIcon()
      }
      
      const size = this.actualSize
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;width:100%;height:100%;">${paths}</svg>`
    },
    
    actualSize() {
      if (typeof this.size === 'number') {
        return this.size
      }
      return iconSizes[this.size] || iconSizes.md
    },
    
    sizeClass() {
      if (typeof this.size === 'string' && iconSizes[this.size]) {
        return `yu-icon--${this.size}`
      }
      return ''
    },
    
    iconStyle() {
      const styles = {}
      
      if (typeof this.size === 'number') {
        styles.width = this.size + 'rpx'
        styles.height = this.size + 'rpx'
      }
      
      return styles
    }
  },
  
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    },
    
    getDefaultIcon() {
      const size = this.actualSize
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${this.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:block;width:100%;height:100%;"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.yu-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &--xs {
    width: 32rpx;
    height: 32rpx;
  }
  
  &--sm {
    width: 40rpx;
    height: 40rpx;
  }
  
  &--md {
    width: 48rpx;
    height: 48rpx;
  }
  
  &--lg {
    width: 64rpx;
    height: 64rpx;
  }
  
  &--xl {
    width: 80rpx;
    height: 80rpx;
  }
  
  &--xxl {
    width: 96rpx;
    height: 96rpx;
  }
  
  &--clickable {
    cursor: pointer;
    transition: transform $duration-fast $ease-out;
    
    &:active {
      transform: scale(0.9);
    }
  }
  
  &__svg {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>