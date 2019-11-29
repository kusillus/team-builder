<template>
    <div class="w-full max-w-xs mx-auto h-full flex content-center justify-center flex-col">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" v-model="input.user">
                </div>
                <div class="mb-1">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" v-model="input.pass">
                </div>
                <div class="mb-2 text-center" v-if="error_msg">
                    <p class="text-red-500 text-xs italic">{{error_msg}}</p>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="submitForm(input)">
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="checkCurrentUser()">
                Check current user
            </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="firebaseLogout()">
                Logout
            </button> -->
            <p class="text-center text-gray-500 text-xs">
                &copy;2019 Acme Corp. All rights reserved.
            </p>
            <!-- <div>
                {{getToken}}
            </div> -->
        
    </div>
</template>

<script>
import { fireAuth } from '@/plugins/firebase.js'
import { logoutFirebase } from '@/plugins/firefunctions.js'
import { evalLogin } from '@/plugins/formValidator.js'
import * as Cookie      from 'js-cookie'


// import Swal         from '@/plugins/sweetAlert2.js'
import Swal from 'sweetalert2'
import { mapGetters } 				from 'vuex'

export default {
    data() {
        return {
            input: {
                user: null,
                pass: null
            },
            error_msg: null
        }
    },
    computed: {
        ...mapGetters({
				getToken: 'getToken'
		}),

    },
    methods: {
        checkCurrentUser() {
           
           fireAuth.onAuthStateChanged(user => {
               console.log('user', user)
                if (user) {
                    // return resolve(store.commit('setUser', user))
                }
                // return resolve()
            })
        },

        submitForm( payload ) {
            let vm = this,
                result = evalLogin(payload)
            if(result.valid) {
                vm.error_msg = null
                vm.firebaseLogin(payload)
            } else {
                vm.error_msg = result.error
            }
   
        },

        async firebaseLogin(payload) {
            let vm = this
            
            await vm.$store.dispatch('logIn', payload)
            if(vm.getToken) vm.$router.push('/admin')
            // fireAuth.signInWithEmailAndPassword(payload.user, payload.pass)
            // .then(response => {
            //     vm.$store.commit('setUser', response.user )
            //     vm.$router.push('/admin')
            // })
            // .catch(function(error) {
            // // Handle Errors here.
            //     Swal.fire({
            //         title: 'Error!',
            //         html: '<strong>'+error.code +':</strong><br>' +error.message,
            //         type: 'error'
            //     })
            // });
        },

        async firebaseLogout(payload) {
            let vm = this
            await logoutFirebase(vm.$store.dispatch('clearToken'))
            if(vm.getToken) vm.$router.push('/login')
        }


    }

}
</script>

<style>

</style>