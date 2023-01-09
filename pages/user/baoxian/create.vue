<template>
	<view>
		<uni-list>
			<uni-list-item showArrow>
				<template v-slot:body>
					<text class="slot-box slot-text">投保人</text>
				</template>
				<template v-slot:footer>
					<text class="right-text">北京盛世泰伯网络技术有限公司</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow>
				<template v-slot:body>
					<text class="slot-box slot-text">投保企业类型</text>
				</template>
				<template v-slot:footer>
					<text class="right-text">展商</text>
				</template>
			</uni-list-item>
			<uni-list-item showArrow title="列表文字" rightText="右侧文字" />
		</uni-list>
		
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
				index:0,
				formData:{
					type: 1,
				},
				showType: '参展商',
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
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				let index = e.detail.value;
				this.showType = this.shenfens[index].text
				console.log(this.showType)
			},
		}
	}
</script>

<style>
	.form-list{
		padding: 0 30rpx;
	}
	.form-select{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.body-text{
		font-size: 28rpx;
		color: #666;
	}
	.slot-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.slot-text {
		flex: 1;
		font-size: 28rpx;
		color: #666;
		margin-right: 10px;
	}
	.right-text{
		font-size: 28rpx;
		color: #000;
	}

</style>
