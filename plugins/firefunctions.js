import * as Cookie      from 'js-cookie'
import { fireAuth }     from '@/plugins/firebase.js'
// import Store            from 'vuex'

// import {mapGetters} 				from 'vuex'


// export default context => {
//     const { store } = context

//     return new Promise((resolve, reject) => {
//         fireAuth.onAuthStateChanged(user => {
//             if (user) {
//                 return resolve(store.commit('setUser', user))
//             }
//             return resolve()
//         })
//     })
// }

const logoutFirebase = async ( callback ) => {

    await fireAuth.signOut().then(function(done) {
        Cookie.remove('token')
        // Store.commit('setToken', null)
        callback
        console.log('HERE')
    }).catch(function(error) { 
        console.log(error)
        return error
    });
}

export { 
	logoutFirebase
}