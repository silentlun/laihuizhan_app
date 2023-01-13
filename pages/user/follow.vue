<template>
	<view class="page">
		<tui-tabs isFixed :tabs="navBars" :currentTab="currentTab" @change="swichNav" itemWidth="33.333%" selectedColor="#ff7510" sliderBgColor="#ff7510"></tui-tabs>
		<lun-gap height="80" bgColor="#ffff"></lun-gap>
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList[currentTab].data" :key="index">
				<template v-if="item.module == 3">
					<event-item :data="item.event" @click="eventDetail(item)" :index="index" @close="close(index,item)" isFav></event-item>
				</template>
				<template v-if="item.module == 2">
					<venues-item :data="item.venue" @click="venueDetail(item)" :index="index" @close="close(index,item)" isFav></venues-item>
				</template>
				<template v-if="item.module == 1">
					<company-item :data="item.merchant" @click="companyDetail(item)" :index="index" @close="close(index,item)" isFav></company-item>
				</template>
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
				navBars: [{
					name: "活动",
					module: 3,
					expand: 'event',
				}, {
					name: "场地",
					module: 2,
					expand: 'venue',
				}, {
					name: "服务",
					module: 1,
					expand: 'merchant',
				}],
				currentTab: 0, //预设当前项的值
			}
		},
		onLoad: function() {
			this.navBars.forEach((tabBar) => {
				this.dataList.push({
					data: [],
					isLoading: false,
					loadingText: '加载中...',
					loadingStatus: 'loading',
					isNoData: false,
					page: 1,
				});
			});
			this.loadData()
		},
		onReachBottom(){
			this.loadData();
		},
		methods: {
			// 点击标题切换当前页时改变样式
			swichNav: function(e) {
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
				let params = {
					module: this.navBars[this.currentTab].module,
					expand: this.navBars[this.currentTab].expand,
					page: activeTab.page
				}
				uni.request({
					url: 'v1/users/favorite',
					data: params,
					success: (res) => {
						console.log(res.data)
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
						activeTab.page++;
						activeTab.isLoading = false;
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
					url: "/pages/event/view?id=" + e.content_id
				})
			},
			venueDetail: function (e) {
				uni.navigateTo({
					url: "/pages/venues/view?id=" + e.content_id
				})
			},
			companyDetail: function (e) {
				uni.navigateTo({
					url: "/pages/merchant/view?id=" + e.content_id
				})
			},
			close(i,item){
				let activeTab = this.dataList[this.currentTab]
				uni.showModal({
					content: "确定取消关注吗？",
					success: (result) => {
						if (result.confirm) {
							uni.request({
								url: 'v1/users/favorite-delete',
								method: 'POST',
								data: {id:item.id},
								success: (res) => {
									if(res.data.code == 200) {
										activeTab.data.splice(i,1);
										uni.showToast({
										    title: '取消成功',
										    icon: 'success'
										});
									}else{
										uni.showToast({
										    title: '取消失败',
										    icon: 'error'
										});
									}
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	/*tabbar start*/
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
	
	.tab-view::before {
		content: '';
		position: absolute;
		border-bottom: 1upx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 0;
	}
	
	.tab-view {
		width: 100%;
		height: 100upx;
		overflow: hidden;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		left: 0;
		z-index: 99;
		background: #fff;
		white-space: nowrap;
	}
	
	.tab-bar-item {
		padding: 0;
		height: 100upx;
		min-width: 80upx;
		line-height: 100upx;
		margin: 0 28upx;
		display: inline-block;
		text-align: center;
		box-sizing: border-box;
	}
	
	.tab-bar-title {
		height: 100upx;
		line-height: 100upx;
		font-size: 32upx;
		color: #999;
		font-weight: 400;
	}
	
	.active {
		border-bottom: 6upx solid #5677fc;
	}
	
	.active .tab-bar-title {
		color: #5677fc !important;
		font-size: 36upx;
		font-weight: bold;
	}
	
	/*tabbar end*/
	.scoll-y {
		height: 100%;
	}
	
	.list-view {
		margin-top: 100upx;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}
	
	.list-cell {
		padding: 30upx;
		box-sizing: border-box;
	}
	
	.cell-title-box {
		display: flex;
		justify-content: space-between;
	}
	
	.cell-title {
		font-size: 36upx;
		line-height: 56upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* padding-bottom: 30upx; */
	}
	
	.img-container {
		width: 100%;
		padding-top: 24upx;
		display: flex;
		height: 160upx;
		justify-content: space-between;
	}
	
	.cell-img {
		width: 32%;
		overflow: hidden;
		position: relative;
	}
	
	.img {
		width: 100%;
		height: 160upx;
		display: block;
		/* position: absolute;
		  left: 50%;
		  top:50%;
		  transform: translate(-50%,-50%);
		*/
		border-radius: 4upx;
	}
	
	.sub-title {
		padding-top: 24upx;
		font-size: 28upx;
		color: #BCBCBC;
		display: flex;
		align-items: center
	}
	
	.badge {
		padding: 5upx 10upx;
		font-size: 24upx;
		border-radius: 4upx;
		margin-right: 20upx;
	}
	
	.b-red {
		background: #FCEBEF;
		color: #8A5966;
	}
	
	.b-blue {
		background: #ECF6FD;
		color: #4DABEB;
	}
	
	.b-orange {
		background: #FEF5EB;
		color: #FAA851
	}
	
	.b-green {
		background: #E8F6E8;
		color: #44CF85
	}

</style>
