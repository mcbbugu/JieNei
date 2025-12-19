<template>
  <view class="dashboard">
    <!-- 自定义导航栏 -->
    <YuNavBar :transparent="true" :scroll-opacity="navOpacity" @safe-area-info="handleSafeAreaInfo">
      <template #left>
        <view class="header-left">
          <text class="title">附近局</text>
          <view class="subtitle-row">
            <text class="subtitle">{{ loading ? '定位场馆中...' : `发现 ${displayPlayers.length} 位 1km 内球友` }}</text>
            <view v-if="!loading" class="status-dot"></view>
          </view>
        </view>
      </template>

      <template #right>
        <view class="header-right">
          <!-- 消息按钮 -->
          <view class="message-btn" @click="showNotifications = true">
            <YuIcon name="MessageCircle" :size="40" color="#1a1a1a" />
            <view v-if="unreadCount > 0" class="badge">{{ unreadCount }}</view>
          </view>

          <!-- 发布状态按钮 -->
          <view class="publish-btn" @click="handlePublishClick">
            <YuIcon name="Plus" :size="40" color="#1a1a1a" />
          </view>
        </view>
      </template>
    </YuNavBar>

    <!-- 主要内容区域 -->
    <view class="main-content"
      :style="{ paddingTop: navBarHeight + 'px', paddingBottom: (80 + safeAreaBottom) + 'px' }">
      <!-- 场馆热度标签 - 水平一条线布局 -->
      <view v-if="!loading" class="venue-section">
        <scroll-view scroll-x class="venue-scroll" :show-scrollbar="false">
          <view class="venue-list">
            <!-- 热门场馆标题 -->
            <view class="venue-header-inline">
              <YuIcon name="Flame" :size="24" color="#f97316" />
              <text class="venue-label">热门场馆</text>
            </view>

            <!-- 场馆列表 -->
            <view v-for="([venueName, count], idx) in venueStats" :key="venueName" class="venue-item"
              :class="{ active: activeFilter === `Venue:${venueName}` }" @click="setVenueFilter(venueName)">
              <text class="venue-name">{{ venueName }}</text>
              <text class="venue-count">{{ count }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 筛选标签 -->
      <view class="filter-section">
        <view v-for="(filter, idx) in filterList" :key="idx" class="filter-item"
          :class="{ active: activeFilter === filter }" @click="setFilter(filter)">
          <text>{{ filter }}</text>
        </view>
      </view>

      <!-- 球友列表 -->
      <view class="player-list">
        <!-- 加载状态 -->
        <template v-if="loading">
          <view v-for="i in 3" :key="i" class="skeleton-card">
            <view class="skeleton-header">
              <view class="skeleton-badge"></view>
              <view class="skeleton-time"></view>
            </view>
            <view class="skeleton-body">
              <view class="skeleton-avatar"></view>
              <view class="skeleton-info">
                <view class="skeleton-name"></view>
                <view class="skeleton-tags"></view>
                <view class="skeleton-gear"></view>
              </view>
            </view>
          </view>
        </template>

        <!-- 球友卡片 -->
        <template v-else>
          <view v-for="player in displayPlayers" :key="player.id" class="player-card" @click="selectPlayer(player)">
            <!-- 第一行：意图标签 + 时间 + 位置信息 -->
            <view class="card-top-row">
              <view class="left-section">
                <view class="intent-badge" :class="getIntentBgClass(player.intent)">
                  <YuIcon :name="getIntentIcon(player.intent)" :size="24" :color="getIntentColor(player.intent)" />
                  <text class="intent-text" :style="{ color: getIntentColor(player.intent) }">{{
                    getIntentLabel(player.intent) }}</text>
                </view>
                <text class="time-text" :class="getTimeClass(player.intentTimestamp)">{{ player.intentTime }}</text>
              </view>

              <view class="right-section">
                <YuIcon name="MapPin" :size="20" color="#9ca3af" />
                <template v-if="player.specificLocation">
                  <text class="location-text">{{ player.venue }} {{ player.specificLocation }}</text>
                </template>
                <template v-else>
                  <text class="location-text">{{ player.distance }}</text>
                </template>
              </view>
            </view>

            <!-- 第二行：球友信息 -->
            <view class="player-main-info">
              <!-- 头像区域 -->
              <view class="avatar-container">
                <view class="player-avatar" :class="player.avatarColor">
                  <text class="avatar-text">{{ player.name[0] }}</text>
                </view>
                <!-- 在线状态 -->
                <view v-if="isFresh(player.intentTimestamp)" class="online-dot"></view>
                <!-- 好友标识 -->
                <view v-if="player.relationship === 'FRIEND'" class="friend-badge">
                  <YuIcon name="Handshake" :size="24" color="#ffffff" />
                </view>
              </view>

              <!-- 信息区域 -->
              <view class="player-details">
                <!-- 姓名和等级 -->
                <view class="name-level-row">
                  <text class="player-name">{{ player.name }}</text>
                  <view class="level-badge" :class="getLevelClass(player.levelScore)">
                    <text class="level-text">Lv.{{ player.levelScore }}</text>
                  </view>
                </view>

                <!-- 标签 -->
                <view class="tags-row">
                  <view v-for="(tag, idx) in player.tags.slice(0, 2)" :key="idx" class="tag-item">
                    <text class="tag-text">#{{ tag }}</text>
                  </view>
                  <view v-if="player.relationship === 'FRIEND'" class="relation-tag friend">
                    <text class="relation-text">已关注</text>
                  </view>
                </view>

                <!-- 装备信息 -->
                <view v-if="player.gear" class="gear-row">
                  <YuIcon name="Sword" :size="20" color="#d1d5db" />
                  <text class="gear-text">{{ player.gear.racket }}</text>
                  <text class="gear-divider">·</text>
                  <text class="gear-text">{{ player.gear.tension }}lbs</text>
                  <text class="gear-divider">·</text>
                  <text class="gear-text">{{ player.gear.shuttlecock }}</text>
                </view>
              </view>
            </view>
          </view>
        </template>
      </view>
    </view>

    <!-- 底部导航 -->
    <YuTabBar :current="0" />

    <!-- Toast 提示 -->
    <view v-if="toast.visible" class="toast">
      <YuIcon name="Check" :size="28" color="#ccf381" />
      <text class="toast-text">{{ toast.msg }}</text>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuNavBar from '@/components/YuNavBar/YuNavBar.vue'
import YuTabBar from '@/components/YuTabBar/YuTabBar.vue'
import { generatePlayers, getIntentConfig } from '@/utils/constants.js'

export default {
  name: 'Dashboard',
  components: {
    YuIcon,
    YuNavBar,
    YuTabBar
  },
  data() {
    return {
      safeAreaTop: 0,
      safeAreaBottom: 0,
      navBarHeight: 88, // 初始值改为 88px
      navOpacity: 0, // 导航栏透明度

      // 数据状态
      allPlayers: [],
      displayPlayers: [],
      loading: true,

      // 筛选状态
      activeFilter: '全部',
      filterList: ['全部', '男生', '女生', '高手', '新人'],

      // 用户状态
      myStatus: 'IDLE',
      myIntent: 'ANY',
      myVenue: '李宁羽毛球中心',
      myLocation: '',

      // UI 状态
      showNotifications: false,
      selectedPlayer: null,

      // 消息状态
      notifications: [],
      unreadCount: 1,

      // Toast 状态
      toast: {
        msg: '',
        visible: false
      },

    }
  },
  computed: {
    venueStats() {
      const stats = {}
      this.allPlayers.forEach(p => {
        if (p.venue) {
          stats[p.venue] = (stats[p.venue] || 0) + 1
        }
      })
      return Object.entries(stats)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    }
  },
  onLoad() {
    this.getSafeArea()
    this.initData()
  },

  onPageScroll(e) {
    // 计算导航栏透明度
    const scrollTop = e.scrollTop
    // 滚动 0-60px 之间产生渐变
    const opacity = Math.min(Math.max(scrollTop / 60, 0), 1)
    this.navOpacity = opacity
    // console.log('滚动监听:', scrollTop, opacity)
  },

  methods: {
    // 获取安全区域
    getSafeArea() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaBottom = systemInfo.safeAreaInsets?.bottom || 0
    },

    // 处理 NavBar 传递的安全区域信息
    handleSafeAreaInfo(info) {
      this.navBarHeight = info.headerHeight + 20
      console.log('Dashboard 接收到安全区域信息:', info)
    },

    // 初始化数据
    async initData() {
      try {
        // 模拟加载延迟
        await new Promise(resolve => setTimeout(resolve, 1500))

        const players = generatePlayers(15, 1)
        this.allPlayers = players
        this.filterPlayers()

        this.loading = false
      } catch (error) {
        console.error('加载数据失败:', error)
        this.showToast('加载失败，请重试')
        this.loading = false
      }
    },

    // 筛选球友
    filterPlayers() {
      let filtered = [...this.allPlayers]

      if (this.activeFilter.startsWith('Venue:')) {
        const targetVenue = this.activeFilter.replace('Venue:', '')
        filtered = this.allPlayers.filter(p => p.venue === targetVenue)
      } else {
        switch (this.activeFilter) {
          case '男生':
            filtered = this.allPlayers.filter(p => p.gender === 'M')
            break
          case '女生':
            filtered = this.allPlayers.filter(p => p.gender === 'F')
            break
          case '高手':
            filtered = this.allPlayers.filter(p => p.levelScore >= 7.0)
            break
          case '新人':
            filtered = this.allPlayers.filter(p => p.levelScore < 7.0)
            break
          default:
            filtered = this.allPlayers
        }
      }

      // 距离筛选
      filtered = filtered.filter(p => p.distanceMeters <= 1000)

      // 排序：时间新鲜度 > 距离
      filtered.sort((a, b) => {
        const timeA = a.intentTimestamp || 0
        const timeB = b.intentTimestamp || 0
        if (timeB !== timeA) return timeB - timeA
        return a.distanceMeters - b.distanceMeters
      })

      this.displayPlayers = filtered
    },

    // 设置筛选器
    setFilter(filter) {
      this.activeFilter = filter
      this.filterPlayers()
    },

    // 设置场馆筛选
    setVenueFilter(venueName) {
      const targetFilter = `Venue:${venueName}`
      this.activeFilter = this.activeFilter === targetFilter ? '全部' : targetFilter
      this.filterPlayers()
    },

    // 处理发布状态点击
    handlePublishClick() {
      this.showToast('发布状态功能开发中')
    },

    // 判断是否为新鲜状态
    isFresh(timestamp) {
      return (timestamp || 0) > Date.now() - 20 * 60 * 1000
    },

    // 获取时间样式类
    getTimeClass(timestamp) {
      if (this.isFresh(timestamp)) return 'fresh'
      if ((timestamp || 0) < Date.now() - 45 * 60 * 1000) return 'stale'
      return 'normal'
    },

    // 获取意图图标
    getIntentIcon(intent) {
      const config = getIntentConfig(intent)
      return config.icon
    },

    // 获取意图颜色
    getIntentColor(intent) {
      const config = getIntentConfig(intent)
      return config.color
    },

    // 获取意图标签
    getIntentLabel(intent) {
      const config = getIntentConfig(intent)
      return config.label
    },

    // 获取意图背景类
    getIntentBgClass(intent) {
      switch (intent) {
        case 'SINGLES': return 'orange-bg'
        case 'DOUBLES': return 'blue-bg'
        case 'TRAINING': return 'green-bg'
        default: return 'gray-bg'
      }
    },

    // 获取等级样式类
    getLevelClass(score) {
      if (score >= 8) return 'level-master'
      if (score >= 5) return 'level-intermediate'
      return 'level-beginner'
    },

    // 选择球友
    selectPlayer(player) {
      this.selectedPlayer = player
      // 震动反馈
      uni.vibrateShort({ type: 'light' })
    },

    // 邀请球友
    invitePlayer(player) {
      this.showToast(`已向 ${player.name} 发送约球邀请`, 'success')
    },

    // 关注/取消关注
    toggleFollow(player) {
      const newIsFollowing = !player.isFollowing

      // 更新数据
      const updatedPlayers = this.allPlayers.map(p => {
        if (p.id === player.id) {
          return {
            ...p,
            isFollowing: newIsFollowing,
            relationship: newIsFollowing ? 'FRIEND' : 'NONE'
          }
        }
        return p
      })

      this.allPlayers = updatedPlayers
      this.filterPlayers()

      // 更新选中的球友
      if (this.selectedPlayer && this.selectedPlayer.id === player.id) {
        this.selectedPlayer = {
          ...this.selectedPlayer,
          isFollowing: newIsFollowing,
          relationship: newIsFollowing ? 'FRIEND' : 'NONE'
        }
      }

      this.showToast(
        newIsFollowing ? `已关注，你们现在是好友了` : `已取消关注`,
        'success'
      )
    },

    // 处理发布状态点击
    handlePublishClick() {
      if (this.myStatus === 'IDLE') {
        this.showPublishSheet = true
      } else {
        // 显示状态菜单或其他操作
        this.showToast('点击擦亮按钮可以刷新状态', 'info')
      }
    },

    // 确认发布状态
    confirmPublish(intent) {
      if (!this.myVenue) {
        this.showToast('请先选择或输入所在球馆', 'warning')
        return
      }

      this.myIntent = intent
      this.myStatus = 'LOOKING'
      this.showPublishSheet = false

      this.showToast(
        `发布成功！您在 ${this.myVenue} ${this.myLocation || ''}`,
        'success'
      )
    },

    // 擦亮状态
    handleRefreshStatus() {
      this.isRefreshing = true

      setTimeout(() => {
        this.isRefreshing = false
        if (this.myStatus !== 'LOOKING') {
          this.myStatus = 'LOOKING'
        }
        this.showToast('状态已擦亮，重新排到前列', 'success')
      }, 800)
    },

    // 处理通知选择
    handleNotificationSelect(notification) {
      // 标记为已读
      this.notifications = this.notifications.map(n =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
      this.unreadCount = this.notifications.filter(n => !n.isRead).length

      // 显示相关球友信息
      this.showToast(`查看 ${notification.fromUser} 的信息`, 'info')
    },

    // 发送邀请
    sendInvite(player, signal) {
      this.showToast(`已向 ${player.name} 发送邀请：${signal}`, 'success')
    },

    // 欣赏球友
    handleAppreciate(player) {
      // 检查是否已经欣赏过
      const storageKey = `yu_appreciate_${player.id}`
      const lastAppreciate = uni.getStorageSync(storageKey)
      const now = Date.now()

      if (lastAppreciate && now - lastAppreciate < 24 * 60 * 60 * 1000) {
        this.showToast('您今天已经欣赏过 TA 了', 'warning')
        return
      }

      // 保存欣赏记录
      uni.setStorageSync(storageKey, now)

      // 更新数据
      this.allPlayers = this.allPlayers.map(p => {
        if (p.id === player.id) {
          return { ...p, appreciations: p.appreciations + 1 }
        }
        return p
      })

      // 更新选中球友
      if (this.selectedPlayer && this.selectedPlayer.id === player.id) {
        this.selectedPlayer = {
          ...this.selectedPlayer,
          appreciations: this.selectedPlayer.appreciations + 1
        }
      }

      this.showToast(`已欣赏 ${player.name} 的球品！`, 'success')
    },

    // 显示 Toast
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
  background: #f3f4f6;
  position: relative;
}

// 自定义头部内容样式
.header-left {
  flex: 1;
}

.title {
  font-size: 60rpx;
  font-weight: 900;
  color: #1a1a1a;
  font-style: italic;
  letter-spacing: -2rpx;
  display: block;
  margin-bottom: 8rpx;
}

.subtitle-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.subtitle {
  font-size: 24rpx;
  color: #9ca3af;
  font-weight: 600;
}

.status-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  background: #10b981;
  animation: pulse 2s infinite;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24rpx;
  height: 100%;

  // 当 YuNavBar 使用绝对定位时，这个容器会被重新定位
}

.publish-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  background: rgba(255, 255, 255, 0.9);
  border: 2rpx solid rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  @include shadow('sm');
  transition: all $duration-normal $ease-out;

  &:active {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 1);
  }
}

