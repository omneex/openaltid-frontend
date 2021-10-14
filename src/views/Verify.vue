<template>
    <div class="h-100 d-flex justify-content-center align-items-center flex-fill">
            <b-card
                    style="max-width: 20rem;"
                    v-if="!$store.getters.getLoggedIn"
            >
                <b-card-header>
                    You must login first.
                </b-card-header>
                <h3>Click the button below to login with your Discord account.</h3>
                <LoginButton></LoginButton>
            </b-card>
            <b-jumbotron v-else>
                <template #lead>YOU SHOULD BE REDIRECTED!</template>
            </b-jumbotron>
    </div>
</template>

<script>
import LoginButton from "@/components/LoginButton.vue";
export default {
    name: 'Verify',
    components: {
        LoginButton
    },
    mounted() {
        this.$cookies.set("identifier", this.$route.params.identifier, "1h")
    }
}
</script>

<style>
.iframe-container {
  position: relative;
  overflow: hidden;
  flex: auto;
}

</style>
