<template>
	<view>
		<uni-forms ref="valiForm" label-width="70px" border>
			<uni-group margin-top="20">
				<template v-slot:title>
					<lun-section title="投保人信息"></lun-section>
				</template>
				<uni-forms-item label="投保企业名称" label-width="100px">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.insure_name}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="统一社会信用码" label-width="110px">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.insure_code}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="营业执照图片" label-width="100px">
					<view class="form-select">
						<image src="../../../static/21.jpg" class="form-img"></image>
					</view>
				</uni-forms-item>
				<uni-forms-item label="投保企业类型" label-width="100px">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.insure_type}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="投保金额" label-width="100px">
					<view class="custom-input">
						<text class="custom-input-text">￥{{formData.total_fee}}</text>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<lun-section title="会展活动信息">
					</lun-section>
				</template>
				<uni-forms-item label="活动名称">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.events.title}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="举办城市">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.events.city}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="举办场地">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.events.venue}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="举办地址">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.events.address}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="保险开始日期" label-width="100px">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.start_date}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="保险截止日期" label-width="100px">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.end_date}}</text>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<lun-section title="展位信息"></lun-section>
			<uni-group v-for="(item,index) in formData.stands" :key="index" :title="standName(index)" top="0">
				<uni-forms-item label="展位类型" name="nickname">
					<view class="custom-input">
						<text class="custom-input-text">{{item.type}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="展位号" name="nickname">
					<view class="custom-input">
						<text class="custom-input-text">{{item.code}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="面积(平米)" label-width="90px">
					<view class="custom-input">
						<text class="custom-input-text">{{item.area}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item :label="typeLabel" label-width="90px">
					<view class="custom-input">
						<text class="custom-input-text">{{item.name}}</text>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<lun-section title="发票信息"></lun-section>
				</template>
				<uni-forms-item label="发票类型">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.invoice_type}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="发票抬头">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.invoice_title}}</text>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
			<uni-group top="0">
				<template v-slot:title>
					<lun-section title="联系人"></lun-section>
				</template>
				<uni-forms-item label="联系人姓名" name="username" label-width="90px">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.username}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="联系人手机" name="mobile" label-width="90px">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.mobile}}</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="电子邮箱" name="email">
					<view class="custom-input">
						<text class="custom-input-text">{{formData.email}}</text>
					</view>
				</uni-forms-item>
			</uni-group>
			<lun-gap height="20" bgColor="#f8f8f9"></lun-gap>
		</uni-forms>
		
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				formData:{
					insure_name:'',
					insure_code:'',
					insure_file:'',
					insure_type:1,
					events:{},
					start_date:'',
					end_date:'',
					stands:[{type: '', code:'',area:'',name:''}],
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
			}
		},
		onLoad(e) {
			// 目前在某些平台参数会被主动 decode，暂时这样处理。
			try {
				this.formData = JSON.parse(decodeURIComponent(e.detail));
			} catch (error) {
				this.formData = JSON.parse(e.detail);
			}
		},
		methods: {
			formSubmit: function(e) {
				console.log(JSON.stringify(this.formData))
				return false
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
			},
			standName(index){
				if(this.formData.insure_type == 2){
					return '展位' + (Number(index)+1)
				}
				return null
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
		width: 120rpx;
		height: 120rpx;
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
		justify-content: flex-end;
		align-items: center;
		height: 72rpx;
	}
	.custom-input-center{
		justify-content: center;
	}
	.custom-input-text{
		font-size: 28rpx;
		color: #000;
		text-align: right;
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
