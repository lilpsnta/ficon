<template>
	<view>
		<view class='t-toptips' :style="{top: top,background: cubgColor}" :class="[show?'t-top-show':'']">
			<view v-if="loading" class="flex flex-sub">
				<view class="cu-progress flex-sub round striped active sm">
					<view :style="{ background: color,width: value + '%'}"></view>
				</view>
				<text class="margin-left">{{value}}%</text>
			</view>
			<block v-else>{{msg}}</block>
		</view>
		<!-- #ifdef H5 -->
		<h5-file v-if="showH5" ref="h5File" :logo="logo" :showTip="showTip" :progress="value" @abort="onAbort"
			@close="onCloseH5"></h5-file>
		<!-- #endif -->
	</view>
</template>

<script>
	import h5File from './h5-file.vue';
	export default {
		components: {
			h5File
		},
		props: {
			logo: {
				type: String,
				default: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F00%2F07%2F155788a6d8a5c42.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619847627&t=2da40b583002205c204d980b54b35040'
			},
			top: {
				type: String,
				default: 'auto'
			},
			bgColor: {
				type: String,
				default: 'rgba(49, 126, 243, 0.5)',
			},
			color: {
				type: String,
				default: '#e54d42',
			}
		},
		data() {
			this.uploadTask = null;
			return {
				cubgColor: '',
				loading: false,
				value: 5,
				show: false,
				msg: '执行完毕~',
				showH5: false,
				showTip: false,
			}
		},
		methods: {
			toast(title = '', {
				duration = 2000,
				icon = 'none'
			} = {}) {
				uni.showToast({
					title,
					duration,
					icon
				});
			},
			getRequest(url) {
				let theRequest = new Object();
				let index = url.indexOf("?");
				if (index != -1) {
					let str = url.substring(index + 1);
					let strs = str.split("&");
					for (let i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
					}
				}
				return theRequest;
			},
			/*
				上传说明：
				currentWebview: 当前窗口webview对象
				url：上传接口地址
				name：上传文件key值
				header: 上传接口请求头
				...：body内其他参数
			*/
			appChooseFile({
				currentWebview,
				url,
				name = 'file',
				header,
				...formData
			} = {}) {
				// #ifdef APP-PLUS
				let wvPath = '/uni_modules/l-file/hybrid/html/index.html';
				let wv = plus.webview.create("", wvPath, {
					'uni-app': 'none',
					top: 0,
					height: '100%',
					background: 'transparent'
				}, {
					url,
					header,
					formData,
					key: name,
					logo: this.logo
				});
				wv.loadURL(wvPath);
				currentWebview.append(wv);
				wv.overrideUrlLoading({
					mode: 'reject'
				}, (e) => {
					let {
						fileName,
						str
					} = this.getRequest(e.url);
					fileName = unescape(fileName);
					str = unescape(str);
					return this.handleBack(fileName, str);
				});
				// #endif
			},
			wxChooseFile(param) {
				wx.chooseMessageFile({
					count: 1,
					type: 'file',
					success: ({
						tempFiles
					}) => {
						this.setdefUI();
						this.handleWXUpload(param, tempFiles[0]);
					},
					fail: () => this.errorHandler('文件选择失败', this.upErr)
				})
			},
			h5ChooseFile(param) {
				this.showH5 = true;
				this.value = 0;
				this.$nextTick(() => {
					this.$refs.h5File.hFile.onchange = (event) => {
						this.handleH5Upload(param, event.target.files[0]);
					}
				})
			},
			handleH5Upload({
				url,
				name = 'file',
				header,
				...data
			} = {}, tempFile) {
				let fileName = tempFile.name;
				let formData = new FormData();
				for (let keys in data) {
					formData.append(keys, data[keys]);
				}
				formData.append(name, tempFile);
				this.uploadTask = new XMLHttpRequest();
				this.uploadTask.open("POST", url, true);
				for (let keys in header) {
					this.uploadTask.setRequestHeader(keys, header[keys]);
				}

				this.uploadTask.ontimeout = () => {
					setTimeout(() => {
						this.showTip = false;
						return this.errorHandler('请求超时', this.upErr);
					}, 1000);
				};

				this.uploadTask.upload.addEventListener("progress", (event) => {
					if (event.lengthComputable) {
						this.value = Math.ceil(event.loaded * 100 / event.total);
						if (this.value > 100) {
							this.value = 100;
						}
						this.$forceUpdate();
					}
				}, false);

				this.uploadTask.onreadystatechange = (ev) => {
					if (this.uploadTask.readyState == 4) {
						console.log('status：' + this.uploadTask.status);
						if (this.uploadTask.status == 200) {
							return this.handleBack(fileName, this.uploadTask.responseText);
						} else {
							this.showTip = false;
							if (this.uploadTask.status == 0) {
								console.log('请检查请求头Content-Type与服务端是否匹配，并确认服务端已正确开启跨域');
							}
							return this.errorHandler('文件上传失败', this.upErr);
						}

					}
				};
				this.showTip = true;
				this.uploadTask.send(formData);
			},
			handleWXUpload({
				url,
				name = 'file',
				header,
				...formData
			} = {}, tempFile) {
				let opt = {
					url,
					name,
					formData,
					header,
					filePath: tempFile.path
				};
				let fileName = tempFile.name;
				opt['fail'] = (e) => {
					this.showTip = false;
					return this.errorHandler('文件上传失败', this.upErr)
				};
				opt['success'] = (res) => {
					if (res.statusCode == 200) {
						let data = JSON.parse(res.data);
						//可自行添加后台返回状态验证
						return this.onCommit(this.$emit('up-success', {
							fileName,
							data
						}));
					}
					return this.errorHandler('文件上传失败', this.upErr);
				};
				this.showTip = true;
				this.uploadTask = uni.uploadFile(opt);
				this.uploadTask && this.uploadTask.onProgressUpdate(({
					progress = 0
				}) => {
					if (progress <= 100) {
						this.value = progress;
						this.$forceUpdate();
					}
				});
			},
			onCloseH5() {
				this.showH5 = false;
			},
			onAbort() {
				this.uploadTask && this.uploadTask.abort();
				this.showTip = false;
			},
			// app+h5返回内容，此处按实际项目修改
			handleBack(fileName, str = '{}') {
				console.log('可根据需求自行修改emit内容，服务端返回：' + str);
				try {
					str = JSON.parse(str);
				} catch (e) {
					str = {
						id: str
					};
				}
				return this.onCommit(this.$emit('up-success', {
					statusCode: 200,
					fileName,
					...str
				}));
			},
			/* 
			上传
			*/
			upload(param = {}) {
				if (!param.url) {
					this.toast('上传地址不正确');
					return;
				}
				if (this.loading) {
					this.toast('还有个文件玩命处理中，请稍候..');
					return;
				}

				// #ifdef APP-PLUS
				return this.appChooseFile(param);
				// #endif

				// #ifdef MP-WEIXIN
				return this.wxChooseFile(param);
				// #endif

				// #ifdef H5
				this.h5ChooseFile(param);
				// #endif
			},
			/* 
			打开文件 
			*/
			open(filePath) {
				let system = uni.getSystemInfoSync().platform;
				if (system == 'ios') {
					filePath = encodeURI(filePath);
				}
				uni.openDocument({
					filePath,
					success: (res) => {
						console.log('打开文档成功');
					}
				});
			},
			/* 
			APP自定义保存 
			 */
			plusSaveFile({
				url,
				customName = '',
				opt
			}) {
				let dtask;
				return new Promise((resolve, reject) => {
					// 可自行修改参数
					// 参数api: http://www.html5plus.org/doc/zh_cn/downloader.html#plus.downloader.DownloadOptions
					let downloadOptions = {
						method: "GET",
						timeout: 120,
						retryInterval: 10
					};
					customName && (downloadOptions['filename'] = `_downloads/files/${customName}`);
					downloadOptions = {
						...downloadOptions,
						...opt
					};
					dtask = plus.downloader.createDownload(url, downloadOptions, (d, status) => {
						// 下载完成
						if (status == 200) {
							let tempFilePath = d.filename;
							this.value = 100;
							this.onCommit(resolve(tempFilePath))
						} else {
							this.errorHandler('下载失败', reject)
						}
						dtask = null;
					});
					dtask.addEventListener('statechanged', ({
						downloadedSize = 0,
						state = 0,
						totalSize = 0
					} = {}) => {
						if (state === 3) {
							let total = totalSize > 0 ? totalSize : fileSize;
							let progressVal = Math.ceil(downloadedSize / total * 100);
							this.value = progressVal > 100 ? 100 : progressVal;
							this.$forceUpdate()
						}
					}, false);
					dtask.start();
				});
			},
			/* 
			下载
			 type: temporary=返回临时地址，save=长期保存到本地
			 */
			download({
				url,
				type = 'temporary',
				customName = '',
				...opt
			}) {
				if (this.loading) {
					this.toast('还有个文件玩命处理中，请稍候..');
					return;
				}
				this.setdefUI();

				// #ifdef APP-PLUS
				if (type == 'save') {
					return this.plusSaveFile({
						url,
						customName,
						opt
					});
				}
				// #endif

				return new Promise((resolve, reject) => {
					url = encodeURI(url);
					let downloadTask = uni.downloadFile({
						url,
						success: ({
							statusCode,
							tempFilePath
						}) => {
							if (statusCode === 200) {
								if (type == 'save') {
									uni.saveFile({
										tempFilePath,
										success: ({
											savedFilePath
										}) => this.onCommit(resolve(savedFilePath)),
										fail: () => this.errorHandler('下载失败', reject)
									});
								} else {
									this.onCommit(resolve(tempFilePath))
								}
							}
						},
						fail: () => this.errorHandler('下载失败', reject)
					});

					downloadTask.onProgressUpdate(({
						progress = 0
					}) => {
						if (progress <= 100) {
							this.$nextTick(() => {
								this.value = progress;
							});
						}
					});
				})

			},

			onCommit(resolve) {
				this.msg = '执行完毕~';
				this.loading = false;
				this.cubgColor = 'rgba(57, 181, 74, 0.5)';
				setTimeout(() => {
					this.show = false;
					this.showH5 = false;
				}, 1500);
				return resolve;
			},

			setdefUI() {
				this.cubgColor = this.bgColor;
				this.value = 0;
				this.loading = true;
				this.show = true;
			},

			upErr(errText) {
				this.$emit('up-error', errText);
			},

			errorHandler(errText, reject) {
				this.msg = errText;
				this.loading = false;
				this.cubgColor = 'rgba(229, 77, 66, 0.5)';
				setTimeout(() => {
					this.show = false;
				}, 1500);
				return reject(errText);
			}
		}
	}
</script>

<style scoped>
	.t-toptips {
		width: 100%;
		padding: 18upx 30upx;
		box-sizing: border-box;
		position: fixed;
		z-index: 90;
		color: #fff;
		font-size: 30upx;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		word-break: break-all;
		opacity: 0;
		transform: translateZ(0) translateY(-100%);
		transition: all 0.3s ease-in-out;
	}

	.t-top-show {
		transform: translateZ(0) translateY(0);
		opacity: 1;
	}
</style>
