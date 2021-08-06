import $C from '@/common/config.js';
import $store from '@/store/index.js';
export default {
	common:{
		baseUrl:$C.baseUrl,
		header:{
		    'Content-Type':'application/json;charset=UTF-8'
		},
		data:{},
		method:'GET',
		dataType:'json',
		token:false
	},
	request(options = {}){
		// 组织参数
		options.url = this.common.baseUrl + options.url
		options.header = options.header || this.common.header
		options.data = options.data || this.common.data
		options.method = options.method || this.common.method
		options.dataType = options.dataType || this.common.dataType
		options.token = options.token === true ?  true : this.common.token
		options.timestamp = new Date().getTime()
		
		console.log(options.url)
		
		// 请求
		return new Promise((res,rej)=>{
			// 请求之前验证...
			// token验证
			console.log("options.token : " + options.token )
			if (options.token) {
				console.log('options.token == true')
			    let token = uni.getStorageSync('token')
			    // 二次验证
			    if (!token && options.noJump !== true) {
			        uni.showToast({ title: '请先登录', icon: 'none' });
			        // token不存在时跳转
					uni.navigateTo({
					    url: '/pages/login/login',
					});
					return rej("请先登录") 
			    }
			    // 往header头中添加token
				console.log('发送请求时Token : ' + token)
			    options.header.token = token
			}else{
				options.header.token = undefined
			}
			
			console.log("请求参数 : " + JSON.stringify(options))
		    // 请求中...
		    uni.request({
		        ...options,
		        success: (result) => {
					//console.log("request result:" + JSON.stringify(result))
		            // 返回原始数据
		            if(options.native){
		                return res(result)
		            }
		            // 服务端失败
		            if(result.statusCode !== 200){
		                if (options.toast !== false) {
		                    uni.showToast({
		                        title: result.msg || '服务端失败',
		                        icon: 'none'
		                    });
		                }
		                return rej(result.data) 
		            }
		            // 其他验证...
		            // 成功
		            let data = result.data
		            res(data)
		        },
		        fail: (error) => {
					console.log("error: " + error)
					uni.showToast({ title: '请求失败：请检查网络是否正常或尝试刷新页面', icon: 'none' });
		            //uni.showToast({ title: error.errMsg || '请求失败', icon: 'none' });
		            return rej(error)
		        }
		    });
		})
	},
	get(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url,data = {},options = {}){
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	upload(url,options = {}){
		options.url = $C.baseUrl + url
		options.header = options.header || {}
		// 验证权限token
		if(options.token){
			options.header.token = $store.state.token
			if(!options.header.token){
				return uni.showToast({
					title: '非法token,请重新登录',
					icon: 'none'
				});
			}
		}
		
		return new Promise((res,rej)=>{
			uni.uploadFile({
				...options,
				success: (uploadFileRes) => {
					if(uploadFileRes.statusCode !== 200){
						return uni.showToast({
							title: '上传图片失败',
							icon: 'none'
						});
					}
					let data = JSON.parse(uploadFileRes.data)
					res(data)
				},
				fail:(err)=>{
					rej(err)
				}
			});
		})
		
	}
}