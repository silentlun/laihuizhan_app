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
						<text class="custom-input-text" :class="{'custom-input-placeholder':insureNameLength == 0}">{{formData.insure_name || '请选择'}}</text>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
				<uni-forms-item label="营业执照图片" name="nickname" label-width="100px">
					<view class="form-img">
						<lun-upload limit="1" width="120" height="120" :serverUrl="serverUrl" @complete="result" ></lun-upload>
					</view>
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" name="shenfen" label-width="100px">
					<view class="form-select">
						<picker @change="bindPickerChange" :value="typeIndex" range-key="text" :range="types">
							<view class="custom-input-text">{{types[typeIndex].text}}</view>
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
							<t-button text="快速导入信息" type="warning" size="sm" @click="onEvent"></t-button>
						</template>
					</lun-section>
				</template>
				<uni-forms-item label="活动名称" name="nickname">
					<uni-easyinput v-model="formData.events.title" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="举办城市" name="nickname">
					<uni-easyinput v-model="formData.events.city" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="举办场地" name="shenfen">
					<uni-easyinput v-model="formData.events.venue" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="举办地址" name="shenfen">
					<uni-easyinput v-model="formData.events.address" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="保险开始日期" name="shenfen" label-width="100px">
					<picker mode="date" :value="formData.start_date" :start="startDate" :end="endDate" @change="bindStartDateChange">
						<view class="custom-input">
							<uni-icons type="calendar" size="20" color="#999"></uni-icons>
							<text class="custom-input-date" :class="{'custom-input-placeholder':formData.start_date == ''}">{{formData.start_date || '选择日期'}}</text>
							
						</view>
					</picker>
				</uni-forms-item>
				<uni-forms-item label="保险截止日期" name="shenfen" label-width="100px">
					<picker mode="date" :value="formData.end_date" :start="startDate" :end="endDate" @change="bindEndDateChange">
						<view class="custom-input">
							<uni-icons type="calendar" size="20" color="#999"></uni-icons>
							<text class="custom-input-date" :class="{'custom-input-placeholder':formData.end_date == ''}">{{formData.end_date || '选择日期'}}</text>
							
						</view>
					</picker>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<lun-section title="展位信息"></lun-section>
			<uni-group v-for="(item,index) in dynamicLists" :key="index" :title="standName(index)" top="0">
				<uni-forms-item label="展位类型" name="nickname">
					<uni-data-checkbox mode="tag" v-model="formData.stands[index].type" :localdata="zwTypes"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="展位号" name="nickname">
					<uni-easyinput v-model="formData.stands[index].code" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="面积(平米)" name="shenfen" label-width="90px">
					<uni-easyinput v-model="formData.stands[index].area" @input="calcPrice" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item :label="typeLabel" name="shenfen" label-width="90px">
					<uni-easyinput v-model="formData.stands[index].name" placeholder="请输入内容" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
			</uni-group>
			<uni-forms-item v-if="typeIndex == 1">
				<view class="custom-input custom-input-center">
					<t-button text="添加展位" type="warning" size="md" @click="onAdd"></t-button>
				</view>
			</uni-forms-item>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<lun-section title="发票信息"></lun-section>
				</template>
				<uni-forms-item label="发票类型" name="shenfen">
					<view class="form-select">
						<picker @change="bindFpChange" :value="fpIndex" range-key="text" :range="fpTypes">
							<view class="custom-input-text">{{fpTypes[fpIndex].text}}</view>
						</picker>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
				<uni-forms-item label="发票抬头" name="nickname">
					<view class="custom-input" @click="onCompany('fapiao')">
						<text class="custom-input-text" :class="{'custom-input-placeholder':invoiceTitleLength == 0}">{{formData.invoice_title || '请选择'}}</text>
						<uni-icons type="right"></uni-icons>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<lun-section title="联系人"></lun-section>
				</template>
				<uni-forms-item label="联系人姓名" name="username" label-width="90px">
					<uni-easyinput v-model="formData.username" placeholder="请输入姓名" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="联系人手机" name="mobile" label-width="90px">
					<uni-easyinput v-model="formData.mobile" placeholder="请输入手机号" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="电子邮箱" name="email">
					<uni-easyinput v-model="formData.email" placeholder="请输入邮箱" :clearable="false" :inputBorder="false" />
				</uni-forms-item>
			</uni-group>
		</uni-forms>
		<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
		<lun-footer>
			<view class="foot-order">
				<view class="foot-order-price">
					<text class="foot-order-price-prefix">￥</text>
					<text class="foot-order-price-num">{{formData.total_fee}}</text>
				</view>
				<view class="foot-order-btn" @click="formSubmit">
					<text class="foot-order-btn-text">立即投保</text>
				</view>
				
			</view>
		</lun-footer>
	</view>
</template>

