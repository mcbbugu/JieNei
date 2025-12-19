<template>
  <view class="community">
    <!-- 自定义头部 -->
    <view class="community-header">
      <view class="header-tabs">
        <YuButton v-for="tab in tabs" :key="tab.key" :type="activeTab === tab.key ? 'primary' : 'text'" size="sm"
          @click="switchTab(tab.key)">
          {{ tab.label }}
        </YuButton>
      </view>

      <YuButton type="primary" size="sm" icon="plus" round @click="showCompose = true" />
    </view>

    <!-- 帖子列表 -->
    <view class="community-content">
      <scroll-view scroll-y class="post-list no-scrollbar" enhanced :show-scrollbar="false" @scrolltolower="loadMore">
        <!-- 加载状态 -->
        <view v-if="loading" class="loading-container">
          <PostSkeleton v-for="i in 3" :key="i" />
        </view>

        <!-- 帖子列表 -->
        <view v-else class="posts-container">
          <PostCard v-for="post in posts" :key="post.id" :post="post" @like="toggleLike" @comment="openComments"
            @share="sharePost" @click="openPostDetail" />
        </view>

        <!-- 加载更多 -->
        <view v-if="hasMore" class="load-more">
          <text class="load-more-text">加载更多...</text>
        </view>
      </scroll-view>
    </view>

    <!-- 发布弹窗 -->
    <ComposeModal v-if="showCompose" @close="showCompose = false" @publish="handlePublish" />

    <!-- 帖子详情 -->
    <PostDetailModal v-if="selectedPost" :post="selectedPost" :comments="comments" @close="selectedPost = null"
      @like="toggleLike" @comment="addComment" />

    <!-- Toast 提示 -->
    <YuToast v-if="toast.visible" :message="toast.msg" :type="toast.type" @close="toast.visible = false" />
  </view>
</template>

<script>
import YuButton from '@/components/YuButton/YuButton.vue'
import YuToast from '@/components/YuToast/YuToast.vue'
import PostCard from './components/PostCard.vue'
import PostSkeleton from './components/PostSkeleton.vue'
import ComposeModal from './components/ComposeModal.vue'
import PostDetailModal from './components/PostDetailModal.vue'

const MOCK_POSTS = [
  {
    id: '101',
    authorId: 'u1',
    author: '羽球小将',
    avatarColor: 'orange',
    content: '终于提到了这把梦中情拍！Yonex 100ZZ 古红色，颜值真的太顶了。拉了28磅，今晚去球馆试手感，求轻虐！🏸🔥',
    time: '10分钟前',
    likes: 128,
    comments: 3,
    isLiked: false,
    tag: '装备党',
    images: [
      'https://images.unsplash.com/photo-1626224583764-847860719002?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1613918108466-292b78a8ef95?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: '102',
    authorId: 'u2',
    author: 'Momo',
    avatarColor: 'pink',
    content: '今天的双打太激烈了，连赢三场！感觉步伐比之前轻盈了很多，特训果然有效果。💪',
    time: '2小时前',
    likes: 34,
    comments: 0,
    isLiked: true,
    tag: '训练日志',
    images: []
  },
  {
    id: '103',
    authorId: 'u3',
    author: '网前杀手',
    avatarColor: 'blue',
    content: '分享一个网前小技巧：放网时手腕要柔和，球拍面稍微向上倾斜，这样球会有一个小弧度，对手很难接到。配个慢动作视频给大家看看～',
    time: '1天前',
    likes: 89,
    comments: 12,
    isLiked: false,
    tag: '技术分享',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800'
    ]
  }
]

const MOCK_COMMENTS = [
  { id: 1, author: '球友A', content: '这个技巧太实用了！', time: '1小时前', avatarColor: 'green' },
  { id: 2, author: '球友B', content: '学到了，明天就去试试', time: '30分钟前', avatarColor: 'purple' },
  { id: 3, author: '球友C', content: '视频能再慢一点吗？', time: '10分钟前', avatarColor: 'blue' }
]

