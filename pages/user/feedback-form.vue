<template>
	<view class="profile-input-group">
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-position="top" label-width="100%">
			<uni-forms-item label="投诉原因" name="type" required>
				<uni-data-checkbox v-model="formData.type" :localdata="types"></uni-data-checkbox>
			</uni-forms-item>
			<uni-forms-item label="具体内容" name="content" required>
				<uni-easyinput type="textarea" v-model="formData.content" placeholder="请输入具体内容"></uni-easyinput>
			</uni-forms-item>
			<uni-forms-item label="证据截图" name="images">
				<lun-upload limit="3" :serverUrl="serverUrl" @complete="result" @remove="remove"></lun-upload>
			</uni-forms-item>
		</uni-forms>
		
		<view class="content-padded">
			<t-button text="提交" type="warning" size="lg" shape="circle" @click="formSubmit"></t-button>
		</view>
		
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				serverUrl: "v1/users/feedback-upload",
				value:[], //初始化图片
				formData:{
					module: 0,
					content_id: 0,
					type: '',
					content: '',
					images: [],
				},
				types: [{
					text: '虚假内容信息',
					value: '虚假内容信息'
				}, {
					text: '侵权',
					value: '侵权'
				}, {
					text: '骚扰、谩骂',
					value: '骚扰、谩骂'
				}, {
					text: '色情',
					value: '色情'
				}, {
					text: '其他',
					value: '其他'
				}],
				rules: {
					type: {
						rules: [{
							required: true,
							errorMessage: '请选择投诉原因'
						}]
					},
					content: {
						rules: [{
							required: true,
							errorMessage: '请输入具体原因'
						}]
					},
				},
			}
		},
		onLoad(e) {
			this.formData.module = e.module
			this.formData.content_id = e.id
		},
		methods: {
			result: function(e) {
				console.log(e)
				this.formData.images = e.imgArr;
			},
			remove: function(e) {
				//移除图片
				console.log(e)
				let index = e.index
			},
			formSubmit() {
				if(!this.formData.module){
					uni.showToast({
						icon:'error',
					    title: "参数错误",
					});
					return false
				}
				this.$refs.valiForm.validate().then(result => {
					uni.showLoading({
						title: '提交中'
					});
					uni.request({
						url: 'v1/users/feedback-create',
						method: 'POST',
						data: this.formData,
						success: (res) => {
							uni.hideLoading();
							console.log(res)
							if(res.data.code == 200){
								setTimeout(()=>{
									uni.navigateBack({
									    delta: 1
									})
								}, 2000)
								uni.showToast({
								    title: '提交成功',
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
							    title: "提交失败",
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
