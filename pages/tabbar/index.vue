<template>
	<view class="page">
		<t-swiper :data="focusData" @click="newsDetail"></t-swiper>
		<t-section title="热门会展服务" link="/pages/service/list" showMore></t-section>
		<t-section title="热门会展场地" link="/pages/venues/list" showMore></t-section>
		<t-list>
			<t-list-cell v-for="(item, index) in venuesData" :key="index">
				<venues-item :data="item"></venues-item>
			</t-list-cell>
		</t-list>
		<t-section title="热门会展活动" link="/pages/event/list" showMore></t-section>
		<t-list>
			<t-list-cell v-for="(item, index) in eventData" :key="index">
				<event-item :data="item"></event-item>
			</t-list-cell>
		</t-list>
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
				current: 0,
				mode: 'round',
				eventData: [
					{id:1, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:2, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:3, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:4, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'}
				],
				venuesData: [
					{id:1, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']},
					{id:2, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']},
					{id:3, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']},
					{id:4, title: '中国国际展览中心（顺义）馆', thumb: '/static/23.jpg', address:'北京市顺义区天竺地区裕祥路88号', tags:['会议活动','汽车展览']}
				],
			}
		},
		methods: {
			newsDetail(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style>

</style>
