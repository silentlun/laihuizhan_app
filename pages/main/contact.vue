<template>
	<view>
		<uni-list>
			<uni-list-item subtitle="名称" :rightText="data.contact_company"></uni-list-item>
			<uni-list-item subtitle="地址" :rightText="data.contact_address"></uni-list-item>
			<uni-list-item subtitle="电话">
				<template v-slot:footer>
					<view class="tel-list">
						<text class="tel-item">{{data.contact_mobile}}</text>
						<text class="tel-item">{{data.contact_mobile}}</text>
						<text class="tel-item">{{data.contact_mobile}}</text>
						<text class="tel-item">{{data.contact_mobile}}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item subtitle="邮箱" :rightText="data.contact_email"></uni-list-item>
		</uni-list>
		<view class="contact-orther">
			<image class="contact-orther-img" src="../../static/21.jpg" :show-menu-by-longpress="true"></image>
			<text class="contact-orther-text">长按识别二维码关注我们</text>
			<text class="contact-orther-text">浏览官方网站：{{data.contact_website}}</text>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				data: {
					contact_company: '中国科学协会',
					contact_name: '',
					contact_mobile: '150013210034',
					contact_email: '32342432432@qq.com',
					contact_address: '发的啥地方撒德萨发送到发送到范德萨打分撒旦法',
					contact_qrcode: '',
					contact_website: 'http://www.laizhanhui.com/',
				},
			}
		},
		onLoad(e) {
			//this.data = e.detail
			//this.loadDetail()
			//this.htmlNodes = htmlParser(content);
		},
		computed: mapState(['hasLogin']),
		methods: {
			onClickImg(){
				uni.canIUse('request.object.method.GET');
				uni.previewImage({
					urls: this.data.contact_qrcode,
				});
			},
			onCall(){
				uni.makePhoneCall({
					phoneNumber: '114' //仅为示例
				});
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
