<template>
  <view class="yu-navbar" :class="{ transparent: transparent }" :style="navBarStyle">
    <view class="navbar-content" :style="[contentStyle, contentAlignStyle]">
      <!-- 左侧内容 -->
      <view class="navbar-left">
        <!-- 返回按钮 -->
        <view v-if="showBack" class="back-btn" @click="goBack">
          <YuIcon name="ArrowLeft" :size="40" :color="backIconColor" />
        </view>
        
        <!-- 标题 -->
        <text v-if="title && !$slots.left" class="navbar-title" :style="{ color: titleColor }">{{ title }}</text>
        
        <!-- 自定义左侧内容 -->
        <slot name="left" />
      </view>
      
      <!-- 右侧内容 -->
      <view class="navbar-right" :style="rightButtonsStyle">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '../YuIcon/YuIcon.vue'

export default {
  name: 'YuNavBar',
  components: {
    YuIcon
  },
  props: {
    // 标题
    title: {
      type: String,
      default: ''
    },
    // 是否显示返回按钮
    showBack: {
      type: Boolean,
      default: false
    },
    // 是否透明背景
    transparent: {
      type: Boolean,
      default: false
    },
    // 标题颜色
    titleColor: {
      type: String,
      default: '#1a1a1a'
    },
    // 返回按钮图标颜色
    backIconColor: {
      type: String,
      default: '#1a1a1a'
    },
    // 背景颜色
    backgroundColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.95)'
    },
    // 是否固定定位
    fixed: {
      type: Boolean,
      default: true
    },
    // 滚动透明度 (0-1)
    scrollOpacity: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      safeAreaTop: 0,
      capsuleInfo: null,
      headerPaddingRight: 40,
      rightButtonsStyle: {},
      contentAlignStyle: {}
    }
  },
  computed: {
    navBarStyle() {
      const style = {
        paddingTop: this.safeAreaTop + 'px',
        // 缩短过渡时间，使滚动响应更灵敏
        transition: 'background-color 0.2s ease, border-bottom-color 0.2s ease'
      }
      
      if (!this.transparent) {
        // 非透明模式，保持原样
        style.backgroundColor = this.backgroundColor
        style.borderBottom = '1px solid rgba(0, 0, 0, 0.05)'
      } else {
        // 透明模式下，始终根据 scrollOpacity 计算背景
        // 保持毛玻璃效果：背景不透明度适中，保持半透明
        const bgOpacity = this.scrollOpacity * 0.6  // 最大 60% 不透明度，更透明的毛玻璃效果
        const borderOpacity = this.scrollOpacity * 0.03  // 降低边框透明度，与透明背景更协调
        
        // 使用半透明白色背景模拟毛玻璃效果
        style.backgroundColor = `rgba(255, 255, 255, ${bgOpacity})`
        style.borderBottom = `1px solid rgba(0, 0, 0, ${borderOpacity})`
        
        // 始终应用 backdrop-filter 以增强毛玻璃效果
        const blurAmount = Math.max(this.scrollOpacity * 20, 0)
        if (blurAmount > 0) {
          style.backdropFilter = `blur(${blurAmount}px)`
          style.webkitBackdropFilter = `blur(${blurAmount}px)`
        }
      }
      
      if (!this.fixed) {
        style.position = 'relative'
      }
      
      return style
    },
    contentStyle() {
      return {
        paddingRight: this.headerPaddingRight,
        position: 'relative'
      }
    }
  },
  created() {
    this.getSafeAreaInfo()
  },
  methods: {
    getSafeAreaInfo() {
      const systemInfo = uni.getSystemInfoSync()
      
      // 基础安全区域
      const statusBarHeight = systemInfo.statusBarHeight || 0
      const safeAreaTop = systemInfo.safeAreaInsets?.top || statusBarHeight
      
      this.safeAreaTop = safeAreaTop
      
      // 获取胶囊按钮信息
      let capsuleInfo = { width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
      try {
        if (uni.getMenuButtonBoundingClientRect) {
          capsuleInfo = uni.getMenuButtonBoundingClientRect()
          this.capsuleInfo = capsuleInfo
        }
      } catch (e) {
        console.log('获取胶囊按钮信息失败:', e)
      }
      
      // 整个 navbar 一体水平对齐
      if (capsuleInfo.width > 0) {
        // 计算按钮应该距离屏幕右边的距离
        const capsuleLeftFromRight = systemInfo.windowWidth - capsuleInfo.left
        const buttonGap = 16 // px 间距
        const buttonRightDistance = capsuleLeftFromRight + buttonGap
        
        // 计算胶囊相对于状态栏的位置
        const capsuleTopFromStatusBar = capsuleInfo.top - safeAreaTop
        
        // 让整个 navbar-content 与胶囊顶部对齐，使用 flex-start
        this.contentAlignStyle = {
          paddingTop: capsuleTopFromStatusBar + 'px',
          paddingBottom: '20rpx', // 保持底部间距
          minHeight: capsuleInfo.height + 'px',
          alignItems: 'flex-start' // 关键：使用 flex-start 对齐
        }
        
        // 右侧按钮样式
        this.rightButtonsStyle = {
          height: capsuleInfo.height + 'px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }
        
        // 更新 padding 计算 - 修正距离
        this.headerPaddingRight = buttonRightDistance + 'px'
      }
      
      // 计算实际的 navbar 总高度
      let actualNavBarHeight = safeAreaTop + 44 // 默认高度 44px (88rpx)
      
      if (capsuleInfo.width > 0) {
        // 当有胶囊时，navbar 高度 = 状态栏高度 + 胶囊顶部偏移 + 胶囊高度 + 底部间距
        const capsuleTopFromStatusBar = capsuleInfo.top - safeAreaTop
        // 加大底部间距，防止内容被遮挡 (20 -> 32)
        actualNavBarHeight = safeAreaTop + capsuleTopFromStatusBar + capsuleInfo.height + 32
      }
      
      // 触发父组件事件，传递安全区域信息
      this.$emit('safe-area-info', {
        safeAreaTop,
        capsuleInfo,
        headerPaddingRight: this.headerPaddingRight,
        headerHeight: actualNavBarHeight,
        rightButtonsStyle: this.rightButtonsStyle
      })
      
      console.log('NavBar 修正对齐计算:', {
        safeAreaTop,
        capsuleInfo,
        windowWidth: systemInfo.windowWidth,
        calculations: {
          capsuleTopFromStatusBar: capsuleInfo.top - safeAreaTop,
          capsuleLeftFromRight: systemInfo.windowWidth - capsuleInfo.left,
          buttonRightDistance: (systemInfo.windowWidth - capsuleInfo.left) + 16
        },
        contentAlignStyle: this.contentAlignStyle,
        headerPaddingRight: this.headerPaddingRight
      })
    },
    
    goBack() {
      this.$emit('back')
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.yu-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  // 移除 transparent 类的强制样式，让动态样式能够生效
  // 背景和边框通过内联样式动态控制
}

.navbar-content {
  @include flex-between;
  padding: 20rpx 40rpx;
  max-width: 750rpx;
  margin: 0 auto;
  min-height: 88rpx;
  
  // 当有胶囊信息时，整个内容区域需要垂直居中对齐胶囊
}

.navbar-left {
  @include flex-center-y;
  gap: $spacing-md;
  flex: 1;
  min-width: 0;
}

.back-btn {
  @include flex-center;
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  @include shadow('sm');
  transition: all $duration-normal $ease-out;
  flex-shrink: 0;
  
  &:active {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 1);
  }
}

.navbar-title {
  font-size: $font-lg;
  font-weight: $font-bold;
  @include text-ellipsis;
}

.navbar-right {
  @include flex-center-y;
  gap: $spacing-sm;
  flex-shrink: 0;
  
  // 当使用绝对定位时，这些样式会被 rightButtonsStyle 覆盖
}
</style>
