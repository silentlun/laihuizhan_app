<template>
	<view class="page bg-gray">
		<t-list ref="list" :enableBackToTop="true" loadmoreoffset="15" @loadmore="loadMore">
			<t-list-cell v-for="(item, index) in dataList" :key="item.id">
				<t-card :data="item" @click="showDetail(item)" :index="index">
					<template v-slot:header>
						<text class="company-title">{{item.title}}</text>
					</template>
					<template v-slot:body>
						<view class="company-info">
							<text class="company-text">纳税识别码：{{item.body}}</text>
							<text class="company-text">开户行：{{item.body}}</text>
							<text class="company-text">账号：{{item.body}}</text>
						</view>
						
					</template>
					<template v-slot:footer>
						<view class="handle-box">
							<view class="handle-item">
								<t-icons type="delete" size="11" color="#999999"></t-icons>
								<text class="handle-item-text">修改</text>
							</view>
							<view class="handle-item">
								<t-icons type="delete" size="11" color="#999999"></t-icons>
								<text class="handle-item-text">删除</text>
							</view>
						</view>
					</template>
				</t-card>
			</t-list-cell>
			<t-list-cell v-if="isLoading || dataList.length > 4">
				<uni-load-more :status="loadingStatus" />
			</t-list-cell>
		</t-list>
		<t-prompt class="no-data" title="暂无相关数据" v-if="isNoData"></t-prompt>
		<t-footer>
			<view class="create-btn"><t-button text="+ 添加企业" shape="circle" size="md" @click="toForm"></t-button></view>
		</t-footer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[
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
	.company-title{
		font-size: 32rpx;
		color: #333;
		padding: 20rpx;
	}
	.company-info{
		display: flex;
		flex-direction: column;
		padding: 0 20rpx 20rpx;
	}
	.company-text {
		color: #999999;
		font-size: 24rpx;
		line-height: 48rpx;
	}
	.handle-box{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		padding: 20rpx 0;
		border-top: #e9eaec solid 1rpx;
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
</style>
