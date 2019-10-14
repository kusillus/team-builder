<template>
    <div class="w-full">
        <input v-model="input.key" class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="name">
		<button @click="searchByCode" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
			Buscar por dato
		</button>
        <button @click="deleteToFirestore" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
			delete dato
		</button>
		<div>
			{{bucket}}
		</div>
	</div>
</template>

<script>
export default {
    props: {
        input: {
            type: Object,
            required: true
        },
        bucket: {
            type: Array,
            required: true
        },
    },
    methods: {
        searchByCode() {
            let vm = this
            vm.$emit('searchByCode')
        },

        deleteToFirestore() {
            let vm = this
            vm.$emit('deleteToFirestore')
        }
    }
}
</script>

<style>

</style>