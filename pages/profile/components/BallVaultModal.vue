<template>
  <view class="ball-vault-modal" @click="$emit('close')">
    <view class="modal-backdrop"></view>
    <view class="modal-content" @click.stop>
      <!-- 头部 -->
      <view class="modal-header">
        <view class="close-btn" @click="$emit('close')">
          <YuIcon name="XCircle" :size="48" color="#666" />
        </view>
        <view class="header-content">
          <text class="modal-title">球库</text>
          <text class="modal-subtitle">VAULT</text>
        </view>
        <view class="stats-section">
          <text class="stats-label">累计打残/消耗</text>
          <text class="stats-value">{{ stats.totalUsed }}</text>
        </view>
        <view class="add-btn" @click="$emit('add')">
          <YuIcon name="Plus" :size="56" color="#1a1a1a" />
        </view>
      </view>

      <!-- 内容区域 -->
      <view class="modal-body">
        <view class="history-header">
          <text class="history-title">最近记录</text>
          <text class="history-subtitle">历史消耗</text>
        </view>

        <view class="history-list">
          <view 
            v-for="(item, index) in stats.history" 
            :key="index"
            class="history-item"
          >
            <view class="item-info">
              <view class="item-icon">
                <YuIcon name="Feather" :size="28" color="#999" />
              </view>
              <view class="item-details">
                <text class="item-brand">{{ item.brand }}</text>
                <text class="item-date">{{ item.date }}</text>
              </view>
            </view>
            <text class="item-count">-{{ item.count }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'BallVaultModal',
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
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.ball-vault-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48rpx;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.95);
  backdrop-filter: blur(20rpx);
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 640rpx;
  border-radius: 64rpx;
  overflow: hidden;
  position: relative;
  z-index: 10;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 头部 - 黑色背景 */
.modal-header {
  background: #1a1a1a;
  padding: 48rpx;
  position: relative;
  color: white;
}

.close-btn {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.9);
  }
}

.header-content {
  margin-bottom: 48rpx;
}

.modal-title {
  font-size: 48rpx;
  font-weight: 900;
  font-style: italic;
  color: white;
  display: block;
  margin-bottom: 8rpx;
}

.modal-subtitle {
  font-size: 28rpx;
  color: $yu-brand;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.stats-section {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.stats-label {
  font-size: 24rpx;
  color: #999;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  margin-bottom: 8rpx;
  display: block;
}

.stats-value {
  font-size: 120rpx;
  font-weight: 900;
  color: white;
  font-family: 'Courier New', monospace;
  line-height: 1;
}

.add-btn {
  background: $yu-brand;
  color: #1a1a1a;
  width: 112rpx;
  height: 112rpx;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 40rpx rgba(204, 243, 129, 0.4);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.9);
  }
}

/* 内容区域 */
.modal-body {
  padding: 48rpx;
  background: #f9fafb;
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.history-title {
  font-size: 28rpx;
  font-weight: 900;
  color: #1a1a1a;
}

.history-subtitle {
  font-size: 24rpx;
  font-weight: 700;
  color: #999;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.history-item {
  background: white;
  padding: 24rpx;
  border-radius: 24rpx;
  border: 2rpx solid #f0f0f0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.item-icon {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-brand {
  font-size: 24rpx;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 4rpx;
}

.item-date {
  font-size: 20rpx;
  font-weight: 700;
  color: #999;
}

.item-count {
  font-size: 28rpx;
  font-weight: 900;
  color: #ef4444;
}
</style>