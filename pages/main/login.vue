<template>
	<view class="page">
		<view class="login-logo">
			<image class="logo-img" src="@/static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="login-input-group">
			<view class="login-btn-cell">
				<button type="primary" class="login-btn" open-type="getPhoneNumber"
					bindgetphonenumber="getPhoneNumber">绑定微信手机号</button>
			</view>
			<view class="login-btn-cell">
				<button type="default" class="login-btn" @click="toLoginBind">绑定其他手机号</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				loginCode: null,
				unionid:null,
			}
		},
		onLoad() {
			this.onLogin()
		},
		methods: {
			...mapMutations(['login', 'upavatar']),
			onLogin() {
				wx.login({
					success(res) {
						console.log(res)
						if (res.code) {
							//发起网络请求
							uni.request({
								url: "v1/sites/login-code",
								method: 'POST',
								data: {code: res.code},
								success: (res) => {
									console.log(JSON.stringify(res))
									if(res.code == 200){
										this.login(res.userInfo)
										this.upavatar(res.userInfo.avatar)
										uni.switchTab({
										    url: '/pages/tabbar/index'
										});
										//uni.navigateBack()
									}else{
										this.unionid = res.unionid
									}
								},
								fail: () => {
									uni.showToast({
										icon: 'error',
										title: '登录失败',
										duration: 2000
									});
								}
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
			getPhoneNumber(e) {
				console.log(e)
				uni.request({
					url: "v1/sites/login-mobile",
					method: 'POST',
					data: {code: e.detail.code, unionid: this.unionid},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.code == 200){
							this.login(res.userInfo)
							this.upavatar(res.userInfo.avatar)
							uni.switchTab({
							    url: '/pages/tabbar/index'
							});
							//uni.navigateBack()
						}else{
							uni.showToast({
								icon: 'none',
							    title: res.message
							});
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'error',
							title: '绑定失败',
							duration: 2000
						});
					}
				})
			},
			toLoginBind() {
				uni.navigateTo({
					url: './login-bind'
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.login-logo {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 60rpx 0;
	}

	.logo-img {
		width: 160rpx;
		height: 160rpx;
	}

	.login-input-group {
		display: flex;
		flex-direction: column;
		width: 750rpx;
		padding: 30rpx 100rpx;
	}

	.login-input-cell {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom-width: 1px;
		border-bottom-color: #e9eaec;
		padding: 28rpx 0;
	}

	.login-input-label {
		width: 90rpx;
		font-size: 28rpx;
		background: #f4f4f4;
		padding: 4rpx 16rpx;
	}

	.login-input {
		height: 60rpx;
		padding: 0 20rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		background-color: #ffffff;
		flex: 1;
	}

	.btn-code {
		font-size: 24rpx;
		color: $uni-color-warning;
		width: 150rpx;
		height: 50rpx;
		line-height: 50rpx;
	}

	.btn-code-disabled {
		color: #999999;
	}

	.submit-btn {
		background-color: #007AFF;
	}

	.login-btn-cell {
		padding-bottom: 0rpx;
		padding-top: 60rpx;
	}

	.login-tips {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 0rpx;
	}

	.tips-reg {
		font-size: 28rpx;
		color: $uni-color-warning;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.tips-pwd {
		font-size: 28rpx;
		color: #777777;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.login-btn {
		border-radius: 90rpx;
	}

	.login-btn:after {
		border-radius: 180rpx;
	}
</style>
