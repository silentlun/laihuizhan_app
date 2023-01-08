<template>
	<view class="tabs">
		<view class="user-section">
			<view class="user-header">
				<view class="user-info-box">
					<view class="avatar-box">
						<image class="avatar" :src="data.logo"></image>
					</view>
					<view class="info-box">
						<text class="username">{{data.title}}</text>
						<text class="groupname">{{data.category.catname}}</text>
					</view>
				</view>
				
			</view>
			<view class="header-tabs-box">
				<view class="follow-tabs">
					<view class="follow-tabs-item">
						<text class="item-label">热度</text>
						<text class="item-num">{{data.views}}</text>
					</view>
					<view class="follow-tabs-item">
						<text class="item-label">粉丝数</text>
						<text class="item-num">{{followCount}}</text>
					</view>
				</view>
				<view class="feedback-box" @click="onFeedback">
					<uni-icons type="notification" color="#fff" size="16"></uni-icons><text class="feedback-text">投诉</text>
				</view>
				<!-- <view class="btn-tabs">
					<text class="btn"><t-icons type="settings" color="#fff" size="12"></t-icons> 投诉</text>
					<text class="btn"><t-icons type="settings" color="#fff" size="12"></t-icons> 关注</text>
				</view> -->
			</view>
			
		</view>
		<!-- <view class="page-warp merchant-warp">
			<view class="feedback-box" @click="onFeedback">
				<uni-icons type="notification" color="#777" size="16"></uni-icons><text class="feedback-text">投诉</text>
			</view>
		</view> -->
		<!-- <t-list>
			<t-list-item :subtitle="'北京市朝阳区的说法发随叫随到发'" :showArrow="true"></t-list-item>
		</t-list> -->
		<view class="merchant-warp">
		<t-section title="服务商简介"></t-section>
		<view class="page-warp">
			<!-- <view class="tabs">
			<tui-tabs :tabs="navbar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
			</view> -->
			
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
		</view>
		</view>
		<t-section title="服务案例"></t-section>
		<t-list>
			<t-list-cell v-for="(item, index) in dataList" :key="index">
				<view class="case-media" @click="showDetail(item)">
					<image class="case-media-img" :src="item.thumb"></image>
					<view class="case-media-body">
						<text class="case-media-title">{{item.title}}</text>
					</view>
				</view>
			</t-list-cell>
		</t-list>
		
		<lun-footer>
			<lun-footer-nav :active="isFollow" @favClick="onFollow" @buttonClick="toContact"></lun-footer-nav>
		</lun-footer>
	</view>
</template>

