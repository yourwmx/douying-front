<template>
	<view>
		<view width="100%">
			<video id="video" v-if="(imgSrc == 0)" :src="src" :autoplay="true" :controls="false" :style="{width: 100 + '%', height: phoneHeight - 40 + 'px'}"
			 objectFit="cover"></video>
			<image v-if="(imgSrc == 1)" :src="src" :style="{width: 100 + '%', height: phoneHeight - 40 + 'px'}"></image>
			<cover-view class="xuanzeyinyue"></cover-view>
			<cover-image class="yinyue" src="../../static/image/yinyue.png" @click="pinglun('open')"></cover-image>
			<cover-view class="xuanze" @click="drawer('open')">选择音乐</cover-view>
			<view class="media_introduce" v-if="!showModalStatus">
				<input v-show="bottomMask" :style="{margin: 10 + 'px', color: '#FFFFFF', width: phoneWidth - 100 + 'px'}" @input="onKeyInput"
				 placeholder-style="color:#fff" placeholder="留下你的作品介绍吧" />
				<button style="background-color:#ff007f; position: absolute; right: 0; height: 40px; width: 80px; color: #FFFFFF;"
				 @click="uploadfile()">发布</button>
			</view>
		</view>
		<view class="drawer_attr_box" v-if="showModalStatus">
			<view class="drawer_content">
				<radio-group @change="radioChange">
					<label v-for="item in items" style="display: flex;">
						<view class="drawer_radio">
							<radio :value="item.musicId+' '+item.musicUrl" :checked="item.checked" />
						</view>
						<audio style="text-align: left" :src="ip+item.musicUrl" :poster="item.musicPoster" :name="item.musicName" :author="item.musicAuthor"
						 controls></audio>
					</label>
				</radio-group>
			</view>
			<view class="drawer_bottom">
				<button :style="{width: phoneWidth/2 + 'px'}" @click="merge()">确定</button>
				<button :style="{width: phoneWidth/2 + 'px'}" @click="drawer('close')">取消</button>
			</view>
		</view>
	</view>

</template>

<script>
	import request from '../../utils/takeVideo.js'
	export default {
		data() {
			return {
				ip: "http://127.0.0.1:8080",
				// ip: "http://47.112.224.214:8080",
				src: "",
				thumbTempFilePath: "",
				fileType: "",
				imgSrc: "",
				phoneHeight: 0,
				phoneWidth: 0,
				percent: 0,
				showModalStatus: false,
				bottomMask: true,
				items: [],
				mergeMusicId: "",
				mergeMusicUrl: "",
				mediaDuration: 0,
				inputValue: ""
			}
		},
		onLoad: function(res) {
			var self = this;
			uni.chooseMedia({
				mediaType: ['image','video'],
				sourceType: ['camera', 'album'],
				sizeType: ['original'],
				count: 1, //默认9
				success: function(res) {
					if(res.type != null && res.type == 'image'){//image
						self.imgSrc = 1;
						self.thumbTempFilePath = res.tempFiles[0].tempFilePath;
					}else{//video
						self.thumbTempFilePath = res.tempFiles[0].thumbTempFilePath; //封面图片
					}
					self.src = res.tempFiles[0].tempFilePath;
					self.fileType = res.type;
				}
			});
		},
		onReady: function(res) {
			this.videoContext = uni.createVideoContext('video', this);
			// 计算屏幕剩余高度  填补剩余高度
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.phoneHeight = res.windowHeight;
					_this.phoneWidth = res.windowWidth;
				}
			});
		},
		methods: {
			uploadfile() {
				// 判断是否有作品介绍
				if (this.inputValue == "") {
					uni.showToast({
						title: '请输入作品介绍',
						icon: 'none'
					});
					return;
				}
				var self = this;
				//先将临时缩略图文件上传
				uni.uploadFile({
					url: self.ip + '/pc/media/addMedia',
					filePath: self.thumbTempFilePath,
					name: 'file',
					formData: {
						userId: uni.getStorageSync('currentUserId'),
						isMediaThumb: 1
					},
					success: (res) => {
						console.log('uploadthumb success')
						// 返回该文件的编号
						console.log(res.data)
						//将返回的系统路径重新写入
						console.log('here', self.thumbTempFilePath)
						//再上传文件
						const uploadTask = uni.uploadFile({
							url: self.ip + '/pc/media/addMedia',
							filePath: self.src,
							fileType: self.fileType,
							name: 'file',
							formData: {
								userId: uni.getStorageSync('currentUserId'),
								musicId: self.mergeMusicId,
								mediaIntroduce: self.inputValue,
								mediaThumb: res.data,
								isMediaThumb: 0
							},
							success: (res) => {
								console.log('uploadFile success')
								console.log(res.data)
							},
							fail: (err) => {
								console.log('uploadFile fail')
							}
						});
						uploadTask.onProgressUpdate((res) => {
							this.percent = res.progress
							uni.showLoading({
								title: '上传中...',
								mask: true
							});
							console.log('上传进度' + res.progress);
							if (res.progress == 100) {
								uni.hideToast()
								setTimeout(function() {
									uni.navigateTo({
										url: 'index'
									})
								}, 2000)
							}
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						});
					},
					fail: (f)=> {
						console.log('f')
					}
				});
			},
			drawer(currentStatu) {
				console.log(currentStatu);
				//关闭抽屉
				if (currentStatu == "close") {
					this.showModalStatus = false;
					this.bottomMask = true;
				}
				// 显示抽屉
				if (currentStatu == "open") {
					this.showModalStatus = true;
					this.bottomMask = false;
					this.listMusics();
				}
				console.log(this.showModalStatus)
			},
			listMusics() {
				// 加载音乐列表
				request.listMusics({}).then(data => {
					console.log(data);
					this.items = data.data;
					console.log(data.data)
				});
			},
			radioChange: function(e) {
				console.log(e.target.value);
				let item = e.target.value;
				let newItem = item.split(" ");
				console.log(newItem)
				this.mergeMusicId = newItem[0];
				this.mergeMusicUrl = this.ip + newItem[1];
			},
			merge() {
				if (this.mergeMusicUrl == "") {
					uni.showToast({
						title: '请选择音乐',
						icon: 'none'
					});
					return;
				}
				this.drawer("close");
				console.log(this.src);
				console.log(this.mergeMusicUrl);
				// 创建背景音乐
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.mergeMusicUrl;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				console.log(innerAudioContext.duration)
			},
			onKeyInput: function(event) {
				this.inputValue = event.target.value
				console.log(this.inputValue)
			}
		}
	}
