<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import './styles/globals.css';
	
	/* 全局样式 */
	page {
		background-color: #f3f4f6;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
	}
	
	/* 主题色 */
	:root {
		--yu-black: #1a1a1a;
		--yu-brand: #ccf381;
		--yu-brand-dark: #accf60;
		--yu-bg: #f3f4f6;
	}
</style>