export default {
  name: 'Community',
  components: {
    YuButton,
    YuToast,
    PostCard,
    PostSkeleton,
    ComposeModal,
    PostDetailModal
  },
  data() {
    return {
      activeTab: 'RECOMMEND',
      tabs: [
        { key: 'RECOMMEND', label: '推荐' },
        { key: 'FOLLOWING', label: '关注' }
      ],
      posts: [],
      comments: [],
      loading: true,
      hasMore: true,
      selectedPost: null,
      showCompose: false,
      toast: {
        msg: '',
        type: 'info',
        visible: false
      }
    }
  },
  onLoad() {
    this.loadPosts()
  },
  onShow() {
    // 更新 tabBar 状态
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
  },
  methods: {
    async loadPosts() {
      try {
        // 模拟加载延迟
        await new Promise(resolve => setTimeout(resolve, 1000))

        this.posts = MOCK_POSTS
        this.loading = false
      } catch (error) {
        console.error('加载帖子失败:', error)
        this.showToast('加载失败，请重试', 'error')
        this.loading = false
      }
    },
    switchTab(tab) {
      this.activeTab = tab
      this.loadPosts()
    },
    toggleLike(post) {
      const index = this.posts.findIndex(p => p.id === post.id)
      if (index !== -1) {
        this.posts[index].isLiked = !this.posts[index].isLiked
        this.posts[index].likes += this.posts[index].isLiked ? 1 : -1

        // 触觉反馈
        if (this.posts[index].isLiked) {
          uni.vibrateShort({ type: 'light' })
        }
      }
    },
    openComments(post) {
      this.selectedPost = post
      this.comments = MOCK_COMMENTS
    },
    openPostDetail(post) {
      this.selectedPost = post
      this.comments = MOCK_COMMENTS
    },
    sharePost(post) {
      this.showToast('分享功能开发中...', 'info')
    },
    handlePublish(postData) {
      // 添加新帖子到列表顶部
      const newPost = {
        id: Date.now().toString(),
        authorId: 'current_user',
        author: '我',
        avatarColor: 'brand',
        content: postData.content,
        time: '刚刚',
        likes: 0,
        comments: 0,
        isLiked: false,
        tag: postData.topic || '日常',
        images: postData.images || []
      }

      this.posts.unshift(newPost)
      this.showCompose = false
      this.showToast('发布成功！', 'success')
    },
    addComment(commentData) {
      const newComment = {
        id: Date.now(),
        author: '我',
        content: commentData.content,
        time: '刚刚',
        avatarColor: 'brand'
      }

      this.comments.unshift(newComment)

      // 更新帖子评论数
      if (this.selectedPost) {
        const index = this.posts.findIndex(p => p.id === this.selectedPost.id)
        if (index !== -1) {
          this.posts[index].comments++
        }
      }

      this.showToast('评论成功！', 'success')
    },
    loadMore() {
      if (!this.hasMore || this.loading) return

      // 模拟加载更多
      setTimeout(() => {
        this.hasMore = false
      }, 1000)
    },
    showToast(msg, type = 'info') {
      this.toast = { msg, type, visible: true }
      setTimeout(() => {
        this.toast.visible = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.community {
  min-height: 100vh;
  background: $yu-bg;
}

.community-header {
  @include flex-center-y;
  justify-content: space-between;
  padding: $spacing-lg $spacing-xl;
  @include safe-area-top($spacing-lg);
  @include glass($glass-light);
  border-bottom: 2rpx solid #f0f0f0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-sticky;
}

.header-tabs {
  @include flex-center-y;
  gap: $spacing-md;
}

.community-content {
  margin-top: 160rpx;
  margin-bottom: 160rpx;
  padding-top: env(safe-area-inset-top);
}

.post-list {
  height: calc(100vh - 320rpx);
}

.loading-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  padding: $spacing-xl;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  padding: $spacing-xl;
}

.load-more {
  @include flex-center;
  padding: $spacing-xl;

  .load-more-text {
    font-size: $font-sm;
    color: $yu-light-gray;
  }
}
</style>