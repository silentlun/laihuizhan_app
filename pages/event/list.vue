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
				<event-item :data="item" @click="showDetail(item)"></event-item>
			</uni-list-cell>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provinces:[
					{code:23234, name: '北京'},
					{code:23234, name: '北京'},
					{code:23234, name: '北京'},
					{code:23234, name: '北京'}
				],
				categories:[],
				dataList: [
					{id:1, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:2, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:3, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:4, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'}
				],
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
				/* if (this.isLoading) {
					return;
				} */
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
							//this.isNoData = (data.length <= 0);
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

.date-list{
	display: flex;
	flex-direction: row;
	width: 100%;
}
.date-year{
	margin-right: 20rpx;
	display: flex;
	flex-direction: column;
	background-color: #f6f6f6;
	padding: 30rpx 0 30rpx 30rpx;
}
.date-year .item{
	font-size: 28rpx;
	padding: 20rpx 40rpx;
}
.date-year .item.active{
	background-color: #fff;
}
.date-month{
	display: flex;
	flex-direction: column;
	width: 100%;
	flex: 1;
}
.date-month .menu-item{
	border-bottom: #ddd solid 1px;
	padding: 20rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
}
.date-month .menu-item .item-name{
	font-size: 28rpx;
}
.date-month .menu-item .item-icon{
	font-size: 28rpx;
	color: aqua;
}
</style>
