<template>
	<div>
		hola
		<button 
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			type="button"
			@click="firebaseLogout()">
			logout
		</button>
	</div>
</template>

<script>
import { fireAuth } from '@/plugins/firebase.js'
import { logoutFirebase } from '@/plugins/firefunctions.js'

export default {
	layout: 'admin',
	methods: {
		// logoutFirebase() {
		// 	let vm = this
		// 	// vm.$store.dispatch('signOut')
		// 	fireAuth.signOut().then(function() {
		// 		vm.$store.commit('setUser',null)
		// 		vm.$router.push('/login')
		// 		// Sign-out successful.
		// 	}).catch(function(error) {
		// 		// An error happened.
				
				
		// 	});
		// },
		async firebaseLogout(payload) {
            let vm = this
			await logoutFirebase(vm.$store.dispatch('clearToken'))
			if(!vm.getToken) vm.$router.push('/login')
        }
	}

}
</script>

<style>

</style>