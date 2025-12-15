# YuIcon 图标组件

基于 Lucide React 图标库的小程序 SVG 图标组件，包含 60+ 精美图标。

## 特性

- 🎨 **精美设计**: 来自 Lucide React 的专业图标
- 📱 **小程序优化**: 专为 Uni-app 小程序环境优化
- 🎯 **轻量级**: 纯 SVG 实现，无外部依赖
- 🌈 **自定义**: 支持任意颜色和尺寸
- ⚡ **高性能**: 内联 SVG，渲染快速

## 基础用法

```vue
<template>
  <!-- 基础使用 -->
  <YuIcon name="Home" />
  
  <!-- 自定义尺寸和颜色 -->
  <YuIcon name="Settings" :size="32" color="#3b82f6" />
  
  <!-- 预设尺寸 -->
  <YuIcon name="User" size="lg" color="#ef4444" />
  
  <!-- 可点击图标 -->
  <YuIcon name="Heart" :size="24" color="#ef4444" :clickable="true" @click="handleClick" />
</template>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| name | String | - | 图标名称（必填） |
| size | String/Number | 24 | 图标尺寸，支持预设值或数字 |
| color | String | '#1a1a1a' | 图标颜色 |
| clickable | Boolean | false | 是否可点击 |

## 尺寸预设

| 预设值 | 实际尺寸 | 使用场景 |
|--------|----------|----------|
| xs | 16px | 小图标、状态指示 |
| sm | 20px | 表单图标、按钮图标 |
| md | 24px | 默认尺寸、导航图标 |
| lg | 32px | 标题图标、重要功能 |
| xl | 40px | 大按钮、主要操作 |
| xxl | 48px | 装饰图标、空状态 |

## 颜色预设

```javascript
// 可以使用预设颜色
import { iconColors } from '@/components/YuIcon/icons.js'

iconColors.primary   // #1a1a1a - 主色
iconColors.brand     // #ccf381 - 品牌色
iconColors.white     // #ffffff - 白色
iconColors.gray      // #999999 - 灰色
iconColors.red       // #ef4444 - 红色
iconColors.green     // #10b981 - 绿色
iconColors.blue      // #3b82f6 - 蓝色
iconColors.yellow    // #f59e0b - 黄色
iconColors.orange    // #f97316 - 橙色
```

## 可用图标

### 导航图标
- Home - 首页
- User - 用户
- Settings - 设置
- Search - 搜索
- ArrowLeft - 返回

### 功能图标
- Plus - 添加
- Edit3 - 编辑
- XCircle - 关闭
- Check - 确认
- Share2 - 分享

### 运动图标
- Activity - 活动
- Dumbbell - 健身
- Award - 奖励
- TrendingUp - 趋势
- Flame - 火焰

### 社交图标
- Users - 用户群组
- MessageCircle - 消息
- Heart - 喜欢
- QrCode - 二维码
- Handshake - 握手

### 媒体图标
- Play - 播放
- Square - 停止
- Camera - 相机
- Image - 图片

### 工具图标
- Calendar - 日历
- Clock - 时钟
- MapPin - 位置
- Filter - 筛选
- Power - 电源

### 状态图标
- CheckCircle2 - 成功
- AlertCircle - 警告
- HelpCircle - 帮助
- Loader2 - 加载中

## 使用示例

### 导航栏
```vue
<template>
  <view class="nav-bar">
    <YuIcon name="ArrowLeft" :size="24" @click="goBack" :clickable="true" />
    <text class="title">页面标题</text>
    <YuIcon name="Settings" :size="24" @click="showSettings" :clickable="true" />
  </view>
</template>
```

### 按钮图标
```vue
<template>
  <view class="action-buttons">
    <view class="btn primary">
      <YuIcon name="Plus" :size="20" color="white" />
      <text>添加</text>
    </view>
    <view class="btn secondary">
      <YuIcon name="Share2" :size="20" color="#666" />
      <text>分享</text>
    </view>
  </view>
</template>
```

### 状态指示
```vue
<template>
  <view class="status-list">
    <view class="status-item">
      <YuIcon name="CheckCircle2" :size="16" color="#10b981" />
      <text>已完成</text>
    </view>
    <view class="status-item">
      <YuIcon name="Loader2" :size="16" color="#f59e0b" />
      <text>处理中</text>
    </view>
  </view>
</template>
```

## 添加新图标

如需添加新图标，在 `icons.js` 文件中添加对应的 SVG 路径：

```javascript
export const iconSvgs = {
  // 现有图标...
  
  // 新增图标
  NewIcon: `<path d="..."/><circle cx="..." cy="..." r="..."/>`,
}
```

## 注意事项

1. **图标名称**: 使用 PascalCase 命名，如 `ChevronRight`
2. **颜色**: SVG 使用 `stroke` 属性控制颜色，适合线性图标
3. **尺寸**: 建议使用预设尺寸保持设计一致性
4. **性能**: 图标会被内联渲染，避免大量使用超大图标

## 快速预览

访问 `/pages/icon-preview/icon-preview` 页面可以预览所有可用图标，点击图标名称可复制到剪贴板。

访问 `/pages/test-icons/test-icons` 页面可以看到使用示例。