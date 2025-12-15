<template>
  <view 
    class="player-card"
    :class="{ 'stale': isStale, 'animate-card': !isStale }"
    @click="$emit('click', player)"
  >
    <!-- 意图标签和时间 -->
    <view class="card-header">
      <view class="intent-section">
        <view class="intent-badge" :class="intentConfig.bg">
          <YuIcon :name="intentConfig.icon" :size="24" :color="intentConfig.color" />
          <text class="intent-text" :class="intentConfig.color">{{ intentConfig.label }}</text>
        </view>
        <text class="time-text" :class="timeColor">{{ player.intentTime }}</text>
      </view>
      
      <view class="location-section">
        <YuIcon name="MapPin" :size="20" color="#9ca3af" />
        <template v-if="player.specificLocation">
          <text class="location-venue">{{ player.venue }}</text>
          <text class="location-divider">·</text>
          <text class="location-specific">{{ player.specificLocation }}</text>
        </template>
        <template v-else>
          <text class="location-distance">{{ player.distance }}</text>
        </template>
      </view>
    </view>

    <!-- 球友信息 -->
    <view class="card-body">
      <!-- 头像区域 -->
      <view class="avatar-section">
        <YuAvatar 
          :text="player.name[0]" 
          :color="player.avatarColor" 
          size="large"
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

      <!-- 信息区域 -->
      <view class="info-section">
        <!-- 姓名和等级 -->
        <view class="name-row">
          <text class="player-name">{{ player.name }}</text>
          <view class="level-badge" :class="getLevelStyle(player.levelScore)">
            <text class="level-text">Lv.{{ player.levelScore }}</text>
          </view>
        </view>

        <!-- 标签 -->
        <view class="tags-row">
          <view 
            v-for="(tag, idx) in player.tags.slice(0, 2)" 
            :key="idx" 
            class="tag-item"
          >
            <text class="tag-text">#{{ tag }}</text>
          </view>
          
          <!-- 关系标签 -->
          <view v-if="player.relationship === 'FRIEND'" class="relation-tag friend">
            <text class="relation-text">好友</text>
          </view>
          <view v-else-if="player.relationship === 'FOLLOWING'" class="relation-tag following">
            <text class="relation-text">已关注</text>
          </view>
        </view>

        <!-- 装备信息 -->
        <view v-if="player.gear" class="gear-row">
          <view class="gear-item">
            <YuIcon name="Sword" :size="20" color="#d1d5db" />
            <text class="gear-text">{{ player.gear.racket }}</text>
          </view>
          <view class="gear-divider"></view>
          <view class="gear-item">
            <text class="gear-text">{{ player.gear.tension }}lbs</text>
          </view>
          <view class="gear-divider"></view>
          <view class="gear-item">
            <text class="gear-text gear-shuttle">{{ player.gear.shuttlecock }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import { getIntentConfig } from '@/utils/constants.js'

export default {
  name: 'PlayerCard',
  components: {
    YuIcon,
    YuAvatar
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  emits: ['click', 'invite', 'follow'],
  computed: {
    intentConfig() {
      return getIntentConfig(this.player.intent)
    },
    isFresh() {
      return (this.player.intentTimestamp || 0) > Date.now() - 20 * 60 * 1000
    },
    isStale() {
      return (this.player.intentTimestamp || 0) < Date.now() - 45 * 60 * 1000
    },
    timeColor() {
      if (this.isFresh) return 'fresh'
      if (this.isStale) return 'stale'
      return 'normal'
    }
  },
  methods: {
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

.player-card {
  @include card($padding: $spacing-xl);
  position: relative;
  transition: all $duration-normal $ease-out;
  cursor: pointer;
  
  &.animate-card {
    &:hover {
      border-color: rgba($yu-brand, 0.3);
      @include shadow('md');
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
  
  &.stale {
    opacity: 0.7;
    filter: grayscale(0.5);
  }
}

.card-header {
  @include flex-between;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 2rpx solid #f9fafb;
}

.intent-section {
  @include flex-center-y;
  gap: $spacing-sm;
}

.intent-badge {
  @include flex-center-y;
  gap: $spacing-xs;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-lg;
  font-weight: $font-black;
  letter-spacing: 1rpx;
}

.intent-text {
  font-size: $font-sm;
  font-weight: $font-black;
}

.time-text {
  font-size: $font-xs;
  font-weight: $font-bold;
  
  &.fresh {
    color: $success;
  }
  
  &.normal {
    color: $yu-light-gray;
  }
  
  &.stale {
    color: #d1d5db;
  }
}

.location-section {
  @include flex-center-y;
  gap: $spacing-xs;
  font-size: $font-sm;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.location-venue {
  color: $yu-light-gray;
  max-width: 160rpx;
  @include text-ellipsis;
}

.location-divider {
  color: #d1d5db;
}

.location-specific {
  color: $yu-black;
}

.location-distance {
  color: $yu-light-gray;
}

.card-body {
  @include flex-center-y;
  gap: $spacing-lg;
}

.avatar-section {
  position: relative;
  flex-shrink: 0;
}

.friend-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 48rpx;
  height: 48rpx;
  @include flex-center;
  background: #14b8a6;
  border-radius: 50%;
  border: 4rpx solid $yu-white;
  @include shadow('md');
  z-index: 10;
}

.online-indicator {
  position: absolute;
  bottom: 4rpx;
  right: 4rpx;
  width: 28rpx;
  height: 28rpx;
  z-index: 10;
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
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: $success;
  border: 4rpx solid $yu-white;
}

.info-section {
  flex: 1;
  min-width: 0;
}

.name-row {
  @include flex-center-y;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
}

.player-name {
  font-size: $font-base;
  font-weight: $font-bold;
  color: $yu-black;
  max-width: 240rpx;
  @include text-ellipsis;
}

.level-badge {
  padding: 2rpx $spacing-sm;
  border-radius: $radius-sm;
  font-size: $font-xs;
  font-weight: $font-black;
  font-style: italic;
  transform: skewX(-12deg);
  
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

.tags-row {
  @include flex-center-y;
  gap: $spacing-xs;
  margin-bottom: $spacing-md;
  flex-wrap: wrap;
}

.tag-item {
  padding: 2rpx $spacing-xs;
  background: #f3f4f6;
  border-radius: $radius-sm;
}

.tag-text {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.relation-tag {
  padding: 2rpx $spacing-xs;
  border-radius: $radius-sm;
  
  &.friend {
    background: rgba(#14b8a6, 0.1);
    
    .relation-text {
      color: #14b8a6;
    }
  }
  
  &.following {
    background: rgba($yu-light-gray, 0.1);
    
    .relation-text {
      color: $yu-light-gray;
    }
  }
}

.relation-text {
  font-size: $font-xs;
  font-weight: $font-bold;
}

.gear-row {
  @include flex-center-y;
  gap: $spacing-md;
  opacity: 0.8;
  max-width: 100%;
}

.gear-item {
  @include flex-center-y;
  gap: $spacing-xs;
  flex-shrink: 0;
}

.gear-text {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-light-gray;
  
  &.gear-shuttle {
    max-width: 120rpx;
    @include text-ellipsis;
  }
}

.gear-divider {
  width: 2rpx;
  height: 2rpx;
  border-radius: 50%;
  background: #d1d5db;
  flex-shrink: 0;
}
</style>