.message-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64rpx;
  height: 64rpx;
  background: rgba(255, 255, 255, 0.9);
  border: 2rpx solid rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  @include shadow('sm');
  transition: all $duration-normal $ease-out;

  &:active {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 1);
  }
}

.badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  min-width: 36rpx;
  height: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ef4444;
  color: white;
  font-size: 20rpx;
  font-weight: 900;
  border-radius: 50%;
  border: 4rpx solid #f3f4f6;
  box-shadow: 0 2rpx 8rpx rgba(239, 68, 68, 0.3);
}

// 主要内容区域
.main-content {
  // 动态设置 padding，通过 :style 绑定
}

// 场馆区域
.venue-section {
  padding: 0 40rpx 32rpx;
}

.venue-header-inline {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 8rpx 16rpx;
  background: rgba(249, 115, 22, 0.1);
  border-radius: 50rpx;
  white-space: nowrap;
  flex-shrink: 0;
}

.venue-label {
  font-size: 20rpx;
  font-weight: 900;
  color: #f97316;
  text-transform: uppercase;
  letter-spacing: 1rpx;
}

.venue-scroll {
  width: 100%;
}

.venue-list {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding-right: 40rpx;
}

.venue-item {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 8rpx 16rpx;
  background: white;
  border: 2rpx solid transparent;
  border-radius: 50rpx;
  white-space: nowrap;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background: #1a1a1a;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);

    .venue-name {
      color: #ccf381;
    }

    .venue-count {
      background: #ccf381;
      color: #1a1a1a;
    }
  }
}

