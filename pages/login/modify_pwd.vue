<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 20rpx;">
			<view class="flex flex-row flex-wrap">
				<input class="txt_input rounded" type="number" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="flex flex-row flex-nowrap" style="margin-top: 30rpx;">
				<input class="txt_valid_code rounded" type="number" v-model="validCode" placeholder="请输入验证码" />
				<button class="btn_valid_code"  @tap="getValidCode"  >{{validCodeText}}</button>
			</view>

			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<input class="txt_input rounded" password="true" v-model="password" placeholder="请输入密码" />
			</view>

			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<input class="txt_input rounded" password="true" v-model="confirmPassword" placeholder="请输入确认密码" />
			</view>

		</view>

		<view class="flex flex-row flex-wrap justify-center" style="margin-top:70rpx;">
			<button class="btn_reg rounded" hover-class="btn_reg_hover" @tap="modifyPwd">确 定</button>
		</view>

	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				phone: '',
				validCode: '',
				password: '',
				confirmPassword: '',
				validCodeText : '获取验证码',
				intervalTime : 60
			}
		},
		methods: {
			getValidCode: function() {
				
				// 验证码
				if(!this.phone){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return false
				}
				
				
				var that = this
				
				if(that.intervalTime < 60){
					return false
				}
				
				
				
				// 发送验证码
				this.$H.post('/api/phoneCheckCode/getCode', {
						phoneNo : this.phone,
						codeType : 2
					}
				).then( res => {
					if(res.code == 200){
						uni.showToast({
							title: '短信验证码已发送',
							icon: 'none'
						});
					}else{
						uni.showToast({
							title: '短信验证码发送失败',
							icon: 'none'
						});
					}
				})
				
				let interval = setInterval(function(){
					that.intervalTime--
					that.validCodeText = that.intervalTime + "秒后重新发送"
					if(that.intervalTime == 0){
						clearInterval(interval)
						that.validCodeText = "重新获取验证码"
						that.intervalTime = 60
					}
				}, 1000)
				
				/**
				this.$H.post(
					'/api/user/validcode/send', {
						phone : this.phone
					}
				).then( res => {
					if(res.code == 0){
						uni.showToast({
							title: '短信验证码已发送',
							icon: 'none'
						});
					}else{
						uni.showToast({
							title: '短信验证码发送失败',
							icon: 'none'
						});
					}
				})
				*/
			},
			modifyPwd: function() {
				
				// 验证码
				if(!this.phone){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return false
				}
				
				if(!this.validCode){
					uni.showToast({
						title: '请输入验证码',
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
				
				if(!this.confirmPassword){
					uni.showToast({
						title: '请输入确认密码',
						icon: 'none'
					});
					return false 
				}
				
				this.$H.post('/api/account/findPwd', {
						phoneNo : this.phone,
						validCode : this.validCode,
						password : this.password
					}
				).then( res => {
					if(res.code == 200){
						uni.showToast({
							title: '密码修改成功',
							icon: 'none'
						});
						setTimeout(function(){
							uni.removeStorageSync('token')
							// 修改密码成功，跳转登录页面
							uni.navigateTo({
								url: "/pages/login/login"
							})
						}, 1000)
					}else{
						uni.showToast({
							title: '密码找回失败',
							icon: 'none'
						});
					}
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

	.btn_reg {
		border-radius: 50rpx;
		background: linear-gradient(to right, #f9b825, #feb103);
		font-size: 33rpx;
		width: 700rpx;
		height: 80rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_reg_hover {
		border-radius: 50rpx;
		background: linear-gradient(to right, #feb103, #f9b825);
		font-size: 33rpx;
		width: 700rpx;
		height: 80rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_valid_code {
		border-radius: 2rpx;
		background: linear-gradient(to right, #f9b825, #feb103);
		font-size: 33rpx;
		width: 280rpx;
		height: 95rpx;
		line-height: 95rpx;
		color: #FFFFFF;
	}

	.btn_valid_code_hover {
		border-radius: 2rpx;
		background: linear-gradient(to right, #feb103, #f9b825);
		font-size: 33rpx;
		width: 280rpx;
		height: 95rpx;
		line-height: 95rpx;
		color: #FFFFFF;
	}

	.login_operation {
		font-size: 24rpx;
		color: #999999;
	}

	.txt_input {
		width: 680rpx;
		height: 95rpx;
		line-height: 95rpx;
		letter-spacing: 5rpx;
		font-size: 32rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
	}

	.txt_valid_code {
		width: 400rpx;
		height: 95rpx;
		line-height: 95rpx;
		letter-spacing: 5rpx;
		font-size: 32rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
	}
</style>
