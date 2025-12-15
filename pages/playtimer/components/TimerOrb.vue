<template>
  <view 
    class="timer-orb" 
    :class="{ 
      'timer-orb--playing': isPlaying, 
      'timer-orb--locked': isLocked 
    }"
    @click="handleClick"
  >
    <!-- 脉冲环 -->
    <view v-if="isPlaying" class="pulse-ring pulse-ring--1"></view>
    <view v-if="isPlaying" class="pulse-ring pulse-ring--2"></view>
    
    <!-- 锁定遮罩 -->
    <view v-if="isLocked" class="lock-overlay animate-fade-in">
      <YuIcon name="lock" size="xl" color="#fff" />
      <text class="lock-text">Locked</text>
    </view>
    
    <!-- 计时器显示 -->
    <view class="timer-display">
      <view class="time-main">
        <text class="time-hour">{{ timeDisplay.h }}</text>
        <text class="time-separator">:</text>
        <text class="time-minute">{{ timeDisplay.m }}</text>
      </view>
      <text class="time-second">{{ timeDisplay.s }}</text>
      
      <view class="timer-status">
        <YuIcon 
          :name="isPlaying ? 'activity' : 'play'" 
          size="sm" 
        />
        <text class="status-text">
          {{ isPlaying ? 'RECORDING' : (seconds > 0 ? 'RESUME' : 'START') }}
        </text>
      </view>
    </view>
    
    <!-- 光泽效果 -->
    <view class="glossy-effect"></view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'TimerOrb',
  components: {
    YuIcon
  },
  props: {
    isPlaying: {
      type: Boolean,
      default: false
    },
    isLocked: {
      type: Boolean,
      default: false
    },
    seconds: {
      type: Number,
      default: 0
    }
  },
  computed: {
    timeDisplay() {
      const h = Math.floor(this.seconds / 3600).toString().padStart(2, '0')
      const m = Math.floor((this.seconds % 3600) / 60).toString().padStart(2, '0')
      const s = (this.seconds % 60).toString().padStart(2, '0')
      return { h, m, s }
    }
  },
  methods: {
    handleClick() {
      if (!this.isLocked) {
        this.$emit('toggle')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.timer-orb {
  position: relative;
  width: 480rpx;
  height: 480rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  @include flex-center;
  cursor: pointer;
  transition: all $duration-normal $ease-out;
  @include shadow('xl');
  
  // 3D 效果
  box-shadow: 
    0 20rpx 60rpx rgba(0, 0, 0, 0.4),
    inset 0 2rpx 4rpx rgba(255, 255, 255, 0.1),
    inset 0 -2rpx 4rpx rgba(0, 0, 0, 0.3);
  
  &--playing {
    background: linear-gradient(135deg, #2d4a2d 0%, #1a2a1a 100%);
    box-shadow: 
      0 20rpx 60rpx rgba($yu-brand, 0.3),
      inset 0 2rpx 4rpx rgba($yu-brand, 0.2),
      inset 0 -2rpx 4rpx rgba(0, 0, 0, 0.3);
    
    .timer-display {
      color: $yu-brand;
    }
  }
  
  &--locked {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:active:not(&--locked) {
    transform: scale(0.98);
  }
}

.pulse-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4rpx solid rgba($yu-brand, 0.3);
  animation: pulse-ring 2s infinite;
  
  &--1 {
    animation-delay: 0s;
  }
  
  &--2 {
    animation-delay: 1s;
  }
}

.lock-overlay {
  position: absolute;
  inset: 0;
  @include flex-center;
  flex-direction: column;
  gap: $spacing-md;
  background: rgba($yu-black, 0.8);
  border-radius: 50%;
  z-index: 10;
  
  .lock-text {
    font-size: $font-sm;
    font-weight: $font-bold;
    color: $yu-white;
    text-transform: uppercase;
    letter-spacing: 2rpx;
  }
}

.timer-display {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-md;
  color: $yu-white;
  z-index: 5;
}

.time-main {
  @include flex-center-y;
  gap: $spacing-sm;
  
  .time-hour,
  .time-minute {
    font-size: 120rpx;
    font-weight: $font-black;
    line-height: 1;
    font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  }
  
  .time-separator {
    font-size: 120rpx;
    font-weight: $font-black;
    opacity: 0.5;
    animation: blink 1s infinite;
  }
}

.time-second {
  font-size: $font-2xl;
  font-weight: $font-bold;
  opacity: 0.7;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
}

.timer-status {
  @include flex-center-y;
  gap: $spacing-xs;
  margin-top: $spacing-lg;
  
  .status-text {
    font-size: $font-xs;
    font-weight: $font-bold;
    letter-spacing: 2rpx;
    text-transform: uppercase;
    opacity: 0.8;
  }
}

.glossy-effect {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  right: 20rpx;
  height: 120rpx;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  border-radius: 50% 50% 100% 100% / 50% 50% 0% 0%;
  pointer-events: none;
}

@keyframes pulse-ring {
  0% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

@keyframes blink {
  0%, 50% { opacity: 0.5; }
  51%, 100% { opacity: 0.2; }
}
</style>
