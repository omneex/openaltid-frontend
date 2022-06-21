/* eslint-disable vuejs-accessibility/form-control-has-label */
<template>
  <div class="mx-auto lg:w-1/3 py-4 px-3 lg:px-0">
    <div class="card shadow-xl py">
      <figure class="px-10 pt-10">
        <img :src="avatar" alt="Shoes" class="rounded-xl max-w-xs lg:max-w-sm" />
      </figure>
      <div class="card-body items-center text-center">
        <p>
          Once you have connected a social media account to Discord, click VERIFY below to continue.
        </p>
        <div
          v-if="getAlert"
          class="alert justify-center place-self-center shadow-lg lg:max-w-md"
          :class="getAlertType"
        >
          <div>
            <span>{{ alertText }}</span>
          </div>
          <div class="flex-none">
            <button @click="resetAlert" class="btn btn-sm btn-primary">OK</button>
          </div>
        </div>
        <div
          v-else-if="success"
          class="alert alert-success justify-center place-self-center shadow-lg lg:max-w-md"
        >
          <div>
            <span>Success! You should be verified now.</span>
          </div>
        </div>
        <div v-else class="card-actions">
          <button @click="verify" class="btn btn-primary" :class="{ loading: loadingButton }">
            VERIFY
          </button>
          <label for="my-modal-6" class="btn modal-button btn-accent">Need some help?</label>
        </div>
      </div>
    </div>
    <input type="checkbox" id="my-modal-6" class="modal-toggle" aria-label="Open Help" />
    <div class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg">No problem!</h3>
        <p class="py-4">Try going through this check list for common issues.</p>
        <li class="text-left">
          If you weren't verified without connections, make sure to connect a supported social media
          account.
        </li>
        <li class="text-left">Try enabling multifactor authentication.</li>
        <li class="text-left">
          Make sure it hasn't been more than 15 mintues since you ran the command, if so redo the
          command.
        </li>
        <li class="text-left">
          If nothing it still doesn't work after this, contact staff of the server you are trying to
          verify with.
        </li>
        <div class="modal-action">
          <label for="my-modal-6" class="btn">OK</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Dashboard",
  data() {
    return {
      avatar:
        "https://cdn.discordapp.com/avatars/179780264761884672/08ddb1c83dea6075caae7faa318a5787.png?size=1024",
      username: "User",
      verified: false,
      alt: false,
      alert: false,
      success: false,
      alert_text: "",
      warningType: "alert-error",
      cooldownLoadingSymbol: false,
      countDown: 5,
      timerText: "Connect accounts before verifying",
    };
  },
  async created() {
    try {
      const response = await axios.get(`${this.$store.state.BACKEND_API_BASEURI}/user/dashboard`, {
        withCredentials: true,
      });
      this.username = response.data.username;
      this.avatar = response.data.avatar;
      if (response.data.username !== null) {
        this.avatar = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png?size=256`;
      }
      this.verified = response.data.verified;
    } catch (error) {
      console.error(error);
    }
  },
  computed: {
    alertText() {
      return this.alert_text;
    },
    getAlert() {
      return this.alert;
    },
    getAlertType() {
      return this.warningType;
    },
    disableButtonComputed() {
      return this.disableButton;
    },
    loadingButton() {
      return this.cooldownLoadingSymbol;
    },
  },
  methods: {
    async verify() {
      this.cooldownLoadingSymbol = true;
      this.timerText = "Connect accounts before trying again";
      if (
        this.$store.getters.getLoggedIn &&
        this.$cookies.get("identifier") !== null &&
        this.$cookies.get("identifier") !== "undefined"
      ) {
        try {
          this.cooldownLoadingSymbol = true;
          const response = await axios.get(
            `${this.$store.state.BACKEND_API_BASEURI}/user/verify-accounts/${this.$cookies.get(
              "identifier"
            )}`,
            {
              withCredentials: true,
            }
          );
          this.cooldownLoadingSymbol = false;
          if (response.status === 200) {
            this.verified = response.data.verified;
            if (response.data.alt) {
              this.alt = true;
              this.warningType = "alert-warning";
              this.alert_text = "Alt account detected. You will not be verified.";
              this.alert = true;
            } else if (this.verified === false) {
              this.warningType = "alert-warning";
              this.alert_text =
                response.data.reason ??
                'You were NOT verified. Try reading through the "NEED SOME HELP?" button.';
              this.alert = true;
            } else if (this.verified === true) {
              this.warningType = "alert-success";
              this.alert_text = "You have been verified! You can return to the server now.";
              this.alert = true;
            } else {
              this.warningType = "alert-error";
              this.alert_text = "Malformed response from the server, this should be reported.";
              this.alert = true;
            }
          } else {
            if (response.data.alt) {
              this.alt = true;
            }
            this.alert_text = response.statusText;
            this.warningType = "alert-warning";
            this.alert = true;
          }
        } catch (error) {
          this.cooldownLoadingSymbol = false;
          this.warningType = "alert-error";
          this.alert_text = "Error, you are probably rate limited, try again in a minute.";
          this.alert = true;
        }
      } else {
        console.error("You must have an identifier to verify");
        this.cooldownLoadingSymbol = false;
        this.warningType = "alert-warning";
        this.alert_text = "Ensure you are logged in and received a link from the bot!";
        this.alert = true;
      }
    },
    async resetAlert() {
      this.warningType = "";
      this.alert_text = "";
      this.alert = 0;
    },
    async countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.disableButton = false;
      }
    },
  },
};
</script>
