<template>
  <view class="profile">
    <!-- 沉浸式黑色头部 -->
    <view class="immersive-header" :style="{ paddingTop: safeAreaTop + 'px' }">
      <!-- 背景纹理和装饰 -->
      <view class="header-bg"></view>
      <view class="header-glow"></view>
      <view class="header-gradient"></view>

      <!-- 顶部操作栏 -->
      <view class="top-bar">
        <!-- 举牌接头按钮（暂时隐藏，需求中说先不做） -->
        <!-- <view class="spotting-btn" @click="showSpottingMode = true">
          <YuIcon name="Smartphone" :size="28" color="#1a1a1a" />
          <text class="spotting-text">举牌接头</text>
        </view> -->

        <view class="top-actions">
          <view class="action-btn" @click="showShareCard = true">
            <YuIcon name="QrCode" :size="32" color="#fff" />
          </view>
          <view class="action-btn settings-btn" @click="showSettings = true">
            <YuIcon name="Settings" :size="32" color="#fff" />
          </view>
        </view>
      </view>

      <!-- 头像和主要信息 -->
      <view class="header-main">
        <view class="avatar-section" @click="toggleEditMode">
          <view class="avatar-container">
            <view class="avatar-wrapper">
              <view class="avatar">{{ profile.name.charAt(0) }}</view>
            </view>
            <view class="level-badge">
              <YuIcon name="Award" :size="20" color="#1a1a1a" />
              <text class="level-text">{{ profile.level }}</text>
            </view>
            <view v-if="isEditing" class="edit-indicator">
              <YuIcon name="Edit" :size="24" color="#fff" />
            </view>
          </view>
        </view>

        <!-- 用户名和标题 -->
        <view class="user-info">
          <input v-if="isEditing" v-model="profile.name" class="name-input" placeholder="你的昵称" />
          <text v-else class="user-name">{{ profile.name }}</text>
          <text class="user-title">{{ profile.levelTitle }}</text>
        </view>

        <!-- 经验值进度条 -->
        <view class="xp-bar">
          <view class="xp-progress" :style="{ width: profile.xp + '%' }"></view>
        </view>

        <!-- 统计数据 -->
        <view class="stats-row">
          <view class="stat-item">
            <text class="stat-value">{{ profile.stats.winRate }}</text>
            <text class="stat-label">胜率</text>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-value appreciation">{{ profile.stats.appreciations }}</text>
            <view class="stat-label-with-icon">
              <YuIcon name="Heart" :size="16" color="#ccf381" />
              <text class="stat-label">欣赏</text>
            </view>
          </view>
          <view class="stat-divider"></view>
          <view class="stat-item">
            <text class="stat-value">{{ profile.stats.followers }}</text>
            <text class="stat-label">粉丝</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 滚动内容区域 -->
    <scroll-view class="content-sheet" scroll-y :style="{ paddingBottom: tabBarHeight + 'px' }">
      <!-- 能力评测卡片 -->
      <view class="assessment-card" @click="goToAssessment">
        <view class="assessment-info">
          <view class="assessment-icon">
            <YuIcon name="Radar" :size="36" color="#1a1a1a" />
          </view>
          <view class="assessment-text">
            <text class="assessment-title">更新能力模型</text>
            <text class="assessment-subtitle">上次评测: 7天前</text>
          </view>
        </view>
        <view class="assessment-arrow">
          <YuIcon name="ChevronRight" :size="32" color="#666" />
        </view>
      </view>

      <!-- 雷达图和简介区域 -->
      <view class="info-grid">
        <!-- 雷达图卡片 -->
        <view class="radar-card">
          <text class="card-label">RADAR</text>
          <view class="radar-container">
            <RadarChart :values="profile.radar" />
          </view>
        </view>

        <!-- 右侧信息卡片 -->
        <view class="info-cards">
          <!-- 简介卡片 -->
          <view class="bio-card" :class="{ editing: isEditing }">
            <view class="card-header">
              <text class="card-label">Bio</text>
              <YuIcon v-if="isEditing" name="Edit" :size="20" color="#ccf381" />
            </view>
            <textarea v-if="isEditing" v-model="profile.bio" class="bio-input" placeholder="写点什么..." />
            <text v-else class="bio-text">{{ profile.bio }}</text>
          </view>

          <!-- 微信卡片 -->
          <view class="wechat-card" @click="!privacyMode && (showWeChatQR = true)">
            <view class="wechat-bg-icon">
              <YuIcon name="MessageCircle" :size="96" color="rgba(255,255,255,0.05)" />
            </view>
            <view class="wechat-header">
              <text class="card-label">
                微信号
                <YuIcon v-if="privacyMode" name="Shield" :size="20" color="#10b981" />
              </text>
              <YuIcon v-if="!privacyMode" name="QrCode" :size="28" color="#ccf381" />
            </view>
            <text class="wechat-id">{{ displayWeChatId }}</text>
            <text class="wechat-action">{{ privacyMode ? '已隐藏' : '复制 ID' }}</text>
          </view>
        </view>
      </view>

      <!-- 球库统计 -->
      <BallVault :stats="ballStats" @click="showBallVault = true" @add="handleAddBallUsage" />

      <!-- 装备库 -->
      <GearLocker :gear-list="gearList" @add="showAddGear = true" />

      <!-- 球风标签 -->
      <TagsSection :tags="tags" :is-editing="isEditing" @add="handleAddTag" @remove="handleRemoveTag" />
    </scroll-view>

    <!-- 各种弹窗 -->
    <SettingsModal v-if="showSettings" :is-editing="isEditing" :privacy-mode="privacyMode" @close="showSettings = false"
      @toggle-edit="toggleEditMode" @toggle-privacy="togglePrivacy" @logout="handleLogout" />

    <WeChatQRModal v-if="showWeChatQR" :profile="profile" @close="showWeChatQR = false" />

    <AddGearModal v-if="showAddGear" @close="showAddGear = false" @submit="handleAddGear" />

    <BallVaultModal v-if="showBallVault" :stats="ballStats" @close="showBallVault = false" @add="handleAddBallUsage" />

    <ShareCardModal v-if="showShareCard" :profile="profile" :gear-list="gearList" @close="showShareCard = false" />

    <!-- Toast 提示 -->
    <YuToast v-if="toast.visible" :message="toast.msg" :type="toast.type" @close="toast.visible = false" />

    <!-- 底部导航 -->
    <YuTabBar :current="3" />
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import YuToast from '@/components/YuToast/YuToast.vue'
import YuTabBar from '@/components/YuTabBar/YuTabBar.vue'
import RadarChart from './components/RadarChart.vue'
import BallVault from './components/BallVault.vue'
import GearLocker from './components/GearLocker.vue'
import TagsSection from './components/TagsSection.vue'
import SettingsModal from './components/SettingsModal.vue'
import WeChatQRModal from './components/WeChatQRModal.vue'
import AddGearModal from './components/AddGearModal.vue'
import BallVaultModal from './components/BallVaultModal.vue'
import ShareCardModal from './components/ShareCardModal.vue'

