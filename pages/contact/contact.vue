<template>
	<view :style="'background-color: #f7f7f7;height:'+scrollH+'px;'">
		<view class="flex flex-row flex-nowrap justify-center" style="background-color: #FFFFFF;">
			<uni-search-bar placeholder="请输搜索关键字" cancelButton="none" style="width: 700rpx;" bgColor="#FFFFFF"
				v-model="accountName" @confirm="search"  @clear="clear">
				<view slot="clearIcon" style="color: #999999">
					<image src="../../static/icon/cancel.png" style="width: 35rpx;height:35rpx;"></image>
				</view>
			</uni-search-bar>
		</view>
		<template v-if="contactList.length > 0">
			<scroll-view scroll-y="true" :style="'height:'+ (scrollH - 200) + 'px;'" @scrolltolower="loadMore()">
				<view class="flex flex-row flex-wrap justify-center" style="width: 750rpx;background-color: #FFFFFF;">
					<view v-for="(item,index) in contactList" class="flex flex-row flex-nowrap border-bottom"
						style="width: 700rpx;height: 108rpx;" :data-tel="item.tel" @tap="callTel">
						<view class="flex flex-row  align-center"
							style="padding-left:30rpx;width:600rpx;height:108rpx;line-height:108rpx;font-size: 30rpx;color: #333333;">
							{{item.accountName}}({{item.job}})</view>
						<view class="flex justify-center align-center"
							style="widht:100rpx;height: 108rpx;line-height:108rpx;">
							<image src="../../static/icon/tel.png" style="width: 50rpx;height:50rpx;"></image>
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
				pageNo: 1,
				pageSize: 10,
				accountName: '',
				showBaseline: false,
				contactList: []
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
			this.getData()
		},
		methods: {
			search : function(e){
				console.log('search')
				this.getData()
			},
			clear : function(){
				this.accountName = ''
				this.getData()
			},
			getData: function(e) {
				uni.showLoading({
				    title: '查询中...'  
				});
				let that = this
				this.$H.get('/api/account/contact/list', {
					accountName: this.accountName,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}, {
					token: true
				}).then(res => {
					uni.hideLoading()
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						let contactList = res.result.records
						if (contactList) {
							that.contactList = contactList
							if (contactList.length > 0) {
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
			loadMore: function(e) {
				console.log('loading ...')
				this.pageNo = this.pageNo + 1
				let that = this
				this.$H.get('/api/account/contact/list', {
					accountName: this.accountName,
					pageNo: this.pageNo,
					pageSize: this.pageSize
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						let contactList = res.result.records
						if (contactList) {
							contactList.forEach(function(item) {
								that.contactList.push(item)
							})
							if (contactList.length > 0) {
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
			callTel: function(e) {
				let telphone = e.currentTarget.dataset.tel
				console.log('tel: ' + telphone)
				uni.makePhoneCall({
					phoneNumber: telphone
				});
			}
		}
	}
</script>

<style>

</style>
