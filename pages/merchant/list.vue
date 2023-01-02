<template>
	<view class="page">
		<t-dropdown>
			<t-dropdown-item v-model="requestParams.province" :list="provinces" title="地区" :showtype="2" @click="choose"></t-dropdown-item>
			<t-dropdown-item v-model="requestParams.catid" :list="categories" :title="catname" :showtype="2" @click="choose"></t-dropdown-item>
			
		</t-dropdown>
		<lun-gap height="110" bgColor="#f8f8f9"></lun-gap>
		<t-list>
			<t-list-cell v-for="(item, index) in dataList" :key="index">
				<company-item :data="item" @click="showDetail(item)"></company-item>
			</t-list-cell>
		</t-list>
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
				catname: '类目',
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
		onLoad(e) {
			this.requestParams.catid = e.catid
			this.loadData()
			this.loadType()
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
					url: 'v1/merchants/category',
					success: (res) => {
						this.categories = this.categories.concat(res.data)
						let childs = this.categories.filter(item => {
							return item.value == this.requestParams.catid
						})
						console.log(childs)
						this.catname = childs[0].name
					}
				})
			},
			choose() {
				this.requestParams.page = 1;
				console.log('dssd')
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
					url: 'v1/merchants',
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
