<template>
	<view class="service-media" :class="[isBorder?'cell-top-border':'']" @click="bindClick">
		<image class="media-logo" :src="data.thumb"></image>
		<view class="media-body">
			<text class="media-title">{{data.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"service-item",
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
		font-family: "lunfont" !important;
	}
	.service-media {
        width: 750rpx;
        padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
    }

    .venues-media:active {
        background-color: #eeeeee;
    }
	.cell-top-border {
		border-top-color: $uni-border-color;
		border-top-width: 1rpx;
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

</style>
