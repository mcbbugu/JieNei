<template>
  <view class="ball-vault">
    <view class="section-header">
      <YuIcon name="Feather" :size="28" color="#1a1a1a" />
      <text class="section-title">球库 (耗材统计)</text>
    </view>

    <view class="vault-card" @click="$emit('click')">
      <!-- 背景渐变装饰 -->
      <view class="card-gradient"></view>
      
      <view class="vault-content">
        <view class="vault-info">
          <view class="vault-icon" :class="{ hover: isHovered }" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
            <YuIcon name="Feather" :size="40" color="#999" />
          </view>
          <view class="vault-stats">
            <text class="stats-label">累计消耗 (个)</text>
            <text class="stats-value">{{ stats.totalUsed }}</text>
          </view>
        </view>

        <view class="vault-actions">
          <text class="favorite-label">常用球</text>
          <text class="favorite-brand">{{ stats.favorite }}</text>
          <view class="checkin-btn" @click.stop="$emit('add')">
            <YuIcon name="Plus" :size="16" color="#1a1a1a" />
            <text class="checkin-text">打卡</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'BallVault',
  components: {
    YuIcon
  },
  props: {
    stats: {
      type: Object,
      default: () => ({
        totalUsed: 0,
        favorite: 'RSL No.5',
        history: []
      })
    }
  },
  data() {
    return {
      isHovered: false
    }
  },
  methods: {
    handleTouchStart() {
      this.isHovered = true
    },
    
    handleTouchEnd() {
      setTimeout(() => {
        this.isHovered = false
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.ball-vault {
  margin-bottom: 48rpx;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 24rpx;
  padding: 0 8rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 900;
  font-style: italic;
  color: #1a1a1a;
}

.vault-card {
  background: white;
  border-radius: 48rpx;
  padding: 40rpx;
  border: 2rpx solid #f0f0f0;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:active {
    transform: scale(0.98);
    border-color: $yu-brand;
  }
}

.card-gradient {
  position: absolute;
  top: 0;
  right: 0;
  width: 160rpx;
  height: 100%;
  background: linear-gradient(to left, #f9fafb 0%, transparent 100%);
  pointer-events: none;
}

.vault-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  z-index: 10;
  position: relative;
}

.vault-info {
  display: flex;
  align-items: center;
  gap: 32rpx;
}

.vault-icon {
  width: 96rpx;
  height: 96rpx;
  border-radius: 32rpx;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border: 2rpx solid #f0f0f0;
  transition: all 0.3s ease;
  
  &.hover {
    background: #1a1a1a;
    color: $yu-brand;
    transform: scale(1.05);
  }
}

.vault-stats {
  display: flex;
  flex-direction: column;
}

.stats-label {
  font-size: 20rpx;
  color: #999;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 4rpx;
}

.stats-value {
  font-size: 48rpx;
  font-weight: 900;
  color: #1a1a1a;
  font-family: 'Courier New', monospace;
  line-height: 1;
}

.vault-actions {
  text-align: right;
  z-index: 10;
}

.favorite-label {
  font-size: 20rpx;
  color: #999;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 4rpx;
  display: block;
}

.favorite-brand {
  font-size: 28rpx;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 16rpx;
  display: block;
}

.checkin-btn {
  background: #f5f5f5;
  color: #1a1a1a;
  font-size: 18rpx;
  font-weight: 700;
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4rpx;
  margin-left: auto;
  width: fit-content;
  
  &:active {
    background: #1a1a1a;
    color: $yu-brand;
    transform: scale(0.95);
  }
}

.checkin-text {
  font-size: 18rpx;
  font-weight: 700;
}
</style>