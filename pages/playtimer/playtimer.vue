<template>
  <view class="playtimer">
    <!-- 固定头部 -->
    <view class="fixed-header" :style="{ paddingTop: safeAreaTop + 'px' }">
      <view class="header-content">
        <view class="header-left">
          <text class="title">运动时刻</text>
          <view class="subtitle-row">
            <text class="subtitle">{{ isPlaying ? 'RECORDING SESSION' : 'READY TO START' }}</text>
            <view v-if="isPlaying" class="recording-dot"></view>
          </view>
        </view>
        <view class="lock-btn" :class="{ locked: isLocked }" @click="toggleLock">
          <YuIcon name="power" :size="36" />
        </view>
      </view>
    </view>

    <!-- 环境背景 -->
    <view class="ambient-bg" :class="{ active: isPlaying }"></view>

    <!-- 主内容区域 -->
    <view class="main-content" :style="{ paddingTop: headerHeight + 'px', paddingBottom: tabBarHeight + 'px' }">
      <!-- 主计时器区域 -->
      <view class="timer-section">
        <TimerOrb :is-playing="isPlaying" :is-locked="isLocked" :seconds="seconds" @toggle="toggleTimer" />

        <!-- 实时数据 -->
        <view v-if="isPlaying" class="stats-row animate-fade-in">
          <StatItem icon="flame" label="Est. Calories" :value="Math.floor(calories)" type="calories" />

          <view class="divider"></view>

          <StatItem icon="activity" label="Heart Rate" :value="bpm" type="bpm" :intensity="intensity" :clickable="true"
            @click="toggleIntensity" />
        </view>
      </view>

      <!-- 历史记录预览 -->
      <HistoryPreview :records="MOCK_HISTORY" @view-all="viewMode = 'HISTORY'" @select="selectRecord" />
    </view>

    <!-- 全屏历史记录 -->
    <HistoryModal v-if="viewMode === 'HISTORY'" :records="MOCK_HISTORY" :selected="selectedRecord"
      @close="viewMode = 'TIMER'" @select="selectRecord" />
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import TimerOrb from './components/TimerOrb.vue'
import StatItem from './components/StatItem.vue'
import HistoryPreview from './components/HistoryPreview.vue'
import HistoryModal from './components/HistoryModal.vue'

const MOCK_HISTORY = [
  { id: 1, date: '昨天', dateFull: '2023-10-25', duration: '01:30:00', calories: 420, bpmAvg: 135, bpmMax: 168 },
  { id: 2, date: '10月24日', dateFull: '2023-10-24', duration: '02:15:00', calories: 680, bpmAvg: 142, bpmMax: 175 },
  { id: 3, date: '10月22日', dateFull: '2023-10-22', duration: '00:45:00', calories: 210, bpmAvg: 128, bpmMax: 150 },
  { id: 4, date: '10月20日', dateFull: '2023-10-20', duration: '01:10:00', calories: 380, bpmAvg: 130, bpmMax: 160 },
  { id: 5, date: '10月18日', dateFull: '2023-10-18', duration: '01:50:00', calories: 550, bpmAvg: 138, bpmMax: 172 }
]

