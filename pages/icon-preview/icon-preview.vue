<template>
  <view class="icon-preview">
    <view class="header">
      <text class="title">图标预览</text>
      <text class="subtitle">来自 Lucide React 的精美图标</text>
    </view>
    
    <view class="controls">
      <view class="size-selector">
        <text class="label">大小：</text>
        <view class="size-options">
          <view 
            v-for="size in sizeOptions" 
            :key="size.value"
            class="size-option"
            :class="{ active: selectedSize === size.value }"
            @click="selectedSize = size.value"
          >
            <text>{{ size.label }}</text>
          </view>
        </view>
      </view>
      
      <view class="color-selector">
        <text class="label">颜色：</text>
        <view class="color-options">
          <view 
            v-for="color in colorOptions" 
            :key="color.value"
            class="color-option"
            :class="{ active: selectedColor === color.value }"
            :style="{ backgroundColor: color.value }"
            @click="selectedColor = color.value"
          />
        </view>
      </view>
    </view>
    
    <view class="search-bar">
      <YuIcon name="Search" :size="20" color="#999" />
      <input 
        class="search-input"
        v-model="searchText"
        placeholder="搜索图标..."
        placeholder-style="color: #999"
      />
    </view>
    
    <view class="icon-grid">
      <view 
        v-for="iconName in filteredIcons" 
        :key="iconName"
        class="icon-item"
        @click="copyIconName(iconName)"
      >
        <view class="icon-wrapper">
          <YuIcon 
            :name="iconName" 
            :size="selectedSize" 
            :color="selectedColor" 
          />
        </view>
        <text class="icon-name">{{ iconName }}</text>
      </view>
    </view>
    
    <view v-if="filteredIcons.length === 0" class="empty-state">
      <YuIcon name="Search" :size="48" color="#ccc" />
      <text class="empty-text">没有找到匹配的图标</text>
    </view>
  </view>
</template>

<script>
import { iconSvgs } from '@/components/YuIcon/icons.js'

export default {
  name: 'IconPreview',
  data() {
    return {
      selectedSize: 32,
      selectedColor: '#1a1a1a',
      searchText: '',
      
      sizeOptions: [
        { label: 'XS', value: 16 },
        { label: 'SM', value: 20 },
        { label: 'MD', value: 24 },
        { label: 'LG', value: 32 },
        { label: 'XL', value: 40 },
        { label: 'XXL', value: 48 }
      ],
      
      colorOptions: [
        { label: '黑色', value: '#1a1a1a' },
        { label: '品牌色', value: '#ccf381' },
        { label: '白色', value: '#ffffff' },
        { label: '灰色', value: '#999999' },
        { label: '红色', value: '#ef4444' },
        { label: '绿色', value: '#10b981' },
        { label: '蓝色', value: '#3b82f6' },
        { label: '黄色', value: '#f59e0b' }
      ]
    }
  },
  
  computed: {
    allIcons() {
      return Object.keys(iconSvgs).sort()
    },
    
    filteredIcons() {
      if (!this.searchText) {
        return this.allIcons
      }
      
      const searchLower = this.searchText.toLowerCase()
      return this.allIcons.filter(icon => 
        icon.toLowerCase().includes(searchLower)
      )
    }
  },
  
  methods: {
    copyIconName(iconName) {
      uni.setClipboardData({
        data: iconName,
        success: () => {
          uni.showToast({
            title: `已复制: ${iconName}`,
            icon: 'success',
            duration: 1500
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-preview {
  padding: 40rpx;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.header {
  text-align: center;
  margin-bottom: 60rpx;
  
  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 16rpx;
  }
  
  .subtitle {
    display: block;
    font-size: 28rpx;
    color: #666;
  }
}

.controls {
  background: white;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  
  .size-selector,
  .color-selector {
    margin-bottom: 32rpx;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .label {
    display: block;
    font-size: 28rpx;
    font-weight: 600;
    color: #333;
    margin-bottom: 20rpx;
  }
  
  .size-options {
    display: flex;
    gap: 16rpx;
    flex-wrap: wrap;
  }
  
  .size-option {
    padding: 16rpx 24rpx;
    border-radius: 20rpx;
    background: #f5f5f5;
    border: 2rpx solid transparent;
    transition: all 0.2s;
    
    &.active {
      background: #ccf381;
      border-color: #b8e356;
      transform: scale(1.05);
    }
    
    text {
      font-size: 24rpx;
      font-weight: 500;
      color: #333;
    }
  }
  
  .color-options {
    display: flex;
    gap: 16rpx;
    flex-wrap: wrap;
  }
  
  .color-option {
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
    border: 3rpx solid transparent;
    transition: all 0.2s;
    
    &.active {
      border-color: #ccf381;
      transform: scale(1.2);
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.2);
    }
  }
}

.search-bar {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 32rpx;
  padding: 24rpx 32rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  gap: 20rpx;
  
  .search-input {
    flex: 1;
    font-size: 28rpx;
    color: #333;
    border: none;
    outline: none;
  }
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160rpx, 1fr));
  gap: 24rpx;
}

.icon-item {
  background: white;
  border-radius: 24rpx;
  padding: 32rpx 20rpx;
  text-align: center;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.95);
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
  }
  
  .icon-wrapper {
    margin-bottom: 16rpx;
    display: flex;
    justify-content: center;
  }
  
  .icon-name {
    display: block;
    font-size: 20rpx;
    color: #666;
    word-break: break-all;
    line-height: 1.2;
  }
}

.empty-state {
  text-align: center;
  padding: 120rpx 40rpx;
  
  .empty-text {
    display: block;
    font-size: 28rpx;
    color: #999;
    margin-top: 24rpx;
  }
}
</style>