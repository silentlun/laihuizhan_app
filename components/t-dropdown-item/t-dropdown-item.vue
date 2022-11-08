<template>
	<view class="dropdown-item">
		<!-- selected -->
		<view class="dropdown-item__selected" 
			  @click="changePopup">
			<slot name="title" v-if="$slots.title"></slot>
			<block v-else>
				<view class="selected__name">{{tabtitle ? tabtitle : selectItem.text}}</view>
				<view class="selected__icon"
					  :class="showClass === 'show'? 'up' : 'down'"
				>
					<span class="nav-item-icon">&#xe661;</span>
				</view>
			</block>
		</view>
		<view class="dropdown-item__content" :style="{top: contentTop + 'px'}" v-if="showList">
			<!-- dropdown -->
			<view :class="['list', showClass]" v-if="showtype==1">
				<slot v-if="$slots.default"></slot>
				<block v-else>
					<view class="list__option"
						  v-for="(item, index) in list"
						  :key="index"
						   @click="choose(item)">
						<view>{{item.name}}</view>
						<icon v-if="item.value === value" type="success_no_circle" size="26"/>	
					</view>
				</block>
			</view>
			<view class="dropdown-item-content" :class="['list', showClass]" v-else>
				<slot v-if="$slots.default"></slot>
				<block v-else>
				<text class="dropdown-label" :class="{'active':item.value == value}" v-for="(item,t) in list" :key="t" @click="choose(item)">{{item.name}}</text>
				</block>
			</view>
			<!-- dropdown-mask -->
			<view :class="['dropdown-mask', showClass]" v-if="showList" @click="closePopup" @touchmove.prevent></view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"t-dropdown-item",
		props: {
			value: {
				type: String,
				default: ''
			},
			list: {
				type: Array,
				default: ()=> {
					return []
				}
			},
			title: [Number, String],
			showtype:{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				showList: "",
				showClass: '',
				selectItem: {},
				contentTop: 0,
				tabtitle:''
			}
		},
		watch: {
		},
		mounted() {
			this.showList = this.active;
			this.selectItem = this.list[this.value];
			this.tabtitle = this.title
			// document.addEventListener('click', e => {
			// 	//this.$el 可以获取当前组件的容器节点
			// 	if (!this.$el.contains(e.target)) {
			// 		console.log('change');
			// 		this.close()
			// 	}
			// });
		},
		methods: {
			choose(item) {
				this.selectItem = item
				this.$emit('input', item.value)
				this.$emit('click');
				this.closePopup()
				this.tabtitle = item.value ? item.value : this.title
			},
			changePopup() {
				if(this.showList) {
					this.closePopup()
				} else {
					this.openPopup()
				}
			},
			openPopup() {
				// this.$parent  -> dropdown-menu
				this.$parent.$emit('close')
				this.showList = true
				this.$nextTick(() => {
					this.getElementData('.dropdown-item__selected', (data)=>{
						this.contentTop = data[0].bottom
						this.showClass = 'show'
					})
				})
			},
			closePopup() {
				this.showClass = ''
				setTimeout(() => {
					this.showList = false
				}, 300)
			},
			close() {
				this.showClass = ''
				this.showList = false
			},
			getElementData(el, callback){
				uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
					callback(data[0]);
				});
			}
		}
	}
</script>

<style lang="scss">
	.dropdown-item {
		width: 250rpx;
		overflow: hidden;
		flex:1;
		position: relative;
		&__selected {
			position: relative;
			display: flex;
			align-items: center;
			background: #fff;
			padding: 30rpx;
			box-sizing: border-box;
			justify-content: center;
			.selected__name {
				font-size: 28rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				word-break: break-all;
			}
			.selected__icon {
				margin-left: 20rpx;
				&.down {
					transition: transform .3s;
					transform: rotateZ(0);
				}
				&.up {
					transition: transform .3s;
					transform: rotateZ(-180deg);
				}
			}
		}
		&__content {
			position: fixed;
			left: 0;
			right: 0;
			overflow: hidden;
			top: var(--window-top);
			bottom: 0;
			z-index: 10;
			.list {
				max-height: 400px;
				overflow-y: auto;
				position: absolute;
				left: 0;
				right: 0;
				z-index: 30;
				background: #fff;
				transform: translateY(-100%);
				transition: all .3s;
				&.show {
					transform: translateY(0);
				}
				&__option {
					font-size:32rpx;
					padding: 26rpx 28rpx;
					display: flex;
					justify-content: space-between;
					&:not(:last-child) {
						border-bottom: 1rpx solid #DDDDDD;
					}
				}
			}
			.dropdown-mask {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				transition: all .3s;
				z-index: 20;
				&.show {
					background:rgba(0,0,0,0.5);
				}
			}
		}
		&:not(:last-child):after {
			content: ' ';
			position: absolute;
			width: 2rpx;
			top: 36rpx;
			bottom: 36rpx;
			right: 0;
			background: $uni-border-color;
		}
	}
	.dropdown-item-content {
		display: flex;
		align-items: center;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 20rpx;
		width: 750rpx;
	}
	.dropdown-label{
		width: 216rpx;
		font-size: 28rpx;
		color: #777777;
		text-align: center;
		padding: 20rpx 0rpx;
		border-radius: 4rpx;
		margin-bottom: 20rpx;
		margin-left: 10rpx;
		margin-right: 10rpx;
		background-color: #e8eaec;
	}
	.active {
		background-color: #f90;
		color: #FFFFFF;
	}
	.nav-item-icon{
		font-family: icontaibo;
		font-size: 24rpx;
	}
</style>