<template>
	<view class="login-page">
		<view class="login-logo">
			<image class="logo-img" src="@/static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="login-input-group">
			<view class="login-btn-cell">
				<button type="primary" class="login-btn" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信用户一键登录</button>
			</view>
			<view class="login-btn-cell">
				<button type="default" class="login-btn" @click="toLoginBind">手机号验证登录</button>
			</view>
		</view>
		<view class="login-footer">
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox value="1" />我已阅读、理解并同意<text class="link-text">《莱荟展用户协议》</text>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				unionid:'',
				openid:'',
				info: {
					
				},
				agreement: null,
			}
		},
		onLoad(e) {
			//this.unionid = e.unionid
			this.onLogin()
		},
		methods: {
			...mapMutations(['login', 'upavatar']),
			onLogin() {
				wx.login({
					success:(res) => {
						//console.log(res)
						if (res.code) {
							//发起网络请求
							uni.request({
								url: "v1/sites/login",
								method: 'POST',
								data: {code: res.code},
								success: (result) => {
									console.log(JSON.stringify(result))
									let data = result.data
									this.unionid = data.unionid
									this.openid = data.openid
								}
							})
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},
			getPhoneNumber(e) {
				if(!this.agreement){
					uni.showToast({
						icon: 'error',
						title: '请同意用户协议',
						duration: 2000
					});
					return false;
				}
				uni.request({
					url: "v1/sites/login-mobile",
					method: 'POST',
					data: {code: e.detail.code, unionid: this.unionid, openid: this.openid},
					success: (res) => {
						console.log(JSON.stringify(res))
						if(res.data.code == 200){
							this.login(res.data.userInfo)
							this.upavatar(res.data.userInfo.avatar)
							uni.switchTab({
							    url: '/pages/tabbar/user'
							});
							//uni.navigateBack()
						}else{
							uni.showToast({
								icon: 'none',
							    title: res.data.message
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
					url: './login-bind?unionid='+this.unionid+'&openid='+this.openid
				})
			},
			checkboxChange: function (e) {
				console.log(e.detail.value)
				const values = e.detail.value
				this.agreement = values[0]
			}

		}
	}
</script>

<style lang="scss">
	.login-page{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		height: 100%;
	}
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
	.login-footer{
		padding: 60rpx;
		font-size: 24rpx;
		color: #909497;
	}
	.link-text{
		color: #007AFF;
	}
	/* 未选中的背景样式 */
	checkbox .wx-checkbox-input{
	  width: 30rpx; 
	  height: 30rpx; 
	  border-radius: 50%;
	}
	
	/* 选中后的背景样式 */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked{
	  border-color: #37C674;
	  background: #37C674;
	}
	
	/* 选中后的勾子样式 */
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
	  width: 30rpx;
	  height: 30rpx;
	  line-height: 30rpx;
	  border-radius: 50%;
	  text-align: center;
	  font-size:24rpx; 
	  color:#FFF; 
	  background: transparent;
	  transform:translate(-50%, -50%) scale(1);
	  -webkit-transform:translate(-50%, -50%) scale(1);
	}
</style>
