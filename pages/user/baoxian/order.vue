<template>
	<view class="page bg-gray">
		<tui-tabs isFixed :tabs="tabBars" :currentTab="tabIndex" @change="swichNav" :sliderWidth="50" selectedColor="#ff7510" sliderBgColor="#ff7510"></tui-tabs>
		<lun-gap height="80" bgColor="#f8f8f9"></lun-gap>
		<template v-if="!isNoData">
			<uni-list-cell v-for="(item, index) in dataList" :key="item.id">
				<t-card :data="item" :index="index">
					<template v-slot:header>
						<view class="order-header" @click="showDetail(item)">
							<text class="header-title">订单号：{{item.title}}</text>
							<text class="header-label text-success">保障中</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="order-body" @click="showDetail(item)">
							<text class="order-body-text">活动名称：{{item.body}}</text>
							<text class="order-body-text">场地：{{item.body}}</text>
							<text class="order-body-text">展位号：{{item.body}}</text>
						</view>
						
					</template>
					<template v-slot:footer>
						<view class="order-footer">
							<view class="order-info">
								<text class="order-info-time">下单时间：2022-10-10 23:23</text>
								<view class="goods-price">
									<view class="goods-price-label">￥</view>
									<view class="goods-price-text">1192</view>
									<view class="goods-price-label">.00</view>
								</view>
							</view>
							<view class="handle-box">
								<view class="handle-item">
									<t-button text="取消订单" size="sm" type="gray" shape="circle" plain></t-button>
								</view>
								<view class="handle-item">
									<t-button text="立即支付" size="sm" shape="circle"></t-button>
								</view>
							</view>
						</view>
					</template>
				</t-card>
			</uni-list-cell>
			<uni-list-cell v-if="isLoading || dataList.length > 4">
				<uni-load-more :status="loadingStatus" />
			</uni-list-cell>
		</template>
		<lun-prompt class="no-data" title="暂无相关数据" v-else></lun-prompt>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				tabBars: [{
					name: "全部",
					url: 'v1/events/search'
				}, {
					name: "未开始",
					url: 'v1/venues/search'
				}, {
					name: "保障中",
					url: 'v1/merchants/search'
				}, {
					name: "已结束",
					url: 'v1/merchants/search'
				}],
				dataList:[
					{id:1,title:"233232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"32323232323232",body:"dsffsdsfdsfdsdf"},
				],
				isLoading: false,
				loadingText: '加载中...',
				loadingStatus: 'loading',
				isNoData: false,
				requestParams: {
					page: 1,
				},
			}
		},
		onLoad(e) {
			//this.loadData()
		},
		onReachBottom(){
			this.loadData();
		},
		methods: {
			swichNav: function(e) {
				console.log(e.index)
				if (this.tabIndex == e.index) {
					return false;
				} else {
					this.tabIndex = e.index
					this.loadData()
				}
			},
			loadData() {
				if (this.isLoading) {
					return;
				}
			
				this.isLoading = true;
				this.isNoData = false;
				this.loadingStatus = 'loading'
			
				uni.request({
					url: 'v1/users/comment',
					data: this.requestParams,
					success: (res) => {
						const data = res.data.data;
						console.log(data)
						if(this.requestParams.page > 1){
							if(data.length <= 0){
								this.loadingStatus = 'nodata'
							}else{
								this.dataList = this.dataList.concat(this.setTime(data));
							}
						}else{
							this.isNoData = (data.length <= 0);
							this.dataList = this.setTime(data);
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
			},
			showDetail: function (e) {
				console.log('view')
				uni.navigateTo({
					url: "./order-view?id="+e.id
				})
				//this.showActionSheet = true;
			},
			setTime: function (items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						id: e.id,
						title: dateUtils.formatToString(e.usercreated_at),
						body: e.content,
						moreText: e.comment.title,
						contentid: e.id,
					});
				});
				return newItems;
			},
			toForm: function (e) {
				uni.navigateTo({
					url: "form?id="
				})
			},
		}
	}
</script>

<style scoped>
	.order-header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}
	.header-title{
		font-size: 32rpx;
		color: #333;
	}
	.header-label{
		font-size: 24rpx;
	}
	.order-body{
		display: flex;
		flex-direction: column;
		padding: 0 20rpx 20rpx;
	}
	.order-body-text {
		color: #777;
		font-size: 28rpx;
		line-height: 48rpx;
	}
	.order-footer{
		padding: 20rpx;
		border-top: #e9eaec solid 1rpx;
		overflow: hidden;
	}
	.order-info{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.order-info-time{
		font-size: 28rpx;
		color: #777;
	}
	.handle-box{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding-top: 20rpx;
		height: 86rpx;
	}
	.handle-item{
		/* display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center; */
		margin-left: 30rpx;
		
	}
	.handle-item-text{
		color: #999999;
		font-size: 20rpx;
		line-height: 40rpx;
	}
	.create-btn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}
	.goods-price{
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: flex-end;
	}
	.goods-price-label{
		font-size: 24rpx;
		color: #333;
		font-weight: 500;
	}
	.goods-price-text{
		font-size: 32rpx;
		color: #000;
		font-weight: 500;
	}
</style>
