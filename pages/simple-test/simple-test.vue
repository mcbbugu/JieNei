<template>
  <view class="simple-test">
    <view class="header">
      <text class="title">简单图标测试</text>
    </view>
    
    <view class="test-section">
      <text class="section-title">基础图标测试</text>
      
      <!-- 测试基本图标 -->
      <view class="icon-row">
        <view class="icon-item">
          <YuIcon name="Home" :size="32" color="#1a1a1a" />
          <text>Home</text>
        </view>
        
        <view class="icon-item">
          <YuIcon name="User" :size="32" color="#3b82f6" />
          <text>User</text>
        </view>
        
        <view class="icon-item">
          <YuIcon name="Settings" :size="32" color="#ef4444" />
          <text>Settings</text>
        </view>
      </view>
      
      <!-- 测试不存在的图标 -->
      <view class="icon-row">
        <view class="icon-item">
          <YuIcon name="NonExistent" :size="32" color="#999" />
          <text>不存在的图标</text>
        </view>
      </view>
    </view>
    
    <view class="test-section">
      <text class="section-title">尺寸测试</text>
      
      <view class="size-row">
        <view class="icon-item">
          <YuIcon name="Heart" :size="16" color="#ef4444" />
          <text>16px</text>
        </view>
        
        <view class="icon-item">
          <YuIcon name="Heart" :size="24" color="#ef4444" />
          <text>24px</text>
        </view>
        
        <view class="icon-item">
          <YuIcon name="Heart" :size="32" color="#ef4444" />
          <text>32px</text>
        </view>
        
        <view class="icon-item">
          <YuIcon name="Heart" :size="48" color="#ef4444" />
          <text>48px</text>
        </view>
      </view>
    </view>
    
    <view class="test-section">
      <text class="section-title">点击测试</text>
      
      <view class="click-test">
        <YuIcon 
          name="Plus" 
          :size="40" 
          color="#ccf381" 
          :clickable="true"
          @click="handleIconClick"
        />
        <text>点击我！</text>
        <text class="click-count">点击次数: {{ clickCount }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SimpleTest',
  data() {
    return {
      clickCount: 0
    }
  },
  methods: {
    handleIconClick() {
      this.clickCount++
      uni.showToast({
        title: `点击了 ${this.clickCount} 次`,
        icon: 'none',
        duration: 1000
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.simple-test {
  padding: 40rpx;
  background: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: #1a1a1a;
  }
}

.test-section {
  background: white;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 32rpx;
  
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 32rpx;
  }
}

.icon-row,
.size-row {
  display: flex;
  gap: 40rpx;
  flex-wrap: wrap;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  
  text {
    font-size: 24rpx;
    color: #666;
  }
}

.click-test {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  padding: 40rpx;
  border: 2rpx dashed #ccf381;
  border-radius: 16rpx;
  
  text {
    font-size: 28rpx;
    color: #333;
  }
  
  .click-count {
    font-size: 24rpx !important;
    color: #666 !important;
  }
}
</style>