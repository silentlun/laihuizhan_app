<template>
	<view class="forms-item">
		<slot name="left">
			<text class="label-text" :style="{ width: labelWidth}" v-if="label">{{ label }}</text>
		</slot>
		<slot></slot>
		<slot name="right"></slot>
	</view>
</template>

<script>
	export default {
		name:"t-forms-item",
		props: {
			label: String,
			// 左边标题的宽度单位px
			labelWidth: {
				type: [Number, String],
				default: ''
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.forms-item{
		/* #ifndef APP-NVUE */
		display: flex;
		width: 100%;
		/* #endif */
		flex-direction: row;
		align-items: center;
		border-bottom-width: 1px;
		border-bottom-color: #e9eaec;
		border-bottom-style: solid;
		padding: 20rpx 0;
	}
	.label-text{
		width: 80rpx;
		font-size: 28rpx;
		color: #666666;
		padding: 4rpx 16rpx;
	}

</style>
