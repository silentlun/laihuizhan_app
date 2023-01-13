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
			<view class="detail-info">
				<text class="detail-count" v-if="data.acreage_zhanlan > 0">展览面积 {{data.acreage_zhanlan}}平米</text>
				<text class="detail-count" v-if="data.acreage_huiyi > 0">会议面积 {{data.acreage_huiyi}}平米</text>
			</view>
			<view class="tags-list">
				<text class="tag-item" v-for="(tag,i) in data.tagValues" :key="i">{{tag}}</text>
			</view>
		</view>
		
		<uni-list border>
			<uni-list-item :subtitle="data.address" :show-extra-icon="true" :extra-icon="{color: '#777',size: '16',type: 'location'}" :showArrow="true" :clickable="true" @click="openMap"></uni-list-item>
		</uni-list>
		<!-- <view class="service-list">
			<view class="service-item service" @click="toRelations">
				<text class="service-text">周边推荐</text>
			</view>
			<view class="service-item event" @click="toEvents">
				<text class="service-text">活动排期</text>
			</view>
		</view> -->
		<!-- <lun-gap height="20" bg-color="#f8f8f9"></lun-gap> -->
		<view class="nav-list">
			<view class="nav-item" @click="toDetail(1)">
				<text class="nav-item-name">场地介绍</text>
				<text class="nav-item-icon">&#xe697;</text>
			</view>
			<view class="nav-item" @click="toDetail(2)">
				<text class="nav-item-name">抵达交通</text>
				<text class="nav-item-icon">&#xe65d;</text>
			</view>
			
			<view class="nav-item" @click="toDetail(3)">
				<text class="nav-item-name">功能/设施</text>
				<text class="nav-item-icon">&#xe73a;</text>
			</view>
			<view class="nav-item" @click="toRelations(1)">
				<text class="nav-item-name">配套服务</text>
				<text class="nav-item-icon">&#xe737;</text>
			</view>
			<view class="nav-item" @click="toEvents">
				<text class="nav-item-name">活动排期</text>
				<text class="nav-item-icon">&#xe775;</text>
			</view>
			<view class="nav-item" @click="toRelations(2)">
				<text class="nav-item-name">周边服务</text>
				<text class="nav-item-icon">&#xe7b0;</text>
			</view>
		</view>
		<!-- <t-section title="场地介绍"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<rich-text :nodes="htmlNodes"></rich-text>
			</view>
			
		</view>
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<t-section title="抵达交通"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<rich-text :nodes="jiaotong"></rich-text>
			</view>
			
		</view>
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<t-section title="功能/设施"></t-section>
		<view class="page-warp" style="padding-bottom: 30px;">
			<view class="detail-content">
				<rich-text :nodes="sheshi"></rich-text>
			</view>
			
		</view>
		<lun-gap height="20" bg-color="#f8f8f9"></lun-gap>
		<t-section title="配套服务"></t-section>
		<uni-list>
			<uni-list-cell v-for="(item, index) in relations" :key="index">
				<service-item :data="item" @click="showDetail(item)"></service-item>
			</uni-list-cell>
		</uni-list> -->
		
		<lun-footer>
			<lun-footer-nav :active="isFollow" @favClick="onFollow" @buttonClick="toContact"></lun-footer-nav>
		</lun-footer>
	</view>
</template>

<script>
	var QQMapWX = require('@/common/qqmap-wx-jssdk.min.js');
	var qqmapsdk;
	import { mapState,mapMutations } from 'vuex'
	import htmlParser from '@/common/html-parser'
	export default {
		data() {
			return {
				id:0,
				data: {},
				htmlNodes: [],
				jiaotong: [],
				sheshi: [],
				relations: [],
				isFollow: false
			}
		},
		onLoad(e) {
			qqmapsdk = new QQMapWX({
				key: 'L44BZ-MDPC4-LGNU6-DPLPL-JT3N5-BJBGK'
			});
			this.id = e.id
			this.loadDetail()
			this.loadRelations()
			this.loadFavoriteStatus()
		},
		computed: mapState(['hasLogin']),
		methods: {
			loadDetail(){
				uni.request({
					url: 'v1/venues/' + this.id,
					success: (res) => {
						const data = res.data.detail;
						console.log(res)
						this.data = data;
						//this.eventdate = data.start_date +'—'+ data.end_date;
						//let content = data.content.replace(/\<p/gi, '<p class="ep"');
						//this.data.content = content.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
						//this.htmlNodes = htmlParser(content);
						//let jiaotong = data.jiaotong.replace(/\<p/gi, '<p class="ep"');
						//this.data.jiaotong = jiaotong.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
						//this.jiaotong = htmlParser(jiaotong);
						//let sheshi = data.sheshi.replace(/\<p/gi, '<p class="ep"');
						//this.data.sheshi = sheshi.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ')
						//this.sheshi = htmlParser(sheshi);
						
					}
				})
			},
			loadRelations(){
				uni.request({
					url: 'v1/venues/relation',
					data: {id:this.id, type:1},
					success: (res) => {
						this.relations = res.data
					}
				})
			},
			loadFavoriteStatus(){
				if(this.hasLogin){
					uni.request({
						url: 'v1/users/favorite-status',
						data: {module: 2, id:this.id},
						success: (res) => {
							this.followCount = res.data.followCount
							this.isFollow = res.data.isFollow
						}
					})
				}
			},
			showDetail: function (e) {
				uni.navigateTo({
					url: "./service-view?id="+e.id
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
				let detail = {
					contact: this.data.contact,
					qrcode: this.data.qrcode,
					website: this.data.website
				}
				uni.navigateTo({
					url: '/pages/main/contact?detail=' + encodeURIComponent(JSON.stringify(detail))
				});
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
					module: 2,
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
						url: '/pages/user/feedback-form?module=2&id='+this.id
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
			toDetail(type){
				uni.navigateTo({
					url: './detail?type=' + type + '&id=' + this.id
				});
			},
			toDetail2(title, content){
				let detail = {
					title: title,
					content: content,
				}
				console.log(detail)
				uni.navigateTo({
					url: './detail?detail=' + encodeURIComponent(JSON.stringify(detail))
				});
			},
			toRelations(type){
				uni.navigateTo({
					url: './service?id=' + this.id + '&type=' + type
				});
			},
			toEvents(){
				uni.navigateTo({
					url: './event?id=' + this.id
				});
			}
		},
		onShareAppMessage(){
			return {
				title: this.data.title,
				path: '/pages/venues/view?id='+this.id,
			}
		},
		onShareTimeline(){
		}
	}
</script>

<style scoped>
	.detail-box-wrap{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
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
	
	.tags-list{
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
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
	.service-text{
		font-size: 28rpx;
	}
	.nav-list{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 30rpx 10rpx;
	}
	.nav-item{
		padding: 40rpx 30rpx;
		border-radius: 12rpx;
		width: 45%;
		margin: 0 2.5% 40rpx;
		background-color: #fde6d2;
		color: #f37b1d;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.nav-item-name{
		font-size: 36rpx;
		color: #f37b1d;
	}
	.nav-item-icon{
		font-family: "lunfont" !important;
		font-size: 56rpx;
		color: #F8AE74;
	}
	
</style>
