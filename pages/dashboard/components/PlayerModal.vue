<template>
  <view class="modal-overlay" @click="$emit('close')">
    <view class="modal-content animate-slide-up" @click.stop>
      <!-- 拖拽指示器 -->
      <view class="drag-indicator"></view>
      
      <!-- 球友信息头部 -->
      <view class="player-header">
        <view class="avatar-section">
          <YuAvatar 
            :text="player.name[0]" 
            :color="player.avatarColor" 
            size="xlarge"
            class="player-avatar"
          />
          
          <!-- 好友标识 -->
          <view v-if="player.relationship === 'FRIEND'" class="friend-badge">
            <YuIcon name="Handshake" :size="24" color="#ffffff" />
          </view>
          
          <!-- 在线状态 -->
          <view v-if="isFresh" class="online-indicator">
            <view class="ping-circle animate-ping"></view>
            <view class="status-dot"></view>
          </view>
        </view>
        
        <view class="player-info">
          <view class="info-header">
            <text class="player-name">{{ player.name }}</text>
            
            <!-- 欣赏按钮 -->
            <view class="appreciate-section">
              <view 
                class="appreciate-btn"
                :class="{ appreciated: hasAppreciated }"
                @click="handleAppreciate"
              >
                <YuIcon 
                  name="Heart" 
                  :size="36" 
                  :color="hasAppreciated ? '#ccf381' : '#d1d5db'"
                  :class="{ 'animate-bounce': hasAppreciated }"
                />
              </view>
              <text class="appreciate-count">{{ player.appreciations }}</text>
            </view>
            
            <!-- 关闭按钮 -->
            <view class="close-btn" @click="$emit('close')">
              <YuIcon name="ArrowDownCircle" :size="44" color="#d1d5db" />
            </view>
          </view>
          
          <view class="info-details">
            <view class="level-badge" :class="getLevelStyle(player.levelScore)">
              <text class="level-text">Lv.{{ player.levelScore }}</text>
            </view>
            
            <view v-if="player.specificLocation" class="location-info">
              <YuIcon name="MapPin" :size="20" color="#6b7280" />
              <text class="location-text">{{ player.venue }} · {{ player.specificLocation }}</text>
            </view>
            <text v-else class="distance-text">{{ player.distance }}</text>
          </view>
          
          <view class="stats-row">
            <text class="stat-text">{{ player.followersCount }} 粉丝</text>
            <text class="stat-divider">·</text>
            <text class="stat-text">发布于 {{ player.intentTime }}</text>
          </view>
        </view>
      </view>
      
      <!-- 装备信息 -->
      <view v-if="player.gear" class="gear-section">
        <view class="gear-item">
          <view class="gear-icon">
            <YuIcon name="Sword" :size="28" color="#9ca3af" />
          </view>
          <view class="gear-info">
            <text class="gear-label">战拍</text>
            <text class="gear-value">{{ player.gear.racket }}</text>
          </view>
        </view>
        
        <view class="gear-item">
          <view class="gear-icon">
            <YuIcon name="TrendingUp" :size="28" color="#9ca3af" />
          </view>
          <view class="gear-info">
            <text class="gear-label">磅数</text>
            <text class="gear-value">{{ player.gear.tension }} Lbs</text>
          </view>
        </view>
        
        <view class="gear-item">
          <view class="gear-icon">
            <YuIcon name="Feather" :size="28" color="#9ca3af" />
          </view>
          <view class="gear-info">
            <text class="gear-label">用球</text>
            <text class="gear-value">{{ player.gear.shuttlecock }}</text>
          </view>
        </view>
      </view>
      
      <!-- 当前意图 -->
      <view class="intent-section" :class="intentConfig.bg">
        <view class="intent-content">
          <view class="intent-icon">
            <YuIcon :name="intentConfig.icon" :size="32" :color="intentConfig.color" />
          </view>
          <view class="intent-info">
            <text class="intent-label">当前意图</text>
            <text class="intent-value">{{ intentConfig.label }}</text>
          </view>
        </view>
      </view>
      
      <!-- 个人简介 -->
      <scroll-view scroll-y class="bio-section" enhanced :show-scrollbar="false">
        <text class="bio-text">"{{ player.bio }}"</text>
        <view class="tags-section">
          <view 
            v-for="tag in player.tags" 
            :key="tag" 
            class="tag-item"
          >
            <text class="tag-text">#{{ tag }}</text>
          </view>
        </view>
      </scroll-view>
      
      <!-- 操作按钮 -->
      <view class="action-section">
        <!-- 好友状态 -->
        <template v-if="player.relationship === 'FRIEND'">
          <YuButton 
            type="primary" 
            size="large" 
            icon="MessageCircle"
            @click="showContactModal = true"
            class="action-btn-main"
          >
            查看微信 / 联系方式
          </YuButton>
          <YuButton 
            type="secondary" 
            size="large" 
            icon="UserCheck"
            @click="$emit('follow', player)"
            class="action-btn-side"
          />
        </template>
        
        <!-- 非好友状态 -->
        <template v-else-if="!showInviteModal && !inviteSent">
          <YuButton 
            type="primary" 
            size="large" 
            icon="Send"
            @click="showInviteModal = true"
            class="action-btn-main"
          >
            发起约球
          </YuButton>
          <YuButton 
            :type="player.isFollowing ? 'secondary' : 'default'" 
            size="large" 
            :icon="player.isFollowing ? 'UserCheck' : 'UserPlus'"
            @click="$emit('follow', player)"
            class="action-btn-side"
          />
        </template>
        
        <!-- 邀请选择 -->
        <view v-if="showInviteModal" class="invite-section animate-fade-in">
          <view class="invite-header">
            <text class="invite-title">选择招呼信号</text>
            <view class="invite-close" @click="showInviteModal = false">
              <YuIcon name="XCircle" :size="32" color="#9ca3af" />
            </view>
          </view>
          <view class="invite-grid">
            <view 
              v-for="signal in inviteSignals" 
              :key="signal.id"
              class="invite-item"
              @click="handleSendInvite(signal.text)"
            >
              <YuIcon :name="signal.icon" :size="36" color="#9ca3af" />
              <text class="invite-text">{{ signal.text }}</text>
            </view>
          </view>
        </view>
        
        <!-- 邀请已发送 -->
        <view v-if="inviteSent" class="invite-sent animate-scale-in">
          <view class="sent-icon">
            <YuIcon name="Check" :size="32" color="#10b981" />
          </view>
          <text class="sent-title">邀请已发送</text>
          <text class="sent-desc">对方回应后，您将收到消息中心通知</text>
        </view>
      </view>
      
      <!-- 联系方式弹窗 -->
      <ContactModal 
        v-if="showContactModal"
        :player="player"
        @close="showContactModal = false"
      />
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuButton from '@/components/YuButton/YuButton.vue'
import ContactModal from './ContactModal.vue'
import { getIntentConfig } from '@/utils/constants.js'