export default {
  name: 'Profile',
  components: {
    YuIcon,
    YuToast,
    YuTabBar,
    RadarChart,
    BallVault,
    GearLocker,
    TagsSection,
    SettingsModal,
    WeChatQRModal,
    AddGearModal,
    BallVaultModal,
    ShareCardModal
  },
  data() {
    return {
      // 弹窗状态
      showSettings: false,
      showWeChatQR: false,
      showAddGear: false,
      showBallVault: false,
      showShareCard: false,

      // 编辑状态
      isEditing: false,
      privacyMode: false,

      // 布局参数
      safeAreaTop: 0,
      tabBarHeight: 160,

      // 用户资料
      profile: {
        name: '张大仙',
        wechatId: 'YuBadminton888',
        bio: '追求极致的控网，寻找耐打球友。主要活跃在海淀区。',
        level: 'Lv.8',
        levelTitle: '进阶球手',
        xp: 75,
        stats: {
          followers: 248,
          following: 120,
          appreciations: 66,
          winRate: '62%',
          mvp: 12
        },
        radar: [85, 60, 90, 75, 70] // 进攻、防守、网前、意识、体能
      },

      // 球风标签
      tags: ['装备党', '周末战神', '接发球好', '脾气好'],

      // 装备列表
      gearList: [
        {
          id: 'g1',
          type: 'RACKET',
          brand: 'YONEX',
          model: 'ASTROX 100ZZ',
          image: '',
          status: 'ACTIVE',
          specs: '4U G5 / 28 Lbs'
        },
        {
          id: 'g2',
          type: 'RACKET',
          brand: 'VICTOR',
          model: 'Ryuga 龙牙之刃',
          image: '',
          status: 'BROKEN',
          specs: '3U G5 / 战损留念',
          date: '2023.05.12 阵亡'
        },
        {
          id: 'g3',
          type: 'SHOES',
          brand: 'LI-NING',
          model: '雷霆 PRO',
          image: '',
          status: 'ACTIVE',
          specs: 'EUR 42'
        }
      ],

      // 球库数据
      ballStats: {
        totalUsed: 128,
        favorite: 'RSL No.5',
        history: [
          { date: '2023.10.25', count: 2, brand: 'RSL No.5' },
          { date: '2023.10.22', count: 3, brand: 'Yonex AS-05' }
        ]
      },

      // Toast 状态
      toast: {
        msg: '',
        type: 'info',
        visible: false
      }
    }
  },
  computed: {
    displayWeChatId() {
      return this.privacyMode
        ? this.profile.wechatId.substring(0, 4) + '****'
        : this.profile.wechatId
    }
  },
  onLoad() {
    this.initLayout()
  },
  onShow() {
    // TabBar 状态由 YuTabBar 组件管理
  },
  methods: {
    initLayout() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaTop = systemInfo.safeAreaInsets?.top || 0
      this.tabBarHeight = 160 + (systemInfo.safeAreaInsets?.bottom || 0)
    },

    // 编辑模式
    toggleEditMode() {
      this.isEditing = !this.isEditing
      this.showSettings = false
      this.showToast(this.isEditing ? '进入编辑模式' : '退出编辑模式', 'info')
    },

    // 隐私模式
    togglePrivacy() {
      this.privacyMode = !this.privacyMode
      this.showToast(this.privacyMode ? '已开启隐私保护' : '已关闭隐私保护', 'info')
    },

    // 标签管理
    handleAddTag() {
      const newTags = ['暴力后场', '网前雨刷', '步伐灵活', '战术大师']
      const randomTag = newTags[Math.floor(Math.random() * newTags.length)]
      if (!this.tags.includes(randomTag)) {
        this.tags.push(randomTag)
        this.showToast(`添加标签: ${randomTag}`, 'success')
      }
    },

    handleRemoveTag(index) {
      const removedTag = this.tags[index]
      this.tags.splice(index, 1)
      this.showToast(`移除标签: ${removedTag}`, 'info')
    },

    // 装备管理
    handleAddGear(gearData) {
      const newGear = {
        id: Date.now().toString(),
        ...gearData,
        status: 'ACTIVE'
      }
      this.gearList.unshift(newGear)
      this.showToast('装备添加成功', 'success')
    },

    // 球库管理
    handleAddBallUsage() {
      this.ballStats.totalUsed += 1
      this.ballStats.history.unshift({
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        count: 1,
        brand: this.ballStats.favorite
      })
      this.showToast('记录用球 +1', 'success')
    },

    // 页面跳转
    goToAssessment() {
      uni.navigateTo({
        url: '/pages/assessment/assessment'
      })
    },

    // 退出登录
    handleLogout() {
      uni.showModal({
        title: '确认退出',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            this.showToast('退出成功', 'success')
            // 这里可以添加退出登录的逻辑
          }
        }
      })
    },

    // Toast 提示
    showToast(msg, type = 'info') {
      this.toast = { msg, type, visible: true }
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

// 全局盒子模型修复 - 小程序不支持通配符选择器
view,
text,
input,
textarea,
scroll-view {
  box-sizing: border-box;
}

.profile {
  width: 100%;
  min-height: 100vh;
  background: $yu-bg;
  position: relative;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* ========================================
   沉浸式头部
   ======================================== */
.immersive-header {
  width: 100%;
  background: #1a1a1a;
  color: white;
  padding: 60rpx 48rpx 240rpx;
  position: relative;
  box-shadow: 0 40rpx 80rpx rgba(0, 0, 0, 0.3);
  z-index: 10;
  box-sizing: border-box;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="carbon" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="%23000"/><rect width="2" height="2" fill="%23333"/><rect x="2" y="2" width="2" height="2" fill="%23333"/></pattern></defs><rect width="100" height="100" fill="url(%23carbon)"/></svg>');
  opacity: 0.1;
  pointer-events: none;
}

.header-glow {
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600rpx;
  height: 600rpx;
  background: radial-gradient(circle, rgba(204, 243, 129, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(160rpx);
}

.header-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160rpx;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
}

/* 顶部操作栏 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48rpx;
  position: relative;
  z-index: 10;
}

.spotting-btn {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: $yu-brand;
  color: #1a1a1a;
  padding: 12rpx 24rpx;
  border-radius: 50rpx;
  box-shadow: 0 0 30rpx rgba(204, 243, 129, 0.3);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }
}

.spotting-text {
  font-size: 24rpx;
  font-weight: 900;
  letter-spacing: 2rpx;
}

.top-actions {
  display: flex;
  gap: 24rpx;
}

.action-btn {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2rpx solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.9);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.settings-btn:hover {
  transform: rotate(90deg);
}

/* 头像区域 */
.header-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
}

.avatar-section {
  margin-bottom: 32rpx;
  cursor: pointer;
}

.avatar-container {
  position: relative;
}

.avatar-wrapper {
  padding: 8rpx;
  border-radius: 56rpx;
  background: linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%);
  box-shadow: 0 16rpx 32rpx rgba(0, 0, 0, 0.5);
  border: 2rpx solid rgba(255, 255, 255, 0.1);
}

.avatar {
  width: 192rpx;
  height: 192rpx;
  border-radius: 48rpx;
  background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72rpx;
  font-weight: 900;
  color: white;
  overflow: hidden;
}

.level-badge {
  position: absolute;
  bottom: -16rpx;
  right: -24rpx;
  background: $yu-brand;
  color: #1a1a1a;
  font-size: 20rpx;
  font-weight: 900;
  padding: 8rpx 20rpx;
  border-radius: 16rpx;
  border: 6rpx solid #1a1a1a;
  box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.5);
  transform: rotate(-6deg);
  display: flex;
  align-items: center;
  gap: 4rpx;
  transition: transform 0.3s ease;
}

