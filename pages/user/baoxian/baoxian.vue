<template>
	<view class="page">
		<view class="baoxian-nav">
			<view class="baoxian-nav-item">
				<text @click="toOrder">我的保单</text>
			</view>
			<view class="baoxian-nav-item">
				<text @click="toOrder">理赔报案</text>
			</view>
		</view>
		<view class="page-warp" style="padding-top: 50px;">
			<view class="detail-content">
				保险产品详情图文介绍页
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
			setTimeout(()=>{
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
			}, 500)
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
}
.baoxian-nav-item{
	flex: 1;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
</style>
