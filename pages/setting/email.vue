<template>
	<view class="page">
		<view class="content-padded">
			<text class="tips">绑定您常用的邮箱</text>
			<text class="tips">用于接收系统通知和找回账号凭证</text>
		</view>
		<view class="content-padded">
			<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" :border="true">
				<uni-forms-item name="email">
					<uni-easyinput v-model="formData.email" :inputBorder="false" placeholder="请输入邮箱" />
				</uni-forms-item>
				<uni-forms-item name="smsCode">
					<uni-easyinput type="number" v-model="formData.smsCode" :inputBorder="false" placeholder="输入验证码" />
					<template v-slot:right>
						<text class="btn-code" :class="{'btn-code-disabled':isDisabled}" @click="sendSms">{{buttonName}}</text>
					</template>
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="content-padded">
			<t-button text="确认修改" type="warning" size="lg" shape="circle" @click="formSubmit"></t-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:{},
				buttonName: "获取验证码",
				isDisabled:false,
				rules: {
					email: {
						rules: [{
							required: true,
							errorMessage: '邮箱不能为空'
							
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
		methods: {
			formSubmit() {
				uni.hideKeyboard();
				this.$refs.valiForm.validate().then(res => {
					console.log('success', res);
					uni.request({
						url: "v1/users/changepwd",
						method: 'POST',
						data: this.formData,
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						success: (res) => {
							console.log(JSON.stringify(res))
							if (res.statusCode == 200) {
								if(res.data.data.status == 1){
									uni.navigateBack({
									    delta: 1
									});
								}
								uni.showToast({
									icon:'none',
									title: res.data.data.message,
									duration: 2000,
								});
								
							}
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
				
			},
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
