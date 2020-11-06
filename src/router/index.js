import Vue from 'vue'
import Router from 'vue-router'


import search from '@/views/search/search'
import index from '@/views/index'
import numRoll from '@/views/numRoll'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/search',
			name: 'search',
			component: search
		},
		{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/numRoll',
			name: 'numRoll',
			component: numRoll
		}
	]
})
