<template>
	<DLayout>
		<template slot="nav_logo">
	  		<a href="/">
	    		<img :src="Logo" alt="Logo de la empresa" style="width: 150px;padding: 10px;">
	  		</a>
		</template>
		<template slot="nav_menu">
			<MenuList :list="list"></MenuList>
		</template>

		<template slot="user_letters">
		</template>
		<template slot="left_bar">
	    	<!-- <MultilevelList :list="computedList"></MultilevelList> -->
		</template>
		<template slot="body">
	   		<nuxt />
		</template>
    	<template slot="footer">
      		<DFooter :footer="footer"></DFooter>
    	</template>
	</DLayout>
</template>
<script>
import { mapGetters } from 'vuex'
import data from '@/assets/js/layout_info.js'

export default {
	middleware: 'validate-auth',
	data() {
		return {
			Logo: '',//require('@/assets/img/logo.svg'),
			list: data.list_menu,
			footer: data.footer,
		}
	},
	methods:{
	}
  
}
</script>

<style>	
</style>
