<template>
	<view class="body_view">
		<view class="top_view">
			<img :src="info.backgroundUrl" style="width: 100%; height: 200rpx" @click="toUpdateBackgroundUrl()"></img>
		</view>
		<view class="middle_view">
			<view class="top_line">
				<view class="touxiang">
					<view>
						<img :src="info.photo" style="width: 50px; height: 50px; border-radius: 25px;"></img>
					</view>
				</view>
				<view class="bianji">
					<button v-if="userId == currentUserId" plain="true" size="mini" style="color: #FFFFFF; background-color: #808080;" @click="toEditData()">编辑资料</button>
					<view v-if="userId != currentUserId" @click="guanzhu(status)">
						<button v-if="status == 0" plain="true" size="mini" style="color: #FFFFFF; background-color: #ff007f;">关注</button>
						<button v-if="status == 1" plain="true" size="mini" style="color: #FFFFFF; background-color: #808080;">取消关注</button>					
					</view>
				</view>
			</view>
			<view style="height: 40px;"></view>
			<view class="nichen">
				<view>
					<navigator>{{info.account}}</navigator>
				</view>
				<view>
					<navigator>抖音号：{{info.douyinId}}</navigator>
				</view>
				<view>
					<navigator>{{info.selfIntroduce}}</navigator>
				</view>
			</view>
			<view class="line">
				<view>
					<navigator>{{info.locationCity}}</navigator>
				</view>
				<view>
					<navigator>{{info.age}}岁</navigator>
				</view>
			</view>
			<view class="line">
				<view>
					<navigator>0获赞</navigator>
				</view>
				<view>
					<navigator>176关注</navigator>
				</view>
				<view>
					<navigator>1粉丝</navigator>
				</view>
			</view>
		</view>
		<view class="line">
			<view class="zuoping">
				<navigator>作品{{mediaInfoList.length}}</navigator>
			</view>
			<view class="zuoping">
				<navigator>喜欢0</navigator>
			</view>
		</view>
		<view class="medias">
			<block v-for="(item,index) in mediaInfoList" :key="index">
				<view style="width: 32%; margin-left: 1%; margin-top: 1%;">
					<view style="position: relative;">
						<image style="width: 100%;" :src="item.mediaThumb" @click="toIndex(index)"></image>
						<view style="display: flex; position: absolute; bottom: 0; left: 10px;">
							<view><image src="../../static/image/weidianzan.png" style="width: 20px; height: 20px;"></image></view>
							<view v-if="item.likeNumber == null" style="color: #FFFFFF; margin-left: 5px;">0</view>
							<view v-if="item.likeNumber != null" style="color: #FFFFFF; margin-left: 5px;">{{item.likeNumber}}</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/mine.js'
	export default {
		data() {
			return {
				// ip: "http://127.0.0.1:8080",
				ip: "http://120.25.107.83:8080",
				info: {},
				mediaInfoList: {},
				userId: 0,
				currentUserId: 0,
				status: 0,
				index: 0,
				current: 0
			}
		},
		onLoad: function(res) {
			if(res.status != null){
				this.status = res.status;
				this.index = res.index;
				this.current = res.current;
			}
			this.userId = res.userId;
			this.currentUserId = uni.getStorageSync('currentUserId');
			this.findUserById();
		},
		methods: {
			findUserById(userId) {
				var self = this;
				// 获取个人信息
				request.findUserById({
					userId: this.userId
				}).then(data => {
					console.log(data)
					this.info = data.data
					this.mediaInfoList = data.data.mediaInfoList
				});
			},
			toEditData() {
				uni.navigateTo({
					url: 'editData?userId=' + this.info.userId
				});
			},
			toIndex(videoIndex) {
				uni.navigateTo({
					url: 'index?userId=' + this.info.userId + '&videoIndex=' + videoIndex
				});
			},
			// 拍视频
			toTakeVideo() {
				uni.navigateTo({
					url: 'takeVideo'
				})
			},
			chooseImage() {
				var self = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图
					success: function(res) {
						console.log(res.tempFilePaths[0]);
						uni.uploadFile({
							url: self.ip + '/pc/media/addMedia',
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'file',
							formData: {
								userId: uni.getStorageSync('currentUserId'),
								isMediaThumb: 1
							},
							success: (res) => {
								console.log('uploadFile success')
								console.log(res.data)
								self.info.backgroundUrl = res.data;
								self.updateUserById();
							}
						});
					}
				});
			},
			updateUserById() {
				request.updateUserById({
					lastModifiedBy: uni.getStorageSync('currentUserId'),
					userId: this.info.userId,
					account: this.info.account,
					douyinId: this.info.douyinId,
					selfIntroduce: this.info.selfIntroduce,
					sex: this.info.sex,
					birthday: this.info.birthday,
					locationId: this.info.locationId,
					backgroundUrl: this.info.backgroundUrl,
					version: this.info.version
				}).then(data => {
					uni.redirectTo({
						url: 'mine'
					})
				});
			},
			toUpdateBackgroundUrl() {
				this.chooseImage();
			},
			guanzhu(status) { // 关注
				console.log(status)
				if (status == 0) {//未关注->已关注
					this.status = 1;
					if(this.current == 0){//改变全局变量（用户对每个用户是否关注）
						this.$common.setFocus_fList(this.index, 1);
					}else if(this.current == 1){
						this.$common.setfList(this.index, 1);
					}
					this.$forceUpdate();
					request.addFocusUserBusiness({
						focusUserId: this.currentUserId,
						beFocusUserId: this.userId
					}).then(data=> {
						console.log(data)
					})
				} else {//已关注->取消关注
					this.status = 0;
					if(this.current == 0){//改变全局变量（用户对每个用户是否关注）
						this.$common.setFocus_fList(this.index, 0);
					}else if(this.current == 1){
						this.$common.setfList(this.index, 0);
					}
					this.$forceUpdate();
					request.deleteFocusUserBusiness({
						focusUserId: this.currentUserId,
						beFocusUserId: this.userId
					}).then(data=> {
						console.log(data)
					})
				}
			}
		}
	}
</script>

<style>
	body {
		background-color: #000000;
	}

	navigator {
		color: rgb(255, 255, 255);
		font-weight: 600;
		margin: 10px;
	}

	.body_view {
		background-color: black;
		margin: 0;
	}

	.top_div {
		width: 100%;
		height: 10%;
	}

	.middle_div {
		margin: 10px;
		height: 45%;
	}

	.touxiang {
		margin-left: 10px;
		margin-right: 10px;
	}

	.bianji {
		display: flex;
		align-items: center;
	}

	.nichen {
		margin: 5px;
	}

	.top_line {
		position: absolute;
		top: 80px;
		display: flex;
		flex-direction: row;
	}

	.line {
		margin: 2px;
		display: flex;
		flex-direction: row;
	}

	.zuoping {
		width: 50%;
		height: 45%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.medias {
		display: flex;
		flex-wrap: wrap;
	}
	
	.bottom {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #3B4144;
	}
	
	.bottom_div {
		width: 33.3%;
		font-size: 21px;
		text-align: center;
		color: rgb(233, 13, 13);
		font-weight: 600;
	}
	
	.button_img {
		width: 50px;
		height: 50px;
		background: url("../../static/image/tianjia.png") center no-repeat;
		background-size: cover;
	}
</style>
