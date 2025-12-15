<template>
  <view 
    class="yu-card"
    :class="[
      `yu-card--${size}`,
      {
        'yu-card--clickable': clickable,
        'yu-card--shadow': shadow,
        'yu-card--border': border
      }
    ]"
    @click="handleClick"
  >
    <view v-if="$slots.header" class="yu-card__header">
      <slot name="header"></slot>
    </view>
    
    <view class="yu-card__body">
      <slot></slot>
    </view>
    
    <view v-if="$slots.footer" class="yu-card__footer">
      <slot name="footer"></slot>
    </view>
    
    <!-- 激活时的顶部渐变线 -->
    <view v-if="clickable" class="yu-card__active-line"></view>
  </view>
</template>

<script>
export default {
  name: 'YuCard',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    clickable: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.yu-card {
  background: $yu-white;
  border-radius: $radius-3xl;
  position: relative;
  overflow: hidden;
  
  &--sm {
    padding: $spacing-lg;
    border-radius: $radius-2xl;
  }
  
  &--md {
    padding: $spacing-xl;
    border-radius: $radius-3xl;
  }
  
  &--lg {
    padding: $spacing-2xl;
    border-radius: $radius-3xl;
  }
  
  &--shadow {
    @include shadow('sm');
  }
  
  &--border {
    border: 2rpx solid #f0f0f0;
  }
  
  &--clickable {
    cursor: pointer;
    transition: all $duration-normal $ease-out;
    border: 2rpx solid transparent;
    
    &:active {
      transform: scale(0.99);
      @include shadow('md');
      border-color: rgba($yu-brand, 0.3);
      
      .yu-card__active-line {
        opacity: 1;
      }
    }
  }
  
  &__header {
    margin-bottom: $spacing-lg;
    padding-bottom: $spacing-lg;
    border-bottom: 2rpx solid #f5f5f5;
  }
  
  &__body {
    flex: 1;
  }
  
  &__footer {
    margin-top: $spacing-lg;
    padding-top: $spacing-lg;
    border-top: 2rpx solid #f5f5f5;
  }
  
  &__active-line {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2rpx;
    background: linear-gradient(90deg, transparent, $yu-brand, transparent);
    opacity: 0;
    transition: opacity $duration-normal;
  }
}
</style>
