<template>
	<view>
		<image class="page-banner" :src="data.thumb" mode="scaleToFill"></image>
		<view class="page-warp">
			<text class="detail-title">{{data.title || ''}}</text>
		</view>
		
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<lun-section title="服务介绍"></lun-section>
		<view class="page-warp" style="padding-bottom: 50px;">
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
			
		</view>
		<lun-footer v-if="data.merchant_id > 0">
			<view class="create-btn"><t-button text="查看服务商详情" type="warning" shape="circle" size="md" @click="toMerchant"></t-button></view>
		</lun-footer>
	</view>
</template>

<script>
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				id:0,
				data: {},
				htmlNodes: [],
			}
		},
		onLoad(e) {
			this.id = e.id
			this.loadDetail()
		},
		methods: {
			loadDetail(){
				uni.request({
					url: 'v1/venues/relation-view',
					data: {id:this.id},
					success: (res) => {
						const data = res.data;
						console.log(res)
						this.data = data;
						let content = data.content.replace(/\<p/gi, '<p class="ep"');
						content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
						this.htmlNodes = htmlParser(content);
					}
				})
			},
			toMerchant(){
				uni.navigateTo({
					url: '/pages/merchant/view?id=' + this.data.merchant_id
				});
			}
		}
	}
</script>

<style scoped>
	.page-warp{
		margin-bottom: 40rpx;
	}
	.create-btn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}
	
</style>
