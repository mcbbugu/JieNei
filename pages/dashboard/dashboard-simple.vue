<template>
  <view class="dashboard">
    <!-- 固定头部 -->
    <view class="header" :style="{ paddingTop: safeAreaTop + 'px' }">
      <view class="header-content">
        <view class="header-left">
          <text class="title">附近局</text>
          <view class="subtitle-row">
            <text class="subtitle">发现 15 位 1km 内球友</text>
            <view class="status-dot animate-pulse"></view>
          </view>
        </view>
        
        <view class="header-right">
          <view class="message-btn">
            <YuIcon name="MessageCircle" :size="40" />
            <view class="badge animate-scale-in">1</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 主要内容 -->
    <view class="main-content" :style="{ paddingTop: headerHeight + 'px' }">
      <!-- 筛选标签 -->
      <view class="filter-tags">
        <view 
          v-for="(filter, idx) in filterList" 
          :key="idx"
          class="filter-item"
          :class="{ active: activeFilter === filter }"
          @click="setFilter(filter)"
        >
          <text>{{ filter }}</text>
        </view>
      </view>

      <!-- 球友卡片列表 -->
      <view class="player-list">
        <view 
          v-for="player in mockPlayers" 
          :key="player.id"
          class="player-card animate-card"
          @click="selectPlayer(player)"
        >
          <!-- 意图标签 -->
          <view class="card-header">
            <view class="intent-badge">
              <YuIcon name="Sword" :size="24" color="#ea580c" />
              <text class="intent-text">求单打</text>
            </view>
            <text class="time-text">刚刚</text>
          </view>

          <!-- 球友信息 -->
          <view class="card-body">
            <YuAvatar :text="player.name[0]" :color="player.avatarColor" size="large" />
            <view class="player-info">
              <view class="name-row">
                <text class="player-name">{{ player.name }}</text>
                <view class="level-badge">
                  <text class="level-text">Lv.{{ player.level }}</text>
                </view>
              </view>
              <view class="tags-row">
                <view class="tag-item">
                  <text class="tag-text">#混双</text>
                </view>
                <view class="tag-item">
                  <text class="tag-text">#网前</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部导航 -->
    <view class="tabbar" :style="{ paddingBottom: safeAreaBottom + 'px' }">
      <view class="tabbar-content">
        <view 
          v-for="(item, index) in tabList" 
          :key="index"
          class="tab-item"
          :class="{ active: currentTab === index }"
        >
          <view class="tab-icon" :class="{ active: currentTab === index }">
            <YuIcon :name="item.icon" :size="48" :color="currentTab === index ? '#ccf381' : '#9ca3af'" />
          </view>
          <view v-if="currentTab === index" class="tab-indicator"></view>
        </view>
      </view>
    </view>

    <!-- Toast 提示 -->
    <view v-if="toast.visible" class="toast animate-fade-in">
      <YuIcon name="Check" :size="28" color="#ccf381" />
      <text class="toast-text">{{ toast.msg }}</text>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'

