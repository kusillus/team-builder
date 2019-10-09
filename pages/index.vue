<template>
	<div class="container">
		<div>
			{{writeSuccessful}}
		</div>
		<div>
			<button @click="writeToFirestore">Write Text</button>
		</div>
		
	</div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { fireDb, database } from '@/plugins/firebase.js'

export default {
	data() {
		return {
			writeSuccessful: false
		}
	},
	mounted() {
		this.readToFirestore()
	},
	methods: {
		async readToFirestore() {
			let ref = fireDb.collection("test").doc("test"),
				snap = null

			try {
				snap = await ref.get()
				console.log('snap',snap.data().text)
				// await ref.set(document)
			} catch (e) {
				// TODO: error handling
				console.error(e)
			}
			this.writeSuccessful = true
		},
		async writeToFirestore() {
			let ref = fireDb.collection("test").doc("test"),
				snap = null

			try {
				snap = await ref.get()
				console.log('snap',snap.data().text)
				// await ref.set(document)
			} catch (e) {
				// TODO: error handling
				console.error(e)
			}
			this.writeSuccessful = true
		}
	},
	components: {
		Logo
	}
	}
	</script>

	<style>
	/* Sample `apply` at-rules with Tailwind CSS
	.container {
	@apply min-h-screen flex justify-center items-center text-center mx-auto;
	}
	*/
	.container {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	}

	.title {
	font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
		'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
	display: block;
	font-weight: 300;
	font-size: 100px;
	color: #35495e;
	letter-spacing: 1px;
	}

	.subtitle {
	font-weight: 300;
	font-size: 42px;
	color: #526488;
	word-spacing: 5px;
	padding-bottom: 15px;
	}

	.links {
	padding-top: 15px;
	}
	</style>
