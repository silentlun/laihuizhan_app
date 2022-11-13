<template>
	<view class="profile-input-group">
		<user-avatar :data="formData" :avatar="avatar" @click="editAvatar"></user-avatar>
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-position="top" label-width="100%">
			<uni-forms-item label="昵称" name="nickname" required>
				<uni-easyinput v-model="formData.nickname" placeholder="昵称" />
			</uni-forms-item>
			<uni-forms-item label="性别" name="gender">
				<uni-data-checkbox v-model="formData.gender" :localdata="genders"></uni-data-checkbox>
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
				formData:{
					tips: '点击更换',
				},
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
			/* this.loadUserInfo();
			uni.$on('updateAvatar', (data)=>{
				if(data.avatar){
					this.editAvatarStatus = true
					this.formData.avatar = data.avatar;
					this.avatar = data.avatar;
					this.upavatar(data.avatar)
				}
			}) */
		},
		onUnload() {
			uni.$off('updateAvatar')
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
							this.formData.tips = '点击更换'
						}
					}
				})
			},
			formSubmit: function(e) {
				uni.hideKeyboard();
				this.$refs.valiForm.validate().then(res => {
					console.log('success', res);
					uni.showToast({
						title: `校验通过`
					})
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
									    title: res.data.message,
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
				}).catch(err => {
					console.log('err', err);
				})
				
			},
			
			editAvatar() {
				uni.chooseImage({
					sourceType: ["camera", "album"],
					sizeType: "compressed",
					count: 1,
					success: (res) => {
						uni.navigateTo({
							url: 'avatar?picurl='+encodeURIComponent(res.tempFilePaths[0])
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
		flex-direction: column;
		width: 750rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		padding-top: 60rpx;
	}
</style>