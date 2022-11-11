<template>
	<view>
		<view class="profile-input-group">
			<uni-forms ref="baseForm" :modelValue="formData" label-position="top">
				<uni-forms-item label="姓名" required>
					<uni-easyinput v-model="formData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="年龄" required>
					<uni-easyinput v-model="formData.age" placeholder="请输入年龄" />
				</uni-forms-item>
				<uni-forms-item label="自我介绍">
					<uni-easyinput type="textarea" v-model="formData.introduction" placeholder="请输入自我介绍" />
				</uni-forms-item>
			</uni-forms>
			
			<view class="content-padded">
				<t-button text="保存" type="warning" size="lg" shape="circle" @click="formSubmit"></t-button>
			</view>
			
		</view>
	</view>
</template>

<script>
	var validate = require("@/common/formValidation.js")
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				formData:{},
				editAvatarStatus:false,
			}
		},
		onLoad() {
			//this.loadUserInfo();
		},
		computed: mapState(['avatar', 'hasLogin', 'token', 'info']),
		methods: {
			...mapMutations(['upavatar', 'updateInfo']),
			loadUserInfo(){
				uni.request({
					url: 'v1/users/' + this.info.id,
					success: (res) => {
						if (res.statusCode == 200) {
							const data = res.data.data;
							console.log(res)
							this.formData = data;
							this.formData.introduction = data.profile.introduction;
							this.formData.tips = '点击编辑'
						}
					}
				})
			},
			formSubmit: function(e) {
				uni.hideKeyboard();
				let rules = [{
					name: "username",
					rule: ["required", "minLength:2", "maxLength:20"],
					msg: ["请输入姓名", "姓名至少两个字符", "姓名最多20个字符"]
				},{
					name: "company",
					rule: ["required", "minLength:2", "maxLength:100"],
					msg: ["请输入公司名称", "公司名称至少两个字符", "公司名称最多100个字符"]
				},{
					name: "job",
					rule: ["required", "minLength:2", "maxLength:20"],
					msg: ["请输入职务", "职务至少两个字符", "职务最多20个字符"]
				}];
				//进行表单检查
				let checkRes = validate.validation(this.formData, rules);
				if (!checkRes) {
					uni.showLoading({
						title: '保存中'
					});
					uni.request({
						url: 'v1/users/'+this.info.id,
						method: 'PUT',
						data: this.formData,
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: (res) => {
							uni.hideLoading();
							if (res.statusCode == 200) {
								if(res.data.data.status==1){
									let userInfo = {
										id:this.info.id,
										groupid:this.info.groupid,
										username:this.formData.username,
										avatar:this.formData.avatar
									};
									this.updateInfo(userInfo)
									uni.showToast({
									    title: '保存成功',
									    duration: 2000
									});
									
								}else{
									uni.showToast({
										icon:'none',
									    title: res.data.msg,
									});
								}
							}
						},
						fail: () => {
							uni.hideLoading();
							uni.showToast({
								icon:'error',
							    title: "修改失败",
							});
						}
					});
				} else {
					uni.showToast({
						icon:'none',
					    title: checkRes
					});
				}
				return false;
			},
		}
	}
</script>

<style>
	.profile-input-group{
		flex-direction: column;
		width: 750rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 60rpx;
	}
	.content-padded{
		padding: 30rpx 60rpx;
	}

</style>
