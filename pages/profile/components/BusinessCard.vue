<template>
  <YuCard class="business-card" size="lg">
    <!-- 3D 名片效果 -->
    <view class="card-3d" :class="{ 'card-3d--flipped': isFlipped }" @click="flipCard">
      <!-- 正面 -->
      <view class="card-face card-face--front">
        <view class="card-header">
          <YuAvatar 
            text="张三"
            color="brand"
            size="xl"
            class="profile-avatar"
          />
          <view class="profile-info">
            <text class="profile-name">张三</text>
            <text class="profile-title">羽球爱好者</text>
            <view class="level-info">
              <YuIcon name="trophy" size="sm" color="#f59e0b" />
              <text class="level-text">Lv.8.5 高级选手</text>
            </view>
          </view>
        </view>
        
        <view class="card-stats">
          <view class="stat-item">
            <text class="stat-value">156</text>
            <text class="stat-label">场次</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-value">78%</text>
            <text class="stat-label">胜率</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-value">2.1k</text>
            <text class="stat-label">积分</text>
          </view>
        </view>
        
        <view class="card-footer">
          <text class="motto">"技术与激情并存，每一拍都是艺术"</text>
        </view>
      </view>
      
      <!-- 背面 -->
      <view class="card-face card-face--back">
        <view class="back-content">
          <text class="back-title">技能特长</text>
          
          <view class="skills-grid">
            <view class="skill-item">
              <YuIcon name="activity" size="md" color="#ef4444" />
              <text class="skill-name">杀球</text>
              <view class="skill-level">
                <view class="skill-bar">
                  <view class="skill-progress" style="width: 90%"></view>
                </view>
              </view>
            </view>
            
            <view class="skill-item">
              <YuIcon name="target" size="md" color="#10b981" />
              <text class="skill-name">网前</text>
              <view class="skill-level">
                <view class="skill-bar">
                  <view class="skill-progress" style="width: 85%"></view>
                </view>
              </view>
            </view>
            
            <view class="skill-item">
              <YuIcon name="zap" size="md" color="#f59e0b" />
              <text class="skill-name">步伐</text>
              <view class="skill-level">
                <view class="skill-bar">
                  <view class="skill-progress" style="width: 75%"></view>
                </view>
              </view>
            </view>
          </view>
          
          <text class="back-hint">点击翻转查看正面</text>
        </view>
      </view>
    </view>
  </YuCard>
</template>

<script>
import YuCard from '@/components/YuCard/YuCard.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'BusinessCard',
  components: {
    YuCard,
    YuAvatar,
    YuIcon
  },
  data() {
    return {
      isFlipped: false
    }
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped
      
      // 触觉反馈
      uni.vibrateShort({ type: 'light' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.business-card {
  perspective: 1000rpx;
  height: 400rpx;
}

.card-3d {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s $ease-in-out;
  cursor: pointer;
  
  &--flipped {
    transform: rotateY(180deg);
  }
}

.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: $radius-3xl;
  padding: $spacing-2xl;
  
  &--front {
    background: linear-gradient(135deg, $yu-brand 0%, $yu-brand-dark 100%);
    color: $yu-black;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  &--back {
    background: linear-gradient(135deg, $yu-black 0%, #2d2d2d 100%);
    color: $yu-white;
    transform: rotateY(180deg);
    @include flex-center;
  }
}

.card-header {
  @include flex-center-y;
  gap: $spacing-lg;
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;
}

.profile-name {
  font-size: $font-2xl;
  font-weight: $font-black;
  color: $yu-black;
}

.profile-title {
  font-size: $font-base;
  color: rgba($yu-black, 0.7);
  font-weight: $font-medium;
}

.level-info {
  @include flex-center-y;
  gap: $spacing-xs;
  margin-top: $spacing-xs;
}

.level-text {
  font-size: $font-sm;
  font-weight: $font-bold;
  color: #f59e0b;
}

.card-stats {
  @include flex-center-y;
  justify-content: space-around;
  padding: $spacing-lg 0;
}

.stat-item {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xs;
}

.stat-value {
  font-size: $font-2xl;
  font-weight: $font-black;
  color: $yu-black;
}

.stat-label {
  font-size: $font-sm;
  color: rgba($yu-black, 0.6);
  font-weight: $font-medium;
}

.stat-divider {
  width: 2rpx;
  height: 60rpx;
  background: rgba($yu-black, 0.2);
}

.card-footer {
  text-align: center;
}

.motto {
  font-size: $font-sm;
  font-style: italic;
  color: rgba($yu-black, 0.7);
  line-height: 1.4;
}

.back-content {
  width: 100%;
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xl;
}

.back-title {
  font-size: $font-xl;
  font-weight: $font-bold;
  color: $yu-brand;
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  width: 100%;
}

.skill-item {
  @include flex-center-y;
  gap: $spacing-md;
}

.skill-name {
  font-size: $font-base;
  font-weight: $font-semibold;
  color: $yu-white;
  min-width: 80rpx;
}

.skill-level {
  flex: 1;
}

.skill-bar {
  width: 100%;
  height: 8rpx;
  background: rgba($yu-white, 0.2);
  border-radius: $radius-full;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: $yu-brand;
  border-radius: $radius-full;
  transition: width 0.8s $ease-out;
}

.back-hint {
  font-size: $font-xs;
  color: rgba($yu-white, 0.6);
  text-align: center;
}
</style>
