<script>
	export default {
		globalData: {
			isLogin : false,
			indexStatsIntervalId : ''
		},
		onLaunch: function() {
			console.log('App Launch')
			
			// NVUE模式下加载字体
			// const domModule = weex.requireModule('dom')
			// domModule.addRule('fontFace', {
			//     'fontFamily': "iconfont",
			//     'src': "url('http://at.alicdn.com/t/font_2500186_ubwvohcyf8.ttf')"
			// });
			
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
	/*每个页面公共css */
	@import url("/common/free.css");
	@import url("/common/common.css");
	
	/* 如果不是NVUE则引入样式 */
	/* #ifndef APP-PLUS-NVUE */
	@import url("/common/icon.css");
	@import url("/common/animate.css");
	@import '@/components/feng-parse/parse.css';
	/* #endif */
</style>
