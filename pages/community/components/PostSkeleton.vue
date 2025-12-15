<template>
  <YuCard class="post-skeleton">
    <!-- 头部骨架 -->
    <template #header>
      <view class="skeleton-header">
        <view class="skeleton-avatar"></view>
        <view class="skeleton-info">
          <view class="skeleton-name"></view>
          <view class="skeleton-meta"></view>
        </view>
        <view class="skeleton-more"></view>
      </view>
    </template>

    <!-- 内容骨架 -->
    <view class="skeleton-content">
      <view class="skeleton-text skeleton-text--1"></view>
      <view class="skeleton-text skeleton-text--2"></view>
      <view class="skeleton-text skeleton-text--3"></view>
      
      <!-- 图片骨架 -->
      <view class="skeleton-images">
        <view class="skeleton-image"></view>
        <view class="skeleton-image"></view>
      </view>
    </view>

    <!-- 底部骨架 -->
    <template #footer>
      <view class="skeleton-actions">
        <view class="skeleton-action"></view>
        <view class="skeleton-action"></view>
        <view class="skeleton-action"></view>
      </view>
    </template>
  </YuCard>
</template>

<script>
import YuCard from '@/components/YuCard/YuCard.vue'

export default {
  name: 'PostSkeleton',
  components: {
    YuCard
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.post-skeleton {
  .skeleton-header {
    @include flex-center-y;
    gap: $spacing-md;
  }
  
  .skeleton-avatar {
    width: 88rpx;
    height: 88rpx;
    @include skeleton;
    border-radius: $radius-xl;
    flex-shrink: 0;
  }
  
  .skeleton-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;
  }
  
  .skeleton-name {
    width: 160rpx;
    height: 32rpx;
    @include skeleton;
    border-radius: $radius-sm;
  }
  
  .skeleton-meta {
    width: 120rpx;
    height: 24rpx;
    @include skeleton;
    border-radius: $radius-sm;
  }
  
  .skeleton-more {
    width: 48rpx;
    height: 48rpx;
    @include skeleton;
    border-radius: 50%;
  }
  
  .skeleton-content {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
  }
  
  .skeleton-text {
    height: 32rpx;
    @include skeleton;
    border-radius: $radius-sm;
    
    &--1 {
      width: 100%;
    }
    
    &--2 {
      width: 85%;
    }
    
    &--3 {
      width: 60%;
    }
  }
  
  .skeleton-images {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-sm;
    margin-top: $spacing-lg;
  }
  
  .skeleton-image {
    height: 240rpx;
    @include skeleton;
    border-radius: $radius-md;
  }
  
  .skeleton-actions {
    display: flex;
    gap: $spacing-xl;
  }
  
  .skeleton-action {
    flex: 1;
    height: 64rpx;
    @include skeleton;
    border-radius: $radius-xl;
  }
}
</style>
