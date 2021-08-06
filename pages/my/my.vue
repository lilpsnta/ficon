<template>
	<view :style="'background-color: #f7f7f7;height:'+scrollH+'px;'">
		<view class="flex flex-row flex-nowrap" style="background-color: #f5c205;height:200rpx;">
			<view class="flex flex-row justify-center align-center"
				style="width: 200rpx; height:200rpx;line-height: 130rpx;">
				<image :src="headerImg"
					style="width:130rpx;height:130rpx;border-style: solid;border-width:12rpx;border-color: #ffe068;border-radius: 50%;">
				</image>
			</view>
			<view class="flex flex-row justify-start align-center" style="width: 200rpx;">
				<text style="font-size: 36rpx;color: #FFFFFF;">张明多</text>
			</view>
			<view class="flex flex-row justify-end align-center"
				style="width: 350rpx;height: 200rpx;line-height:200rpx;">
			</view>
		</view>

		<view class="flex flex-row flex-wrap justify-center" style="width: 750rpx;background-color: #FFFFFF;">
			
			<view class="flex flex-row flex-nowrap border-bottom"
				style="width: 700rpx;height: 108rpx;background-color: #FFFFFF;">
				<view class="flex flex-row justify-center align-center"
					style="width:100rpx;height:108rpx;line-height:108rpx;">
					<image src="../../static/icon/avator_1.png" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="flex flex-row  align-center"
					style="width:300rpx;height:108rpx;line-height:108rpx;font-size: 30rpx;color: #333333;">
					账号
				</view>
				<view class="flex justify-end align-center"
					style="width:300rpx;height: 108rpx;line-height:108rpx;color: #333333;">
					<text style="font-size: 30rpx;">15856585596</text>
				</view>
			</view>

			<view class="flex flex-row flex-nowrap border-bottom"
				style="width: 700rpx;height: 108rpx;background-color: #FFFFFF;">
				<view class="flex flex-row justify-center align-center"
					style="width:100rpx;height:108rpx;line-height:108rpx;">
					<image src="../../static/icon/user_name.png" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="flex flex-row  align-center"
					style="width:300rpx;height:108rpx;line-height:108rpx;font-size: 30rpx;color: #333333;">
					用户名称
				</view>
				<view class="flex justify-end align-center"
					style="width:300rpx;height: 108rpx;line-height:108rpx;color: #333333;">
					<text style="font-size: 30rpx;">fileicon</text>
				</view>
			</view>

			<view class="flex flex-row flex-nowrap border-bottom"
				style="width: 700rpx;height: 108rpx;background-color: #FFFFFF;" @click="toModPwd">
				<view class="flex flex-row justify-center align-center"
					style="width:100rpx;height:108rpx;line-height:108rpx;">
					<image src="../../static/icon/mod_pwd.png" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="flex flex-row  align-center"
					style="width:300rpx;height:108rpx;line-height:108rpx;font-size: 30rpx;color: #333333;">
					修改密码
				</view>
				<view class="flex justify-end align-center" style="width:300rpx;height: 108rpx;line-height:108rpx;">
					<image src="../../static/icon/nextda_icon.png" style="width:20rpx;height:40rpx;"></image>
				</view>
			</view>

			<view class="flex flex-row flex-nowrap border-bottom"
				style="width: 700rpx;height: 108rpx;background-color: #FFFFFF;"  @click="toSettings">
				<view class="flex flex-row justify-center align-center"
					style="width:100rpx;height:108rpx;line-height:108rpx;">
					<image src="../../static/icon/settings.png" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="flex flex-row  align-center"
					style="width:300rpx;height:108rpx;line-height:108rpx;font-size: 30rpx;color: #333333;">
					设置
				</view>
				<view class="flex justify-end align-center" style="width:300rpx;height: 108rpx;line-height:108rpx;">
					<image src="../../static/icon/nextda_icon.png" style="width:20rpx;height:40rpx;"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 1000,
				accountName : '',
				accountCode : '',
				tel : '',
				headerImg : '../../static/icon/avator.png',
				todoNum : 0,
				showTodoNum : false
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
			
		},
		onShow() {
			this.getUserInfo()
			this.getTodoList()
		},
		methods: {
			getUserInfo : function(e){
				
			},
			
			toSettings: function(){
				uni.navigateTo({
					url:"/pages/my/setting/setting"
				})
			}
		}
	}
</script>
<style scoped lang="scss">
	page {
		background: #f7f7f7;
	}
</style>
