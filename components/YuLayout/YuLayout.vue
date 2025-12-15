<template>
  <view class="yu-layout" :style="{ paddingTop: safeAreaTop + 'px' }">
    <slot />
    
    <!-- 全局 TabBar -->
    <YuTabBar v-if="showTabBar" />
  </view>
</template>

<script>
import YuTabBar from '../YuTabBar/YuTabBar.vue'

export default {
  name: 'YuLayout',
  components: {
    YuTabBar
  },
  props: {
    showTabBar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      safeAreaTop: 0
    }
  },
  created() {
    this.getSafeArea()
  },
  methods: {
    getSafeArea() {
      const systemInfo = uni.getSystemInfoSync()
      this.safeAreaTop = systemInfo.safeAreaInsets?.top || systemInfo.statusBarHeight || 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.yu-layout {
  min-height: 100vh;
  background: $yu-bg;
  position: relative;
}
</style>
