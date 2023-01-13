<template>
	<view class="profile-input-group">
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-position="top" label-width="100%">
			<uni-forms-item label="企业名称/发票抬头" name="title" required>
				<uni-easyinput v-model="formData.title" placeholder="企业名称/发票抬头" />
			</uni-forms-item>
			<uni-forms-item label="统一社会信用码/纳税识别码" name="code" required>
				<uni-easyinput v-model="formData.code" placeholder="统一社会信用码/纳税识别码" />
			</uni-forms-item>
			<uni-forms-item label="企业注册地址" name="address" required>
				<uni-easyinput v-model="formData.address" placeholder="企业注册地址" />
			</uni-forms-item>
			<uni-forms-item label="企业注册电话" name="tel" required>
				<uni-easyinput v-model="formData.tel" placeholder="企业注册电话" />
			</uni-forms-item>
			<uni-forms-item label="开户银行" name="bank_name" required>
				<uni-easyinput v-model="formData.bank_name" placeholder="开户银行" />
			</uni-forms-item>
			<uni-forms-item label="账号" name="bank_code" required>
				<uni-easyinput v-model="formData.bank_code" placeholder="账号" />
			</uni-forms-item>
			<uni-forms-item>
				<view class="content-padded">
					<t-button text="保存" type="warning" size="lg" shape="circle" block @click="formSubmit"></t-button>
				</view>
			</uni-forms-item>
		</uni-forms>
		
		
		
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				id: 0,
				formData:{},
				editAvatarStatus:false,
				rules: {
					title: {
						rules: [{
							required: true,
							errorMessage: '企业名称/发票抬头不能为空'
						}]
					},
					code: {
						rules: [{
							required: true,
							errorMessage: '统一社会信用码/纳税识别码不能为空'
						}]
					},
					address: {
						rules: [{
							required: true,
							errorMessage: '企业注册地址不能为空'
						}]
					},
					tel: {
						rules: [{
							required: true,
							errorMessage: '企业注册电话不能为空'
						}]
					},
					bank_name: {
						rules: [{
							required: true,
							errorMessage: '开户行不能为空'
						}]
					},
					bank_code: {
						rules: [{
							required: true,
							errorMessage: '账号不能为空'
						}]
					}
				},
				apiUrl: 'v1/users/company-create',
			}
		},
		onLoad(e) {
			//this.loadUserInfo();
			if(e.id){
				this.id = e.id
				this.loadInfo(e.id)
			}
		},
		computed: mapState(['avatar', 'hasLogin', 'token', 'info']),
		methods: {
			loadInfo(id){
				uni.request({
					url: 'v1/users/company-create',
					data: {id:id},
					success: (res) => {
						this.formData = res.data
					}
				})
			},
			formSubmit() {
				this.$refs.valiForm.validate().then(result => {
					uni.showLoading({
						title: '保存中'
					});
					uni.request({
						url: 'v1/users/company-create?id='+this.id,
						method: 'POST',
						data: this.formData,
						success: (res) => {
							uni.hideLoading(); 
							if(res.data.code == 200){
								uni.$emit('update', {
									status: 200
								})
								setTimeout(()=>{
									uni.navigateBack({
									    delta: 1
									})
								}, 2000)
								uni.showToast({
								    title: res.data.message,
								    duration: 2000,
									icon:'success',
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
