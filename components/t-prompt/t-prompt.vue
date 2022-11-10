<template>
	<view class="t-prompt" v-if="visible">
		<t-icons :type="icon" color="#999999" size="50"></t-icons>
		<text class="t-prompt__title" v-if="title">{{ title }}</text>
		<text class="t-prompt__text" v-if="text">{{ text }}</text>
		<view class="t-prompt__buttons" v-if="buttons && buttons.length>0">
			<block v-for="(item,index) in buttons" :key="index">
				<button :type="item.type" class="t-prompt__button" :class="item.className" @click="buttonClicked" size="mini" :data-index="index">{{ item.text }}</button>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			visible:{
				type:Boolean,
				default:true
			},
			icon: {
				type: String,
				default: 'kongshuju',
			},
			title: {
				type: String,
				default: '',
			},
			text: {
				type: String,
				default: '',
			},
			buttons: {
				type: Array,
				default: function(e) {
					return []
				}
			}
		},
		methods: {
			/**
			 * 点击按钮触发事件
			 */
			buttonClicked(e) {
				const {index} = e.currentTarget.dataset
				const value = this.buttons[index]
				this.$emit('click', {index,value})
			}
		}
	}
</script>

<style>
	.t-prompt {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 100%;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #bbbec4;
		flex: 1;
	}

	.t-prompt__icon {
		font-size: 100rpx;
	}

	.t-prompt__title {
		font-size: 32rpx;
		color: #AAAAAA;
		margin: 4rpx 0
	}

	.t-prompt__text {
		font-size: 24rpx;
		color: #AAAAAA;
		margin: 4rpx 0
	}

	.t-prompt__button {
		font-size: 28rpx;
		margin: 8rpx 0;
		padding: 4rpx 20rpx;
		border-radius: 4rpx;
	}
</style>
