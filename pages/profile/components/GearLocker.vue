<template>
  <view class="gear-locker">
    <view class="section-header">
      <view class="header-left">
        <YuIcon name="Sword" :size="28" color="#1a1a1a" />
        <text class="section-title">装备库</text>
        <view class="gear-badge">GEAR LOCKER</view>
      </view>
      <view class="add-btn" @click="$emit('add')">
        <YuIcon name="Plus" :size="24" color="#ccf381" />
        <text class="add-text">添加装备</text>
      </view>
    </view>

    <!-- 横向滚动装备列表 -->
    <scroll-view class="gear-scroll" scroll-x :show-scrollbar="false">
      <view class="gear-list">
        <view 
          v-for="item in gearList" 
          :key="item.id"
          class="gear-item"
          :class="{ broken: item.status === 'BROKEN' }"
          @click="handleItemClick(item)"
        >
          <!-- 装备图片区域 -->
          <view class="gear-image">
            <view class="brand-label">{{ item.brand }}</view>
            <view class="status-badge" :class="getStatusClass(item.status)">
              {{ getStatusLabel(item.status) }}
            </view>
            
            <view class="image-container">
              <view class="placeholder-icon">
              <YuIcon 
                :name="item.type === 'RACKET' ? 'Sword' : 'Zap'" 
                :size="64" 
                color="#e5e7eb"
                :class="{ rotated: item.type === 'RACKET' }"
              />
              </view>
              <image 
                v-if="item.image" 
                :src="item.image" 
                class="gear-img"
                mode="aspectFit"
              />
            </view>
            
            <!-- 战损覆盖层 -->
            <view v-if="item.status === 'BROKEN'" class="broken-overlay">
              <text class="broken-text">BROKEN</text>
            </view>
          </view>

          <!-- 装备信息 -->
          <view class="gear-info">
            <text class="gear-model">{{ item.model }}</text>
            <view class="gear-specs">
              <YuIcon 
                v-if="item.type === 'RACKET'" 
                name="TrendingUp" 
                :size="20" 
                color="#999" 
              />
              <text class="specs-text">
                {{ item.status === 'BROKEN' ? item.date : item.specs }}
              </text>
            </view>
          </view>
        </view>

        <!-- 添加按钮 -->
        <view class="add-gear-btn" @click="$emit('add')">
          <YuIcon name="Plus" :size="48" color="#ccc" />
          <text class="add-label">ADD</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'GearLocker',
  components: {
    YuIcon
  },
  props: {
    gearList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getStatusClass(status) {
      const classes = {
        'ACTIVE': 'status-active',
        'BROKEN': 'status-broken',
        'RESTRINGING': 'status-restringing',
        'RETIRED': 'status-retired'
      }
      return classes[status] || 'status-active'
    },
    
    getStatusLabel(status) {
      const labels = {
        'ACTIVE': '现役',
        'BROKEN': '战损',
        'RESTRINGING': '穿线',
        'RETIRED': '退役'
      }
      return labels[status] || '现役'
    },
    
    handleItemClick(item) {
      // 可以添加装备详情查看功能
      console.log('查看装备:', item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.gear-locker {
  margin-bottom: 64rpx;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24rpx;
  padding: 0 8rpx;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: 900;
  font-style: italic;
  color: #1a1a1a;
}

.gear-badge {
  background: #f5f5f5;
  color: #999;
  font-size: 18rpx;
  font-weight: 700;
  padding: 4rpx 12rpx;
  border-radius: 8rpx;
  text-transform: uppercase;
  letter-spacing: 1rpx;
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: white;
  padding: 8rpx 16rpx;
  border-radius: 16rpx;
  border: 2rpx solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.95);
    border-color: $yu-brand;
  }
}

.add-text {
  font-size: 20rpx;
  font-weight: 700;
  color: #ccf381;
}

/* 横向滚动区域 */
.gear-scroll {
  width: 100%;
  margin: 0 -40rpx;
  padding: 0 40rpx;
  box-sizing: border-box;
}

.gear-list {
  display: flex;
  gap: 24rpx;
  padding-bottom: 16rpx;
  width: max-content;
}

/* 装备卡片 */
.gear-item {
  width: 320rpx;
  flex-shrink: 0;
  background: white;
  border-radius: 40rpx;
  overflow: hidden;
  border: 2rpx solid transparent;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:active {
    transform: scale(0.95);
  }
  
  &:hover {
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  }
  
  &.broken {
    filter: grayscale(0.5);
    opacity: 0.8;
    border-color: #d1d5db;
    background: #f9fafb;
  }
}

/* 装备图片区域 */
.gear-image {
  height: 224rpx;
  width: 100%;
  background: #f9fafb;
  position: relative;
  overflow: hidden;
}

.brand-label {
  position: absolute;
  top: 16rpx;
  left: 16rpx;
  z-index: 10;
  font-size: 16rpx;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2rpx;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10rpx);
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  color: #1a1a1a;
}

.status-badge {
  position: absolute;
  top: 16rpx;
  right: 16rpx;
  z-index: 10;
  padding: 6rpx 12rpx;
  border-radius: 8rpx;
  font-size: 16rpx;
  font-weight: 900;
  text-transform: uppercase;
  
  &.status-active {
    background: $yu-brand;
    color: #1a1a1a;
  }
  
  &.status-broken {
    background: #374151;
    color: #9ca3af;
  }
  
  &.status-restringing {
    background: #fbbf24;
    color: #000;
  }
  
  &.status-retired {
    background: #e5e7eb;
    color: #6b7280;
  }
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rpx;
  position: relative;
}

.placeholder-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.rotated {
    transform: rotate(-45deg);
  }
}

.gear-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4rpx 8rpx rgba(0, 0, 0, 0.1));
  mix-blend-mode: multiply;
  transition: transform 0.5s ease;
}

.gear-item:hover .gear-img {
  transform: scale(1.05);
}

.broken-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.broken-text {
  border: 4rpx dashed rgba(220, 38, 38, 0.5);
  color: rgba(220, 38, 38, 0.8);
  font-weight: 900;
  font-size: 32rpx;
  transform: rotate(-12deg);
  padding: 8rpx 16rpx;
  opacity: 0.5;
}

/* 装备信息 */
.gear-info {
  padding: 24rpx;
  background: white;
  position: relative;
  z-index: 10;
}

.gear-model {
  font-size: 24rpx;
  font-weight: 900;
  color: #1a1a1a;
  line-height: 1.2;
  margin-bottom: 8rpx;
  display: block;
}

.gear-specs {
  display: flex;
  align-items: center;
  gap: 8rpx;
}

.specs-text {
  font-size: 18rpx;
  font-weight: 700;
  color: #999;
}

/* 添加装备按钮 */
.add-gear-btn {
  width: 160rpx;
  flex-shrink: 0;
  border-radius: 40rpx;
  border: 4rpx dashed #e5e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  color: #ccc;
  transition: all 0.3s ease;
  box-sizing: border-box;
  
  &:active {
    transform: scale(0.95);
    border-color: $yu-brand;
    color: $yu-brand;
    background: rgba(204, 243, 129, 0.05);
  }
}

.add-label {
  font-size: 18rpx;
  font-weight: 900;
}
</style>