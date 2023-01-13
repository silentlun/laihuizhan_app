<template>
	<view class="lun-prompt" v-if="visible">
		<view class="lun-prompt__icon">
			<image class="lun-prompt__img" mode="aspectFit" src="data:image/png;base64,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"></image>
		</view>
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
		height: 70vh;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #bbbec4;
		flex: 1;
	}

	.lun-prompt__icon {
		display: flex;
		justify-content: center;
		margin-bottom: 10rpx;
	}
	.lun-prompt__img{
		width: 154rpx;
		height: 100rpx;
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
