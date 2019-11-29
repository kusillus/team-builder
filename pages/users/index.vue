<template>
    <div>
        Hola amiguitos
        <code>
            {{user}}
        </code>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user: {
                username: 'username',
                email: 'email_name',
                display_name: 'display_name',
                first_name: 'first_name',
                last_name: 'last_name',
                date_of_birth: 'date_of_birth',
                address: 'address secret',
                city: 'city',
                country: 'country',
                phone_number: 999999999,
                player_id: 'player_id'
            }
        }
    }
}
</script>

<style>

</style>