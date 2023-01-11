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
				type: 0,
				data: {},
				content:'',
			}
		},
		onLoad(e) {
			//this.content = '';
			let title;
			this.type = Number(e.type)
			switch(this.type){
				case 1:
				title = '场地介绍';
				break;
				case 2:
				title = '抵达交通';
				break;
				case 3:
				title = '功能设施';
				break;
			}
			//let payload = JSON.parse(decodeURIComponent(e.detail));
			/* try {
				payload = JSON.parse(decodeURIComponent(e.detail));
			} catch (error) {
				payload = JSON.parse(e.detail);
			} */
			
			//this.content = payload.content
			//console.log(this.content)
			uni.setNavigationBarTitle({
				title: title
			})
			uni.request({
				url: 'v1/venues/detail',
				data:{id:e.id},
				success: (res) => {
					//this.content = res.data;
					switch(this.type){
						case 1:
						this.content = res.data.content;
						break;
						case 2:
						this.content = res.data.jiaotong;
						break;
						case 3:
						this.content = res.data.sheshi;
						break;
					}
					console.log(this.content)
				}
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
