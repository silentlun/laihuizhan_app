<template>
	<view class="foot-nav">
		<view class="foot-nav-left">
			<view class="foot-nav-item" hover-class="opcity" :hover-stay-time="150" v-if="active" @click="favClick">
				<uni-icons type="star-filled" :size="18" color="#ff7510"></uni-icons>
				<text class="foot-nav-text nav-active">已关注</text>
			</view>
			<view class="foot-nav-item" hover-class="opcity" :hover-stay-time="150" v-else @click="favClick">
				<uni-icons type="star" :size="18" color="#333"></uni-icons>
				<text class="foot-nav-text">关注</text>
			</view>
			<view class="foot-nav-item" hover-class="opcity" :hover-stay-time="150" @click="shareClick">
				<t-icons type="share" :size="16" color='#333'></t-icons>
				<text class="foot-nav-text">分享</text>
			</view>
		</view>
		<view class="foot-nav-right">
			<slot name="right">
				<t-button :text="buttonText" type="warning" shape="circle" size="md" @click="buttonClick"></t-button>
			</slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"lun-footer-nav",
		emits:['click','buttonClick'],
		props: {
			buttonText: {
				type: String,
				default: '联系方式',
			},
			active:{
				type: Boolean,
				default: false
			}
		},
		methods: {
			favClick() {
				this.$emit('favClick')
			},
			shareClick() {
				this.$emit('shareClick')
			},
			buttonClick() {
				this.$emit('buttonClick')
			}
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
	.nav-active{
		color: #ff7510;
	}
	
	.opacity {
		opacity: 0.5;
	}
</style>
