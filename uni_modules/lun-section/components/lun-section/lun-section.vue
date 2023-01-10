<template>
	<view class="lun-section">
		<view class="lun-section__decoration" v-if="type" :class="type" />
		<slot v-else name="decoration"></slot>
		<text class="lun-section__title">{{ title }}</text>
		<view class="lun-section-right" v-if="showMore" @click="onClick">
			<text class="lun-section-right__more-text">更多</text>
			<uni-icons type="right" color="#999999"></uni-icons>
		</view>
		<slot v-else name="right"></slot>
	</view>
</template>

<script>
	/**
	 * Section 标题栏
	 * @description 标题栏
	 * @property {String} type = [line|circle|square] 标题装饰类型
	 * 	@value line 竖线
	 * 	@value circle 圆形
	 * 	@value square 正方形
	 * @property {String} title 主标题
	 * @property {String} link 跳转链接
	 * @property {String} showMore 显示箭头
	 */
	export default {
		name:"LunSection",
		emits: ['click'],
		props: {
			type: {
				type: String,
				default: ''
			},
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
				console.log('click')
				uni.navigateTo({
					url: this.link
				})
			}
		}
	}
</script>

<style lang="scss" >
	$uni-primary: #2979ff !default;
	.lun-section {
		width: 750rpx;
		height: 100rpx;
		padding: 0 30rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		&__decoration{
		  margin-right: 6px;
		  background-color: $uni-primary;
		  &.line {
		    width: 4px;
		    height: 12px;
		    border-radius: 10px;
		  }
		
		  &.circle {
		    width: 8px;
		    height: 8px;
		    border-top-right-radius: 50px;
		    border-top-left-radius: 50px;
		    border-bottom-left-radius: 50px;
		    border-bottom-right-radius: 50px;
		  }
		
		  &.square {
		    width: 8px;
		    height: 8px;
		  }
		}
		&__title {
			font-size: 32rpx;
			font-weight: 700;
			color: #000;
		}
		.lun-section-right{
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			&__more-text{
				font-size: 24rpx;
				color: #999;
				text-align: right;
			}
		}
	
	}
</style>
