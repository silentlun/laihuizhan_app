<template>
	<swiper class="slider" indicator-dots="true" circular="true" indicator-color="#666666" indicator-active-color="#999999" autoplay>
		<swiper-item class="slider-item" v-for="(item,s) in data" :key="s" @click="onClick(item)">
			<image class="slider-item-image" :src="item.thumb"></image>
			<text class="slide-item-title">{{item.title}}</text>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name:"t-swiper",
		emits: ['click'],
		props: {
			data: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			onClick(item) {
				this.$emit('click', item)
			}
		}
	}
</script>

<style>
	.slider {
		width: 690rpx;
		height: 388rpx;
		margin-left: 30rpx;
		margin-right: 30rpx;
	}
	
	.slider-item {
		width: 690rpx;
		height: 388rpx;
		position: relative;
	}
	
	.slider-item-image {
		width: 690rpx;
		height: 388rpx;
		border-radius: 2px;
	}
	
	.slide-item-title {
		width: 690rpx;
		padding: 20rpx;
		font-size: 28rpx;
		text-align: left;
		color: #fff;
		/* background-color: rgba(0, 0, 0, 0.4); */
		background-image:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,1));
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 2px;
		padding-bottom: 20px;
	}
	

</style>
