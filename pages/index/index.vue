<template>
	<view class="container">
		<view class="content">
			<text class="title">界内</text>
			<text class="subtitle">羽毛球社交平台</text>
			<button class="start-btn" @click="goToDashboard">开始使用</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '界内'
			}
		},
		onLoad() {
			// 延迟跳转到主页面
			setTimeout(() => {
				this.goToDashboard()
			}, 1000)
		},
		methods: {
			goToDashboard() {
				uni.switchTab({
					url: '/pages/dashboard/dashboard'
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
	}
	
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40rpx;
	}
	
	.title {
		font-size: 80rpx;
		font-weight: bold;
		color: #ccf381;
		letter-spacing: 4rpx;
	}
	
	.subtitle {
		font-size: 32rpx;
		color: #999;
	}
	
	.start-btn {
		margin-top: 60rpx;
		padding: 24rpx 80rpx;
		background: #ccf381;
		color: #1a1a1a;
		border-radius: 50rpx;
		font-size: 32rpx;
		font-weight: bold;
		border: none;
	}
</style>
