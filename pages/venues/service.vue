<template>
	<view class="page">
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList" :key="index">
				<service-item :data="item" @click="showDetail(item)"></service-item>
			</uni-list-cell>
			<uni-list-cell v-if="isLoading || dataList.length > 4">
				<uni-load-more :status="loadingStatus" />
			</uni-list-cell>
		</uni-list>
		<lun-prompt class="no-data" title="暂无相关数据" v-if="isNoData"></lun-prompt>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				isLoading: false,
				loadingText: '加载中...',
				loadingStatus: 'loading',
				isNoData: false,
				requestParams: {
					id: 0,
					type: 0,
					page: 1,
				},
			}
		},
		onLoad(e) {
			this.requestParams.id = e.id
			this.requestParams.type = e.type
			if(e.type == 1){
				uni.setNavigationBarTitle({
					title: '配套服务'
				})
			}
			this.loadData()
		},
		onReachBottom(){
			this.loadData();
		},
		methods: {
			loadData() {
				if (this.isLoading) {
					return;
				}
				console.log('load data')
			
				this.isLoading = true;
				this.isNoData = false;
				this.loadingStatus = 'loading'
			
				uni.request({
					url: 'v1/venues/relation',
					data: this.requestParams,
					success: (res) => {
						console.log(res)
						const data = res.data;
						//console.log(data)
						if(this.requestParams.page > 1){
							if(data.length <= 0){
								this.loadingStatus = 'nodata'
							}else{
								this.dataList = this.dataList.concat(data);
							}
						}else{
							this.isNoData = (data.length <= 0);
							this.dataList = data;
						}
						this.requestParams.page++;
						
					},
					fail: (err) => {
						if (this.dataList.length == 0) {
							this.isNoData = true;
						}
					},
					complete: (e) => {
						this.isLoading = false;
					}
				});
			},
			loadMore(e) {
				this.loadData();
				/* setTimeout(() => {
					this.loadData();
				}, 4000); */
				
			},
			showDetail: function (e) {
				uni.navigateTo({
					url: "./service-view?id="+e.id
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
