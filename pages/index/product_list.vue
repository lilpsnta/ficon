<template>

	<view class="content"  :style="'background-color: #f2f1f6;height:'+scrollH+'px;padding-top:20rpx'" >
			<view class="flex felx-row flex-wrap" style="width: 710rpx;height:480rpx;box-shadow: 5px 5px 5px  #cccccc;
				border-radius: 20rpx;background-color: #FFFFFF;padding-top:30rpx;margin-left: 20rpx;">
				<view style="padding-left: 20rpx;height: 40rpx;line-height: 40rpx;">
					<text>联创独享</text>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="margin-top: 10rpx;">
					<view class="flex flex-row flex-nowrap justify-center" style="width: 710rpx;padding-right:10rpx;height: 50rpx;line-height: 50rpx;">
						<text style="font-size: 36rpx;font-weight: bold;color: #f3c21d;">2324234.234FIL</text>
						<text style="font-size: 24rpx;color:#f3c21d;margin-left: 20rpx;">剩余</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="height: 30rpx;line-height: 30rpx;">
					<view class="flex flex-row justify-start" style="width: 205rpx;">
						<text style="font-size: 24rpx;">产品周期</text>
					</view>
					<view class="flex flex-row justify-end" style="width: 305rpx;padding-left: 10rpx;height: 30rpx;line-height: 30rpx;">
						<text style="font-size: 24rpx;font-weight: bold;">540天</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="height: 30rpx;line-height: 30rpx;">
					<view class="flex flex-row justify-start" style="width: 205rpx;">
						<text style="font-size: 24rpx;">FIL质押价格</text>
					</view>
					<view class="flex flex-row justify-end" style="width: 305rpx;padding-left: 10rpx;height: 30rpx;line-height: 30rpx;">
						<text style="font-size: 24rpx;font-weight: bold;">6.23424243FIL</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="height: 30rpx;line-height: 30rpx;">
					<view class="flex flex-row justify-start" style="width: 205rpx;">
						<text style="font-size: 24rpx;">FIL当前币价</text>
					</view>
					<view class="flex flex-row justify-end" style="width: 305rpx;padding-left: 10rpx;height: 30rpx;line-height: 30rpx;">
						<text style="font-size: 24rpx;font-weight: bold;">$51.1</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="margin-top: 20rpx;">
					<button size="mini" style="width:300rpx;font-size: 30rpx; height: 70rpx;line-height: 70rpx;
						background: linear-gradient(to right, #f7d72c, #feb103 );color: #FFFFFF;">产品详情</button>
				</view>
			</view>
			
			<view class="flex felx-row flex-wrap" style="width: 710rpx;height:480rpx;box-shadow: 5px 5px 5px  #cccccc;
				border-radius: 20rpx;background-color: #FFFFFF;padding-top:30rpx;margin-left: 20rpx;margin-top: 20rpx;">
				<view style="padding-left: 20rpx;height: 40rpx;line-height: 40rpx;">
					<text>联创独享I</text>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="margin-top: 10rpx;">
					<view class="flex flex-row flex-nowrap justify-center" style="width: 710rpx;padding-right:10rpx;height: 50rpx;line-height: 50rpx;">
						<text style="font-size: 36rpx;font-weight: bold;color: #f3c21d;">2324234.234FIL</text>
						<text style="font-size: 24rpx;color:#f3c21d;margin-left: 20rpx;">剩余</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="height: 30rpx;line-height: 30rpx;">
					<view class="flex flex-row justify-start" style="width: 205rpx;">
						<text style="font-size: 24rpx;">产品周期</text>
					</view>
					<view class="flex flex-row justify-end" style="width: 305rpx;padding-left: 10rpx;height: 30rpx;line-height: 30rpx;">
						<text style="font-size: 24rpx;font-weight: bold;">540天</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="height: 30rpx;line-height: 30rpx;">
					<view class="flex flex-row justify-start" style="width: 205rpx;">
						<text style="font-size: 24rpx;">FIL质押价格</text>
					</view>
					<view class="flex flex-row justify-end" style="width: 305rpx;padding-left: 10rpx;height: 30rpx;line-height: 30rpx;">
						<text style="font-size: 24rpx;font-weight: bold;">6.23424243FIL</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="height: 30rpx;line-height: 30rpx;">
					<view class="flex flex-row justify-start" style="width: 205rpx;">
						<text style="font-size: 24rpx;">FIL当前币价</text>
					</view>
					<view class="flex flex-row justify-end" style="width: 305rpx;padding-left: 10rpx;height: 30rpx;line-height: 30rpx;">
						<text style="font-size: 24rpx;font-weight: bold;">$51.1</text>
					</view>
				</view>
				<view class="w-100 flex flex-row flex-nowrap justify-center" style="margin-top: 20rpx;">
					<button size="mini" style="width:300rpx;font-size: 30rpx; height: 70rpx;line-height: 70rpx;
						background: linear-gradient(to right, #f7d72c, #feb103 );color: #FFFFFF;">产品详情</button>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	
	let that;
	import $H from '../../common/request.js'

	export default {
		components: {},
		data() {
			return {
				
				scrollH: 600,
				
			}
		},
		onLoad() {
			let that = this
			// 读取token 判断登录状态
			let token = uni.getStorageSync('token');
			console.log('进入首页取得token:' + token)
			if (!token) {
				//不存在则跳转至登录页
				uni.reLaunch({
					url: "/pages/login/login",
					success: () => {
						plus.navigator.closeSplashscreen();
					}
				})
			} else {
				//存在则关闭启动页进入首页
				plus.navigator.closeSplashscreen();
			}
			
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(145)
					console.log('scrollH : ' + this.scrollH)
				}
			})
		   
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
	.kc_item_con{
		width: 236rpx;height:140rpx;
	}
	
	.kc_item_label{
		font-size: 24rpx;color: #6C757D;height: 60rpx;line-height: 60rpx;
	}
	.kc_item_content{
		font-size: 30rpx;font-weight: bold;height: 60rpx;line-height: 60rpx;
	}
</style>
