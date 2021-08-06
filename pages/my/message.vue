<template>
	<view>
		<view class="content">
			<view class="list">
				<view class="row" @click="handleComment">
					<view class="title"><image src="../../static/icon/pinglunhuifu_icon.png"></image><label>评论和回复</label></view>
					<view class="right" >
						<view style="width: 16.66rpx;height:29.16rpx;margin-right:26.38rpx;background-image: url(../../static/icon/nextda_icon.png);margin-left:19.44rpx;background-size: cover;">
						</view>
					</view>
				</view>
				<view class="row" @click="handleLike">
					<view class="title"><image src="../../static/icon/shouhuodianzan_icon.png"></image><label>收获点赞</label></view>
					<view class="right">
						<view style="width: 16.66rpx;height:29.16rpx;margin-right: 26.38rpx;margin-left:19.44rpx; background-image: url(../../static/icon/nextda_icon.png);background-size: cover;"></view>
					</view>
				</view>
				<view class="row" @click="handleCon">
					<view class="title"><image src="../../static/icon/xinzengguanzhu_icon.png"></image><label>新增关注</label></view>
					<view class="right">
						<view style="width: 16.66rpx;height:29.16rpx;margin-right: 26.38rpx;margin-left:19.44rpx;background-image: url(../../static/icon/nextda_icon.png);background-size: cover;"></view>
					</view>
				</view>
				<view class="row" @click="handleSys">
					<view class="title"><image src="../../static/icon/xitongtongzhi_icon.png"></image><label>系统通知</label></view>
					<view class="right">
						<view style="width: 16.66rpx;height:29.16rpx;margin-right: 26.38rpx;margin-left:19.44rpx;background-image: url(../../static/icon/nextda_icon.png);background-size: cover;"></view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		onShow() {
		
		},
		onLoad(opt) {
			console.log(opt)
	

		},
		methods: {
			handleComment(){
				uni.navigateTo({
					url:'./comment_reply'
				})
			},
			handleLike(){
				uni.navigateTo({
					url:"harvest_like"
				})
			},
			handleCon(){
				uni.navigateTo({
					url:'add_concern'
				})
			},
			handleSys(){
				uni.navigateTo({
					url:'sys_notice'
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

			.row {
				background-color: #FFFFFF;
				padding-left: 46.38rpx;
				widows: 100%;
				min-height: 138.88rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: solid 1upx #eee;


				.title {
					font-size: 32upx;
					color: #333;
					line-height: 40.97rpx;
					image{
						margin-left: 47.22rpx;
						width: 83.33rpx;
						height: 83.33rpx;
						border-radius: 50%;
					}
					label{
						line-height: 48.61rpx;
						position: relative;
						top: -28.72rpx;
						margin-left: 26.38rpx;
						color:#393939;
						font-size: 29.16rpx;
					}
				}

				.right {
					display: flex;
					align-items: center;
					color: #999;
					margin-right: 47.22rpx;

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
