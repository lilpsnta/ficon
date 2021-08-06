<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 20rpx;">
			
			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">				
				<textarea class="border rounded" placeholder="处理意见" v-model="handleIntro"
				 style="width:670rpx;height:150rpx;padding:10rpx;padding-left:20rpx;font-size:30rpx;color: #444444;"/>
			</view>
		</view>

		<uni-file-picker fileMediatype="image" title="请上传照片" :imageStyles="imageStyles" mode="grid"
			style="width: 700rpx;margin-left:25rpx;font-size:32rpx;margin-top:30rpx;" 
			 @success="success" @fail="fail">
			<image src="../../static/icon/take_photo.png" style="width: 60rpx;height:60rpx;"></image>
		</uni-file-picker>

		<view class="flex flex-row flex-wrap justify-center" style="margin-top:70rpx;">
			<button class="btn_handle rounded" hover-class="btn_handle_hover" @click="event_handle">提 交</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				eventId: '',
				handleIntro : '',
				imagePath : [],
				imageStyles: {
					width: 100,
					height: 100,
					border: {
						radius: '2%'
					}
				},
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						style: 'dashed',
						radius: 2
					}
				}
			}
		},
		onLoad(option) {
			this.eventId = option.id
		},
		methods: {
			event_handle : function(){
				
				console.log("LLL : " + JSON.stringify({
					id: this.eventId,
					handleIntro : this.handleIntro,
					imagePath : JSON.stringify(this.imagePath)
				}))
				
				this.$H.post('/api/event/handle', {
					id: this.eventId,
					handleIntro : this.handleIntro,
					imagePath : JSON.stringify(this.imagePath)
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						uni.showToast({
							title: '处理成功',
							icon: 'none'
						});
						setTimeout(function() {
							/**
							uni.navigateTo({
								url: "/pages/daka/event_list?searchType=3"
							})
							*/
						   uni.switchTab({
								url:"/pages/index/index"
						   })
						}, 1000)
					} else {
						uni.showToast({
							title: '处理失败',
							icon: 'none'
						});
					}
				})
			},
			success : function(e) {
				console.log('上传成功' + JSON.stringify(e) )
				this.imagePath.push(e.tempFiles[0])
			},
			fail : function(e) {
				console.log('上传失败：', e)
			}
			
		}
	}
</script>

<style>
	.txt_input {
		width: 680rpx;
		height: 95rpx;
		line-height: 95rpx;
		letter-spacing: 5rpx;
		font-size: 32rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
	}

	.btn_handle {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3399ff, #3481f5);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_handle {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3481f5, #3399ff);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}
</style>
