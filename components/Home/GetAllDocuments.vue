<template>
  <div class="w-full">
		<div class="mb-4">
			<button @click="readToFirestore" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
				Traer registros
			</button>
		</div>
		<div>
			{{bucket}}
		</div>
	</div>
</template>

<script>
export default {
    props: {
        bucket: {
            type: Array,
            required: true
        },
    },
    methods: {
        readToFirestore() {
            let vm = this
            vm.$emit('readToFirestore')
        }
    }

}
</script>

<style>

</style>