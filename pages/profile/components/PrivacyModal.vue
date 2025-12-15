<template>
  <view class="privacy-modal" @click="handleClose">
    <view class="modal-content animate-slide-up" @click.stop>
      <view class="modal-header">
        <text class="modal-title">隐私设置</text>
        <view class="close-btn" @click="handleClose">
          <YuIcon name="Close" size="lg" color="#666" />
        </view>
      </view>
      
      <view class="privacy-list">
        <view class="privacy-section">
          <text class="section-title">个人信息</text>
          
          <view class="privacy-item">
            <view class="privacy-info">
              <text class="privacy-title">公开个人资料</text>
              <text class="privacy-desc">允许其他用户查看你的基本信息</text>
            </view>
            <switch 
              :checked="profileVisible" 
              @change="toggleProfileVisible"
              color="#ccf381"
            />
          </view>
          
          <view class="privacy-item">
            <view class="privacy-info">
              <text class="privacy-title">显示在线状态</text>
              <text class="privacy-desc">让朋友知道你是否在线</text>
            </view>
            <switch 
              :checked="onlineStatus" 
              @change="toggleOnlineStatus"
              color="#ccf381"
            />
          </view>
        </view>
        
        <view class="privacy-section">
          <text class="section-title">活动记录</text>
          
          <view class="privacy-item">
            <view class="privacy-info">
              <text class="privacy-title">公开运动记录</text>
              <text class="privacy-desc">允许朋友查看你的运动数据</text>
            </view>
            <switch 
              :checked="activityVisible" 
              @change="toggleActivityVisible"
              color="#ccf381"
            />
          </view>
          
          <view class="privacy-item">
            <view class="privacy-info">
              <text class="privacy-title">排行榜显示</text>
              <text class="privacy-desc">在排行榜中显示你的成绩</text>
            </view>
            <switch 
              :checked="leaderboardVisible" 
              @change="toggleLeaderboardVisible"
              color="#ccf381"
            />
          </view>
        </view>
        
        <view class="privacy-section">
          <text class="section-title">社交功能</text>
          
          <view class="privacy-item">
            <view class="privacy-info">
              <text class="privacy-title">允许添加好友</text>
              <text class="privacy-desc">其他用户可以向你发送好友请求</text>
            </view>
            <switch 
              :checked="friendRequestsEnabled" 
              @change="toggleFriendRequests"
              color="#ccf381"
            />
          </view>
          
          <view class="privacy-item">
            <view class="privacy-info">
              <text class="privacy-title">接收私信</text>
              <text class="privacy-desc">允许其他用户给你发送私信</text>
            </view>
            <switch 
              :checked="messagesEnabled" 
              @change="toggleMessages"
              color="#ccf381"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'PrivacyModal',
  components: {
    YuIcon
  },
  data() {
    return {
      profileVisible: true,
      onlineStatus: true,
      activityVisible: true,
      leaderboardVisible: true,
      friendRequestsEnabled: true,
      messagesEnabled: true
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    toggleProfileVisible() {
      this.profileVisible = !this.profileVisible
      this.showToast('个人资料可见性已更新')
    },
    toggleOnlineStatus() {
      this.onlineStatus = !this.onlineStatus
      this.showToast('在线状态设置已更新')
    },
    toggleActivityVisible() {
      this.activityVisible = !this.activityVisible
      this.showToast('运动记录可见性已更新')
    },
    toggleLeaderboardVisible() {
      this.leaderboardVisible = !this.leaderboardVisible
      this.showToast('排行榜显示设置已更新')
    },
    toggleFriendRequests() {
      this.friendRequestsEnabled = !this.friendRequestsEnabled
      this.showToast('好友请求设置已更新')
    },
    toggleMessages() {
      this.messagesEnabled = !this.messagesEnabled
      this.showToast('私信设置已更新')
    },
    showToast(message) {
      uni.showToast({
        title: message,
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.privacy-modal {
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
  max-width: 700rpx;
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

.privacy-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-2xl;
}

.privacy-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.section-title {
  font-size: $font-lg;
  font-weight: bold;
  color: $yu-black;
  padding-bottom: $spacing-sm;
  border-bottom: 2rpx solid #f0f0f0;
}

.privacy-item {
  @include flex-between;
  align-items: flex-start;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: #f8f9fa;
  border-radius: $radius-md;
}

.privacy-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.privacy-title {
  font-size: $font-base;
  font-weight: 500;
  color: $yu-black;
}

.privacy-desc {
  font-size: $font-sm;
  color: $yu-light-gray;
  line-height: 1.4;
}
</style>
