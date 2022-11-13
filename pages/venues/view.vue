<template>
	<view>
		<image class="page-banner" :src="data.thumb" mode="scaleToFill"></image>
		<view class="page-warp">
			<text class="detail-title">{{data.title || ''}}</text>
			<view class="feedback-box">
				<t-icons type="remind" color="#777" size="16"></t-icons><text class="feedback-text">举报</text>
			</view>
			<view class="tags-list">
				<text class="tag-item">商业活动</text>
				<text class="tag-item">商业论坛</text>
				<text class="tag-item">年会</text>
				<text class="tag-item">商业论坛</text>
				<text class="tag-item">商业论坛</text>
				<text class="tag-item">商业论坛</text>
				<text class="tag-item">商业论坛</text>
			</view>
		</view>
		
		<uni-list>
			<uni-list-item :subtitle="data.address" :showArrow="true"></uni-list-item>
		</uni-list>
		<view class="service-list">
			<view class="service-item service">
				<text class="service-text">周边推荐</text>
			</view>
			<view class="service-item event">
				<text class="service-text">活动排期</text>
			</view>
		</view>
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<t-section title="场地介绍"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
			
		</view>
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<t-section title="抵达交通"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
			
		</view>
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<t-section title="功能/设施"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
			
		</view>
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<t-section title="配套服务"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
			
		</view>
		<!-- <t-gap height="100" bg-color="#f8f8f9"></t-gap>
		<view class="foot-block"></view>
		<view class="foot-event">
			<view class="foot-share" @click="openShare"><t-icons type="share" size="24"></t-icons></view>
			<text class="foot-btn" @click="openOrder" v-if="data.bm_stauts==1">立即报名</text>
			<text class="foot-btn disabled" v-if="data.bm_stauts==2">进行中</text>
			<text class="foot-btn disabled" v-if="data.bm_stauts==0">已结束</text>
			
		</view> -->
		<lun-footer>
			<t-button text="联系场地" shape="circle" size="md"></t-button>
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
				data: {
					thumb: '/static/21.jpg',
					title: '中国国际展览中心',
					eventdate: '2022.11/12 - 2022.11/23',
					address: '北京市朝阳区撒旦法撒旦法四方达富士达',
					
				},
				eventdate:'',
				htmlNodes: [],
				userList: [],
			}
		},
		onLoad(e) {
			this.id = e.id
			//this.loadDetail()
			this.htmlNodes = htmlParser(content);
		},
		computed: mapState(['hasLogin']),
		methods: {
			loadDetail(){
				uni.request({
					url: 'v1/events/' + this.id,
					success: (res) => {
						if (res.statusCode == 200) {
							const data = res.data.data.detail;
							console.log(res)
							this.data = data;
							this.eventdate = data.start_date +'—'+ data.end_date;
							let content = data.content.replace(/\<p/gi, '<p class="ep"');
							this.data.content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
							this.htmlNodes = htmlParser(this.data.content);
						}
					}
				})
			},
		}
	}
</script>

<style>
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
	.service-card{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		margin-top: 30rpx;
		box-shadow: 0px 0px 10px rgba(0,0,0,.15);
		border-radius: 10rpx;
	}
	.service-text{
		font-size: 28rpx;
	}
	.venue-card{
		width: 100%;
		height: 120rpx;
		margin-top: 30rpx;
		border-radius: 10rpx;
		position: relative;
		overflow: hidden;
	}
	.venue-img{
		width: 100%;
		height: 120rpx;
		border-radius: 10rpx;
	}
	.venue-card-body{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
		/* background-image:linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.8)); */
		background-color: rgba(0,0,0,0.65);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 10rpx;
		padding: 30rpx;
	}
	.venue-card-title{
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.venue-card-title-text{
		font-size: 28rpx;
		color: #fff;
	}
	.venue-icon{
		width: 50rpx;
		height: 50rpx;
	}
	.venue-card-more{
		font-size: 20rpx;
		color: #ff7510;
		line-height: 20rpx;
		padding: 10rpx 30rpx;
		border: solid 1rpx #ff7510;
		border-radius: 90rpx;
	}
	
	.tags-list{
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 30rpx;
	}
	.tag-item{
		font-size: 24rpx;
		color: #ff7510;
		line-height: 24rpx;
		border: solid 1rpx #ff7510;
		border-radius: 90rpx;
		padding: 10rpx 30rpx;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}
	.service-list{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 750rpx;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}
	.service-item{
		font-size: 32rpx;
		color: #fff;
		flex: 1;
		margin-left: 30rpx;
		margin-right: 30rpx;
		background-repeat: no-repeat;
		background-position: 202rpx center;
		background-size: 140rpx;
		padding: 25rpx 60rpx;
		border-radius: 16rpx;
		box-shadow: 0 12rpx 48rpx 0 rgb(140 152 164 / 13%);
	}
	.service-item.service{
		background-image: url('../../static/apps.png');
		background-color: #377DFF;
	}
	.service-item.event{
		background-image: url('../../static/calendar.png');
		background-color: #F5CA99;
	}
</style>
