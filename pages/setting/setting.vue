<template>
	<view class="page bg-gray">
		<uni-list :border="false">
			<uni-list-item title="编辑资料" link="navigateTo" to="/pages/setting/profile"></uni-list-item>
			<uni-list-item title="重设密码" link="navigateTo" to="/pages/setting/password"></uni-list-item>
			<uni-list-item title="手机号" :rightText="userInfo.mobile" link="navigateTo" @click="toEditMobile"></uni-list-item>
			<uni-list-item title="邮箱" :rightText="userInfo.email" link="navigateTo" to="/pages/setting/email"></uni-list-item>
			<!-- <t-list-item title="账号安全" link="navigateTo" to="/pages/setting/security"></t-list-item> -->
		</uni-list>
		
		<!-- <view class="content-padded">
			<t-button text="退出登录" type="warning" size="lg" shape="circle" @click="onLogout"></t-button>
		</view> -->
		<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
		<text class="logout" @click="onLogout">退出登录</text>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				userInfo: {},
				token: uni.getStorageSync('token'),
			}
		},
		onShow() {
			this.loadUserinfo()
		},
		computed: mapState(['hasLogin', 'info']),
		methods: {
			...mapMutations(['logout']),
			onLogout() {
				this.logout();
				uni.switchTab({
					url: '/pages/tabbar/user'
				});
				
			},
			loadUserinfo() {
				uni.request({
					url: "v1/users/userinfo",
					success: (res) => {
						this.userInfo = res.data.userInfo
					}
				})
			},
			toEditMobile(){
				uni.navigateTo({
					url: "/pages/setting/mobile?mobile="+this.userInfo.mobile
				})
			}
		}
	}
</script>

<style>
	.content-padded{
		padding: 30rpx 60rpx;
		margin-top: 60rpx;
	}
	.logout{
		font-size: 32rpx;
		text-align: center;
		color: #EF473A;
		background-color: #FFFFFF;
		padding: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}
</style>