.venue-name {
  font-size: 20rpx;
  font-weight: 700;
  color: #6b7280;
}

.venue-count {
  padding: 2rpx 8rpx;
  background: #f3f4f6;
  color: #9ca3af;
  border-radius: 50rpx;
  font-size: 18rpx;
  font-weight: 700;
  min-width: 32rpx;
  text-align: center;
}

// 筛选区域
.filter-section {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding: 0 40rpx 40rpx;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}

.filter-item {
  padding: 16rpx 32rpx;
  background: white;
  border: 2rpx solid transparent;
  border-radius: 50rpx;
  font-size: 28rpx;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  &.active {
    background: #1a1a1a;
    color: #ccf381;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  }

  &:not(.active) {
    color: #9ca3af;
  }
}

// 球友列表
.player-list {
  padding: 0 40rpx;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

// 骨架屏
.skeleton-card {
  background: white;
  border-radius: 48rpx;
  padding: 40rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32rpx;
  padding-bottom: 24rpx;
  border-bottom: 2rpx solid #f9fafb;
}

.skeleton-badge {
  width: 120rpx;
  height: 32rpx;
  background: #f3f4f6;
  border-radius: 16rpx;
  animation: pulse 2s infinite;
}

.skeleton-time {
  width: 60rpx;
  height: 24rpx;
  background: #f3f4f6;
  border-radius: 12rpx;
  animation: pulse 2s infinite;
}

.skeleton-body {
  display: flex;
  align-items: center;
  gap: 32rpx;
}

.skeleton-avatar {
  width: 112rpx;
  height: 112rpx;
  background: #f3f4f6;
  border-radius: 32rpx;
  animation: pulse 2s infinite;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.skeleton-name {
  width: 160rpx;
  height: 32rpx;
  background: #f3f4f6;
  border-radius: 16rpx;
  animation: pulse 2s infinite;
}

.skeleton-tags {
  width: 200rpx;
  height: 24rpx;
  background: #f3f4f6;
  border-radius: 12rpx;
  animation: pulse 2s infinite;
}

.skeleton-gear {
  width: 240rpx;
  height: 20rpx;
  background: #f3f4f6;
  border-radius: 10rpx;
  animation: pulse 2s infinite;
}

// 球友卡片
.player-card {
  background: white;
  border-radius: 48rpx;
  padding: 40rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.98);
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  }
}

// 第一行：意图标签 + 时间 + 位置信息
.card-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.right-section {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.intent-badge {
  display: flex;
  align-items: center;
  gap: 8rpx;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;

  &.orange-bg {
    background: rgba(251, 146, 60, 0.1);
  }

  &.blue-bg {
    background: rgba(59, 130, 246, 0.1);
  }

  &.green-bg {
    background: rgba(16, 185, 129, 0.1);
  }

  &.gray-bg {
    background: rgba(107, 114, 128, 0.1);
  }
}

.intent-text {
  font-size: 24rpx;
  font-weight: 900;
  letter-spacing: 1rpx;
}

.time-text {
  font-size: 20rpx;
  font-weight: 700;

  &.fresh {
    color: #10b981;
  }

  &.normal {
    color: #9ca3af;
  }

  &.stale {
    color: #d1d5db;
  }
}

.location-text {
  color: #9ca3af;
  font-size: 24rpx;
  font-weight: 700;
}

// 第二行：球友主要信息
.player-main-info {
  display: flex;
  align-items: flex-start;
  gap: 24rpx;
}

.avatar-container {
  position: relative;
  flex-shrink: 0;
}

.player-avatar {
  width: 112rpx;
  height: 112rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 32rpx;
  border: 4rpx solid white;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);

  &.bg-pink-100 {
    background: #fce7f3;

    .avatar-text {
      color: #ec4899;
    }
  }

  &.bg-blue-100 {
    background: #dbeafe;

    .avatar-text {
      color: #3b82f6;
    }
  }
}

.avatar-text {
  font-size: 40rpx;
  font-weight: 900;
}

.online-dot {
  position: absolute;
  bottom: 8rpx;
  right: 8rpx;
  width: 24rpx;
  height: 24rpx;
  background: #10b981;
  border: 4rpx solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 4rpx rgba(16, 185, 129, 0.3);
  animation: pulse 2s infinite;
}

.friend-badge {
  position: absolute;
  top: -8rpx;
  right: -8rpx;
  width: 48rpx;
  height: 48rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #14b8a6;
  border-radius: 50%;
  border: 4rpx solid white;
  box-shadow: 0 2rpx 8rpx rgba(20, 184, 166, 0.3);
}

.player-details {
  flex: 1;
  min-width: 0;
}

.name-level-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 12rpx;
}

