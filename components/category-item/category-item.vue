<template>
	<view class="category-item">
		<image class="category-img" :src="defaultImg ? defaultImg : data.image" @error="onavatarError"></image>
		<text class="category-name">{{data.catname}}</text>
	</view>
</template>

<script>
	export default {
		name:"category-item",
		emits: ['click'],
		props: {
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
		},
		data() {
			return {
				defaultImg: null,
			}
		},
		mounted() {
			if(!this.data.image) this.defaultImg = '/static/service_icon_default.jpg';
		},
		methods: {
			bindClick() {
				this.$emit('click');
			},
			onavatarError(e){
				//console.error('image发生error事件，携带值为' + e.detail.errMsg)
				this.defaultImg = '/static/service_icon_default.png'
				//console.log(this.defaultImg)
			},
		}
	}
</script>

<style scoped>
	.category-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 20rpx 0;
	}
	.category-img{
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
		margin-bottom: 10rpx;
	}
	.category-name{
		font-size: 26rpx;
	}

</style>