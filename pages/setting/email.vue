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
				<uni-forms-item>
					<view class="content-padded">
						<t-button text="确认修改" type="warning" size="lg" shape="circle" block :disabled="!formData.email" @click="formSubmit"></t-button>
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		
	</view>
</template>

<script>
	var time = 60;
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
						url: "v1/users/security-email",
						method: 'POST',
						data: this.formData,
						success: (res) => {
							console.log(res)
							if (res.data.code == 200) {
								uni.showToast({
									icon:'success',
									title: '修改成功',
									duration: 2000,
								})
								setTimeout(()=>{
									uni.navigateBack({
									    delta: 1
									})
								}, 2000)
								
							}else{
								uni.showToast({
									icon:'error',
									title: res.data.message,
									duration: 2000,
								})
							}
						}
					})
				}).catch(err => {
					console.log('err', err);
				})
				
			},
			sendSms(){
				//this.countdown();
				let formData = this.formData;
				var myreg = /^\w+@[a-z0-9]+\.[a-z]+$/i;
				if(!myreg.test(formData.email)){
					uni.showToast({
						icon:'none',
					    title: '请输入有效的邮箱',
					    duration: 2000
					});
					return false;
				}
				uni.request({
					url: 'v1/users/send-verify-email',
					data: formData,
					method: 'POST',
					success: (res) => {
						console.log(res)
						if (res.data.code == 200) {
							this.countdown();
						} else {
							uni.showToast({
								icon: 'none',
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
	font-size: 32rpx;
	font-weight: 700;
	text-align: center;
	margin-top: 10rpx;
}
.btn-code{
		font-size: 28rpx;
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
