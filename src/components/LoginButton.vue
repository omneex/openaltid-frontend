<template>
    <b-button size="lg" v-if="!this.$store.getters.getLoggedIn" @click="login" class="mx-auto">
        LOGIN
    </b-button>
    <b-button v-else size="lg" @click="logout" class="mx-auto">
        LOGOUT
    </b-button>
</template>

<script>
export default {
    name: "LoginButton",
    methods: {
        login: async function () {
            if (!this.$store.getters.getLoggedIn) {
                window.location.replace(this.$store.state.BACKEND_API_BASEURI + "/user/login")
            }
        },
        logout: async function () {

            let status = await fetch(this.$store.state.BACKEND_API_BASEURI + "/user/logout", {
                credentials: "include"
            })

            console.log(status.json())
            await this.$router.push("Home", () => {this.$router.go()})
        }
    }
}
</script>

<style scoped>

</style>