<template>
	<view>
		<image class="page-banner" :src="data.thumb" mode="scaleToFill"></image>
		<view class="page-warp">
			<text class="detail-title">{{data.title || ''}}</text>
			<view class="detail-box-wrap">
				<view class="detail-info">
					<text class="detail-count">浏览 {{data.views}}</text>
					<text class="detail-count">收藏 {{data.favnum}}</text>
				</view>
				<view class="feedback-box" @click="onFeedback">
					<uni-icons type="notification" color="#777" size="16"></uni-icons><text class="feedback-text">举报</text>
				</view>
			</view>
			<view class="tags-list">
				<text class="tag-item" v-for="(tag,i) in data.tags" :key="i">{{tag}}</text>
			</view>
		</view>
		
		<uni-list :border="false">
			<uni-list-item :subtitle="data.eventdate" :show-extra-icon="true" :extra-icon="{type: 'calendar',size: '20',color:'#777'}"></uni-list-item>
			<uni-list-item :subtitle="data.address" :show-extra-icon="true" :extra-icon="{type: 'location',size: '20',color:'#777'}" :showArrow="true" :clickable="true" @click="openMap"></uni-list-item>
		</uni-list>
		<view class="service-list">
			<view class="service-item service" @click="toVenue(data.venues_id)">
				<text class="service-text">举办地详情</text>
			</view>
			<view class="service-item event" @click="toProvider">
				<text class="service-text">服务推荐</text>
			</view>
		</view>
		<!-- <view class="page-warp">
			<view class="service-card" @click="toProvider">
				<text class="service-text">服务商推荐</text>
				<uni-icons type="right" color="#777"></uni-icons>
			</view>
			<view class="venue-card" v-if="data.venues_id > 0">
				<image class="venue-img" :src="data.venue.thumb" mode="aspectFill"></image>
				<view class="venue-card-body">
					<view class="venue-card-title">
						<image class="venue-icon" src="@/static/changdi.png" mode="aspectFill"></image>
						<text class="venue-card-title-text">{{data.venue.title}}</text>
					</view>
					<text class="venue-card-more" @click="toVenue(data.venue.id)">详情</text>
				</view>
			</view>
			
		</view> -->
		
		<t-section title="活动详情"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<!-- <rich-text @click="showImg" :nodes="htmlNodes"></rich-text> -->
				<u-parse :content="data.content" @preview="preview" />
			</view>
			<view class="tips">
				<text class="tips-text">来源：{{data.copyfrom}}</text>
				<text class="tips-text">免责声明：莱荟展登载此文出于传递更多信息之目的，并不意味着赞同其观点或证实其描述，活动内容仅供参考。</text>
			</view>
			
		</view>
		<lun-footer>
			<lun-footer-nav :active="isFollow" @favClick="onFollow" @buttonClick="toContact"></lun-footer-nav>
		</lun-footer>
	</view>
</template>

<script>
	var QQMapWX = require('@/common/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	import { mapState,mapMutations } from 'vuex'
	import uParse from "@/components/feng-parse/parse.vue"
	export default {
		components: {
			uParse
		},
		data() {
			return {
				id:0,
				data: {},
				htmlNodes: [],
				isFollow: false
			}
		},
		onLoad(e) {
			qqmapsdk = new QQMapWX({
				key: 'L44BZ-MDPC4-LGNU6-DPLPL-JT3N5-BJBGK'
			});
			this.id = e.id
			this.loadDetail()
			this.loadFavoriteStatus()
			//this.htmlNodes = htmlParser(content);
		},
		computed: mapState(['hasLogin']),
		methods: {
			loadDetail(){
				uni.request({
					url: 'v1/events/' + this.id,
					success: (res) => {
						const data = res.data.detail;
						console.log(res)
						this.data = data;
						//this.eventdate = data.start_date +'—'+ data.end_date;
						let content = data.content.replace(/\<p/gi, '<p class="ep"');
						this.data.content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
						
					}
				})
			},
			preview(src, e) {
				// do something
				console.log("src: " + src);
			},
			loadFavoriteStatus(){
				if(this.hasLogin){
					uni.request({
						url: 'v1/users/favorite-status',
						data: {module: 3, id:this.id},
						success: (res) => {
							this.followCount = res.data.followCount
							this.isFollow = res.data.isFollow
						}
					})
				}
				
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
				let detail = {
					contact: this.data.contact,
					qrcode: this.data.qrcode,
					website: this.data.website
				}
				uni.navigateTo({
					url: '/pages/main/contact?detail=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			toProvider(){
				uni.navigateTo({
					url: './merchant?id=' + this.id
				});
			},
			toVenue(id){
				console.log(id)
				if(!id){
					uni.showToast({
						title: '暂未更新',
						icon: 'error',
						duration: 2000
					});
					return false;
				}
				uni.navigateTo({
					url: '/pages/venues/view?id=' + id
				});
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
					module: 3,
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
			onFeedback(){
				if(this.hasLogin){
					uni.navigateTo({
						url: '/pages/user/feedback-form?module=3&id='+this.id
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
			openMap() {
			    var _this = this;
				console.log('open map')
			    qqmapsdk.geocoder({
			      address: _this.data.address,
			      success: (res) => {
			        console.log(res);
			        var res = res.result;
			        var latitude = res.location.lat;
			        var longitude = res.location.lng;
					uni.openLocation({
						name: this.data.title,
						address: this.data.address,
						latitude: latitude,
						longitude: longitude,
						success: function () {
							console.log('success');
						}
					});
			      },
			      fail: function(error) {
			        console.error(error);
			      },
			      complete: function(res) {
			        console.log(res);
			      }
			    })
			}
		},
		onShareAppMessage(){
			return {
				title: this.data.title,
				path: '/pages/event/view?id='+this.id,
			}
		},
		onShareTimeline(){
		}
	}
</script>

<style>
@import url("@/components/feng-parse/parse.css");
	.detail-box-wrap{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.detail-info{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
	.detail-count{
		font-size: 24rpx;
		color: #777;
		margin-right: 30rpx;
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
	.tips{
		display: flex;
		flex-direction: column;
	}
	.tips-text{
		font-size: 28rpx;
		color: #777;
		line-height: 42rpx;
		margin-bottom: 16rpx;
	}
	.tags-list{
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin: 10rpx 0;
	}
	.tag-item{
		font-size: 24rpx;
		color: #ff7510;
		line-height: 24rpx;
		border: solid 1rpx #ff7510;
		border-radius: 90rpx;
		padding: 10rpx 30rpx;
		margin-right: 30rpx;
		margin-top: 20rpx;
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
		padding: 25rpx 44rpx;
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
	.service-text{
		font-size: 28rpx;
	}
</style>
