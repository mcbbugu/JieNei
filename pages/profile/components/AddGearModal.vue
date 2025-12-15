<template>
  <view class="add-gear-modal" @click="$emit('close')">
    <view class="modal-backdrop"></view>
    <view class="modal-content" @click.stop>
      <view class="modal-header">
        <text class="modal-title">添加装备</text>
        <view class="close-btn" @click="$emit('close')">
          <YuIcon name="XCircle" :size="40" color="#999" />
        </view>
      </view>

      <view class="form-content">
        <!-- 装备类型选择 -->
        <view class="form-group">
          <text class="form-label">类型</text>
          <view class="type-buttons">
            <view 
              v-for="type in gearTypes" 
              :key="type.value"
              class="type-btn"
              :class="{ active: formData.type === type.value }"
              @click="formData.type = type.value"
            >
              {{ type.label }}
            </view>
          </view>
        </view>

        <!-- 品牌和型号 -->
        <view class="form-row">
          <view class="form-group">
            <text class="form-label">品牌</text>
            <input 
              v-model="formData.brand"
              class="form-input"
              placeholder="Yonex"
            />
          </view>
          <view class="form-group">
            <text class="form-label">型号</text>
            <input 
              v-model="formData.model"
              class="form-input"
              placeholder="100ZZ"
            />
          </view>
        </view>

        <!-- 规格/备注 -->
        <view class="form-group">
          <text class="form-label">规格/备注</text>
          <input 
            v-model="formData.specs"
            class="form-input"
            :placeholder="getSpecsPlaceholder()"
          />
        </view>

        <!-- 图片上传 -->
        <view class="form-group">
          <text class="form-label">装备图片</text>
          <view class="image-upload" @click="uploadImage">
            <YuIcon name="Plus" :size="48" color="#ccc" />
            <text class="upload-text">上传图片</text>
          </view>
        </view>

        <!-- 提交按钮 -->
        <view class="submit-btn" @click="handleSubmit">
          <text class="submit-text">确认添加</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import YuIcon from '@/components/YuIcon/YuIcon.vue'

export default {
  name: 'AddGearModal',
  components: {
    YuIcon
  },
  data() {
    return {
      formData: {
        type: 'RACKET',
        brand: '',
        model: '',
        specs: '',
        image: ''
      },
      gearTypes: [
        { value: 'RACKET', label: '球拍' },
        { value: 'SHOES', label: '球鞋' },
        { value: 'JERSEY', label: '球衣' }
      ]
    }
  },
  methods: {
    getSpecsPlaceholder() {
      return this.formData.type === 'RACKET' 
        ? '例如: 4U G5 / 26磅' 
        : '例如: 42码'
    },
    
    uploadImage() {
      uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          this.formData.image = res.tempFilePaths[0]
          uni.showToast({
            title: '图片上传成功',
            icon: 'success'
          })
        }
      })
    },
    
    handleSubmit() {
      if (!this.formData.brand || !this.formData.model) {
        uni.showToast({
          title: '请填写品牌和型号',
          icon: 'none'
        })
        return
      }
      
      this.$emit('submit', {
        ...this.formData,
        specs: this.formData.specs || '标准'
      })
      
      // 重置表单
      this.formData = {
        type: 'RACKET',
        brand: '',
        model: '',
        specs: '',
        image: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.add-gear-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10rpx);
}

.modal-content {
  background: white;
  width: 100%;
  max-width: 768rpx;
  border-radius: 64rpx 64rpx 0 0;
  padding: 48rpx 48rpx 96rpx;
  position: relative;
  z-index: 10;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
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
  margin-bottom: 48rpx;
}

.modal-title {
  font-size: 40rpx;
  font-weight: 900;
  font-style: italic;
  color: #1a1a1a;
}

.close-btn {
  background: #f5f5f5;
  padding: 16rpx;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.9);
    background: #e5e5e5;
  }
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 24rpx;
  font-weight: 700;
  color: #999;
  text-transform: uppercase;
  margin-bottom: 16rpx;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32rpx;
}

/* 类型选择按钮 */
.type-buttons {
  display: flex;
  gap: 16rpx;
}

.type-btn {
  flex: 1;
  padding: 20rpx;
  border-radius: 24rpx;
  font-size: 24rpx;
  font-weight: 700;
  text-align: center;
  border: 2rpx solid #e5e7eb;
  background: white;
  color: #666;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
  
  &.active {
    background: #1a1a1a;
    color: $yu-brand;
    border-color: #1a1a1a;
  }
}

/* 输入框 */
.form-input {
  background: #f9fafb;
  border: 2rpx solid #f0f0f0;
  border-radius: 24rpx;
  padding: 24rpx 32rpx;
  font-size: 28rpx;
  font-weight: 700;
  color: #1a1a1a;
  transition: all 0.3s ease;
  
  &:focus {
    background: white;
    border-color: #1a1a1a;
  }
}

/* 图片上传 */
.image-upload {
  height: 256rpx;
  width: 100%;
  border: 4rpx dashed #e5e7eb;
  border-radius: 32rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  background: #f9fafb;
  transition: all 0.3s ease;
  
  &:active {
    border-color: $yu-brand;
    background: rgba(204, 243, 129, 0.05);
  }
}

.upload-text {
  font-size: 24rpx;
  font-weight: 700;
  color: #ccc;
}

/* 提交按钮 */
.submit-btn {
  background: #1a1a1a;
  color: $yu-brand;
  font-weight: 700;
  padding: 32rpx;
  border-radius: 32rpx;
  text-align: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  margin-top: 16rpx;
  transition: all 0.3s ease;
  
  &:active {
    transform: scale(0.98);
  }
}

.submit-text {
  font-size: 32rpx;
  font-weight: 700;
}
</style>