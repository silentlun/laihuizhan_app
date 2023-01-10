<template>
	<view>
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList" :key="index">
				<event-item :data="item" @click="onImport(item)"></event-item>
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
				isLoading: false,
				loadingText: '加载中...',
				loadingStatus: 'loading',
				isNoData: false,
				requestParams: {
					catid: '',
					province: '',
					daterange: '',
					page: 1,
				},
			}
		},
		onLoad() {
			this.loadData()
		},
		onReachBottom(){
			this.loadData()
		},
		methods: {
			loadData() {
				if (this.isLoading) {
					return;
				}
				console.log('load data')
			
				this.isLoading = true;
				this.isNoData = false;
				this.loadingStatus = 'loading'
			
				uni.request({
					url: 'v1/events',
					data: this.requestParams,
					success: (res) => {
						console.log(res)
						const data = res.data;
						//console.log(data)
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
			onImport: function(e) {
				let data = {
					title: e.title,
					city: e.city,
					venue: e.venue.title,
					address:e.address,
					startDate: e.sg_start_date,
					endDate: e.sg_end_date,
				}
				uni.$emit('huodong', data)
				uni.navigateBack();
			},
		}
	}
</script>

<style>

</style>
