<template>
  <YuCard class="history-preview">
    <!-- 拖拽手柄 -->
    <view class="preview-handle"></view>
    
    <template #header>
      <view class="preview-header">
        <text class="preview-title">本周记录</text>
        <YuButton 
          type="text" 
          size="sm" 
          suffix-icon="chevron-right"
          @click="$emit('view-all')"
        >
          查看全部
        </YuButton>
      </view>
    </template>

    <view class="history-list">
      <view 
        v-for="record in records.slice(0, 3)" 
        :key="record.id"
        class="history-item"
        @click="$emit('select', record)"
      >
        <view class="history-main">
          <view class="history-info">
            <text class="history-date">{{ record.date }}</text>
            <view class="history-meta">
              <text class="meta-text">AVG {{ record.bpmAvg }}</text>
              <view class="meta-dot"></view>
              <text class="meta-text">{{ record.calories }} Kcal</text>
            </view>
          </view>
          <text class="history-duration">{{ record.duration }}</text>
        </view>
        <YuIcon name="chevron-right" size="sm" color="rgba(255,255,255,0.5)" />
      </view>
    </view>
  </YuCard>
</template>

<script>
import YuCard from '@/components/YuCard/YuCard.vue'
import YuButton from '@/components/YuButton/YuButton.vue'
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'HistoryPreview',
  components: {
    YuCard,
    YuButton,
    YuIcon
  },
  props: {
    records: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.history-preview {
  background: rgba($yu-black, 0.8);
  color: $yu-white;
  margin: $spacing-3xl $spacing-xl 0;
  position: relative;
  
  .preview-handle {
    position: absolute;
    top: -$spacing-md;
    left: 50%;
    transform: translateX(-50%);
    width: 80rpx;
    height: 8rpx;
    background: rgba($yu-white, 0.3);
    border-radius: $radius-full;
  }
}

.preview-header {
  @include flex-center-y;
  justify-content: space-between;
}

.preview-title {
  font-size: $font-xl;
  font-weight: $font-bold;
  color: $yu-white;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.history-item {
  @include flex-center-y;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background: rgba($yu-white, 0.05);
  border-radius: $radius-2xl;
  transition: all $duration-normal $ease-out;
  cursor: pointer;
  
  &:active {
    transform: scale(0.98);
    background: rgba($yu-white, 0.1);
  }
}

.history-main {
  @include flex-center-y;
  justify-content: space-between;
  flex: 1;
}

.history-info {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.history-date {
  font-size: $font-lg;
  font-weight: $font-semibold;
  color: $yu-white;
}

.history-meta {
  @include flex-center-y;
  gap: $spacing-sm;
}

.meta-text {
  font-size: $font-sm;
  color: rgba($yu-white, 0.7);
  font-weight: $font-medium;
}

.meta-dot {
  width: 6rpx;
  height: 6rpx;
  background: rgba($yu-white, 0.5);
  border-radius: 50%;
}

.history-duration {
  font-size: $font-2xl;
  font-weight: $font-black;
  color: $yu-brand;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
}
</style>
