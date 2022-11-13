<template>
	<view>
		<t-dropdown>
			<t-dropdown-item v-model="requestParams.t" :list="provinces" title="地区" :showtype="2" @click="choose"></t-dropdown-item>
			<t-dropdown-item v-model="requestParams.s" :list="categories" title="行业" :showtype="2" @click="choose"></t-dropdown-item>
			<t-dropdown-item v-model="requestParams.d" title="日期" :showtype="2" @click="choose">
				<view class="date-list">
					<view class="date-year">
						<text class="item active">全部</text>
						<text class="item">2022</text>
						<text class="item">2023</text>
					</view>
					<view class="date-month">
						<view class="menu-item">
							<text class="item-name active">1月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">2月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">3月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">4月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">5月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">6月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">7月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">8月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">9月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">10月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">11月</text>
							<text class="item-icon"></text>
						</view>
						<view class="menu-item">
							<text class="item-name active">12月</text>
							<text class="item-icon"></text>
						</view>
					</view>
				</view>
			</t-dropdown-item>
		</t-dropdown>
		<lun-gap height="110" bgColor="#f8f8f9"></lun-gap>
		<uni-list>
			<uni-list-cell v-for="(item, index) in dataList" :key="index">
				<venues-item :data="item" @click="showDetail(item)"></venues-item>
			</uni-list-cell>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [
					{id:1, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']},
					{id:2, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']},
					{id:3, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']},
					{id:4, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']}
				],
				provinces:[
					{code:23234, name: '北京'},
					{code:23234, name: '北京'},
					{code:23234, name: '北京'},
					{code:23234, name: '北京'}
				],
				categories:[],
				isLoading: false,
				loadingText: '加载中...',
				loadingStatus: 'loading',
				isNoData: false,
				requestParams: {
					page: 1,
				},
			}
		},
		onLoad() {
			this.loadData()
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
