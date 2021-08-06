<template>
	<view class="content">
		<view class="flex w-100">
			<!-- 顶部选项卡 -->
			<view class="nav-bar" style="width: 750rpx;height: 83rpx;" @click="onTaptab">
				<view v-for="(item,index) in tabBars" class="nav-item" :class="{current: index == tabIndex}"
					:data-current="index">{{item.name}}</view>
			</view>
		</view>
		
		<view style="margin-top:30rpx;height: 600rpx;">
			<!-- 专栏左右滑动内容 -->
			<swiper :duration="150" :current="tabIndex" @change="onChangeTab" :style="'height:'+scrollH+'px;'">
				<swiper-item v-for="(search,index) in searchList" :key="index">
					<!-- 滚动列表,分页使用 -->
					<scroll-view scroll-y="true" :style="'height:'+scrollH + 'px;'" @scrolltolower="loadmore(search.id)">
						<!-- 视频列表 -->
						<view class="flex flex-wrap"
							style="padding-left:26rpx;padding-right: 26rpx; justify-content: space-between;">
							<view class="video-item" v-for="(video, vindex) in search.videoList" :key="vindex" style="margin-top: 30rpx;"
								@click="gotoDetail(video.id)">
								<image class="rounded" :src="video.coverImagePath"
									style="width: 342rpx;height: 201rpx;border-radius: 0.9;"></image>
								<view class="flex align-center" style="width:349rpx ;">
									<text class="font"
										style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{video.videoName}}</text>
								</view>
								<text class="font-sm text-light-muted"> {{video.secondTitle}}</text>
							</view>
						</view>
						<view v-if="search.showBaseline" class="flex flex-row justify-center" style="margin-bottom: 20rpx;">
							<text style="color: #999999;font-size: 24rpx;height: 50rpx;line-height: 50rpx;">已经到底线了</text>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword : '',
				scrollLeft: 0, //顶部选项卡左滑距离
				scrollInto: "",		// 
				scrollH: 600,
				scrollInfo: "",
				tabBars: [{
					name: '直播',
					id: '1'
				}, {
					name: '视频',
					id: '2'
				}],
				searchList :[
					{
						id : 2,
						name : '直播',
						videoList : [
							{
								id : 1,
								videoName : '第一次直播',
								coverImagePath : '/static/cover/cover1.jpg',
								secondTitle : '大爷，来玩呀'
							}
						],
						offset : 1,
						limit : 8,
						showBaseline : true
					},
					{
						id : 1,
						name : '视频',
						videoList : [],
						offset : 1,
						limit : 8,
						showBaseline : true
					}
				],
				current: 0,	 //直播  视频tab 当前选项卡索引值
				tabIndex: 0, //swiper 左右滑动的索引值
			}
		},
		onLoad(query) {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(200)
					console.log('scrollH : ' + this.scrollH)
				}
			})
			this.keyword = query.keyword
			
			// 修改导航栏搜索关键字值
			var webView = this.$mp.page.$getAppWebview()
			webView.setTitleNViewSearchInputText(this.keyword)
			
			// 查询视频列表
			this.getVideoData(true)
			// 查询直播列表
			this.getLiveData(true)
		},
		methods: {
			// 搜索
			onNavigationBarSearchInputConfirmed : function(e) {
				if(e.text){
					this.keyword = e.text
					// 重新查询
					this.searchList[0].offset = 1
					this.searchList[0].limit = 8
					this.searchList[1].offset = 1
					this.searchList[1].limit = 8
					this.getVideoData(true)
					this.getLiveData(true)
				}
			},
			// 取消返回首页
			onNavigationBarButtonTap: function(e) {
				console.log('index : ' + e.index)
				// 取消
				if (e.index == 0) {
					uni.switchTab({
						url: "/pages/index/index"
					})
				}
			},
			// 视频查询
			getVideoData: function(firstLoad) {
				this.$H.post('/api/video/data/search', {
						keyword : this.keyword,
						offset : this.searchList[1].offset,
						limit : this.searchList[1].limit
					}).then(res => {
						console.log("videoList : " + JSON.stringify(res.videoList))
						if (res.code == 0) {
							if(firstLoad){
								this.searchList[1].videoList = res.videoList
							}else{
								if(res.videoList.length > 0){
									res.videoList.forEach( item => {
										this.searchList[1].videoList.push(item)
									})
								}
							}
							// 显示到底提示
							if(res.videoList.length > 0 && res.videoList.length == limit){
								this.showBaseline = false
							}else{
								this.showBaseline = true
							}
						}
					})
			},
			// 查询直播数据
			getLiveData : function(firstLoad){
				
			},
			// 上拉加载更多视频 id: 1 视频查询 2直播查询
			loadmore: function(id) {
				if(id == 1){
					this.searchList[1].offset = this.searchList[1].offset + 1
					this.getVideoData(false)
				}else if(id == 2){
					// 直播查询
					this.searchList[0].offset = this.searchList[0].offset + 1
					this.getLiveData(false)
				}
			},
			// swiper change 事件
			change(e) {
				// swiper current 变化出发外层 uni-swiper-dot 组件current值变化
				let current = e.detail.current
				let specId = e.target.dataset.specId
				let spec = this.specList.filter((item) => {
					return item.specId == specId
				})
				spec[0].current = current
			},
			
			// 点击圆点事件，传入index,出发swiper current值变化
			clickItem(e) {
				let swiperDotIndex = e
				let specId = e.target.dataset.specId
				
				let spec = this.specList.filter((item) => {
					return item.specId == specId
				})
				spec[0].swiperDotIndex = swiperDotIndex
			},
			isScroll: function(index) {
				return this.tabIndex == index
			},
			// 切换分类导航，手动点击某一个选项
			onTaptab: function(e) {
				let index = e.target.dataset.current
				this.changeTab(index)
			},
			// swiper左右滑动页面,要触发tab 相应的改变
			onChangeTab: function(e) {
				this.changeTab(e.detail.current)
			},
			// tab 索引改变了，要调用该方法触发swiper 对应数据的改变
			changeTab: function(index) {
				if (this.tabIndex === index) {
					return;
				}
				// 改变swiper 当前index
				this.tabIndex = index
				// 指定滚动内容swiper到指定元素
				this.scrollInto = 'tab' + index
			},
			gotoDetail: function(id) {
				console.log("videoId : " + id)
				uni.navigateTo({
					url: "/pages/video_deatil/video_detail?id=" + id
				})
			}
		}
	}
</script>

<style lang='scss'>
	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		height: 83rpx;
		white-space: nowrap;
		box-shadow: 0 2upx 8upx rgba(0, 0, 0, .06);
		background-color: #fff;
	
		.nav-item {
			display: inline-block;
			width: 100rpx;
			height: 83rpx;
			text-align: center;
			line-height: 90upx;
			font-size: 33.33upx;
			color: #303133;
			position: relative;
	
			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 6rpx solid #03A305;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}
	
		.current {
			color: #03A305;
			font-weight: bold;
	
			&:after {
				width: 50%;
			}
		}
		
		.video-item {
			width: 349rpx;
			height: 325rpx;
			box-sizing: border-box;
			position: relative;
		}
	}
</style>
