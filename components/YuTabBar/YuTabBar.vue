<template>
  <view class="yu-tabbar" :style="{ paddingBottom: safeAreaBottom + 'px' }">
    <view class="tabbar-content">
      <view 
        v-for="(item, index) in tabList" 
        :key="index"
        class="tab-item"
        :class="{ active: currentTab === index }"
        @click="switchTab(index, item.path)"
      >
        <!-- 图标容器 -->
        <view class="tab-icon" :class="{ active: currentTab === index }">
          <YuIcon 
            :name="item.icon" 
            :size="48" 
            :color="currentTab === index ? (isDark ? '#1a1a1a' : '#ccf381') : (isDark ? '#6b7280' : '#9ca3af')"
          />
        </view>
        
        <!-- 选中指示器 -->
        <view v-if="currentTab === index" class="tab-indicator" :class="{ dark: isDark }"></view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '../YuIcon/YuIcon.vue'

export default {
  name: 'YuTabBar',
  components: {
    YuIcon
  },
  props: {
    isDark: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentTab: 0,
      safeAreaBottom: 0,
      tabList: [
        { path: '/pages/dashboard/dashboard', icon: 'Radar', text: '发现' },
        { path: '/pages/community/community', icon: 'SquareIcon', text: '广场' },
        { path: '/pages/playtimer/playtimer', icon: 'Timer', text: '记录' },
        { path: '/pages/profile/profile', icon: 'User', text: '名片' }
      ]
    }
  },
  created() {
    this.getSafeArea()
    this.getCurrentTab()
  },
  methods: {
    getSafeArea() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaBottom = systemInfo.safeAreaInsets?.bottom || 0
    },
    getCurrentTab() {
      const pages = getCurrentPages()
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1]
        const route = '/' + currentPage.route
        const index = this.tabList.findIndex(item => item.path === route)
        if (index !== -1) {
          this.currentTab = index
        }
      }
    },
    switchTab(index, path) {
      if (this.currentTab === index) return
      
      this.currentTab = index
      
      // 震动反馈
      uni.vibrateShort({ type: 'light' })
      
      // 页面跳转
      uni.switchTab({
        url: path,
        fail: () => {
          uni.redirectTo({ url: path })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.yu-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  @include glass($glass-light);
  border-top: 2rpx solid rgba(255, 255, 255, 0.1);
}

.tabbar-content {
  @include flex-between;
  padding: $spacing-md $spacing-xl;
  max-width: 750rpx;
  margin: 0 auto;
}

.tab-item {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xs;
  width: 128rpx;
  transition: all $duration-normal $ease-out;
  cursor: pointer;
}

.tab-icon {
  @include flex-center;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  transition: all $duration-normal $ease-out;
  
  &.active {
    background: $yu-black;
    transform: rotate(-10deg) scale(1.1);
    @include shadow('lg');
    animation: nav-bounce 0.3s $ease-out;
  }
}

.tab-indicator {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: $yu-black;
  margin-top: $spacing-xs;
  
  &.dark {
    background: $yu-brand;
  }
}
</style>
