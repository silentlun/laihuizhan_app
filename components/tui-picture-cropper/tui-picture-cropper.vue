<template>
	<view class="tui-container" @touchmove.stop.prevent="stop">
		<view
			class="tui-image-cropper"
			:change:prop="parse.propsChange"
			:prop="props"
			:data-lockRatio="lockRatio"
			:data-lockWidth="lockWidth"
			:data-lockHeight="lockHeight"
			:data-maxWidth="maxWidth"
			:data-minWidth="minWidth"
			:data-maxHeight="maxHeight"
			:data-minHeight="minHeight"
			:data-width="width"
			:data-height="height"
			:data-limitMove="limitMove"
			:data-windowHeight="sysInfo.windowHeight || 600"
			:data-windowWidth="sysInfo.windowWidth || 400"
			:data-imgTop="imgTop"
			:data-imgLeft="imgLeft"
			:data-imgWidth="imgWidth"
			:data-imgHeight="imgHeight"
			:data-angle="angle"
			@touchend="parse.cutTouchEnd"
			@touchstart="parse.cutTouchStart"
			@touchmove="parse.cutTouchMove"
		>
			<view class="tui-content">
				<view class="tui-content-top tui-bg-transparent" :style="{ transitionProperty: cutAnimation ? '' : 'background' }"></view>
				<view class="tui-content-middle">
					<view class="tui-bg-transparent tui-wxs-bg" :style="{ transitionProperty: cutAnimation ? '' : 'background' }"></view>
					<view class="tui-cropper-box" :style="{ borderColor: borderColor, transitionProperty: cutAnimation ? '' : 'background' }">
						<view
							v-for="(item, index) in 4"
							:key="index"
							class="tui-edge"
							:class="[`tui-${index < 2 ? 'top' : 'bottom'}-${index === 0 || index === 2 ? 'left' : 'right'}`]"
							:style="{
								width: edgeWidth,
								height: edgeWidth,
								borderColor: edgeColor,
								borderWidth: edgeBorderWidth,
								left: index === 0 || index === 2 ? `-${edgeOffsets}` : 'auto',
								right: index === 1 || index === 3 ? `-${edgeOffsets}` : 'auto',
								top: index < 2 ? `-${edgeOffsets}` : 'auto',
								bottom: index > 1 ? `-${edgeOffsets}` : 'auto'
							}"
						></view>
					</view>
					<view class="tui-flex-auto tui-bg-transparent" :style="{ transitionProperty: cutAnimation ? '' : 'background' }"></view>
				</view>
				<view class="tui-flex-auto tui-bg-transparent" :style="{ transitionProperty: cutAnimation ? '' : 'background' }"></view>
			</view>
			<image
				@load="imageLoad"
				@error="imageLoad"
				@touchstart="parse.touchstart"
				@touchmove="parse.touchmove"
				@touchend="parse.touchend"
				:data-minScale="minScale"
				:data-maxScale="maxScale"
				:data-disableRotate="disableRotate"
				:style="{
					width: imgWidth ? imgWidth + 'px' : 'auto',
					height: imgHeight ? imgHeight + 'px' : 'auto',
					transitionDuration: (cutAnimation ? 0.3 : 0) + 's'
				}"
				class="tui-cropper-image"
				:src="imageUrl"
				v-if="imageUrl"
				mode="widthFix"
			></image>
		</view>
		<canvas
			canvas-id="tui-image-cropper"
			id="tui-image-cropper"
			:disable-scroll="true"
			:style="{ width: CROPPER_WIDTH * scaleRatio + 'px', height: CROPPER_HEIGHT * scaleRatio + 'px' }"
			class="tui-cropper-canvas"
		></canvas>
		<view class="tui-cropper-tabbar" v-if="!custom">
			<view class="tui-op-btn" @tap.stop="back">??????</view>
			<image :src="rotateImg" class="tui-rotate-img" @tap="setAngle"></image>
			<view class="tui-op-btn" @tap.stop="getImage">??????</view>
		</view>
	</view>
</template>
<script src="./tui-picture-cropper.wxs" module="parse" lang="wxs"></script>
<script>
/**
 * ???????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????
 * ??????static?????????components?????????
 *??????????????????base64???????????????
 * */
