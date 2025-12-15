<template>
  <view class="skeleton-card animate-pulse">
    <!-- 头部骨架 -->
    <view class="skeleton-header">
      <view class="skeleton-badge"></view>
      <view class="skeleton-time"></view>
    </view>
    
    <!-- 主体骨架 -->
    <view class="skeleton-body">
      <!-- 头像骨架 -->
      <view class="skeleton-avatar"></view>
      
      <!-- 信息骨架 -->
      <view class="skeleton-info">
        <view class="skeleton-name"></view>
        <view class="skeleton-tags">
          <view class="skeleton-tag"></view>
          <view class="skeleton-tag"></view>
        </view>
        <view class="skeleton-gear">
          <view class="skeleton-gear-item"></view>
          <view class="skeleton-gear-item"></view>
          <view class="skeleton-gear-item"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PlayerSkeleton'
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.skeleton-card {
  @include card($padding: $spacing-xl);
  border-color: transparent;
}

.skeleton-header {
  @include flex-between;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 2rpx solid #f9fafb;
}

.skeleton-badge {
  width: 120rpx;
  height: 32rpx;
  background: #f3f4f6;
  border-radius: $radius-lg;
}

.skeleton-time {
  width: 60rpx;
  height: 24rpx;
  background: #f3f4f6;
  border-radius: $radius-sm;
}

.skeleton-body {
  @include flex-center-y;
  gap: $spacing-lg;
}

.skeleton-avatar {
  width: 112rpx;
  height: 112rpx;
  background: #f3f4f6;
  border-radius: $radius-2xl;
  flex-shrink: 0;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.skeleton-name {
  width: 160rpx;
  height: 32rpx;
  background: #f3f4f6;
  border-radius: $radius-sm;
}

.skeleton-tags {
  @include flex-center-y;
  gap: $spacing-xs;
}

.skeleton-tag {
  width: 60rpx;
  height: 24rpx;
  background: #f3f4f6;
  border-radius: $radius-sm;
}

.skeleton-gear {
  @include flex-center-y;
  gap: $spacing-md;
}

.skeleton-gear-item {
  width: 80rpx;
  height: 20rpx;
  background: #f3f4f6;
  border-radius: $radius-sm;
}
</style>
