<template>
	<view>
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-width="240rpx" border>
			<uni-group margin-top="20">
				<template v-slot:title>
					<t-section title="投保人信息"></t-section>
				</template>
				<uni-forms-item label="投保企业名称" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="投保企业名称" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="统一社会信用码" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="统一社会信用码" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" name="shenfen">
					<uni-data-checkbox v-model="formData.shenfen" :localdata="shenfens"></uni-data-checkbox>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group>
				<template v-slot:title>
					<t-section title="会展活动信息"></t-section>
				</template>
				<uni-forms-item label="投保企业名称" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="投保企业名称" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="统一社会信用码" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="统一社会信用码" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" name="shenfen">
					<uni-data-checkbox v-model="formData.shenfen" :localdata="shenfens"></uni-data-checkbox>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group>
				<template v-slot:title>
					<t-section title="展位信息"></t-section>
				</template>
				<uni-forms-item label="投保企业名称" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="投保企业名称" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="统一社会信用码" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="统一社会信用码" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" name="shenfen">
					<uni-data-checkbox v-model="formData.shenfen" :localdata="shenfens"></uni-data-checkbox>
				</uni-forms-item>
			</uni-group>
			<uni-group>
				<template v-slot:title>
					<t-section title="发票信息"></t-section>
				</template>
				<uni-forms-item label="投保企业名称" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="投保企业名称" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="统一社会信用码" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="统一社会信用码" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" name="shenfen">
					<uni-data-checkbox v-model="formData.shenfen" :localdata="shenfens"></uni-data-checkbox>
				</uni-forms-item>
			</uni-group>
			<uni-group>
				<template v-slot:title>
					<t-section title="联系人"></t-section>
				</template>
				<uni-forms-item label="投保企业名称" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="投保企业名称" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="统一社会信用码" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="统一社会信用码" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" name="shenfen">
					<uni-data-checkbox v-model="formData.shenfen" :localdata="shenfens"></uni-data-checkbox>
				</uni-forms-item>
			</uni-group>
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
				shenfens: [{
					text: '参展商',
					value: 1
				}, {
					text: '服务商',
					value: 2
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
		computed: mapState(['avatar', 'hasLogin', 'token', 'info']),
		methods: {
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
		}
	}
</script>

<style>
	.form-list{
		padding: 0 30rpx;
	}

</style>
