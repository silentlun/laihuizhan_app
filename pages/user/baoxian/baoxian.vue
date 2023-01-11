<template>
	<view>
		<tui-tabs :tabs="navBars" :currentTab="100" @change="swichNav" itemWidth="50%" selectedColor="#ff7510" sliderBgColor="#ff7510"></tui-tabs>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navBars: [{
					name: "我的保单",
					url: 'event',
				}, {
					name: "理赔报案",
					url: 'venue',
				}],
			}
		},
		methods: {
			swichNav: function(e) {
				if (this.currentTab == e.index) {
					return false;
				} else {
					this.currentTab = e.index
					this.currentModule = this.navBars[e.index].module
					this.loadData()
				}
			},
		}
	}
</script>

<style>

</style>
