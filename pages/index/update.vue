<template>
	<view style="margin: 20px;">
		<view style="font-size: medium;">我的{{title}}</view>
		<input :style="{width: phoneWidth - 40 + 'px'}" @input="onKeyInput" :value="content" />
		<button :style="{width: phoneWidth - 40 + 'px'}" type="warn" @click="updateUserById()">保存</button>
	</view>
</template>

<script>
	import request from '../../utils/update.js'
	export default {
		data() {
			return {
				info: {},
				title: "",
				content: "",
				account: "",
				douyinId: "",
				selfIntroduce: "",
				phoneHeight: 0,
				phoneWidth: 0
			}
		},
		onLoad: function(res) {
			this.info = JSON.parse(decodeURIComponent(res.userInfo));
			this.title = res.title;
			if (res.account != '') {
				this.account = res.account;
				this.content = res.account;
			} else if (res.douyinId != '') {
				this.douyinId = res.douyinId;
				this.content = res.douyinId;
			} else if (res.selfIntroduce != '') {
				this.selfIntroduce = res.selfIntroduce;
				this.content = res.selfIntroduce;
			}
		},
		onReady: function() {
			let _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.phoneHeight = res.windowHeight;
					_this.phoneWidth = res.windowWidth;
				}
			});
		},
		methods: {
			updateUserById() {
				if (this.account != '') {
					this.info.account = this.content;
				} else if (this.douyinId != '') {
					this.info.douyinId = this.content;
				} else if (this.selfIntroduce != '') {
					this.info.selfIntroduce = this.content;
				}
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
					uni.navigateBack({
					})
				});
			},
			onKeyInput: function(event) {
				this.content = event.target.value
			}
		}
	}
</script>

<style>
	body {
		background-color: #000000;
		color: #FFFFFF;
	}

	input {
		margin-top: 30px;
		margin-bottom: 30px;
		font-size: large;
	}

	button {
		text-align: center;
	}
</style>
