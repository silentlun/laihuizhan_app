<script>
	import initApp from '@/common/appInit.js';
	import { mapState,mapMutations } from 'vuex';
	export default {
		globalData: {},
		onLaunch: function() {
			console.log('App Launch')
			initApp();
			this.updateUserinfo()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			...mapMutations(['login', 'upavatar', 'logout']),
			updateUserinfo(){
				console.log('更新用户信息')
				const token = uni.getStorageSync('token');
				let that = this;
				if(token){
					uni.request({
						url: 'v1/users/check-login',
						method: 'POST',
						success: (res) => {
							console.log(res);
							if(res.code == 401){
								that.logout()
							}else{
								const data = res.data;
								that.login(data.userInfo)
								that.upavatar(data.userInfo.avatar)
							}
						}
					})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	@import "@/static/iconfont.css";
</style>
