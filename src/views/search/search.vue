<template>
	<div>
		<Serach v-on:inputValue="inputValue" v-on:scanValue="scanValue" />
		<div class="nullTip" v-if="dtWinNumberInfos.length == 0">{{nullTip}}</div>
		<van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
			<van-list v-model="isUpLoading" :finished="upFinished" :immediate-check="false" :offset="offset" finished-text="我是有底线的"
			 @load="onLoadList">
				<div v-if="dtWinNumberInfos.length > 0" class="allcontent">
					<div v-for="(i, index) in dtWinNumberInfos" :key="index">
						<van-card :desc="i.productName" :title="i.currentName" :thumb="i.photodUrl || 'https://img.yzcdn.cn/vant/ipad.jpeg'" />
					</div>
				</div>
			</van-list>
		</van-pull-refresh>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk';
	import Serach from '@/components/SearchBar/SearchBar.vue'
	import {
		Toast
	} from 'vant';
	import {
		postListAPI,
		getSignAPI
	} from '@/api/api'
	import {
		Notify
	} from 'vant';
	export default {
		components: {
			Serach
		},
		data() {
			return {
				value: '',
				nullTip: '空空如也~',
				pageSize: 10, // 每页条数
				pageIndex: 0, // 页码
				dtWinNumberInfos: [], // 请求数据
				isDownLoading: false, // 下拉刷新
				isUpLoading: false, // 上拉加载
				upFinished: false, // 上拉加载完毕
				offset: 100 // 滚动条与底部距离小于 offset 时触发load事件
			}
		},
		methods: {
			inputValue(inpVal) {
				console.log(inpVal)
				this.value = inpVal
				this.pageIndex = 0
				this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
				this.getroadList()
			},
			scanValue() {
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				console.log(isWeixin)
				if (isWeixin){
					const _self = this
					const params = {
						url: location.href.split('#')[0]
					}
					getSignAPI(params).then(res=>{
						console.log(res)
						if (res.data.code == 0) {
							wx.config({
								debug: false,
								appId: res.data.appId,
								nonceStr: res.data.nonceStr,
								signature: res.data.signature,
								timestamp: res.data.timestamp,
								jsApiList: [
									'checkJsApi',
									'scanQRCode'
								]
							});
							wx.ready(res => {
								wx.checkJsApi({
									jsApiList: ['scanQRCode'],
									success: function(res) {
										console.log(res)
									}
								});
								wx.scanQRCode({
									needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
									scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
									success: function(res) {
										var str = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
										console.log("扫描结果：" + str);
										// var str = "http://192.168.100.100:915/open/getConfig?id=1gfdgf2&code=123"
										// window.location.href = str; //因为我这边是扫描后有个链接，然后跳转到该页面
									}
								});
						
							})
						} else {
							console.log('请求出错')
						}
					})
				}else{
					Toast('请在微信中打开该网站，否则无法正常使用')
				}
			},
			onDownRefresh() {
				this.pageIndex = 0
				this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
				this.getroadList() // 加载数据
			},
			// 上拉加载请求方法
			onLoadList() {
				this.pageIndex++
				this.getroadList()
			},
			getroadList() {
				const _self = this
				const params = {
					name: this.value,
					page: this.pageIndex,
					size: this.pageSize
				}
				postListAPI(params).then(res => {
					var rows = []
					if (res.data.data == null) {
						rows = []
					} else {
						rows = res.data.data.data
					}
					if (rows == null || rows.length === 0) {
						// 加载结束
						_self.upFinished = true
						return
					}
					if (rows.length < this.pageSize) {
						// 最后一页不足10条的情况
						_self.upFinished = true
					}
					// 处理数据
					if (_self.pageIndex === 0) {
						_self.dtWinNumberInfos = rows
					} else {
						_self.dtWinNumberInfos = _self.dtWinNumberInfos.concat(rows)
					}

				}).catch(err => {
					console.log(err)
					Notify({
						type: 'warning',
						message: '获取资源列表异常{' + err + '}'
					});
				}).finally(() => {
					_self.isDownLoading = false
					_self.isUpLoading = false
				})
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
