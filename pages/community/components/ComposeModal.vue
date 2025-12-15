<template>
  <view class="compose-modal animate-slide-up">
    <!-- 模态头部 -->
    <view class="modal-header glass-light">
      <YuButton 
        type="text" 
        size="sm"
        @click="$emit('close')"
      >
        取消
      </YuButton>
      <text class="modal-title">发布动态</text>
      <YuButton 
        type="primary" 
        size="sm"
        :disabled="!canPublish"
        @click="handlePublish"
      >
        发布
      </YuButton>
    </view>
    
    <!-- 内容区域 -->
    <view class="modal-content">
      <!-- 用户信息 -->
      <view class="user-info">
        <YuAvatar text="我" color="brand" size="lg" />
        <view class="user-details">
          <text class="username">我</text>
          <text class="user-desc">分享你的羽球时光</text>
        </view>
      </view>
      
      <!-- 输入区域 -->
      <textarea 
        v-model="content"
        class="content-input"
        placeholder="分享你的羽球心得、装备体验或精彩瞬间..."
        :maxlength="500"
        auto-height
        :focus="true"
      />
      
      <!-- 字数统计 -->
      <view class="char-count">
        <text :class="{ 'text-error': content.length > 450 }">
          {{ content.length }}/500
        </text>
      </view>
      
      <!-- 图片选择 -->
      <view class="image-section">
        <view class="selected-images" v-if="selectedImages.length > 0">
          <view 
            v-for="(image, index) in selectedImages"
            :key="index"
            class="image-item"
          >
            <image :src="image" class="preview-image" mode="aspectFill" />
            <view class="remove-btn" @click="removeImage(index)">
              <YuIcon name="close" size="xs" color="#fff" />
            </view>
          </view>
        </view>
        
        <YuButton
          v-if="selectedImages.length < 9"
          type="secondary"
          size="sm"
          icon="image"
          @click="chooseImages"
        >
          添加图片 ({{ selectedImages.length }}/9)
        </YuButton>
      </view>
      
      <!-- 话题选择 -->
      <view class="topic-section">
        <text class="section-title">选择话题</text>
        <view class="topics-grid">
          <view 
            v-for="topic in topics"
            :key="topic"
            class="topic-tag"
            :class="{ 'topic-tag--active': selectedTopic === topic }"
            @click="toggleTopic(topic)"
          >
            <text>#{{ topic }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuButton from '@/components/YuButton/YuButton.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'ComposeModal',
  components: {
    YuButton,
    YuAvatar,
    YuIcon
  },
  data() {
    return {
      content: '',
      selectedImages: [],
      selectedTopic: '',
      topics: ['装备党', '训练日志', '技术分享', '比赛记录', '球馆推荐', '约球', '日常']
    }
  },
  computed: {
    canPublish() {
      return this.content.trim().length > 0 && this.content.length <= 500
    }
  },
  methods: {
    handlePublish() {
      if (!this.canPublish) return
      
      const postData = {
        content: this.content.trim(),
        images: this.selectedImages,
        topic: this.selectedTopic
      }
      
      this.$emit('publish', postData)
    },
    chooseImages() {
      const maxCount = 9 - this.selectedImages.length
      
      uni.chooseImage({
        count: maxCount,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.selectedImages.push(...res.tempFilePaths)
        }
      })
    },
    removeImage(index) {
      this.selectedImages.splice(index, 1)
    },
    toggleTopic(topic) {
      this.selectedTopic = this.selectedTopic === topic ? '' : topic
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.compose-modal {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: $yu-white;
  display: flex;
  flex-direction: column;
}

.modal-header {
  @include flex-center-y;
  justify-content: space-between;
  padding: $spacing-lg $spacing-xl;
  @include safe-area-top($spacing-lg);
  border-bottom: 2rpx solid #f0f0f0;
}

.modal-title {
  font-size: $font-xl;
  font-weight: $font-bold;
  color: $yu-black;
}

.modal-content {
  flex: 1;
  padding: $spacing-xl;
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}

.user-info {
  @include flex-center-y;
  gap: $spacing-md;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.username {
  font-size: $font-lg;
  font-weight: $font-semibold;
  color: $yu-black;
}

.user-desc {
  font-size: $font-sm;
  color: $yu-light-gray;
}

.content-input {
  @include input-base;
  min-height: 200rpx;
  padding: $spacing-lg;
  font-size: $font-base;
  line-height: 1.6;
  resize: none;
  border: none;
  outline: none;
}

.char-count {
  text-align: right;
  
  text {
    font-size: $font-sm;
    color: $yu-light-gray;
    
    &.text-error {
      color: $error;
    }
  }
}

.image-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.selected-images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: $radius-md;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
}

.remove-btn {
  position: absolute;
  top: $spacing-xs;
  right: $spacing-xs;
  width: 48rpx;
  height: 48rpx;
  @include flex-center;
  background: rgba($yu-black, 0.6);
  border-radius: 50%;
  cursor: pointer;
}

.topic-section {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.section-title {
  font-size: $font-base;
  font-weight: $font-semibold;
  color: $yu-black;
}

.topics-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
}

.topic-tag {
  @include tag;
  cursor: pointer;
  transition: all $duration-normal $ease-out;
  
  &--active {
    background: $yu-brand;
    color: $yu-black;
  }
  
  &:active {
    transform: scale(0.95);
  }
}
</style>
