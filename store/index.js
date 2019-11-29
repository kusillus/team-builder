import { fireAuth } from '@/plugins/firebase.js'
import * as cookieparser from 'cookieparser'
import * as Cookie from 'js-cookie'

export const strict = false

export const state = () => {
    return {
        token: null
    }
}

export const getters = {
    getToken: (state, getters) => {
        return state.token
    }
}

export const mutations = {
    setToken(state, token) {
        state.token = token
    },
}

export const actions = {
    nuxtServerInit({ commit }, { req, redirect }) {
        if(req.headers && req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)

            parsed.token ? 
                commit('setToken',parsed.token):
                redirect('/login')
            
            
            // fireAuth.verifyIdToken(parsed.token)
            // .then(function(decodedToken) {
            //   let uid = decodedToken.uid;
            //   console.log('decodedToken',decodedToken)
            //   // ...
            // }).catch(function(error) {
            //     console.log('error',error)
            //   // Handle error
            // });

            // fireAuth.onAuthStateChanged(user => {
            //     console.log('user', user)
            //     if (user) {
            //         commit('setUser',user)
            //     }
            // })
        }


        


        // fireAuth.onAuthStateChanged(user => {
        //     console.log('onAuthStateChanged',user)
        //     if (user) {
        //         commit('setUser',user)
        //     }
        // })
    },
    async clearToken({commit}) {
       commit('setToken', null) 
    },

    async logIn({commit}, account ) {
        /* 
            TODO: Consumimos el servicio de login, si falla, borramos la cookie
        */
        await fireAuth.signInWithEmailAndPassword(account.user, account.pass)
        let token = await fireAuth.currentUser.getIdToken()
        commit('setToken', token) 
        Cookie.set('token', token)
    },
}