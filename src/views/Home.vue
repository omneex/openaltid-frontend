<template>
    <div class="h-100 d-flex justify-content-center flex-fill">
        <b-row>
            <b-col>
                <b-row>
                    <b-card class="align-items-center">
                        <h1 class="co">
                            {{ this.$store.state.BRANDING_LONG }}
                        </h1>
                        <h2>
                            This is the verification site for the Open/Alt.ID project. You cant do anything without clicking a link from the bot first.
                        </h2>
                        <b-button :href="this.$store.state.BRANDING_LINK">Support Site (not for verification help)</b-button>
                    </b-card>
                </b-row>
            </b-col>

        </b-row>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style scoped>
.h1 {
    color: aliceblue;
}
</style>