export default {
  name: 'Dashboard',
  components: {
    YuIcon,
    YuAvatar
  },
  data() {
    return {
      safeAreaTop: 0,
      safeAreaBottom: 0,
      headerHeight: 280,
      currentTab: 0,
      activeFilter: '全部',
      filterList: ['全部', '男生', '女生', '高手', '新人'],
      tabList: [
        { icon: 'Radar', text: '发现' },
        { icon: 'SquareIcon', text: '广场' },
        { icon: 'Timer', text: '记录' },
        { icon: 'User', text: '名片' }
      ],
      mockPlayers: [
        {
          id: '1',
          name: '羽球甜心1号',
          level: 6.1,
          avatarColor: 'bg-pink-100 text-pink-500'
        },
        {
          id: '2',
          name: '暴力杀球手3',
          level: 4.5,
          avatarColor: 'bg-blue-100 text-blue-600'
        }
      ],
      toast: {
        msg: '',
        visible: false
      }
    }
  },
  onLoad() {
    this.getSafeArea()
  },
  methods: {
    getSafeArea() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaTop = systemInfo.safeAreaInsets?.top || systemInfo.statusBarHeight || 0
      this.safeAreaBottom = systemInfo.safeAreaInsets?.bottom || 0
    },
    setFilter(filter) {
      this.activeFilter = filter
      this.showToast(`筛选：${filter}`)
    },
    selectPlayer(player) {
      this.showToast(`查看 ${player.name}`)
    },
    showToast(msg) {
      this.toast = { msg, visible: true }
      setTimeout(() => {
        this.toast.visible = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.dashboard {
  min-height: 100vh;
  background: $yu-bg;
  position: relative;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  @include glass($glass-light);
  border-bottom: 2rpx solid rgba(255, 255, 255, 0.1);
}

.header-content {
  @include flex-between;
  padding: $spacing-lg $spacing-xl;
  min-height: 88rpx;
}

.header-left {
  flex: 1;
}

.title {
  font-size: $font-3xl;
  font-weight: $font-black;
  color: $yu-black;
  font-style: italic;
  letter-spacing: -4rpx;
  display: block;
  margin-bottom: $spacing-xs;
}

.subtitle-row {
  @include flex-center-y;
  gap: $spacing-sm;
}

.subtitle {
  font-size: $font-sm;
  color: $yu-light-gray;
  font-weight: $font-medium;
}

.status-dot {
  width: 6rpx;
  height: 6rpx;
  border-radius: 50%;
  background: $success;
}

.header-right {
  @include flex-center-y;
  gap: $spacing-sm;
}

.message-btn {
  position: relative;
  width: 80rpx;
  height: 80rpx;
  @include flex-center;
  background: $yu-white;
  border: 2rpx solid #f0f0f0;
  border-radius: 50%;
  color: $yu-black;
  @include shadow('sm');
  
  &:active {
    transform: scale(0.95);
  }
}

.badge {
  position: absolute;
  top: -4rpx;
  right: -4rpx;
  min-width: 36rpx;
  height: 36rpx;
  @include flex-center;
  background: $error;
  color: $yu-white;
  font-size: $font-xs;
  font-weight: $font-black;
  border-radius: $radius-full;
  border: 4rpx solid $yu-bg;
}

.main-content {
  padding: $spacing-xl;
  padding-bottom: 160rpx;
}

.filter-tags {
  @include flex-center-y;
  gap: $spacing-md;
  margin-bottom: $spacing-xl;
  overflow-x: auto;
}

.filter-item {
  padding: $spacing-md $spacing-lg;
  background: $yu-white;
  border: 2rpx solid transparent;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: $font-bold;
  white-space: nowrap;
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.95);
  }
  
  &.active {
    background: $yu-black;
    color: $yu-brand;
    border-color: $yu-black;
    @include shadow('lg');
  }
  
  &:not(.active) {
    color: $yu-light-gray;
  }
}

.player-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.player-card {
  @include card($padding: $spacing-xl);
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.98);
  }
}

.card-header {
  @include flex-between;
  margin-bottom: $spacing-lg;
  padding-bottom: $spacing-md;
  border-bottom: 2rpx solid #f9fafb;
}

.intent-badge {
  @include flex-center-y;
  gap: $spacing-xs;
  padding: $spacing-sm $spacing-md;
  background: rgba(#ea580c, 0.1);
  border-radius: $radius-lg;
}

.intent-text {
  font-size: $font-sm;
  font-weight: $font-black;
  color: #ea580c;
}

.time-text {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $success;
}

.card-body {
  @include flex-center-y;
  gap: $spacing-lg;
}

.player-info {
  flex: 1;
}

.name-row {
  @include flex-center-y;
  gap: $spacing-sm;
  margin-bottom: $spacing-sm;
}

.player-name {
  font-size: $font-base;
  font-weight: $font-bold;
  color: $yu-black;
}

.level-badge {
  padding: 2rpx $spacing-sm;
  background: $yu-brand;
  color: $yu-black;
  border-radius: $radius-sm;
  font-style: italic;
  transform: skewX(-12deg);
}

.level-text {
  font-size: $font-xs;
  font-weight: $font-black;
}

.tags-row {
  @include flex-center-y;
  gap: $spacing-xs;
}

.tag-item {
  padding: 2rpx $spacing-xs;
  background: #f3f4f6;
  border-radius: $radius-sm;
}

.tag-text {
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  @include glass($glass-light);
  border-top: 2rpx solid rgba(255, 255, 255, 0.1);
}

.tabbar-content {
  @include flex-between;
  padding: $spacing-md $spacing-xl;
}

.tab-item {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-xs;
  width: 128rpx;
}

.tab-icon {
  @include flex-center;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  transition: all $duration-normal $ease-out;
  
  &.active {
    background: $yu-black;
    transform: rotate(-10deg) scale(1.1);
    @include shadow('lg');
  }
}

.tab-indicator {
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  background: $yu-black;
}

.toast {
  position: fixed;
  top: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  @include flex-center-y;
  gap: $spacing-sm;
  background: $yu-black;
  color: $yu-white;
  padding: $spacing-md $spacing-xl;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: $font-bold;
  @include shadow('xl');
  z-index: $z-toast;
}

.toast-text {
  color: $yu-white;
}
</style>
