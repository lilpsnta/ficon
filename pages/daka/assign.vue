<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 20rpx;">
			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<!-- <input class="txt_input rounded" v-model="street" placeholder="请选择街道" /> -->
				<uni-data-picker v-model="assignUserId" :localdata="userList" style="width: 700rpx;"
					popup-title="请选择所属街道人员" ></uni-data-picker>
			</view>
			
			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<textarea class="border rounded" placeholder="指派意见" v-model="assignIntro"
				 style="width:670rpx;height:150rpx;padding:10rpx;padding-left:20rpx;font-size:30rpx;color: #444444;"/>
			</view>
		</view>

		<view class="flex flex-row flex-wrap justify-center" style="margin-top:70rpx;">
			<button class="btn_handle rounded" hover-class="btn_handle_hover" @click="event_assign">提 交</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				eventId: '',
				assignUserId : '',
				assignIntro : '',
				userList : []
			}
		},
		onLoad(option) {
			this.eventId = option.id
		},
		mounted() {
			this.getUserList()
		},
		methods: {
			
			getUserList : function(){
				let that = this 
				this.$H.get('/sys/api/getUserListByType', {
					userType : 1
				}, {
					token: true
				}).then(res => {
					console.log('user result : ' + JSON.stringify(res))
					if (res.success) {
						let userList = res.result
						console.log('userList : ' + res.result)
						if(userList){
							for(var i = 0 ; i < userList.length; i++){
								that.userList.push({
									value : userList[i].username,
									text : userList[i].realname
								})
							}
							console.log('that.userList : ' + JSON.stringify(that.userList))
						}
					} else {
						uni.showToast({
							title: '查询指派列表用记失败',
							icon: 'none'
						});
					}
				})
			},
			// 指派事件
			event_assign : function(){
				
				this.$H.post('/api/event/assign', {
					id: this.eventId,
					assignUserId : this.assignUserId,
					assignIntro : this.assignIntro
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						uni.showToast({
							title: '指派成功',
							icon: 'none'
						});
						setTimeout(function() {
							/**
							uni.navigateTo({
								url: "/pages/daka/event_list?searchType=3"
							})*/
							uni.switchTab({
								url:"/pages/index/index"
							})
						}, 1000)
					} else {
						uni.showToast({
							title: '指派失败',
							icon: 'none'
						});
					}
				})
			},
		}
	}
</script>

<style>
	.txt_input {
		width: 680rpx;
		height: 95rpx;
		line-height: 95rpx;
		letter-spacing: 5rpx;
		font-size: 32rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
	}

	.btn_handle {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3399ff, #3481f5);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_handle {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3481f5, #3399ff);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}
</style>