export default {
  name: 'PlayerModal',
  components: {
    YuIcon,
    YuAvatar,
    YuButton,
    ContactModal
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'invite', 'follow', 'appreciate'],
  data() {
    return {
      hasAppreciated: false,
      showInviteModal: false,
      inviteSent: false,
      showContactModal: false,
      inviteSignals: [
        { id: 1, text: '三缺一，来救场！', icon: 'HelpCircle' },
        { id: 2, text: '想打单打，出汗局', icon: 'Sword' },
        { id: 3, text: '新手求带，请喝水', icon: 'Coffee' },
        { id: 4, text: '就在附近，速来', icon: 'Zap' }
      ]
    }
  },
  computed: {
    intentConfig() {
      return getIntentConfig(this.player.intent)
    },
    isFresh() {
      return (this.player.intentTimestamp || 0) > Date.now() - 20 * 60 * 1000
    }
  },
  created() {
    this.checkAppreciateStatus()
  },
  methods: {
    checkAppreciateStatus() {
      const storageKey = `yu_appreciate_${this.player.id}`
      const lastAppreciate = uni.getStorageSync(storageKey)
      const now = Date.now()
      
      if (lastAppreciate && now - lastAppreciate < 24 * 60 * 60 * 1000) {
        this.hasAppreciated = true
      }
    },
    
    handleAppreciate() {
      if (this.hasAppreciated) {
        uni.showToast({
          title: '您今天已经欣赏过 TA 了',
          icon: 'none'
        })
        return
      }
      
      this.$emit('appreciate', this.player)
      this.hasAppreciated = true
    },
    
    handleSendInvite(signal) {
      this.$emit('invite', this.player, signal)
      this.showInviteModal = false
      this.inviteSent = true
    },
    
    getLevelStyle(score) {
      if (score >= 8) return 'level-master'
      if (score >= 5) return 'level-intermediate'
      return 'level-beginner'
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
  background: rgba(0, 0, 0, 0.4);
  @include glass(rgba(0, 0, 0, 0.1));
  @include flex-center;
  align-items: flex-end;
  z-index: $z-modal;
  perspective: 1000px;
}

.modal-content {
  width: 100%;
  max-width: 750rpx;
  background: $yu-white;
  border-radius: $radius-3xl $radius-3xl 0 0;
  padding: $spacing-xl;
  padding-bottom: $spacing-2xl;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
  @include shadow('xl');
}

.drag-indicator {
  width: 80rpx;
  height: 8rpx;
  background: #e5e7eb;
  border-radius: $radius-full;
  margin: 0 auto $spacing-lg;
  flex-shrink: 0;
}

.player-header {
  @include flex-center-y;
  gap: $spacing-lg;
  margin-bottom: $spacing-lg;
  flex-shrink: 0;
}

.avatar-section {
  position: relative;
  flex-shrink: 0;
}

.friend-badge {
  position: absolute;
  bottom: -4rpx;
  right: -4rpx;
  width: 48rpx;
  height: 48rpx;
  @include flex-center;
  background: #14b8a6;
  border-radius: 50%;
  border: 4rpx solid $yu-white;
}

.online-indicator {
  position: absolute;
  bottom: -4rpx;
  right: -4rpx;
  width: 32rpx;
  height: 32rpx;
}

.ping-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: $success;
  opacity: 0.75;
}

.status-dot {
  position: relative;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: $success;
  border: 4rpx solid $yu-white;
}

.player-info {
  flex: 1;
  min-width: 0;
}

.info-header {
  @include flex-between;
  margin-bottom: $spacing-sm;
}

.player-name {
  font-size: $font-xl;
  font-weight: $font-black;
  color: $yu-black;
  @include text-ellipsis;
}

.appreciate-section {
  @include flex-center;
  flex-direction: column;
  gap: 2rpx;
}

.appreciate-btn {
  @include flex-center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.9);
  }
  
  &.appreciated {
    background: rgba($yu-brand, 0.2);
  }
}