.level-text {
  font-size: 20rpx;
  font-weight: 900;
}

.edit-indicator {
  position: absolute;
  top: -16rpx;
  right: -16rpx;
  background: #ef4444;
  color: white;
  padding: 12rpx;
  border-radius: 50%;
  box-shadow: 0 4rpx 12rpx rgba(239, 68, 68, 0.4);
  animation: bounce 1s infinite;
}

/* 用户信息 */
.user-info {
  text-align: center;
  margin-bottom: 32rpx;
}

.name-input {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-align: center;
  font-size: 48rpx;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -2rpx;
  border-radius: 16rpx;
  padding: 8rpx 32rpx;
  border: 4rpx solid $yu-brand;
  margin-bottom: 8rpx;
  width: 320rpx;
}

.user-name {
  font-size: 48rpx;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -2rpx;
  margin-bottom: 8rpx;
  display: block;
}

.user-title {
  color: #999;
  font-size: 24rpx;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4rpx;
  display: block;
}

/* 经验值进度条 */
.xp-bar {
  width: 360rpx;
  height: 12rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50rpx;
  overflow: hidden;
  margin-bottom: 48rpx;
  position: relative;
}

.xp-progress {
  height: 100%;
  background: $yu-brand;
  box-shadow: 0 0 20rpx #ccf381;
  transition: width 0.3s ease;
}

