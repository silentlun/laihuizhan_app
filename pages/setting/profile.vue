<template>
	<view class="profile-input-group">
		<view class="header-avater">
			<user-avatar :avatar="avatar" size="lg" @click="editAvatar"></user-avatar>
			<text class="header-avater-text" @click="editAvatar">点击编辑头像</text>
		</view>
		
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData">
			<uni-forms-item label="昵称" name="nickname" required>
				<uni-easyinput v-model="formData.nickname" placeholder="昵称" :clearable="false" />
			</uni-forms-item>
			<uni-forms-item label="性别" name="gender">
				<uni-data-checkbox v-model="formData.gender" :localdata="genders"></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item label="身份" name="shenfen">
				<uni-data-checkbox v-model="formData.shenfen" :localdata="shenfens"></uni-data-checkbox>
			</uni-forms-item>
		</uni-forms>
		
		<view class="content-padded">
			<t-button text="保存" type="warning" size="lg" shape="circle" @click="formSubmit"></t-button>
		</view>
		
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				formData:{},
				editAvatarStatus:false,
				genders: [{
					text: '先生',
					value: '先生'
				}, {
					text: '女士',
					value: '女士'
				}, {
					text: '保密',
					value: '保密'
				}],
				shenfens: [{
					text: '参展商',
					value: 1
				}, {
					text: '服务商',
					value: 2
				}, {
					text: '举办机构',
					value: 3
				}, {
					text: '其他',
					value: 4
				}],
				rules: {
					nickname: {
						rules: [{
							required: true,
							maximum: 20,
							minimum: 2,
							errorMessage: '昵称不能为空'
							
						},{
							validateFunction: (rule, value, data, callback) => {
								return new Promise((resolve, reject) => {
									if(value.length > 1 && value.length < 20){
										resolve()
									}else{
										reject(new Error('昵称长度必须介于2至20个字符之间'))
									}
								})
							}
						}]
					},
				},
			}
		},
		onLoad() {
			this.loadUserInfo();
		},
		computed: mapState(['avatar', 'hasLogin', 'token', 'info']),
		methods: {
			...mapMutations(['upavatar', 'updateInfo']),
			loadUserInfo(){
				uni.request({
					url: 'v1/users/' + this.info.id,
					success: (res) => {
						const data = res.data;
						console.log(res)
						this.formData = data;
					}
				})
			},
			formSubmit: function(e) {
				uni.hideKeyboard();
				this.$refs.valiForm.validate().then(result => {
					console.log('success', result);
					uni.showLoading({
						title: '保存中'
					});
					uni.request({
						url: 'v1/users/'+this.info.id,
						method: 'PUT',
						data: this.formData,
						success: (res) => {
							uni.hideLoading();
							if(res.data.code == 200){
								this.updateInfo(this.formData)
								uni.showToast({
								    title: '保存成功',
								    duration: 2000
								});
								
							}else{
								uni.showToast({
									icon:'none',
								    title: res.data.message,
								});
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
				}).catch(err => {
					console.log('err', err);
				})
				
			},
			
			editAvatar() {
				/* uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						const tempFilePaths = res.tempFilePaths[0];
						uni.navigateTo({
							url: 'avatar?picurl='+tempFilePaths
						});
					}
				}); */
				uni.chooseMedia({
					mediaType: ['image'],
					sourceType: ['album', 'camera'],
					sizeType: "compressed",
					count: 1,
					success: (res) => {
						let sourceImageUrl = res.tempFiles[0].tempFilePath
						uni.navigateTo({
							url: 'avatar?picurl='+sourceImageUrl
						});
					}
				})
			},
		},
		onBackPress(){
			if(this.editAvatarStatus){
				uni.$emit('upAvatar', {
					avatar: this.avatar
				})
			}
			
		}
	}
</script>

<style>
	.profile-input-group{
		display: flex;
		flex-direction: column;
		width: 750rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 60rpx;
	}
	.header-avater{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 60rpx;
	}
	.header-avater-text{
		font-size: 24rpx;
		color: #777;
	}
</style>