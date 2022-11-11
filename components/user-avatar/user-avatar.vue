<template>
	<view class="user-avatar" :class="[isrow ? 'user-avatar-row' : 'user-avatar-column']" @click="bindClick">
		<image class="avatar-img" :class="[isrow ? 'avatar-img-row' : 'avatar-img-column']" :src="avatar" @error="onavatarError"></image>
		<view class="avatar-body" :class="[isrow ? 'avatar-body-row' : 'avatar-body-column']">
			<view class="avatar-name-box" v-if="showName">
				<text class="avatar-name">{{data.username}}</text>
				<!-- <text class="avatar-label" v-if="data.groupid == 2">GIO</text> -->
				<!-- <text class="avatar-label" v-if="data.groupid == 3">PRO</text> -->
			</view>
			<text class="avatar-text">{{data.tips}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"user-avatar",
		emits: ['click'],
		props: {
			data: {
				type: Object,
				default: function(e) {
					return {}
				}
			},
			avatar: {
				type: String,
				default: ''
			},
			showName: {
				type: [Boolean, String],
				default: false
			},
			isrow: {
				type: [Boolean, String],
				default: false
			},
		},
		mounted() {
			this.avatar = this.avatar ? this.avatar : '/static/default_user.png';
		},
		methods: {
			bindClick() {
				this.$emit('click');
			},
			onavatarError(e){
				console.error('image发生error事件，携带值为' + e.detail.errMsg)
				this.data.avatar = '/static/default_user.png'
			},
		}
	}
</script>

<style lang="scss" scoped>
	.user-avatar-column{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
		width: 750rpx;
		padding-bottom: 40rpx;
	}
	.user-avatar-row{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		background-color: #ffffff;
		width: 750rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-bottom: 40rpx;
	}
	.avatar-img-row{
		width: 100rpx;
		height: 100rpx;
		border-radius: 100rpx;
		margin-right: 20rpx;
	}
	.avatar-img-column{
		width: 160rpx;
		height: 160rpx;
		border-radius: 160rpx;
	}
	.avatar-body{
		display: flex;
		flex-direction: column;
		margin-top: 10rpx;
	}
	.avatar-body-column{
		justify-content: center;
		align-items: center;
	}
	.avatar-body-row{
		justify-content: flex-start;
		align-items: flex-start;
	}
	.avatar-name-box{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
	
	.avatar-label{
		font-size: 20rpx;
		color: #FFFFFF;
		background-color: $uni-color-warning;
		
		padding: 2rpx 10rpx;
		border-radius: 4rpx;
	}
	.avatar-name{
		font-size: 32rpx;
		margin-bottom: 8rpx;
	}
	.avatar-text{
		font-size: 24rpx;
		color: #999999;
		margin-top: 10rpx;
	}

</style>
