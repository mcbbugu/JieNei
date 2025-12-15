<template>
  <view class="assessment">
    <!-- 固定头部 -->
    <view class="fixed-header" :style="{ paddingTop: safeAreaTop + 'px' }">
      <view class="header-content">
        <view class="back-btn" @click="goBack">
          <YuIcon name="ChevronLeft" size="lg" color="#666" />
        </view>
        <text class="title">等级评测</text>
      </view>
      
      <!-- 进度条 -->
      <view class="progress-bar">
        <view class="progress-fill" :style="{ width: progress + '%' }"></view>
      </view>
    </view>
    
    <!-- 主内容 -->
    <view class="content" :style="{ paddingTop: headerHeight + 'px' }">
      <!-- 问题区域 -->
      <view class="question-section">
        <text class="question-num">问题 {{ currentQIndex + 1 }}/{{ QUESTIONS.length }}</text>
        <text class="question-text">{{ currentQuestion.text }}</text>
      </view>
      
      <!-- 选项区域 -->
      <view class="options">
        <view 
          v-for="(option, idx) in currentQuestion.options" 
          :key="idx"
          class="option-item"
          :class="{ 'option-item--selected': selectedOption === idx }"
          @click="selectOption(option.score, idx)"
        >
          <text class="option-text">{{ option.label }}</text>
          <view class="option-circle">
            <view v-if="selectedOption === idx" class="option-check"></view>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 结果弹窗 -->
    <view v-if="showResult" class="result-modal">
      <view class="result-content animate-scale-in">
        <view class="result-icon">
          <YuIcon name="Trophy" :size="80" color="#f59e0b" />
        </view>
        <text class="result-title">评测完成！</text>
        <text class="result-level">{{ resultLevel }}</text>
        <text class="result-score">得分：{{ score }} / {{ maxScore }}</text>
        <text class="result-desc">{{ resultDesc }}</text>
        
        <view class="result-actions">
          <view class="result-btn result-btn--secondary" @click="restart">
            重新评测
          </view>
          <view class="result-btn result-btn--primary" @click="goBack">
            返回
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

const QUESTIONS = [
  {
    id: 1,
    text: '您打羽毛球的频率是？',
    options: [
      { label: '偶尔玩玩 / 刚开始', score: 1 },
      { label: '每周 1-2 次', score: 2 },
      { label: '每周 3 次以上', score: 3 }
    ]
  },
  {
    id: 2,
    text: '高远球能从底线打到底线吗？',
    options: [
      { label: '很吃力 / 不太行', score: 1 },
      { label: '偶尔可以', score: 2 },
      { label: '轻松到位，动作标准', score: 3 }
    ]
  },
  {
    id: 3,
    text: '掌握哪些网前技术？',
    options: [
      { label: '基本挑球', score: 1 },
      { label: '搓球 / 勾对角', score: 2 },
      { label: '精通各种假动作', score: 3 }
    ]
  },
  {
    id: 4,
    text: '对于双打轮转的理解？',
    options: [
      { label: '哪里空了补哪里', score: 1 },
      { label: '了解基本的进攻/防守站位', score: 2 },
      { label: '补位意识强，轮转流畅', score: 3 }
    ]
  }
]

