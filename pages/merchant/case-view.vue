<template>
	<view>
		<image class="page-banner" :src="data.thumb" mode="scaleToFill"></image>
		<view class="page-warp">
			<text class="detail-title">{{data.title || ''}}</text>
		</view>
		<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
		<lun-section title="案例详情"></lun-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<u-parse :content="data.content" @preview="preview" />
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	import htmlParser from '@/common/html-parser'
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components: {
			uParse
		},
		data() {
			return {
				id:0,
				data: {},
			}
		},
		onLoad(e) {
			this.id = e.id
			this.loadDetail()
		},
		computed: mapState(['hasLogin']),
		methods: {
			loadDetail(){
				uni.request({
					url: 'v1/merchants/relation-view',
					data: {id:this.id},
					success: (res) => {
						const data = res.data;
						console.log(res)
						this.data = data;
						this.data.content = data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
					}
				})
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			toContact(){
				uni.navigateTo({
					url: '/pages/main/contact'
				});
			}
		}
	}
</script>

<style>
@import url("@/components/feng-parse/parse.css");
.event-warp{
		width: 750rpx;
		padding: 0 30rpx;
		display: flex;
		flex-direction: column;
	}
	.event-title{
		font-size: 38rpx;
		font-weight: 700;
		line-height: 44rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.content{
		font-size: 32upx;
		line-height: 1.5;
	}
	.ep{
		margin-bottom: 30upx;
	}
	.content img{
		width: 100%;
	}
	
</style>
