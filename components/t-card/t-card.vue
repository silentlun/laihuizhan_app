<template>
	<view class="card">
		<slot name="header">
			<text class="card-header">{{data.title}}</text>
		</slot>
		<slot name="body">
			<text class="card-body">{{data.body}}</text>
		</slot>
		<slot name="footer">
			<view class="card-footer" @click="onClick">
				<text class="footer-text">{{data.moreText}}</text>
				<t-icons type="right" color="#bbb"></t-icons>
			</view>
		</slot>
	</view>
</template>

<script>
	export default {
		name:"t-card",
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
		methods: {
			onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style>
	.card{
		flex-direction: column;
		background-color: #FFFFFF;
		margin-top: 20rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.card-header{
		font-size: 32rpx;
		padding: 20rpx;
	}
	.card-body{
		font-size: 24rpx;
		color: #777777;
		line-height: 32rpx;
		padding: 0 20rpx 20rpx 20rpx;
		text-overflow: ellipsis;
		lines: 3;
	}
	.card-footer{
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-style: solid;
		border-color: #e9eaec;
		border-top-width: 1rpx;
		padding: 20rpx;
	}
	.footer-text{
		font-size: 24rpx;
		color: #777777;
		text-overflow: ellipsis;
		lines: 1;
		flex: 1;
	}

</style>
