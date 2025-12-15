<template>
  <view class="test-icons">
    <view class="header">
      <text class="title">图标测试页面</text>
      <view class="nav-btn" @click="goToIconPreview">
        <YuIcon name="Search" :size="20" color="#fff" />
        <text>查看所有图标</text>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">常用图标示例</text>
      <view class="icon-row">
        <view class="icon-demo">
          <YuIcon name="Home" :size="32" color="#1a1a1a" />
          <text>Home</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="User" :size="32" color="#3b82f6" />
          <text>User</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="Settings" :size="32" color="#ef4444" />
          <text>Settings</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="Heart" :size="32" color="#ef4444" />
          <text>Heart</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">运动相关图标</text>
      <view class="icon-row">
        <view class="icon-demo">
          <YuIcon name="Activity" :size="32" color="#10b981" />
          <text>Activity</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="Dumbbell" :size="32" color="#f59e0b" />
          <text>Dumbbell</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="Award" :size="32" color="#ccf381" />
          <text>Award</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="TrendingUp" :size="32" color="#8b5cf6" />
          <text>TrendingUp</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">社交图标</text>
      <view class="icon-row">
        <view class="icon-demo">
          <YuIcon name="Users" :size="32" color="#3b82f6" />
          <text>Users</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="MessageCircle" :size="32" color="#10b981" />
          <text>Message</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="Share2" :size="32" color="#f59e0b" />
          <text>Share</text>
        </view>
        <view class="icon-demo">
          <YuIcon name="QrCode" :size="32" color="#1a1a1a" />
          <text>QrCode</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">不同尺寸示例</text>
      <view class="size-row">
        <view class="size-demo">
          <YuIcon name="Flame" :size="16" color="#ef4444" />
          <text>16px</text>
        </view>
        <view class="size-demo">
          <YuIcon name="Flame" :size="24" color="#ef4444" />
          <text>24px</text>
        </view>
        <view class="size-demo">
          <YuIcon name="Flame" :size="32" color="#ef4444" />
          <text>32px</text>
        </view>
        <view class="size-demo">
          <YuIcon name="Flame" :size="48" color="#ef4444" />
          <text>48px</text>
        </view>
      </view>
    </view>
    
    <view class="usage-example">
      <text class="section-title">使用方法</text>
      <view class="code-block">
        <text class="code-text">&lt;YuIcon name="Home" :size="32" color="#1a1a1a" /&gt;</text>
      </view>
      <view class="code-block">
        <text class="code-text">&lt;YuIcon name="Settings" size="md" color="#3b82f6" /&gt;</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'TestIcons',
  methods: {
    goToIconPreview() {
      uni.navigateTo({
        url: '/pages/icon-preview/icon-preview'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.test-icons {
  padding: 40rpx;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 60rpx;
  
  .title {
    font-size: 48rpx;
    font-weight: bold;
    color: white;
  }
  
  .nav-btn {
    display: flex;
    align-items: center;
    gap: 12rpx;
    background: rgba(255, 255, 255, 0.2);
    padding: 16rpx 24rpx;
    border-radius: 32rpx;
    backdrop-filter: blur(10rpx);
    
    text {
      color: white;
      font-size: 24rpx;
    }
  }
}

.section {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 32rpx;
  }
}

.icon-row {
  display: flex;
  gap: 40rpx;
  flex-wrap: wrap;
}

.icon-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  min-width: 120rpx;
  
  text {
    font-size: 20rpx;
    color: #666;
  }
}

.size-row {
  display: flex;
  align-items: end;
  gap: 40rpx;
}

.size-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  
  text {
    font-size: 20rpx;
    color: #666;
  }
}

.usage-example {
  background: #1a1a1a;
  border-radius: 32rpx;
  padding: 40rpx;
  
  .section-title {
    display: block;
    font-size: 32rpx;
    font-weight: 600;
    color: white;
    margin-bottom: 32rpx;
  }
}

.code-block {
  background: #2d2d2d;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .code-text {
    font-family: 'Courier New', monospace;
    font-size: 24rpx;
    color: #ccf381;
    word-break: break-all;
  }
}
</style>