<template>
	<view>
		<view class="detail-content">
			<u-parse :content="data.content" @preview="preview" />
		</view>
	</view>
</template>

<script>
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components: {
			uParse
		},
		data() {
			return {
				data: {},
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title: e.title
			})
			this.loadDetail(e.id)
		},
		methods: {
			loadDetail(id){
				uni.request({
					url: 'v1/sites/page',
					data:{id:id},
					success: (res) => {
						const data = res.data
						console.log(res)
						this.data = data;
						this.data.content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
						
					}
				})
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
		}
	}
</script>

<style>
@import url("@/components/feng-parse/parse.css");
</style>
