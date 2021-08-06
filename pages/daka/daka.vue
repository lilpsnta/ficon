<template>
	<view>
		<view class="flex flex-wrap justify-center" style="margin-top: 20rpx;">
			<view class="flex flex-row flex-wrap">
				<uni-data-picker v-model="slectedRoadStatus" :localdata="roadStatusList" style="width: 700rpx;"
					popup-title="请选择路段状态"></uni-data-picker>
			</view>

			<view class="flex flex-row flex-nowrap" style="margin-top: 30rpx;padding-left:23rpx;">
				<input class="txt_input rounded" v-model="roadName" @click="selectRoad" disabled="true" placeholder="请选择路段" 
					style="marng-left:15rpx;"/>
				<image src="../../static/icon/down_arrow.png" style="width:25rpx;height:23rpx;position:relative; right: 48rpx;top: 35rpx;">
				</image>
			</view>
			<!--
			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<uni-data-picker v-model="slectedStreet" :localdata="streetData" style="width: 700rpx;"
					popup-title="请选择所属街道"></uni-data-picker>
			</view>
			-->

			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<textarea class="border rounded" placeholder="问题补充" v-model="intro" 
				 style="width:670rpx;height:150rpx;padding:10rpx;padding-left:20rpx;font-size:30rpx;color: #444444;"/>
			</view>

			<view class="flex flex-row flex-wrap" style="margin-top: 30rpx;">
				<view class="flex flex-row flex-nowrap align-center" style="width: 550rpx;">
					<image src="../../static/icon/loc.png" style="width: 35rpx;height:35rpx;margin-top:10rpx;"></image>
					<text style="font-size:26rpx;color: #717070;">{{location}}</text>
				</view>
				<view class="flex flex-row justify-end" style="width:150rpx;">
				
				</view>
			</view>
		</view>

		<uni-file-picker fileMediatype="image" title="请上传照片" :imageStyles="imageStyles" mode="grid"
			style="width: 700rpx;margin-left:25rpx;font-size:32rpx;margin-top:30rpx;" 
			 @success="success" @fail="fail" @delete="deleteFile">
			<image src="../../static/icon/take_photo.png" style="width: 60rpx;height:60rpx;"></image>
		</uni-file-picker>

		<view class="flex flex-row flex-wrap justify-center" style="margin-top:70rpx;">
			<button class="btn_reg rounded" hover-class="btn_reg_hover" @click="reportEvent">提 交</button>
		</view>

		<uni-indexed-list v-if="showRoadIndexList" :options="list" :showSelect="false" @click="itemClick" 
			:style="'height:'+scrollH+ 'px;width: 750rpx;background-color:#FFFFFF;'"></uni-indexed-list>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 1000,
				roadId: '',
				roadName : '',
				slectedRoadStatus: '',
				intro: '',
				location: '定位中...',
				imagePath: [],
				longitude : '',
				latitude : '',
				showRoadIndexList : false,
				roadStatusList: [{
						value: "1",
						text: "路段正常"
					},
					{
						value: "2",
						text: "路段异常"
					}
				],
				slectedStreet: '',
				streetData: [{
					value: "320000",
					text: "江苏",
					children: [{
							value: "320100",
							text: "南京市",
							children: [{
									value: "320111",
									text: "浦口区",
									children: [{
											value: "1",
											text: "江浦街道"
										},
										{
											value: "2",
											text: "泰山街道"
										},
										{
											value: "3",
											text: "永宁街道"
										}
									]
								}
							]
						}
					]
				}],
				// 路段
				list : [],
				imageStyles: {
					width: 100,
					height: 100,
					border: {
						radius: '2%'
					}
				},
				listStyles: {
					// 是否显示边框
					border: true,
					// 是否显示分隔线
					dividline: true,
					// 线条样式
					borderStyle: {
						width: 1,
						color: 'blue',
						style: 'dashed',
						radius: 2
					}
				},
				fileLists: [{
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg',
					extname: 'png',
					name: 'shuijiao.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg',
					extname: 'png',
					name: 'uniapp-logo.png'
				}, {
					url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg',
					extname: 'png',
					name: 'shuijiao.png'
				}],
				remark: ''
			}
		},
		onLoad() {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success: res => {
					this.scrollH = res.windowHeight - uni.upx2px(145)
					console.log('scrollH : ' + this.scrollH)
				}
			})
			
			let that = this
			uni.getLocation({
			    type: 'wgs84',
				geocode : true,
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
					that.longitude = res.longitude
					that.latitude = res.latitude
					console.log('address:' + JSON.stringify(res.address));
					if(res.address){
						let address = res.address.province + res.address.city + res.address.district + res.address.street + res.address.streetNum
						that.location = address
					}else{
						that.location = "定位失败,请检查网络和GPS开关是否打开"
					}
			    }
			});
			
			/**
			uni.chooseLocation({
			    success: function (res) {
			        console.log('位置名称：' + res.name);
			        console.log('详细地址：' + res.address);
			        console.log('纬度：' + res.latitude);
			        console.log('经度：' + res.longitude);
			    }
			});
			*/
			this.getRoadMap()
		},
		methods: {
			// 查询路段信息
			getRoadMap : function(e){
				let that = this
				this.$H.get('/api/road/list', {}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						that.list = res.result
						console.log('roadMap : ' + JSON.stringify(res.result))
					} else {
						uni.showToast({
							title: '查询路段失败',
							icon: 'none'
						});
					}
				})
			},
			onNavigationBarButtonTap: function(e) {
				console.log(e.index)

				if (e.float == 'right') {
					uni.navigateTo({
						url: "/pages/daka/my_daka"
					})
				}
			},
			// 上报事件
			reportEvent: function() {
				if(!this.slectedRoadStatus){
					uni.showToast({
						title: '请选择路段状态',
						icon: 'none'
					});
					return false
				}
				
				if(!this.roadId){
					uni.showToast({
						title: '请选择路段',
						icon: 'none'
					});
					return false
				}
				
				if(!this.intro){
					uni.showToast({
						title: '请输入问题描述',
						icon: 'none'
					});
					return false
				}
				
				if(!this.imagePath || this.imagePath.length == 0){
					uni.showToast({
						title: '请上传巡查图片',
						icon: 'none'
					});
					return false
				}
				
				this.$H.post('/api/event/report', {
					roadId: this.roadId,
					roadStatus: this.slectedRoadStatus[0],
					intro: this.intro,
					location: this.location,
					//streetId: this.slectedStreet,
					imagePath : JSON.stringify(this.imagePath),
					longitude : this.longitude,
					latitude : this.latitude
				}, {
					token: true
				}).then(res => {
					console.log('result : ' + JSON.stringify(res))
					if (res.code == 200) {
						uni.showToast({
							title: '上报成功',
							icon: 'none'
						});
						setTimeout(function() {
							uni.navigateTo({
								url: "/pages/daka/my_daka"
							})
						}, 1000)
					} else {
						uni.showToast({
							title: '上报失败',
							icon: 'none'
						});
					}
				})
			},
			success : function(e) {
				console.log('上传成功' + JSON.stringify(e) )
				this.imagePath.push(e.tempFiles[0])
			},
			fail : function(e) {
				console.log('上传失败：', e)
			},
			deleteFile : function(e){
				console.log(JSON.stringify(e))
				let deleteFileName = e.tempFile.name
				let thatImagePath = this.imagePath
				this.imagePath.forEach(function(item, index){
					if(item.name == deleteFileName){
						console.log('index :' + index)
						thatImagePath.splice(index, 1)
						return
					}
				})
				console.log("after delete : " + JSON.stringify(this.imagePath))
			},
			itemClick : function(e){
				console.log(JSON.stringify(e.item))
				this.roadId = e.item.id
				this.roadName = e.item.name
				this.showRoadIndexList = false
			},
			selectRoad : function(){
				this.showRoadIndexList = true
			}
		}
	}
</script>

<style>
	.txt_input {
		width: 675rpx;
		height: 80rpx;
		line-height: 80rpx;
		letter-spacing: 5rpx;
		font-size: 32rpx;
		background-color: #f9f9f9;
		padding-left: 20rpx;
		border-style: solid;
		border-width: 1rpx;
		border-color: #e4e4e4;
	}

	.btn_reg {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3399ff, #3481f5);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}

	.btn_reg_hover {
		border-radius: 10rpx;
		background: linear-gradient(to right, #3481f5, #3399ff);
		font-size: 33rpx;
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #FFFFFF;
	}
</style>
