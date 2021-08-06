export default {
	// time 日期格式如： Thu Apr 08 2021 14:03:47 GMT+0800 (中国标准时间)
	// 获取 yyyy-MM-dd hh:mi:ss 2021-02-12 03:22:34 格式的日期
	getYmd: function(time) {
		let date = new Date(time)
		let year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()
		let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
		let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
		second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
		month >= 1 && month <= 9 ? (month = "0" + month) : ""
		day >= 0 && day <= 9 ? (day = "0" + day) : ""
		let timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
		return timer
	},
	// 获取 MM-dd 格式的日期
	getMd: function(time) {
		let date = new Date(time)
		let month = date.getMonth() + 1
		let day = date.getDate()

		month >= 1 && month <= 9 ? (month = "0" + month) : ""
		day >= 0 && day <= 9 ? (day = "0" + day) : ""
		let timer = month + '-' + day
		return timer
	},

	// 预览图片
	previewImage(image) {
		var imgArr = [];
		imgArr.push(image);
		//预览图片
		uni.previewImage({
			urls: imgArr,
			current: imgArr[0]
		});
	}

}
