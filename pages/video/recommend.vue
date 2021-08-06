<template>
	<view>
		<!-- 视频列表 -->
		<scroll-view scroll-y="true" lower-threshold="50" :style="'height:'+scrollH + 'px;'" 
			@scrolltolower="pushLoad">
			<view class="flex flex-wrap"
				style="padding-left:26rpx;padding-right: 26rpx; justify-content: space-between;margin-top: 20rpx;">
				<view class="video-item" v-for="(video, vindex) in videoList" :key="vindex"
					@click="gotoDetail(video.id)">
					<image class="rounded" :src="video.coverImagePath"
						style="width: 342rpx;height: 201rpx;border-radius: 0.9;"></image>
					<view class="flex align-center">
						<text class="font"
							style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{video.videoName}}</text>
					</view>
					<text class="font-sm text-light-muted"> {{video.secondTitle}}</text>
				</view>
			</view>
			<view v-if="showBaseline" class="flex flex-row justify-center">
				<text style="color: #999999;font-size: 24rpx;height: 50rpx;line-height: 50rpx;">已经到底线了</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offset : 1,
				limit : 8,
				moduleId : '',
				moduleName : '',
				videoList : [],
				showBaseline : true,
				scrollH : 600
			}
		},
		onLoad(query) {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(101)
					console.log('scrollH : ' + this.scrollH)
				}
			})
			
			this.moduleId = query.moduleId
			this.moduleName = query.moduleName
			console.log('query moduleId : ' + query.moduleId)
			// 修改导航栏名称
			uni.setNavigationBarTitle({
			    title: this.moduleName
			});
			this.getData()
		},
		methods: {
			getData : function(){
				this.$H.post('/api/video/data/load', {
						moduleId : this.moduleId,
						offset : this.offset,
						limit : this.limit
					}).then(res => {
						if (res.code == 0) {
							this.videoList = res.videoList
							if(res.videoList.length > 0 && res.videoList.length == limit){
								this.showBaseline = false
							}else{
								this.showBaseline = true
							}
						}
					})
			},
			pushLoad : function(e){
				console.log('loading ...')
				this.offset = this.offset + 1
				let list = this.$H.post('/api/video/data/load', {
						moduleId : this.moduleId,
						offset : this.offset,
						limit : this.limit
					}).then( res => {
					console.log('load...:' + JSON.stringify(res.videoList))
					if(res.code == 0){
						if(res.videoList.length > 0 && res.videoList.length == limit){
							this.showBaseline = false
						}else{
							this.showBaseline = true
						}
						res.videoList.forEach( item => {
							this.videoList.push(item)
						})
						
						
					}
				})
			},
			gotoDetail: function(id) {
				console.log("videoId : " + id)
				uni.navigateTo({
					url: "/pages/video_deatil/video_detail?id=" + id
				})
			}
		}
	}
</script>

<style>
	.video-item {
		width: 349rpx;
		height: 325rpx;
		box-sizing: border-box;
		position: relative;
	}
</style>
