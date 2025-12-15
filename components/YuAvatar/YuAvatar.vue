<template>
  <view 
    class="yu-avatar"
    :class="[
      `yu-avatar--${size}`,
      `yu-avatar--${shape}`,
      colorClass
    ]"
    :style="avatarStyle"
    @click="handleClick"
  >
    <image 
      v-if="src" 
      :src="src" 
      class="yu-avatar__image"
      mode="aspectFill"
      @error="handleImageError"
    />
    <YuIcon 
      v-else-if="icon" 
      :name="icon" 
      :size="iconSize"
      class="yu-avatar__icon"
    />
    <text v-else class="yu-avatar__text">{{ displayText }}</text>
    
    <!-- 在线状态指示器 -->
    <view v-if="status" class="yu-avatar__status" :class="`yu-avatar__status--${status}`"></view>
  </view>
</template>

<script>
import YuIcon from '../YuIcon/YuIcon.vue'

export default {
  name: 'YuAvatar',
  components: {
    YuIcon
  },
  props: {
    src: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    shape: {
      type: String,
      default: 'round',
      validator: value => ['round', 'square'].includes(value)
    },
    color: {
      type: String,
      default: 'brand'
    },
    status: {
      type: String,
      default: '',
      validator: value => ['', 'online', 'offline', 'busy', 'away'].includes(value)
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    displayText() {
      if (this.text) {
        return this.text.length > 2 ? this.text.substring(0, 2) : this.text
      }
      return ''
    },
    colorClass() {
      const colorMap = {
        brand: 'yu-avatar--brand',
        orange: 'yu-avatar--orange',
        blue: 'yu-avatar--blue',
        green: 'yu-avatar--green',
        purple: 'yu-avatar--purple',
        pink: 'yu-avatar--pink',
        gray: 'yu-avatar--gray'
      }
      return colorMap[this.color] || 'yu-avatar--brand'
    },
    iconSize() {
      const sizeMap = {
        xs: 24,
        sm: 32,
        md: 40,
        lg: 48,
        xl: 56
      }
      return sizeMap[this.size] || 40
    },
    avatarStyle() {
      return this.clickable ? { cursor: 'pointer' } : {}
    }
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    },
    handleImageError() {
      this.$emit('error')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.yu-avatar {
  @include flex-center;
  position: relative;
  flex-shrink: 0;
  font-weight: $font-bold;
  @include shadow('sm');
  transition: transform $duration-fast $ease-out;
  
  &--xs {
    width: 48rpx;
    height: 48rpx;
    font-size: $font-xs;
  }
  
  &--sm {
    width: 64rpx;
    height: 64rpx;
    font-size: $font-sm;
  }
  
  &--md {
    width: 88rpx;
    height: 88rpx;
    font-size: $font-base;
  }
  
  &--lg {
    width: 120rpx;
    height: 120rpx;
    font-size: $font-lg;
  }
  
  &--xl {
    width: 160rpx;
    height: 160rpx;
    font-size: $font-2xl;
  }
  
  &--round {
    border-radius: $radius-xl;
  }
  
  &--square {
    border-radius: $radius-md;
  }
  
  // 颜色主题
  &--brand {
    background: rgba($yu-brand, 0.1);
    color: $yu-brand-dark;
  }
  
  &--orange {
    background: #fff7ed;
    color: #9a3412;
  }
  
  &--blue {
    background: #dbeafe;
    color: #1e40af;
  }
  
  &--green {
    background: #d1fae5;
    color: #065f46;
  }
  
  &--purple {
    background: #e9d5ff;
    color: #7c2d12;
  }
  
  &--pink {
    background: #fce7f3;
    color: #be185d;
  }
  
  &--gray {
    background: #f3f4f6;
    color: #374151;
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &__image {
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
  
  &__text {
    line-height: 1;
  }
  
  &__icon {
    color: inherit;
  }
  
  &__status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 24rpx;
    height: 24rpx;
    border-radius: 50%;
    border: 4rpx solid $yu-white;
    
    &--online {
      background: $success;
    }
    
    &--offline {
      background: $yu-light-gray;
    }
    
    &--busy {
      background: $error;
    }
    
    &--away {
      background: $warning;
    }
  }
}
</style>
