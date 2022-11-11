<template>
	<view class="page">
		<view class="content-padded">
			<text class="tips">重置密码后，请使用新密码登录！</text>
		</view>
		<view class="content-padded">
		<t-forms-item label="新密码">
			<t-input type="password" v-model="formData.password" placeholder="6~20位字符"></t-input>
		</t-forms-item>
		<t-forms-item label="确认密码">
			<t-input type="password" v-model="formData.password_repeat" placeholder="确认新密码"></t-input>
		</t-forms-item>
		
		</view>
		<view class="content-padded">
			<t-button text="确认修改" type="warning" size="lg" shape="circle" @click="formSubmit"></t-button>
		</view>
	</view>
</template>

<script>
	var validate = require("@/common/formValidation.js")
	export default {
		data() {
			return {
				formData:{},
			}
		},
		methods: {
			formSubmit() {
				//表单规则
				let rules = [{
					name: "password",
					rule: ["required", "minLength:6", "maxLength:20"],
					msg: ["请输入新密码", "密码为6~20位字符"]
				},{
					name: "password_repeat",
					rule: ["required", "isSame:password"],
					msg: ["请输入确认密码", "两次输入的密码不一致"]
				}];
				//进行表单检查
				let formData = this.formData;
				console.log(formData)
				
				let checkRes = validate.validation(formData, rules);
				if (!checkRes) {
					uni.request({
						url: "v1/users/changepwd",
						method: 'POST',
						data: formData,
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
									title: res.data.data.msg,
									duration: 2000,
								});
								
							}
						}
					})
					
				} else {
					uni.showToast({
						icon:'none',
						title: checkRes,
						duration: 2000,
					});
				}
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
