# 界内 - 羽毛球社交平台 (uni-app 版本)

## 项目结构

```
JieNei-uniapp/
├── pages/              # 页面目录
│   ├── index/         # 启动页
│   ├── dashboard/     # 发现/附近局页面
│   ├── community/     # 广场页面
│   ├── playtimer/     # 记录/计时器页面
│   ├── profile/       # 名片页面
│   └── assessment/    # 等级评测页面
├── utils/             # 工具函数
│   ├── types.js       # 类型定义
│   ├── icons.js       # 图标映射
│   └── constants.js   # 常量和工具函数
├── static/            # 静态资源
├── App.vue            # 应用入口
├── pages.json         # 页面配置和路由
└── manifest.json       # 应用配置

```

## 功能说明

### 已实现功能
- ✅ 发现页面（Dashboard）- 显示附近球友列表
- ✅ 广场页面（Community）- 占位页面
- ✅ 记录页面（PlayTimer）- 占位页面
- ✅ 名片页面（Profile）- 个人名片展示
- ✅ 等级评测页面（Assessment）- 等级评测流程
- ✅ 底部导航栏（TabBar）
- ✅ 数据生成和过滤功能

### 待完善功能
- ⏳ 完整的 Dashboard 功能（通知中心、发布状态、玩家详情等）
- ⏳ 广场页面的帖子功能
- ⏳ 计时器的完整功能
- ⏳ 个人资料的完整功能

## 运行项目

1. 在 HBuilderX 中打开项目
2. 选择运行到微信小程序
3. 项目会自动编译并在微信开发者工具中打开

## 注意事项

- 底部导航栏暂时没有图标，可以在 `pages.json` 中配置图标路径
- 样式使用了 rpx 单位，适配不同屏幕尺寸
- 使用了 Vue 2 的语法（uni-app 标准）

