<template>
  <view class="modal-overlay" @click="$emit('close')">
    <view class="modal-content animate-slide-up" @click.stop>
      <!-- 原生风格头部 -->
      <view class="modal-header">
        <text class="modal-title">消息</text>
        <view class="close-btn" @click="$emit('close')">
          <YuIcon name="XCircle" :size="44" color="#9ca3af" />
        </view>
      </view>
      
      <!-- 消息列表 -->
      <scroll-view scroll-y class="notification-list" enhanced :show-scrollbar="false">
        <template v-if="notifications.length === 0">
          <view class="empty-state">
            <YuIcon name="MessageCircle" :size="96" color="#f3f4f6" />
            <text class="empty-text">暂无新消息</text>
          </view>
        </template>
        
        <template v-else>
          <view 
            v-for="notif in notifications" 
            :key="notif.id"
            class="notification-item"
            @click="handleSelect(notif)"
          >
            <!-- 头像区域 -->
            <view class="avatar-section">
              <YuAvatar 
                :text="notif.fromUser ? notif.fromUser[0] : '?'" 
                :color="notif.avatarColor || 'bg-gray-100'"
                size="medium"
              />
              
              <!-- 未读标识 -->
              <view v-if="!notif.isRead" class="unread-dot"></view>
              
              <!-- 类型图标 -->
              <view class="type-badge">
                <view v-if="notif.type === 'INVITE_RECEIVED'" class="type-icon invite">
                  <YuIcon name="Send" :size="20" color="#ccf381" />
                </view>
                <view v-else-if="notif.content.includes('赞赏')" class="type-icon appreciate">
                  <YuIcon name="Heart" :size="20" color="#ef4444" />
                </view>
                <view v-else-if="notif.content.includes('关注')" class="type-icon follow">
                  <YuIcon name="UserPlus" :size="20" color="#3b82f6" />
                </view>
              </view>
            </view>
            
            <!-- 内容区域 -->
            <view class="content-section">
              <view class="content-header">
                <text class="sender-name">{{ notif.fromUser }}</text>
                <text class="time-text">{{ notif.time }}</text>
              </view>
              <text class="content-text">{{ notif.content }}</text>
            </view>
            
            <!-- 箭头 -->
            <view class="arrow-icon">
              <YuIcon name="ChevronRight" :size="32" color="#e5e7eb" />
            </view>
          </view>
        </template>
        
        <!-- 底部提示 -->
        <view class="footer-tip">
          <text class="tip-text">互相关注后，方可查看对方联系方式</text>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'

export default {
  name: 'NotificationModal',
  components: {
    YuIcon,
    YuAvatar
  },
  props: {
    notifications: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close', 'select'],
  methods: {
    handleSelect(notification) {
      this.$emit('select', notification)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  @include glass(rgba(0, 0, 0, 0.1));
  @include flex-center;
  align-items: flex-end;
  z-index: $z-modal;
}

.modal-content {
  width: 100%;
  height: 90vh;
  background: $yu-white;
  border-radius: $radius-3xl $radius-3xl 0 0;
  display: flex;
  flex-direction: column;
  @include shadow('xl');
}

.modal-header {
  height: 112rpx;
  @include flex-center;
  border-bottom: 2rpx solid #f0f0f0;
  position: relative;
  flex-shrink: 0;
}

.modal-title {
  font-size: $font-lg;
  font-weight: $font-black;
  color: $yu-black;
}

.close-btn {
  position: absolute;
  right: $spacing-lg;
  @include flex-center;
  width: 64rpx;
  height: 64rpx;
  
  &:active {
    transform: scale(0.9);
  }
}

.notification-list {
  flex: 1;
  overflow: hidden;
}

.empty-state {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-lg;
  padding: $spacing-3xl 0;
  height: 512rpx;
}

.empty-text {
  font-size: $font-sm;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.notification-item {
  @include flex-center-y;
  gap: $spacing-lg;
  padding: $spacing-lg $spacing-xl;
  border-bottom: 2rpx solid #f9fafb;
  transition: background-color $duration-normal $ease-out;
  
  &:active {
    background: #f9fafb;
  }
  
  &:last-child {
    border-bottom: none;
  }
}

.avatar-section {
  position: relative;
  flex-shrink: 0;
}

.unread-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 24rpx;
  height: 24rpx;
  background: $error;
  border-radius: 50%;
  border: 4rpx solid $yu-white;
}

.type-badge {
  position: absolute;
  bottom: -4rpx;
  right: -4rpx;
  background: $yu-white;
  border-radius: 50%;
  padding: 2rpx;
  border: 2rpx solid #f0f0f0;
}

.type-icon {
  width: 40rpx;
  height: 40rpx;
  @include flex-center;
  border-radius: 50%;
  
  &.invite {
    background: rgba($yu-black, 1);
  }
  
  &.appreciate {
    background: rgba($error, 0.1);
  }
  
  &.follow {
    background: rgba(#3b82f6, 0.1);
  }
}

.content-section {
  flex: 1;
  min-width: 0;
}

.content-header {
  @include flex-between;
  margin-bottom: $spacing-xs;
}

.sender-name {
  font-size: $font-base;
  font-weight: $font-bold;
  color: $yu-black;
  @include text-ellipsis;
}

.time-text {
  font-size: $font-xs;
  color: $yu-light-gray;
  font-weight: $font-medium;
  white-space: nowrap;
  margin-left: $spacing-sm;
}

.content-text {
  font-size: $font-sm;
  color: #6b7280;
  @include text-ellipsis;
}

.arrow-icon {
  flex-shrink: 0;
}

.footer-tip {
  padding: $spacing-2xl;
  text-align: center;
}

.tip-text {
  font-size: $font-xs;
  color: #d1d5db;
  font-weight: $font-medium;
}
</style>
