<template>
  <view 
    class="stat-item" 
    :class="{ 'stat-item--clickable': clickable }"
    @click="handleClick"
  >
    <view class="stat-icon" :class="iconClass">
      <YuIcon :name="icon" size="sm" />
    </view>
    
    <view class="stat-content">
      <text class="stat-label">{{ label }}</text>
      <view v-if="type === 'bpm' && intensity" class="intensity-info">
        <text class="intensity-label">{{ intensityConfig.label }}</text>
        <YuIcon v-if="clickable" name="chevron-right" size="xs" />
      </view>
    </view>
    
    <view class="stat-value-container">
      <text class="stat-value">{{ value }}</text>
      <view 
        v-if="type === 'bpm'" 
        class="pulse-dot animate-pulse" 
        :style="{ backgroundColor: intensityConfig.color }"
      ></view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'StatItem',
  components: {
    YuIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'default'
    },
    intensity: {
      type: String,
      default: ''
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconClass() {
      return {
        'stat-icon--flame': this.type === 'calories',
        'stat-icon--activity': this.type === 'bpm'
      }
    },
    intensityConfig() {
      const configs = {
        LOW: { label: 'Low', color: '#10b981' },
        MED: { label: 'Medium', color: '#f59e0b' },
        HIGH: { label: 'High', color: '#ef4444' }
      }
      return configs[this.intensity] || configs.MED
    }
  },
  methods: {
    handleClick() {
      if (this.clickable) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.stat-item {
  @include flex-center-y;
  gap: $spacing-lg;
  flex: 1;
  transition: all $duration-normal $ease-out;
  
  &--clickable {
    cursor: pointer;
    
    &:active {
      transform: scale(0.98);
    }
  }
}

.stat-icon {
  width: 80rpx;
  height: 80rpx;
  @include flex-center;
  border-radius: 50%;
  color: $yu-white;
  
  &--flame {
    background: linear-gradient(135deg, #f59e0b, #d97706);
  }
  
  &--activity {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }
}

.stat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.stat-label {
  font-size: $font-sm;
  color: rgba($yu-white, 0.8);
  font-weight: $font-medium;
}

.intensity-info {
  @include flex-center-y;
  gap: $spacing-xs;
  
  .intensity-label {
    font-size: $font-xs;
    color: rgba($yu-white, 0.6);
    text-transform: uppercase;
    font-weight: $font-bold;
    letter-spacing: 1rpx;
  }
}

.stat-value-container {
  @include flex-center-y;
  gap: $spacing-sm;
}

.stat-value {
  font-size: $font-2xl;
  font-weight: $font-black;
  color: $yu-white;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
}

.pulse-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  animation: pulse 1s infinite;
}
</style>
