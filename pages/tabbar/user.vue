<template>
	<view class="tabpage">
		<view class="user-section">
			<view class="user-header">
				<view class="user-info-box">
					<view class="avatar-box">
						<image class="avatar" :src="info.avatar" @click="authDetail('/pages/user/info')"></image>
					</view>
					<view class="info-box" v-if="!hasLogin">
						<text class="username" @click="login">登录/注册</text>
					</view>
					<view class="info-box" v-else>
						<text class="username">Hello, {{info.showname}}</text>
						<!-- <text class="groupname">{{info.groupname}}</text> -->
					</view>
				</view>
				<view class=""><uni-icons type="gear-filled" color="#fff" size="24" @click="toSetting"></uni-icons></view>
			</view>
			
			<view class="follow-tabs">
				<view class="follow-tabs-item">
					<text class="item-num">0</text>
					<text class="item-label">关注活动</text>
				</view>
				<view class="follow-tabs-item">
					<text class="item-num">0</text>
					<text class="item-label">关注场地</text>
				</view>
				<view class="follow-tabs-item">
					<text class="item-num">0</text>
					<text class="item-label">关注服务</text>
				</view>
			</view>
		</view>
		<view class="cover-container">
			<!-- <image class="arc" src="/static/arc.png" mode="widthFix"></image> -->
			<view class="my-card">
				<uni-list :border="false">
					<uni-list-item title="我的订单" to="/pages/user/insurance-order" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'list'}" link="navigateTo">
						<template v-slot:header>
							<view class="list-item-icon">
								<uni-icons color="#000000" custom-prefix="lunfont" type="icon-form" size="20"></uni-icons>
							</view>
						</template>
					</uni-list-item>
					<uni-list-item title="我的企业" to="/pages/user/company/company" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'medal'}" link="navigateTo"></uni-list-item>
					<uni-list-item title="我的投诉" to="/pages/news/history" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'notification'}" link="navigateTo"></uni-list-item>
					<uni-list-item title="我的关注" to="/pages/user/follow" :show-extra-icon="true" :extra-icon="{color: '#000000',size: '22',type: 'star'}" link="navigateTo"></uni-list-item>
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
				info:{
					avatar:'/static/user_defalut.jpg',
					groupname: '企业认证',
					amount:0,
					point:0,
					thyd1:0,
					thyd299:0
				},
				coverTransform: 'translateY(40px)',
				property:'transform',
				timingFunction:'ease-out',
				duration:'0.1',
				moving: false,
			}
		},
		computed: mapState(['hasLogin', 'userInfo']),
		methods: {
			login(){
				uni.navigateTo({
					url: '/pages/main/login'
				});
			},
			toSetting(){
				uni.navigateTo({
					url: "/pages/setting/setting"
				})
			}
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
	background-image: linear-gradient(45deg, #d41a1a, #FF8D39);
	width: 750rpx;
	padding: 150rpx 30rpx 40rpx 30rpx;
	
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
.avatar{
	width: 90rpx;
	height: 90rpx;
	border-radius: 100rpx;
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
