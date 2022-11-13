<template>
	<view class="page">
		<view class="content-padded">
			<text class="tips">手机号更换成功后</text>
			<text class="tips">请使用新手机号及当前密码登录</text>
		</view>
		<view class="content-padded">
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" :border="true">
			<uni-forms-item name="mobile">
				<uni-easyinput v-model="formData.mobile" :inputBorder="false" placeholder="输入新的手机号" />
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
