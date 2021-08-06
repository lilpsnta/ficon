<template>
	<view :style="'background-color: #f7f7f7;height:'+scrollH+'px;'">
		<template v-if="todoList.length > 0">
			<scroll-view scroll-y="true" :style="'height:'+ (scrollH - 200) + 'px;'" @scrolltolower="loadMore()">
				<view class="flex flex-row flex-wrap justify-center" style="width: 750rpx;">
					<view v-for="(item,index) in todoList" class="flex flex-row flex-wrap border"
						style="width: 670rpx;margin-bottom:25rpx;padding-left:20rpx;padding-right:20rpx;background-color: #FFFFFF;" >
						<view class="flex flex-row flex-nowrap align-center" style="width:670rpx;height:70rpx;line-height:70rpx;">
							<view style="width:460rpx;font-size: 30rpx;font-weight: 400;">
								{{item.planName}}
							</view>
							<view class="flex flex-row justify-end" style="width:210rpx;">
								<text style="height:35rpx;line-height:35rpx;font-size: 24rpx;color:#0056B3;" @click="downLoadFile(item.filePath)">查看附件</text>
							</view>
						</view>
						<view class="flex flex-row flex-nowrap"
							style="width:670rpx;height:40rpx;line-height:40rpx;font-size: 24rpx;color: #333333;">
							<view style="width:160rpx;">
								街道名称
							</view>
							<view style="width:510rpx;">
								{{item.townName}}
							</view>
						</view>
						<view class="flex flex-row  flex-nowrap"
							style="width:670rpx;height:40rpx;line-height:40rpx;font-size: 24rpx;color: #333333;">
							<view style="width:160rpx;">
								申请人
							</view>
							<view style="width:510rpx;">
								{{item.createBy}}
							</view>
						</view>
						<view class="flex flex-row  flex-nowrap "
							style="width:670rpx;height:40rpx;line-height:40rpx;font-size: 24rpx;color: #333333;">
							<view style="width:160rpx;">
								审批结果
							</view>
							<view style="width:510rpx;">
								{{item.auditStatus == '1' ? '同意' : '拒绝'}}
							</view>
						</view>
						<view class="flex flex-row  flex-nowrap border-bottom"
							style="width:670rpx;height:40rpx;line-height:40rpx;font-size: 24rpx;color: #333333;">
							<view style="width:160rpx;">
								审批意见
							</view>
							<view style="width:510rpx;">
								{{item.auditRemark}}
							</view>
						</view>
						
						<view class="flex flex-row flex-nowrap align-center" style="width:710rpx;height:70rpx;line-height: 70rpx;">
							<view class="flex flex-row align-center " style="width: 340rpx;height:70rpx;line-height: 70rpx;">
								<text style="font-size:24rpx;">{{item.createTime}}</text>
							</view>
							<view class="flex flex-row flex-nowrap justify-end align-center" style="width: 370rpx;text-align: right;height:70rpx;line-height: 70rpx;">
								
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</template>
		
		
		<uni-popup ref="popup" type="center">
			
			<view class="flex flex-row flex-wrap justify-center" style="width: 600rpx;height:300rpx;background-color: #FFFFFF;">
				<view class="flex flex-wrap justify-center" style="margin-top: 20rpx;">
					<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">				
						<textarea class="border rounded" placeholder="审批意见" v-model="auditRemark"
						 style="width:520rpx;height:150rpx;padding:10rpx;padding-left:20rpx;font-size:30rpx;color: #444444;"/>
					</view>
				</view>
			
				<view class="flex flex-row flex-wrap justify-center" style="margin-top:10rpx;">
					<button class="btn_gray" @click="cancel">取消</button>
					<button class="btn_commit" @click="approve()" style="margin-left:50rpx;">同意</button>
				</view>
			</view>
		</uni-popup>

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
				planId : '',
				auditRemark: '',
				auditStatus : '',
				showBaseline: false,
				todoList: []
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
			reject : function(id){
				this.planId = id
				this.auditStatus = 2
				this.$refs.popup.open('center')
			},
			agree : function(id){
				this.planId = id
				this.auditStatus = 1
				this.$refs.popup.open('center')
			},
			approve : function(){
				let that = this
				this.$H.post('/api/maintainPlan/audit', {
					id : this.planId,
					auditStatus: this.auditStatus,
					auditRemark: this.auditRemark
				}, {
					token: true
				}).then(res => {
					uni.hideLoading()
					console.log('result : ' + JSON.stringify(res))
					if (res.success) {
						uni.showToast({
							title: '审批成功',
							icon: 'none'
						});
						setTimeout(function(){
							that.$refs.popup.close()
							that.getData()
						}, 1000)
						
					} else {
						uni.showToast({
							title: '审批失败',
							icon: 'none'
						});
					}
				})
			},
			cancel : function(){
				this.$refs.popup.close()
			},
			search: function(e) {
				console.log('search')
				this.getData()
			},
			clear: function() {
				this.accountName = ''
				this.getData()
			},
			getData: function(e) {
				/**
				uni.showLoading({
				    title: '查询中...'  
				});
				*/
				let that = this
				
				this.$H.get('/api/maintainPlan/doneList', {}, {
					token: true
				}).then(res => {
					uni.hideLoading()
					console.log('result : ' + JSON.stringify(res))
					if (res.success) {
						let todoList = res.result
						that.todoList = todoList
						if(!todoList || todoList.length == 0){
							this.showBaseline = true
						}
					} else {
						uni.showToast({
							title: '查询失败',
							icon: 'none'
						});
					}
				})
			},
			//下载文件
			downLoadFile(url){
				//var url = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-0dce1c56-5e80-47b5-9a51-61815e397ee0/0961e9ee-838a-4d7a-abb3-88519c813af6.docx';
				//下载文件，生成临时地址
				uni.showLoading({
					title: '下载中...',
				})
				uni.downloadFile({
					url: url, 
					success(res) {
					  //保存到本地
					  uni.saveFile({
						tempFilePath: res.tempFilePath,
						success: function (res) {
						  const savedFilePath = res.savedFilePath;
						  // 打开文件
						  uni.openDocument({
							filePath: savedFilePath,
							success: function (res) {
							  uni.hideLoading()
							},
						  });
						},
						fail: function (err) {
							uni.hideLoading();
							uni.showLoading({
								title: '保存失败',
							})
						}
					  });
					},
					fail(res) {
						uni.hideLoading();
						uni.showLoading({
							title: '下载失败',
						})
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
	.txt_input {
		width: 680rpx;
		height: 95rpx;
		line-height: 95rpx;
		letter-spacing: 5rpx;
		font-size: 32rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
	}

	.btn_gray{
		background-color: #C8C7CC;font-size: 24rpx;width:120rpx;height: 60rpx;line-height: 60rpx;
	}
	
	.btn_commit{
		background-color: #0056B3;font-size: 24rpx;width:120rpx;color: #FFFFFF;height: 60rpx;line-height: 60rpx;
	}

</style>
