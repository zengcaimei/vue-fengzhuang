<template>
	<div class="hello">
		<van-swipe :autoplay="3000" style="height: 4rem;">
			<van-swipe-item v-for="(image, index) in images" :key="index">
				<van-image width="375" height="100%" fit="cover" lazy-load :src="image.imgurl" />
			</van-swipe-item>
		</van-swipe>
		<el-upload class="avatar-uploader" action="/zcmIp/api/user/upload" :show-file-list="false" :on-success="handleAvatarSuccess"
		 :before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>

	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Lazyload
	} from 'vant';
	import {
		Image as VanImage
	} from 'vant';

	Vue.use(VanImage);
	Vue.use(Lazyload);
	import {
		Uploader
	} from 'vant'
	import {
		postUploadAPI,
		getListAPI
	} from '@/api/api'
	export default {
		data() {
			return {
				imageUrl: '',
				images: [
					'https://img.yzcdn.cn/vant/apple-1.jpg',
					'https://img.yzcdn.cn/vant/apple-2.jpg',
				],
			}
		},
		created() {
			this.getList()
		},
		methods: {
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw)
				console.log(res)
				console.log(file)
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg'
				const isLt2M = file.size / 1024 / 1024 < 2

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!')
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!')
				}
				return isJPG && isLt2M
				console.log(file)
			},
			getList() {
				getListAPI().then(res => {
					console.log(res)
					this.images = res.data
				})
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.van-swipe {
		width: 100%;
	}

	img {
		width: 100%;
		height: 100%;
	}
</style>
