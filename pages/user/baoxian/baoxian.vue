<template>
	<view class="page bg-gray">
		<view class="baoxian-nav">
			<view class="baoxian-nav-item">
				<text @click="toOrder">我的保单</text>
			</view>
			<view class="baoxian-nav-item">
				<text @click="toOrder">理赔报案</text>
			</view>
		</view>
		<view class="insure-list">
			<view class="insure-card">
				<image class="insure-img" src="/static/21.jpg"></image>
				<view class="insure-card-body">
					<text class="insure-title">保险产品详情图文介绍页</text>
					<view class="insure-card-info">
						<view class="insure-price">
							<text class="insure-price-prefix">￥</text>
							<text class="insure-price-num">99</text>
							<text class="insure-price-text">起</text>
						</view>
						<t-button text="立即投保" block type="warning" shape="circle" @click="toForm"></t-button>
					</view>
				</view>
			</view>
			<view class="insure-card">
				<image class="insure-img" src="/static/21.jpg"></image>
				<view class="insure-card-body">
					<text class="insure-title">保险产品详情图文介绍页</text>
					<view class="insure-card-info">
						<view class="insure-price">
							<text class="insure-price-prefix">￥</text>
							<text class="insure-price-num">99</text>
							<text class="insure-price-text">起</text>
						</view>
						<t-button text="立即投保" block type="warning" shape="circle" @click="toForm"></t-button>
					</view>
				</view>
			</view>
		</view>
		
		<lun-footer>
			<view class="footer-center-btn"><t-button text="立即投保" block type="warning" shape="circle" size="lg" @click="toForm"></t-button></view>
		</lun-footer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabBars: [{
					name: "我的保单",
					url: '/pages/user/baoxian/order',
				}, {
					name: "理赔报案",
					url: '/pages/user/baoxian/order',
				}],
			}
		},
		onLoad(e) {
			/* setTimeout(()=>{
				uni.showModal({
					title: '投保须知',
					content: '声明：所有保险产品的销售、理赔等服务均有XXXX保险经纪公司提供。',
					showCancel: false,
					confirmText: '我知道了',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}, 500) */
		},
		methods: {
			swichNav: function(e) {
				if (this.currentTab == e.index) {
					return false;
				} else {
					let url = this.tabBars[e.index].url
					uni.navigateTo({
						url: url
					})
				}
			},
			toOrder: function (e) {
				uni.navigateTo({
					url: "./order"
				})
			},
			toForm: function (e) {
				uni.navigateTo({
					url: "./create"
				})
			},
		}
	}
</script>

<style>
.list{
	display: flex;
	flex-direction: column;
}
.list view{
	padding: 20rpx;
}
.baoxian-nav{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 100rpx;
	border-bottom: #e5e5e5 solid 1rpx;
	background-color: #fff;
}
.baoxian-nav-item{
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.insure-list{
	width: 750rpx;
	display: flex;
	flex-direction: column;
	padding: 30rpx;
}
.insure-card{
	margin-bottom: 30rpx;
	background-color: #fff;
	border-radius: 16rpx;
}
.insure-img{
	width: 690rpx;
	height: 388rpx;
	border-radius: 16rpx;
}
.insure-card-body{
	display: flex;
	flex-direction: column;
	padding: 20rpx;
}
.insure-title{
	font-size: 32rpx;
	margin-bottom: 20rpx;
}
.insure-card-info{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.insure-price{
	font-size: 36rpx;
	font-weight: bold;
}
.insure-price{
	display: flex;
	flex-direction: row;
	align-items: flex-end;
}
.insure-price-prefix{
	font-size: 28rpx;
	color: #F01625;
}
.insure-price-num{
	font-size: 38rpx;
	color: #F01625;
	font-weight: 700;
	line-height: 1;
}
.insure-price-text{
	font-size: 24rpx;
	color: #333;
}
</style>
