<template>
	<view class="custom-tab-bar" :class="{ dark: isDark }">
		<view class="tab-content">
			<view 
				v-for="(item, index) in tabList" 
				:key="index"
				class="tab-item"
				:class="{ active: currentTab === index }"
				@click="switchTab(index)"
			>
				<view class="tab-icon-wrapper" :class="{ active: currentTab === index }">
					<YuIcon
						:name="item.icon"
						:size="48"
						:color="getTabIconColor(index)"
						:strokeWidth="currentTab === index ? 2.5 : 2"
					/>
				</view>
				<view v-if="currentTab === index" class="active-dot"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import YuIcon from '@/components/YuIcon/YuIcon.vue'
	
	export default {
		name: 'CustomTabBar',
		components: {
			YuIcon
		},
		data() {
			return {
				currentTab: 0,
				isDark: false,
				tabList: [
					{ path: '/pages/dashboard/dashboard', icon: 'Radar', text: '首页' },
					{ path: '/pages/community/community', icon: 'SquareIcon', text: '广场' },
					{ path: '/pages/playtimer/playtimer', icon: 'Timer', text: '记录' },
					{ path: '/pages/profile/profile', icon: 'User', text: '我的' }
				]
			}
		},
		mounted() {
			this.updateCurrentTab()
		},
		methods: {
			getTabIconColor(index) {
				const isActive = this.currentTab === index
				// 对齐 React Navigation.tsx 的颜色逻辑
				// 浅色：active -> brand(#ccf381)，inactive -> gray-400(#9ca3af)
				// 深色：active -> black(#1a1a1a)，inactive -> gray-600(#4b5563)
				if (this.isDark) {
					return isActive ? '#1a1a1a' : '#4b5563'
				}
				return isActive ? '#ccf381' : '#9ca3af'
			},
			updateCurrentTab() {
				const pages = getCurrentPages()
				const currentPage = pages[pages.length - 1]
				const route = currentPage.route
				
				// 根据当前路由设置选中状态
				const tabIndex = this.tabList.findIndex(item => item.path.includes(route))
				if (tabIndex !== -1) {
					this.currentTab = tabIndex
				}
				
				// 设置深色模式（暂时不需要，因为只有首页和我的页面）
				this.isDark = false
			},
			switchTab(index) {
				if (this.currentTab === index) return
				
				this.currentTab = index
				const targetPath = this.tabList[index].path
				
				uni.switchTab({
					url: targetPath,
					success: () => {
						// 通知页面更新导航状态
						uni.$emit('tabChange', {
							index,
							path: targetPath,
							isDark: false
						})
					}
				})
			}
		}
	}
</script>
<style scoped>
	.custom-tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: rgba(255, 255, 255, 0.95);
		border-top: 2rpx solid #f0f0f0;
		backdrop-filter: blur(20rpx);
		transition: all 0.3s;
	}
	
	.custom-tab-bar.dark {
		background: rgba(26, 26, 26, 0.9);
		border-top-color: rgba(255, 255, 255, 0.1);
	}
	
	.tab-content {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 20rpx 80rpx;
		padding-bottom: env(safe-area-inset-bottom);
		max-width: 750rpx;
		margin: 0 auto;
	}
	
	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8rpx;
		flex: 1;
		transition: all 0.3s;
		position: relative;
	}
	
	.tab-icon-wrapper {
		width: 96rpx;
		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.3s;
		color: #999;
		position: relative;
	}
	
	.tab-icon-wrapper.active {
		background: #1a1a1a;
		color: #ccf381;
		transform: rotate(-6deg) scale(1.1);
		box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.15);
		animation: nav-bounce 0.3s ease-out;
	}
	
	.custom-tab-bar.dark .tab-icon-wrapper.active {
		background: #ccf381;
		color: #1a1a1a;
	}
	
	.active-dot {
		width: 8rpx;
		height: 8rpx;
		background: #1a1a1a;
		border-radius: 50%;
		margin-top: 4rpx;
	}
	
	.custom-tab-bar.dark .active-dot {
		background: #ccf381;
	}
	
	@keyframes nav-bounce {
		0% { transform: rotate(-6deg) scale(0.8); }
		50% { transform: rotate(-6deg) scale(1.2); }
		100% { transform: rotate(-6deg) scale(1.1); }
	}
</style>