<script>
	var content = `
						<p>【区域与行业】</p><p>① 11月7日，国家发展改革委发布《关于进一步完善政策环境加大力度支持民间投资发展的意见》，鼓励民间资本积极参与国家创新平台建设，支持民营企业承担国家重大科技战略任务，鼓励平台企业加快人工智能、云计算、区块链、操作系统、处理器等领域重点项目建设。（国家发改委官微）</p><p>② 据北京市公共资源交易平台消息，近日，北京市延庆区市级重点区域和跨区域自然资源统一确权登记项目公开招标，预算金额为903.250164万元。</p><p>③ 近日，江苏省自然资源厅出台《关于加快推进国土空间规划编制工作的通知》。《通知》明确了市县国土空间总体规划、详细规划、村庄规划、专项规划和规划“一张图”系统建设的近期工作要求。（江苏省自然资源厅）</p><p>④ 据中国政府采购网消息，11月7日，九江市德安县智慧城市项目（一期）公开招标，预算金额为2600万元。本项目不接受联合体投标。</p><p>【公司要闻】</p><p>① 近日，据财联社消息，北汽新能源股份有限公司副总经理、极狐汽车总裁王秋凤确实已因个人原因辞职。截止目前，北汽集团方面没有（北汽蓝谷管理层调整）官方消息披露。</p><p>② 近日，在2022云栖大会自然资源分论坛上，<a href="/company/1" target="_blank" class="keylink">阿里云</a>联合<a href="/company/84" target="_blank" class="keylink">超图软件</a>发布数字孪生空间联合解决方案，帮助客户低成本高效率的构建数字孪生空间，并有效支撑各类孪生应用。</p><p>③ 11月7日消息，自今年上半年起，阿里不断被传出计划让平头哥对外融资的消息。面对团队流失严重的问题，<a href="/company/1" target="_blank" class="keylink">阿里云</a>智能总裁张建锋称，会考虑一些对策，保持平头哥独立融资的可能性。（鞭牛士）</p><p>④ 据中国政府采购网消息，11月7日，四川省减灾中心第一次全国自然灾害综合风险普查评估与区划服务项目中标结果发布，中标供应商为<a href="/company/315" target="_blank" class="keylink">航天宏图</a>信息技术股份有限公司，中标金额为1013万元。</p><p>【资本与采购】</p><p>① 近日，北京理工导航控制科技股份有限公司与<a href="/company/4" target="_blank" class="keylink">苍穹数码</a>技术股份有限公司举行战略合作签约仪式。双方此次是资本层面的合作，理工导航成为<a href="/company/4" target="_blank" class="keylink">苍穹数码</a>的战略股东，开启了<a href="/company/4" target="_blank" class="keylink">苍穹数码</a>股权结构调整的序幕。</p><p>② 11月7日，<a href="/company/1030" target="_blank" class="keylink">小冰</a>公司宣布近日已完成总额10亿元规模的新融资，用于加速AI Being<a href="/company/1030" target="_blank" class="keylink">小冰</a>框架技术研发，推动数字员工普及。（新华网）</p>						
	
					`;
	import { mapState,mapMutations } from 'vuex'
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				id:0,
				data:{},
				followCount: 0,
				navbar: [{
					name: "服务商简介"
				}, {
					name: "服务案例"
				}],
				currentTab: 0,
				htmlNodes: [],
				dataList: [
					{id:1, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:2, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:3, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'},
					{id:4, title: '方式方法是否萨达是发达', thumb: '/static/23.jpg', start_date:'2022-11-11', end_date:'2022-11-11', venue:'国家展览馆'}
				],
				isFollow: false
			}
		},
		onLoad(e) {
			this.id = e.id
			this.loadDetail()
			this.loadFavoriteStatus()
			//this.htmlNodes = htmlParser(content);
		},
		computed: mapState(['hasLogin']),
		methods: {
			loadDetail(){
				uni.request({
					url: 'v1/merchants/' + this.id,
					success: (res) => {
						const data = res.data.detail;
						console.log(res)
						this.data = data;
						let content = data.content.replace(/\<p/gi, '<p class="ep"');
						this.htmlNodes = htmlParser(content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '));
						
					}
				})
			},
			loadFavoriteStatus(){
				uni.request({
					url: 'v1/users/favorite-status',
					data: {module: 1, id:this.id},
					success: (res) => {
						this.followCount = res.data.followCount
						this.isFollow = res.data.isFollow
					}
				})
			},
			toContact(){
				if(!this.hasLogin){
					uni.showModal({
						content: '请先登录账号',
						confirmText:'立即登录',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({url: '/pages/main/login'});
							}
						}
					});
					return false
				}
				uni.makePhoneCall({
					phoneNumber: this.data.sale_mobile
				});
			},
			change(e) {
				this.currentTab = e.index
			},
			onFollow(){
				if(!this.hasLogin){
					uni.showModal({
						content: '请先登录账号',
						confirmText:'立即登录',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({url: '/pages/main/login'});
							}
						}
					});
					return false
				}
				let formData = {
					module: 1,
					content_id: this.id,
				}
				uni.request({
					url: "v1/users/favorite-create",
					method: 'POST',
					data: formData,
					success: (res) => {
						console.log(JSON.stringify(res))
						let data = res.data
						if(data.code == 200){
							this.isFollow = !this.isFollow
						}
					},
				})
			},
			showDetail: function (e) {
				uni.navigateTo({
					url: "./case-view?id="+e.id
				})
			},
			onFeedback(){
				if(this.hasLogin){
					uni.navigateTo({
						url: '/pages/user/feedback-form?module=1&id='+this.id
					});
				}else{
					uni.showModal({
						content: '请先登录账号',
						confirmText:'立即登录',
						success: function (res) {
							if (res.confirm) {
								uni.navigateTo({url: '/pages/main/login'});
							}
						}
					});
				}
			},
		},
		onShareAppMessage(){
			return {
				title: this.data.title,
				path: '/pages/merchant/view?id='+this.id,
			}
		},
		onShareTimeline(){
		}
	}
</script>

<style>
.user-section{
	display: flex;
	flex-direction: column;
	background-image: linear-gradient(45deg, #FF7510, #EF6600);
	width: 750rpx;
	padding: 50rpx 30rpx 50rpx 30rpx;
	
}
.user-header{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.user-info-box{
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	
}
.avatar{
	width: 120rpx;
	height: 120rpx;
	border-radius: 100rpx;
	margin-right: 20rpx;
}
.info-box{
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.username{
	font-size: 36rpx;
	color: #FFFFFF;
	font-weight: 500;
	margin-bottom: 10rpx;
}
.groupname{
	font-size: 24rpx;
	color: #FFFFFF;
	background-color: rgba(255,255,255,0.15);
	padding: 6rpx 30rpx;
	border-radius: 45rpx;
	flex: 1;
}
.header-tabs-box{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 30rpx;
}
.follow-tabs{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	
}
.follow-tabs-item{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-left: 30rpx;
	margin-right: 30rpx;
}
.follow-tabs-item .item-num{
	font-size: 24rpx;
	font-weight: 500;
	color: #fff;
}
.follow-tabs-item .item-label{
	font-size: 20rpx;
	color: #fff;
	margin-right: 10rpx;
}
.merchant-warp{
	background-color: #fff;
	border-radius: 20rpx;
	margin-top: -20rpx;
	padding-top: 30rpx;
	margin-bottom: 20px;
}
.feedback-box{
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
}
.feedback-text{
	font-size: 24rpx;
	color: #fff;
}
.tabs{
	position: sticky;
	top: var(--window-top);
	z-index: 100;
}
.btn{
	font-size: 24rpx;
	background-color: #007aff;
	border-radius: 60rpx;
	padding: 4rpx 20rpx;
}
.detail-content{
	margin-bottom: 40rpx;
}

	.case-media {
        width: 750rpx;
        padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
    }

	.case-media-img {
		width: 240rpx;
		height: 150rpx;
		margin-right: 20rpx;
		border-radius: 2px;
	}
	.case-media-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		flex: 1;
		
	}
	.case-media-title {
		font-size: 30rpx;
		color: #333;
		line-height: 40rpx;
		text-overflow: ellipsis;
		/* #ifdef APP-NVUE */
		lines: 3;
		/* #endif */
	}
</style>
