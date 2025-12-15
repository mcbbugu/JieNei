<template>
  <YuCard clickable @click="$emit('click', post)" class="post-card animate-fade-in">
    <!-- 帖子头部 -->
    <template #header>
      <view class="post-header">
        <view class="author-info">
          <YuAvatar 
            :text="post.author"
            :color="post.avatarColor"
            size="md"
          />
          <view class="author-details">
            <text class="author-name">{{ post.author }}</text>
            <view class="post-meta">
              <text class="post-time">{{ post.time }}</text>
              <view v-if="post.tag" class="post-tag">
                <text>#{{ post.tag }}</text>
              </view>
            </view>
          </view>
        </view>
        
        <YuButton
          type="text"
          size="sm"
          icon="more"
          @click.stop="showMore"
        />
      </view>
    </template>

    <!-- 帖子内容 -->
    <view class="post-content">
      <text class="content-text">{{ post.content }}</text>
      
      <!-- 图片网格 -->
      <ImageGrid 
        v-if="post.images && post.images.length > 0"
        :images="post.images"
        @preview="previewImage"
      />
    </view>

    <!-- 帖子底部 -->
    <template #footer>
      <view class="post-actions">
        <YuButton
          :type="post.isLiked ? 'primary' : 'text'"
          size="sm"
          icon="heart"
          @click.stop="$emit('like', post)"
          class="action-btn"
        >
          {{ post.likes }}
        </YuButton>
        
        <YuButton
          type="text"
          size="sm"
          icon="chat"
          @click.stop="$emit('comment', post)"
          class="action-btn"
        >
          {{ post.comments }}
        </YuButton>
        
        <YuButton
          type="text"
          size="sm"
          icon="share"
          @click.stop="$emit('share', post)"
          class="action-btn"
        />
      </view>
    </template>
  </YuCard>
</template>

<script>
import YuCard from '@/components/YuCard/YuCard.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuButton from '@/components/YuButton/YuButton.vue'
import ImageGrid from './ImageGrid.vue'

export default {
  name: 'PostCard',
  components: {
    YuCard,
    YuAvatar,
    YuButton,
    ImageGrid
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    showMore() {
      uni.showActionSheet({
        itemList: ['举报', '屏蔽用户'],
        success: (res) => {
          console.log('选择了第' + (res.tapIndex + 1) + '个选项')
        }
      })
    },
    previewImage(imageUrl, images) {
      uni.previewImage({
        current: imageUrl,
        urls: images
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.post-card {
  position: relative;
  overflow: visible;
}

.post-header {
  @include flex-center-y;
  justify-content: space-between;
}

.author-info {
  @include flex-center-y;
  gap: $spacing-md;
  flex: 1;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.author-name {
  font-size: $font-base;
  font-weight: $font-semibold;
  color: $yu-black;
}

.post-meta {
  @include flex-center-y;
  gap: $spacing-sm;
}

.post-time {
  font-size: $font-xs;
  color: $yu-light-gray;
}

.post-tag {
  @include tag(rgba($yu-brand, 0.1), $yu-brand-dark);
}

.post-content {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.content-text {
  font-size: $font-base;
  line-height: 1.6;
  color: $yu-black;
  word-wrap: break-word;
}

.post-actions {
  @include flex-center-y;
  gap: $spacing-xl;
}

.action-btn {
  flex: 1;
  
  &:first-child {
    // 点赞按钮特殊样式
    transition: all $duration-normal $ease-out;
    
    &:active {
      transform: scale(1.1);
    }
  }
}
</style>