export default {
	name: 'tuiPictureCropper',
	emits: ['ready','cropper','initAngle','imageLoad'],
	props: {
		//????????????
		imageUrl: {
			type: String,
			default: ''
		},
		/*
		 ?????????????????????????????????????????????
		 ??????????????? px
		*/
		height: {
			type: Number,
			default: 300
		},
		//??????????????? px
		width: {
			type: Number,
			default: 300
		},
		//????????????????????? px
		minWidth: {
			type: Number,
			default: 100
		},
		//????????????????????? px
		minHeight: {
			type: Number,
			default: 100
		},
		//????????????????????? px
		maxWidth: {
			type: Number,
			default: 360
		},
		//????????????????????? px
		maxHeight: {
			type: Number,
			default: 360
		},
		//?????????border??????
		borderColor: {
			type: String,
			default: 'rgba(255,255,255,0.1)'
		},
		//????????????????????????
		edgeColor: {
			type: String,
			default: '#FFFFFF'
		},
		//???????????????????????? w=h
		edgeWidth: {
			type: String,
			default: '34rpx'
		},
		//??????????????????border??????
		edgeBorderWidth: {
			type: String,
			default: '6rpx'
		},
		//?????????????????????edgeBorderWidth????????????
		edgeOffsets: {
			type: String,
			default: '6rpx'
		},
		/**
		 * ???????????????????????????true????????????????????????
		 * ?????????????????????
		 */
		lockWidth: {
			type: Boolean,
			default: false
		},
		//?????????????????????
		lockHeight: {
			type: Boolean,
			default: false
		},
		//??????????????????????????????????????????
		lockRatio: {
			type: Boolean,
			default: false
		},
		//?????????????????????????????????????????????
		scaleRatio: {
			type: Number,
			default: 2
		},
		//????????????????????????????????? (0, 1]???????????????????????????1.0??????
		quality: {
			type: Number,
			default: 0.8
		},
		//??????????????????
		rotateAngle: {
			type: Number,
			default: 0
		},
		//?????????????????????
		minScale: {
			type: Number,
			default: 0.5
		},
		//?????????????????????
		maxScale: {
			type: Number,
			default: 2
		},
		//??????????????????????????????false??????????????????????????????limitMove???false?????????
		disableRotate: {
			type: Boolean,
			default: true
		},
		//????????????????????????(???????????????????????????,???true????????????????????????)
		limitMove: {
			type: Boolean,
			default: true
		},
		//????????????????????????true???????????????????????????
		custom: {
			type: Boolean,
			default: false
		},
		//??????????????????????????????custom???true????????????
		startCutting: {
			type: [Number, Boolean],
			default: 0
		},
		/**
		 * ????????????base64(H5?????????base64)
		 * ???????????????App???????????????????????????????????????,H5(??????url??????base64)
		 **/
		isBase64: {
			type: Boolean,
			default: false
		},
		//?????????????????????loadding
		loadding: {
			type: Boolean,
			default: true
		},
		//??????icon
		rotateImg: {
			type: String,
			default: '/static/img_rotate.png'
		}
	},
	data() {
		return {
			TIME_CUT_CENTER: null,
			CROPPER_WIDTH: 200, //????????????
			CROPPER_HEIGHT: 200, //????????????
			cutX: 0, //??????x?????????
			cutY: 0, //??????y?????????0
			canvasWidth: 0,
			canvasHeight: 0,
			imgWidth: 0, //????????????
			imgHeight: 0, //????????????
			scale: 1, //???????????????
			angle: 0, //??????????????????
			cutAnimation: false, //????????????????????????????????????
			cutAnimationTime: null,
			imgTop: 0, //???????????????
			imgLeft: 0, //???????????????
			ctx: null,
			sysInfo: {},
			props: '',
			sizeChange: 0, //2
			angleChange: 0, //3
			resetChange: 0, //4
			centerChange: 0 //5
		};
	},
	watch: {
		//????????????????????????change??????
		imageUrl(val, oldVal) {
			this.imageReset();
			this.showLoading();
			uni.getImageInfo({
				src: val,
				success: res => {
					//??????????????????
					this.imgComputeSize(res.width, res.height);
					if (this.limitMove) {
						this.angleChange++;
						this.props = `3,${this.angleChange}`;
					}
				},
				fail: err => {
					this.imgComputeSize();
					if (this.limitMove) {
						this.angleChange++;
						this.props = `3,${this.angleChange}`;
					}
				}
			});
		},
		rotateAngle(val) {
			this.cutAnimation = true;
			this.angle = val;
			this.angleChanged(val);
		},
		cutAnimation(val) {
			//????????????260????????????????????????
			clearTimeout(this.cutAnimationTime);
			if (val) {
				this.cutAnimationTime = setTimeout(() => {
					this.cutAnimation = false;
				}, 260);
			}
		},
		limitMove(val) {
			if (val) {
				this.angleChanged(this.angle);
			}
		},
		startCutting(val) {
			if (this.custom && val) {
				this.getImage();
			}
		}
	},
	mounted() {
		this.sysInfo = uni.getSystemInfoSync();
		this.imgTop = this.sysInfo.windowHeight / 2;
		this.imgLeft = this.sysInfo.windowWidth / 2;
		this.CROPPER_WIDTH = this.width;
		this.CROPPER_HEIGHT = this.height;
		this.canvasHeight = this.height;
		this.canvasWidth = this.width;
		this.ctx = uni.createCanvasContext('tui-image-cropper', this);
		//?????????
		setTimeout(() => {
			this.props = '1,1';
		}, 0);
		setTimeout(() => {
			this.$emit('ready', {});
		}, 200);
	},
	methods: {
		//??????????????????????????????[????????????]
		async getLocalImage(url) {
			return await new Promise((resolve, reject) => {
				uni.downloadFile({
					url: url,
					success: res => {
						resolve(res.tempFilePath);
					},
					fail: res => {
						reject(false)
					}
				})
			})
		},
		//???????????????????????????
		getImage() {
			if (!this.imageUrl) {
				uni.showToast({
					title: '???????????????',
					icon: 'none'
				});
				return;
			}
			this.loadding && this.showLoading();
			let draw =async () => {
				//??????????????????
				let imgWidth = this.imgWidth * this.scale * this.scaleRatio;
				let imgHeight = this.imgHeight * this.scale * this.scaleRatio;
				//canvas????????????????????????
				let xpos = this.imgLeft - this.cutX;
				let ypos = this.imgTop - this.cutY;
				//????????????
				this.ctx.translate(xpos * this.scaleRatio, ypos * this.scaleRatio);
				this.ctx.rotate((this.angle * Math.PI) / 180);
				let imgUrl = this.imageUrl;
				// #ifdef APP-PLUS || MP-WEIXIN
				if (~this.imageUrl.indexOf('https:')) {
					imgUrl = await this.getLocalImage(this.imageUrl)
				}
				// #endif
				this.ctx.drawImage(imgUrl, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
				this.ctx.draw(false, () => {
					let params = {
						width: this.canvasWidth * this.scaleRatio,
						height: Math.round(this.canvasHeight * this.scaleRatio),
						//destWidth: this.canvasWidth * this.scaleRatio,
						//destHeight: Math.round(this.canvasHeight) * this.scaleRatio,
						destWidth: 300,
						destHeight: 300,
						fileType: 'jpg',
						quality: this.quality
					};
					let data = {
						url: '',
						base64: '',
						//width: this.canvasWidth * this.scaleRatio,
						//height: this.canvasHeight * this.scaleRatio
						width: 300,
						height: 300,
					};
					// #ifdef MP-ALIPAY

					if (this.isBase64) {
						this.ctx.toDataURL(params).then(dataURL => {
							data.base64 = dataURL;
							this.loadding && uni.hideLoading();
							this.$emit('cropper', data);
						});
					} else {
						this.ctx.toTempFilePath({
							...params,
							success: res => {
								data.url = res.apFilePath;
								this.loadding && uni.hideLoading();
								this.$emit('cropper', data);
							}
						});
					}
					// #endif

					// #ifndef MP-ALIPAY
					// #ifdef MP-BAIDU || MP-TOUTIAO || H5
					this.isBase64 = false;
					// #endif
					if (this.isBase64) {
						uni.canvasGetImageData({
							canvasId: 'tui-image-cropper',
							x: 0,
							y: 0,
							width: this.canvasWidth * this.scaleRatio,
							height: Math.round(this.canvasHeight * this.scaleRatio),
							success: res => {
								const arrayBuffer = new Uint8Array(res.data);
								const base64 = uni.arrayBufferToBase64(arrayBuffer);
								data.base64 = base64;
								this.loadding && uni.hideLoading();
								this.$emit('cropper', data);
							}
						},this);
					} else {
						uni.canvasToTempFilePath(
							{
								...params,
								canvasId: 'tui-image-cropper',
								success: res => {
									data.url = res.tempFilePath;
									// #ifdef H5
									data.base64 = res.tempFilePath;
									// #endif
									this.loadding && uni.hideLoading();
									this.$emit('cropper', data);
								},
								fail(res) {
									console.log(res);
								}
							},
							this
						);
					}
					// #endif
				});
			};
			if (this.CROPPER_WIDTH != this.canvasWidth || this.CROPPER_HEIGHT != this.canvasHeight) {
				this.CROPPER_WIDTH = this.canvasWidth;
				this.CROPPER_HEIGHT = this.canvasHeight;
				this.$nextTick(() => {
					this.ctx.draw();
					setTimeout(() => {
						draw();
					}, 100);
				});
			} else {
				draw();
			}
		},
		change(e) {
			this.cutX = e.cutX || 0;
			this.cutY = e.cutY || 0;
			this.canvasWidth = e.canvasWidth || this.width;
			this.canvasHeight = e.canvasHeight || this.height;
			this.imgWidth = e.imgWidth || this.imgWidth;
			this.imgHeight = e.imgHeight || this.imgHeight;
			this.scale = e.scale || 1;
			this.angle = e.angle || 0;
			this.imgTop = e.imgTop || 0;
			this.imgLeft = e.imgLeft || 0;
		},
		imageReset() {
			this.scale = 1;
			this.angle = 0;
			let sys = this.sysInfo.windowHeight ? this.sysInfo : uni.getSystemInfoSync();
			this.imgTop = sys.windowHeight / 2;
			this.imgLeft = sys.windowWidth / 2;
			this.resetChange++;
			this.props = `4,${this.resetChange}`;
			//????????????????????? 0deg
			this.$emit('initAngle', {});
		},
		imageLoad(e) {
			this.imageReset();
			uni.hideLoading();
			this.$emit('imageLoad', {});
		},

		imgComputeSize(width, height) {
			//???????????????????????? = ?????????????????????
			let imgWidth = width,
				imgHeight = height;
			if (imgWidth && imgHeight) {
				if (imgWidth / imgHeight > this.width / this.height) {
					imgHeight = this.height;
					imgWidth = (width / height) * imgHeight;
				} else {
					imgWidth = this.width;
					imgHeight = (height / width) * imgWidth;
				}
			} else {
				let sys = this.sysInfo.windowHeight ? this.sysInfo : uni.getSystemInfoSync();
				imgWidth = sys.windowWidth;
				imgHeight = 0;
			}
			this.imgWidth = imgWidth;
			this.imgHeight = imgHeight;
			this.sizeChange++;
			this.props = `2,${this.sizeChange}`;
		},
		moveStop() {
			clearTimeout(this.TIME_CUT_CENTER);
			this.TIME_CUT_CENTER = setTimeout(() => {
				if (!this.cutAnimation) {
					this.cutAnimation = true;
				}
				this.centerChange++;
				this.props = `5,${this.centerChange}`;
			}, 666);
		},
		moveDuring() {
			clearTimeout(this.TIME_CUT_CENTER);
		},
		showLoading() {
			uni.showLoading({
				title: '?????????...',
				mask: true
			});
		},
		stop() {},
		back() {
			uni.navigateBack();
		},
		angleChanged(val) {
			this.moveStop();
			if (this.limitMove && val % 90) {
				this.angle = Math.round(val / 90) * 90;
			}
			this.angleChange++;
			this.props = `3,${this.angleChange}`;
		},
		setAngle() {
			this.cutAnimation = true;
			this.angle = this.angle + 90;
			this.angleChanged(this.angle);
		}
	}
};
</script>

<style scoped>
.tui-container {
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
}

.tui-image-cropper {
	width: 100vw;
	height: 100vh;
	position: absolute;
}

.tui-content {
	width: 100vw;
	height: 100vh;
	position: absolute;
	z-index: 9;
	display: flex;
	flex-direction: column;
	pointer-events: none;
}

.tui-bg-transparent {
	background-color: rgba(0, 0, 0, 0.6);
	transition-duration: 0.3s;
}

.tui-content-top {
	pointer-events: none;
}

.tui-content-middle {
	width: 100%;
	height: 200px;
	display: flex;
	box-sizing: border-box;
}

.tui-cropper-box {
	position: relative;
	/* transition-duration: 0.2s; */
	border-style: solid;
	border-width: 1rpx;
	box-sizing: border-box;
}

.tui-flex-auto {
	flex: auto;
}

.tui-cropper-image {
	width: 100%;
	border-style: none;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	transform-origin: center;
}

.tui-cropper-canvas {
	position: fixed;
	z-index: 10;
	left: -2000px;
	top: -2000px;
	pointer-events: none;
}

.tui-edge {
	border-style: solid;
	pointer-events: auto;
	position: absolute;
	box-sizing: border-box;
}

.tui-top-left {
	border-bottom-width: 0 !important;
	border-right-width: 0 !important;
}

.tui-top-right {
	border-bottom-width: 0 !important;
	border-left-width: 0 !important;
}

.tui-bottom-left {
	border-top-width: 0 !important;
	border-right-width: 0 !important;
}

.tui-bottom-right {
	border-top-width: 0 !important;
	border-left-width: 0 !important;
}

.tui-cropper-tabbar {
	width: 100%;
	height: 120rpx;
	padding: 0 40rpx;
	box-sizing: border-box;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 99;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #ffffff;
	font-size: 32rpx;
}

.tui-cropper-tabbar::after {
	content: ' ';
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	border-top: 1rpx solid rgba(255, 255, 255, 0.2);
	-webkit-transform: scaleY(0.5) translateZ(0);
	transform: scaleY(0.5) translateZ(0);
	transform-origin: 0 100%;
}

.tui-op-btn {
	height: 80rpx;
	display: flex;
	align-items: center;
}

.tui-rotate-img {
	width: 44rpx;
	height: 44rpx;
}
</style>
