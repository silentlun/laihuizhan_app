<template>
	<view class="page">
		<tui-tabs :tabs="tabBars" :currentTab="currentTab" @change="swichNav" itemWidth="50%" selectedColor="#ff7510" sliderBgColor="#ff7510"></tui-tabs>
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList[currentTab].data" :key="index">
				<event-item :data="item" @click="eventDetail(item)" :index="index"></event-item>
			</uni-list-cell>
			<uni-list-cell v-if="dataList[currentTab].isLoading || dataList[currentTab].length > 4">
				<uni-load-more :status="dataList[currentTab].loadingStatus" />
			</uni-list-cell>
		</uni-list>
		<lun-prompt class="no-data" title="暂无相关数据" v-if="dataList[currentTab].isNoData"></lun-prompt>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				tabBars: [{
					name: "待开始",
					type: 1
				}, {
					name: "已结束",
					type: 2
				}],
				currentTab: 0,
			}
		},
		onLoad(e) {
			this.tabBars.forEach((tabBar) => {
				this.dataList.push({
					data: [],
					isLoading: false,
					loadingText: '加载中...',
					loadingStatus: 'loading',
					isNoData: false,
					requestParams: {
						id:e.id,
						type: tabBar.type,
						page: 1,
					},
				});
			});
			this.loadData()
		},
		onReachBottom(){
			this.loadData();
		},
		methods: {
			swichNav: function(e) {
				console.log(e.index)
				//let cur = e.currentTarget.dataset.current;
				if (this.currentTab == e.index) {
					return false;
				} else {
					this.currentTab = e.index
					this.loadData()
				}
			},
			loadData(){
				console.log('load data')
				let activeTab = this.dataList[this.currentTab]
				if (activeTab.isLoading) {
					return;
				}
				activeTab.isLoading = true;
				activeTab.isNoData = false;
				uni.request({
					url: 'v1/venues/event',
					data: activeTab.requestParams,
					success: (res) => {
						console.log(res)
						const data = res.data;
						//console.log(data)
						if(activeTab.page > 1){
							if(data.length <= 0){
								activeTab.loadingStatus = 'nodata'
							}else{
								activeTab.data = activeTab.data.concat(data);
							}
						}else{
							activeTab.isNoData = (data.length <= 0);
							activeTab.data = data;
						}
						activeTab.requestParams.page++;
						
					}
				});
			},
			loadMore(e) {
				this.loadData();
				/* setTimeout(() => {
					this.loadData();
				}, 4000); */
				
			},
			eventDetail: function (e) {
				uni.navigateTo({
					url: "/pages/event/view?id="+e.id
				})
			},
		}
	}
</script>

<style>

.date-list{
	display: flex;
	flex-direction: row;
	width: 100%;
}
.date-year{
	margin-right: 20rpx;
	display: flex;
	flex-direction: column;
	background-color: #f6f6f6;
	padding: 0rpx 0 30rpx 30rpx;
}
.date-year .item{
	font-size: 28rpx;
	padding: 20rpx 40rpx;
}
.date-year .item.active{
	background-color: #fff;
}
.date-month{
	display: flex;
	flex-direction: column;
	width: 100%;
	flex: 1;
}
.date-month .menu-item{
	border-bottom: #ddd solid 1px;
	padding: 20rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.date-month .menu-item .item-name{
	font-size: 28rpx;
}
.date-month .menu-item .item-icon{
	font-size: 28rpx;
	color: #ff7510;
}
</style>
