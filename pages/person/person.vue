<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row first">
					<view class="title">头像</view>
					<view class="right" @click="handleImg">
						<view class="tis">
							<image :src="src"></image>
						</view>
						<!-- <navigator url="../video_deatil/video_detail"> -->
							<view style="width: 16.54rpx;height:29.24rpx;margin-right:26.38rpx;background-image: url(../../static/icon/nextda_icon.png);margin-left:19.44rpx;background-size: cover;"></view>
							<!-- </navigator> -->
						
					</view>
				</view>
				<view class="row" @click="handleName">
					<view class="title">昵称</view>
					<view class="right">
						<view class="tis">{{name}}</view>
						<view style="width: 16.54rpx;height:29.24rpx;margin-right: 26.38rpx;margin-left:19.44rpx; background-image: url(../../static/icon/nextda_icon.png);background-size: cover;"></view>
					</view>
				</view>
				<view class="row" @click="handleGen">
					<view class="title">性别</view>
					<view class="right">
						<view class="tis">{{gender}}</view>
						<view style="width: 16.54rpx;height:29.24rpx;margin-right: 26.38rpx;margin-left:19.44rpx;background-image: url(../../static/icon/nextda_icon.png);background-size: cover;"></view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
		import {pathToBase64, base64ToPath } from '../../image-tools/index.js'
	export default {
		data() {
			return {
				name: '',
				gender: '',
				src:'',
				genderList:['男','女']


			};
		},
		onShow(){
			this.getList()
		},
		onLoad(opt){
			console.log(opt)
			// this.name = opt.nick;
			// this.gender = opt.gen ||'您还没有设置';
			// this.src =  opt.img
			
		},
		methods: {
			showType(tbIndex) {
				this.tabbarIndex = tbIndex;
				this.list = this.orderList[tbIndex];
			},
			getList(){
				this.$H.post('/api/my/user/info').then((res)=>{
					console.log(res.data);
					 this.name = res.data.nickName;
					 this.src = res.data.headImage;
					 this.gender = this.genderList[res.data.gender]
					 
				})
			},
			handleImg(){
				let self = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						pathToBase64(res.tempFilePaths[0]).then(base64=>{
							self.src = base64;
							//console.log(base64)
						})
				    }
				});
			},
			handleGen(){
				let self = this
				uni.showActionSheet({
					title:'选择性别',
				    itemList: ['男','女'],
				    success: function (res) {
						console.log(res)
						self.$H.post('/api/my/info/modify',{
							gender:res.tapIndex.toString(),
							nickName:'',
							headImage:''
							}).then((res)=>{
							console.log(res)
							// self.gender = self.genderList[res.tapIndex]
							uni.showToast({
								title: '修改成功',
								success: function() {
									self.getList()
									// uni.navigateBack({
									// 	delta: 1
									// })
								}
							})
						})
				        console.log('选中了第' + (res.tapIndex) + '个按钮');
				    },
				    fail: function (res) {
				        console.log(res.errMsg);
				    }
				});
			
			},
			handleName(){
				console.log('aa')
				uni.navigateTo({
					url:'../my/modify_name'
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f3f3f3;
	}

	.icon {
		font-size: 30upx;

	}

	.content {
		padding-bottom: 20upx;

		.list {
			width: 100%;
			background-color: #f6f6f6;
			margin-bottom: 20upx;

			.first {
				height: 152.77rpx;
				margin-top: 26.38rpx;
				margin-bottom: 25.69rpx;

				image {
					height: 97.22rpx;
					width: 97.22rpx;
				}
			}

			.row {
				background-color: #FFFFFF;
				padding-left: 46.38rpx;
				widows: 100%;
				min-height: 90upx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1upx #eee;

				&:last-child {
					border-bottom: none;
					margin-top: 26.38rpx;
				}

				.title {
					font-size: 32upx;
					color: #333;
				}

				.right {
					display: flex;
					align-items: center;
					color: #999;

					.tis {
						font-size: 26upx;
						margin-right: 5upx;
						max-height: 120upx;

						image {
							// width: 100upx;
							// height: 100upx;
							border-radius: 100%;
							margin: 10upx 0;
						}
					}

					i {
						font-size: 45rpx;
						width: 73.12rpx;
					}

				}

			}
		}
	}
</style>
