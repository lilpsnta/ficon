<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 100rpx;">
			<image src="../../static/login/logo.png" style="width: 200rpx;height: 200rpx;"></image>
		</view>
		
		<view class="flex flex-wrap justify-center" style="margin-top: 100rpx;">
			<view class="flex flex-row flex-wrap">
				<input class="txt_phone rounded" v-model="username" placeholder="请输入账号" />
			</view>
			
			<view class="flex flex-row flex-wrap" style="margin-top: 50rpx;">
				<input class="txt_password rounded" password="true" v-model="password" placeholder="请输入密码" />
			</view>
			
			<view class="flex flex-row flex-wrap" style="margin-top:70rpx;">
				<button class="btn_login rounded" hover-class="btn_login_hover" @tap="login" >登    录</button>
			</view>
			
			<view class="flex flex-row flex-nowrap" style="margin-top:40rpx;">
				<view class="text-left login_operation" style="width: 345rpx;" @tap="registerUser"><text>注册新用户</text></view>
				<view class="text-right login_operation" style="width: 300rpx;" @tap="forgetPwd"><text>忘记密码</text></view>
			</view>
		</view>
		<!--
		<view style="position: absolute;left:147rpx;bottom: 69rpx;text-align: center;"  class="flex flex-row align-center">
			<image src="../../static/icon/tongyixieyi_icon.png" style="width: 28rpx;height: 28rpx;margin-right:10rpx;"></image>
			<text style="font-size: 21rpx;color: #333333;font-weight: bold;">注册并登录代表已阅读并接受</text>
			<text style="font-size: 21rpx;color: #03A305;font-weight: bold;">《APP隐私政策》</text>
		</view>
		-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username : '',
				password : ''
			}
		},
		methods: {
			login : function(){
				/**
				if(!this.username){
					uni.showToast({
						title: '请输入账号',
						icon: 'none'
					});
					return false
				}
				if(!this.password){
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					});
					return false
				}
				
				uni.showLoading({  
				    title: '登录中...'  
				});
				*/
				uni.setStorageSync('token','123123')
				uni.switchTab({
					url:"/pages/index/index"
				})
				
				/**
				this.$H.post('/sys/app/login', {
					username : this.username,
					password : this.password
				}).then( res => {
					console.log('login result : ' + JSON.stringify(res))
					uni.hideLoading()
					if(res.success){
						uni.clearStorageSync()
						console.log('登录之前取得token:' + JSON.stringify(uni.getStorageSync('token')))
						console.log('登录接口成功返回token:' + res.result.token)
						uni.setStorageSync('token',res.result.token)
						uni.switchTab({
							url:"/pages/index/index"
						})
					}else{
						this.validCode = ''
						uni.showToast({
							title: '用户名或密码错误',
							icon: 'none'
						});
					}
				})
				*/
				
			},
			registerUser : function(){
				uni.navigateTo({
					url:"/pages/login/register"
				})
			},
			
			forgetPwd : function(){
				uni.navigateTo({
					url:"/pages/login/modify_pwd"
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
		border-radius: 50rpx;background: linear-gradient(to right, #f9b825, #feb103 );
			font-size:30rpx;width:645rpx;height: 80rpx; line-height: 80rpx;color: #FFFFFF;
	}
	
	.btn_login_hover {
		border-radius: 50rpx;background: linear-gradient(to right, #feb103, #f9b825 );
			font-size:30rpx;width:645rpx;height: 80rpx; line-height: 80rpx;color: #FFFFFF;
	}
	
	.login_operation{
		font-size: 24rpx;color: #999999;
	}
	
	.txt_phone{
		width:625rpx;height: 80rpx;line-height: 80rpx;font-size: 28rpx;background-color: #f9f9f9;
		padding-left: 40rpx; border-radius:50rpx;
		/**border-style: solid;border-color: #edecec;border-width: 1rpx;*/
	}
	
	.txt_password{
		width:625rpx;height: 80rpx;line-height: 80rpx;font-size: 30rpx;background-color: #f9f9f9;
		padding-left: 40rpx;border-radius:50rpx;
	}
	
	.icon_show_password{
		width: 40rpx;height: 37rpx;margin-top: 29rpx;margin-right: 8rpx;
	}
	
	.txt_86{
		width: 50rpx;font-size: 32rpx;height: 80rpx;line-height: 80rpx;letter-spacing: 10rpx;
	}
</style>
