<template>
<div class="container mx-auto flex-wrap content-start" :class="{'bg-gray-400': lockdata}">
	<!-- <div class="w-full m-5">
		<button type="button" class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" @click="setActiveTab(1)">Active 1</button>
		<button type="button" class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" @click="setActiveTab(2)">Active 2</button>
		<button type="button" class="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" @click="setActiveTab(3)">Active 3</button>
	</div>
	<insert-document v-if="activeTab === 1" :input="input" @writeToFirestore="writeTofireFirestore" @clearData="clearData"/>
	<all-document v-if="activeTab === 2" :bucket="bucket" @readToFirestore="readToFirestore"/>
	<search-document v-if="activeTab === 3" :input="input" :bucket="bucket" @searchByCode="searchByCode" @deleteToFirestore="deleteToFirestore"/> -->
	<!-- <div class="w-full">
		<div class="font-bold mb-4">Registros</div>
		<div class="border border-gray-400 bg-white rounded p-4 mb-3 flex flex-col justify-between leading-normal" v-for="(item, key) in bucket" :key="key">
			{{ item.id }} - {{ item.name }}
			<button @click="deleteTofireFirestore(item.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">delete</button>
		</div>
	</div> -->
	<div>
		<input type="text" v-model="input.name">
		<input type="file" name="avatar" @change="fileImagenChange" accept="image/png, image/jpeg">
		<img :src="urlImagen" alt="">
	</div>
</div>
</template>

<script>
import InsertDocument from '~/components/Home/InsertDocument.vue'
import GetAllDocuments from '~/components/Home/GetAllDocuments.vue'
import SearchDocument from '~/components/Home/SearchDocument.vue'

import { 
	fireFirestore,
	fireDatabase,
	fireStorage } from '@/plugins/firebase.js'

export default {
	data() {
		return {
			lockdata: false,
			input:{
				key: '',
				name: ''
			},
			bucket: [],
			activeTab: 1,
			urlImagen: null
		}
	},
	created() {
		this.syncRealTime()
	},
	methods: {
		fileImagenChange(evt) {
			/*
				TODO: Docs: https://firebase.google.com/docs/storage/web/upload-files?hl=es-419
			*/
			let vm 		 = this,
				file = evt.target.files[0],
				metadata = {
					contentType: 'image/jpeg'
				},
				uploadTask = fireStorage.ref().child('myfiles/'+file.name).put(file, metadata)

			uploadTask.on('state_changed', // or 'state_changed'
  				function(snapshot) {
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
					case 'paused': // or 'paused'
						console.log('Upload is paused');
						break;
					case 'running': // or 'running'
						console.log('Upload is running');
						break;
					}
  				}, function(error) {

				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				// switch (error.code) {
				// 	case 'storage/unauthorized':
				// 	// User doesn't have permission to access the object
				// 	break;

				// 	case 'storage/canceled':
				// 	// User canceled the upload
				// 	break;

				// 	...

				// 	case 'storage/unknown':
				// 	// Unknown error occurred, inspect error.serverResponse
				// 	break;
				// }
				}, function() {
				// Upload completed successfully, now we can get the download URL
				uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
					console.log('File available at', downloadURL);
					vm.urlImagen = downloadURL
				});
			});


			

			

			// new_file.name 	= 'Nuevaimagen1' 
			// console.log(new_file)
		},

		deleteTofireFirestore(key) {
			console.log('key', key)
			let ref = fireDatabase.ref('boxflow')
			ref.child(key).remove()
			.then( res => {
				console.log(res)
			})
			.catch(err => console.log(err))
		},
		syncRealTime() {
			let vm = this,
				ref = fireDatabase.ref('boxflow') // TODO: create reference

			vm.lockdata = true // TODO: lanzamos el loader

			ref.on('child_added', snap => {
				vm.bucket.push({...snap.val(), id: snap.key})
				vm.lockdata = false
			})

		},
		setActiveTab(idx){
			let vm = this
			vm.activeTab = idx
		},

		clearData() {
			let vm = this
			vm.input.key = ''
			vm.input.name = ''
		},

		async searchByCode() {
			let vm = this,
				ref = fireFirestore.collection("test").doc(vm.input.key)

			vm.clearData()
			ref.get().then(function(doc) {
				if (doc.exists) {
					vm.bucket.push({ key: doc.id, data: doc.data()})
				} else {
					// doc.data() will be undefined in this case
					alert("No such document!");
				}
			}).catch(function(error) {
				console.log("Error getting document:", error);
			});
			// .doc("SF")
		},

		async readToFirestore() {
			let vm = this,
				ref = fireFirestore.collection("test").get().then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					vm.bucket.push({ key: doc.id, data: doc.data()})
				})
			})
		},

		async editToFirestore(key) {
			// TODO: Edicion de documento
			let vm = this,
				ref = fireFirestore.collection("test"), // TODO: nombre de la colleccion donde vamos a insertar la data
				document = {
					name: vm.input.name
				}
			try {
				await ref.doc(key).set(document);
				vm.clearData()
				console.log('Todo OK')
			} catch (e) {
				// TODO: error handling
				console.error(e)
			}
		},

		async deleteToFirestore() {
			// TODO: Borrado de elemento
			// https://firebase.google.com/docs/firestore/manage-data/delete-data

			let vm = this,
				ref = fireFirestore.collection("test") // TODO: nombre de la colleccion donde vamos a insertar la data
			ref.doc(vm.input.key).delete().then(function() {
				console.log("Document successfully deleted!");
				vm.clearData()
			}).catch(function(error) {
				console.error("Error removing document: ", error);
			});
		},

		async writeTofireFirestore() {
			let vm = this,
				ref = fireDatabase.ref('boxflow').push() // TODO: nombre de la colleccion donde vamos a insertar la data
				ref.set({
					name: vm.input.name
				}) 
			// ref.add(document)
			.then(function(docRef) {
				console.log("Document written with ID: ", docRef.id);
				vm.clearData()
			})
			.catch(function(error) {
				console.error("Error adding document: ", error);
			});
		}
	},
	components: {
		'insert-document':InsertDocument,
		'all-document':GetAllDocuments,
		'search-document':SearchDocument
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
