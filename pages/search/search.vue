<template>
	<view class="page">
		<view class="searchbar">
			<view class="searchbar-input-view">
				<uni-search-bar focus placeholder="输入关键词搜索" radius="60" @confirm="onSearch" v-model="searchValue" clearButton="auto" cancelButton="always" @cancel="cancel"></uni-search-bar>
			</view>
			<tui-tabs v-if="isSearch" :tabs="tabBars" :currentTab="tabIndex" @change="swichNav" itemWidth="33.333%" selectedColor="#ff7510" sliderBgColor="#ff7510"></tui-tabs>
		</view>
		<uni-list :border="false">
			<uni-list-cell v-for="(item, index) in dataList[tabIndex].data" :key="index">
				<template v-if="tabIndex == 0">
					<event-item :data="item" @click="eventDetail(item)" :index="index"></event-item>
				</template>
				<template v-if="tabIndex == 1">
					<venues-item :data="item" @click="venueDetail(item)" :index="index"></venues-item>
				</template>
				<template v-if="tabIndex == 2">
					<company-item :data="item" @click="companyDetail(item)" :index="index"></company-item>
				</template>
				
			</uni-list-cell>
			<uni-list-cell v-if="dataList[tabIndex].isLoading || dataList[tabIndex].length > 4">
				<uni-load-more :status="dataList[tabIndex].loadingStatus" />
			</uni-list-cell>
		</uni-list>
		<lun-prompt class="no-data" title="暂无相关数据" v-if="dataList[tabIndex].isNoData"></lun-prompt>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				tabBars: [{
					name: "活动",
					url: 'v1/events/search'
				}, {
					name: "场地",
					url: 'v1/venues/search'
				}, {
					name: "服务",
					url: 'v1/merchants/search'
				}],
				searchValue: '',
				tabIndex: 0,
				apiUrl: 'v1/events/search',
				isSearch: false,
			}
		},
		onLoad() {
			this.tabBars.forEach((tabBar) => {
				this.dataList.push({
					data: [],
					isLoading: false,
					loadingText: '加载中...',
					loadingStatus: 'loading',
					isNoData: false,
					page: 1,
				});
			});
		},
		onReachBottom(){
			this.loadData()
		},
		methods: {
			swichNav: function(e) {
				console.log(e.index)
				//let cur = e.currentTarget.dataset.current;
				if (this.tabIndex == e.index) {
					return false;
				} else {
					this.tabIndex = e.index
					this.apiUrl = this.tabBars[e.index].url
					this.loadData()
				}
			},
			onSearch(){
				if(!this.searchValue){
					uni.showToast({
						title: '请输入关键词',
						duration: 2000
					})
					return false
				}
				this.isSearch = true
				this.loadData()
			},
			cancel(res) {
				uni.navigateBack({
				    delta: 1
				});
			},
			loadData(){
				console.log('load data')
				let activeTab = this.dataList[this.tabIndex]
				if (activeTab.isLoading) {
					return;
				}
				activeTab.isLoading = true;
				activeTab.isNoData = false;
				uni.request({
					url: this.apiUrl,
					data: {q:this.searchValue, page:activeTab.page},
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
						activeTab.page++;
						
					}
				});
			},
			eventDetail: function (e) {
				uni.navigateTo({
					url: "/pages/event/view?id=" + e.id
				})
			},
			venueDetail: function (e) {
				uni.navigateTo({
					url: "/pages/venues/view?id=" + e.id
				})
			},
			companyDetail: function (e) {
				uni.navigateTo({
					url: "/pages/merchant/view?id=" + e.id
				})
			},
		}
	}
</script>

<style>

</style>
