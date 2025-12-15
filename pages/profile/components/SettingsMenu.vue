<template>
  <view class="settings-menu">
    <!-- 个人设置 -->
    <YuCard class="menu-section">
      <template #header>
        <text class="section-title">个人设置</text>
      </template>
      
      <view class="menu-list">
        <MenuItem
          icon="user"
          title="个人信息"
          desc="编辑个人资料"
          @click="editProfile"
        />
        <MenuItem
          icon="lock"
          title="隐私设置"
          desc="管理隐私选项"
          @click="$emit('privacy')"
        />
        <MenuItem
          icon="bell"
          title="消息通知"
          desc="推送通知设置"
          @click="notificationSettings"
        />
      </view>
    </YuCard>

    <!-- 应用设置 -->
    <YuCard class="menu-section">
      <template #header>
        <text class="section-title">应用设置</text>
      </template>
      
      <view class="menu-list">
        <MenuItem
          icon="info"
          title="关于我们"
          desc="版本信息与帮助"
          @click="$emit('about')"
        />
        <MenuItem
          icon="chat"
          title="意见反馈"
          desc="提出建议或报告问题"
          @click="$emit('feedback')"
        />
        <MenuItem
          icon="share"
          title="推荐给朋友"
          desc="分享应用给好友"
          @click="shareApp"
        />
      </view>
    </YuCard>

    <!-- 账户操作 -->
    <YuCard class="menu-section">
      <view class="menu-list">
        <MenuItem
          icon="power"
          title="退出登录"
          desc="安全退出当前账户"
          danger
          @click="$emit('logout')"
        />
      </view>
    </YuCard>
  </view>
</template>

<script>
import YuCard from '@/components/YuCard/YuCard.vue'
import MenuItem from './MenuItem.vue'

export default {
  name: 'SettingsMenu',
  components: {
    YuCard,
    MenuItem
  },
  methods: {
    editProfile() {
      uni.showToast({
        title: '编辑功能开发中...',
        icon: 'none'
      })
    },
    notificationSettings() {
      uni.showToast({
        title: '通知设置开发中...',
        icon: 'none'
      })
    },
    shareApp() {
      uni.showToast({
        title: '分享功能开发中...',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.settings-menu {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}

.menu-section {
  .section-title {
    font-size: $font-lg;
    font-weight: $font-bold;
    color: $yu-black;
  }
}

.menu-list {
  display: flex;
  flex-direction: column;
}
</style>
