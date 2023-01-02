/* const baseUrl = 'http://api.taibo.cn/' */
const webUrl = 'https://www.laihuizhan.com/'


let baseUrl;
if (process.env.NODE_ENV === 'development') {
	console.log('开发环境')
	baseUrl = 'http://api.demo.com/'
} else {
	console.log('生产环境')
	baseUrl = 'https://api.laihuizhan.com/'
}

export default async function() {
	
	const Debug = false
	//请求拦截
	uni.addInterceptor('request', {
		invoke(args) {
			const url = args.url;
			var urlReg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
			if(!urlReg.test(url)){
				args.url = baseUrl + url
			}
			args.header = args.header || {};
			Object.assign(args.header, {Authorization:'Bearer ' + uni.getStorageSync('token')});
			//console.log(args)
		},
		success:(e) => {
			if(e.data.code == 200){
				e.data = e.data.data
			}else{
				uni.showToast({
					title: e.data.message,
					icon: 'none',
					duration: 2000,
				});
			}
		},
		fail:(err) => {
			console.log('fail', err)
			uni.showToast({
				title: '数据获取失败',
				icon: 'error',
			});
		},
		complete:(res) => {
			//console.log('complete', res)
		}
	})
	//上传拦截
	uni.addInterceptor('uploadFile', {
		invoke(args) {
			const url = args.url;
			var urlReg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
			if(!urlReg.test(url)){
				args.url = baseUrl + url
			}
			args.header = args.header || {};
			Object.assign(args.header, {Authorization:'Bearer ' + uni.getStorageSync('token')});
			//console.log(args)
		},
		success:(e) => {
			console.log('success', e)
		},
		fail:(err) => {
			console.log('fail', err)
			uni.showToast({
				title: '数据获取失败',
				icon: 'error',
			});
		},
		complete:(res) => {
			//console.log('complete', res)
		}
	})
	//
	getApp({
		allowDefault: true
	}).globalData = {
		webUrl: webUrl
	}
	//自定义路由拦截
	//需要登录的页面 */
	const needLogin = [
		{"pattern":/^\/pages\/user.*/},	//支持正则表达式
		{"pattern":/^\/pages\/setting.*/},
		"/pages/main/contact",
	];
	//路由拦截
	let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
	list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
		uni.addInterceptor(item, {
			invoke(e) { // 调用前拦截
				//获取用户的token
				const token = uni.getStorageSync('token'),
					url = e.url.split('?')[0];
					//获取要前往的页面路径（即url去掉"?"和"?"后的参数）
				const pages = getCurrentPages();
				if(!pages.length){
					return e
				}
				//拦截强制登录页面
				let pass = true
				//pattern
				if (needLogin) {
					pass = needLogin.every((item) => {
						if(typeof(item) == 'object' && item.pattern){
							return !item.pattern.test(url)
						}
						return url != item
					})
					// console.log({pass})
				}
				if (!pass && (token == '')) {
					/* uni.showToast({
						title: '请先登录',
						icon: 'none'
					}) */
					uni.navigateTo({
						url: "/pages/main/login"
					})
					return false
				}
				return e
			},
			fail(err) { // 失败回调拦截 
				//console.log(err);
				if (Debug) {
					console.log(err);
					uni.showModal({
						content: JSON.stringify(err),
						showCancel: false
					});
				}
			}
		})
	})
	
	//
}