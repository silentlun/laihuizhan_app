<template>
	<view class="headline">
		<text class="head-title">{{title}}</text>
		<view class="link-more" v-if="showMore" @click="onClick">
			<text class="link-more-text">更多</text>
			<uni-icons type="right" color="#999999"></uni-icons>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"t-section",
		emits: ['click'],
		props: {
			title: {
				type: String,
				default: ''
			},
			link: {
				type: String,
				default: ''
			},
			showMore: {
				type: [Boolean, String],
				default: false
			},
		},
		mounted() {
			this.showMore = this.link ? true : false
		},
		methods: {
			onClick() {
				uni.navigateTo({
					url: this.link
				})
			}
		}
	}
</script>

<style scoped>
	.headline {
		width: 750rpx;
		height: 100rpx;
		padding: 0 30rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		/* border-color: #dddddd;
		border-bottom-width: 1rpx; */
	
		background-color: #FFFFFF;
	
	}
	
	.head-title {
		font-size: 32rpx;
		font-weight: 700;
		color: #000;
		/* border-left: #ff9900 solid 4px;
		padding-left: 10rpx; */
	}
	
	.link-more{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.link-more-text{
		font-size: 24rpx;
		color: #999;
		text-align: right;
	}
</style>
