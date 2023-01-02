<template>
	<view>
		<uni-list>
			<uni-list-item v-for="(item, index) in data.contact" :key="index" :subtitle="item.label" :rightText="item.title" @click="onCall(item.title)" clickable></uni-list-item>
			
		</uni-list>
		<view class="contact-orther">
			<image v-if="data.qrcode" class="contact-orther-img" :src="data.qrcode" :show-menu-by-longpress="true"></image>
			<text v-if="data.qrcode" class="contact-orther-text">长按识别二维码关注我们</text>
			<text v-if="data.website" class="contact-orther-text" user-select>浏览官方网站：{{data.website}}</text>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				data: {},
			}
		},
		onLoad(e) {
			this.data = JSON.parse(decodeURIComponent(e.detail));
			//this.data = e.detail
			//this.loadDetail()
			//this.htmlNodes = htmlParser(content);
		},
		computed: mapState(['hasLogin']),
		methods: {
			onClickImg(){
				uni.previewImage({
					urls: this.data.contact_qrcode,
				});
			},
			onCall(mobile){
				var myreg = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^[1][3,4,5,6,7,8,9][0-9]{9}$)/;
				if(myreg.test(mobile)){
					uni.makePhoneCall({
						phoneNumber: mobile
					});
				}
				console.log('call tel')
			}
		}
	}
</script>

<style>
	.contact-orther{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 60rpx 30rpx;
	}
	.contact-orther-img{
		width: 200rpx;
		height: 200rpx;
		margin-bottom: 10rpx;
	}
	.contact-orther-text{
		font-size: 24rpx;
		color: #999;
		line-height: 48rpx;
	}
	.tel-list{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		flex-wrap: wrap;
		max-width: 550rpx;
	}
	.tel-item{
		font-size: 24rpx;
		color: #999;
		margin-left: 20rpx;
	}

</style>
