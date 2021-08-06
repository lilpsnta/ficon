<template>
	<view style="background-color: #F6F6F6;overflow: hidden;height: 100%;">
		<view class="flex w-100">
			<!-- 顶部选项卡 -->
			<view class="nav-bar" style="width: 750rpx;height: 83rpx;" @click="ontabtap">
				<view v-for="(item,index) in tabBars" class="nav-item" :class="{current: index == tabIndex}"
					:data-current="index">{{item.name}}</view>
			</view>

		</view>
		<scroll-view scroll-y="true" lower-threshold="50" :style="'height:'+scrollH + 'px;'" @scrolltolower="pushLoad">


			<view class="list">
				<view class="flex align-center p-2 detail" v-for=" (item,index) in banners" :data-index="index"
					@touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd" :style="'right:'+item.right+'px'">
					<view class="left">
						<image :src="item.coverImagePath" style="width: 291.66rpx;height: 172.22rpx;"
							class="rounded mr-2"></image>
						<view class="flex flex-column flex-1 dd">
							<text class="  title title1" style="font-size: 29rpx;">{{item.videoName}}</text>
							<text class="  title" style="font-size: 24rpx;color: #999999;">{{item.secondTitle}}</text>
							<view class="flex align-center  text-secondary author">
								<text class="mr-2" style="font-size: 24rpx;">发布者：{{item.publishUserName}}</text>
							</view>

						 <view class="remove" @click="delData(item.id)">删 除</view> 
						</view>	
							<view class="" style="margin:0 auto;text-align: center;" v-if='!loadMore' >
								<text style="color: #999999;">已经没有更多了~~</text>
							</view>	
					</view>
					<view class="remove" @click="delData(item.id)">删 除</view>
				</view>
				<view class="" style="margin:0 auto;text-align: center;" v-if='!loadMore'>
					<text style="color: #999999;">已经没有更多了</text>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import json from '@/json'
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {},
		data() {
			return {
				tabIndex: 0, //当前选项卡索引
				lastIndex: 0,
				scrollLeft: 1000, //顶部选项卡左滑距离
				enableScroll: true,
				swiperHeight: null,
				scrollH: 600,
				scrollTop: 0,
				delBtnWidth: 80,
				startX: null,
				params: {
					userId: '1',

				},
				loadMore: true,
				tabBars: [{
					name: '直播',
					id: '1'
				}, {
					name: '视频',
					id: '2'
				}],
				banners: [],
				current: 0,
				index: 1
			}
		},
		computed: {

		},
		mounted() {
			//this.setSwiperHeight();
		},

		onNavigationBarButtonTap: function(e) { //清除历史记录
			console.log(e)
			// if (e.index == 1) {  
			//     console.log('点击扫码按钮了')  
			//     uni.navigateTo({  
			//         url: "../scan/scan-verify"  
			//     });  
			// } 
			if (e.name == 'qingkong') {
				uni.showModal({
					content: '是否要清除历史记录？',
					success: (res) => {
						if (res.confirm) {
							uni.removeStorageSync('history')
							this.list = []
						}
					}
				});
			}

		},
		onReachBottom() { //上拉获取数据
			console.log('aaaa')

		},
		async onLoad() {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(145)
					console.log('scrollH : ' + this.scrollH)
				}
			})
			// 加载数据
			this.tabIndex == 0 ? this.getList() : this.getVideoList()

		},
		onReady() {

		},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			scroll(e) {
				this.scrollTop = e.detail.scrollTop
			},
			getList() { //直播历史
				this.banners = []
				this.$H.post('/api/video/history/list', {
					page: this.index,
					limit: 8
				}, {
					token: true
				}).then((res) => {
					res.data.forEach((item) => {
						item.right = 0
					})
					this.banners = res.data
				})

			},
			getVideoList() { //视频历史
				this.$H.post('/api/video/history/list', {
					offset: this.index,
					limit: 8
				}, {
					token: true
				}).then((res) => {
					res.videoList.forEach((item) => {
						item.right = 0
					})
					this.banners = this.banners.concat(res.videoList)
				})
			},
			// 切换分类导航
			ontabtap(e) {
				const index = e.target.dataset.current || 0;
				if (index == this.tabIndex) {
					return false;
				}
				this.tabIndex = index;
				index == 0 ? this.getList() : this.getVideoList()
				console.log('index:' + index + ' clickIndex:' + index + 'tabIndex:' + this.tabIndex);

			},

			switchTab(index) { //切换分类导航
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;

				this.lastIndex = this.tabIndex;
			},

			//开始触摸滑动
			drawStart(e) {
				// console.log("开始触发");
				var touch = e.touches[0];
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				// console.log("滑动");
				for (var index in this.banners) {
					this.$set(this.banners[index], 'right', 0);
				}
				var touch = e.touches[0];
				var item = this.banners[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
					this.$set(this.banners[e.currentTarget.dataset.index], 'right', disX);
				} else {
					this.$set(this.banners[e.currentTarget.dataset.index], 'right', 0);
				}

			},
			//触摸滑动结束
			drawEnd(e) {
				//console.log("滑动结束");
				// debugger
				let item = this.banners[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.banners[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
				} else {
					this.$set(this.banners[e.currentTarget.dataset.index], 'right', 0);
				}

			},
			pushLoad(e) {
				this.index = this.index + 1
				this.$H.post('/api/video/history/list', {
					userId: 1,
					offset: this.index,
					limit: 8
				}).then(res => {
					if (res.code == 0) {
						console.log(res.videoList.length)
						if (res.videoList.length < 6) {
							this.loadMore = false
						}

						res.videoList.forEach(item => {
							item.right = 0
							this.banners.push(item)
						})

					}
				})

			},

			delData(id) { //删除数据

			}
		}
	}
</script>

<style lang='scss'>
	/* 	page{
		height: 100%;
	} */
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
	}

	.list {
		height: 101vh;
		/* overflow-x: hidden;这个属性会使上拉加载失败 */
		margin-top: 33.33rpx;
		background-color: #FFFFFF;
		margin-bottom: 20rpx;

		.detail{
				background-color: #FFFFFF;
			position: relative;
			width: 100%;
			display: flex;
			border-bottom: 0.69rpx solid #F6F6F6;

			.left {
				display: flex;

				.dd {
					position: relative;
					top: -4rpx;
				}

				.title1 {
					font-weight: 600;
				}

				.title {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					width: 400rpx;
				}

				.author {
					position: relative;
					bottom: -70rpx;
				}
			}

			.remove {
				width: 111.11rpx;
				height: 205.55rpx;
				background-color: red;
				color: white;
				position: absolute;
				top: 0;
				right: -111.11rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 16px;
			}
		}


	}
</style>
