<template>
	<view>
		<view style="margin-left: 20rpx;margin-top:20rpx;">
			<text style="font-size: 29rpx;font-weight: bold;">推荐搜索</text>
		</view>
		<view class="flex flex-row flex-wrap">
			<view v-for="(item,index) in recommendList" :key="index" class="flex flex-row flex-nowrap align-center justify-center" 
				style="background-color: #F6F6F6;height:50rpx; border-radius: 50rpx;padding: 0rpx 15rpx;margin-left:20rpx;margin-top:20rpx;"
				@click="searchKeyword(item.title)">
				<text style="height:40rpx; line-height: 40rpx;font-size: 24rpx;margin:10rpx;">{{item.title}}</text>
				<text style="height:40rpx; line-height: 40rpx;color: #DC3545;font-size: 24rpx;">{{item.tag ? '·' + item.tag : ''}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword : '',
				recommendList : [
					{title : "建设南路", tag : "热"},
					{title : "北京东路西北段", tag : "热"},
					{title : "常江哈市北西路", tag : "热"},
					{title : "牛牛南京山西北侧小路段", tag : "热"},
					{title : "长江东路", tag : ""}
				]
			}
		},
		methods: {
			// 搜索
			onNavigationBarSearchInputConfirmed : function(e) {
				if(e.text){
					this.keyword = e.text
					uni.navigateTo({
						url: "/pages/search/search?keyword=" + this.keyword
					})
				}
			},
			onNavigationBarButtonTap: function(e) {
				console.log('index : ' + e.index)
				// 取消
				if (e.index == 0) {
					uni.switchTab({
						url: "/pages/index/index"
					})
				}
			},
			// 关键字查询
			searchKeyword : function(keyword){
				this.keyword = keyword
				uni.navigateTo({
					url: "/pages/search/search?keyword=" + keyword
				})
			}
		}
	}
</script>

<style>

</style>
