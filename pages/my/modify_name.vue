<template>
	<view>
		<input type="text" v-model="nick" placeholder="请输入新昵称..." />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nick: ''

			};
		},
		onNavigationBarButtonTap: function(e) { 
			console.log(e)
			// if (e.index == 1) {  
			//     console.log('点击扫码按钮了')  
			//     uni.navigateTo({  
			//         url: "../scan/scan-verify"  
			//     });  
			// } 
			if (e.name == 'baocun') {
				uni.showModal({
					content: '是否要修改昵称？',
					success: (res) => {
						if (res.confirm) {
							this.$H.post('/api/my/info/modify', {
								nickName: this.nick,
								gender:'',
								headImage:''
							}).then(res => {
								uni.showToast({
									title: '修改成功',
									success: function() {
										uni.navigateBack({
											delta: 1
										})
									}
								})
							})
						}
					}
				});
			}

		}
	}
</script>

<style lang="scss">
	input {
		width: 670.62rpx;
		height: 103.47rpx;
		border-radius: 30.55rpx;
		background: #F6F6F6;
		margin-top: 26.38rpx;
		margin-left: 26.38rpx;
		padding-left: 26.38rpx;
	}
</style>
