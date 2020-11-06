<template>
	<div class="search">
		<!-- 搜索组件 -->
		<!-- 搜索左边区域 -->
		<div class="search_left" v-on:click="onScan">
			<svg t="1603079258925" class="Scan-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3909"
			 width="16" height="16">
				<path d="M124 385.1h-64V199.8c0-74.2 59.4-134.6 132.4-134.6h187.6v64H192.3c-37.7 0-68.4 31.7-68.4 70.6v185.3zM955.9 385.1h-64V199.8c0-38.9-30.7-70.6-68.4-70.6H635.9v-64h187.6c73 0 132.4 60.4 132.4 134.6v185.3zM380 961.2H192.3c-73 0-132.4-60.4-132.4-134.6V641.4h64v185.3c0 38.9 30.7 70.6 68.4 70.6h187.6v63.9zM823.5 961.2H635.9v-64h187.6c37.7 0 68.4-31.7 68.4-70.6V641.4h64v185.3c0 74.1-59.4 134.5-132.4 134.5zM992 546.4h-960c-17.7 0-32-14.3-32-32s14.3-32 32-32h960c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
				 fill="#ffffff" p-id="3910"></path>
			</svg>
		</div>
		<!-- 搜索区域 -->
		<div class="search_input">
			<div class="search_input_icon">
				<svg t="1590583132901" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2822"
				 width="200" height="200">
					<path d="M908.6 883.1l-155-155c28.1-30.9 50.5-66 66.8-104.4 19.3-45.6 29-94 29-143.9 0-49.9-9.8-98.3-29-143.9-18.6-44-45.3-83.5-79.2-117.5-33.9-33.9-73.5-60.6-117.5-79.2-45.6-19.3-94-29-143.9-29-49.9 0-98.3 9.8-143.9 29-44 18.6-83.5 45.3-117.5 79.2s-60.6 73.5-79.2 117.5c-19.3 45.6-29 94-29 143.9 0 49.9 9.8 98.3 29 143.9 18.6 44 45.3 83.5 79.2 117.5s73.5 60.6 117.5 79.2c45.6 19.3 94 29 143.9 29 49.9 0 98.3-9.8 143.9-29 38.5-16.3 73.6-38.7 104.4-66.8l155 155c3.5 3.5 8.1 5.3 12.7 5.3s9.2-1.8 12.7-5.3c7.1-7.1 7.1-18.5 0.1-25.5z m-428.8-69.7c-184 0-333.6-149.7-333.6-333.6 0-184 149.7-333.6 333.6-333.6 184 0 333.6 149.7 333.6 333.6 0 184-149.6 333.6-333.6 333.6z"
					 p-id="2823"></path>
				</svg>
			</div>
			<input type="text" placeholder="请输入内容" ref="inputValue">
		</div>
		<!-- 搜索又边区域 -->
		<div class="search_right" v-on:click="onSearch">搜索</div>
	</div>
</template>

<script>
export default {
  components: {

  },
  methods: {
    onSearch () {
      if (this.$refs.inputValue.value !== '') {
        // console.log(this.$refs.inputValue.value)
        this.$emit('inputValue', this.$refs.inputValue.value)
      }
    },
    onScan () {
      this.$emit('scanValue')
    }
  }
}
</script>

<style scoped lang="scss">
	.search {
		display: flex;
		align-items: center;
		padding: 0.2rem;
		background: pink;
	}
	/* 搜索左边区域 */
	.search_left {
		display: flex;
		align-items: center;
		width: 15%;
		height: 100%;
	}

	/* 搜索区域 */
	.search_input {
		width: 80%;
		height: 100%;
		border-radius: 50px;
		display: flex;
		overflow: hidden;
		background: #fff;
	}

	/* 搜索图标 */
	.search_input_icon {
		width: 12%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* =====================svg样式代码====================== */
	.icon {
		width: 80%;
		height: 80%;
	}
	.Scan-icon{
		width: 50%;
		height: 80%;
	}
	/* =========================================== */

	/* input框 */
	.search_input input {
		width: 100%;
		border: none;
		/* input在获得焦点时外边框不变色 */
		outline: none;
	}

	/* 搜索右边区域 */
	.search_right {
		width: 15%;
		height: 100%;
		font-size: 0.3rem;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	input {
		font-size: 0.3rem;
	}
</style>
