<template>
	<view>
		<view class="top ">
			<video class="video" autoplay=true :src="videosrc"  controls>
				<cover-image @click="goIndex" src="../../static/icon/backbaiyiny_icon.png" mode="" style="width: 21rpx;height: 35rpx;position: relative;top: 69rpx;left: 26rpx;z-index: 1000;"></cover-image>						
				<cover-image src="../../static/icon/fenxiangyiny_icon.png" mode="" style="width: 47rpx;height: 47rpx;position: relative;top: 39rpx;right: 31rpx;float: right;z-index: 1000;"></cover-image>
			</video>			
		</view>
		<view class="topTab">
			<!-- 选项卡 -->
			<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft"
				style="width: 750rpx;height: 83rpx;" @click="ontabtap">
				<view v-for="(item,index) in tabBars" class="nav-item" :class="{current: index == tabIndex}"
					:key="index" :data-current="index">{{item.name}} {{item.num?commentNum:''}}</view>
			</scroll-view>
		</view>
		
		<swiper :style="{'height':swiperHeight+'px'}" class="swiper" @change="swiperChange" :current="tabIndex">
			<swiper-item>
				<view class="swiper-item">
					<view class="">
						<view class="publish">
							<view class="publishone">
								<view class="jianjie">
									<view>
										<image :src="txImg" class="touxiang"></image>
									</view>
									<view class="person">
										<h4 style="font-weight: 400;">{{author}}</h4>
										<text style="color: #999999;font-size: 24rpx;">{{num}}粉丝</text>
									</view>
								</view>
								<view class="concern">
									<button v-if="!isConcern">+关注</button>
									<button v-else style="background: #CCCCCC;">已关注</button>
								</view>

							</view>
							<view class="publishTwo">
								<h4 style="font-size: 33.33rpx;">{{title}}</h4>
								<view style="font-size: 23.61rpx;color:#999999;">
									{{des}}
								</view>
								<view style="margin-top: 19.44rpx;font-size: 23.61rpx;color:#999999;">
									<span style="margin-right: 54.16rpx;color:#999999;">
										{{startNum}}次播放
									</span>
									{{date.slice(5,10)}}发布
								</view>
							</view>
							<view class="publishThree">
								<transition name="shake1" mode="in-out">
									<view v-if="!isLike" class="like animated swing">
										<view @click="dianzan"
											style="background-image:url(../../static/icon/dianzanxiao_icon_nor.png);background-size: cover;width: 46.97rpx;height: 45.16rpx;display: inline-block;">

									</view><text style="color: #393939;">{{goodNum}}</text> 
									<span class='isSpan'></span>
								</view>
								<view v-else style="color: #03A305;" class="like animated bounce">
									<view @click="dianzan" style="background-image:url(../../static/icon/shouhuodianzan_icon.png);background-size: cover;width: 46.97rpx;height: 45.16rpx;display: inline-block;">
									</view> {{goodNum}}
									<span class='isSpan'></span>
								</view>
								</transition>
								<view class="">
									<view
										style="background-image:url(../../static/icon/huancunxiazai_icon_nor.png);background-size: cover;width: 46.97rpx;height: 45.16rpx;margin-right: 28.47rpx;display: inline-block;">
									</view>
									<view @click="collect" v-if="!isCollect"
										style="background-image:url(../../static/icon/shoucangda_icon_nor.png);background-size: cover;width: 46.97rpx;height: 45.16rpx;margin-right: 28.47rpx;display: inline-block;">
									</view>
									<view @click="collect" v-else
										style="background-image:url(../../static/icon/shoucangguankan_icon.png);background-size: cover;width: 46.97rpx;height: 45.16rpx;margin-right: 28.47rpx;display: inline-block;">
									</view>
									<view
										style="background-image:url(../../static/icon/fenxianghei_icon.png);background-size: cover;width: 46.97rpx;height: 45.16rpx;margin-right: 33.33rpx;display: inline-block;">
									</view>
								</view>
							</view>
						</view>

						<view  class="recommend" >
							<view class="word">
								为您推荐
							</view>
							<view class="flex flex-wrap" style="padding-left:26rpx;padding-right: 26rpx; justify-content: space-between;
								height: 250vh;">
								<view class="video-item" v-for="(video, vindex) in recommendList" :key="vindex" style="margin-top: 30rpx;"
									@click="goDetail(video.id)">
									<image class="rounded" :src="video.coverImagePath"
										style="width: 342rpx;height: 201rpx;border-radius: 0.9;"></image>
									<view class="flex align-center" style="width:349rpx ;">
										<text class="font" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{video.videoName}}</text>
									</view>
									<text class="font-sm text-light-muted" > {{video.secondTitle}}</text>
								</view>
							</view>
							<view class="flex flex-row justify-center" style="width: 750rpx;">
								<text style="color: #999999;font-size: 24rpx;height: 50rpx;line-height: 50rpx;">已经到底线了</text>
							</view>

						</view>
					</view>
				</view>
			</swiper-item>
			
			<swiper-item>
				<view class="swiper-item" id="main">
					<view class="important">
						<view class="hot" v-if="false">
							<h4 class="mr">热门评论</h4>
							<view v-for="(item,index) in hotList" :key='index'>
								<view class="jianjie">
									<view>
										<image :src="item.imgsrc" class="touxiang"></image>
									</view>
									<view class="person">
										<h4 style="font-size: 23.61rpx;font-weight: 400;">{{item.name}}</h4>
										<label style="font-size: 23.61rpx;">{{item.date}}</label>
									</view>
								</view>
								<view class="content">
									{{item.content}}
									<view style="color: #03A305;">
										<i class="iconfont icondianzan"
											style="width: 46.97rpx;height: 45.16rpx;"></i>{{item.zanNum}}
									</view>
									<view class="sublist" v-if="false">


										<view class="detail" v-for="(subitem,index) in item.subtalkList" :key="index">
											<label class="name">{{subitem.name}}: </label>
											{{subitem.content}}

										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="all">
							<h4 class="mr">全部评论</h4>
							<view v-for="(item,index) in talkList" :key='index'>
								<view class="jianjie">
									<view>
										<image :src="item.head_image" class="touxiang"></image>
									</view>
									<view class="person">
										<h4 style="font-size: 23.61rpx;font-weight: 400;">{{item.nick_name}}</h4>
										<label style="font-size: 23.61rpx;">{{item.create_time.slice(5,10)}}</label>
									</view>
								</view>
								<view class="content">
									{{item.content}}
									<view style="color: #03A305;;" v-if="false">
										<i class="iconfont icondianzan"
											style="width: 46.97rpx;height: 45.16rpx;"></i>{{item.zanNum}}
									</view>
									<view class="sublist" v-if="false">


										<view class="detail" v-for="(subitem,index) in item.subtalkList" :key="index">
											<label class="name">{{subitem.name}}: </label>
											{{subitem.content}}

										</view>
									</view>
								</view>
							</view>


						</view>

					</view>

				</view>
				<view class="fixed-bottom">
					<view class="">
						<input type="text" v-model="content" class="textInput" placeholder="写评论..." />
					</view>

					<view class="">
						<view @click="addComment" class="twoicon"
							style="width: 46.97rpx;height: 45.16rpx;margin-right: 41.66rpx;background-image:url(../../static/icon/pinglubxiao_icon.png);background-size: cover;display: inline-block;">
							<label>评论</label>
						</view>
						<view @click="collect" class="twoicon" v-if="!isCollect"
							style="width: 46.97rpx;height: 45.16rpx;background-image: url(../../static/icon/shoucangda_icon_nor.png);background-size: cover;display: inline-block;">
							<label>收藏</label>
						</view>
						<view @click="collect" class="twoicon" v-else
							style="background-image:url(../../static/icon/shoucangguankan_icon.png);background-size: cover;width: 46.97rpx;height: 45.16rpx;display: inline-block;">
							<label>收藏</label>
						</view>
					</view>
				</view>

			</swiper-item>
		</swiper>

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBars: [{
					name: '简介',
					id: '1'
				}, {
					name: '评论',
					id: '2',
					num: 28
				}],
				swiperHeight: null,
				//videosrc: 'https://vd4.bdstatic.com/mda-mcp9t66dthwcvkhe/sc/mda-mcp9t66dthwcvkhe.mp4?v_from_s=nj_videoui_4135&amp;auth_key=1616673080-0-0-43655a54d523182e4c1ab1a3a1def8e4&amp;bcevod_channel=searchbox_feed&amp;pd=1&amp;pt=3&amp;abtest=3000156_1',
				videosrc : 'http://192.168.31.232:3000/files/VID_20210410_173725.mp4',
				url: '',
				txImg: '',
				author: "",
				title: '天官赐福漫画集锦',
				des: '辛勤制作，多多点赞',
				startNum: 0,
				goodNum: null,
				date: '03-02',
				num: 0,
				concern: false,
				recommendList: [],
				recommendHeight: '',
				hotList: [{
					imgsrc: '../../static/banner/banner1.jpg',
					name: '落忆似雪殇无痕',
					date: '03-05',
					url: "",
					content: '谢怜画的挺好看的，还有花城的拿伞姿势很到位，比心。',
					zanNum: 26,
					subtalkList: [{
							name: 'aaa',
							content: 'aaa'
						},
						{
							name: 'bbb',
							content: 'bbb'
						}
					]

				}],
				talkList: [],
				tabIndex: 0, //当前选项卡索引
				lastIndex: 0,
				scrollLeft: 1000, //顶部选项卡左滑距离
				enableScroll: true,
				videoId: 2,
				content: '',
				isLike: '',
				isConcern: '',
				isCollect: '',
				commentNum: '',
				showBaseline : true

			};
		},
		onBackPress(e) {
			console.log("监听返回按钮事件", e);
			uni.switchTab({ //这里用navigateTo会不生效，用switchTab才行
				//需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数
				url: "/pages/index/index"
			})

			return true;
		},
		onNavigationBarButtonTap: function(e) {

		},
		onLoad(opt) {
			this.videoId = opt.id
		},
		mounted() {
			this.getList();
			//this.getRecommend()
			this.setSwiperHeight();
		},
		methods: {
			getList() {
				let self = this
				this.getRecommend()
				this.$H.post('/api/video/detail', {
					videoId: self.videoId,
				}).then((res) => {
					this.txImg = res.data.coverImagePath;
					this.isLike = res.data.isLike;
					this.isConcern = res.data.isConcern;
					this.isCollect = res.data.isCollect;
					this.author = res.data.publishUserName;
					this.title = res.data.videoTitle;
					this.des = res.data.videoIntro;
					this.commentNum = res.data.commentNum;
					this.date = res.data.create_time;
					this.goodNum = res.data.likeNum;
					this.startNum = res.data.playTimes;
					this.num = res.data.fansNum

					//console.log(res)
				})
			},
			goIndex(){
				// debugger
				uni.switchTab({//这里用navigateTo会不生效，用switchTab才行
				//需要跳转的应用内非 tabBar 的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数
				  url:"/pages/index/index"
				})
			},
			getCommentList() {
				this.$H.post('/api/video/comment/list', {
					videoId: this.videoId
				}).then((res) => {
					
				})
			},
			//获取推荐列表
			getRecommend() {
				this.$H.post('/api/video/detail/recommend', {
					videoId: this.videoId
				}).then(res => {
					console.log('recommend list : ' + JSON.stringify(res))
					this.recommendList = res.data
				})
			},
			// 切换分类导航
			ontabtap(e) {
				const index = e.target.dataset.current || 0;
				if (index == this.tabIndex) {
					return false;
				}
				this.tabIndex = index

				// this.isLeft = this.switchTab(index);
			},
			swiperChange(e) {
				var index = e.target.current;
				this.tabIndex = index;

				if (this.tabIndex == '1') {
					this.getCommentList()
				} else {
					this.getList()
				}
				this.setSwiperHeight()

			},
			setSwiperHeight() {
				this.swiperHeight = 0;
				//const top = document.documentElement.scrollTop || window.pageYOfset || document.body.scrollTop
				let query = uni.createSelectorQuery().in(this);
				query.selectAll(".swiper-item").boundingClientRect();
				//console.log(query.select(".swiper-item"))
				query.exec((res) => {
					//console.log(res[0][this.tabIndex].height)
					this.swiperHeight = res[0][this.tabIndex].height;

				})
			},
			dianzan() { //点赞
				let self = this
				this.$H.post('/api/video/detail/like', {
					videoId: self.videoId,
					type: this.isLike == true ? '0' : '1'
				},{token:true}).then((res) => {
					this.getList()
					//console.log(res)
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/video_deatil/video_detail?id=' + id
				})
			},
			addComment() { //添加评论
				if (this.content) {
					this.$H.post('/api/video/comment/add', {
						videoId: this.videoId,
						content: this.content
					},{token:true}).then((res) => {
						this.getCommentList()
						//console.log(res)
					})
				} else {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none',
						duration: 1000
					})
				}

			},
			collect() { //收藏
				this.$H.post('/api/video/detail/favorite', {
					videoId: this.videoId,
					type: this.isCollect == true ? '0' : '1'
				},{token:true}).then((res) => {
					this.getList()
					//console.log(res)
				})
			},


		}
	}
