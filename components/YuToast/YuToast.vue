<template>
  <view 
    v-if="visible"
    class="yu-toast animate-slide-up"
    :class="[`yu-toast--${type}`]"
    @click="handleClick"
  >
    <YuIcon 
      :name="iconName" 
      size="sm" 
      class="yu-toast__icon"
    />
    <text class="yu-toast__message">{{ message }}</text>
    <YuIcon 
      v-if="closable"
      name="close" 
      size="xs" 
      class="yu-toast__close"
      clickable
      @click="handleClose"
    />
  </view>
</template>

<script>
import YuIcon from '../YuIcon/YuIcon.vue'

export default {
  name: 'YuToast',
  components: {
    YuIcon
  },
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: value => ['success', 'error', 'warning', 'info'].includes(value)
    },
    duration: {
      type: Number,
      default: 3000
    },
    closable: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    iconName() {
      const iconMap = {
        success: 'check',
        error: 'error',
        warning: 'warning',
        info: 'info'
      }
      return iconMap[this.type] || 'info'
    }
  },
  mounted() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.handleClose()
      }, this.duration)
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.yu-toast {
  position: fixed;
  top: 200rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: $z-toast;
  
  @include flex-center-y;
  gap: $spacing-md;
  padding: $spacing-lg $spacing-xl;
  border-radius: $radius-full;
  font-size: $font-base;
  font-weight: $font-semibold;
  @include shadow('lg');
  backdrop-filter: $blur;
  max-width: 80%;
  
  &--success {
    background: rgba($success, 0.9);
    color: $yu-white;
  }
  
  &--error {
    background: rgba($error, 0.9);
    color: $yu-white;
  }
  
  &--warning {
    background: rgba($warning, 0.9);
    color: $yu-white;
  }
  
  &--info {
    background: rgba($yu-black, 0.9);
    color: $yu-brand;
  }
  
  &__icon {
    flex-shrink: 0;
  }
  
  &__message {
    flex: 1;
    text-align: center;
  }
  
  &__close {
    flex-shrink: 0;
    opacity: 0.7;
    
    &:active {
      opacity: 1;
    }
  }
}
</style>