.player-name {
  font-size: 28rpx;
  font-weight: 700;
  color: #1a1a1a;
  max-width: 240rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.level-badge {
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  font-style: italic;
  transform: skewX(-12deg);

  &.level-master {
    background: linear-gradient(135deg, #1f2937, #000000);
    color: #ccf381;
    border: 2rpx solid rgba(204, 243, 129, 0.3);
  }

  &.level-intermediate {
    background: #ccf381;
    color: #1a1a1a;
    border: 2rpx solid rgba(26, 26, 26, 0.1);
  }

  &.level-beginner {
    background: #f3f4f6;
    color: #9ca3af;
  }
}

.level-text {
  font-size: 20rpx;
  font-weight: 900;
}

.tags-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 12rpx;
  flex-wrap: wrap;
}

.tag-item {
  padding: 4rpx 8rpx;
  background: #f3f4f6;
  border-radius: 8rpx;
}

.tag-text {
  font-size: 20rpx;
  font-weight: 700;
  color: #9ca3af;
}

.relation-tag {
  padding: 4rpx 8rpx;
  border-radius: 8rpx;

  &.friend {
    background: rgba(20, 184, 166, 0.1);

    .relation-text {
      color: #14b8a6;
    }
  }
}

.relation-text {
  font-size: 20rpx;
  font-weight: 700;
}

.gear-row {
  display: flex;
  align-items: center;
  gap: 8rpx;
  opacity: 0.8;
}

.gear-text {
  font-size: 20rpx;
  font-weight: 700;
  color: #9ca3af;
}

.gear-divider {
  color: #d1d5db;
}

// Toast
.toast {
  position: fixed;
  top: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: #1a1a1a;
  color: white;
  padding: 24rpx 32rpx;
  border-radius: 50rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: fade-in 0.5s ease;
}

.toast-text {
  font-size: 28rpx;
  font-weight: 700;
  color: white;
}

// 动画
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20rpx);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>