/* 统计数据 */
.stats-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64rpx;
  width: 100%;
  box-sizing: border-box;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 36rpx;
  font-weight: 900;
  color: white;
  display: block;

  &.appreciation {
    color: $yu-brand;
  }
}

.stat-label {
  font-size: 18rpx;
  color: #666;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.stat-label-with-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rpx;
}

.stat-divider {
  width: 2rpx;
  height: 48rpx;
  background: rgba(255, 255, 255, 0.1);
}

/* ========================================
   滚动内容区域
   ======================================== */
.content-sheet {
  width: 100%;
  flex: 1;
  padding: 64rpx 40rpx 0;
  margin-top: -96rpx;
  background: $yu-bg;
  border-radius: 80rpx 80rpx 0 0;
  position: relative;
  z-index: 20;
  transition: transform 0.3s ease;
  box-sizing: border-box;
}

/* 能力评测卡片 */
.assessment-card {
  background: white;
  border-radius: 48rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid transparent;
  margin-bottom: 48rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:active {
    transform: scale(0.98);
    border-color: $yu-brand;
  }
}

.assessment-info {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.assessment-icon {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, $yu-brand 0%, #a3e635 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(204, 243, 129, 0.3);
}

.assessment-text {
  display: flex;
  flex-direction: column;
}

.assessment-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 4rpx;
}

