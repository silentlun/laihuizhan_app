<template>
	<view class="lun-prompt" v-if="visible">
		<t-icons :type="icon" color="#999999" size="50"></t-icons>
		<text class="lun-prompt__title" v-if="title">{{ title }}</text>
		<text class="lun-prompt__text" v-if="text">{{ text }}</text>
		<view class="lun-prompt__buttons" v-if="buttons && buttons.length>0">
			<block v-for="(item,index) in buttons" :key="index">
				<button :type="item.type" class="lun-prompt__button" :class="item.className" @click="buttonClicked" size="mini" :data-index="index">{{ item.text }}</button>
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
	.lun-prompt {
		/* #ifndef APP-NVUE */
		display: flex;
		height: 70%;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #bbbec4;
		flex: 1;
	}

	.lun-prompt__icon {
		font-size: 100rpx;
	}

	.lun-prompt__title {
		font-size: 28rpx;
		color: #AAAAAA;
		margin: 10rpx 0
	}

	.lun-prompt__text {
		font-size: 24rpx;
		color: #AAAAAA;
		margin: 4rpx 0
	}

	.lun-prompt__button {
		font-size: 28rpx;
		margin: 8rpx 0;
		padding: 4rpx 20rpx;
		border-radius: 4rpx;
	}
</style>
