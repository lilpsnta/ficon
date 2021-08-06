<template>
	<view>
		<view class="flex flex-wrap justify-center" >
			
			<view style="margin-top:55rpx;">
				<view class="flex flex-nowrap">
					<input  class="txt_password" placeholder="请输入新的手机号" v-model="newPhone" />
				</view>
				<view class="divider" style="background-color: #CCCCCC;"></view>
			</view>
			
			
			<view class="flex justify-center" style="margin-top:69rpx;">
				<button class="btn_login" hover-class="btn_login_hover" @tap="modifyPwd" >保存</button>
			</view>
			
		
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPassword : true,
				showConfirmPassword : true,
				showPasswordIcon : '../../static/icon/biyan_icon@2x.png',
				showConfirmPasswordIcon : '../../static/icon/biyan_icon@2x.png',
				newPhone:'',
				mobile:'',
				validCode:''
				
			}
		},
		onLoad(opt){
			this.mobile = opt.mobile
			this.validCode = opt.validCode
		},
		methods: {
			modifyPwd : function(){
			this.$H.post('/api/my/info/modify_phone', {
				mobile: this.mobile,
				validCode: this.validCode,
				newPhone:this.newPhone
			
			}).then((res)=>{
				uni.showToast({
					title:"保存成功",
					success : function(){
						uni.navigateBack({
							delta:3
						})
					}
				})
			})
				
			},
			
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
	
	.login_operation{
		font-size: 21rpx;color: #999999;
	}
	
	.txt_phone{
		width: 500rpx;margin-left: 35rpx;height: 80rpx;line-height: 80rpx;letter-spacing: 10rpx;font-size: 32rpx;
	}
	
	.txt_password{
		width: 580rpx;height: 80rpx;line-height: 80rpx;letter-spacing: 10rpx;
	}
	
	.icon_show_password{
		width: 40rpx;height: 37rpx;margin-top: 29rpx;margin-right: 8rpx;
	}
	
	.txt_86{
		width: 50rpx;font-size: 32rpx;height: 80rpx;line-height: 80rpx;letter-spacing: 10rpx;
	}
</style>
