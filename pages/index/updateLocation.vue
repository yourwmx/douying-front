<template>
	<view>
		<block v-for="(item,index) in locationInfo" :key="index">
			<view style="margin: 20px; display: flex;" @click="toUpdataLocation(index)">
				<text>{{item.v}}</text>
				<image class="jiantou" src="../../static/image/jiantou.png"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import request from '../../utils/updateLocation.js'
	export default {
		data() {
			return {
				lastClassifyId: "",
				locationInfo: {},
				userInfo: {}
			}
		},
		onLoad: function(res) {
			this.lastClassifyId = res.lastClassifyId;
			this.userInfo = JSON.parse(decodeURIComponent(res.userInfo));
			this.querySiteLocalClassify();
		},
		methods: {
			querySiteLocalClassify() {
				request.querySiteLocalClassify({
					lastClassifyId: this.lastClassifyId
				}).then(data => {
					console.log(data)
					this.locationInfo = data.data
					//是否为最后一级
					if(data.data.length == 0){
						request.updateUserById({
							lastModifiedBy: uni.getStorageSync('currentUserId'),
							userId: this.userInfo.userId,
							account: this.userInfo.account,
							douyinId: this.userInfo.douyinId,
							selfIntroduce: this.userInfo.selfIntroduce,
							sex: this.userInfo.sex,
							birthday: this.userInfo.birthday,
							locationId: this.lastClassifyId,
							backgroundUrl: this.info.backgroundUrl,
							version: this.userInfo.version
						}).then(data => {
							uni.navigateBack({
							})
						});
					}
				})
				
			},
			toUpdataLocation(index) {
				this.lastClassifyId = this.locationInfo[index].dictionaryId;
				uni.redirectTo({
					url: 'updateLocation?lastClassifyId=' + this.lastClassifyId + "&userInfo=" + encodeURIComponent(JSON.stringify(this.userInfo)) 
				})
			}
		}
	}
</script>

<style>
	body {
		background-color: #000000;
	}

	text {
		color: #FFFFFF;
		font-weight: 600;
		margin: 10px;
	}

	.jiantou {
		position: absolute;
		right: 10px;
		width: 20px;
		height: 20px;
		margin: 10px;
	}
</style>
