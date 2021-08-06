<template>
	<view>

		<template v-if="noticeList.length > 0">
			<scroll-view scroll-y="true" :style="'height:'+scrollH + 'px;'" @scrolltolower="loadMore()">
				<view class="flex flex-row flex-wrap justify-center" style="width: 750rpx;">
					<view v-for="(item,index) in noticeList" class="flex flex-row flex-nowrap border-bottom"
						style="width: 700rpx;height: 108rpx;" :data-id = "item.id" @tap="gotoDetail">
						<view class="flex flex-row  align-center" style="padding-left:10rpx;width:500rpx;height:108rpx;line-height:108rpx;
					font-size: 28rpx;color: #333333;">
							<text
								style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.titile}}</text>
						</view>
						<view class="flex justify-center align-center"
							style="widht:220rpx;height: 108rpx;line-height:108rpx;">
							<text
								style="font-size:28rpx;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.createTime}}</text>
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
				noticeList: [],
				pageNo: 1,
				pageSize: 2,
				showBaseline: false
			}
		},
		onLoad() {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight
					console.log('scrollH : ' + this.scrollH)
				}
			})
			this.getData()
		},
		methods: {
			getData: function(e) {
				uni.showLoading({
				    title: '查询中...'  
				});
				let that = this;
				this.$H.get('/sys/api/annountCement/list', {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}, {
					token: true
				}).then(res => {
					uni.hideLoading()
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						let noticeLst = res.result.records
						if (noticeLst) {
							that.noticeList = noticeLst
							if (noticeLst.length > 0) {
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
			loadMore: function(e) {
				console.log('loading ...')
				this.pageNo = this.pageNo + 1
				this.$H.post('/api/event/todoList', {
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						let noticeLst = res.result.records
						if (noticeLst) {
							noticeLst.forEach(item => {
								that.noticeList.push(item)
							})
							if (noticeLst.length > 0) {
								that.showBaseline = false
							} else {
								that.showBaseline = true
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
			gotoDetail : function(e){
				let id =  e.currentTarget.dataset.id
				console.log('notice id : ' + id)
				uni.navigateTo({
					url: "/pages/my/notice_detail?id=" + id
				})
			}
		}
	}
</script>

<style>
</style>
