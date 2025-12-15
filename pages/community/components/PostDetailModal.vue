<template>
  <view class="post-detail-modal animate-slide-up">
    <!-- 头部导航 -->
    <view class="modal-header glass-light">
      <YuButton 
        type="ghost" 
        size="sm" 
        icon="chevron-left"
        @click="$emit('close')"
      >
        返回
      </YuButton>
      <text class="modal-title">动态详情</text>
      <YuButton 
        type="ghost" 
        size="sm" 
        icon="share"
        @click="sharePost"
      />
    </view>
    
    <!-- 内容区域 -->
    <scroll-view scroll-y class="modal-content">
      <!-- 帖子详情 -->
      <view class="post-detail">
        <PostCard 
          :post="post"
          @like="$emit('like', post)"
          @comment="focusCommentInput"
          @share="sharePost"
        />
      </view>
      
      <!-- 评论区域 -->
      <view class="comments-section">
        <view class="comments-header">
          <text class="comments-title">评论 {{ comments.length }}</text>
        </view>
        
        <view v-if="comments.length === 0" class="empty-comments">
          <YuIcon name="chat" size="xl" color="#ccc" />
          <text class="empty-text">还没有评论，来抢沙发吧～</text>
        </view>
        
        <view v-else class="comments-list">
          <CommentItem
            v-for="comment in comments"
            :key="comment.id"
            :comment="comment"
          />
        </view>
      </view>
    </scroll-view>
    
    <!-- 评论输入框 -->
    <view class="comment-input-section glass-light">
      <view class="input-container">
        <YuAvatar text="我" color="brand" size="sm" />
        <input 
          v-model="newComment"
          class="comment-input"
          placeholder="说点什么..."
          :focus="inputFocused"
          @confirm="submitComment"
        />
        <YuButton
          type="primary"
          size="sm"
          :disabled="!newComment.trim()"
          @click="submitComment"
        >
          发送
        </YuButton>
      </view>
    </view>
  </view>
</template>

<script>
import YuButton from '@/components/YuButton/YuButton.vue'
import YuAvatar from '@/components/YuAvatar/YuAvatar.vue'
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import PostCard from './PostCard.vue'
import CommentItem from './CommentItem.vue'

export default {
  name: 'PostDetailModal',
  components: {
    YuButton,
    YuAvatar,
    YuIcon,
    PostCard,
    CommentItem
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    comments: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      newComment: '',
      inputFocused: false
    }
  },
  methods: {
    sharePost() {
      uni.showToast({
        title: '分享功能开发中...',
        icon: 'none'
      })
    },
    focusCommentInput() {
      this.inputFocused = true
    },
    submitComment() {
      if (!this.newComment.trim()) return
      
      this.$emit('comment', {
        content: this.newComment.trim()
      })
      
      this.newComment = ''
      this.inputFocused = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.post-detail-modal {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  background: $yu-bg;
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
  padding-bottom: 200rpx; // 为输入框留空间
}

.post-detail {
  padding: $spacing-xl;
}

.comments-section {
  padding: 0 $spacing-xl $spacing-xl;
}

.comments-header {
  padding: $spacing-lg 0;
  border-bottom: 2rpx solid #f0f0f0;
  margin-bottom: $spacing-lg;
}

.comments-title {
  font-size: $font-lg;
  font-weight: $font-semibold;
  color: $yu-black;
}

.empty-comments {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-lg;
  padding: $spacing-3xl 0;
  
  .empty-text {
    font-size: $font-base;
    color: $yu-light-gray;
  }
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
}

.comment-input-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 2rpx solid #f0f0f0;
  @include safe-area-bottom($spacing-lg);
}

.input-container {
  @include flex-center-y;
  gap: $spacing-md;
  padding: $spacing-lg $spacing-xl;
}

.comment-input {
  flex: 1;
  @include input-base;
  padding: $spacing-md $spacing-lg;
  font-size: $font-base;
  border: none;
  outline: none;
}
</style>
