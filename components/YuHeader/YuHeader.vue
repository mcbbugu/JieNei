<template>
  <view class="yu-header" :style="{ paddingTop: safeAreaTop + 'px' }">
    <view class="header-content">
      <!-- 左侧内容 -->
      <view class="header-left">
        <!-- 返回按钮 -->
        <view v-if="showBack" class="back-btn" @click="goBack">
          <YuIcon name="ArrowLeft" :size="40" color="#1a1a1a" />
        </view>
        
        <!-- 标题 -->
        <text v-if="title && !$slots.left" class="header-title">{{ title }}</text>
        
        <!-- 自定义左侧内容 -->
        <slot name="left" />
      </view>
      
      <!-- 右侧内容 -->
      <view class="header-right">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '../YuIcon/YuIcon.vue'

export default {
  name: 'YuHeader',
  components: {
    YuIcon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: false
    },
    transparent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      safeAreaTop: 0
    }
  },
  created() {
    this.getSafeArea()
  },
  methods: {
    getSafeArea() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaTop = systemInfo.safeAreaInsets?.top || systemInfo.statusBarHeight || 0
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.yu-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  @include glass($glass-light);
  border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
}

.header-content {
  @include flex-between;
  padding: $spacing-lg $spacing-xl;
  min-height: 88rpx;
}

.header-left {
  @include flex-center-y;
  gap: $spacing-md;
  flex: 1;
}

.back-btn {
  @include flex-center;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  @include shadow('sm');
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 1);
  }
}

.header-title {
  font-size: $font-lg;
  font-weight: $font-bold;
  color: $yu-black;
}

.header-right {
  @include flex-center-y;
  gap: $spacing-sm;
}
</style>
