<template>
	<view class="event-media" :class="[isBorder?'cell-top-border':'']" @click="bindClick">
		<view class="media-head">
			<image class="media-logo" :src="data.thumb"></image>
			<view class="media-body">
				<text class="media-title">{{data.title}}</text>
				<view class="media-info">
					<text class="info-text icon">&#xe74a; {{data.start_date}} ~ {{data.end_date}}</text>
					<text class="media-foot-addr icon">&#xe650; {{data.venue}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"event-item",
		emits: ['click'],
		props: {
		    data: {
		        type: Object,
		        default: function(e) {
		            return {}
		        }
		    },
			index:{
				type:Number,
				default:0
			}
		},
		computed: {
		    isBorder() {
		        return this.index
		    }
		},
		methods: {
		    bindClick() {
		        this.$emit('click');
		    },
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon{
		font-family:icontaibo;
	}
	.event-media {
        width: 750rpx;
        padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
    }

    .event-media:active {
        background-color: #eeeeee;
    }
	.cell-top-border {
		border-top-color: $uni-border-color;
		border-top-width: 1rpx;
	}

    .media-head {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
        flex-direction: row;
		justify-content: space-between;
    }
	.media-logo {
		width: 240rpx;
		height: 150rpx;
		margin-right: 20rpx;
		border-radius: $uni-border-radius-sm;
	}
	.media-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		flex: 1;
		
	}
	.media-title {
		font-size: 32rpx;
		color: #333;
		line-height: 40rpx;
		text-overflow: ellipsis;
		/* #ifdef APP-NVUE */
		lines: 3;
		/* #endif */
	}
	.media-info {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: space-between;
		width: 390rpx;
	}
	.info-text {
		color: #777;
		font-size: 20rpx;
		margin-bottom: 16rpx;
	}
	.info-price{
		color: $uni-color-warning;
	}
	.media-foot{
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
	}
	.media-foot-addr{
		font-size: 20rpx;
		color: #777;
		/* #ifndef APP-NVUE */
		lines: 1;
		/* #endif */
	}
	.media-foot-btn{
		border-radius: 4rpx;
		padding: 6rpx 20rpx;
		text-align: center;
		font-size: 20rpx;
		color: $uni-color-warning;
		border-width: 1rpx;
		border-color: $uni-color-warning;
		border-style: solid;
		
	}
	.btn-gray{
		color: #777777;
		border-color: #dddddd;
	}
	.btn-red{
		color: #e74c3c;
		border-color: #e74c3c;
	}
	.btn-green{
		color: #1AAD19;
		border-color: #1AAD19;
	}
</style>
