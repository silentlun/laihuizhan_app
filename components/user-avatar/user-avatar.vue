<template>
	<image class="avatar-img" 
	:class="[size ? 'avatar-img-'+size : '']"
	:src="defaultImg ? defaultImg : avatar" 
	@error="onavatarError" 
	@click="bindClick"></image>
</template>

<script>
	export default {
		name:"user-avatar",
		emits: ['click'],
		props: {
			avatar: {
				type: String,
				default: ''
			},
			size: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				defaultImg: null,
			}
		},
		mounted() {
			if(!this.avatar) this.defaultImg = '/static/user_defalut.jpg';
		},
		methods: {
			bindClick() {
				this.$emit('click');
			},
			onavatarError(e){
				//this.defaultImg = '/static/user_defalut.jpg'
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
				this.defaultImg = '/static/user_defalut.jpg'
				console.log(this.defaultImg)
			},
		}
	}
</script>

<style scoped>
	.avatar-img{
		width: 90rpx;
		height: 90rpx;
		border-radius: 90rpx;
	}
	.avatar-img-sm{
		width: 60rpx;
		height: 60rpx;
		border-radius: 60rpx;
	}
	.avatar-img-md{
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
	}
	.avatar-img-lg{
		width: 180rpx;
		height: 180rpx;
		border-radius: 180rpx;
	}
	
</style>
