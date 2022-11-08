<template>
	<!-- #ifndef APP-NVUE -->
	<view>
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

