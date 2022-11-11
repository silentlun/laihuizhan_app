<template>
	<!-- #ifndef APP-NVUE -->
	<view class="uni-list">
		<slot />
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<list class="uni-list" :enableBackToTop="enableBackToTop" loadmoreoffset="15" @loadmore="loadMore">
		<slot />
	</list>
	<!-- #endif -->
</template>

<script>
	/**
	 * List 列表
	 * @property {String} 	border = [true|false]
	 */
	export default {
		name: 'tList',
		'mp-weixin': {
			options: {
				multipleSlots: false
			}
		},
		props: {
			enableBackToTop: {
				type: [Boolean, String],
				default: true
			},
			border: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			loadMore(e) {
				this.$emit('scrolltolower');
			}
		}
	};
</script>
<style scoped>
	.uni-list {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		position: relative;
		flex-direction: column;
	}

	.uni-list--border {
		position: relative;
		/* #ifdef APP-NVUE */
		border-top-color: #e5e5e5;
		border-top-style: solid;
		border-top-width: 0.5px;
		border-bottom-color: #e5e5e5;
		border-bottom-style: solid;
		border-bottom-width: 0.5px;
		/* #endif */
		z-index: -1;
	}

	/* #ifndef APP-NVUE */
	.uni-list--border-top {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e5e5e5;
		z-index: 1;
	}

	.uni-list--border-bottom {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		height: 1px;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		background-color: #e5e5e5;
	}

	/* #endif */
</style>