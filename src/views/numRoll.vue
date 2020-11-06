<template>
	<div>
		<computeNumber :time="1" :value="allCount"></computeNumber>
	</div>
</template>

<script>
	import computeNumber from '@/components/compute-number/compute-number.vue'
	export default {
		components: {
			computeNumber
		},
		data() {
			return {
				allCount:1905
			}
		},
		methods: {

		},
	}
</script>

<style scoped>

</style>
