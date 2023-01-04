<template>
	<view>
		<uni-list :border="false">
			<uni-list-item title="关于我们" @click="goDetail(1, '关于我们')" clickable showArrow></uni-list-item>
			<uni-list-item title="商务合作" @click="goDetail(2, '商务合作')" clickable showArrow></uni-list-item>
			<uni-list-item title="微信客服" @click="goDetail(3, '微信客服')" clickable showArrow></uni-list-item>
			<uni-list-item showArrow>
				<template v-slot:body>
					<button class="kefu-btn" open-type="contact" bindcontact="handleContact" session-from="sessionFrom">在线客服</button>
				</template>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goDetail(id, title){
				uni.navigateTo({
					url: "/pages/main/webpage?id=" + id + "&title=" + title
				})
			},
			handleContact(e) {
				console.log(e.detail.path)
				console.log(e.detail.query)
			}
		}
	}
</script>

<style>
	.kefu-btn{
		background-color: #fff;
		border: 0;
		padding: 0;
		margin: 0;
		font-size: 32rpx;
		line-height: 1.5;
		text-align: left;
		width: 100%;
	}
	.kefu-btn::after{
		border: 0;
	}
</style>
