<template>
  <view class="contact-overlay" @click="$emit('close')">
    <view class="contact-content animate-fade-in" @click.stop>
      <!-- 关闭按钮 -->
      <view class="close-btn" @click="$emit('close')">
        <YuIcon name="XCircle" :size="48" color="#d1d5db" />
      </view>
      
      <!-- 球友头像 -->
      <YuAvatar 
        :text="player.name[0]" 
        :color="player.avatarColor" 
        size="xlarge"
        class="contact-avatar"
      />
      
      <!-- 球友信息 -->
      <text class="contact-name">{{ player.name }}</text>
      <text class="contact-desc">已建立连接，扫码加微信</text>
      
      <!-- 二维码区域 -->
      <view class="qr-section">
        <view class="qr-container">
          <!-- 模拟二维码背景 -->
          <view class="qr-background"></view>
          
          <!-- 二维码图标 -->
          <YuIcon name="QrCode" :size="240" color="#1a1a1a" class="qr-icon" />
          
          <!-- 中心头像 -->
          <view class="qr-center">
            <YuAvatar 
              :text="player.name[0]" 
              :color="player.avatarColor" 
              size="medium"
            />
          </view>
        </view>
      </view>
      
      <!-- 微信号 -->
      <view class="wechat-section">
        <text class="wechat-id">{{ wechatId }}</text>
        <YuButton 
          type="secondary" 
          size="small"
          @click="copyWechatId"
        >
          复制
        </YuButton>
      </view>
      
      <!-- 保存按钮 -->
      <YuButton 
        type="primary" 
        size="large"
        @click="saveQRCode"
        class="save-btn"
      >
        保存二维码图片
      </YuButton>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuButton from '@/components/YuButton/YuButton.vue'

export default {
  name: 'ContactModal',
  components: {
    YuIcon,
    YuAvatar,
    YuButton
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  computed: {
    wechatId() {
      return `wx_id_${Math.floor(Math.random() * 10000)}`
    }
  },
  methods: {
    copyWechatId() {
      uni.setClipboardData({
        data: this.wechatId,
        success: () => {
          uni.showToast({
            title: `微信号 ${this.wechatId} 已复制`,
            icon: 'success'
          })
        }
      })
    },
    
    saveQRCode() {
      uni.showToast({
        title: '二维码已保存到相册',
        icon: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.contact-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($yu-black, 0.95);
  @include glass(rgba($yu-black, 0.1));
  @include flex-center;
  z-index: $z-modal + 10;
}

.contact-content {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-lg;
  background: $yu-white;
  border-radius: $radius-3xl;
  padding: $spacing-2xl;
  width: 90%;
  max-width: 600rpx;
  position: relative;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: $spacing-lg;
  right: $spacing-lg;
  @include flex-center;
  width: 64rpx;
  height: 64rpx;
  
  &:active {
    transform: scale(0.9);
  }
}

.contact-avatar {
  margin-bottom: $spacing-sm;
}

.contact-name {
  font-size: $font-lg;
  font-weight: $font-black;
  color: $yu-black;
  margin-bottom: $spacing-xs;
}

.contact-desc {
  font-size: $font-sm;
  color: $yu-light-gray;
  font-weight: $font-bold;
  margin-bottom: $spacing-xl;
}

.qr-section {
  margin-bottom: $spacing-xl;
}

.qr-container {
  position: relative;
  width: 400rpx;
  height: 400rpx;
  background: $yu-black;
  border-radius: $radius-2xl;
  padding: $spacing-lg;
  @include shadow('xl');
  @include flex-center;
}

.qr-background {
  position: absolute;
  inset: $spacing-lg;
  background: $yu-white;
  border-radius: $radius-lg;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.1;
    background-image: radial-gradient(#000 2rpx, transparent 2rpx);
    background-size: 16rpx 16rpx;
  }
}

.qr-icon {
  position: relative;
  z-index: 1;
}

.qr-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  background: $yu-white;
  border-radius: $radius-lg;
  padding: $spacing-sm;
  @include shadow('lg');
}

.wechat-section {
  @include flex-between;
  background: #f3f4f6;
  border-radius: $radius-xl;
  padding: $spacing-md $spacing-lg;
  width: 100%;
  margin-bottom: $spacing-lg;
}

.wechat-id {
  font-family: 'Courier New', monospace;
  font-size: $font-sm;
  font-weight: $font-bold;
  color: #6b7280;
  @include text-ellipsis;
  max-width: 300rpx;
}

.save-btn {
  width: 100%;
  @include shadow('lg');
}
</style>
