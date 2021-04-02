<template>
	<view>
		<view class="top">
			<img :src="info.photo" class="imgs"></img>
		</view>
		<view>
			<view class="infos" @click="toUpdata('名字',info.account,'','')">
				<text>名字</text>
				<text class="datas">{{info.account}}</text>
				<image class="jiantou" src="../../static/image/jiantou.png"></image>
			</view>
			<view class="infos" @click="toUpdata('抖音号','',info.douyinId,'')">
				<text>抖音号</text>
				<text class="datas">{{info.douyinId}}</text>
				<image class="jiantou" src="../../static/image/jiantou.png"></image>
			</view>
			<view class="infos" @click="toUpdata('简介','','',info.selfIntroduce)">
				<text>简介</text>
				<text class="datas">{{info.selfIntroduce}}</text>
				<image class="jiantou" src="../../static/image/jiantou.png"></image>
			</view>
			<view class="infos" @click="toUpdataSex()">
				<text>性别</text>
				<text class="datas">{{sexName}}</text>
				<image class="jiantou" src="../../static/image/jiantou.png"></image>
			</view>
			<view class="drawer_attr_box" v-if="showModalStatus">
				<view class="drawer_content">
					<view class="drawer_title" @click="updataSex('0')">男</view>
					<view class="drawer_title" @click="updataSex('1')">女</view>
				</view>
			</view>
			<view class="infos">
				<text>生日</text>
				<picker mode="date" :value="info.birthday" @change="bindDateChange">
					<text class="datas">{{info.birthday}}</text>
				</picker>
				<image class="jiantou" src="../../static/image/jiantou.png"></image>
			</view>
			<view class="infos" @click="toUpdateLocation()">
				<text>地区</text>
				<text class="datas">{{info.locationCity}}</text>
				<image class="jiantou" src="../../static/image/jiantou.png"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import request from '../../utils/editData.js'
	export default {
		data() {
			return {
				userId: "",
				phoneHeight: 0,
				phoneWidth: 0,
				info: {},
				showModalStatus: false,
				sexName: '',
				sexList: [{
						'value': 0,
						'label': '男'
					},
					{
						'value': 1,
						'label': '女'
					}
				]
			}
		},
		onLoad: function(res) {
			this.userId = res.userId;
			this.findUserById();
		},
		onShow: function(res) {
			this.findUserById();
		},
		onReady: function(res) {
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
			findUserById() {
				var self = this;
				// 获取个人信息
				request.findUserById({
					userId: uni.getStorageSync('currentUserId')
				}).then(data => {
					console.log(data)
					this.info = data.data
					for (var i = 0; i < this.sexList.length; i++) {
						if (this.info.sex == this.sexList[i].value) {
							this.sexName = this.sexList[i].label;
						}
					}
				});
			},
			toUpdata(title, account, douyinId, selfIntroduce) {
				uni.navigateTo({
					url: 'update?userInfo=' + encodeURIComponent(JSON.stringify(this.info)) + '&title=' + title + '&account=' +
						account + "&douyinId=" + douyinId + "&selfIntroduce=" + selfIntroduce
				});
			},
			toUpdataSex() {
				this.showModalStatus = true;
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
					photo: this.info.photo,
					version: this.info.version
				}).then(data => {
					uni.redirectTo({
						url: 'editData?userId=' + this.info.userId
					})
				});
			},
			updataSex(sex) {
				this.showModalStatus = false;
				this.info.sex = sex;
				this.updateUserById();
			},
			bindDateChange: function(e) {
				this.info.birthday = e.target.value
				this.updateUserById();
			},
			toUpdateLocation() {
				uni.navigateTo({
					url: "updateLocation?lastClassifyId=0&userInfo=" + encodeURIComponent(JSON.stringify(this.info))
				})
			}
		}
	}
</script>

<style>
	body {
		background-color: #000000;
	}

	.top {
		display: flex;
		text-align: center;
		align-items: center;
		flex-direction: column;
	}

	text {
		color: #FFFFFF;
		font-weight: 600;
		margin: 10px;
	}

	.imgs {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-left: 25px;
		margin-right: 25px;
		margin-top: 25px;
	}

	.infos {
		display: flex;
		margin: 25px;
	}

	.datas {
		position: absolute;
		right: 35px;
	}

	.jiantou {
		position: absolute;
		right: 10px;
		width: 20px;
		height: 20px;
		margin: 10px;
	}

	.drawer_attr_box {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(177, 177, 177, 0.8);
		z-index: 100;
	}

	.drawer_content {
		background-color: #FFFFFF;
		position: absolute;
		top: 50%;
		margin-top: -200rpx;
		left: 10%;
		width: 80%;
		height: 250rpx;
	}

	.drawer_title {
		padding: 20rpx;
		margin: 10px;
		font: 42rpx "microsoft yahei";
		text-align: center;
	}
</style>
