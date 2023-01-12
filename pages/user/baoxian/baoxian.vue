<template>
	<view class="page">
		<tui-tabs :tabs="tabBars" :currentTab="100" @change="swichNav" itemWidth="50%" selectedColor="#ff7510" sliderBgColor="#ff7510"></tui-tabs>
		
		<lun-footer>
			<view class="footer-center-btn"><t-button text="立即投保" type="warning" shape="circle" size="lg" @click="toForm"></t-button></view>
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
</style>
