<template>
  <view class="settings-modal" @click="$emit('close')">
    <view class="modal-backdrop"></view>
    <view class="modal-content" @click.stop>
      <view class="modal-handle"></view>
      <text class="modal-title">设置与管理</text>
      
      <view class="settings-list">
        <!-- 编辑资料 -->
        <view class="setting-item" @click="$emit('toggle-edit')">
          <view class="setting-icon" :class="{ active: isEditing }">
            <YuIcon name="Edit" :size="40" color="#fff" />
          </view>
          <view class="setting-info">
            <text class="setting-title">编辑资料</text>
            <text class="setting-desc">修改昵称、简介、标签</text>
          </view>
          <view class="setting-status" :class="{ active: isEditing }">
            {{ isEditing ? 'Editing' : 'Idle' }}
          </view>
        </view>

        <!-- 隐私保护 -->
        <view class="setting-item" @click="$emit('toggle-privacy')">
          <view class="setting-icon" :class="{ active: privacyMode }">
            <YuIcon name="Shield" :size="40" color="#fff" />
          </view>
          <view class="setting-info">
            <text class="setting-title">隐私保护</text>
            <text class="setting-desc">对外隐藏微信号，仅展示星号</text>
          </view>
          <view class="toggle-switch" :class="{ active: privacyMode }">
            <view class="toggle-handle"></view>
          </view>
        </view>

        <!-- 关于羽 Yu -->
        <view class="setting-item">
          <view class="setting-icon">
            <YuIcon name="Help" :size="40" color="#fff" />
          </view>
          <view class="setting-info">
            <text class="setting-title">关于羽 Yu</text>
            <text class="setting-desc">版本 v1.0.2 (Beta)</text>
          </view>
          <YuIcon name="ChevronRight" :size="32" color="#ccc" />
        </view>
      </view>

      <!-- 退出登录 -->
      <view class="logout-section">
        <view class="logout-btn" @click="$emit('logout')">
          <YuIcon name="LogOut" :size="32" color="#ef4444" />
          <text class="logout-text">退出登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'SettingsModal',
  components: {
    YuIcon
  },
  props: {
    isEditing: {
      type: Boolean,
      default: false
    },
    privacyMode: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.settings-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10rpx);
}

.modal-content {
  background: white;
  width: 100%;
  border-radius: 64rpx 64rpx 0 0;
  padding: 48rpx 48rpx 96rpx;
  position: relative;
  z-index: 10;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-handle {
  width: 96rpx;
  height: 12rpx;
  background: #e5e7eb;
  border-radius: 50rpx;
  margin: 0 auto 48rpx;
}

.modal-title {
  font-size: 40rpx;
  font-weight: 900;
  font-style: italic;
  color: #1a1a1a;
  margin-bottom: 48rpx;
  padding: 0 8rpx;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.setting-item {
  display: flex;
  align-items: center;
  gap: 32rpx;
  padding: 32rpx;
  border-radius: 32rpx;
  border: 2rpx solid #f0f0f0;
  background: white;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
    background: #f9fafb;
  }
}

.setting-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &.active {
    background: #1a1a1a;
  }
  
  &:not(.active) {
    background: #f5f5f5;
    
    :deep(.yu-icon) {
      color: #999 !important;
    }
  }
}

.setting-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.setting-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8rpx;
}

.setting-desc {
  font-size: 20rpx;
  font-weight: 500;
  color: #999;
}

.setting-status {
  padding: 8rpx 16rpx;
  border-radius: 12rpx;
  font-size: 20rpx;
  font-weight: 700;
  background: #f5f5f5;
  color: #999;
  
  &.active {
    background: #dcfce7;
    color: #16a34a;
  }
}

.toggle-switch {
  width: 80rpx;
  height: 48rpx;
  border-radius: 24rpx;
  background: #e5e7eb;
  position: relative;
  transition: all 0.3s ease;
  
  &.active {
    background: #10b981;
  }
}

.toggle-handle {
  width: 32rpx;
  height: 32rpx;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 8rpx;
  left: 8rpx;
  transition: all 0.3s ease;
}

.toggle-switch.active .toggle-handle {
  transform: translateX(32rpx);
}

.logout-section {
  padding-top: 32rpx;
  margin-top: 32rpx;
  border-top: 2rpx solid #f0f0f0;
}

.logout-btn {
  width: 100%;
  padding: 32rpx;
  text-align: center;
  background: #fef2f2;
  border-radius: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
    background: #fee2e2;
  }
}

.logout-text {
  font-size: 28rpx;
  font-weight: 700;
  color: #ef4444;
}
</style>