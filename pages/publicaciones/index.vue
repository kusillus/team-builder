<template>
    <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src="https://dkcih82i8p5bk.cloudfront.net/assets/img/91c910d.png" alt="Sunset in the mountains">
            <div class="px-6 py-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Título publicación
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="title" id="username" type="text" placeholder="Título">
                </div>
            </div>
            <div class="px-6 py-4">
                <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" @click="addNewPublication()">
                    addNewPublication
                </button>
            </div>
        </div>
        <div>
            <button v-if="pgl_users.length == 0" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded" @click="setMassiveData(pgl_users.length)">
                    Set massive data
                </button>
        </div>
        <div>
            <div v-for="(item, i) in list" :key="i" @click="getInfoPublication(item, i)">
                {{item.num}} - {{item.species}}
            </div>
            <div>
                {{total_size}} - {{pgl_users.length}}
            </div>
        </div>
    </div>
</template>

<script>
import { fireFirestore }    from '@/plugins/firebase.js'
import { BattlePokedex }        from '@/assets/js/dummie_data.js'
import  pgl_users        from '@/assets/js/pgl_users.js'
// import { logoutFirebase } from '@/plugins/firefunctions.js'

export default {
    data() {
        return {
            pgl_users:pgl_users,
            title: null,
            list: [],
            total_size: 0,
            collection: {
                name: 'publications',
                limit: 10,
                order_field: 'hash', // si el campo no existe no se mostrara ningun resulado.
                order_type: 'asc',
            }
        }
    },
    layout: 'admin',
    async mounted(){
        // await this.getSizeCollection()
        this.getListPublications()
    },
    methods: {
        setMassiveData(item){
            let vm = this
            console.log('setMassiveData')
            if(item > 0) return false
            pgl_users.map( async item => {
                await vm.addNewMassiveData(item)
            })
        },
        addNewMassiveData(data){
            /*
            TODO: Agregamos una nueva publicación.
            */
            let vm = this
            return fireFirestore.collection(vm.collection.name).add(data)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        },


        getInfoPublication(item, i){
            /*
            TODO: Obtenemos la informacion de una publicación.
            */

            fireFirestore.collection("pkmns").doc(item._id)
            .onSnapshot(function(doc) {
                console.log("Current data: ", doc.data());
            })

        },
        
        getSizeCollection() {
            let vm = this
            return fireFirestore.collection(vm.collection.name).onSnapshot(function(querySnapshot) {
                vm.total_size = querySnapshot.size
            })

        },
        getListPublications() {
            /*
            TODO: Obtenemos la lista de todas las publicaciones y escuchamos los cambios.
            */
            let vm = this
            console.log('here')

            fireFirestore.collection(vm.collection.name).orderBy(vm.collection.order_field, vm.collection.order_type).limit(vm.collection.limit)
            .onSnapshot(function(querySnapshot) {
                let val = []
                console.log('querySnapshot.size', querySnapshot.size)
                querySnapshot.forEach(function(doc) {
                    val.push({'_id': doc.id, ...doc.data()})
                });
                vm.list = val
            });
        },

        addNewPublication(){
            /*
            TODO: Agregamos una nueva publicación.
            */
            let vm = this
            fireFirestore.collection(vm.collection.name).add({
                title: vm.title,
                hash: Math.random()
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                vm.title = null
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
    }
}
</script>

<style>

</style>