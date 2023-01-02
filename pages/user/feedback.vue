<template>
	<view class="page bg-gray">
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList" :key="item.id">
				<t-card :data="item" @click="showDetail(item)" :index="index">
					<template v-slot:header>
						<view class="feedback-header">
							<text class="feedback-title">{{item.type}}</text>
							<text class="info-text">{{item.created_at}}</text>
						</view>
					</template>
					<template v-slot:body>
						<view class="feedback-body">
							<text class="feed-content">{{item.content}}</text>
							<view class="tui-flex-pic">
								<image v-for="(img,i) in item.images" :key="i" :src="img" mode="widthFix"></image>
							</view>
						</view>
					</template>
					<template v-slot:footer>
					</template>
				</t-card>
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
				dataList:[],
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
			
				this.isLoading = true;
				this.isNoData = false;
				this.loadingStatus = 'loading'
			
				uni.request({
					url: 'v1/users/feedback',
					data: this.requestParams,
					success: (res) => {
						const data = res.data;
						console.log(data)
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
			},
			showDetail: function (e) {
				uni.navigateTo({
					url: "/pages/news/show?id="+e.id
				})
				//this.showActionSheet = true;
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
		}
	}
</script>

<style>
	.feedback-header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}
	.feedback-title{
		font-size: 32rpx;
		color: #333;
		
	}
	.info-text{
		color: #777;
		font-size: 24rpx;
	}
	.feedback-body{
		display: flex;
		flex-direction: column;
		padding: 20rpx 30rpx;
	}
	.feed-content {
		font-size: 28rpx;
		line-height: 48rpx;
	}
	.tui-flex-pic {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-top: 10rpx;
	}
	
	.tui-flex-pic image {
		width: 32%;
		margin-bottom: 2%;
		margin-right: 10rpx;
	}
	
	.tui-content {
		padding: 0rpx 30rpx 20rpx 120rpx;
		box-sizing: border-box;
		font-size: 34rpx;
		font-weight: 400;
		color: #333;
	}
	.footer-box{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		padding: 0 30rpx 20rpx 30rpx;
	}
	.footer-box-text{
		color: #777;
		font-size: 24rpx;
		line-height: 40rpx;
	}
	.create-btn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}
</style>
