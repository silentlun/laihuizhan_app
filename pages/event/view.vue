<template>
	<view>
		<image class="page-banner" :src="data.thumb" mode="scaleToFill"></image>
		<view class="event-warp">
			<text class="event-title">{{data.title || ''}}</text>
			<view class="feedback-box">
				<t-icons type="remind" color="#777" size="16"></t-icons><text class="feedback-text">举报</text>
			</view>
		</view>
		
		<t-list>
			<t-list-item :subtitle="data.eventdate"></t-list-item>
			<t-list-item :subtitle="data.address" :showArrow="true"></t-list-item>
		</t-list>
		<t-gap height="20" bg-color="#f8f8f9"></t-gap>
		<t-section title="活动详情"></t-section>
		<view class="event-warp" style="padding-bottom: 30px;">
			<view class="event-content">
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
		<t-footer>
			<t-button text="联系主办方" shape="circle" size="md"></t-button>
		</t-footer>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				id:0,
				data: {
					thumb: '/static/21.jpg',
					title: '发送到撒旦法撒旦法撒旦法撒旦法是范德萨发的',
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
			this.loadDetail()
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
.event-warp{
		width: 750rpx;
		padding: 0 20rpx;
		display: flex;
		flex-direction: column;
	}
	.event-title{
		font-size: 38rpx;
		font-weight: 700;
		line-height: 44rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.content{
		font-size: 32upx;
		line-height: 1.5;
	}
	.ep{
		margin-bottom: 30upx;
	}
	.content img{
		width: 100%;
	}
	.foot-event{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 750rpx;
		height: 100rpx;
		padding-left: 30rpx;
		padding-right: 40rpx;
	}
	/* #ifndef APP-NVUE */
	.foot-event:after {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: $uni-border-color;
	}
	
	/* #endif */
	.foot-btn{
		font-size: 28rpx;
		text-align: center;
		color: #FFFFFF;
		background-color: $uni-color-warning;
		border-radius: 60rpx;
		padding: 15rpx 50rpx;
	}
	.disabled{background: #ddd; color: #333;}
	.foot-share{
		width: 120rpx;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
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
</style>
