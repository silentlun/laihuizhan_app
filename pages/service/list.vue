<template>
	<view>
		<t-list>
			<t-list-cell v-for="(item, index) in dataList" :key="index">
				<company-item :data="item"></company-item>
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
		methods: {
			
		}
	}
</script>

<style>

</style>
