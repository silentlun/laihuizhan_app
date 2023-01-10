<template>
	<view class="page bg-gray">
		<template v-if="!isNoData">
			<uni-list-cell v-for="(item, index) in dataList" :key="item.id">
				<t-card :data="item" @click="showDetail(item)" :index="index">
					<template v-slot:header>
						<text class="company-title">{{item.title}}</text>
					</template>
					<template v-slot:body>
						<view class="company-info">
							<text class="company-text">纳税识别码：{{item.code}}</text>
							<text class="company-text">开户行：{{item.bank_name}}</text>
							<text class="company-text">账号：{{item.bank_code}}</text>
						</view>
						
					</template>
					<template v-slot:footer>
						<view class="handle-box">
							<view class="handle-item" @click.stop="onUpdate(item)">
								<text class="handle-item-text">修改</text>
							</view>
							<view class="handle-item" v-if="emitType" @click.stop="onImport(item)">
								<text class="handle-item-text">使用</text>
							</view>
							<view class="handle-item" v-else @click.stop="onDelete(index,item)">
								<text class="handle-item-text">删除</text>
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
		<lun-footer>
			<view class="create-btn"><t-button text="+ 添加企业" type="warning" shape="circle" size="md" @click="toForm"></t-button></view>
		</lun-footer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				emitType: '',
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
			if(e.type) this.emitType = e.type
			this.loadData()
			uni.$on('update', (data) => {
				if(data.status == 200){
					this.requestParams.page = 1
					this.loadData()
				}
			})
		},
		onUnload() {
			uni.$off('update')
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
					url: 'v1/users/company',
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
				uni.showActionSheet({
					alertText: '确定要删除吗？',
					itemList: ['删除'],
					success: (res) => {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						uni.request({
							url: 'v1/users/company-delete',
							method: 'POST',
							data: {id:item.id},
							success: (res) => {
								if(res.data.code == 200) {
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
						})
					},
					fail: (res) => {
						console.log(res.errMsg);
					}
				});
				
			},
			onDelete22(i,item){
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
			onUpdate: function(e) {
				uni.navigateTo({
					url: "./form?id=" + e.id
				})
			},
			onImport: function(e) {
				console.log(e)
				uni.$emit(this.emitType, e)
				uni.navigateBack();
			},
			toForm: function (e) {
				uni.navigateTo({
					url: "./form"
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
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		margin-right: 20rpx;
		border: #e54d42 solid 1rpx;
		background-color: #fadbd9;
		border-radius: 4rpx;
		padding: 8rpx 16rpx;
	}
	.handle-item-text{
		color: #e54d42;
		font-size: 24rpx;
		line-height: 1;
		/* line-height: 40rpx; */
	}
	.create-btn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100rpx;
	}
</style>
