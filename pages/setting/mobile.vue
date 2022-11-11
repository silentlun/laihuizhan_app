<template>
	<view class="page">
		<view class="content-padded">
			<text class="tips">手机号更换成功后</text>
			<text class="tips">请使用新手机号及当前密码登录</text>
		</view>
		<view class="content-padded">
		<t-forms-item>
			<t-input type="text" v-model="formData.password" placeholder="请输入当前绑定的手机号"></t-input>
		</t-forms-item>
		<t-forms-item>
			<t-input type="text" v-model="formData.repassword" placeholder="请输入新的手机号"></t-input>
		</t-forms-item>
		<t-forms-item>
			<t-input type="number" v-model="formData.smsCode" placeholder="输入验证码"></t-input>
			<template v-slot:right>
				<text class="btn-code" :class="{'btn-code-disabled':isDisabled}" @click="sendSms">{{buttonName}}</text>
			</template>
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
				buttonName: "发送验证码",
				isDisabled:false,
			}
		},
		methods: {
			formSubmit() {
				//表单规则
				let rules = [{
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入原手机号", "请输入正确的手机号"]
				},{
					name: "newmobile",
					rule: ["required", "isMobile"],
					msg: ["请输入新手机号", "请输入正确的手机号"]
				},{
					name: "smsCode",
					rule: ["required", "isNum"],
					msg: ["请输入短信验证码", "验证码必须为数字"]
				}];
				//进行表单检查
				let formData = this.formData;
				console.log(formData)
				
				let checkRes = validate.validation(formData, rules);
				if (!checkRes) {
					uni.request({
						url: getApp().globalData.appUrl+"index.php?m=member&c=apps&a=account_manage_password",
						method: 'POST',
						data: formData,
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Token':this.userInfo.token
						},
						success: (res) => {
							console.log(JSON.stringify(res))
							if (res.statusCode == 200) {
								if(res.data.status == 1){
									uni.navigateBack({
									    delta: 1
									});
								}
								plus.nativeUI.toast(res.data.msg,{verticalAlign:"center"});
								
							}
						}
					})
					
				} else {
					plus.nativeUI.toast(checkRes,{verticalAlign:"center"});
				}
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
