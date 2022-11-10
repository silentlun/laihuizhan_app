<template>
	<view>
		<t-list>
			<t-list-cell v-for="(item, index) in dataList" :key="index">
				<company-item :data="item" @click="showDetail(item)"></company-item>
			</t-list-cell>
		</t-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [
					{id:1, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:2, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:3, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:4, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'}
				],
			}
		},
		onLoad() {
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
					url: 'v1/events',
					data: this.requestParams,
					success: (res) => {
						const data = res.data.data;
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