export default {
  name: 'PlayTimer',
  components: {
    YuIcon,
    TimerOrb,
    StatItem,
    HistoryPreview,
    HistoryModal
  },
  data() {
    return {
      viewMode: 'TIMER',
      selectedRecord: null,
      isPlaying: false,
      isLocked: false,
      seconds: 0,
      calories: 0,
      bpm: 0,
      intensity: 'MED',
      MOCK_HISTORY,
      timerInterval: null,
      bpmInterval: null,
      safeAreaTop: 0,
      headerHeight: 160,
      tabBarHeight: 160
    }
  },
  computed: {
    time() {
      const h = Math.floor(this.seconds / 3600).toString().padStart(2, '0')
      const m = Math.floor((this.seconds % 3600) / 60).toString().padStart(2, '0')
      const s = (this.seconds % 60).toString().padStart(2, '0')
      return { h, m, s }
    }
  },
  onLoad() {
    this.checkSavedTimer()
    this.initLayout()
  },
  onShow() {
    // 更新 tabBar 状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },
  onHide() {
    this.saveTimerState()
  },
  onUnload() {
    this.cleanup()
  },
  methods: {
    initLayout() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaTop = systemInfo.safeAreaInsets?.top || 0
      this.headerHeight = this.safeAreaTop + 160
      this.tabBarHeight = 160 + (systemInfo.safeAreaInsets?.bottom || 0)
    },
    toggleTimer() {
      if (this.isLocked) return

      // 触觉反馈
      uni.vibrateShort({ type: 'medium' })

      if (this.isPlaying) {
        this.pauseTimer()
      } else {
        this.startTimer()
      }
    },
    startTimer() {
      this.isPlaying = true

      // 开始计时
      this.timerInterval = setInterval(() => {
        this.seconds++
        this.updateCalories()
      }, 1000)

      // 开始心率模拟
      this.startBpmSimulation()
    },
    pauseTimer() {
      this.isPlaying = false
      this.cleanup()
    },
    startBpmSimulation() {
      this.bpmInterval = setInterval(() => {
        // 模拟心率变化
        const baseRate = this.getBaseRate()
        const variation = Math.random() * 10 - 5
        this.bpm = Math.max(60, Math.min(200, Math.round(baseRate + variation)))
      }, 2000)
    },
    getBaseRate() {
      const intensityMap = {
        LOW: 120,
        MED: 140,
        HIGH: 160
      }
      return intensityMap[this.intensity] || 140
    },
    updateCalories() {
      // 简单的卡路里计算
      const rate = this.intensity === 'HIGH' ? 0.2 : this.intensity === 'MED' ? 0.15 : 0.1
      this.calories += rate
    },
    toggleIntensity() {
      const intensities = ['LOW', 'MED', 'HIGH']
      const currentIndex = intensities.indexOf(this.intensity)
      this.intensity = intensities[(currentIndex + 1) % intensities.length]
    },
    toggleLock() {
      this.isLocked = !this.isLocked

      // 触觉反馈
      uni.vibrateShort({ type: this.isLocked ? 'heavy' : 'light' })
    },
    selectRecord(record) {
      this.selectedRecord = record
    },
    checkSavedTimer() {
      try {
        const saved = uni.getStorageSync('timer_state')
        if (saved) {
          this.seconds = saved.seconds || 0
          this.calories = saved.calories || 0
        }
      } catch (error) {
        console.error('读取计时器状态失败:', error)
      }
    },
    saveTimerState() {
      try {
        uni.setStorageSync('timer_state', {
          seconds: this.seconds,
          calories: this.calories,
          timestamp: Date.now()
        })
      } catch (error) {
        console.error('保存计时器状态失败:', error)
      }
    },
    cleanup() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
      if (this.bpmInterval) {
        clearInterval(this.bpmInterval)
        this.bpmInterval = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.playtimer {
  min-height: 100vh;
  background: $yu-black;
  color: $yu-white;
  position: relative;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-sticky;
  @include glass($glass-dark);
  border-bottom: 2rpx solid rgba($yu-white, 0.1);
}

.header-content {
  @include flex-center-y;
  justify-content: space-between;
  padding: $spacing-lg $spacing-xl;
}

.main-content {
  position: relative;
  z-index: 10;
}

.header-left {
  flex: 1;
}

.title {
  font-size: $font-3xl;
  font-weight: $font-black;
  color: $yu-white;
  font-style: italic;
  letter-spacing: -2rpx;
  display: block;
  margin-bottom: $spacing-xs;
}

.subtitle-row {
  @include flex-center-y;
  gap: $spacing-xs;
}

.subtitle {
  font-size: $font-xs;
  color: rgba($yu-white, 0.7);
  font-weight: $font-bold;
  letter-spacing: 2rpx;
  text-transform: uppercase;
}

.recording-dot {
  width: 12rpx;
  height: 12rpx;
  background: $error;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.lock-btn {
  width: 80rpx;
  height: 80rpx;
  @include flex-center;
  border-radius: 50%;
  background: rgba($yu-white, 0.1);
  color: rgba($yu-white, 0.7);
  transition: all $duration-normal $ease-out;
  cursor: pointer;

  &.locked {
    background: $error;
    color: $yu-white;
  }

  &:active {
    transform: scale(0.95);
  }
}

.ambient-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: radial-gradient(circle at center, rgba($yu-brand, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity $duration-slow $ease-in-out;

  &.active {
    opacity: 1;
    animation: breathing 4s $ease-in-out infinite;
  }
}

.timer-section {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-3xl;
  padding: $spacing-3xl 0;
  position: relative;
  z-index: 10;
}

.stats-row {
  @include flex-center-y;
  gap: $spacing-xl;
  width: 100%;
  max-width: 600rpx;
}

.divider {
  width: 2rpx;
  height: 80rpx;
  background: rgba($yu-white, 0.2);
}
</style>