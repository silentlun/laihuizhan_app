<template>
	<view>
		<t-list>
			<template v-if="officialProviders.length > 0">
			<t-list-cell v-for="(item, index) in officialProviders" :key="index">
				<company-item :data="item" @click="showDetail(item)"></company-item>
			</t-list-cell>
			</template>
			<template v-else>
				<view class="nodata">
					<text class="nodata-text">暂无内容</text>
				</view>
			</template>
			<template v-if="platformProviders.length > 0">
			<view class="headline">
				<text class="head-title">您可能还感兴趣的</text>
			</view>
			<t-list-cell v-for="(item, index) in platformProviders" :key="index">
				<company-item :data="item" @click="showDetail(item)"></company-item>
			</t-list-cell>
			</template>
		</t-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				officialProviders: [],
				platformProviders:[],
			}
		},
		onLoad(e) {
			this.id = e.id
			this.loadData()
		},
		methods: {
			loadData() {
				uni.request({
					url: 'v1/events/provider',
					data: {id:this.id},
					success: (res) => {
						const data = res.data;
						console.log(data)
						this.officialProviders = data.officialProviders
						this.platformProviders = data.platformProviders
					}
				});
			},
			showDetail: function (e) {
				uni.navigateTo({
					url: "/pages/merchant/view?id="+e.id
				})
			},
		}
	}
</script>

<style>
.headline{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 100rpx;
	padding: 0 30rpx;
}
.head-title{
	font-size: 28rpx;
	color: #777;
}
.nodata{
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 100rpx 0;
}
.nodata-text{
	font-size: 28rpx;
	color: #999;
	text-align: center;
	
}
</style>
