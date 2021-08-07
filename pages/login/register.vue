<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 20rpx;">
			<view class="flex flex-row flex-wrap">
				<input class="txt_input rounded" type="number" v-model="accountCode" placeholder="请输入手机号" />
			</view>
			<view class="flex flex-row flex-nowrap" style="margin-top: 30rpx;">
				<input class="txt_valid_code rounded" type="number" v-model="validCode" placeholder="请输入验证码" />
				<button class="btn_valid_code"  @tap="getValidCode"  >{{validCodeText}}</button>
			</view>
		</view>

		<view class="flex flex-row flex-wrap justify-center" style="margin-top:70rpx;">
			<button class="btn_reg rounded" hover-class="btn_reg_hover" @tap="registerUser">注 册</button>
		</view>

		<view class="flex flex-row flex-nowrap justify-center" style="margin-top:25rpx;">
			<view class="text-left login_operation" style="width: 400rpx;" @tap="toLogin"><text>已有账号，请登录</text></view>
			<view class="text-right login_operation" style="width: 300rpx;"><text></text></view>
		</view>

	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				accountCode: '',
				validCode: '',
				password: '',
				confirmPassword: '',
				accountName: '',
				job: '',
				streetId: '',
				inviteCode: '',
				validCodeText : '获取验证码',
				intervalTime : 60,
				slectedStreet : '',
				streetData : [{
					value: "320000",
					text: "江苏",
					children: [{
							value: "320100",
							text: "南京市",
							children: [{
									value: "320111",
									text: "浦口区",
									children: [{
											value: "1",
											text: "江浦街道"
										},
										{
											value: "2",
											text: "泰山街道"
										},
										{
											value: "3",
											text: "永宁街道"
										}
									]
								}
							]
						}
					]
				}]
			}
		},
		methods: {
			getValidCode: function() {
				var that = this
				// 验证码
				if(!this.accountCode){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					});
					return false
				}
				if(that.intervalTime < 60){
					return false
				}
				uni.showToast({
					title: '短信验证码已发送',
					icon: 'none'
				});
				
				let interval = setInterval(function(){
					that.intervalTime--
					that.validCodeText = that.intervalTime + "秒后重新发送"
					if(that.intervalTime == 0){
						clearInterval(interval)
						that.validCodeText = "重新获取验证码"
						that.intervalTime = 60
					}
				}, 1000)
				
				// 发送验证码
				this.$H.post('/api/phoneCheckCode/getCode', {
						phoneNo : this.accountCode,
						codeType : 1
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
			},
			registerUser: function() {
				
				// 验证码
				if(!this.accountCode){
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
				
				if(!this.accountName){
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					});
					return false 
				}
				
				if(!this.job){
					uni.showToast({
						title: '请输入职务',
						icon: 'none'
					});
					return false 
				}
				
				if(!this.slectedStreet){
					uni.showToast({
						title: '请选择所属街道',
						icon: 'none'
					});
					return false
				}
				
				
				let registerData = {
							accountCode: this.accountCode,
							validCode: this.validCode,
							password: this.password,
							confirmPassword: this.confirmPassword,
							accountName: this.accountName,
							job: this.job,
							streetId: this.slectedStreet,
							inviteCode: this.inviteCode
				};
				
				// 注册用户
				this.$H.post('/api/account/register',registerData
				).then( res => {
					console.log('result : ' + JSON.stringify(res))
					if(res.code == 200){
						uni.showToast({
							title: '注册成功',
							icon: 'none'
						});
						
						
						
						// 跳转登录页面
						uni.navigateTo({
							url: "login"
						})
					}else{
						uni.showToast({
							title: '用户注册失败',
							icon: 'none'
						});
					}
				})
			},
			toLogin: function() {
				uni.navigateTo({
					url: "/pages/login/login"
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
		border-radius: 10rpx;
		background: linear-gradient(to right, #f9b825, #feb103);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_reg_hover {
		border-radius: 10rpx;
		background: linear-gradient(to right, #f9b825, #feb103);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_valid_code {
		border-radius: 2rpx;
		background: linear-gradient(to right, #f9b825, #feb103);
		font-size: 33rpx;
		width: 280rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
	}

	.btn_valid_code_hover {
		border-right-radius: 50rpx;
		
		background: linear-gradient(to right, #f9b825, #feb103);
		font-size: 33rpx;
		width: 280rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		
	}

	.login_operation {
		font-size: 24rpx;
		color: #999999;
	}

	.txt_input {
		width: 680rpx;
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 5rpx;
		font-size: 30rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
	}

	.txt_valid_code {
		width: 400rpx;
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 5rpx;
		font-size: 30rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
	}
</style>
