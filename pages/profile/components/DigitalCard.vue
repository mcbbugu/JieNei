<template>
  <YuCard class="digital-card">
    <template #header>
      <view class="card-header">
        <YuIcon name="qr" size="lg" color="#ccf381" />
        <text class="card-title">数字名片</text>
      </view>
    </template>

    <view class="card-actions">
      <YuButton
        type="primary"
        icon="qr"
        @click="$emit('qr')"
        class="action-btn"
      >
        生成二维码
      </YuButton>
      
      <YuButton
        type="secondary"
        icon="share"
        @click="$emit('share')"
        class="action-btn"
      >
        分享名片
      </YuButton>
    </view>

    <view class="assessment-entry" @click="$emit('assessment')">
      <view class="assessment-info">
        <YuIcon name="trophy" size="lg" color="#f59e0b" />
        <view class="assessment-text">
          <text class="assessment-title">等级评测</text>
          <text class="assessment-desc">测试你的羽球水平</text>
        </view>
      </view>
      <YuIcon name="chevron-right" size="md" color="#999" />
    </view>
  </YuCard>
</template>

<script>
import YuCard from '@/components/YuCard/YuCard.vue'
import YuButton from '@/components/YuButton/YuButton.vue'
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'DigitalCard',
  components: {
    YuCard,
    YuButton,
    YuIcon
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.digital-card {
  .card-header {
    @include flex-center-y;
    gap: $spacing-md;
  }
  
  .card-title {
    font-size: $font-xl;
    font-weight: $font-bold;
    color: $yu-black;
  }
}

.card-actions {
  display: flex;
  gap: $spacing-md;
  margin-bottom: $spacing-xl;
  
  .action-btn {
    flex: 1;
  }
}

.assessment-entry {
  @include flex-center-y;
  justify-content: space-between;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
  border-radius: $radius-2xl;
  cursor: pointer;
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.98);
    background: linear-gradient(135deg, #fed7aa 0%, #fde68a 100%);
  }
}

.assessment-info {
  @include flex-center-y;
  gap: $spacing-md;
  flex: 1;
}

.assessment-text {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.assessment-title {
  font-size: $font-lg;
  font-weight: $font-bold;
  color: #92400e;
}

.assessment-desc {
  font-size: $font-sm;
  color: #a16207;
}
</style>
