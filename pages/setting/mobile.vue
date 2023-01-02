<template>
	<view class="page">
		<view class="content-padded">
			<text class="tips">验证当前绑定的手机号码</text>
		</view>
		<view class="content-padded">
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" :border="true">
			<uni-forms-item name="mobile">
				<text>{{mobile}}</text>
			</uni-forms-item>
			<uni-forms-item name="verifyCode">
				<uni-easyinput type="number" v-model="formData.verifyCode" :inputBorder="false" placeholder="输入验证码" />
				<template v-slot:right>
					<text class="btn-code" :class="{'btn-code-disabled':isDisabled}" @click="sendSms">{{buttonName}}</text>
				</template>
			</uni-forms-item>
		</uni-forms>
		</view>
		<view class="content-padded">
			<t-button text="下一步" type="warning" size="lg" shape="circle" :disabled="!formData.verifyCode" @click="formSubmit"></t-button>
		</view>
		
	</view>
</template>

<script>
	var time = 60;
	export default {
		data() {
			return {
				mobile: '',
				formData:{},
				buttonName: "获取验证码",
				isDisabled:false,
				rules: {
					verifyCode: {
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
		onLoad(e) {
			this.mobile = e.mobile
		},
		methods: {
			formSubmit() {
				console.log('formSubmit')
				uni.hideKeyboard();
				this.$refs.valiForm.validate().then(result => {
					console.log('success', result);
					uni.request({
						url: "v1/users/verify-mobile",
						method: 'POST',
						data: this.formData,
						success: (res) => {
							console.log(JSON.stringify(res))
							if (res.data.code == 200) {
								uni.navigateTo({
									url: "/pages/setting/mobile-bind"
								})
							}else{
								uni.showToast({
									icon:'error',
								    title: '验证失败',
								    duration: 2000
								});
							}
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
				
			},
			sendSms(){
				uni.request({
					url: 'v1/users/send-verify-mobile',
					method: 'POST',
					success: (res) => {
						console.log(res)
						if (res.data.code == 200) {
							this.countdown();
						} else {
							uni.showToast({
								icon: 'error',
							    title: res.data.message
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
.tips{
	font-size: 28rpx;
	font-weight: 700;
	text-align: center;
	margin-top: 10rpx;
}
.btn-code{
		font-size: 24rpx;
		color: $uni-color-warning;
		width: 140rpx;
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
