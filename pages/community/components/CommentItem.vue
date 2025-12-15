<template>
  <view class="comment-item">
    <YuAvatar 
      :text="comment.author"
      :color="comment.avatarColor"
      size="sm"
    />
    
    <view class="comment-content">
      <view class="comment-header">
        <text class="comment-author">{{ comment.author }}</text>
        <text class="comment-time">{{ comment.time }}</text>
      </view>
      
      <text class="comment-text">{{ comment.content }}</text>
      
      <view class="comment-actions">
        <YuButton
          type="text"
          size="sm"
          icon="heart"
          @click="toggleLike"
        >
          {{ likes }}
        </YuButton>
        
        <YuButton
          type="text"
          size="sm"
          @click="reply"
        >
          回复
        </YuButton>
      </view>
    </view>
  </view>
</template>

<script>
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuButton from '@/components/YuButton/YuButton.vue'

export default {
  name: 'CommentItem',
  components: {
    YuAvatar,
    YuButton
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      likes: Math.floor(Math.random() * 10),
      isLiked: false
    }
  },
  methods: {
    toggleLike() {
      this.isLiked = !this.isLiked
      this.likes += this.isLiked ? 1 : -1
      
      if (this.isLiked) {
        uni.vibrateShort({ type: 'light' })
      }
    },
    reply() {
      uni.showToast({
        title: '回复功能开发中...',
        icon: 'none'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.comment-item {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-lg;
  background: $yu-white;
  border-radius: $radius-2xl;
  @include shadow('sm');
}

.comment-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
}

.comment-header {
  @include flex-center-y;
  gap: $spacing-md;
}

.comment-author {
  font-size: $font-base;
  font-weight: $font-semibold;
  color: $yu-black;
}

.comment-time {
  font-size: $font-xs;
  color: $yu-light-gray;
}

.comment-text {
  font-size: $font-base;
  line-height: 1.5;
  color: $yu-black;
  word-wrap: break-word;
}

.comment-actions {
  @include flex-center-y;
  gap: $spacing-lg;
  margin-top: $spacing-sm;
}
</style>
