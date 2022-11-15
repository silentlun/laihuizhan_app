<template>
	<view class="page">
		<view class="login-logo">
			<image class="logo-img" src="@/static/logo.png" mode="aspectFit"></image>
		</view>
		<!-- <view>
			<text>欢迎您回来！</text>
		</view> -->
		<view class="content-padded">
		<uni-forms ref="valiForm" err-show-type="toast" :rules="rules" :modelValue="formData" :border="true">
			<uni-forms-item name="mobile">
				<uni-easyinput v-model="formData.mobile" :inputBorder="false" placeholder="手机号" />
			</uni-forms-item>
			<uni-forms-item name="smsCode">
				<uni-easyinput type="number" v-model="formData.smsCode" :inputBorder="false" placeholder="验证码" />
				<template v-slot:right>
					<text class="btn-code" :class="{'btn-code-disabled':isDisabled}" @click="sendSms">{{buttonName}}</text>
				</template>
			</uni-forms-item>
		</uni-forms>
		</view>
		<view class="content-padded">
			<t-button text="确认绑定" type="warning" size="lg" shape="circle" @click="formSubmit"></t-button>
		</view>
	</view>
</template>

<script>
	var time = 60;
	import {mapState, mapMutations} from 'vuex'
	export default {
		data() {
			return {
				formData:{},
				buttonName: "发送验证码",
				isDisabled:false,
				rules: {
					mobile: {
						rules: [{
							required: true,
							errorMessage: '手机号不能为空'
							
						}]
					},
					smsCode: {
						rules: [{
							required: true,
							errorMessage: '验证码不能为空',
						},{
							format: 'number',
							errorMessage: '验证码只能是数字',
						}]
					},
				},
			}
		},
		onLoad() {
		},
		methods: {
			...mapMutations(['login', 'upavatar']),
			formSubmit(){
				this.$refs.valiForm.validate().then(res => {
					console.log('success', res);
					uni.showLoading({
						title: '提交中'
					});
					uni.request({
						url: "v1/sites/login",
						method: 'POST',
						data: this.formData,
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
								title: '登录失败',
								duration: 2000
							});
						},
						complete: (e) => {
							uni.hideLoading();
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
				
			},
			sendSms(){
				//this.countdown();
				let formData = this.formData;
				var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
				if(!myreg.test(formData.mobile)){
					uni.showToast({
						icon:'none',
					    title: '请输入有效的手机号码',
					    duration: 2000
					});
					return false;
				}
				uni.request({
					url: 'v1/sites/verify-login',
					data: formData,
					method: 'POST',
					/* header: {
						'content-type': 'application/x-www-form-urlencoded'
					}, */
					success: (res) => {
						console.log(res)
						if (res.code == 200) {
							this.countdown();
						} else {
							uni.showToast({
								icon: 'none',
							    title: res.message
							});
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			countdown() {
				console.log('ss')
				this.isDisabled = true;
				let interval = setInterval(() => {
					this.buttonName = time + '秒后重发';
					time--;
					if (time < 0) {
						this.buttonName = "获取验证码";
						time = 60;
						this.isDisabled = false;
						clearInterval(interval);
					}
				}, 1000);
			}
			
		}
	}
</script>

<style lang="scss">
.login-logo{
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 60rpx 0;
	}
	.logo-img{
		width: 160rpx;
		height: 160rpx;
	}
.tips{
	font-size: 28rpx;
	font-weight: 700;
	text-align: center;
	margin-top: 10rpx;
}
.btn-code{
		font-size: 24rpx;
		color: $uni-color-warning;
		width: 120rpx;
		height: 50rpx;
		line-height:50rpx;
	}
	.btn-code-disabled{
		color: #999999;
	}
	.content-padded{
		display: flex;
		flex-direction: column;
	}

</style>
