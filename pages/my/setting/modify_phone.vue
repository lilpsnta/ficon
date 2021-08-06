<template>
	<view>
		
		<view class="flex flex-wrap justify-center" style="margin-top: 400rpx;">
			<view class="flex flex-row flex-wrap" style="width: 625rpx;">
				<text class="txt_86">+86</text>
				<input class="txt_phone" placeholder="请输入原来的手机号" v-model="mobile" />
				<view class="divider"></view>
			</view>
			
			<view class="flex justify-center" style="margin-top:69rpx;">
				<button class="btn_login" hover-class="btn_login_hover" @tap="getValidCode" >获取短信验证码</button>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile:'',
			}
		},
		methods: {
			getValidCode : function(){
				uni.navigateTo({
					url: "./phone_valid_code?mobile="+this.mobile
				})
			}
		}
	}
</script>

<style>
	.divider {
		background: #03A305;
		width: 625rpx;
		height: 1rpx;
		margin-top: 26rpx;
	}
	
	
	.btn_login {
		border-radius: 50rpx;background: linear-gradient(to right, #F8CC2F, #03A305 );
			font-size:33rpx;width:625rpx;height: 100rpx; line-height: 100rpx;
	}
	
	.btn_login_hover {
		border-radius: 50rpx;background: linear-gradient(to right, #03A305, #F8CC2F );
			font-size:33rpx;width:625rpx;height: 100rpx;line-height: 100rpx;
	}
	
	.txt_phone{
		width: 500rpx;margin-left: 35rpx;height: 80rpx;line-height: 80rpx;letter-spacing: 10rpx;font-size: 32rpx;
	}
	
	.txt_86{
		width: 50rpx;font-size: 32rpx;height: 80rpx;line-height: 80rpx;letter-spacing: 10rpx;
	}
</style>
