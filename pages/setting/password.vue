<template>
	<view class="page">
		<view class="content-padded">
			<text class="tips">重置密码后，请使用新密码登录！</text>
		</view>
		<view class="content-padded">
			<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" :border="true">
				<uni-forms-item name="password">
					<uni-easyinput type="password" v-model="formData.password" :inputBorder="false" placeholder="输入新密码" />
				</uni-forms-item>
				<uni-forms-item name="password_repeat">
					<uni-easyinput type="password" v-model="formData.password_repeat" :inputBorder="false" placeholder="确认密码" />
				</uni-forms-item>
				<uni-forms-item>
					<view class="content-padded">
						<t-button text="确认修改" type="warning" size="lg" shape="circle" block @click="formSubmit"></t-button>
					</view>
				</uni-forms-item>
			</uni-forms>
		</view>
		
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				formData:{},
				rules: {
					password: {
						rules: [{
							required: true,
							errorMessage: '新密码不能为空'
							
						},{
							minLength: 3,
							maxLength: 5,
							errorMessage: '密码长度必须介于{minLength}至{maxLength}个字符之间',
						}]
					},
					password_repeat: {
						rules: [{
							required: true,
							errorMessage: '确认密码不能为空'
							
						},{
							validateFunction: (rule, value, data, callback) => {
								if(value !== this.formData.password){
									callback('两次输入密码不一致')
								}
								return true
							}
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
						url: "v1/users/security-password",
						method: 'POST',
						data: this.formData,
						success: (res) => {
							console.log(JSON.stringify(res))
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
		}
	}
</script>

<style>
.tips{
	font-size: 28rpx;
	font-weight: 700;
	text-align: center;
	margin-top: 10rpx;
}

</style>
