const baseUrl = 'http://api.taibo.cn/'
const webUrl = 'http://www.taibo.cn/'
const zkUrl = 'http://tiu.taibo.cn/'

//const baseUrl = 'http://192.168.1.252:8099/'
//const webUrl = 'http://192.168.1.252:8091/'
//const zkUrl = 'http://192.168.1.252:8095/'

//const baseUrl = 'http://192.168.0.150:8080/'


export default async function() {
	const Debug = false
	//请求拦截
	uni.addInterceptor('request', {
		invoke(args) {
			const url = args.url;
			if (url.indexOf('https://') === 0 || url.indexOf('http://') === 0) {
			} else {
				args.url = baseUrl + url
			}
			//console.log(args.url)
			//args.header = {Authorization:'Bearer ' + uni.getStorageSync('token')}
			args.header = args.header || {};
			Object.assign(args.header, {Authorization:'Bearer ' + uni.getStorageSync('token')});
			//console.log(args)
		},
		success:(e) => {
			//console.log('request success', e)
			//if(e.data.code == 200) e.data = e.data.data
		},
		fail:(err) => {
			//console.log('fail', err)
		},
		complete:(res) => {
			//console.log('complete', res)
		}
	})
	//
	getApp({
		allowDefault: true
	}).globalData = {
		appUrl: webUrl,
		zkUrl: zkUrl
	}
	//自定义路由拦截
	//需要登录的页面 */
	const needLogin = [
		{"pattern":/^\/pages\/user.*/},	//支持正则表达式
		{"pattern":/^\/pages\/message.*/},
		"/pages/event/order",
		"/pages/zhiku/pdf",
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