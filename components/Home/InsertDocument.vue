<template>
  <div class="w-full max-w-xs">
        <div>
            Insertar datos
        </div>
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
			<div class="mb-4">
				<label class="block text-gray-700 text-sm font-bold mb-2">
					Siglas
				</label>
				<input v-model="input.key" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Siglas">
			</div>
			<div class="mb-6">
				<label class="block text-gray-700 text-sm font-bold mb-2">
					Name
				</label>
				<input v-model="input.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="name">
			</div>
			<div class="flex items-center justify-between">
				<button @click="writeToFirestore" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
					Insertar dato
				</button>
				<button @click="clearData" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
					Limpiar
				</button>
			</div>
		</form>
        {{input}}
	</div>
</template>

<script>
export default {
    props: {
        input: {
            type: Object,
            required: true
        },
    },
    methods: {
        writeToFirestore() {
            let vm = this
            vm.$emit('writeToFirestore')
        },
        clearData() {
            let vm = this
            vm.$emit('clearData')
        },
    }

}
</script>

<style>

</style>