</script>

<style>
	.yinyue {
		height: 30px;
		width: 30px;
		display: flex;
		position: absolute;
		top: 50px;
		left: 50%;
		margin-left: -60px;
		/*左移动本身宽度的1/2以保证绝bai对水平居中*/
	}

	.xuanze {
		height: 50px;
		width: 100px;
		display: flex;
		position: absolute;
		top: 50px;
		left: 50%;
		font-size: 20px;
		color: #ffffff;
		margin-left: -15px;
		/*左移动本身宽度的1/2以保证绝bai对水平居中*/
	}

	.fanhui {
		/* height: 100px;
		width: 100px; */
		display: flex;
		position: absolute;
		bottom: 50px;
		left: 50px;
	}

	.queding {
		height: 100px;
		width: 100px;
		display: flex;
		position: absolute;
		bottom: 50px;
		right: 50px;
	}

	/*content*/
	.drawer_attr_box {
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1001;
		background: #55ffff;
	}

	.drawer_content {
		padding: 20rpx 40rpx;
		height: 1000rpx;
		overflow-y: scroll;
		position: relative;
		top: 20px;
	}

	.init {
		width: 100%;
		height: 50px;
		text-align: center;
		font-size: 30px;
		margin: 5px;
	}

	.init_quxiao {
		width: 100%;
		height: 50px;
		text-align: center;
		font-size: 20px;
		margin: 5px;
	}

	.init_drawer_content {
		padding: 20rpx 40rpx;
		height: 300rpx;
		position: relative;
	}

	.drawer_title {
		padding: 20rpx;
		font: 42rpx "microsoft yahei";
		text-align: center;
	}

	.line {
		border-bottom: 1px solid #f8f8f8;
	}

	.guanbi {
		width: 25px;
		height: 25px;
		position: absolute;
		left: 10px;
		top: 10px;
	}

	.init_guanbi {
		width: 25px;
		height: 25px;
		position: absolute;
		right: 10px;
		top: 10px;
	}

	.xuanzeyinyue {
		position: absolute;
		top: 40px;
		left: 32%;
		width: 150px;
		height: 45px;
		border-radius: 20px;
		background-color: #787878;
	}

	.drawer_radio {
		margin-top: 20px;
		margin-right: 20px;
	}

	.drawer_bottom {
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.media_introduce {
		position: absolute;
		display: flex;
		bottom: 0;
		height: 40px;
		width: 100%;
		background-color: #808080;
	}
</style>
