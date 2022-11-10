<template>
	<view class="tabs">
		<view class="user-section">
			<view class="user-header">
				<view class="user-info-box">
					<view class="avatar-box">
						<image class="avatar" :src="info.avatar" @click="authDetail('/pages/user/info')"></image>
					</view>
					<view class="info-box">
						<text class="username">店铺名称电风扇</text>
						<text class="groupname">{{info.groupname}}</text>
					</view>
				</view>
				
			</view>
			<view class="header-tabs-box">
				<view class="follow-tabs">
					<view class="follow-tabs-item">
						<text class="item-label">热度</text>
						<text class="item-num">2314</text>
					</view>
					<view class="follow-tabs-item">
						<text class="item-label">粉丝数</text>
						<text class="item-num">2314</text>
					</view>
				</view>
				<!-- <view class="btn-tabs">
					<text class="btn"><t-icons type="settings" color="#fff" size="12"></t-icons> 投诉</text>
					<text class="btn"><t-icons type="settings" color="#fff" size="12"></t-icons> 关注</text>
				</view> -->
			</view>
			
		</view>
		<view class="page-warp merchant-warp">
			<view class="feedback-box">
				<t-icons type="remind" color="#777" size="16"></t-icons><text class="feedback-text">投诉</text>
			</view>
		</view>
		<!-- <t-list>
			<t-list-item :subtitle="'北京市朝阳区的说法发随叫随到发'" :showArrow="true"></t-list-item>
		</t-list> -->
		
		<view class="page-warp">
			<!-- <view class="tabs">
			<tui-tabs :tabs="navbar" :currentTab="currentTab>1?0:currentTab" @change="change" itemWidth="50%"></tui-tabs>
			</view> -->
			<t-section title="服务商简介"></t-section>
			<view>
				<p>【区域与行业】</p><p>① 11月7日，国家发展改革委发布《关于进一步完善政策环境加大力度支持民间投资发展的意见》，鼓励民间资本积极参与国家创新平台建设，支持民营企业承担国家重大科技战略任务，鼓励平台企业加快人工智能、云计算、区块链、操作系统、处理器等领域重点项目建设。（国家发改委官微）</p>
			</view>
			<t-section title="服务案例"></t-section>
			<t-list>
				<t-list-cell v-for="(item, index) in dataList" :key="index">
					<event-item :data="item" @click="showDetail(item)"></event-item>
				</t-list-cell>
			</t-list>
			
		</view>
		
		<t-footer>
			<t-button text="联系服务商" shape="circle" size="md"></t-button>
		</t-footer>
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
				info:{
					avatar:'/static/user_defalut.jpg',
					groupname: '企业认证',
					amount:0,
					point:0,
					thyd1:0,
					thyd299:0
				},
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
			}
		},
		onLoad(e) {
			this.id = e.id
			//this.loadDetail()
			this.htmlNodes = htmlParser(content);
		},
		computed: mapState(['hasLogin']),
		methods: {
			change(e) {
				this.currentTab = e.index
			},
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
	color: #777;
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

</style>
