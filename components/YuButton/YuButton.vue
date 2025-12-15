<template>
  <button 
    class="yu-button"
    :class="[
      `yu-button--${type}`,
      `yu-button--${size}`,
      {
        'yu-button--loading': loading,
        'yu-button--disabled': disabled,
        'yu-button--block': block,
        'yu-button--round': round
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <YuIcon 
      v-if="loading" 
      name="loading" 
      class="yu-button__loading animate-spin" 
    />
    <YuIcon 
      v-else-if="icon" 
      :name="icon" 
      class="yu-button__icon" 
    />
    <text v-if="$slots.default" class="yu-button__text">
      <slot></slot>
    </text>
    <YuIcon 
      v-if="suffixIcon" 
      :name="suffixIcon" 
      class="yu-button__suffix-icon" 
    />
  </button>
</template>

<script>
import YuIcon from '../YuIcon/YuIcon.vue'

export default {
  name: 'YuButton',
  components: {
    YuIcon
  },
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'ghost', 'text'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.yu-button {
  @include button-base;
  
  &--primary {
    @include button-primary;
  }
  
  &--secondary {
    @include button-secondary;
  }
  
  &--ghost {
    background: transparent;
    color: $yu-black;
    border: 2rpx solid $yu-black;
    
    &:active {
      background: rgba($yu-black, 0.05);
    }
  }
  
  &--text {
    background: transparent;
    color: $yu-gray;
    box-shadow: none;
    
    &:active {
      background: rgba($yu-gray, 0.1);
    }
  }
  
  &--sm {
    padding: $spacing-md $spacing-lg;
    font-size: $font-sm;
    border-radius: $radius-lg;
  }
  
  &--md {
    padding: $spacing-lg $spacing-xl;
    font-size: $font-base;
    border-radius: $radius-xl;
  }
  
  &--lg {
    padding: $spacing-xl $spacing-2xl;
    font-size: $font-lg;
    border-radius: $radius-2xl;
  }
  
  &--block {
    width: 100%;
  }
  
  &--round {
    border-radius: $radius-full;
  }
  
  &--loading {
    cursor: not-allowed;
    
    .yu-button__text {
      opacity: 0.7;
    }
  }
  
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:active {
      transform: none;
    }
  }
  
  &__loading {
    margin-right: $spacing-sm;
  }
  
  &__icon {
    margin-right: $spacing-sm;
  }
  
  &__suffix-icon {
    margin-left: $spacing-sm;
  }
  
  &__text {
    flex: 1;
    text-align: center;
  }
}
</style>
