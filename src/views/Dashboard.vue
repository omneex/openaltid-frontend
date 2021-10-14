<template class="h-100">
    <b-container class="h-100">
        <b-row class="align-items-center h-100">

            <b-col class="mx-auto">
                <b-alert
                        class="text-center"
                        :show="showAlert"
                        :variant="warningType"
                        @dismissed="resetAlert"
                        dismissible
                >
                    {{ alertText }}
                </b-alert>
                <b-card
                        no-body
                        style="max-width: 20rem;"
                        :img-src="avatar"
                        img-alt="Image"
                        img-top
                        class="mx-auto"
                >
                    <template #header>
                        <h4 class="mb-0">Verification Dashboard</h4>
                    </template>
                    <b-card-body>
                        <b-card-title>Welcome, {{ username }}!</b-card-title>
                        <b-card-text>
                          <h3>YOU MUST CONNECT ACCOUNTS TO DISCORD FIRST.</h3>
                        </b-card-text>
                    </b-card-body>
                    <b-card-body>
                        <b-row>
                            <div class="m-auto text-center">
                                <h5>VERIFIED</h5>
                                <b-icon-check-circle-fill variant="success" class="h1" v-if="verified"></b-icon-check-circle-fill>
                                <b-icon-x-circle-fill variant="warning" class="h1" v-else></b-icon-x-circle-fill>
                            </div>
                        </b-row>
                        <b-row v-if="alt">
                            <div class="m-auto text-center">
                                <h5>ALT DETECTED</h5>
                                <b-icon-exclamation-diamond-fill variant="danger" class="h1"></b-icon-exclamation-diamond-fill>
                            </div>
                        </b-row>
                    </b-card-body>
                    <b-button v-if="disableButtonComputed" disabled >{{timerText}} {{countDown}}</b-button>
                    <b-button v-else @click="verify" >VERIFY</b-button>
                    <b-card-footer>Open/Alt.ID</b-card-footer>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from "axios";

require("cookies")
export default {
    name: "Dashboard",
    components: {},
    data() {
        return {
            avatar: "https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png",
            username: "User",
            verified: false,
            alt: false,
            alert: false,
            alert_text: "",
            warningType: "warning",
            disableButton: false,
            countDown: 5,
            timerText: "Connect accounts before verifying"
        }
    },
    async beforeCreate() {
        this.disableButton = true
        try {
            let response = await axios.get(
                `${this.$store.state.BACKEND_API_BASEURI}/user/dashboard`,
                {
                    withCredentials: true
                })
            this.username = response.data.username
            this.avatar = response.data.avatar
            if (response.data.username !== null) {
                this.avatar = "https://cdn.discordapp.com/avatars/"+response.data.id+"/"+ response.data.avatar +".png?size=256"
            }
            this.verified = response.data.verified
        } catch (error) {
            console.error(error)
        }

      this.countDown = 10
      this.disableButton = true
        await this.countDownTimer()
    },
    computed: {
        alertText () {
            return this.alert_text
        },
        showAlert () {
            return this.alert
        },
        disableButtonComputed () {
            return this.disableButton
        },
    },
    methods: {
        verify: async function () {
            this.timerText = "Connect accounts before trying again"

            if (this.$store.getters.getLoggedIn && this.$cookies.get("identifier") !== null && this.$cookies.get("identifier") !== 'undefined' ) {
                try {
                    let response = await axios.get(
                        `${this.$store.state.BACKEND_API_BASEURI}/user/verify-accounts/${this.$cookies.get("identifier")}`,
                        {
                            withCredentials: true
                        })
                    if (response.status === 200) {
                        this.verified = response.data.verified
                        if (response.data.alt) {
                            this.alt = true
                        }
                        if (this.verified === false) {
                            this.warningType = "danger"
                            this.alert_text = response.data.reason
                            this.alert = 15
                        }
                    } else {
                        if (response.data.alt) {
                            this.alt = true
                        }
                        await this.showAlert(response.statusText)
                    }
                } catch (error) {
                    await this.showAlert("Error, you are probably rate limited, try again in a minute.")
                }

                this.countDown = 5
                this.disableButton = true
                await this.countDownTimer()

            } else {
                console.error("You must have an identifier to verify")
                this.warningType = "warning"
                this.alert_text = "Ensure you are logged in and received a link from the bot!"
                this.alert = 5

                this.countDown = 5
                this.disableButton = true
                await this.countDownTimer()
            }
        },
        resetAlert: async function () {
            this.warningType = ""
            this.alert_text = ""
            this.alert = 0
        },
        countDownTimer: async function () {
            if(this.countDown > 0) {
                setTimeout(() => {
                    this.countDown -= 1
                    this.countDownTimer()
                }, 1000)
            } else {
                this.disableButton = false
            }
        }
    },
}
</script>

<style scoped>

</style>