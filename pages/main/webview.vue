<template>
	<view>
		<web-view :src="weburl" :webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
	var wv;
	export default {
		data() {
			return {
				weburl:'',
				webviewStyles:{
					progress:{color: '#FF9900'}
				}
			};
		},
		onLoad(e) {
			this.weburl = decodeURIComponent(e.url)
		},
	}
</script>

<style>

</style>
