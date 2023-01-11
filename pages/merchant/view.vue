<template>
	<view class="tabs">
		<view class="user-section">
			<view class="user-header">
				<view class="user-info-box">
					<view class="avatar-box">
						<image class="avatar" :src="data.logo"></image>
					</view>
					<view class="info-box">
						<text class="username">{{data.title}}</text>
						<text class="groupname">{{data.category.catname}}</text>
					</view>
				</view>
				
			</view>
			<view class="header-tabs-box">
				<view class="follow-tabs">
					<view class="follow-tabs-item">
						<text class="item-label">热度</text>
						<text class="item-num">{{data.views}}</text>
					</view>
					<view class="follow-tabs-item">
						<text class="item-label">粉丝数</text>
						<text class="item-num">{{followCount}}</text>
					</view>
				</view>
				<view class="feedback-box" @click="onFeedback">
					<uni-icons type="notification" color="#fff" size="16"></uni-icons><text class="feedback-text">投诉</text>
				</view>
				<!-- <view class="btn-tabs">
					<text class="btn"><t-icons type="settings" color="#fff" size="12"></t-icons> 投诉</text>
					<text class="btn"><t-icons type="settings" color="#fff" size="12"></t-icons> 关注</text>
				</view> -->
			</view>
			
		</view>
		<!-- <view class="page-warp merchant-warp">
			<view class="feedback-box" @click="onFeedback">
				<uni-icons type="notification" color="#777" size="16"></uni-icons><text class="feedback-text">投诉</text>
			</view>
		</view> -->
		<!-- <t-list>
			<t-list-item :subtitle="'北京市朝阳区的说法发随叫随到发'" :showArrow="true"></t-list-item>
		</t-list> -->
		<view class="merchant-warp">
		<lun-section title="服务商简介"></lun-section>
		<view class="page-warp">
			<!-- <view class="tabs">
			<tui-tabs :tabs="navbar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
			</view> -->
			
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
		</view>
		</view>
		<lun-section title="服务案例"></lun-section>
		<t-list>
			<t-list-cell v-for="(item, index) in dataList" :key="index">
				<view class="case-media" @click="showDetail(item)">
					<image class="case-media-img" :src="item.thumb"></image>
					<view class="case-media-body">
						<text class="case-media-title">{{item.title}}</text>
					</view>
				</view>
			</t-list-cell>
		</t-list>
		
		<lun-footer>
			<lun-footer-nav :active="isFollow" @favClick="onFollow" @buttonClick="toContact"></lun-footer-nav>
		</lun-footer>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				id:0,
				data:{},
				followCount: 0,
				navbar: [{
					name: "服务商简介"
				}, {
					name: "服务案例"
				}],
				currentTab: 0,
				htmlNodes: [],
				dataList: [],
				isFollow: false
			}
		},
		onLoad(e) {
			this.id = e.id
			this.loadDetail()
			this.loadFavoriteStatus()
		},
		computed: mapState(['hasLogin']),
		methods: {
			loadDetail(){
				uni.request({
					url: 'v1/merchants/' + this.id,
					success: (res) => {
						const data = res.data.detail;
						console.log(res)
						this.data = data;
						let content = data.content.replace(/\<p/gi, '<p class="ep"');
						this.htmlNodes = htmlParser(content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '));
						
					}
				})
				uni.request({
					url: 'v1/merchants/relation',
					data: {id:this.id},
					success: (res) => {
						console.log(res)
						this.dataList = res.data
					},
				});
			},
			loadFavoriteStatus(){
				uni.request({
					url: 'v1/users/favorite-status',
					data: {module: 1, id:this.id},
					success: (res) => {
						this.followCount = res.data.followCount
						this.isFollow = res.data.isFollow
					}
				})
			},
			toContact(){
				if(!this.hasLogin){
					uni.showModal({
						content: '请先登录账号',
						confirmText:'立即登录',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({url: '/pages/main/login'});
							}
						}
					});
					return false
				}
				uni.makePhoneCall({
					phoneNumber: this.data.sale_mobile
				});
			},
			change(e) {
				this.currentTab = e.index
			},
			onFollow(){
				if(!this.hasLogin){
					uni.showModal({
						content: '请先登录账号',
						confirmText:'立即登录',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({url: '/pages/main/login'});
							}
						}
					});
					return false
				}
				let formData = {
					module: 1,
					content_id: this.id,
				}
				uni.request({
					url: "v1/users/favorite-create",
					method: 'POST',
					data: formData,
					success: (res) => {
						console.log(JSON.stringify(res))
						let data = res.data
						if(data.code == 200){
							this.isFollow = !this.isFollow
						}
					},
				})
			},
			showDetail: function (e) {
				uni.navigateTo({
					url: "./case-view?id="+e.id
				})
			},
			onFeedback(){
				if(this.hasLogin){
					uni.navigateTo({
						url: '/pages/user/feedback-form?module=1&id='+this.id
					});
				}else{
					uni.showModal({
						content: '请先登录账号',
						confirmText:'立即登录',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({url: '/pages/main/login'});
							}
						}
					});
				}
			},
		},
		onShareAppMessage(){
			return {
				title: this.data.title,
				path: '/pages/merchant/view?id='+this.id,
			}
		},
		onShareTimeline(){
		}
	}
</script>

<style>
.user-section{
	display: flex;
	flex-direction: column;
	background-image: linear-gradient(45deg, #FF7510, #EF6600);
	width: 750rpx;
	padding: 50rpx 30rpx 50rpx 30rpx;
	
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
	width: 120rpx;
	height: 120rpx;
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
	font-size: 36rpx;
	color: #FFFFFF;
	font-weight: 500;
	margin-bottom: 10rpx;
}
.groupname{
	font-size: 24rpx;
	color: #FFFFFF;
	background-color: rgba(255,255,255,0.15);
	padding: 6rpx 30rpx;
	border-radius: 45rpx;
	flex: 1;
}
.header-tabs-box{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 30rpx;
}
.follow-tabs{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
}
.follow-tabs-item{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-left: 30rpx;
	margin-right: 30rpx;
}
.follow-tabs-item .item-num{
	font-size: 24rpx;
	font-weight: 500;
	color: #fff;
}
.follow-tabs-item .item-label{
	font-size: 20rpx;
	color: #fff;
	margin-right: 10rpx;
}
.merchant-warp{
	background-color: #fff;
	border-radius: 20rpx;
	margin-top: -20rpx;
	padding-top: 30rpx;
	margin-bottom: 20px;
}
.feedback-box{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.feedback-text{
	font-size: 24rpx;
	color: #fff;
}
.tabs{
	position: sticky;
	top: var(--window-top);
	z-index: 100;
}
.btn{
	font-size: 24rpx;
	background-color: #007aff;
	border-radius: 60rpx;
	padding: 4rpx 20rpx;
}
.detail-content{
	margin-bottom: 40rpx;
}

	.case-media {
        width: 750rpx;
        padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
    }

	.case-media-img {
		width: 240rpx;
		height: 150rpx;
		margin-right: 20rpx;
		border-radius: 2px;
	}
	.case-media-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		flex: 1;
		
	}
	.case-media-title {
		font-size: 30rpx;
		color: #333;
		line-height: 40rpx;
		text-overflow: ellipsis;
		/* #ifdef APP-NVUE */
		lines: 3;
		/* #endif */
	}
</style>
