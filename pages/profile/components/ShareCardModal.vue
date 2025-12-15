<template>
  <view class="share-card-modal" @click="$emit('close')">
    <view class="modal-backdrop"></view>
    <view class="modal-wrapper" @click.stop>
      <view class="close-btn" @click="$emit('close')">
        <YuIcon name="XCircle" :size="64" color="rgba(255,255,255,0.5)" />
      </view>
      
      <!-- 分享卡片 -->
      <view class="share-card">
        <!-- 背景装饰 -->
        <view class="card-glow"></view>
        
        <!-- 卡片头部标识 -->
        <view class="card-header">
          <view class="brand-dot"></view>
          <text class="brand-text">YU BADMINTON CARD</text>
        </view>

        <!-- 用户头像和等级 -->
        <view class="user-section">
          <view class="avatar-container">
            <view class="avatar">{{ profile.name.charAt(0) }}</view>
            <view class="level-badge">{{ profile.level }}</view>
          </view>
        </view>

        <!-- 用户信息 -->
        <view class="user-info">
          <text class="user-name">{{ profile.name }}</text>
          <text class="user-title">{{ profile.levelTitle }}</text>
        </view>

        <!-- 统计数据 -->
        <view class="stats-grid">
          <view class="stat-item">
            <text class="stat-value">{{ profile.stats.winRate }}</text>
            <text class="stat-label">胜率</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-value">{{ profile.stats.appreciations }}</text>
            <text class="stat-label">收获欣赏</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-value">{{ getMainTension() }}</text>
            <text class="stat-label">主战磅数</text>
          </view>
        </view>

        <!-- 雷达图 -->
        <view class="radar-section">
          <RadarChart :values="profile.radar" />
        </view>

        <!-- 小程序码 -->
        <view class="miniprogram-section">
          <text class="miniprogram-text">长按识别小程序码</text>
          <view class="miniprogram-code">
            <view class="code-placeholder"></view>
          </view>
        </view>
      </view>

      <!-- 操作按钮 -->
      <view class="action-buttons">
        <view class="action-btn primary" @click="saveImage">
          <YuIcon name="ArrowDownCircle" :size="36" color="#1a1a1a" />
          <text class="btn-text">保存图片</text>
        </view>
        <view class="action-btn secondary" @click="shareCard">
          <YuIcon name="Share" :size="36" color="#fff" />
          <text class="btn-text">分享</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import RadarChart from './RadarChart.vue'

export default {
  name: 'ShareCardModal',
  components: {
    YuIcon,
    RadarChart
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    gearList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getMainTension() {
      const activeRacket = this.gearList.find(gear => 
        gear.type === 'RACKET' && gear.status === 'ACTIVE'
      )
      return activeRacket?.specs?.match(/(\d+)\s*lbs?/i)?.[1] + 'lbs' || '26lbs'
    },
    
    saveImage() {
      uni.showToast({
        title: '保存功能开发中',
        icon: 'none'
      })
    },
    
    shareCard() {
      uni.showToast({
        title: '分享功能开发中',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.share-card-modal {
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

.modal-wrapper {
  width: 100%;
  max-width: 640rpx;
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

.close-btn {
  position: absolute;
  top: -96rpx;
  right: 0;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.9);
  }
  
  &:hover {
    color: white;
  }
}

/* 分享卡片 */
.share-card {
  background: #18181b;
  border-radius: 64rpx;
  overflow: hidden;
  box-shadow: 0 32rpx 64rpx rgba(0, 0, 0, 0.5);
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  position: relative;
  color: white;
  padding: 64rpx;
  text-align: center;
  margin-bottom: 48rpx;
}

.card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 512rpx;
  height: 512rpx;
  background: radial-gradient(circle, rgba(204, 243, 129, 0.1) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(160rpx);
}

/* 卡片头部 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  margin-bottom: 64rpx;
  opacity: 0.5;
  position: relative;
  z-index: 10;
}

.brand-dot {
  width: 16rpx;
  height: 16rpx;
  background: $yu-brand;
  border-radius: 50%;
}

.brand-text {
  font-size: 20rpx;
  font-weight: 900;
  letter-spacing: 4rpx;
  text-transform: uppercase;
}

/* 用户区域 */
.user-section {
  margin-bottom: 48rpx;
  position: relative;
  z-index: 10;
}

.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar {
  width: 256rpx;
  height: 256rpx;
  border-radius: 64rpx;
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 120rpx;
  font-weight: 900;
  color: white;
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  padding: 8rpx;
}

.level-badge {
  position: absolute;
  bottom: -24rpx;
  right: -24rpx;
  background: $yu-brand;
  color: #1a1a1a;
  font-size: 28rpx;
  font-weight: 900;
  padding: 16rpx 24rpx;
  border-radius: 24rpx;
  border: 8rpx solid #18181b;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.3);
}

.user-info {
  margin-bottom: 48rpx;
  position: relative;
  z-index: 10;
}

.user-name {
  font-size: 72rpx;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -2rpx;
  margin-bottom: 8rpx;
  display: block;
}

.user-title {
  color: #666;
  font-size: 24rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4rpx;
  display: block;
}

/* 统计数据 */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: 32rpx;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 32rpx;
  padding: 32rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.05);
  margin-bottom: 48rpx;
  position: relative;
  z-index: 10;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 36rpx;
  font-weight: 900;
  color: white;
  margin-bottom: 8rpx;
}

.stat-label {
  font-size: 18rpx;
  color: #666;
  font-weight: 700;
  text-transform: uppercase;
}

.stat-divider {
  width: 2rpx;
  height: 48rpx;
  background: rgba(255, 255, 255, 0.1);
  align-self: center;
}

/* 雷达图 */
.radar-section {
  width: 256rpx;
  height: 256rpx;
  margin: 0 auto 48rpx;
  opacity: 0.8;
  transform: scale(0.75);
  position: relative;
  z-index: 10;
}

/* 小程序码 */
.miniprogram-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
  position: relative;
  z-index: 10;
}

.miniprogram-text {
  font-size: 24rpx;
  color: #666;
  font-weight: 500;
}

.miniprogram-code {
  width: 64rpx;
  height: 64rpx;
  background: white;
  border-radius: 8rpx;
  padding: 4rpx;
}

.code-placeholder {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 4rpx;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 24rpx;
}

.action-btn {
  flex: 1;
  padding: 28rpx;
  border-radius: 24rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
  
  &.primary {
    background: $yu-brand;
    color: #1a1a1a;
    box-shadow: 0 8rpx 24rpx rgba(204, 243, 129, 0.2);
  }
  
  &.secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2rpx solid rgba(255, 255, 255, 0.2);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.btn-text {
  font-size: 28rpx;
  font-weight: 700;
}
</style>