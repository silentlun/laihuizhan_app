<template>
	<view class="venues-media" :class="[isBorder?'cell-top-border':'']" @click="bindClick">
		<view class="media-head">
			<image class="media-logo" :src="data.thumb"></image>
			<view class="media-body">
				<text class="media-title">{{data.title}}</text>
				<view class="media-info" v-if="isFav">
					<view class="favor-box" @click.stop="onDelete">
						<uni-icons type="trash" size="14" color="#777"></uni-icons>
						<text class="favor-text">删除</text>
					</view>
				</view>
				<view class="media-info" v-else>
					<text class="media-foot-addr icon">&#xe677; {{data.address}}</text>
					<view class="info-tag">
						<uni-tag class="tag-item" v-for="(tag,i) in data.tagValues" :key="i" :text="tag" type="warning" size="small" :circle="true" :inverted="true"></uni-tag>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"venues-item",
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
			},
			isFav: {
				type: [Boolean, String],
				default: false
			},
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
			},
			onDelete(e) {
			    this.$emit('close');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon{
		font-family: "lunfont" !important;
	}
	.venues-media {
        width: 750rpx;
        padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
    }

    .venues-media:active {
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
		font-size: 24rpx;
		color: #909497;
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
	.info-tag{
		display: flex;
		flex-direction: row;
		margin-top: 10rpx;
	}
	.tag-item{
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
