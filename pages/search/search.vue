<template>
	<view class="page">
		<view class="searchbar-input-view">
			<uni-search-bar placeholder="输入关键词搜索" radius="60" @confirm="onSearch" v-model="searchValue" clearButton="auto" cancelButton="always" @cancel="cancel"></uni-search-bar>
		</view>
		<template v-if="isSearch">
		<tui-tabs :tabs="tabBars" :currentTab="currentTab" @change="swichNav" itemWidth="50%" selectedColor="#ff7510" sliderBgColor="#ff7510"></tui-tabs>
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList[currentTab].data" :key="index">
				<template v-if="currentTab == 0">
					<event-item :data="item" @click="eventDetail(item)" :index="index"></event-item>
				</template>
				<template v-if="currentTab == 1">
					<venues-item :data="item" @click="venueDetail(item)" :index="index"></venues-item>
				</template>
				<template v-if="currentTab == 2">
					<company-item :data="item" @click="companyDetail(item)" :index="index"></company-item>
				</template>
				
			</uni-list-cell>
		</uni-list>
		</template>
		<lun-prompt class="no-data" title="暂无相关数据" v-if="dataList[currentTab].isNoData"></lun-prompt>
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
				currentTab: 0,
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
				if (this.currentTab == e.index) {
					return false;
				} else {
					this.currentTab = e.index
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
				let activeTab = this.dataList[this.currentTab]
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
