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

<style scoped>
	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 100rpx;
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		z-index: 10;
		bottom: 0;
		left: 0;
		right: 0;
		padding-bottom: env(safe-area-inset-bottom);
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	
	.footer-seat {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}
	
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
</style>