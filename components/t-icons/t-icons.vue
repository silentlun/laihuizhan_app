<template>
	<text :style="{ color: color, 'font-size': size + 'px' }" class="icontaibo" @click="_onClick">{{icons[type]}}</text>
</template>

<script>
	import icons from './icons.js';
	/**
	 * Icons 图标
	 * @description 用于展示 icons 图标
	 * @property {Number} size 图标大小
	 * @property {String} type 图标图案，参考示例
	 * @property {String} color 图标颜色
	 * @event {Function} click 点击 Icon 触发事件
	 */
	export default {
		name:"t-icons",
		emits: ['click'],
		props: {
			type: {
				type: String,
				default: 'pulldown'
			},
			color: {
				type: String,
				default: '#000000'
			},
			size: {
				type: [Number, String],
				default: 16
			}
		},
		data() {
			return {
				icons: icons
			}
		},
		methods: {
			_onClick() {
				this.$emit('click')
			}
		}
	}
</script>

<style scoped>
	/* #ifndef APP-NVUE */
	@font-face {
		font-family: icontaibo;
		src: url('~@/static/iconfont.ttf') format("truetype");
	}

	/* #endif */
	.icontaibo {
		font-family: icontaibo;
		text-decoration: none;
		text-align: center;
	}
</style>
