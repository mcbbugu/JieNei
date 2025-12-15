<template>
  <view class="about-modal" @click="handleClose">
    <view class="modal-content animate-scale-in" @click.stop>
      <view class="modal-header">
        <text class="modal-title">关于界内</text>
        <view class="close-btn" @click="handleClose">
          <YuIcon name="Close" size="lg" color="#666" />
        </view>
      </view>
      
      <view class="about-content">
        <!-- App Logo -->
        <view class="app-logo">
          <view class="logo-circle">
            <text class="logo-text">界</text>
          </view>
          <text class="app-name">界内</text>
          <text class="app-version">v1.0.0</text>
        </view>
        
        <!-- App Description -->
        <view class="app-description">
          <text class="description-text">
            界内是一款专为羽毛球爱好者打造的社交运动应用。
            在这里，你可以记录运动数据、寻找球友、分享精彩瞬间，
            让羽毛球运动更有趣、更社交。
          </text>
        </view>
        
        <!-- Features -->
        <view class="features-list">
          <view class="feature-item">
            <YuIcon name="Activity" size="md" color="#ccf381" />
            <text class="feature-text">智能运动记录</text>
          </view>
          <view class="feature-item">
            <YuIcon name="User" size="md" color="#ccf381" />
            <text class="feature-text">附近球友发现</text>
          </view>
          <view class="feature-item">
            <YuIcon name="Message" size="md" color="#ccf381" />
            <text class="feature-text">社区互动分享</text>
          </view>
          <view class="feature-item">
            <YuIcon name="Trophy" size="md" color="#ccf381" />
            <text class="feature-text">等级评测系统</text>
          </view>
        </view>
        
        <!-- Links -->
        <view class="links-section">
          <view class="link-item" @click="openPrivacyPolicy">
            <text class="link-text">隐私政策</text>
            <YuIcon name="ChevronRight" size="sm" color="#999" />
          </view>
          <view class="link-item" @click="openTermsOfService">
            <text class="link-text">服务条款</text>
            <YuIcon name="ChevronRight" size="sm" color="#999" />
          </view>
          <view class="link-item" @click="openHelp">
            <text class="link-text">帮助中心</text>
            <YuIcon name="ChevronRight" size="sm" color="#999" />
          </view>
        </view>
        
        <!-- Copyright -->
        <view class="copyright">
          <text class="copyright-text">© 2024 界内团队</text>
          <text class="copyright-text">让羽毛球运动更精彩</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'AboutModal',
  components: {
    YuIcon
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    openPrivacyPolicy() {
      uni.showToast({
        title: '隐私政策页面开发中...',
        icon: 'none'
      })
    },
    openTermsOfService() {
      uni.showToast({
        title: '服务条款页面开发中...',
        icon: 'none'
      })
    },
    openHelp() {
      uni.showToast({
        title: '帮助中心开发中...',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.about-modal {
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
  max-height: 80vh;
  overflow-y: auto;
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

.about-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xl;
}

.app-logo {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-md;
}

.logo-circle {
  width: 120rpx;
  height: 120rpx;
  @include flex-center;
  background: linear-gradient(135deg, $yu-brand 0%, $yu-brand-dark 100%);
  border-radius: 50%;
  @include shadow('lg');
}

.logo-text {
  font-size: 60rpx;
  font-weight: bold;
  color: $yu-black;
}

.app-name {
  font-size: $font-2xl;
  font-weight: bold;
  color: $yu-black;
}

.app-version {
  font-size: $font-sm;
  color: $yu-light-gray;
}

.app-description {
  text-align: center;
  padding: 0 $spacing-lg;
}

.description-text {
  font-size: $font-base;
  color: $yu-light-gray;
  line-height: 1.6;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background: #f8f9fa;
  border-radius: $radius-md;
}

.feature-item {
  @include flex-center-y;
  gap: $spacing-md;
}

.feature-text {
  font-size: $font-base;
  color: $yu-black;
  font-weight: 500;
}

.links-section {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
  background: #f8f9fa;
  border-radius: $radius-md;
  overflow: hidden;
}

.link-item {
  @include flex-between;
  padding: $spacing-lg;
  background: $yu-white;
  cursor: pointer;
  
  &:active {
    background: #f8f9fa;
  }
}

.link-text {
  font-size: $font-base;
  color: $yu-black;
}

.copyright {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xs;
  padding-top: $spacing-lg;
  border-top: 2rpx solid #f0f0f0;
}

.copyright-text {
  font-size: $font-sm;
  color: $yu-light-gray;
  text-align: center;
}
</style>
