<template>
	<view class="page">
		<t-dropdown>
			<t-dropdown-item v-model="requestParams.province" :list="provinces" title="地区" :showtype="2" @click="choose"></t-dropdown-item>
			<t-dropdown-item v-model="requestParams.catid" :list="categories" title="行业" :showtype="2" @click="choose"></t-dropdown-item>
			<t-dropdown-item v-model="requestParams.d" :title="dateTitle" :showtype="2" @click="choose" ref="rangeDate">
				<view class="date-list">
					<view class="date-year">
						<text class="item" 
						v-for="(y,i) in years" 
						:key="i" 
						:class="{'active': y.id == yearIndex}"
						@click="chooseYear(y.id)">{{y.name}}</text>

					</view>
					<view class="date-month" v-if="yearIndex">
						<view class="menu-item" 
						v-for="(m,i) in months" 
						:key="i"
						:class="{'active': m.id == monthIndex}"
						@click="chooseMonth(m.id)">
							<text class="item-name">{{m.name}}月</text>
							<uni-icons type="checkmarkempty" color="#ff7510" v-if="m.id == monthIndex"></uni-icons>
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
		<lun-prompt class="no-data" title="暂无相关数据" v-if="isNoData"></lun-prompt>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				provinces:[{
					'name':'全部',
					'value':''
				}],
				categories:[{
					'name':'全部',
					'value':''
				}],
				dataList: [],
				isLoading: false,
				loadingText: '加载中...',
				loadingStatus: 'loading',
				isNoData: false,
				years: [],
				months: [],
				yearIndex: null,
				monthIndex: null,
				dateTitle: '日期',
				requestParams: {
					catid: '',
					province: '',
					daterange: '',
					page: 1,
				},
			}
		},
		onLoad() {
			this.loadType()
			this.initYears()
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
						//console.log(res.data)
						this.provinces = this.provinces.concat(res.data)
					}
				})
				uni.request({
					url: 'v1/events/category',
					success: (res) => {
						//console.log(res.data)
						this.categories = this.categories.concat(res.data)
					}
				})
			},
			initYears(){
				let curYear = new Date().getFullYear();
				this.years = [
					{id: null, name: '全部'},
					{id: curYear, name: curYear+'年'},
					{id: curYear + 1, name: (curYear + 1) + '年'}
				]
				for(var i=1; i<13; i++){
					let monthArr = {id:this.formatNumber(i), name:i}
					this.months.push(monthArr)
				}
				console.log(this.months)
			},
			formatNumber(num){
				num = num.toString()
				return num[1] ? num : '0' + num
			},
			choose() {
				this.requestParams.page = 1;
				console.log('dssd')
				this.loadData();
			},
			chooseYear(e) {
				this.yearIndex = e;
				this.monthIndex = null;
				if(e == null){
					this.dateTitle = '日期'
					this.requestParams.daterange = '';
					this.requestParams.page = 1;
					this.loadData();
					this.$refs.rangeDate.closePopup();
				}
				console.log(this.yearIndex)
			},
			chooseMonth(e) {
				this.monthIndex = e;
				this.requestParams.daterange = this.yearIndex +'-'+ this.monthIndex
				this.dateTitle = this.requestParams.daterange
				this.requestParams.page = 1;
				this.loadData();
				this.$refs.rangeDate.closePopup();
				console.log(this.dateTitle)
			},
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
	padding: 0rpx 0 30rpx 30rpx;
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
	color: #ff7510;
}
</style>
