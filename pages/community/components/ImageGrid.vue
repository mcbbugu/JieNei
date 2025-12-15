<template>
  <view class="image-grid" :class="gridClass">
    <view 
      v-for="(image, index) in displayImages" 
      :key="index"
      class="image-item"
      :class="itemClass(index)"
      @click="$emit('preview', image, images)"
    >
      <image 
        :src="image" 
        class="grid-image"
        mode="aspectFill"
        :lazy-load="true"
        @error="handleImageError"
      />
      
      <!-- 多图时显示数量 -->
      <view v-if="images.length > 4 && index === 3" class="more-overlay">
        <text class="more-text">+{{ images.length - 4 }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ImageGrid',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    gridClass() {
      const count = Math.min(this.images.length, 4)
      return `image-grid--${count}`
    },
    displayImages() {
      return this.images.slice(0, 4)
    }
  },
  methods: {
    itemClass(index) {
      const count = Math.min(this.images.length, 4)
      return `image-item--${count}-${index}`
    },
    handleImageError(e) {
      console.error('图片加载失败:', e)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.image-grid {
  display: grid;
  gap: $spacing-sm;
  border-radius: $radius-lg;
  overflow: hidden;
  
  &--1 {
    grid-template-columns: 1fr;
    max-height: 400rpx;
  }
  
  &--2 {
    grid-template-columns: 1fr 1fr;
    height: 240rpx;
  }
  
  &--3 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 320rpx;
    
    .image-item--3-0 {
      grid-row: 1 / 3;
    }
  }
  
  &--4 {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    height: 320rpx;
  }
}

.image-item {
  position: relative;
  overflow: hidden;
  border-radius: $radius-md;
  background: #f5f5f5;
  cursor: pointer;
  transition: transform $duration-fast $ease-out;
  
  &:active {
    transform: scale(0.98);
  }
}

.grid-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.more-overlay {
  position: absolute;
  inset: 0;
  @include flex-center;
  background: rgba($yu-black, 0.6);
  
  .more-text {
    font-size: $font-2xl;
    font-weight: $font-bold;
    color: $yu-white;
  }
}
</style>
