<template>
	<view style="background-color: #F6F6F6;"  :style="'height:'+scrollH + 'px;'">
		<view>
			<image :src="form.coverImagePath"  style="width: 750rpx;height: 417rpx;" ></image>
			<!-- <image src="../../static/cover/edit_cover.png" style="width: 131rpx;height:61rpx; position: absolute;left:100rpx;top:335rpx;z-index: 100; "></image> -->
			<button type="warn" size="mini"  class="btn_edit_cover" hover-class="btn_edit_cover_hover" @tap="selectConver">编辑封面</button>
		</view>
		
		<form @submit="formSubmit">
		
			<view class="form_item left_padding" style="margin-top: -11rpx;">
				<view>
					<text class="font-weight-bold" style="font-size: 33rpx;height:93rpx;line-height: 93rpx;" >标题</text>
				</view>
				<view style="height: 100rpx;">
					<input type="text" placeholder="请填写视频标题（必填）" v-model="form.videoTitle" style="height: 70rpx;font-size: 29rpx;" @blur="titleBlur" />
				</view>
			</view>
			<text class="left_padding" style="font-size: 24rpx;line-height:35rpx;">*标题不可超过20个字符</text>
			
			<view class="form_item left_padding" style="height: 98rpx;margin-top: 34rpx;">
				<view class="flex flex-row" @tap="selectVideoSpec">
					<text class="font-weight-bold" style="font-size: 33rpx;height:93rpx;line-height: 93rpx;width: 574rpx;">视频专栏</text>
					<text style="width: 100rpx;height:93rpx;line-height: 93rpx;font-size:29rpx;color:#CCCCCC;">{{form.specName}}</text>
					<view class="flex flex-row align-center" style="height: 98rpx;width:50rpx;" >
						<image src="../../static/icon/nextda_icon.png" style="width: 17rpx;height:29rpx;"></image>
					</view>
				</view>
			</view>
			
			<view  class="form_item left_padding" style="margin-top: 34rpx;">
				<view>
					<text class="font-weight-bold" style="font-size: 33rpx;height:93rpx;line-height: 93rpx;">简介</text>
				</view>
				<view>
					<input placeholder="更多描述可以写在这里（选填）" v-model="form.secondTitle" style="height: 70rpx;font-size: 29rpx;" @blur="secondTitleBlur" />
				</view>
			</view>
			
			<text class="left_padding" style="font-size: 24rpx;line-height:35rpx;">*简介不可超过30个字符</text>
			
			<view style="position: fixed;bottom: 0rpx;width:750rpx;height: 100rpx;">
				<button form-type="submit" class="w-100 text-white btn_publish" hover-class="btn_publish_hover" >发布</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 0,
				specId : '',
				form : {
					fileId : '',
					videoTitle : '',
					secondTitle : '',
					coverImagePath : '/static/cover/publish_cover.jpg',
					specId: '',
					specName : ''
				}
			}
		},
		onLoad(query) {
			// 获取屏幕宽度,设置scroll可滑动高度
			uni.getSystemInfo({
				success:res=>{
					this.scrollH = res.windowHeight - uni.upx2px(151)
					console.log('scrollH : ' + this.scrollH)
				}
			})
		},
		onShow(e){
			let videoTitle = uni.getStorageSync('publish_video_title')
			let videoSecondTitle = uni.getStorageSync('publish_video_second_title')
			let fileId = uni.getStorageSync('publish_file_id')
			let selectedCoverImagePath = uni.getStorageSync('publish_cover_image_path')
			let specId = uni.getStorageSync('publish_spec_id')
			let specName = uni.getStorageSync('publish_spec_name')
			
			console.log('specName : ' + specName)
			
			this.form.videoTitle = videoTitle ? videoTitle : ''
			this.form.secondTitle = videoSecondTitle ? videoSecondTitle : ''
			this.form.specId = specId ? specId : ''
			this.form.specName = specName? specName : ''
			this.form.fileId = fileId ? fileId : ''
			this.form.coverImagePath = selectedCoverImagePath ? selectedCoverImagePath : '/static/cover/publish_cover.jpg'
			
			console.log('onShow form data ' + JSON.stringify(this.form))
			
			// 触发强制渲染
			this.$forceUpdate()
			uni.setStorageSync('publish', this.form)
		},
		methods: {
			titleBlur : function(e){
				let videoTitle = e.detail.value
				uni.setStorageSync('publish_video_title', videoTitle)
			},
			secondTitleBlur : function(e){
				let secondTitle = e.detail.value
				uni.setStorageSync('publish_video_second_title', secondTitle)
			},
			selectConver : function(){
				uni.navigateTo({
					url:"/pages/publish/select_cover",
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			selectVideoSpec : function(){
				uni.navigateTo({
					url: "/pages/publish/video_spec"
				})
			},
			formSubmit : function(e){
				// 获取封面图片路径
				console.log('已选定的视频封面:' + this.form.coverImagePath)
				if(!this.form.coverImagePath){
					uni.showToast({
						title: '请先编辑视频封面',
						icon: 'none'
					});
					return false;
				}
				
				if(!this.form.videoTitle){
					uni.showToast({
						title: '请填写标题',
						icon: 'none'
					});
					return false;
				}
				
				if(!this.form.specId){
					uni.showToast({
						title: '请选择视频专栏',
						icon: 'none'
					});
					return false;
				}
				
				if(!this.form.secondTitle){
					uni.showToast({
						title: '请填写简介',
						icon: 'none'
					});
					return false;
				}
				console.log('publish commit form data : ' + JSON.stringify(this.form))
				
				this.$H.post('/api/video/publish', {
						videoTitle : this.form.videoTitle,
						secondTitle : this.form.secondTitle,
						fileId : this.form.fileId,
						coverImagePath : this.form.coverImagePath,
						specId : this.form.specId
					}).then(res => {
						if(res.code == 0){
							// 发布成功
							uni.showToast({
								title: '视频发布成功',
								icon: 'none'
							});
							setTimeout(() => {
								// 跳转我的作品列表
								uni.navigateTo({
									url : '../my/my_video'
								})
							}, 1500)
						}else{
							uni.showToast({
								title: '视频发布失败',
								icon: 'none'
							});
						}
					})
			},
			onBackPress(e){
				console.log('back')
				uni.switchTab({
					url:"../my/my"
				})
				return true;
			}
		}
	}
</script>

<style>
	button::after { border: none }
	
	.btn_publish {
		border-radius: 0;background: linear-gradient(to right, #F8CC2F, #03A305 );
			font-size:33rpx;height: 100rpx; line-height: 100rpx;
	}
	
	.btn_publish_hover {
		border-radius: 0;background: linear-gradient(to right, #03A305, #F8CC2F );
			font-size:33rpx;height: 100rpx;line-height: 100rpx;
	}
	
	
	.btn_edit_cover{
		position: absolute;left:26rpx;top:335rpx;z-index: 100;color: #FFFFFF;
		border-radius: 50rpx;background: linear-gradient(to right, #F8CC2F, #03A305 );
	}
	
	.btn_edit_cover_hover{
		position: absolute;left:26rpx;top:335rpx;z-index: 100;color: #FFFFFF;
		border-radius: 50rpx;background: linear-gradient(to right, #03A305, #F8CC2F );
	}
	
	.form_item {
		background-color: #FFFFFF;height: 190rpx;padding-left: 26rpx;
	}
	
	.left_padding {
		padding-left: 26rpx;
	}
</style>
