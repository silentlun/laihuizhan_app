<template>
	<view>
		<view class="footer-seat"></view>
		<view class="footer">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"t-footer",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.footer {
		position: fixed;
		z-index: 10;
		bottom: 0;
		left: 0;
		right: 0;
		/* #ifndef APP-NVUE */
		display: flex;
		/* padding-bottom: calc(20rpx + env(safe-area-inset-bottom)); */
		padding-bottom: env(safe-area-inset-bottom);
		/* #endif */
		/* #ifdef APP-NVUE */
		border-top: 1rpx solid #eaeef1;
		/* #endif */
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		background: rgba(255, 255, 255, 0.98);
	}
	
	.footer-seat {
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		height: calc(100rpx + env(safe-area-inset-bottom));
		margin-bottom: env(safe-area-inset-bottom);
		
	}
	/* #ifndef APP-NVUE */
	.footer::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}
	/* #endif */
</style>