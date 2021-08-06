<template>
	<view>
		<view class="flex flex-row flex-wrap justify-start" style="padding-left: 28rpx;">
			<view v-for="(item, index) in specList" :key="index" class="flex justify-center" 
				style="width: 153rpx;height: 153rpx;position: relative;margin:14rpx;">
				<image :src="item.imagePath" style="width: 153rpx;height: 153rpx;border-radius: 8rpx;"
					@click="selectSpec" :data-specId = "item.id"></image>
				<image style="position: absolute;top: 10rpx;right: 10rpx;height: 32rpx;width:32rpx;z-index: 100;" 
					:src="item.selected == '1' ? '../../static/icon/tongyixieyi_icon.png' : '../../static/icon/tongyixieyi_icon_nor.png' "></image>
				<text style="position: absolute; bottom: 10rpx;color: #FFFFFF;font-size:24rpx;">{{item.specName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				specList : []
			}
		},
		onLoad() {
			this.getSpec()
		},
		methods: {
			// 查询视频专栏列表
			getSpec : function(){
				this.$H.post('/api/video/spec/list', {})
					.then(res => {
						if(res.code == 0){
							res.specList.map( item => {
								item.imagePath = '../../static/cover/cover4.jpg',
								item.selected = '0'
							})
							this.specList = res.specList
						}
					})
			},
			selectSpec : function(e){
				let specId = e.target.dataset.specId
				console.log("specId:" + specId)
				this.specList.forEach( item => {
					item.selected = '0'
				})
				this.specList.map( item => {
					if(item.id == specId){
						item.selected = '1'
						this.specId = item.id
						this.specName = item.specName
						// #ifdef APP-PLUS  
						var webView = this.$mp.page.$getAppWebview();  
						// 修改buttons  
						// index: 按钮索引, style {WebviewTitleNViewButtonStyles }  
						webView.setTitleNViewButtonStyle(0, {  
						    text: '完成(1)',  
						});  
						// webView.setTitleNViewButtonBadge({  
						//     index: 0,  
						//     text: 1,
						// });
						// #endif

					}
				})
			},
			onNavigationBarButtonTap: function(e) {
				if (e.float == 'right') {
					// 保存选中的视频专栏
					uni.setStorageSync('publish_spec_id', this.specId)
					uni.setStorageSync('publish_spec_name', this.specName)
					uni.navigateTo({
						url: "/pages/publish/publish"
					})
				}
			},
			onBackPress(e){
			  console.log("监听返回按钮事件",e);
			  if(this.specId){
				  uni.setStorageSync('publish_spec_id', this.specId)
				  uni.setStorageSync('publish_spec_name', this.specName)
			  }
			  uni.navigateTo({
			  	url: "/pages/publish/publish"
			  })
			  return true;
			}
		}
	}
</script>

<style>

</style>