</script>

<style lang="scss">
	@import '../../common/icon.css';

	.shake1-enter,
	.shake1-enter-to {
		opacity: 0;
	}

	.shake1-enter-active,
	.shake1-leave-active {
		transition: opacity .8s;
	}

	.shake1-enter-to,
	.shake1-leave {
		opacity: 1;
	}

	.swiper {
		height: 381.94rpx;
		max-width: 100vw;
	}

	.like {
		position: relative;
	}

	// .swiper-item{
	// 	min-height: 100%;
	// }

	.plus-icon-enter-active {
		transition: opacity .5s;
	}

	.plus-icon-enter {
		opacity: 0;
	}

	.plus-icon-leave-active {
		transition: opacity .5s;
	}

	.plus-icon-leave-to {
		opacity: 0;
	}

	.plus-icon-enter-to {
		opacity: 1;
	}

	.top {
		width: 750rpx;
		height: 416.66rpx;
		 position: relative;
		 z-index: 100;
		.video {
			position: fixed;
			left: 0;
			right: 0;
			z-index: 100;
			width: 100%;
			height: 416.66rpx;
			z-index: 101;

		}
	}

	//overflow-y: scroll;
	.topTab {
		height: 83.33rpx;

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
				font-size: 33.33rpx;
				margin-right: 48.61rpx;
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
	}

	.publish {
		height: 409.72rpx;
		padding-top: 26.38rpx;
		padding-left: 26.38rpx;

		.publishone {
			display: flex;
			justify-content: space-between;

			.jianjie {
				display: flex;

				.person {}

				.touxiang {
					width: 83.33rpx;
					height: 83.33rpx;
					border-radius: 50%;
					margin-right: 13.88rpx;

				}
			}

			.concern {
				button {
					width: 111.11rpx;
					height: 55.55rpx;
					border-radius: 27.77rpx;
					background: linear-gradient(135deg, #F8CC2F 0%, #03A305 100%);
					font-size: 23.61rpx;
					margin-right: 26.38rpx;
					margin-top: 15.58rpx;
					color: #FFFFFF;
					line-height: 55.55rpx;
					padding: 0;
				}

			}
		}

		.publishTwo {
			margin-top: 25.69rpx;
		}

		.publishThree {
			margin-top: 38.88rpx;
			display: flex;
			justify-content: space-between;

		}
	}

	.recommend {
		background-color: #F6F6F6;
		padding-bottom: 100rpx;
		height: 100%;
		.word {
			padding-top: 33.33rpx;
			font-size: 29.16rpx;
			font-weight: 800;
			margin-left: 26.38rpx;
		}

		.picture {
			display: flex;
			flex-wrap: wrap;
            height: 250vh;
			.imgs {
				
				.img {
					width: 341.66rpx;
					height: 201.38rpx;
					border-radius: 8rpx;
				}

				label {
					display: block;
					width: 341.66rpx;
					font-size: 23.61rpx;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				h4 {
				width: 341.66rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;	
				}
			}
		}
	}

	#main {
		background-color: #F6F6F6;

		.important {
			overflow-x: hidden;
			overflow-y: scroll;
			height: 1000rpx;
			padding-bottom: 100rpx;
		}


	}

	.fixed-bottom {
		display: flex;
		background-color: #FFFFFF;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;

		.textInput {
			width: 526.38rpx;
			height: 61.11rpx;
			border-radius: 30.55rpx;
			background: #F6F6F6;
			margin-left: 26.38rpx;
			padding-left: 26.38rpx;
		}

		.twoicon {
			width: 33.33rpx;
			height: 33.33rpx;
			position: relative;
			right: 27.77rpx;
			top: -13.55rpx;
		}

		label {
			font-size: 19.44rpx;
			position: absolute;
			bottom: -30rpx;
			right: -38.77rpx;
			width: 79rpx;
		}
	}

	//}

	.hot {
		margin-top: 26.38rpx;
		background-color: #FFFFFF;

		h4.mr {
			margin-left: 26.38rpx;
		}

		.jianjie {
			display: flex;
			margin-top: 19.44rpx;

			.person {}

			.touxiang {
				height: 69.44rpx;
				width: 69.44rpx;
				border-radius: 50%;
				margin-left: 26.38rpx;
				margin-right: 13.88rpx;

			}
		}

		.content {
			margin-left: 109.72rpx;
			margin-right: 49.3rpx;
			padding-bottom: 26.38rpx;
			font-size: 29.16rpx;
			color: #393939;
			line-height: 40.97rpx;
			font-weight: 400;

			.sublist {
				background-color: #F6F6F6;
				margin-top: 17.36rpx;

				.detail {
					.name {
						color: #03A305;
						margin-right: 6.94rpx;
					}
				}

			}
		}
	}

	.all {
		background-color: #FFFFFF;
		margin-top: 33.33rpx;

		h4.mr {
			margin-left: 26.38rpx;
		}

		.jianjie {
			display: flex;
			margin-top: 19.44rpx;

			.person {}

			.touxiang {
				height: 69.44rpx;
				width: 69.44rpx;
				border-radius: 50%;
				margin-left: 26.38rpx;
				margin-right: 13.88rpx;

			}
		}

		.content {
			margin-left: 109.72rpx;
			margin-right: 49.3rpx;
			font-size: 29.16rpx;
			color: #393939;
			line-height: 40.97rpx;
			font-weight: 400;

			.sublist {
				background-color: #F6F6F6;
				margin-top: 17.36rpx;

				.detail {
					.name {
						color: #03A305;
						margin-right: 6.94rpx;
					}
				}

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