export default {
  name: 'Assessment',
  components: {
    YuIcon
  },
  data() {
    return {
      QUESTIONS,
      currentQIndex: 0,
      score: 0,
      selectedOption: null,
      showResult: false,
      safeAreaTop: 0,
      headerHeight: 200
    }
  },
  computed: {
    currentQuestion() {
      return this.QUESTIONS[this.currentQIndex]
    },
    progress() {
      return ((this.currentQIndex) / this.QUESTIONS.length) * 100
    },
    maxScore() {
      return this.QUESTIONS.length * 3
    },
    resultLevel() {
      const percentage = this.score / this.maxScore
      if (percentage >= 0.9) return 'Lv.9 专业级'
      if (percentage >= 0.75) return 'Lv.7 高级'
      if (percentage >= 0.5) return 'Lv.5 中级'
      if (percentage >= 0.25) return 'Lv.3 初级'
      return 'Lv.1 入门'
    },
    resultDesc() {
      const percentage = this.score / this.maxScore
      if (percentage >= 0.9) return '你已经是羽毛球高手了！保持训练，继续提升！'
      if (percentage >= 0.75) return '技术扎实，有很好的基础，继续精进细节！'
      if (percentage >= 0.5) return '有一定的羽毛球基础，多加练习会更好！'
      if (percentage >= 0.25) return '正在成长中，多参加活动提升自己！'
      return '刚开始接触羽毛球，享受运动的乐趣吧！'
    }
  },
  onLoad() {
    this.initLayout()
  },
  methods: {
    initLayout() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaTop = systemInfo.safeAreaInsets?.top || 0
      this.headerHeight = this.safeAreaTop + 140
    },
    selectOption(optionScore, idx) {
      this.selectedOption = idx
      
      // 震动反馈
      uni.vibrateShort({ type: 'light' })
      
      // 延迟进入下一题
      setTimeout(() => {
        this.score += optionScore
        this.selectedOption = null
        
        if (this.currentQIndex < this.QUESTIONS.length - 1) {
          this.currentQIndex++
        } else {
          this.showResult = true
        }
      }, 300)
    },
    restart() {
      this.currentQIndex = 0
      this.score = 0
      this.selectedOption = null
      this.showResult = false
    },
    goBack() {
      uni.navigateBack()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.assessment {
  min-height: 100vh;
  background: $yu-bg;
  position: relative;
}

.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-sticky;
  @include glass($glass-light);
}

.header-content {
  @include flex-center-y;
  padding: $spacing-lg $spacing-xl;
}

.back-btn {
  width: 80rpx;
  height: 80rpx;
  background: $yu-white;
  border-radius: 50%;
  @include flex-center;
  border: 2rpx solid #f0f0f0;
  margin-right: $spacing-lg;
  @include shadow('sm');
  
  &:active {
    transform: scale(0.95);
  }
}

.title {
  font-size: $font-2xl;
  font-weight: $font-black;
  color: $yu-black;
}

.progress-bar {
  width: 100%;
  height: 6rpx;
  background: #e5e5e5;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: $yu-brand;
  transition: width 0.5s $ease-out;
}

.content {
  padding: $spacing-xl;
  min-height: 100vh;
}

.question-section {
  margin-bottom: $spacing-3xl;
}

.question-num {
  font-size: $font-sm;
  color: $yu-light-gray;
  display: block;
  margin-bottom: $spacing-lg;
  font-weight: $font-medium;
}

.question-text {
  font-size: $font-3xl;
  font-weight: $font-black;
  color: $yu-black;
  line-height: 1.4;
  display: block;
}

.options {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.option-item {
  background: $yu-white;
  border-radius: $radius-2xl;
  padding: $spacing-xl;
  @include flex-between;
  border: 4rpx solid transparent;
  transition: all 0.3s $ease-out;
  @include shadow('sm');
  
  &:active {
    transform: scale(0.98);
  }
  
  &--selected {
    border-color: $yu-brand;
    background: rgba($yu-brand, 0.1);
    
    .option-circle {
      border-color: $yu-brand;
      background: $yu-brand;
    }
    
    .option-check {
      display: block;
    }
  }
}

.option-text {
  font-size: $font-base;
  font-weight: $font-semibold;
  color: $yu-gray;
  flex: 1;
  line-height: 1.4;
}

.option-circle {
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  border: 4rpx solid #e5e5e5;
  @include flex-center;
  flex-shrink: 0;
  margin-left: $spacing-md;
  transition: all 0.2s $ease-out;
}

.option-check {
  display: none;
  width: 20rpx;
  height: 20rpx;
  background: $yu-black;
  border-radius: 50%;
}

// 结果弹窗
.result-modal {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: rgba(0, 0, 0, 0.6);
  @include flex-center;
  padding: $spacing-xl;
}

.result-content {
  background: $yu-white;
  border-radius: $radius-3xl;
  padding: $spacing-3xl $spacing-xl;
  width: 100%;
  max-width: 600rpx;
  text-align: center;
  @include shadow('lg');
}

.result-icon {
  margin-bottom: $spacing-xl;
}

.result-title {
  font-size: $font-2xl;
  font-weight: $font-black;
  color: $yu-black;
  display: block;
  margin-bottom: $spacing-md;
}

.result-level {
  font-size: $font-3xl;
  font-weight: $font-black;
  color: $yu-brand-dark;
  display: block;
  margin-bottom: $spacing-md;
}

.result-score {
  font-size: $font-base;
  color: $yu-gray;
  display: block;
  margin-bottom: $spacing-lg;
}

.result-desc {
  font-size: $font-sm;
  color: $yu-light-gray;
  line-height: 1.5;
  display: block;
  margin-bottom: $spacing-2xl;
}

.result-actions {
  display: flex;
  gap: $spacing-md;
}

.result-btn {
  flex: 1;
  padding: $spacing-lg;
  border-radius: $radius-xl;
  font-size: $font-base;
  font-weight: $font-bold;
  text-align: center;
  transition: all 0.2s $ease-out;
  
  &:active {
    transform: scale(0.98);
  }
  
  &--primary {
    background: $yu-black;
    color: $yu-brand;
  }
  
  &--secondary {
    background: #f5f5f5;
    color: $yu-gray;
  }
}

// 动画
.animate-scale-in {
  animation: scale-in 0.3s $ease-out forwards;
}

@keyframes scale-in {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
