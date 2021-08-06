<template>
	<view>
		<view style="width: 750rpx;height: 417rpx;">
			<image :src="selectedCoverPath" style="width: 750rpx;height: 417rpx;"></image>
		</view>
		
		<view style="position: absolute;bottom: 200rpx;">
			<view class="flex flex-nowrap justify-center" style="width: 750rpx;">
				<image v-for="(item, index) in coverList" :key="index" :src="item.coverImagePath" 
					:class="item.selected ? 'cover_selected' : 'cover' " :data-index="index" 
					@tap="selectCover"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coverList : [
					{
						id : 1,
						coverImagePath : '/static/cover/cover1.jpg',
						selected : true
					},
					{
						id : 2,
						coverImagePath : '/static/cover/cover2.jpg',
						selected : false
					},
					{
						id : 3,
						coverImagePath : '/static/cover/cover3.jpg',
						selected : false
					},
					{
						id : 4,
						coverImagePath : '/static/cover/cover4.jpg',
						selected : false
					},
					{
						id : 5,
						coverImagePath : '/static/cover/cover5.jpg',
						selected : false
					}
				],
				selectedCoverPath : ''
			}
		},
		onLoad(){
			this.selectedCoverPath = this.coverList[0].coverImagePath
		},
		methods: {
			selectCover : function(e){
				let index = e.target.dataset.index
				this.coverList.forEach( item => {
					item.selected = false
				})
				this.coverList[index].selected = true
				this.selectedCoverPath = this.coverList[index].coverImagePath
				uni.setStorageSync('publish_cover_image_path', this.selectedCoverPath)
			},
			onNavigationBarButtonTap : function(e){
				console.log('button index : ' + e.index)
				if(e.index == 0){
					uni.navigateBack({
						url : "/pages/publish/publish"
					})
				}
			}
		}
	}
</script>

<style>
	
	page{
		background-color: #393939;
	}
	.cover {
		width: 139rpx;height: 139rpx;margin-right:10rpx;
	}
	
	.cover_selected {
		width: 139rpx;height: 139rpx;margin-right:10rpx;border-color: #FFFFFF;border-style: solid; border-width: 5rpx;
	}
</style>
