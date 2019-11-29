export default function({ store, route, redirect }) {
    console.log('no-auth middleware')
    if(store.state.token){
        redirect('/admin')
    }
}