<script>
	var validate = require("@/common/formValidation.js")
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				serverUrl: "v1/users/feedback-upload",
				date: '',
				formData:{
					insure_name:'',
					insure_code:'',
					insure_file:'',
					insure_type:'参展商',
					//events:{title:'',city:'',venue:'',address:''},
					events:{},
					start_date:'',
					end_date:'',
					stands:[{type: '', code:'',area:'',name:''}],
					invoice_type:'普通发票',
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
				zwTypes: [{
					text: '室内',
					value: '室内'
				}, {
					text: '室外',
					value: '室外'
				}],
				dynamicLists: [],
			}
		},
		onLoad(e) {
			uni.request({
				url: "v1/users/userinfo",
				success: (res) => {
					let userInfo = res.data.userInfo
					this.formData.mobile = userInfo.mobile
					this.formData.email = userInfo.email
				}
			})
			this.dynamicLists.push({
				id: Date.now()
			})
			//this.formData.stands.push(this.stand)
			uni.$on('toubao', (data) => {
				this.formData.insure_name = data.title
				this.formData.insure_code = data.code
			})
			uni.$on('fapiao', (data) => {
				this.formData.invoice_title = data.title
				this.formData.invoice_code = data.code
			})
			uni.$on('huodong', (data) => {
				this.formData.events = data
				this.formData.start_date = data.startDate
				this.formData.end_date = data.endDate
			})
		},
		onUnload() {
			uni.$off()
		},
		computed:{
			...mapState(['avatar', 'hasLogin', 'token', 'info']),
			insureNameLength() {
				return this.formData.insure_name.length
			},
			invoiceTitleLength(){
				return this.formData.invoice_title.length
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				if (type === 'start') {
					year = year;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			formSubmit: function(e) {
				/* let events = this.formData.events
				for (const key in events){
					if(!events[key] && key == 'title'){
						uni.showToast({
							icon:'none',
						    title: '请输入活动名称'
						})
						return false
					}
					if(!events[key] && key == 'city'){
						uni.showToast({
							icon:'none',
						    title: '请输入举办城市'
						})
						return false
					}
				}
				console.log('success')
				return false */
				let rules = [{
					name: "insure_name",
					rule: ["required"],
					msg: ["请输入投保人信息"]
				}/* ,{
					name: "insure_file",
					rule: ["required"],
					msg: ["请上传营业执照"]
				} */,{
					name: "start_date",
					rule: ["required"],
					msg: ["请输入保单开始日期"]
				},{
					name: "end_date",
					rule: ["required"],
					msg: ["请输入保单截止日期"]
				},{
					name: "invoice_title",
					rule: ["required"],
					msg: ["请输入发票抬头"]
				},{
					name: "username",
					rule: ["required"],
					msg: ["请输入联系人姓名"]
				},{
					name: "mobile",
					rule: ["required"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				},{
					name: "email",
					rule: ["required"],
					msg: ["请输入电子邮箱", "请输入正确的邮箱"]
				}];
				//进行表单检查
				let checkRes = validate.validation(this.formData, rules);
				if (!checkRes) {
					let events = this.formData.events
					if(events.length < 4){
						uni.showToast({
							icon:'none',
						    title: '请输入活动信息'
						})
						return false
					}
					/* if(!events.title){
						uni.showToast({
							icon:'none',
						    title: '请输入活动名称'
						})
						return false
					} */
					uni.navigateTo({
						url: "./view?detail=" + encodeURIComponent(JSON.stringify(this.formData))
					})
				} else {
					uni.showToast({
						icon:'none',
					    title: checkRes
					});
				}
				
			},
			bindPickerChange: function(e) {
				this.typeIndex = e.detail.value
				this.typeLabel = this.types[this.typeIndex].label
				this.formData.insure_type = this.types[this.typeIndex].text
			},
			bindFpChange: function(e){
				this.fpIndex = e.detail.value
				this.formData.invoice_type = this.fpTypes[this.fpIndex].text
			},
			bindStartDateChange: function(e) {
				this.formData.start_date = e.detail.value
			},
			bindEndDateChange: function(e) {
				this.formData.end_date = e.detail.value
			},
			calcPrice: function(e){
				console.log('输入内容：', e);
				this.formData.total_fee = e
			},
			onAdd() {
				this.dynamicLists.push({
					id: Date.now()
				})
				this.formData.stands.push({type: '', code:'',area:'',name:''})
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
			onEvent(type){
				uni.navigateTo({
					url: "./event"
				})
			},
			result: function(e) {
				console.log(e)
				this.formData.insure_file = e.imgArr;
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
	.custom-input-date{
		font-size: 28rpx;
		color: #000;
		flex: 1;
		padding: 0 16rpx;
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
		font-size: 28rpx;
		color: #F01625;
	}
	.foot-order-price-num{
		font-size: 48rpx;
		color: #F01625;
		font-weight: 700;
		line-height: 1;
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
		padding: 10rpx 80rpx;
	}

</style>