.appreciate-count {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.close-btn {
  @include flex-center;
  width: 64rpx;
  height: 64rpx;
  
  &:active {
    transform: scale(0.9);
  }
}

.info-details {
  @include flex-center-y;
  gap: $spacing-sm;
  margin-bottom: $spacing-xs;
}

.level-badge {
  padding: 2rpx $spacing-sm;
  border-radius: $radius-sm;
  font-size: $font-xs;
  font-weight: $font-black;
  font-style: italic;
  
  &.level-master {
    background: linear-gradient(135deg, #1f2937, #000000);
    color: $yu-brand;
    border: 2rpx solid rgba($yu-brand, 0.3);
  }
  
  &.level-intermediate {
    background: $yu-brand;
    color: $yu-black;
    border: 2rpx solid rgba($yu-black, 0.1);
  }
  
  &.level-beginner {
    background: #f3f4f6;
    color: $yu-light-gray;
  }
}

.level-text {
  font-size: $font-xs;
  font-weight: $font-black;
}

.location-info {
  @include flex-center-y;
  gap: $spacing-xs;
  background: #f3f4f6;
  padding: $spacing-xs $spacing-sm;
  border-radius: $radius-sm;
}

.location-text {
  font-size: $font-sm;
  font-weight: $font-bold;
  color: $yu-black;
}

.distance-text {
  font-size: $font-sm;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.stats-row {
  @include flex-center-y;
  gap: $spacing-sm;
}

.stat-text {
  font-size: $font-xs;
  color: $yu-light-gray;
  font-weight: $font-bold;
}

.stat-divider {
  color: #d1d5db;
}

.gear-section {
  @include flex-center-y;
  gap: $spacing-sm;
  margin-bottom: $spacing-lg;
  overflow-x: auto;
  flex-shrink: 0;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.gear-item {
  @include flex-center-y;
  gap: $spacing-md;
  background: #f9fafb;
  border: 2rpx solid #f0f0f0;
  border-radius: $radius-xl;
  padding: $spacing-md;
  min-width: 240rpx;
}

.gear-icon {
  width: 64rpx;
  height: 64rpx;
  @include flex-center;
  background: $yu-white;
  border-radius: 50%;
  @include shadow('sm');
}

.gear-info {
  flex: 1;
}

.gear-label {
  font-size: $font-xs;
  color: $yu-light-gray;
  font-weight: $font-bold;
  text-transform: uppercase;
  display: block;
  margin-bottom: 2rpx;
}

.gear-value {
  font-size: $font-sm;
  font-weight: $font-bold;
  color: $yu-black;
  display: block;
}

.intent-section {
  padding: $spacing-md;
  border-radius: $radius-xl;
  margin-bottom: $spacing-lg;
  border: 2rpx solid transparent;
  flex-shrink: 0;
}

.intent-content {
  @include flex-center-y;
  gap: $spacing-md;
}

.intent-icon {
  width: 64rpx;
  height: 64rpx;
  @include flex-center;
  background: $yu-white;
  border-radius: 50%;
  @include shadow('sm');
}

.intent-info {
  flex: 1;
}

.intent-label {
  font-size: $font-sm;
  color: $yu-light-gray;
  font-weight: $font-bold;
  display: block;
  margin-bottom: 2rpx;
}

.intent-value {
  font-size: $font-base;
  font-weight: $font-black;
  color: $yu-black;
  display: block;
}

.bio-section {
  flex: 1;
  overflow: hidden;
  margin-bottom: $spacing-lg;
}

.bio-text {
  font-size: $font-base;
  color: #6b7280;
  line-height: 1.6;
  font-weight: $font-medium;
  display: block;
  margin-bottom: $spacing-md;
}

.tags-section {
  @include flex-center-y;
  gap: $spacing-sm;
  flex-wrap: wrap;
}

.tag-item {
  padding: $spacing-sm $spacing-md;
  background: $yu-white;
  border: 2rpx solid #e5e7eb;
  border-radius: $radius-md;
}

.tag-text {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.action-section {
  flex-shrink: 0;
}

.action-btn-main {
  flex: 1;
  margin-right: $spacing-md;
}

.action-btn-side {
  width: 112rpx;
}

.invite-section {
  background: #f9fafb;
  border: 2rpx solid #e5e7eb;
  border-radius: $radius-xl;
  padding: $spacing-md;
}

.invite-header {
  @include flex-between;
  margin-bottom: $spacing-sm;
}

.invite-title {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-light-gray;
  text-transform: uppercase;
}

.invite-close {
  @include flex-center;
  width: 48rpx;
  height: 48rpx;
  
  &:active {
    transform: scale(0.9);
  }
}

.invite-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-sm;
}

.invite-item {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xs;
  background: $yu-white;
  border: 2rpx solid #e5e7eb;
  border-radius: $radius-lg;
  padding: $spacing-md;
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.95);
    border-color: $yu-black;
  }
}

.invite-text {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-black;
  text-align: center;
}

.invite-sent {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-sm;
  background: rgba($success, 0.1);
  border: 2rpx solid rgba($success, 0.2);
  border-radius: $radius-xl;
  padding: $spacing-md;
}

.sent-icon {
  width: 64rpx;
  height: 64rpx;
  @include flex-center;
  background: rgba($success, 0.2);
  border-radius: 50%;
}

.sent-title {
  font-size: $font-base;
  font-weight: $font-bold;
  color: $success;
}

.sent-desc {
  font-size: $font-xs;
  color: $yu-light-gray;
  text-align: center;
}
</style>
