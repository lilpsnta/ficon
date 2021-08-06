<template>
	<view :style="'background-color: #f7f7f7;height:'+scrollH+'px;'">




		<template v-if="eventList.length > 0">
			<scroll-view scroll-y="true" :style="'height:'+scrollH + 'px;'" @scrolltolower="loadMore()">
				<view class="flex flex-row flex-wrap justify-center">
					<view v-for="(item, index) in eventList" class="flex flex-row flex-wrap"
						style="width: 700rpx;margin-top: 20rpx;background-color: #FFFFFF;border-radius: 10rpx;margin-top: 30rpx;margin-bottom: 40rpx;">
						<view class="flex flex-row flex-nowrap justify-start"
							style="margin-left: 25rpx;margin-top: 25rpx;">
							<text style="text-align: left;color: #cccccc;font-size: 28rpx;"> {{item.createTime}} </text>
						</view>
						<view class="flex flex-row flex-nowrap" style="height: 76rpx;line-height: 76rpx;">
							<text class="item_left">事件编码</text>
							<text class="item_right">{{item.eventCode}}</text>
						</view>
						<view class="flex flex-row flex-nowrap" style="height: 76rpx;line-height: 76rpx;">
							<text class="item_left">路段名称</text>
							<text class="item_right">{{item.roadName}}</text>
						</view>
						<view class="flex flex-row flex-nowrap" style="height: 76rpx;line-height: 76rpx;">
							<text class="item_left">问题描述</text>
							<text class="item_right">{{item.intro}}</text>
						</view>
						<view class="flex flex-row flex-nowrap" style="height: 76rpx;line-height: 76rpx;">
							<text class="item_left">定位位置</text>
							<text class="item_right">{{item.location}}</text>
						</view>
						<view class="flex flex-row flex-nowrap" style="height: 76rpx;line-height: 76rpx;">
							<text class="item_left">上报人</text>
							<text class="item_right">{{item.checkUserId}}</text>
						</view>
						<view class="flex flex-row flex-nowrap  justify-start"
							style="width: 700rpx;height: 200rpx;line-height: 200rpx;text-align: left;padding-left: 30rpx;">
							<image v-for="(img,index) in item.imageList" :src="img.filePath" @tap="$D.previewImage(img.filePath)"
								style="width: 120rpx;height: 120rpx;border-radius: 5rpx;margin-right: 10rpx;"></image>
						</view>
					</view>
				</view>
			</scroll-view>
		</template>
		<view v-if="showBaseline" class="flex flex-row justify-center">
			<text style="color: #999999;font-size: 24rpx;height: 50rpx;line-height: 50rpx;">已经到底线了</text>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 1000,
				eventList: [],
				pageNo: 1,
				pageSize: 3,
				showBaseline: false
			}
		},
		async onLoad() {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight
					console.log('scrollH : ' + this.scrollH)
				}
			})
			// 加载我的事件列表
			await this.getMyEventList()
		},
		methods: {

			getMyEventList: function() {
				uni.showLoading({
				    title: '数据查询中...'  
				});
				let that = this;
				this.$H.get('/api/event/my', {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					uni.hideLoading()
					if (res.code == 200) {
						let eventLst = res.result.records
						that.eventList = eventLst
						if (eventLst) {
							if (eventLst.length > 0) {
								this.showBaseline = false
							} else {
								this.showBaseline = true
							}
						}

					} else {
						uni.showToast({
							title: '查询失败',
							icon: 'none'
						});
					}
				})
			},
			loadMore: function() {
				this.pageNo = this.pageNo + 1
				let that = this;
				this.$H.get('/api/event/my', {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						let eventLst = res.result.records
						if (eventLst) {
							eventLst.forEach(item => {
								that.eventList.push(item)
							})
							if (eventLst.length > 0) {
								this.showBaseline = false
							} else {
								this.showBaseline = true
							}
						}
					} else {
						uni.showToast({
							title: '查询失败',
							icon: 'none'
						});
					}
				})
			},
			assignEvent: function() {
				uni.navigateTo({
					url: "/pages/daka/assign"
				})
			},

			handleEvent: function() {
				uni.navigateTo({
					url: "/pages/daka/handle"
				})
			}
		}
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}

	.item_left {
		width: 170rpx;
		color: #333333;
		font-size: 30rpx;
		text-align: left;
		padding-left: 30rpx;
	}

	.item_right {
		width: 530rpx;
		color: #333333;
		font-size: 30rpx;
		text-align: left;
	}

	.btn_handle {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3399ff, #3481f5);
		font-size: 33rpx;
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
	}

	.btn_handle_hover {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3481f5, #3399ff);
		font-size: 33rpx;
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
	}
</style>