.assessment-subtitle {
  font-size: 20rpx;
  font-weight: 500;
  color: #999;
}

.assessment-arrow {
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.assessment-card:hover .assessment-arrow {
  background: #1a1a1a;
  color: $yu-brand;
}

/* 信息网格 */
.info-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 32rpx;
  margin-bottom: 64rpx;
  box-sizing: border-box;
}

/* 雷达图卡片 */
.radar-card {
  width: 100%;
  background: white;
  border-radius: 56rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.radar-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 8rpx;
  background: linear-gradient(90deg, $yu-brand 0%, transparent 100%);
}

.card-label {
  font-size: 20rpx;
  font-weight: 900;
  color: #ccc;
  text-transform: uppercase;
  letter-spacing: 6rpx;
  position: absolute;
  top: 24rpx;
  left: 32rpx;
}

.radar-container {
  margin-top: 32rpx;
  width: 100%;
}

/* 右侧信息卡片 */
.info-cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32rpx;
  box-sizing: border-box;
}

/* 简介卡片 */
.bio-card {
  width: 100%;
  background: white;
  border-radius: 48rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  border: 2rpx solid #f0f0f0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &.editing {
    border-color: $yu-brand;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}

.bio-input {
  font-size: 24rpx;
  font-weight: 700;
  color: #1a1a1a;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  border-radius: 16rpx;
  padding: 16rpx;
  border: none;
  resize: none;
  line-height: 1.6;
}

.bio-text {
  font-size: 24rpx;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.6;
}

/* 微信卡片 */
.wechat-card {
  width: 100%;
  background: #1a1a1a;
  border-radius: 48rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:active {
    transform: scale(0.98);
  }
}

.wechat-bg-icon {
  position: absolute;
  right: -16rpx;
  bottom: -16rpx;
  transform: rotate(-15deg);
}

.wechat-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8rpx;
  z-index: 10;
  position: relative;
}

.wechat-card .card-label {
  color: #666;
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.wechat-id {
  font-size: 24rpx;
  font-weight: 700;
  color: white;
  font-family: 'Courier New', monospace;
  margin-bottom: 16rpx;
  z-index: 10;
  position: relative;
}

.wechat-action {
  font-size: 18rpx;
  font-weight: 700;
  color: #666;
  z-index: 10;
  position: relative;
  transition: color 0.3s ease;
}

.wechat-card:hover .wechat-action {
  color: $yu-brand;
}

/* 动画 */
@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10rpx);
  }

  60% {
    transform: translateY(-5rpx);
  }
}
</style>