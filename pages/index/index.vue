<template>
	<view>
		<view class="top">
			<view style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50px;" @click="handle(0)">
				<view class="top_div">关注</view>
				<view v-if="verticalIndex==0" style="width: 30px; height: 2px; background-color: #FFFFFF; margin-top: 4px;"></view>
				<view v-if="verticalIndex==1" style="width: 30px; height: 2px; margin-top: 4px;"></view>
			</view>
			<view style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 50px;" @click="handle(1)">
				<view class="top_div">推荐</view>
				<view v-if="verticalIndex==0" style="width: 30px; height: 2px; margin-top: 4px;"></view>
				<view v-if="verticalIndex==1" style="width: 30px; height: 2px; background-color: #FFFFFF; margin-top: 4px;"></view>
			</view>
			<view class="top_right">
				<navigator>
					<image src="../../static/image/sousuo.png" style="width: 25px;height: 25px;"></image>
				</navigator>
			</view>
		</view>
		<!-- 滑动 -->
		<!-- 关注 -->
		<swiper :style="{height: phoneHeight-50+'px'}" :current="verticalIndex" @change="handleVertical">
			<swiper-item>
				<swiper :interval="interval" :duration="duration" style="height: 100%;" :current="focus_videoIndex" vertical="true"
				 @change="focus_handleSlider">
					<block v-for="(item,index) in focus_vList" :key="index">
						<swiper-item>
							<view style="width: 100%; height: 100%">
								<view style="width: 100%; height: 100%" @click="focus_playPause(index)">
									<video v-if="(focus_imgList[index] == 0)" :id="'focus_video' + index" :src="ip+item.mediaUrl" :style="{width:100+'%',height: phoneHeight-50+'px'}"
									 :controls="false" objectFit="cover">
									</video>
									<image v-if="(focus_imgList[index] == 1)" :src="ip+item.mediaUrl" :style="{width: 100 + '%', height: phoneHeight + 'px'}"></image>
									<view id="bofang" class="bofang" v-show="focus_isbofang==0">
										<img src="../../static/image/bofang.png" style="width: 50px; height: 50px;"></img>
									</view>
								</view>
							</view>
							<view class="bottom_right">
								<view class="bottom_right_button">
									<view><img :src="item.photo" style="width: 40px; height: 40px; border-radius: 20px;" @click="toMine(item.userId,focus_fList[index],index,0)"></img></view>
									<view @click="focus_guanzhu(index)"><img v-show="focus_fList[index] == 0" class="guanzhu" src="../../static/image/guanzhu.png"
										 style="width: 15px; height: 15px"></img>
										<img v-if="focus_fList[index] == 1" class="guanzhu" src="../../static/image/dagou.png" style="width: 15px; height: 15px"></img></view>
								</view>
								<view @click="focus_dianzan(index)" class="bottom_right_button">
									<img v-show="(focus_lList[index] == 0)" src="../../static/image/weidianzan.png" style="width: 40px; height: 40px">
									<img v-show="(focus_lList[index] == 1)" src="../../static/image/yidianzan.png" style="width: 40px; height: 40px"></img>
									<view v-if="item.likeNumber==null" style="color: white; text-align: center;">0</view>
									<view v-if="item.likeNumber!=null" style="color: white; text-align: center;">{{item.likeNumber}}</view>
								</view>
								<view class="bottom_right_button">
									<img src="../../static/image/pinglun.png" style="width: 40px; height: 40px" @click="pinglun('open')"></img>
									<view v-if="item.commentNumber==null" style="color: white; text-align: center;">0</view>
									<view v-if="item.commentNumber!=null" style="color: white; text-align: center;">{{item.commentNumber}}</view>
								</view>
							</view>
							<view class="bottom_left">
								<view><span>@{{item.account}}</span></view>
								<view style="margin-top: 5px; margin-bottom: 5px;"><span>{{item.mediaIntroduce}}</span></view>
								<view style="display: flex;">
									<image style="width: 40px; height: 40px; margin-left: 10px;" src="../../static/image/yinyueinindex.png"></image>
									<view v-if="item.musicName!=null" style="font-size: 21px; color: #FFFFFF; margin-top: 3px;">{{item.musicName}}</view>
									<view v-else style="font-size: 21px; color: #FFFFFF; margin-top: 3px;">{{item.account}}制作的原声</view>
								</view>
							</view>
							<view class="bottom_right_yinyue">
								<img v-if="yinyue_img==1" class="yinyue_img" :src="item.musicPoster">
								<img v-if="yinyue_img==0" class="yinyue_img_paused" :src="item.musicPoster">
							</view>
						</swiper-item>
					</block>
				</swiper>
			</swiper-item>
			<!-- 推荐 -->
			<swiper-item>
				<swiper :interval="interval" :duration="duration" style="height: 100%;" :current="videoIndex" vertical="true"
				 @change="handleSlider">
					<block v-for="(item,index) in vList" :key="index">
						<swiper-item>
							<view style="width: 100%; height: 100%">
								<view style="width: 100%; height: 100%" @click="playPause(index)">
									<video v-if="(imgList[index] == 0)" :id="'video' + index" :src="ip+item.mediaUrl" :style="{width:100+'%',height: phoneHeight-50+'px'}"
									 :controls="false" objectFit="cover">
									</video>
									<image v-if="(imgList[index] == 1)" :src="ip+item.mediaUrl" :style="{width: 100 + '%', height: phoneHeight + 'px'}"></image>
									<view id="bofang" class="bofang" v-show="isbofang==0">
										<img src="../../static/image/bofang.png" style="width: 50px; height: 50px;"></img>
									</view>
								</view>
							</view>
							<view class="bottom_right">
								<view class="bottom_right_button">
									<view><img :src="item.photo" style="width: 40px; height: 40px; border-radius: 20px;" @click="toMine(item.userId,fList[index],index,1)"></img></view>
									<view @click="guanzhu(index)"><img v-show="fList[index] == 0" class="guanzhu" src="../../static/image/guanzhu.png"
										 style="width: 15px; height: 15px"></img>
										<img v-if="fList[index] == 1" class="guanzhu" src="../../static/image/dagou.png" style="width: 15px; height: 15px"></img></view>
								</view>
								<view @click="dianzan(index)" class="bottom_right_button">
									<img v-show="(lList[index] == 0)" src="../../static/image/weidianzan.png" style="width: 40px; height: 40px">
									<img v-show="(lList[index] == 1)" src="../../static/image/yidianzan.png" style="width: 40px; height: 40px"></img>
									<view v-if="item.likeNumber==null" style="color: white; text-align: center;">0</view>
									<view v-if="item.likeNumber!=null" style="color: white; text-align: center;">{{item.likeNumber}}</view>
								</view>
								<view class="bottom_right_button">
									<img src="../../static/image/pinglun.png" style="width: 40px; height: 40px" @click="pinglun('open')"></img>
									<view v-if="item.commentNumber==null" style="color: white; text-align: center;">0</view>
									<view v-if="item.commentNumber!=null" style="color: white; text-align: center;">{{item.commentNumber}}</view>
								</view>
							</view>
							<view class="bottom_left">
								<view><span>@{{item.account}}</span></view>
								<view style="margin-top: 5px; margin-bottom: 5px;"><span>{{item.mediaIntroduce}}</span></view>
								<view style="display: flex;">
									<image style="width: 40px; height: 40px; margin-left: 10px;" src="../../static/image/yinyueinindex.png"></image>
									<view v-if="item.musicName!=null" style="font-size: 21px; color: #FFFFFF; margin-top: 3px;">{{item.musicName}}</view>
									<view v-else style="font-size: 21px; color: #FFFFFF; margin-top: 3px;">{{item.account}}制作的原声</view>
								</view>
							</view>
							<view class="bottom_right_yinyue">
								<img v-if="yinyue_img==1" class="yinyue_img" :src="item.musicPoster">
								<img v-if="yinyue_img==0" class="yinyue_img_paused" :src="item.musicPoster">
							</view>
						</swiper-item>
					</block>
				</swiper>
			</swiper-item>
		</swiper>
		<view class="drawer_attr_box" v-if="showModalStatus">
			<!--drawer content-->
			<view v-if="verticalIndex==1">
				<view v-if="vList[videoIndex].commentNumber==null" class="total_comment">0 条评论</view>
				<view v-if="vList[videoIndex].commentNumber!=null" class="total_comment">{{vList[videoIndex].commentNumber}} 条评论</view>			
			</view>			
			<view v-else>
				<view v-if="focus_vList[focus_videoIndex].commentNumber==null" class="total_comment">0 条评论</view>
				<view v-if="focus_vList[focus_videoIndex].commentNumber!=null" class="total_comment">{{focus_vList[focus_videoIndex].commentNumber}} 条评论</view>			
			</view>			
			<view style="width: 30px; height: 30px;">
				<image @click="pinglun('close')" class="guanbi" src="../../static/image/guanbi.png"></image>
			</view>
			<view class="drawer_content">
				<block v-for="(item,index) in commentList" :key="index">
					<view style="display: flex;">
						<image :src="item.photo" style="width: 30px; height: 30px; border-radius: 15px; margin-right: 10px;"></image>
						<view style="display: flex; flex-direction: column;" @click="toPersion(item)">
							<view style="font-size: 15px; margin-bottom: 5px;">{{item.account}}</view>
							<view style="font-size: 20px; margin-bottom: 5px;">{{item.comment}}</view>
						</view>
						<view @click="dianzanInComment(index,0)" style="position: absolute; right: 20px; display: flex; flex-direction: column;">
							<image v-if="zeroOneCList[index][0]==0" src=../../static/image/weidianzanincomment.png style="width: 25px; height: 25px"></image>
							<image v-if="zeroOneCList[index][0]==1" src=../../static/image/yidianzan.png style="width: 25px; height: 25px"></image>
							<view v-if="item.countLikeComment==null" style="color: #000000; text-align: center;">0</view>
							<view v-if="item.countLikeComment!=null" style="color: #000000; text-align: center;">{{item.countLikeComment}}</view>
						</view>
					</view>
					<block v-for="(items,indexs) in commentList[index].secondCommentList" :key="indexs">
						<view style="display: flex; margin-left: 50px; margin-top: 10px; margin-bottom: 10px;">
							<image :src="items.photo" style="width: 30px; height: 30px; border-radius: 15px; margin-right: 10px;"></image>
							<view style="display: flex; flex-direction: column;" @click="toPersion(items)">
								<view style="font-size: 15px; margin-bottom: 5px;">{{items.account}} -> {{items.beUserAccount}}</view>
								<view style="font-size: 20px; margin-bottom: 5px;">{{items.comment}}</view>
							</view>
							<view @click="dianzanInComment(index,indexs+1)" style="position: absolute; right: 20px; display: flex; flex-direction: column;">
								<image v-if="zeroOneCList[index][indexs+1]==0" src=../../static/image/weidianzanincomment.png style="width: 25px; height: 25px"></image>
								<image v-if="zeroOneCList[index][indexs+1]==1" src=../../static/image/yidianzan.png style="width: 25px; height: 25px"></image>
								<view v-if="items.countLikeComment==null" style="color: #000000; text-align: center;">0</view>
								<view v-if="items.countLikeComment!=null" style="color: #000000; text-align: center;">{{items.countLikeComment}}</view>
							</view>
						</view>
					</block>
				</block>
				<view class="bottom_comment">
					<input class="action_comment" :style="{width: phoneWidth - 100 + 'px'}" @input="onKeyInput" :placeholder="replyInfo" />
					<button style="background-color:#ff007f; position: absolute; right: 0; height: 40px; width: 80px; color: #FFFFFF;"
					 @click="reply()">回复</button>
				</view>
			</view>
		</view>
		<view class="bottom" v-if="userId == ''">
			<view class="bottom_div">
				<navigator @click="refresh()">首页</navigator>
			</view>
			<view class="bottom_div">
				<button class="button_img" plain="true" open-type="getUserInfo" lang="zh_CN" @click="toTakeVideo()"></button>
			</view>
			<view class="bottom_div">
				<navigator @click="toMine()">我</navigator>
			</view>
		</view>
		<view class="bottom_comment" v-if="userId != ''">
			<input class="action_comment" :style="{width: phoneWidth - 100 + 'px'}" @input="onKeyInput" :placeholder="replyInfo" />
			<button style="background-color:#ff007f; position: absolute; right: 0; height: 40px; width: 80px; color: #FFFFFF;"
			 @click="reply()">回复</button>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/index.js'
	export default {
		data() {
			return {
				ip: "http://127.0.0.1:8080",
				// ip: "http://47.112.224.214:8080",
				isplay: true,
				focus_isplay: true,
				isbofang: 1,
				focus_isbofang: 1,
				phoneHeight: 0,
				phoneWidth: 0,
				yidianzan: 0,
				yiguanzhu: 0,
				showModalStatus: false,
				bottomMask: true,
				vList: [],
				focus_vList: [],
				videoIndex: 0,
				focus_videoIndex: 0,
				imgList: [],
				focus_imgList: [],
				yinyue_img: 1, //0暂停 1播放
				userId: "",
				mediaIdList: "",
				focus_mediaIdList: "",
				userIdList: "",
				focus_userIdList: "",
				likeList: [],
				focus_likeList: [],
				focusList: [],
				focus_focusList: [],
				beFocusList: [],
				lList: [],
				focus_lList: [],
				fList: [],
				focus_fList: [],
				cList: [],
				commentList: [],
				zeroOneCList: [
					[]
				],
				replyInfo: "留下你的精彩评论吧",
				beUserId: "",
				lastCommentId: 0,
				uploadTask: [],
				verticalIndex: 1
			}
		},
		onReady: function(res) {
			// 计算屏幕剩余高度  填补剩余高度
			var _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.phoneHeight = res.windowHeight;
					_this.phoneWidth = res.windowWidth;
					console.log(_this.phoneHeight);
				}
			});
			this.listMedias();
		},
		onLoad: function(res) {
			this.login();
			//若是从mine跳转过来，则获取数据
			if (res.userId != null) {
				this.userId = res.userId;
				this.videoIndex = res.videoIndex;
			}
		},
		onUnload: function() {
			this.destory();
		},
		onShow: function() {
			this.fList = this.$common.fList ;
			this.focus_fList = this.$common.focus_fList;
			this.$forceUpdate();
		},
		methods: {
			listMedias() {
				// 获取媒体列表
				request.listMedias({
					userId: this.userId
				}).then(data => {
					console.log(data)
					this.vList = data.data;
					this.initMedia();
				});
			},
			focus_listMedias() {
				// 获取媒体列表
				request.listMedias({
					userId: this.beFocusList
				}).then(data => {
					console.log('focus_listMedias',data)
					this.focus_vList = data.data;
					this.focus_initMedia();
					this.focus_queryLikeMediaBusinessId();
				});
			},
			listFocusUserIds() {
				// 获取关注用户列表
				request.listFocusUserIds({
					focusUserId: uni.getStorageSync('currentUserId')
				}).then(data => {
					console.log(data.data)
					let beFocusUserIdList = data.data,
						flag = 0;
					this.beFocusList = [];
					//将被关注人的编号用，连接
					for (let i = 0; i < beFocusUserIdList.length; i++) {
						if (flag == 0) {
							this.beFocusList += beFocusUserIdList[i].beFocusUserId;
						} else {
							this.beFocusList = this.beFocusList + ',' + beFocusUserIdList[i].beFocusUserId;
						}
					}
					console.log(this.beFocusList)
					this.focus_listMedias();
				})
			},
			login() {
				// 获取用户信息
				var self = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						console.log(infoRes);
						uni.login({
							provider: 'weixin',
							success: function(loginRes) {
								console.log(loginRes)
								request.login({
									code: loginRes.code
								}).then(data => {
									console.log(data);
									//由于以openid作唯一标识当用户主键，所以检验表中是否有该主键
									if (data.code == "10000") {
										uni.setStorageSync('currentUserId', data.data);
										//若没有,则添加该用户到表中
										request.addUser({
											userId: data.data,
											account: infoRes.userInfo.nickName,
											name: infoRes.userInfo.nickName,
											photo: infoRes.userInfo.avatarUrl,
											password: "123456",
											sex: infoRes.userInfo.gender,
											role: "0"
										}).then(data => {
											console.log(data);
											self.queryLikeMediaBusinessId();
											self.queryFocusUserBusinessId();
											self.listFocusUserIds();
											self.focus_queryLikeMediaBusinessId();
										});
									} else {
										uni.setStorageSync('currentUserId', data.data.userId);
										self.queryLikeMediaBusinessId();
										self.queryFocusUserBusinessId();
										self.listFocusUserIds();
										self.focus_queryLikeMediaBusinessId();
									}
								});
							}
						})
					},
					fail() {
						console.log('getUserInfo_fail')
					}
				})
			},
			// 初始化视频信息
			initMedia() {
				this.videoContextList = [];
				this.audioContextList = [];
				this.imgList = [];
				for (var i = 0; i < this.vList.length; i++) {
					// 初始化imgList，01数组，1代表是照片
					let tmpUrl = this.vList[i].mediaUrl;
					console.log(tmpUrl)
					let tmp = tmpUrl.split(".");
					if (tmp[1] == "mp4") {
						this.imgList.push(0);
					} else {
						this.imgList.push(1);
					}
					this.videoContextList.push(uni.createVideoContext('video' + i, this))
					// 有配音则加配音
					if (this.vList[i].musicUrl == '') {
						this.audioContextList.push('')
					} else {
						let innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.src = this.ip + this.vList[i].musicUrl;
						this.audioContextList.push(innerAudioContext)
					}
					//将每个mediaUrl放入mediaIdList中
					if (i == 0) {
						this.mediaIdList += this.vList[i].mediaId;
						this.userIdList += this.vList[i].userId;
					} else {
						this.mediaIdList = this.mediaIdList + ',' + this.vList[i].mediaId;
						this.userIdList = this.userIdList + ',' + this.vList[i].userId;
					}
				}
				this.videoContextList[this.videoIndex].play();
				this.audioContextList[this.videoIndex].play();
			},
			// 初始化视频信息（关注）
			focus_initMedia() {
				this.focus_videoContextList = [];
				this.focus_audioContextList = [];
				this.focus_imgList = [];
				for (var i = 0; i < this.focus_vList.length; i++) {
					// 初始化imgList，01数组，1代表是照片
					let tmpUrl = this.focus_vList[i].mediaUrl;
					console.log(tmpUrl)
					let tmp = tmpUrl.split(".");
					if (tmp[1] == "mp4") {
						this.focus_imgList.push(0);
					} else {
						this.focus_imgList.push(1);
					}
					this.focus_videoContextList.push(uni.createVideoContext('focus_video' + i, this))
					// 有配音则加配音
					if (this.focus_vList[i].musicUrl == '') {
						this.focus_audioContextList.push('')
					} else {
						let innerAudioContext = uni.createInnerAudioContext();
						innerAudioContext.src = this.ip + this.focus_vList[i].musicUrl;
						this.focus_audioContextList.push(innerAudioContext)
					}
					//将每个mediaUrl放入mediaIdList中
					if (i == 0) {
						this.focus_mediaIdList += this.focus_vList[i].mediaId;
						this.focus_userIdList += this.focus_vList[i].userId;
					} else {
						this.focus_mediaIdList = this.focus_mediaIdList + ',' + this.focus_vList[i].mediaId;
						this.focus_userIdList = this.focus_userIdList + ',' + this.focus_vList[i].userId;
					}
					this.focus_queryFocusUserBusinessId();
				}
			},
			handleSlider(e) { // 滑动切换
				let curIndex = e.detail.current;
				if (this.videoIndex >= 0) {
					this.videoContextList[this.videoIndex].pause();
					this.videoContextList[this.videoIndex].seek(0);
					if (this.audioContextList[this.videoIndex] != '') {
						this.audioContextList[this.videoIndex].pause();
						this.audioContextList[this.videoIndex].seek(0);
					}
					this.isbofang = 1;
				}
				if (curIndex === this.videoIndex + 1) { // 下一个
					this.videoContextList[this.videoIndex + 1].play();
					if (this.audioContextList[this.videoIndex + 1] != '') {
						this.audioContextList[this.videoIndex + 1].play();
					}
				} else if (curIndex === this.videoIndex - 1) { // 上一个
					this.videoContextList[this.videoIndex - 1].play();
					if (this.audioContextList[this.videoIndex - 1] != '') {
						this.audioContextList[this.videoIndex - 1].play();
					}
				}
				this.videoIndex = curIndex;
			},
			focus_handleSlider(e) { // 滑动切换(关注)
				console.log(e)
				let curIndex = e.detail.current;
				if (this.focus_videoIndex >= 0) {
					this.focus_videoContextList[this.focus_videoIndex].pause();
					this.focus_videoContextList[this.focus_videoIndex].seek(0);
					if (this.focus_audioContextList[this.focus_videoIndex] != '') {
						this.focus_audioContextList[this.focus_videoIndex].pause();
						this.focus_audioContextList[this.focus_videoIndex].seek(0);
					}
					this.focus_isbofang = 1;
				}
				if (curIndex === this.focus_videoIndex + 1) { // 下一个
					this.focus_videoContextList[this.focus_videoIndex + 1].play();
					if (this.focus_audioContextList[this.focus_videoIndex + 1] != '') {
						this.focus_audioContextList[this.focus_videoIndex + 1].play();
					}
				} else if (curIndex === this.focus_videoIndex - 1) { // 上一个
					this.focus_videoContextList[this.focus_videoIndex - 1].play();
					if (this.focus_audioContextList[this.focus_videoIndex - 1] != '') {
						this.focus_audioContextList[this.focus_videoIndex - 1].play();
					}
				}
				this.focus_videoIndex = curIndex;
			},
			handleVertical(e){
				console.log(e)
				let curIndex = e.detail.current;
				if(curIndex == 0){// 推荐->关注
					this.videoContextList[this.videoIndex].pause();
					this.videoContextList[this.videoIndex].seek(0);
					if (this.audioContextList[this.videoIndex] != '') {
						this.audioContextList[this.videoIndex].pause();
						this.audioContextList[this.videoIndex].seek(0);
					}
					this.isbofang = 1;
					this.focus_videoContextList[this.focus_videoIndex].play();
					if (this.focus_audioContextList[this.focus_videoIndex] != '') {
						this.focus_audioContextList[this.focus_videoIndex].play();
					}
				}else{// 关注->推荐
					this.focus_videoContextList[this.focus_videoIndex].pause();
					this.focus_videoContextList[this.focus_videoIndex].seek(0);
					if (this.focus_audioContextList[this.focus_videoIndex] != '') {
						this.focus_audioContextList[this.focus_videoIndex].pause();
						this.focus_audioContextList[this.focus_videoIndex].seek(0);
					}
					this.focus_isbofang = 1;
					this.videoContextList[this.videoIndex].play();
					if (this.audioContextList[this.videoIndex] != '') {
						this.audioContextList[this.videoIndex].play();
					}
				}
				this.verticalIndex = curIndex;
			},
			// 播放与暂停
			playPause(index) {
				if (this.isplay) {
					this.videoContextList[index].pause();
					this.audioContextList[index].pause();
					this.isplay = false;
					this.isbofang = 0;
					this.yinyue_img = 0;
				} else {
					this.videoContextList[index].play();
					this.audioContextList[index].play();
					this.isplay = true;
					this.isbofang = 1;
					this.yinyue_img = 1;
				}
			},
			focus_playPause(index) {
				if (this.focus_isplay) {
					this.focus_videoContextList[index].pause();
					this.focus_audioContextList[index].pause();
					this.focus_isplay = false;
					this.focus_isbofang = 0;
					this.focus_yinyue_img = 0;
				} else {
					this.focus_videoContextList[index].play();
					this.focus_audioContextList[index].play();
					this.focus_isplay = true;
					this.focus_isbofang = 1;
					this.focus_yinyue_img = 1;
				}
			},
			// 我的
			toMine(userId, status, index, current) {
				if (userId == null) {
					userId = uni.getStorageSync('currentUserId');
				}
				this.destory();
				uni.navigateTo({
					url: 'mine?userId=' + userId + '&status=' + status + '&index=' + index + '&current=' + current
				});
			},
			destory() {
				if (this.audioContextList[this.videoIndex] != null) {
					this.audioContextList[this.videoIndex].pause();
					this.audioContextList[this.videoIndex].seek(0);
				}
				if (this.focus_audioContextList[this.focus_videoIndex] != null) {
					this.focus_audioContextList[this.focus_videoIndex].pause();
					this.focus_audioContextList[this.focus_videoIndex].seek(0);
				}
			},
			refresh() {
				uni.redirectTo({
					url: 'index'
				});
			},
			queryLikeMediaBusinessId() { //查该用户是否喜欢每个媒体（红心的点亮与否）
				this.lList = [];
				request.queryLikeMediaBusinessId({
					userId: uni.getStorageSync('currentUserId'),
					mediaId: this.mediaIdList
				}).then(data => {
					this.likeList = data.data;
					for (let i = 0; i < this.vList.length; i++) {
						let flag = 0;
						for (let j = 0; j < this.likeList.length; j++) {
							if (this.vList[i].mediaId == this.likeList[j].mediaId) {
								flag = 1;
								break;
							}
						}
						if (flag == 1) { //01数据，0表示当前用户未喜欢该媒体，1反之
							this.lList.push(1);
						} else {
							this.lList.push(0);
						}
					}
				});
			},
			focus_queryLikeMediaBusinessId() { //查该用户是否喜欢每个媒体（红心的点亮与否）(关注)
				this.focus_lList = [];
				request.queryLikeMediaBusinessId({
					userId: uni.getStorageSync('currentUserId'),
					mediaId: this.focus_mediaIdList
				}).then(data => {
					this.focus_likeList = data.data;
					for (let i = 0; i < this.focus_vList.length; i++) {
						let flag = 0;
						for (let j = 0; j < this.focus_likeList.length; j++) {
							if (this.focus_vList[i].mediaId == this.focus_likeList[j].mediaId) {
								flag = 1;
								break;
							}
						}
						if (flag == 1) { //01数据，0表示当前用户未喜欢该媒体，1反之
							this.focus_lList.push(1);
						} else {
							this.focus_lList.push(0);
						}
					}
				});
			},
			queryFocusUserBusinessId() { //查该用户是否关注每个媒体的用户
				let userId = uni.getStorageSync('userId');
				request.queryFocusUserBusinessId({
					focusUserId: uni.getStorageSync('currentUserId'),
					userId: this.userIdList
				}).then(data => {
					this.focusList = data.data;
					this.fList = [];
					this.$common.fList = [];
					for (let i = 0; i < this.vList.length; i++) {
						let flag = 0;
						for (let j = 0; j < this.focusList.length; j++) {
							if (this.vList[i].userId == this.focusList[j].beFocusUserId) {
								flag = 1;
								break;
							}
						}
						if (flag == 1) { //01数据，0表示当前用户未关注该媒体，1反之
							this.fList.push(1);
						} else if (userId == this.vList[i].userId) {
							this.fList.push(-1);
						} else {
							this.fList.push(0);
						}
					}
					this.$common.fList = this.fList;
				})
			},
			focus_queryFocusUserBusinessId() { //查该用户是否关注每个媒体的用户（关注）
				let userId = uni.getStorageSync('userId');
				request.queryFocusUserBusinessId({
					focusUserId: uni.getStorageSync('currentUserId'),
					userId: this.focus_userIdList
				}).then(data => {
					this.focus_focusList = data.data;
					this.focus_fList = [];
					this.$common.focus_fList = [];
					for (let i = 0; i < this.focus_vList.length; i++) {
						let flag = 0;
						for (let j = 0; j < this.focus_focusList.length; j++) {
							if (this.focus_vList[i].userId == this.focus_focusList[j].beFocusUserId) {
								flag = 1;
								break;
							}
						}
						if (flag == 1) { //01数据，0表示当前用户未关注该媒体，1反之
							this.focus_fList.push(1);
						} else if (userId == this.focus_vList[i].userId) {
							this.focus_fList.push(-1);
						} else {
							this.focus_fList.push(0);
						}
					}
					this.$common.focus_fList = this.focus_fList;
				})
			},
			// 拍视频
			toTakeVideo() {
				this.destory();
				uni.navigateTo({
					url: 'takeVideo'
				})
			},
			guanzhu(index) { // 关注
				var self = this;
				if (this.fList[index] == 0) { //未关注->已关注
					this.fList[index] = 1;
					this.$forceUpdate();
					request.addFocusUserBusiness({
						focusUserId: uni.getStorageSync('currentUserId'),
						beFocusUserId: self.vList[index].userId
					}).then(data => {
						self.fList = []
						self.queryFocusUserBusinessId();
					})
				} else { //已关注->取消关注
					this.fList[index] = 0;
					this.$forceUpdate();
					request.deleteFocusUserBusiness({
						focusUserId: uni.getStorageSync('currentUserId'),
						beFocusUserId: this.vList[index].userId
					}).then(data => {
						self.fList = []
						self.queryFocusUserBusinessId();
					})
				}
			},
			focus_guanzhu(index) { // 关注
				var self = this;
				if (this.focus_fList[index] == 0) { //未关注->已关注
					this.focus_fList[index] = 1;
					this.$forceUpdate();
					request.addFocusUserBusiness({
						focusUserId: uni.getStorageSync('currentUserId'),
						beFocusUserId: self.focus_vList[index].userId
					}).then(data => {
						self.focus_fList = []
						self.focus_queryFocusUserBusinessId();
					})
				} else { //已关注->取消关注
					this.focus_fList[index] = 0;
					this.$forceUpdate();
					request.deleteFocusUserBusiness({
						focusUserId: uni.getStorageSync('currentUserId'),
						beFocusUserId: this.focus_vList[index].userId
					}).then(data => {
						self.focus_fList = []
						self.focus_queryFocusUserBusinessId();
					})
				}
			},
			pinglun(currentStatu) {
				console.log(currentStatu);
				//关闭抽屉
				if (currentStatu == "close") {
					this.showModalStatus = false;
					this.bottomMask = true;
					this.lastCommentId = 0;
					this.beUserId = "";
					this.replyInfo = "留下你的精彩评论吧";
				}
				// 显示抽屉
				if (currentStatu == "open") {
					this.showModalStatus = true;
					this.bottomMask = false;
					this.listComment();
				}
				console.log(this.showModalStatus)
			},
			listComment() {
				let mediaId;
				if(this.verticalIndex == 0){
					mediaId = this.focus_vList[this.focus_videoIndex].mediaId
				}else{
					mediaId = this.vList[this.videoIndex].mediaId
				}
				//获取评论列表
				request.listComments({
					mediaId: mediaId
				}).then(data => {
					this.commentList = data.data.list;
					//将评论编号用，连接
					let commentIdList = "",
						flag = 0;
					for (let i = 0; i < this.commentList.length; i++) {
						if (flag == 0) {
							commentIdList += this.commentList[i].commentId;
							flag = 1;
						} else {
							commentIdList = commentIdList + "," + this.commentList[i].commentId;
						}
						for (let j = 0; j < this.commentList[i].secondCommentList.length; j++) {
							if (flag == 0) {
								commentIdList += this.commentList[i].secondCommentList[j].commentId;
								flag = 1;
							} else {
								commentIdList = commentIdList + "," + this.commentList[i].secondCommentList[j].commentId;
							}
						}
					}
					//获取点赞评论
					request.queryLikeCommentBusinessId({
						userId: uni.getStorageSync('currentUserId'),
						commentId: commentIdList
					}).then(data => {
						console.log(data.data)
						this.cList = data.data;
						this.initComment();
					})
				})
			},
			initComment() { //初始化评论信息
				this.zeroOneCList = [
					[]
				];
				for (let i = 0; i < this.commentList.length; i++) {
					let flag = 0,
						tmp = [];
					for (let k = 0; k < this.cList.length; k++) {
						if (this.commentList[i].commentId == this.cList[k].commentId) {
							flag = 1;
							break;
						}
					}
					if (flag == 1) {
						tmp.push(1);
					} else {
						tmp.push(0);
					}
					for (let j = 0; j < this.commentList[i].secondCommentList.length; j++) {
						flag = 0;
						for (let k = 0; k < this.cList.length; k++) {
							if (this.commentList[i].secondCommentList[j].commentId == this.cList[k].commentId) {
								flag = 1;
								break;
							}
						}
						if (flag == 1) {
							tmp.push(1);
						} else {
							tmp.push(0);
						}
					}
					this.zeroOneCList[i] = tmp;
				}
				console.log(this.zeroOneCList)
			},
			dianzan(index) { // 点赞
				if (this.lList[index] == 0) { //未点赞->已点赞
					this.lList[index] = 1;
					this.vList[index].likeNumber = (parseInt(this.vList[index].likeNumber == null ? '0' : this.vList[index].likeNumber) +
						1).toString();
					this.$forceUpdate();
					request.addLikeMediaBusiness({
						likeUserId: uni.getStorageSync('currentUserId'),
						mediaId: this.vList[index].mediaId
					}).then(data => {
						console.log(data)
					})
				} else { //已点赞->取消点赞
					this.lList[index] = 0;
					this.vList[index].likeNumber = (parseInt(this.vList[index].likeNumber == null ? '0' : this.vList[index].likeNumber) -
						1).toString();
					this.$forceUpdate();
					request.deleteLikeMediaBusiness({
						likeUserId: uni.getStorageSync('currentUserId'),
						mediaId: this.vList[index].mediaId
					}).then(data => {
						console.log(data)
					})
				}
			},
			focus_dianzan(index) { // 点赞
				if (this.focus_lList[index] == 0) { //未点赞->已点赞
					this.focus_lList[index] = 1;
					this.focus_vList[index].likeNumber = (parseInt(this.focus_vList[index].likeNumber == null ? '0' : this.focus_vList[index].likeNumber) +
						1).toString();
					this.$forceUpdate();
					request.addLikeMediaBusiness({
						likeUserId: uni.getStorageSync('currentUserId'),
						mediaId: this.focus_vList[index].mediaId
					}).then(data => {
						console.log(data)
					})
				} else { //已点赞->取消点赞
					this.focus_lList[index] = 0;
					this.focus_vList[index].likeNumber = (parseInt(this.focus_vList[index].likeNumber == null ? '0' : this.focus_vList[index].likeNumber) -
						1).toString();
					this.$forceUpdate();
					request.deleteLikeMediaBusiness({
						likeUserId: uni.getStorageSync('currentUserId'),
						mediaId: this.focus_vList[index].mediaId
					}).then(data => {
						console.log(data)
					})
				}
			},
			dianzanInComment(i, j) { //在评论中点赞
				console.log(i, j)
				if (this.zeroOneCList[i][j] == 0) { //未点赞->已点赞
					this.zeroOneCList[i][j] = 1;
					let commentId;
					if (j == 0) {
						commentId = this.commentList[i].commentId;
						this.commentList[i].countLikeComment = (parseInt(this.commentList[i].countLikeComment == null ? '0' : this.commentList[
							i].countLikeComment) + 1).toString();
					} else {
						commentId = this.commentList[i].secondCommentList[j - 1].commentId;
						this.commentList[i].secondCommentList[j - 1].countLikeComment = (parseInt(this.commentList[i].secondCommentList[j -
							1].countLikeComment == null ? '0' : this.commentList[i].secondCommentList[j - 1].countLikeComment) + 1).toString();
					}
					console.log(commentId)
					this.$forceUpdate();
					request.addLikeCommentBusiness({
						likeUserId: uni.getStorageSync('currentUserId'),
						commentId: commentId
					}).then(data => {
						console.log(data)
					})
				} else { //已点赞->取消点赞
					this.zeroOneCList[i][j] = 0;
					let commentId;
					if (j == 0) {
						commentId = this.commentList.commentId;
						this.commentList[i].countLikeComment = (parseInt(this.commentList[i].countLikeComment == null ? '0' : this.commentList[
							i].countLikeComment) - 1).toString();
					} else {
						commentId = this.commentList[i].secondCommentList[j - 1].commentId;
						this.commentList[i].secondCommentList[j - 1].countLikeComment = (parseInt(this.commentList[i].secondCommentList[j -
							1].countLikeComment == null ? '0' : this.commentList[i].secondCommentList[j - 1].countLikeComment) - 1).toString();
					}
					this.$forceUpdate();
					request.deleteLikeCommentBusiness({
						likeUserId: uni.getStorageSync('currentUserId'),
						commentId: commentId
					}).then(data => {
						console.log(data)
					})
				}
			},
			onKeyInput: function(event) {
				this.content = event.target.value
			},
			toPersion(info) {
				console.log(info)
				this.lastCommentId = info.lastCommentId == 0 ? info.commentId : info.lastCommentId;
				this.beUserId = info.userId;
				this.replyInfo = "回复" + info.account;
				this.$forceUpdate();
			},
			reply() {
				request.actionMediaComment({
					userId: uni.getStorageSync('currentUserId'),
					mediaId: this.vList[this.videoIndex].mediaId,
					lastCommentId: this.lastCommentId,
					beUserId: this.beUserId,
					comment: this.content
				}).then(data => {
					console.log(data)
					uni.showToast({
						title: '评价成功',
						duration: 2000
					})
					this.pinglun('close')
					this.vList[this.videoIndex].commentNumber = (parseInt(this.vList[this.videoIndex].commentNumber == null ? '0' :
						this.vList[this.videoIndex].commentNumber) + 1).toString();
					this.$forceUpdate();
				})
			},
			handle(status) {
				this.verticalIndex = status;
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}

	.top_div {
		width: 50px;
		font-size: 21px;
		text-align: center;
		color: rgb(255, 255, 255);
		font-weight: 600;
	}

	.bottom_div {
		width: 33.3%;
		font-size: 21px;
		text-align: center;
		color: rgb(233, 13, 13);
		font-weight: 600;
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

	p {
		margin: 0;
		padding: 0;
		font-size: 16px;
	}

	navigator {
		color: rgb(255, 255, 255);
		font-weight: 600;
	}

	.top {
		/* 固定定位 */
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 100%;
		height: 50px;
	}

	.top_swiper {
		/* 固定定位 */
		z-index: 999;
		position: fixed;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		width: 25%;
		height: 50px;
	}

	.top_right {
		position: absolute;
		right: 0;
		top: 0;
		width: 50px;
		height: 50px;
		text-align: center;
		display: flex;
		align-items: center;
	}

	.bofang {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 40px;
		height: 40px;
		margin-top: -20px;
		margin-left: -20px;
		display: block;
		touch-action: none;

	}

	.bottom_right {
		width: 55px;
		height: 30%;
		position: absolute;
		right: 0;
		bottom: 160px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
	}

	.bottom_left {
		width: 100%;
		height: 100px;
		position: absolute;
		left: 0;
		bottom: 25px;
	}

	.bottom_right_button {
		margin: 10px 0;
		position: relative;
	}

	.bottom_right_yinyue {
		position: absolute;
		right: 0;
		margin: 10px;
	}

	.guanzhu {
		position: absolute;
		bottom: -5px;
		left: 30%;
	}

	span {
		font-size: 21px;
		font-weight: 500;
		color: white;
		padding-left: 15px;
		line-height: 30px;
	}

	.middle {
		position: relative;
		bottom: 45rpx;
	}

	.button_img {
		width: 50px;
		height: 50px;
		background: url("../../static/image/tianjia.png") center no-repeat;
		background-size: cover;
	}

	/*button*/
	.btn {
		width: 80%;
		padding: 20rpx 0;
		border-radius: 10rpx;
		text-align: center;
		margin: 40rpx 10%;
		background: #0C1939;
		color: #fff;
	}

	/*content*/
	.drawer_attr_box {
		width: 100%;
		overflow: hidden;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 1001;
		background: #fff;
	}

	.drawer_content {
		padding: 20rpx 40rpx;
		height: 1000rpx;
		overflow-y: scroll;
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
		right: 10px;
		top: 10px;
	}

	.total_comment {
		width: 100px;
		height: 25px;
		position: absolute;
		left: 50%;
		top: 15px;
		margin-left: -40px;
	}

	.bottom_comment {
		width: 100%;
		height: 50px;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #ffffff;
	}

	.action_comment {
		margin: 10px;
	}

	.yinyue_img {
		width: 60px;
		height: 60px;
		border-radius: 30px;
		-webkit-animation: round_animate 5s linear infinite;
		animation: round_animate 5s linear infinite;
		animation-play-state: running;
	}

	.yinyue_img_paused {
		width: 60px;
		height: 60px;
		border-radius: 30px;
	}

	@keyframes round_animate {
		to {
			transform: rotate(1turn);
		}
	}
</style>
