<template>
	<view style="background-color: #F6F6F6;height: 100vmax;">
		<p style="width: 750rpx;height: 26rpx;background-color: #F6F6F6;"></p>
		<view class="flex bgc" style="justify-content: space-between;flex-direction: column;" v-for="(item,index) in list"
		 :key="index">
			<view class="head flex" style="justify-content: space-between">
				<view class="left">

					<view class="" style="display: inline-block;margin-left: 26rpx;margin-right: 14rpx;">
						<image :src="item.headImage" class="touxiang"></image>
					</view>
					<view class="person">
						<h4 style="font-weight: 400;">{{item.nickName}}</h4>
						<label style="display: block;">{{item.date}}</label>
					</view>
				</view>
				<view class="">
					<text style="display: block;color: #03A305;font-size: 29rpx;margin-right: 26rpx;margin-top: 18rpx;">回复</text>
				</view>
			</view>
			<view class="content bgc">
				{{item.content}}
			</view>
			<view class="video ">
				<view class="left">
					<image src="../../static/banner/banner1.jpg" ></image>
				</view>
				<view class="right">
					<view class="text1">
						<text>{{item.text1}}</text>
					</view>
					<view class="text2">
						<text>{{item.text2}}</text>
					</view>
				</view>
			</view>
			<view class="reply bgc">

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					headImage: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
					nickName: '落忆似雪殇无痕',
					date: '03-02',
					content: '谢怜画的挺好看的，还有花城的拿伞姿势很到位，比心',
					imagePath: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
					text1:'加快农业农村现代化',
					text2:'乡村振兴',

				}]

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.touxiang {
		width: 69rpx;
		height: 69rpx;
		border-radius: 50%;
	}

	.bgc {
		background-color: #FFFFFF;
		padding-left: 26rpx;
	}

	.head {
		.left {
			display: flex;

			.person {
				font-size: 24rpx;
				margin-top: 8rpx;

				label {
					color: #999999;

				}
			}
		}

	}

	.content {
		color: #393939;
		font-size: 29rpx;
		margin-right: 44rpx;
		font-weight: 400;

	}
	.video{
		margin-left: 13rpx;
		margin-top: 26rpx;
		border-radius: 12rpx;
		display: flex;
		background-color: #F6F6F6;
		margin-right: 26rpx;
		.left{
			image{
				width: 292rpx;
				height: 172rpx;
				border-radius: 12rpx 0 0 12rpx;
			}
		}
		.right{
			text{
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				width: 386rpx;
				margin-left: 19rpx;
			}
			.text1{
				margin-top: 19rpx;
				font-size: 29rpx;
				font-weight: 400;
				color: #393939;
				line-height: 41rpx;
			}
			.text2{
				font-size: 24rpx;
				font-weight: 400;
				color: #999999;
				line-height: 33rpx;
			}
		}
	}
	.reply{
		margin-top: 26rpx;
	}

</style>
