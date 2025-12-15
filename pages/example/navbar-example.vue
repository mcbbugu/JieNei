<template>
  <view class="page">
    <!-- 示例1: 带返回按钮的普通导航栏 -->
    <YuNavBar 
      title="普通页面" 
      :show-back="true"
      @safe-area-info="handleSafeAreaInfo"
    />
    
    <!-- 示例2: 透明导航栏 -->
    <!-- 
    <YuNavBar 
      :transparent="true"
      :show-back="true"
      title-color="#ffffff"
      back-icon-color="#ffffff"
    >
      <template #right>
        <view class="custom-btn">
          <YuIcon name="Settings" :size="40" color="#ffffff" />
        </view>
      </template>
    </YuNavBar>
    -->
    
    <!-- 示例3: 自定义内容导航栏 -->
    <!--
    <YuNavBar>
      <template #left>
        <view class="custom-left">
          <text class="custom-title">自定义标题</text>
        </view>
      </template>
      
      <template #right>
        <view class="custom-actions">
          <YuIcon name="Search" :size="40" />
          <YuIcon name="More" :size="40" />
        </view>
      </template>
    </YuNavBar>
    -->
    
    <view class="content" :style="{ paddingTop: navBarHeight + 'rpx' }">
      <view class="section">
        <text class="section-title">NavBar 组件使用示例</text>
        <text class="section-desc">这个页面展示了如何使用 YuNavBar 组件</text>
      </view>
      
      <view class="section">
        <text class="section-title">安全区域信息</text>
        <text class="info-text">导航栏高度: {{ navBarHeight }}rpx</text>
        <text class="info-text">状态栏高度: {{ safeAreaInfo.safeAreaTop }}px</text>
        <text class="info-text">胶囊宽度: {{ safeAreaInfo.capsuleInfo?.width || 0 }}px</text>
      </view>
    </view>
  </view>
</template>

<script>
import YuNavBar from '@/components/YuNavBar/YuNavBar.vue'
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'NavBarExample',
  components: {
    YuNavBar,
    YuIcon
  },
  data() {
    return {
      navBarHeight: 160,
      safeAreaInfo: {}
    }
  },
  methods: {
    handleSafeAreaInfo(info) {
      this.navBarHeight = info.headerHeight
      this.safeAreaInfo = info
      console.log('接收到安全区域信息:', info)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $yu-bg;
}

.content {
  padding: $spacing-xl;
}

.section {
  background: $yu-white;
  border-radius: $radius-xl;
  padding: $spacing-xl;
  margin-bottom: $spacing-lg;
  @include shadow('sm');
}

.section-title {
  font-size: $font-lg;
  font-weight: $font-bold;
  color: $yu-black;
  display: block;
  margin-bottom: $spacing-sm;
}

.section-desc {
  font-size: $font-base;
  color: $yu-light-gray;
  line-height: 1.5;
  display: block;
}

.info-text {
  font-size: $font-sm;
  color: $yu-light-gray;
  display: block;
  margin-bottom: $spacing-xs;
  font-family: monospace;
}

.custom-btn {
  width: 64rpx;
  height: 64rpx;
  @include flex-center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  
  &:active {
    transform: scale(0.9);
  }
}

.custom-left {
  flex: 1;
}

.custom-title {
  font-size: $font-xl;
  font-weight: $font-black;
  color: $yu-brand;
}

.custom-actions {
  @include flex-center-y;
  gap: $spacing-md;
}
</style>
