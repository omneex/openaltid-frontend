<template>
    <h1>SUCCESS, YOU SHOULD BE REDIRECTED!</h1>
</template>

<script>
export default {
    name: "DiscordRedirect",
    mounted() {
        if (this.$route.query.code && !this.$store.getters.getLoggedIn) {
            this.$store.dispatch('login', this.$route.query).then((success) => {
                if (success) {
                    this.$router.push("/dashboard")
                } else {
                    this.$router.push("/")
                }
            })
        } else {
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>

</style>