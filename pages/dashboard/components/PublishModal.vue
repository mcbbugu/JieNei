<template>
  <view class="modal-overlay" @click="$emit('close')">
    <view class="modal-content animate-slide-up" @click.stop>
      <!-- 拖拽指示器 -->
      <view class="drag-indicator"></view>
      
      <!-- 标题 -->
      <view class="modal-header">
        <text class="modal-title">今天怎么打？</text>
        <view class="close-btn" @click="$emit('close')">
          <YuIcon name="XCircle" :size="40" color="#9ca3af" />
        </view>
      </view>
      
      <!-- 表单内容 -->
      <view class="modal-body">
        <!-- 场馆选择 -->
        <view class="form-section">
          <view class="form-label">
            <YuIcon name="MapPin" :size="24" color="#9ca3af" />
            <text>所在场馆</text>
          </view>
          <view class="input-wrapper">
            <input 
              class="form-input"
              :value="venue"
              @input="handleVenueInput"
              placeholder="输入场馆名称"
            />
            <view class="input-icon">
              <YuIcon name="Search" :size="32" color="#9ca3af" />
            </view>
          </view>
          <view class="quick-options">
            <view 
              v-for="v in venueOptions" 
              :key="v"
              class="quick-option"
              :class="{ active: venue === v }"
              @click="$emit('update:venue', v)"
            >
              <text>{{ v }}</text>
            </view>
          </view>
        </view>
        
        <!-- 位置选择 -->
        <view class="form-section">
          <view class="form-label">
            <YuIcon name="ArrowDownCircle" :size="24" color="#9ca3af" />
            <text>具体位置</text>
          </view>
          <input 
            class="form-input"
            :value="location"
            @input="handleLocationInput"
            placeholder="例如：3号场、大厅、休息区"
          />
          <view class="quick-options">
            <view 
              v-for="loc in locationOptions" 
              :key="loc"
              class="quick-option"
              @click="$emit('update:location', loc)"
            >
              <text>{{ loc }}</text>
            </view>
          </view>
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
          <YuIcon :name="intent.icon" :size="48" color="#6b7280" />
          <text class="intent-text">{{ intent.label }}</text>
        </view>
      </view>
      
      <!-- 提示文字 -->
      <view class="modal-footer">
        <text class="footer-text">发布后，超过60分钟无操作将自动下线</text>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'
import { getIntentConfig } from '@/utils/constants.js'

export default {
  name: 'PublishModal',
  components: {
    YuIcon
  },
  props: {
    venue: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    }
  },
  emits: ['close', 'publish', 'update:venue', 'update:location'],
  data() {
    return {
      venueOptions: ['李宁羽毛球中心', '飞扬羽毛球馆', '奥体中心'],
      locationOptions: ['3号场', '5号场', '休息区', '大厅', '更衣室'],
      intentOptions: [
        { value: 'SINGLES', label: '求单打', icon: 'Sword' },
        { value: 'DOUBLES', label: '缺双打', icon: 'Users' },
        { value: 'TRAINING', label: '练球', icon: 'Target' },
        { value: 'ANY', label: '随便打', icon: 'Activity' }
      ]
    }
  },
  methods: {
    handleVenueInput(e) {
      this.$emit('update:venue', e.detail.value)
    },
    handleLocationInput(e) {
      this.$emit('update:location', e.detail.value)
    },
    handlePublish(intent) {
      this.$emit('publish', intent)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  @include glass(rgba(0, 0, 0, 0.1));
  @include flex-center;
  align-items: flex-end;
  z-index: $z-modal;
}

.modal-content {
  width: 100%;
  max-width: 750rpx;
  background: $yu-white;
  border-radius: $radius-3xl $radius-3xl 0 0;
  padding: $spacing-xl $spacing-xl $spacing-2xl;
  position: relative;
  max-height: 70vh;
  display: flex;
  flex-direction: column;
}

.drag-indicator {
  width: 80rpx;
  height: 8rpx;
  background: #e5e7eb;
  border-radius: $radius-full;
  margin: 0 auto $spacing-lg;
  flex-shrink: 0;
}

.modal-header {
  @include flex-between;
  margin-bottom: $spacing-lg;
  flex-shrink: 0;
}

.modal-title {
  font-size: $font-xl;
  font-weight: $font-black;
  color: $yu-black;
  font-style: italic;
}

.close-btn {
  @include flex-center;
  width: 64rpx;
  height: 64rpx;
  background: #f9fafb;
  border-radius: 50%;
  
  &:active {
    transform: scale(0.9);
  }
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  margin-bottom: $spacing-xl;
}

.form-section {
  margin-bottom: $spacing-xl;
}

.form-label {
  @include flex-center-y;
  gap: $spacing-sm;
  font-size: $font-sm;
  font-weight: $font-bold;
  color: $yu-light-gray;
  text-transform: uppercase;
  letter-spacing: 1rpx;
  margin-bottom: $spacing-md;
}

.input-wrapper {
  position: relative;
  margin-bottom: $spacing-sm;
}

.form-input {
  width: 100%;
  background: #f9fafb;
  border: 2rpx solid #f0f0f0;
  border-radius: $radius-xl;
  padding: $spacing-lg $spacing-xl;
  padding-left: 80rpx;
  font-size: $font-base;
  font-weight: $font-bold;
  color: $yu-black;
  
  &:focus {
    outline: none;
    border-color: $yu-brand;
    background: $yu-white;
    @include shadow('sm');
  }
}

.input-icon {
  position: absolute;
  left: $spacing-md;
  top: 50%;
  transform: translateY(-50%);
  color: $yu-light-gray;
}

.quick-options {
  @include flex-center-y;
  gap: $spacing-sm;
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.quick-option {
  padding: $spacing-sm $spacing-md;
  background: $yu-white;
  border: 2rpx solid #f0f0f0;
  border-radius: $radius-md;
  font-size: $font-xs;
  font-weight: $font-bold;
  color: $yu-light-gray;
  white-space: nowrap;
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.95);
  }
  
  &.active {
    background: $yu-black;
    color: $yu-brand;
    border-color: $yu-black;
  }
}

.intent-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;
  margin-bottom: $spacing-xl;
  flex-shrink: 0;
}

.intent-item {
  @include flex-center;
  flex-direction: column;
  gap: $spacing-sm;
  padding: $spacing-lg;
  background: $yu-white;
  border: 4rpx solid #f0f0f0;
  border-radius: $radius-2xl;
  height: 160rpx;
  transition: all $duration-normal $ease-out;
  
  &:active {
    transform: scale(0.95);
    border-color: #d1d5db;
  }
}

.intent-text {
  font-size: $font-sm;
  font-weight: $font-bold;
  color: $yu-light-gray;
}

.modal-footer {
  text-align: center;
  flex-shrink: 0;
}

.footer-text {
  font-size: $font-xs;
  color: $yu-light-gray;
  font-weight: $font-bold;
}
</style>
