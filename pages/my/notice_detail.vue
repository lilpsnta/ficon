<template>
	<view>
		<view class="flex flex-row flex-nowrap justify-center  border-bottom" 
			style="height:100rpx;line-height:100rpx;font-size:32rpx;font-weight: 600rpx;">
			<text>{{title}}</text>
		</view>
		<view class="flex flex-row flex-nowrap justify-end " style="height: 80rpx;line-height:80rpx;margin-right:20rpx;color: #6C757D;font-size:24rpx;">
			<text>{{createTime}}</text>			
		</view>
		<view class="flex flex-row flex-wrap justify-center" style="width:700rpx;padding:20rpx;font-size:28rpx;" >
			<u-parse :content="content" ></u-parse>
		</view>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components:{
			uParse
		},
		data() {
			return {
				id : '',
				title : '',
				content : '',
				createTime : ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getData()
		},
		methods: {
			
			getData : function(){
				let that = this
				this.$H.get('/sys/api/annountCement/queryById', {
					id : this.id
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						that.title = res.result.titile
						that.createTime = res.result.createTime
						that.content = res.result.msgContent
					} else {
						uni.showToast({
							title: '查询失败',
							icon: 'none'
						});
					}
				})
			}
		}
	}
</script>

<style>
	
</style>
