<template>
  <view class="history-modal animate-slide-up">
    <view class="modal-header glass-dark">
      <YuButton 
        type="ghost" 
        size="sm" 
        icon="chevron-left"
        @click="$emit('close')"
      >
        返回
      </YuButton>
      <text class="modal-title">运动记录</text>
      <view class="header-spacer"></view>
    </view>
    
    <scroll-view scroll-y class="modal-content">
      <view class="records-list">
        <view 
          v-for="record in records" 
          :key="record.id"
          class="record-item"
          :class="{ 'record-item--selected': selected?.id === record.id }"
          @click="$emit('select', record)"
        >
          <view class="record-header">
            <view class="record-date-info">
              <text class="record-date">{{ record.date }}</text>
              <text class="record-date-full">{{ record.dateFull }}</text>
            </view>
            <text class="record-duration">{{ record.duration }}</text>
          </view>
          
          <view class="record-stats">
            <view class="stat-group">
              <YuIcon name="flame" size="xs" color="#f59e0b" />
              <text class="stat-text">{{ record.calories }} Kcal</text>
            </view>
            <view class="stat-group">
              <YuIcon name="activity" size="xs" color="#ef4444" />
              <text class="stat-text">{{ record.bpmAvg }}/{{ record.bpmMax }} BPM</text>
            </view>
          </view>
          
          <!-- 心率趋势图 -->
          <view class="heart-rate-chart">
            <view class="chart-title">心率趋势</view>
            <view class="chart-bars">
              <view 
                v-for="(bar, index) in generateChartData(record)" 
                :key="index"
                class="chart-bar"
                :style="{ 
                  height: bar.height + '%',
                  backgroundColor: bar.color,
                  animationDelay: (index * 0.1) + 's'
                }"
              ></view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import YuButton from '@/components/YuButton/YuButton.vue'
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'HistoryModal',
  components: {
    YuButton,
    YuIcon
  },
  props: {
    records: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Object,
      default: null
    }
  },
  methods: {
    generateChartData(record) {
      // 生成模拟心率数据
      const points = 20
      const data = []
      const minRate = record.bpmAvg - 20
      const maxRate = record.bpmMax
      
      for (let i = 0; i < points; i++) {
        const progress = i / (points - 1)
        // 模拟运动过程中的心率变化
        let rate
        if (progress < 0.2) {
          // 热身阶段
          rate = minRate + (record.bpmAvg - minRate) * (progress / 0.2)
        } else if (progress < 0.8) {
          // 主要运动阶段
          rate = record.bpmAvg + Math.sin(progress * Math.PI * 3) * 15
        } else {
          // 冷却阶段
          rate = record.bpmAvg - (record.bpmAvg - minRate) * ((progress - 0.8) / 0.2)
        }
        
        const height = ((rate - minRate) / (maxRate - minRate)) * 100
        const color = rate > record.bpmAvg + 10 ? '#ef4444' : 
                     rate > record.bpmAvg - 10 ? '#f59e0b' : '#10b981'
        
        data.push({ height, color })
      }
      
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.history-modal {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: $yu-black;
  display: flex;
  flex-direction: column;
}

.modal-header {
  @include flex-center-y;
  justify-content: space-between;
  padding: $spacing-lg $spacing-xl;
  @include safe-area-top($spacing-lg);
  border-bottom: 2rpx solid rgba($yu-white, 0.1);
}

.modal-title {
  font-size: $font-xl;
  font-weight: $font-bold;
  color: $yu-white;
}

.header-spacer {
  width: 120rpx; // 平衡左侧按钮
}

.modal-content {
  flex: 1;
  padding: $spacing-xl;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}

.record-item {
  background: rgba($yu-white, 0.05);
  border-radius: $radius-2xl;
  padding: $spacing-xl;
  transition: all $duration-normal $ease-out;
  cursor: pointer;
  border: 2rpx solid transparent;
  
  &--selected {
    background: rgba($yu-brand, 0.1);
    border-color: rgba($yu-brand, 0.3);
  }
  
  &:active {
    transform: scale(0.98);
    background: rgba($yu-white, 0.1);
  }
}

.record-header {
  @include flex-center-y;
  justify-content: space-between;
  margin-bottom: $spacing-lg;
}

.record-date-info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.record-date {
  font-size: $font-lg;
  font-weight: $font-bold;
  color: $yu-white;
}

.record-date-full {
  font-size: $font-sm;
  color: rgba($yu-white, 0.6);
}

.record-duration {
  font-size: $font-3xl;
  font-weight: $font-black;
  color: $yu-brand;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
}

.record-stats {
  display: flex;
  gap: $spacing-xl;
  margin-bottom: $spacing-xl;
}

.stat-group {
  @include flex-center-y;
  gap: $spacing-sm;
}

.stat-text {
  font-size: $font-sm;
  color: rgba($yu-white, 0.8);
  font-weight: $font-medium;
}

.heart-rate-chart {
  .chart-title {
    font-size: $font-sm;
    color: rgba($yu-white, 0.7);
    margin-bottom: $spacing-md;
    font-weight: $font-medium;
  }
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 4rpx;
  height: 120rpx;
  padding: $spacing-sm;
  background: rgba($yu-black, 0.3);
  border-radius: $radius-md;
}

.chart-bar {
  flex: 1;
  min-height: 8rpx;
  border-radius: 2rpx;
  animation: chart-bar-grow 0.8s $ease-out forwards;
  transform: scaleY(0);
  transform-origin: bottom;
}
</style>
