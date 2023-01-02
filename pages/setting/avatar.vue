<template>
	<view>
		<tui-picture-cropper :lockRatio="true" :imageUrl="imageUrl" @ready="ready" @cropper="cropper"></tui-picture-cropper>
	</view>
</template>

<script>
	import { mapState,mapMutations } from 'vuex'
	export default {
		data() {
			return {
				src: '',
				imageUrl: '' //要裁剪的图片
			}
		},
		onLoad(e) {
			console.log(e)
			this.src = e.picurl || '';
			//如果从上个页面传值时可显示loading
			this.src &&
				uni.showLoading({
					title: '请稍候...',
					mask: true
				});
		},
		methods: {
			...mapMutations(['upavatar', 'updateInfo']),
			ready() {
				this.imageUrl = this.src;
			},
			cropper(e) {
				//console.log(e)
				let path = e.url;
				const fileManager = uni.getFileSystemManager()
				const base64 = fileManager.readFileSync(e.url, 'base64')
				this.updateAvatar(base64)
				
			},
			updateAvatar(path){
				uni.showLoading({
				    title: '上传中'
				});
				uni.request({
					url: 'v1/users/avatar',
					method: 'POST',
					data: {avatardata:path},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.code == 200) {
							this.upavatar(`data:image/jpeg;base64,${path}`)
							uni.navigateBack({
							    delta: 1
							});
						}else{
							uni.showToast({
								icon:'error',
							    title: res.data.message,
							});
						}
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon:'error',
						    title: "修改失败",
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
