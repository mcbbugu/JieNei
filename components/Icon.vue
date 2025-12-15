<template>
	<view class="icon" :style="iconStyle">
		<text class="icon-text">{{ iconChar }}</text>
	</view>
</template>

<script>
	export default {
		name: 'Icon',
		props: {
			name: {
				type: String,
				required: true
			},
			size: {
				type: Number,
				default: 20
			},
			color: {
				type: String,
				default: 'currentColor'
			}
		},
		computed: {
			iconChar() {
				const icons = {
					Home: '🏠',
					Timer: '⏱️',
					Activity: '⚡',
					User: '👤',
					Bell: '🔔',
					MapPin: '📍',
					Calendar: '📅',
					Plus: '➕',
					Search: '🔍',
					Zap: '⚡',
					ChevronRight: '›',
					ChevronLeft: '‹',
					Play: '▶️',
					Stop: '⏹️',
					Award: '🏆',
					Check: '✅',
					SquareIcon: '💬',
					MessageCircle: '💬',
					QrCode: '📱',
					Scan: '📷',
					Send: '📤',
					Heart: '❤️',
					More: '⋯',
					Radar: '🎯',
					Flame: '🔥',
					Coffee: '☕',
					Chat: '💬',
					Female: '♀️',
					Male: '♂️',
					Clock: '🕐',
					TrendingUp: '📈',
					Dumbbell: '🏋️',
					XCircle: '❌',
					UserPlus: '👥',
					UserCheck: '✅',
					Loader: '🔄',
					Filter: '🔽',
					ArrowDownCircle: '⬇️',
					Power: '⏻',
					Sword: '⚔️',
					Users: '👥',
					Handshake: '🤝',
					Help: '❓',
					Alert: '⚠️',
					Feather: '🪶',
					ArrowLeft: '←',
					Share: '📤',
					Settings: '⚙️',
					Shield: '🛡️',
					LogOut: '🚪',
					Edit: '✏️',
					Smartphone: '📱',
					Rotate: '🔄',
					Image: '🖼️'
				}
				return icons[this.name] || '❓'
			},
			iconStyle() {
				return {
					fontSize: this.size + 'rpx',
					color: this.color,
					lineHeight: '1'
				}
			}
		}
	}
</script>

<style scoped>
	.icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	
	.icon-text {
		display: inline-block;
		vertical-align: middle;
	}
</style>

