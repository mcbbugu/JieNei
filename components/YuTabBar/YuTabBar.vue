<template>
  <view class="yu-tabbar" :style="{ paddingBottom: safeAreaBottom + 'px' }">
    <view 
      v-for="(item, index) in tabList" 
      :key="index" 
      class="tab-item" 
      :class="{ active: currentIndex === index }"
      @click="handleTabClick(index)"
    >
      <view class="tab-icon" :class="{ active: currentIndex === index }">
        <YuIcon :name="item.icon" :size="48" :color="currentIndex === index ? '#ccf381' : '#9ca3af'" />
      </view>
      <view v-if="currentIndex === index" class="tab-dot"></view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'YuTabBar',
  components: {
    YuIcon
  },
  props: {
    // 当前选中的 tab 索引
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      safeAreaBottom: 0,
      tabList: [
        { icon: 'Radar', text: '发现', path: '/pages/dashboard/dashboard' },
        { icon: 'SquareIcon', text: '广场', path: '/pages/community/community' },
        { icon: 'Timer', text: '记录', path: '/pages/playtimer/playtimer' },
        { icon: 'User', text: '名片', path: '/pages/profile/profile' }
      ]
    }
  },
  computed: {
    currentIndex() {
      return this.current
    }
  },
  created() {
    this.getSafeArea()
  },
  methods: {
    getSafeArea() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaBottom = systemInfo.safeAreaInsets?.bottom || 0
    },
    handleTabClick(index) {
      if (this.currentIndex === index) return
      
      // 震动反馈
      uni.vibrateShort({ type: 'light' })
      
      const targetPath = this.tabList[index].path
      
      // 使用 switchTab 跳转到 tab 页面
      uni.switchTab({
        url: targetPath,
        fail: () => {
          // 如果 switchTab 失败，尝试 redirectTo
          uni.redirectTo({ url: targetPath })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.yu-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
  padding: 24rpx 40rpx;
  max-width: 750rpx;
  margin: 0 auto;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  width: 128rpx;
}

.tab-icon {
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease-out;

  &.active {
    background: #1a1a1a;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
  }
}

.tab-dot {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: #1a1a1a;
}
</style>

