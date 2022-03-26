<template>
	<div class="flex grow flex-col items-center justify-center gap-2 px-4">
		<div
			class="flex w-96 flex-col items-center gap-2 rounded-md border-2 border-gray-400"
		>
			<div
				class="flex w-full items-center justify-center bg-gray-200 p-4"
			>
				<h1 class="text-3xl font-bold">Verification dashboard</h1>
			</div>
			<hr class="-mt-2 w-full border border-gray-400" />
			<div
				class="m-2 rounded-md border border-gray-400 bg-gray-200 p-4"
				v-if="alertText"
			>
				<!-- TODO: Properly implement this again -->
				Alert: {{ alertText }}
			</div>
			<div class="flex items-center gap-2">
				<img
					:src="avatar"
					alt="Avatar"
					class="flex h-16 w-16 items-center justify-center rounded-full border border-gray-400 object-contain"
				/>
				<h2 class="text-xl">Welcome, {{ username }}!</h2>
			</div>
			<h3 class="mx-2 text-lg font-bold text-red-500 underline">
				You must connect accounts to Discord first!
			</h3>
			<hr class="w-full border border-gray-300" />
			<div class="flex flex-col items-center">
				<h2 class="text-xl">Status</h2>
				<div class="flex items-center gap-2" v-if="verified">
					<ShieldCheckIcon class="h-12 w-12 text-green-400" />
					<h2 class="text-xl">Verified</h2>
				</div>
				<div class="flex items-center gap-2" v-else-if="alt">
					<ShieldExclamationIcon class="h-12 w-12 text-red-500" />
					<h2 class="text-xl">Alt detected</h2>
				</div>
				<div class="flex items-center gap-2" v-else>
					<XCircleIcon class="h-12 w-12 text-red-500" />
					<h2 class="text-xl">Not verified</h2>
				</div>
			</div>
			<p v-if="disableButtonComputed">
				{{ timerText }}, wait {{ countDown }} seconds
			</p>
			<button
				:disabled="disableButtonComputed"
				@click="verify"
				class="rounded-md bg-primary py-2 px-4 text-white hover:bg-secondary disabled:bg-gray-400"
			>
				Verify
			</button>
			<div class="flex w-full items-center bg-gray-200 p-4">
				<p>Open/Alt.ID</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import {
	XCircleIcon,
	ShieldExclamationIcon,
	ShieldCheckIcon,
} from '@heroicons/vue/solid';
</script>

<script>
import axios from 'axios';
import { useCookies } from 'vue3-cookies';
import store from '@/store';

require('cookies');

const { cookies } = useCookies();

export default {
	name: 'Dashboard',
	components: {},
	data() {
		return {
			avatar: 'https://discordapp.com/assets/322c936a8c8be1b803cd94861bdfa868.png',
			username: 'User',
			verified: false,
			alt: false,
			alert: false,
			alert_text: '',
			warningType: 'warning',
			disableButton: false,
			countDown: 5,
			timerText: 'Connect accounts before verifying',
		};
	},
	async beforeCreate() {
		this.disableButton = true;
		try {
			const response = await axios.get(
				`${store.state.BACKEND_API_BASEURI}/user/dashboard`,
				{
					withCredentials: true,
				},
			);
			this.username = response.data.username;
			this.avatar = response.data.avatar;
			if (response.data.username !== null) {
				this.avatar = `https://cdn.discordapp.com/avatars/${response.data.id}/${response.data.avatar}.png?size=256`;
			}
			this.verified = response.data.verified;
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error);
		}

		this.countDown = 10;
		this.disableButton = true;
		await this.countDownTimer();
	},
	computed: {
		alertText() {
			return this.alert_text;
		},
		showAlert() {
			return this.alert;
		},
		disableButtonComputed() {
			return this.disableButton;
		},
	},
	methods: {
		async verify() {
			this.timerText = 'Connect accounts before trying again';

			if (
				// GoldElysium: I don't agree with the operator placement, but whatever. Thanks Prettier
				store.getters.getLoggedIn &&
				cookies.get('identifier') !== null &&
				cookies.get('identifier') !== 'undefined'
			) {
				try {
					const response = await axios.get(
						`${
							store.state.BACKEND_API_BASEURI
						}/user/verify-accounts/${cookies.get('identifier')}`,
						{
							withCredentials: true,
						},
					);
					if (response.status === 200) {
						this.verified = response.data.verified;
						if (response.data.alt) {
							this.alt = true;
						}
						if (this.verified === false) {
							this.warningType = 'danger';
							this.alert_text = response.data.reason;
							this.alert = 15;
						}
					} else {
						if (response.data.alt) {
							this.alt = true;
						}
						await this.showAlert(response.statusText);
					}
				} catch (error) {
					await this.showAlert(
						'Error, you are probably rate limited, try again in a minute.',
					);
				}

				this.countDown = 5;
				this.disableButton = true;
				await this.countDownTimer();
			} else {
				// eslint-disable-next-line no-console
				console.error('You must have an identifier to verify');
				this.warningType = 'warning';
				this.alert_text =
					'Ensure you are logged in and received a link from the bot!';
				this.alert = 5;

				this.countDown = 5;
				this.disableButton = true;
				await this.countDownTimer();
			}
		},
		async resetAlert() {
			this.warningType = '';
			this.alert_text = '';
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
