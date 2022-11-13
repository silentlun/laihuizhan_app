<template>
	<view class="page bg-gray">
		<template v-if="!isNoData">
			<uni-list-cell v-for="(item, index) in dataList" :key="item.id">
				<t-card :data="item" @click="showDetail(item)" :index="index">
					<template v-slot:header>
						<view class="order-header">
							<text class="header-title">订单号：{{item.title}}</text>
							<text class="header-label">进行中</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="order-body">
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
									<t-button text="取消订单" size="xs" type="gray" shape="circle" plain></t-button>
								</view>
								<view class="handle-item">
									<t-button text="立即支付" size="xs" shape="circle"></t-button>
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
				dataList:[
					{id:1,title:"北京盛世泰伯网络技术有限公司",body:"dsffsdsfdsfdsdf"},
					{id:1,title:"北京盛世泰伯网络技术有限公司",body:"dsffsdsfdsfdsdf"}
				],
				isLoading: false,
				loadingText: '加载中...',
				loadingStatus: 'loading',
				isNoData: false,
				requestParams: {
					page: 1,
				},
				showActionSheet: false,
				maskClosable: true,
				tips: "确认清空搜索历史吗？",
				itemList: [],
				color: "#9a9a9a",
				size: 26,
				isCancel: true
			}
		},
		onLoad(e) {
			//this.loadData()
		},
		methods: {
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
				uni.navigateTo({
					url: "/pages/news/show?id="+e.id
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
			onDelete(i,item){
				let that = this
				uni.showModal({
					content: "确定删除评论吗？",
					success: function (res) {
						if (res.confirm) {
							uni.request({
								url: 'v1/users/comment-delete',
								method: 'POST',
								data: {id:item.id},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: (res) => {
									if (res.statusCode == 200) {
										console.log(res.data.data.status)
										if(res.data.data.status == 200) {
											that.dataList.splice(i,1);
											uni.showToast({
											    title: '删除成功',
											    icon: 'success'
											});
										}else{
											uni.showToast({
											    title: '删除失败',
											    icon: 'error'
											});
										}
									}
								}
							})
						}
					}
				})
			},
			itemClick: function(e) {
				let index = e.index;
				this.closeActionSheet();
				this.tui.toast(`您点击的按钮索引为：${index}`)
			},
			closeActionSheet: function() {
				this.showActionSheet = false
			},
			toForm: function (e) {
				uni.navigateTo({
					url: "form?id="
				})
			},
		}
	}
</script>

<style>
	.order-header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}
	.header-title{
		font-size: 28rpx;
		color: #333;
	}
	.header-label{
		font-size: 24rpx;
		color: #777;
	}
	.order-body{
		display: flex;
		flex-direction: column;
		padding: 0 20rpx 20rpx;
	}
	.order-body-text {
		color: #777;
		font-size: 24rpx;
		line-height: 48rpx;
	}
	.order-footer{
		padding: 20rpx;
		border-top: #e9eaec solid 1rpx;
	}
	.order-info{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.order-info-time{
		font-size: 24rpx;
		color: #777;
	}
	.handle-box{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		margin-top: 20rpx;
	}
	.handle-item{
		/* display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center; */
		margin-right: 20rpx;
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
