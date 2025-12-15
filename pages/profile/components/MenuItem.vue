<template>
  <view 
    class="menu-item"
    :class="{ 'menu-item--danger': danger }"
    @click="handleClick"
  >
    <view class="menu-icon" :class="{ 'menu-icon--danger': danger }">
      <YuIcon :name="icon" size="md" />
    </view>
    
    <view class="menu-content">
      <text class="menu-title">{{ title }}</text>
      <text v-if="desc" class="menu-desc">{{ desc }}</text>
    </view>
    
    <YuIcon 
      name="chevron-right" 
      size="sm" 
      :color="danger ? '#ef4444' : '#999'" 
    />
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'MenuItem',
  components: {
    YuIcon
  },
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      default: ''
    },
    danger: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.menu-item {
  @include flex-center-y;
  gap: $spacing-md;
  padding: $spacing-lg 0;
  border-bottom: 2rpx solid #f5f5f5;
  cursor: pointer;
  transition: all $duration-normal $ease-out;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    background: rgba($yu-gray, 0.05);
  }
  
  &--danger {
    &:active {
      background: rgba($error, 0.05);
    }
  }
}

.menu-icon {
  width: 80rpx;
  height: 80rpx;
  @include flex-center;
  border-radius: 50%;
  background: #f5f5f5;
  color: $yu-gray;
  flex-shrink: 0;
  
  &--danger {
    background: rgba($error, 0.1);
    color: $error;
  }
}

.menu-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.menu-title {
  font-size: $font-base;
  font-weight: $font-semibold;
  color: $yu-black;
  
  .menu-item--danger & {
    color: $error;
  }
}

.menu-desc {
  font-size: $font-sm;
  color: $yu-light-gray;
}
</style>
