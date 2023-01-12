<template>
	<view class="page">
		<view class="content-padded">
			<text class="tips">手机号更换成功后</text>
			<text class="tips">请使用新手机号登录</text>
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
			<uni-forms-item>
				<view class="content-padded">
					<t-button text="确认修改" type="warning" size="lg" shape="circle" block :disabled="!formData.smsCode" @click="formSubmit"></t-button>
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
				this.$refs.valiForm.validate().then(result => {
					console.log('success', result);
					uni.request({
						url: "v1/users/security-mobile",
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
									    delta: 2
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
					url: 'v1/users/send-bind-mobile',
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
