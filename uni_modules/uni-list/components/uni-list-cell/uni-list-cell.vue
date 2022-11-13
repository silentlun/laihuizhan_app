<template>
	<!-- #ifndef APP-NVUE -->
	<view class="uni-list-cell">
		<slot></slot>
	</view>
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<cell>
		<slot></slot>
	</cell>
	<!-- #endif -->
</template>

<script>
	export default {
		name:"t-list-cell",
		props: {}
	}
</script>

<style>
	.uni-list-cell {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		width: 100%;
		/* #endif */
	}
</style>