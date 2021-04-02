<template>
	<view>
		<view style="position: absolute; top:40%; width: 100%;">
			<view style="width: 100%; text-align: center; font-size: 50px;">星奇视频</view>
			<button style="margin-top: 50px; width: 80%; height: 100%;" open-type="getUserInfo" @click="toIndex()">微信登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			toIndex() {
				uni.navigateTo({
					url: 'index'
				})
			}
		}
	}
</script>

<style>
	body {
		background-color: #aaffff;
	}
</style>
