<template>
	<view :style="'background-color: #f7f7f7;height:'+scrollH+'px;'">
		
		<view class="flex flex-row flex-wrap justify-center" style="width: 750rpx;background-color: #FFFFFF;">
			
			<view class="flex flex-row flex-nowrap border-bottom"
				style="width: 700rpx;height: 108rpx;background-color: #FFFFFF;">
				<view class="flex flex-row justify-center align-center"
					style="width:100rpx;height:108rpx;line-height:108rpx;">
					<image src="../../../static/icon/clean.png" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="flex flex-row  align-center"
					style="width:300rpx;height:108rpx;line-height:108rpx;font-size: 30rpx;color: #333333;">
					清除缓存
				</view>
				<view class="flex justify-end align-center"
					style="width:300rpx;height: 108rpx;line-height:108rpx;color: #333333;">
				</view>
			</view>
			
			<view class="flex flex-row flex-nowrap border-bottom"
				style="width: 700rpx;height: 108rpx;background-color: #FFFFFF;">
				<view class="flex flex-row justify-center align-center"
					style="width:100rpx;height:108rpx;line-height:108rpx;">
					<image src="../../../static/icon/upgrade.png" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="flex flex-row  align-center"
					style="width:300rpx;height:108rpx;line-height:108rpx;font-size: 30rpx;color: #333333;">
					版本 V1.0.1
				</view>
				<view class="flex justify-end align-center"
					style="width:300rpx;height: 108rpx;line-height:108rpx;color: #333333;">
					<text style="color:#3399ff;font-size: 30rpx;">检查更新</text>
				</view>
			</view>
		</view>

		<view class="flex flex-row flex-wrap justify-center" style="margin-top:70rpx;">
			<button class="btn_reg rounded" hover-class="btn_reg_hover" @tap="logout">退出登录</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {

			this.api = 'http://192.168.31.232:3000';
			return {
				scrollH: 1000,
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
		},
		methods: {
			logout(){
				// 清空token
				console.log('退出登录时取得Token : ' + uni.getStorageSync('token'))
				uni.removeStorageSync('token')
				uni.clearStorageSync()
				console.log('退出登录后取得Token : ' + uni.getStorageSync('token'))
				if (plus.os.name.toLowerCase() === 'android') {
					plus.runtime.quit();
				}
				uni.navigateTo({
					url:"../../login/login"
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}
	
	.btn_reg {
		border-radius: 50rpx;
		background: linear-gradient(to right, #f9b825, #feb103);
		font-size: 33rpx;
		width: 700rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
	}
	
	.btn_reg_hover {
		border-radius: 50rpx;
		background: linear-gradient(to right, #feb103, #f9b825);
		font-size: 33rpx;
		width: 700rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
	}
</style>
