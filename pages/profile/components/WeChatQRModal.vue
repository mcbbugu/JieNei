<template>
  <view class="wechat-qr-modal" @click="$emit('close')">
    <view class="modal-backdrop"></view>
    <view class="modal-content" @click.stop>
      <view class="close-btn" @click="$emit('close')">
        <YuIcon name="XCircle" :size="48" color="#ccc" />
      </view>

      <!-- 用户头像和信息 -->
      <view class="user-section">
        <view class="avatar">{{ profile.name.charAt(0) }}</view>
        <text class="user-name">{{ profile.name }}</text>
        <text class="user-desc">扫一扫，加我微信切磋</text>
      </view>

      <!-- 二维码区域 -->
      <view class="qr-section">
        <view class="qr-container">
          <!-- 模拟二维码背景 -->
          <view class="qr-background"></view>
          <YuIcon name="QrCode" :size="240" color="#1a1a1a" />
          <!-- 中心头像 -->
          <view class="qr-center">
            <view class="center-avatar">
              <text class="center-initial">{{ profile.name.charAt(0) }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 微信号信息 -->
      <view class="wechat-info">
        <text class="wechat-id">wx_id_{{ Math.floor(Math.random() * 10000) }}</text>
        <view class="copy-btn" @click="copyWeChatId">
          <text class="copy-text">复制</text>
        </view>
      </view>

      <!-- 保存按钮 -->
      <view class="save-btn" @click="saveQRCode">
        <text class="save-text">保存二维码图片</text>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'WeChatQRModal',
  components: {
    YuIcon
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  methods: {
    copyWeChatId() {
      const wechatId = `wx_id_${Math.floor(Math.random() * 10000)}`
      uni.setClipboardData({
        data: wechatId,
        success: () => {
          uni.showToast({
            title: '微信号已复制',
            icon: 'success'
          })
        }
      })
    },
    
    saveQRCode() {
      uni.showToast({
        title: '保存功能开发中',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.wechat-qr-modal {
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
  max-width: 560rpx;
  border-radius: 64rpx;
  padding: 64rpx;
  text-align: center;
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
  top: 32rpx;
  right: 32rpx;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.9);
  }
  
  &:hover {
    color: #1a1a1a;
  }
}

/* 用户信息区域 */
.user-section {
  margin-bottom: 48rpx;
}

.avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48rpx;
  font-weight: 900;
  color: #999;
  margin: 0 auto 32rpx;
}

.user-name {
  font-size: 36rpx;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 8rpx;
  display: block;
}

.user-desc {
  font-size: 24rpx;
  font-weight: 700;
  color: #666;
  display: block;
}

/* 二维码区域 */
.qr-section {
  margin-bottom: 48rpx;
}

.qr-container {
  background: #1a1a1a;
  padding: 32rpx;
  border-radius: 32rpx;
  box-shadow: 0 16rpx 32rpx rgba(204, 243, 129, 0.2);
  position: relative;
  display: inline-block;
}

.qr-background {
  position: absolute;
  inset: 32rpx;
  background: white;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.qr-background::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.1;
  background-image: radial-gradient(circle at 50% 50%, #000 2rpx, transparent 2rpx);
  background-size: 16rpx 16rpx;
}

.qr-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.center-avatar {
  width: 80rpx;
  height: 80rpx;
  background: white;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
}

.center-initial {
  width: 64rpx;
  height: 64rpx;
  background: $yu-brand;
  border-radius: 8rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  font-weight: 900;
  color: #1a1a1a;
}

/* 微信号信息 */
.wechat-info {
  background: #f5f5f5;
  border-radius: 24rpx;
  padding: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32rpx;
}

.wechat-id {
  font-size: 24rpx;
  font-weight: 700;
  color: #666;
  font-family: 'Courier New', monospace;
  flex: 1;
  text-align: left;
}

.copy-btn {
  background: white;
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  border: 2rpx solid #e5e7eb;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
    background: $yu-brand;
    border-color: $yu-brand;
  }
}

.copy-text {
  font-size: 20rpx;
  font-weight: 700;
  color: #1a1a1a;
}

/* 保存按钮 */
.save-btn {
  width: 100%;
  padding: 24rpx;
  background: #f5f5f5;
  border-radius: 24rpx;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
    background: $yu-brand;
  }
}

.save-text {
  font-size: 24rpx;
  font-weight: 700;
  color: #1a1a1a;
}
</style>