<template>
	<view class="tabpage">
		<view class="user-section">
			<view class="user-header">
				<view class="user-info-box">
					<view class="avatar-box">
						<user-avatar :avatar="avatar" size="md" @click="goProfile"></user-avatar>
					</view>
					<view class="info-box" v-if="!hasLogin">
						<text class="username" @click="toLogin">登录/注册</text>
					</view>
					<view class="info-box" v-else>
						<text class="username" @click="goProfile">{{info.nickname}}</text>
						<!-- <text class="groupname">{{info.groupname}}</text> -->
					</view>
				</view>
				<view class=""><uni-icons type="gear-filled" color="#fff" size="24" @click="toSetting"></uni-icons></view>
			</view>
			
			<view class="follow-tabs">
				<view class="follow-tabs-item">
					<text class="item-num">{{eventCount}}</text>
					<text class="item-label">关注活动</text>
				</view>
				<view class="follow-tabs-item">
					<text class="item-num">{{venueCount}}</text>
					<text class="item-label">关注场地</text>
				</view>
				<view class="follow-tabs-item">
					<text class="item-num">{{merchantCount}}</text>
					<text class="item-label">关注服务</text>
				</view>
			</view>
		</view>
		<view class="cover-container">
			<!-- <image class="arc" src="/static/arc.png" mode="widthFix"></image> -->
			<view class="my-card">
				<uni-list :border="false">
					<uni-list-item title="保险服务" to="/pages/user/baoxian/baoxian" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'list'}" link="navigateTo">
						<template v-slot:header>
							<view class="list-item-icon">
								<uni-icons color="#000000" custom-prefix="lunfont" type="icon-baoxian" size="20"></uni-icons>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item title="我的企业" to="/pages/user/company/company" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'medal'}" link="navigateTo"></uni-list-item>
					<uni-list-item title="我的关注" to="/pages/user/follow" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'star'}" link="navigateTo"></uni-list-item>
					<uni-list-item title="我的投诉" to="/pages/user/feedback" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'notification'}" link="navigateTo"></uni-list-item>
					<uni-list-item title="服务入驻" @click="goDetail(4, '服务入驻')" clickable showArrow :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'shop'}"></uni-list-item>
					<uni-list-item title="联系我们" to="/pages/main/aboutus" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'contact'}" link="navigateTo"></uni-list-item>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				userInfo:{},
				useravatar:'../../static/user_defalut.jpg',
				unionid:null,
				eventCount: 0,
				venueCount: 0,
				merchantCount: 0,
			}
		},
		onLoad() {
			uni.$on('upAvatar', (data)=>{
				console.log(data.avatar)
				if(data.avatar){
					this.avatar = data.avatar;
				}
			})
			//this.loadUserInfo();
		},
		onShow() {
			//this.loadUserInfo();
			if(this.hasLogin){
				this.loadCount()
			}
		},
		computed: mapState(['avatar', 'hasLogin', 'token', 'info']),
		methods: {
			...mapMutations(['login', 'upavatar']),
			onLogin() {
				wx.login({
					success:(res) => {
						//console.log(res)
						if (res.code) {
							//发起网络请求
							uni.request({
								url: "v1/sites/login",
								method: 'POST',
								data: {code: res.code},
								success: (result) => {
									console.log(JSON.stringify(result))
									let data = result.data
									if(data.code == 200){
										this.login(data.userInfo)
										this.upavatar(data.userInfo.avatar)
									}else{
										this.unionid = data.unionid
									}
								},
								fail: () => {
									uni.showToast({
										icon: 'error',
										title: '登录失败',
										duration: 2000
									});
								}
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
			toLogin(){
				uni.navigateTo({
					url: '/pages/main/login?unionid='+this.unionid
				});
			},
			toSetting(){
				uni.navigateTo({
					url: "/pages/setting/setting"
				})
			},
			goProfile: function (e) {
				uni.navigateTo({
					url: "/pages/setting/profile"
				})
			},
			loadUserInfo(){
				if (!this.hasLogin) {
					//this.avatar = '../../static/user_defalut.jpg';
				}
			},
			loadCount(){
				uni.request({
					url: "v1/users/favorite-count",
					success: (result) => {
						let data = result.data
						this.eventCount = data.eventCount
						this.venueCount = data.venueCount
						this.merchantCount = data.merchantCount
					}
				})
			},
			goDetail(id, title){
				uni.navigateTo({
					url: "/pages/main/webpage?id=" + id + "&title=" + title
				})
			},
		}
	}
</script>

<style>
page{
	background-color: #f8f8f9;
}
.tabpage{
	
}
.user-section{
	display: flex;
	flex-direction: column;
	background-image: linear-gradient(#d41a1a, #FF8D39);
	width: 750rpx;
	/* padding-top: calc(88rpx + var(--status-bar-height) + env(safe-area-inset-top)); */
	/* padding-top: env(safe-area-inset-top); */
	padding-left: 30rpx;
	padding-right: 30rpx;
	padding-bottom: 40rpx;
	padding-top: 30rpx;
	
}
.user-header{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.user-info-box{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	
}
.avatar-box{
	width: 120rpx;
	margin-right: 20rpx;
}
.avatar{
	width: 120rpx;
	height: 120rpx;
	border-radius: 120rpx;
	margin-right: 20rpx;
}
.info-box{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.username{
	font-size: 32rpx;
	color: #FFFFFF;
	font-weight: 500;
	margin-bottom: 10rpx;
}
.groupname{
	font-size: 24rpx;
	color: #FFFFFF;
	background-color: rgba(0,0,0,0.3);
	padding: 6rpx 30rpx;
	border-radius: 45rpx;
	flex: 1;
}
.follow-tabs{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-top: 60rpx;
}
.follow-tabs-item{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: 30rpx;
	margin-right: 30rpx;
	flex-basis: 0;
	flex-grow: 1;
	max-width: 100%;
}
.follow-tabs-item .item-num{
	font-size: 32rpx;
	font-weight: 500;
	color: #fff;
	margin-bottom: 8rpx;
}
.follow-tabs-item .item-label{
	font-size: 24rpx;
	color: #fff;
}
.cover-container{
	position:relative;
	padding-bottom: 20rpx;
	width: 750rpx;
	padding: 20rpx;
	opacity: 1;
}
.arc{
	width: 750rpx;
	height: 36rpx;
}
.my-card{
	padding-top: 10rpx;
	padding-bottom: 10rpx;
	background-color: #fff;
	border-radius: 16rpx;
}
.list-item-icon{
	margin-right: 20rpx;
}
</style>
