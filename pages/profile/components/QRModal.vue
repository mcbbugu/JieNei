<template>
  <view class="qr-modal" @click="handleClose">
    <view class="modal-content animate-scale-in" @click.stop>
      <view class="modal-header">
        <text class="modal-title">我的二维码</text>
        <view class="close-btn" @click="handleClose">
          <YuIcon name="Close" size="lg" color="#666" />
        </view>
      </view>
      
      <view class="qr-container">
        <view class="qr-code">
          <view class="qr-placeholder">
            <YuIcon name="QRcode" :size="200" color="#ccf381" />
          </view>
        </view>
        
        <view class="user-info">
          <YuAvatar text="张三" size="large" color="brand" />
          <view class="user-details">
            <text class="user-name">张三</text>
            <text class="user-level">Lv.8.5 高级选手</text>
          </view>
        </view>
      </view>
      
      <text class="qr-hint">让朋友扫描此二维码添加你为球友</text>
      
      <view class="modal-actions">
        <YuButton type="secondary" @click="saveQR">保存到相册</YuButton>
        <YuButton type="primary" @click="shareQR">分享二维码</YuButton>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuButton from '@/components/YuButton/YuButton.vue'

export default {
  name: 'QRModal',
  components: {
    YuIcon,
    YuAvatar,
    YuButton
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    saveQR() {
      uni.showToast({
        title: '保存功能开发中...',
        icon: 'none'
      })
    },
    shareQR() {
      uni.showToast({
        title: '分享功能开发中...',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.qr-modal {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba(0, 0, 0, 0.5);
  @include flex-center;
  padding: $spacing-xl;
}

.modal-content {
  background: $yu-white;
  border-radius: $radius-lg;
  padding: $spacing-xl;
  width: 100%;
  max-width: 600rpx;
  @include shadow('lg');
}

.modal-header {
  @include flex-between;
  margin-bottom: $spacing-xl;
}

.modal-title {
  font-size: $font-xl;
  font-weight: bold;
  color: $yu-black;
}

.close-btn {
  width: 60rpx;
  height: 60rpx;
  @include flex-center;
  border-radius: 50%;
  background: #f5f5f5;
  
  &:active {
    background: #e5e5e5;
  }
}

.qr-container {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;
}

.qr-code {
  width: 300rpx;
  height: 300rpx;
  @include flex-center;
  background: $yu-white;
  border: 4rpx solid #f0f0f0;
  border-radius: $radius-md;
}

.qr-placeholder {
  @include flex-center;
  width: 100%;
  height: 100%;
  background: #fafafa;
  border-radius: $radius-sm;
}

.user-info {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-md;
}

.user-details {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xs;
}

.user-name {
  font-size: $font-lg;
  font-weight: bold;
  color: $yu-black;
}

.user-level {
  font-size: $font-sm;
  color: $yu-light-gray;
}

.qr-hint {
  font-size: $font-sm;
  color: $yu-light-gray;
  text-align: center;
  margin-bottom: $spacing-xl;
  line-height: 1.4;
}

.modal-actions {
  display: flex;
  gap: $spacing-md;
  
  .yu-button {
    flex: 1;
  }
}
</style>
