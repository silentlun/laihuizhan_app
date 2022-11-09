<template>
	<view>
		<view class="footer-seat"></view>
		<view class="footer">
			<view class="foot-nav">
				<view class="foot-nav-left">
					<view class="foot-nav-item" hover-class="opcity" :hover-stay-time="150">
						<t-icons type="shoucang" :size="16" color='#333'></t-icons>
						<view class="foot-nav-text">关注</view>
					</view>
					<view class="foot-nav-item" hover-class="opcity" :hover-stay-time="150">
						<t-icons type="share" :size="16" color='#333'></t-icons>
						<view class="foot-nav-text">分享</view>
					</view>
				</view>
				<view class="foot-nav-right">
					<slot></slot>
				</view>
			</view>
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
	
	
	
	.foot-nav{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 690rpx;
	}
	.foot-nav-left{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 40%;
	}
	.foot-nav-right{
		width: 40%;
	}
	.foot-nav-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}
	
	.foot-nav-text {
		font-size: 20rpx;
		color: #333;
	}
	
	.opacity {
		opacity: 0.5;
	}
</style>