<template>
	<text class="t-button" :class="[{'t-buttonbutton--disabled': disabled},'size-'+size, 'btn-'+shape, plain?'btn-outline btn-'+type+'-outline':'btn-'+type]" @click="onClick">{{text}}</text>
</template>

<script>
	export default {
		name:"t-button",
		emits: ['click'],
		props: {
			text: String,
			/* size: {
				type: [Number, String],
				default: 16
			}, */
			size: {
				type: String,
				default: 'md'
			},
			type: {
				type: String,
				default: 'primary'
			},
			plain: {
				type: [Boolean, String],
				default: false
			},
			// circle, square，rightAngle
			shape: {
				type: String,
				default: 'square'
			},
			disabled: {
				type: [Boolean, String],
				default: false
			},
		},
		methods: {
			onClick() {
				if(this.disabled) return false;
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.t-button{
		text-align: center;
		opacity: 1;
	}
	.t-button:active{
		opacity: 0.7;
	}
	.t-buttonbutton--disabled {
		opacity: 0.7;
	}
	
	.btn-gray{
		background-color: #ededed;
		color: #666666;
	}
	/* .btn-gray-hover {
		background-color: #d5d5d5;
		color: #898989;
	} */
	.btn-primary{
		background-color: #5677fc;
		color: #ffffff;
	}
	.btn-danger{
		background-color: #EB0909;
		color: #ffffff;
	}
	.btn-warning{
		background-color: $uni-color-warning;
		color: #ffffff;
	}
	.btn-white {
		background-color: #ffffff;
		border: 1rpx solid #e9eaec;
		color: #000000;
	}
	.btn-square {
		border-radius: 6rpx;
	}
	.btn-circle {
		border-radius: 100rpx;
	}
	.btn-primary-outline{
		background-color: #ffffff;
		border-color: #5677fc;
		border-style: solid;
		/* #ifndef APP-NVUE */
		border-width: 1px;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-width: 1rpx;
		/* #endif */
		color: #5677fc;
	}
	.btn-danger-outline{
		background-color: #ffffff;
		border-color: #EB0909;
		border-style: solid;
		/* #ifndef APP-NVUE */
		border-width: 1px;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-width: 1rpx;
		/* #endif */
		color: #EB0909;
	}
	.btn-warning-outline{
		background-color: #ffffff;
		border-color: $uni-color-warning;
		border-style: solid;
		/* #ifndef APP-NVUE */
		border-width: 1px;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-width: 1rpx;
		/* #endif */
		color: $uni-color-warning;
	}
	.btn-gray-outline{
		background-color: #ffffff;
		border-color: #e9eaec;
		border-style: solid;
		/* #ifndef APP-NVUE */
		border-width: 1px;
		/* #endif */
		/* #ifdef APP-NVUE */
		border-width: 1rpx;
		/* #endif */
		color: #444444;
	}
	.size-xxs{
		font-size: 20rpx;
		padding: 8rpx 20rpx;
	}
	.size-xs{
		font-size: 24rpx;
		padding: 10rpx 20rpx;
	}
	.size-sm{
		font-size: 28rpx;
		padding: 10rpx 30rpx;
	}
	.size-md{
		font-size: 28rpx;
		padding: 16rpx 40rpx;
	}
	.size-lg{
		font-size: 32rpx;
		padding: 24rpx 60rpx;
	}
	.size-xl{
		font-size: 36rpx;
		padding: 28rpx 90rpx;
	}
	.size-xxl{
		font-size: 48rpx;
		padding: 28rpx 90rpx;
	}

</style>
