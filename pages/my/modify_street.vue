<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 20rpx;">
			
			
			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<uni-data-picker v-model="slectedStreet" :localdata="streetData" style="width: 700rpx;"
					popup-title="请选择所属街道"></uni-data-picker>
			</view>
			
		</view>

		
		<view class="flex flex-row flex-wrap justify-center" style="margin-top:70rpx;">
			<button class="btn_reg rounded" hover-class="btn_reg_hover" @click="modifyStreet">提 交</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 1000,
				
				slectedStreet: '',
				streetData: [{
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
		onLoad() {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(145)
					console.log('scrollH : ' + this.scrollH)
				}
			})
		},
		methods: {
			
			// 上报事件
			modifyStreet: function() {
				if(!this.slectedStreet){
					uni.showToast({
						title: '请选择所属街道',
						icon: 'none'
					});
					return false
				}
				this.$H.post('/api/account/modifyStreet', {
					streetId : this.slectedStreet
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						});
						setTimeout(function() {
							uni.navigateTo({
								url: "/pages/my/my"
							})
						}, 1000)
					} else {
						uni.showToast({
							title: '修改失败',
							icon: 'none'
						});
					}
				})
			}
		}
	}
</script>

<style>
	.txt_input {
		width: 675rpx;
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 5rpx;
		font-size: 32rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
		border-style: solid;
		border-width: 1rpx;
		border-color: #e4e4e4;
	}

	.btn_reg {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3399ff, #3481f5);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_reg_hover {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3481f5, #3399ff);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}
</style>
