<template>
	<view class="foot-nav">
		<view class="foot-nav-left">
			<view class="foot-nav-item" hover-class="opcity" :hover-stay-time="150">
				<t-icons type="shoucangfill" :size="16" color='#333'></t-icons>
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
</template>

<script>
	export default {
		name:"t-foot-nav",
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
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
		width: 41.66666667%;
	}
	.foot-nav-right{
		width: 58.33333333%;
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
