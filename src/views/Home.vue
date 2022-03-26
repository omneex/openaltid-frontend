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
                            This site is dedicated to verifying users for the {{ this.$store.state.BRANDING_SHORT }} Discord server. You cant do anything without clicking a link from the bot first.
                        </h2>
                        <b-button :href="this.$store.state.BRANDING_LINK">Click here to join</b-button>
                    </b-card>
                </b-row>
            </b-col>

        </b-row>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        return {
            bannerBrand: this.$store.state.BRANDING_LONG_BANNER,
        }
    },
    async beforeCreate() { 
        console.log("Long: ", this.$store.state.BRANDING_LONG_BANNER)
        console.log("Short: ", this.$store.state.BRANDING_SHORT_BANNER)
    }
}
</script>

<style scoped>
.h1 {
    color: aliceblue;
}
</style>