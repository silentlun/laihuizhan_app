<template>
	<view>
		<!-- <uni-list>
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
		</uni-list> -->
		<uni-forms ref="valiForm" :rules="rules" :modelValue="formData" label-width="70px" border>
			<uni-group margin-top="20">
				<template v-slot:title>
					<lun-section title="投保人信息"></lun-section>
				</template>
				<uni-forms-item label="投保企业名称" name="nickname" label-width="100px">
					<view class="custom-input" @click="onCompany('toubao')">
						<text class="custom-input-text" :class="{'custom-input-placeholder':formData.invoice_title == ''}">{{formData.insure_name || '请选择'}}</text>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
				<uni-forms-item label="营业执照图片" name="nickname" label-width="100px">
					<view class="form-img">
						<lun-upload limit="1" width="120" height="120" :serverUrl="serverUrl" @complete="result" @remove="remove"></lun-upload>
					</view>
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" name="shenfen" label-width="100px">
					<view class="form-select">
						<picker @change="bindPickerChange" :value="typeIndex" range-key="text" :range="types">
							<view class="uni-input">{{types[typeIndex].text}}</view>
						</picker>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<lun-section title="会展活动信息">
						<template v-slot:right>
							<t-button text="快速导入" type="warning" size="sm" @click="formSubmit"></t-button>
						</template>
					</lun-section>
				</template>
				<uni-forms-item label="活动名称" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="举办城市" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="举办场地" name="shenfen">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="举办地址" name="shenfen">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="保险开始日期" name="shenfen" label-width="100px">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="single" :border="false" />
				</uni-forms-item>
				<uni-forms-item label="保险截止日期" name="shenfen" label-width="100px">
					<uni-datetime-picker type="date" :clear-icon="false" v-model="single" :border="false" />
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<lun-section title="展位信息"></lun-section>
			<uni-group v-for="(item,index) in dynamicLists" :key="index" :title="standName(index)" top="0">
				<uni-forms-item label="展位类型" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="展位号" name="nickname">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="面积(平米)" name="shenfen" label-width="90px">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item :label="typeLabel" name="shenfen" label-width="90px">
					<uni-easyinput v-model="formData.nickname" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
			</uni-group>
			<uni-forms-item v-if="typeIndex == 1">
				<view class="custom-input custom-input-center">
					<t-button text="添加展位" type="warning" size="sm" @click="onAdd"></t-button>
				</view>
			</uni-forms-item>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<t-section title="发票信息"></t-section>
				</template>
				<uni-forms-item label="发票类型" name="shenfen">
					<view class="form-select">
						<picker @change="bindFpChange" :value="fpIndex" range-key="text" :range="fpTypes">
							<view class="uni-input">{{fpTypes[fpIndex].text}}</view>
						</picker>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
				<uni-forms-item label="地区" name="shenfen">
					<view class="form-select">
						<picker mode="region" @change="bindRegionChange" :value="region">
						    <view class="picker">
						      当前选择：{{region[0]}}-{{region[1]}}-{{region[2]}}
						    </view>
						  </picker>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
				
				<uni-forms-item label="发票抬头" name="nickname">
					<view class="custom-input" @click="onCompany('fapiao')">
						<text class="custom-input-text" :class="{'custom-input-placeholder':!formData.invoice_title}">{{formData.invoice_title || '请选择'}}</text>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<t-section title="联系人"></t-section>
				</template>
				<uni-forms-item label="联系人" name="username">
					<uni-easyinput v-model="formData.username" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="手机号码" name="mobile">
					<uni-easyinput v-model="formData.mobile" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="电子邮箱" name="email">
					<uni-easyinput v-model="formData.email" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
			</uni-group>
		</uni-forms>
		<lun-gap height="40" bgColor="#f8f8f9"></lun-gap>
		<lun-footer>
			<view class="foot-order">
				<view class="foot-order-price">
					<text class="foot-order-price-prefix">￥</text>
					<text class="foot-order-price-num">4000</text>
				</view>
				<view class="foot-order-btn">
					<text class="foot-order-btn-text">立即投保</text>
				</view>
				
			</view>
		</lun-footer>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				region: ['广东省', '广州市', '海珠区'],
				single:'',
				qyIndex: 0,
				
				formData:{
					insure_name:'',
					insure_code:'',
					insure_file:'',
					insure_type:1,
					events:{},
					stands:{},
					invoice_type:1,
					invoice_title:'',
					invoice_code:'',
					invoice_address:'',
					invoice_tel:'',
					invoice_bankname:'',
					invoice_bankcode:'',
					username:'',
					mobile:'',
					email:'',
					total_fee:0,
				},
				typeIndex: 0,
				typeName: '参展商',
				typeLabel: '搭建商名称',
				types: [{
					text: '参展商',
					value: 1,
					label: '搭建商名称'
				}, {
					text: '搭建商',
					value: 2,
					label: '参展商名称'
				}],
				fpIndex: 0,
				fpTypes: [{
					text: '普通发票',
					value: 1
				}, {
					text: '专用发票',
					value: 2
				}],
				dynamicLists: [],
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
		onLoad(e) {
			this.dynamicLists.push({
				id: Date.now()
			})
			uni.$on('toubao', (data) => {
				this.formData.insure_name = data.title
				this.formData.insure_code = data.code
				console.log(this.formData)
			})
			uni.$on('fapiao', (data) => {
				this.formData.invoice_title = data.title
				this.formData.invoice_code = data.code
			})
		},
		onUnload() {
			uni.$off('toubao')
			uni.$off('fapiao')
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
				this.typeIndex = e.detail.value
				this.typeLabel = this.types[this.typeIndex].label
				this.formData.insure_type = this.types[this.typeIndex].value
			},
			bindFpChange: function(e){
				this.fpIndex = e.detail.value
				this.formData.invoice_type = this.fpTypes[this.fpIndex].value
			},
			onAdd() {
				this.dynamicLists.push({
					id: Date.now()
				})
			},
			standName(index){
				if(this.typeIndex == 1){
					return '展位' + (Number(index)+1)
				}
				return null
			},
			onCompany(type){
				uni.navigateTo({
					url: "/pages/user/company/company?type="+type
				})
			},
		}
	}
</script>

<style>
	.form-list{
		padding: 0 30rpx;
	}
	.form-img{
		padding: 10rpx 0;
	}
	.form-select{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
	}
	.custom-input{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 72rpx;
	}
	.custom-input-center{
		justify-content: center;
	}
	.custom-input-text{
		font-size: 28rpx;
		color: #000;
		flex: 1;
	}
	.custom-input-placeholder {
		color: #999;
		font-size: 28rpx;
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
	
	.foot-order{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: 100rpx;
	}
	.foot-order-price{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 30rpx;
	}
	.foot-order-price-prefix{
		font-size: 24rpx;
		color: #F01625;
	}
	.foot-order-price-num{
		font-size: 36rpx;
		color: #F01625;
		font-weight: 700;
	}
	.foot-order-btn{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #F01625;
	}
	.foot-order-btn-text{
		font-size: 32rpx;
		color: #fff;
		padding: 10rpx 60rpx;
	}

</style>
