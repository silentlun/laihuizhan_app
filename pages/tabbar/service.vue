<template>
	<view>
		<uni-grid :column="4" :highlight="true" @change="toList" :showBorder="false"  :square="false">
			<uni-grid-item v-for="(item, index) in categorys" :index="index" :key="index">
				<category-item :data="item"></category-item>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categorys: [],
			}
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			loadData(){
				uni.request({
					url: 'v1/merchants/home',
					data: {'per-page':1000},
					success: (res) => {
						console.log(res.data)
						this.categorys = this.categorys.concat(res.data)
					}
				})
			},
			toList(e) {
				let {index} = e.detail
				let catid = this.categorys[index].id
				console.log(catid)
				uni.navigateTo({
					url: "/pages/merchant/list?catid=" + catid
				})
			},
		}
	}
</script>

<style>

</style>
