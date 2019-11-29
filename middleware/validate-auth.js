export default function({ store, route, redirect }) {
    if(!store.state.token){
        redirect('/login')
    }
}