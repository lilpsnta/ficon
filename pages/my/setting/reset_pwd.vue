<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 400rpx;">

			<view style="margin-top:55rpx;">
				<view class="flex flex-nowrap">
					<input :password="showPassword" class="txt_password" placeholder="6-30位的数字字母组合" v-model="newPassword" />
					<image :src="showPasswordIcon" class="icon_show_password" @tap="tabShowPassword"></image>
				</view>
				<view class="divider" style="background-color: #CCCCCC;"></view>
			</view>

			<view style="margin-top:55rpx;">
				<view class="flex flex-nowrap">
					<input :password="showConfirmPassword" class="txt_password" placeholder="再次确认新密码" v-model="confirmPassword" />
					<image :src="showConfirmPasswordIcon" class="icon_show_password" @tap="tabConfirmShowPassword"></image>
				</view>
				<view class="divider" style="background-color: #CCCCCC;"></view>
			</view>

			<view class="flex justify-center" style="margin-top:69rpx;">
				<button class="btn_login" hover-class="btn_login_hover" @tap="modifyPwd">保存</button>
			</view>


		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showPassword: true,
				showConfirmPassword: true,
				showPasswordIcon: '../../../static/icon/biyan_icon@2x.png',
				showConfirmPasswordIcon: '../../../static/icon/biyan_icon@2x.png',
				mobile: '',
				validCode: '',
				newPassword: '',
				confirmPassword: ''
			}
		},
		onLoad(opt) {
			this.mobile = opt.mobile
			this.validCode = opt.validCode
		},
		methods: {
			modifyPwd() {
				this.$H.post('/api/my/user/modify_pwd', {
					mobile: this.mobile,
					validCode: this.validCode,
					newPassword: this.newPassword,
					confirmPassword: this.confirmPassword

				}).then((res) => {
					console.log(res)
					uni.showToast({
							title: "保存成功",
							duration:1500,
							success: function() {
								uni.navigateBack({
									delta: 3
								})
							}
					})				
					}
					
					
					)
			},
			tabShowPassword: function() {
				this.showPassword = !this.showPassword
				this.showPasswordIcon = this.showPassword ? '../../../static/icon/biyan_icon.png' :
					'../../../static/icon/zhengyan_icon.png'
			},
			tabConfirmShowPassword: function() {
				this.showConfirmPassword = !this.showConfirmPassword
				this.showConfirmPasswordIcon = this.showConfirmPassword ? '../../../static/icon/biyan_icon.png' :
					'../../../static/icon/zhengyan_icon.png'
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
		border-radius: 50rpx;
		background: linear-gradient(to right, #F8CC2F, #03A305);
		font-size: 33rpx;
		width: 625rpx;
		height: 100rpx;
		line-height: 100rpx;
	}

	.btn_login_hover {
		border-radius: 50rpx;
		background: linear-gradient(to right, #03A305, #F8CC2F);
		font-size: 33rpx;
		width: 625rpx;
		height: 100rpx;
		line-height: 100rpx;
	}

	.login_operation {
		font-size: 21rpx;
		color: #999999;
	}

	.txt_phone {
		width: 500rpx;
		margin-left: 35rpx;
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 10rpx;
		font-size: 32rpx;
	}

	.txt_password {
		width: 560rpx;
		line-height: 80rpx;
		letter-spacing: 4rpx;
	}

	.icon_show_password {
		width: 40rpx;
		height: 37rpx;
		margin-top: 29rpx;
		margin-right: 8rpx;
	}

	.txt_86 {
		width: 50rpx;
		font-size: 32rpx;
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 10rpx;
	}
</style>
