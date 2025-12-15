<template>
  <view class="tags-section">
    <view class="section-header">
      <YuIcon name="User" :size="28" color="#1a1a1a" />
      <text class="section-title">球风标签</text>
    </view>

    <view class="tags-container">
      <view 
        v-for="(tag, index) in tags" 
        :key="index"
        class="tag-item"
        :class="{ editing: isEditing }"
      >
        <text class="tag-text">#{{ tag }}</text>
        <view 
          v-if="isEditing" 
          class="remove-btn" 
          @click="$emit('remove', index)"
        >
          <YuIcon name="XCircle" :size="20" color="#fff" />
        </view>
      </view>

      <!-- 添加标签按钮 -->
      <view class="add-tag-btn" @click="$emit('add')">
        <YuIcon name="Plus" :size="20" color="#999" />
        <text class="add-tag-text">{{ isEditing ? '添加' : '我要贴标签' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'TagsSection',
  components: {
    YuIcon
  },
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.tags-section {
  margin-bottom: 32rpx;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 24rpx;
  padding: 0 8rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 900;
  font-style: italic;
  color: #1a1a1a;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
}

.tag-item {
  position: relative;
  background: white;
  color: #1a1a1a;
  border: 2rpx solid #e5e7eb;
  border-radius: 16rpx;
  padding: 12rpx 24rpx;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
  }
  
  &:hover {
    border-color: #1a1a1a;
  }
  
  &.editing {
    padding-right: 48rpx;
  }
}

.tag-text {
  font-size: 20rpx;
  font-weight: 700;
}

.remove-btn {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  background: #ef4444;
  border-radius: 50%;
  padding: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 8rpx rgba(239, 68, 68, 0.3);
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.9);
  }
}

.add-tag-btn {
  background: #f5f5f5;
  color: #999;
  border-radius: 16rpx;
  padding: 12rpx 24rpx;
  display: flex;
  align-items: center;
  gap: 8rpx;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
    background: #1a1a1a;
    color: white;
  }
}

.add-tag-text {
  font-size: 20rpx;
  font-weight: 700;
}
</style>