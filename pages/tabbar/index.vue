<template>
	<view class="page ">
		<view class="searchbar">
			<!-- <view class="searchbar-city">
				<view>
					<text class="searchbar-city-text">{{ city }}</text>
				</view>
				<uni-icons type="arrowdown" color="#666" size="14" />
			</view> -->
			<view class="searchbar-input-view" @click="toSearch">
				<uni-search-bar placeholder="搜索关键词" radius="60" readonly></uni-search-bar>
			</view>
		</view>
		<t-swiper :data="focusData" @click="newsDetail"></t-swiper>
		<!-- <lun-section title="热门服务" link="/pages/merchant/list" showMore></lun-section> -->
		<lun-gap height="20" bgColor="#ffffff"></lun-gap>
		<uni-grid :column="4" :highlight="true" @change="toService" :showBorder="false"  :square="false">
			<uni-grid-item v-for="(item, index) in categorys" :index="index" :key="index">
				<category-item :data="item"></category-item>
			</uni-grid-item>
		</uni-grid>
		<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
		<!-- <uni-list :border="false">
			<uni-list-cell v-for="(item, index) in venuesData" :key="index">
				<company-item :data="item" @click="showDetail(item)"></company-item>
			</uni-list-cell>
		</uni-list> -->
		<lun-section title="热门场地"></lun-section>
		<uni-list :border="false">
			<uni-list-cell v-for="(item, index) in venuesData" :key="index">
				<venues-item :data="item" @click="toVenuesDetail(item)"></venues-item>
			</uni-list-cell>
		</uni-list>
		<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
		<lun-section title="热门活动"></lun-section>
		<uni-list :border="false">
			<uni-list-cell v-for="(item, index) in eventData" :key="index">
				<event-item :data="item" @click="toEventDetail(item)"></event-item>
			</uni-list-cell>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focusData: [{
					thumb: '/static/21.jpg',
					title: '1111',
				}, {
					thumb: '/static/22.jpg',
					title: '2222',
				}, {
					thumb: '/static/23.jpg',
					title: '3333',
				}],
				categorys: [],
				/* categorys: [
					{id:1, catname:'类目名称', image:"/static/22.jpg"},
					{id:2, catname:'类目名称', image:"/static/21.jpg"},
					{id:3, catname:'类目名称', image:"/static/23.jpg"},
					{id:4, catname:'类目名称', image:"/static/22.jpg"},
					{id:5, catname:'类目名称', image:"/static/21.jpg"},
					{id:6, catname:'类目名称', image:"/static/23.jpg"},
					{id:7, catname:'类目名称', image:"/static/23.jpg"},
					{id:0, catname:'更多服务', image:"/static/23111.jpg"},
				], */
				eventData: [],
				venuesData: [],
				city: '北京',
				searchbarFixed: false,
			}
		},
		onPageScroll: function (e) {
			if(e.scrollTop > 80){
				this.searchbarFixed = true
			}else{
				this.searchbarFixed = false
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			loadData(){
				uni.request({
					url: 'v1/sites/banner',
					success: (res) => {
						//console.log(res.data)
						this.focusData = res.data
					}
				})
				uni.request({
					url: 'v1/merchants/home',
					data: {'per-page':7},
					success: (res) => {
						console.log(res.data)
						this.categorys = res.data
						this.categorys = this.categorys.concat([{id:0, catname:'更多服务', image:"/static/23111.jpg"}])
					}
				})
				uni.request({
					url: 'v1/events/home',
					success: (res) => {
						//console.log(res.data)
						this.eventData = res.data
					}
				})
				uni.request({
					url: 'v1/venues/home',
					success: (res) => {
						this.venuesData = res.data
					}
				})
				
			},
			newsDetail(e) {
				if(e.module == 1){
					uni.navigateTo({
						url: "/pages/merchant/view?id="+e.content_id
					})
				}else if(e.module == 2){
					uni.navigateTo({
						url: "/pages/venues/view?id="+e.content_id
					})
				}else if(e.module == 3){
					uni.navigateTo({
						url: "/pages/event/view?id="+e.content_id
					})
				}
			},
			toSearch() {
				console.log('dssd')
				uni.navigateTo({
					url: "/pages/search/search"
				})
			},
			toService: function (e) {
				let {index} = e.detail
				let catid = this.categorys[index].id
				console.log(catid)
				if(catid == 0){
					uni.switchTab({
						url: "/pages/tabbar/service"
					})
				}else{
					uni.navigateTo({
						url: "/pages/merchant/list?catid=" + catid
					})
				}
				
			},
			toMerchantList: function (e) {
				uni.navigateTo({
					url: "/pages/merchant/list?catid=" + e.id
				})
			},
			toVenuesDetail: function (e) {
				uni.navigateTo({
					url: "/pages/venues/view?id="+e.id
				})
			},
			toEventDetail: function (e) {
				uni.navigateTo({
					url: "/pages/event/view?id="+e.id
				})
			},
		},
		onShareAppMessage(){
		},
		onShareTimeline(){
		}
	}
</script>

<style>

</style>
