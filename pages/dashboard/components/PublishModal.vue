<template>
  <view v-if="visible" class="publish-modal">
    <!-- 遮罩层 -->
    <view class="modal-mask" @click="handleClose"></view>
    
    <!-- 弹窗内容 -->
    <view class="modal-content">
      <!-- 标题栏 -->
      <view class="modal-header">
        <text class="modal-title">今天怎么打？</text>
        <view class="close-btn" @click="handleClose">
          <YuIcon name="XCircle" :size="40" color="#9ca3af" />
        </view>
      </view>

      <!-- 表单区域 -->
      <view class="form-section">
        <!-- 所在场馆 -->
        <view class="form-item">
          <view class="form-label">
            <YuIcon name="MapPin" :size="24" color="#9ca3af" />
            <text class="label-text">所在场馆</text>
          </view>
          <view class="input-wrapper">
            <input 
              v-model="venue"
              class="form-input"
              placeholder="输入场馆名称"
              placeholder-class="input-placeholder"
            />
            <view class="search-icon">
              <YuIcon name="Search" :size="32" color="#9ca3af" />
            </view>
          </view>
          <!-- 快捷选择 -->
          <scroll-view scroll-x class="quick-select">
            <view 
              v-for="v in venueOptions" 
              :key="v"
              class="quick-btn"
              :class="{ active: venue === v }"
              @click="venue = v"
            >
              <text class="quick-btn-text">{{ v }}</text>
            </view>
          </scroll-view>
        </view>

        <!-- 具体位置 -->
        <view class="form-item">
          <view class="form-label">
            <YuIcon name="ArrowDownCircle" :size="24" color="#9ca3af" />
            <text class="label-text">具体位置</text>
          </view>
          <input 
            v-model="location"
            class="form-input"
            placeholder="例如：3号场、大厅、休息区"
            placeholder-class="input-placeholder"
          />
          <!-- 快捷选择 -->
          <scroll-view scroll-x class="quick-select">
            <view 
              v-for="loc in locationOptions" 
              :key="loc"
              class="quick-btn location-btn"
              @click="location = loc"
            >
              <text class="quick-btn-text">{{ loc }}</text>
            </view>
          </scroll-view>
        </view>
      </view>

      <!-- 意图选择 -->
      <view class="intent-grid">
        <view 
          v-for="intent in intentOptions" 
          :key="intent.value"
          class="intent-item"
          @click="handlePublish(intent.value)"
        >
          <YuIcon :name="intent.icon" :size="48" :color="intent.color" />
          <text class="intent-text">{{ intent.label }}</text>
        </view>
      </view>

      <!-- 提示文本 -->
      <view class="tip-text">
        <text>发布后，超过60分钟无操作将自动下线</text>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'PublishModal',
  components: {
    YuIcon
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    defaultVenue: {
      type: String,
      default: '李宁羽毛球中心'
    },
    defaultLocation: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      venue: this.defaultVenue,
      location: this.defaultLocation,
      venueOptions: ['李宁羽毛球中心', '飞扬羽毛球馆', '奥体中心'],
      locationOptions: ['3号场', '5号场', '休息区', '大厅', '更衣室'],
      intentOptions: [
        { value: 'SINGLES', label: '求单打', icon: 'Sword', color: '#fb923c' },
        { value: 'DOUBLES', label: '缺双打', icon: 'Users', color: '#3b82f6' },
        { value: 'TRAINING', label: '练球', icon: 'Dumbbell', color: '#10b981' },
        { value: 'ANY', label: '随便打', icon: 'Activity', color: '#6b7280' }
      ]
    }
  },
  watch: {
    defaultVenue(val) {
      this.venue = val
    },
    defaultLocation(val) {
      this.location = val
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handlePublish(intent) {
      if (!this.venue) {
        uni.showToast({
          title: '请先选择或输入所在球馆',
          icon: 'none'
        })
        return
      }
      
      this.$emit('publish', {
        intent,
        venue: this.venue,
        location: this.location
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.publish-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
}

.modal-content {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 750rpx;
  background: white;
  border-radius: 64rpx 64rpx 0 0;
  padding: 48rpx 48rpx 64rpx;
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
}

.modal-title {
  font-size: 40rpx;
  font-weight: 900;
  color: #1a1a1a;
  font-style: italic;
}

.close-btn {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 50%;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.9);
    background: #e5e7eb;
  }
}

.form-section {
  margin-bottom: 48rpx;
}

.form-item {
  margin-bottom: 32rpx;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8rpx;
  margin-bottom: 16rpx;
}

.label-text {
  font-size: 24rpx;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 2rpx;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  background: #f9fafb;
  border: 2rpx solid #f3f4f6;
  border-radius: 24rpx;
  padding: 24rpx 32rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: #1a1a1a;
  
  &:focus {
    background: white;
    border-color: #ccf381;
  }
}

.search-icon {
  position: absolute;
  left: 24rpx;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.input-wrapper .form-input {
  padding-left: 80rpx;
}

.input-placeholder {
  color: #d1d5db;
  font-weight: 500;
}

.quick-select {
  display: flex;
  gap: 16rpx;
  margin-top: 16rpx;
  white-space: nowrap;
}

.quick-btn {
  display: inline-flex;
  padding: 12rpx 24rpx;
  background: white;
  border: 2rpx solid #f3f4f6;
  border-radius: 16rpx;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.95);
  }
  
  &.active {
    background: #1a1a1a;
    border-color: #1a1a1a;
    
    .quick-btn-text {
      color: #ccf381;
    }
  }
}

.location-btn {
  border-color: #e5e7eb;
  
  &:active {
    background: #f3f4f6;
  }
}

.quick-btn-text {
  font-size: 20rpx;
  font-weight: 700;
  color: #6b7280;
  white-space: nowrap;
}

.intent-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24rpx;
  margin-bottom: 32rpx;
}

.intent-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 32rpx;
  background: white;
  border: 2rpx solid #e5e7eb;
  border-radius: 32rpx;
  height: 160rpx;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.95);
    border-color: #9ca3af;
  }
}

.intent-text {
  font-size: 24rpx;
  font-weight: 700;
  color: #6b7280;
}

.tip-text {
  text-align: center;
  
  text {
    font-size: 20rpx;
    color: #9ca3af;
    font-weight: 700;
  }
}
</style>
