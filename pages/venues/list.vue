<template>
	<view class="page">
		<t-dropdown>
			<t-dropdown-item v-model="requestParams.province" :list="provinces" title="地区" :showtype="2" @click="choose"></t-dropdown-item>
			<t-dropdown-item v-model="requestParams.catid" :list="categories" title="功能" :showtype="2" @click="choose"></t-dropdown-item>
			
		</t-dropdown>
		<lun-gap height="110" bgColor="#f8f8f9"></lun-gap>
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList" :key="index">
				<venues-item :data="item" @click="showDetail(item)"></venues-item>
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
				provinces:[{
					'name':'全部',
					'value':''
				}],
				categories:[{
					'name':'全部',
					'value':''
				}],
				isLoading: false,
				loadingText: '加载中...',
				loadingStatus: 'loading',
				isNoData: false,
				requestParams: {
					catid: '',
					province: '',
					page: 1,
				},
			}
		},
		onLoad() {
			this.loadType()
			this.loadData()
		},
		onReachBottom(){
			this.loadData();
		},
		methods: {
			loadType() {
				uni.request({
					url: 'v1/sites/regions',
					success: (res) => {
						this.provinces = this.provinces.concat(res.data)
					}
				})
				uni.request({
					url: 'v1/venues/category',
					success: (res) => {
						this.categories = this.categories.concat(res.data)
					}
				})
			},
			choose() {
				this.requestParams.page = 1;
				this.loadData();
			},
			loadData() {
				if (this.isLoading) {
					return;
				}
			
				this.isLoading = true;
				this.isNoData = false;
				this.loadingStatus = 'loading'
			
				uni.request({
					url: 'v1/venues',
					data: this.requestParams,
					success: (res) => {
						console.log(res)
						const data = res.data;
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
					url: "./view?id="+e.id
				})
			},
		}
	}
</script>

<style>

</style>
