<template>
	<view>
		<view class="page-warp" style="padding-top: 30px;padding-bottom: 30px;">
			<view class="detail-content">
				<!-- <rich-text :nodes="content"></rich-text> -->
				<u-parse :content="content" @preview="preview" />
			</view>
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
				content: '',
			}
		},
		onLoad(e) {
			let payload = {};
			try {
				payload = JSON.parse(decodeURIComponent(e.detail));
			} catch (error) {
				payload = JSON.parse(e.detail);
			}
			this.content = payload.content
			uni.setNavigationBarTitle({
				title: payload.title
			})
		},
		methods: {
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
		},
	}
</script>

<style>
	@import url("@/components/feng-parse/parse.css");
</style>
