<template>
	<view class="qy-item" @click="bindClick">
		<image class="qy-logo" :src="data.logo"></image>
		<view class="qy-list-body">
			<text class="qy-title">{{data.title}}</text>
			<text class="qy-desc">{{data.address}}</text>
			<view class="qy-desc-foot" v-if="!isFav">
				<text class="lable">{{data.category.catname}}</text>
			</view>
			<view class="qy-desc-foot" v-else>
				<view class="favor-box" @click.stop="onDelete">
					<uni-icons type="trash" size="14" color="#777"></uni-icons>
					<text class="favor-text">删除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"company-item",
		props: {
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			showbtn: {
				type: [Boolean, String],
				default: false
			},
			isFav: {
				type: [Boolean, String],
				default: false
			},
		},
		methods: {
			bindClick() {
				this.$emit('click');
			},
			onDelete(e) {
			    this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qy-item{
		/* #ifndef APP-NVUE */
		display: flex;
		position: relative;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		padding: 30rpx 0rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
		background-color: #ffffff;
		/* #ifdef APP-NVUE */
		border-bottom-color: #e5e5e5;
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		/* #endif */
		
	}
	/* #ifndef APP-NVUE */
	.qy-item:after {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: "";
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e5e5e5;
	}
	/* #endif */
	.qy-logo{
		width: 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 100rpx;
		border-color: #e5e5e5;
		border-width: 1px;
		border-style: solid;
	}
	.qy-list-body{
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
	}
	.qy-list-date{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
	}
	.qy-title{
		font-size: 32rpx;
		/* #ifdef APP-NVUE */
		line-height: 18;
		/* #endif */
		/* #ifndef APP-NVUE */
		line-height: 40rpx;
		/* #endif */
	}
	.qy-desc{
		font-size: 24rpx;
		color: #A6A6A6;
		/* #ifdef APP-NVUE */
		line-height: 28;
		/* #endif */
		/* #ifndef APP-NVUE */
		line-height: 48rpx;
		/* #endif */
	}
	.qy-date{
		font-size: 24rpx;
		color: #999999;
	}
	.qy-btn{
		font-size: 20rpx;
		color: $uni-color-warning;
		padding: 8rpx 20rpx;
		border-radius: 30rpx;
		border-color: $uni-color-warning;
		border-width: 1rpx;
		border-style: solid;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
	}
	.qy-desc-foot{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top:5rpx
	}
	.lable{
		font-size: 20rpx;
		color: #585858;
		padding: 4rpx 20rpx;
		border-radius: 30rpx;
		background-color: #EEEEEE;
		margin-right: 10rpx;
	}
	.favor-box{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.favor-text {
		color: #909497;
		font-size: 24rpx;
	}

</style>

