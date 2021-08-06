<template>
	<view>
		<view class="flex flex-wrap" style="padding-left: 63rpx;margin-top:42rpx;">
			<text style="font-size: 44rpx;font-weight: bold;color: #333333;">请输入验证码</text>
			<text class="w-100" style="font-size: 29rpx;font-weight: bold;color: #333333;margin-top:26rpx;">验证码已通过短信发送至+86 {{phone}}</text>
		</view>
		
		<view class="flex flex-wrap justify-center">
			<input class="input_valid_code" type="number" maxlength="6" v-model="validCode" @input="enterValidCode" />
			<view class="flex flex-row justify-between" style="width: 625rpx;margin-top: 21rpx;">
				<view class="txt_underline"></view>
				<view class="txt_underline"></view>
				<view class="txt_underline"></view>
				<view class="txt_underline"></view>
				<view class="txt_underline"></view>
				<view class="txt_underline"></view>
			</view>
			
			<view class="flex flex-wrap justify-start" style="width:625rpx;padding-top: 31rpx;">
				<text style="font-size: 24rpx;font-weight: bold;color: #03A305;" @tap="resend">重新发送</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone : '', 
				validCode : ''
			}
		},
		onLoad(query) {
			this.phone = query.phone
		},
		methods: {
			
			resend : function(){
				getApp().globalData.isLogin = true
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			enterValidCode : function(event){
				let code = event.detail.value
				if(code.length == 6 ){
					this.$H.post('/api/user/login', {
						loginType : '1',
						phone : this.phone,
						validCode : this.validCode,
						password : ''
					}).then( res => {
						console.log('login result : ' + JSON.stringify(res))
						if(res.code == 0){
							uni.setStorageSync('token',res.token)
							uni.switchTab({
								url:"/pages/index/index"
							})
						}else{
							this.validCode = ''
							uni.showToast({
								title: '验证码错误，请重新输入',
								icon: 'none'
							});
						}
					})
				}
			}
		}
	}
</script>

<style>
	.txt_underline{
		background: #03A305;height: 6rpx; width: 83rpx; margin-right: 10rpx;
	}
	
	.input_valid_code{
		letter-spacing: 78rpx; font-size: 54rpx;height: 80rpx;
			line-height: 80rpx;width:650rpx;text-align: left;padding-left:70rpx;
			caret-color: transparent;
	}
</style>
