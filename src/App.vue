<template>
	<div class="flex min-h-screen flex-col">
		<div class="flex h-16 justify-between bg-primary py-4 px-8">
			<a
				v-if="!store.state.BRANDING_LOGO"
				href="/"
				class="text-2xl text-white"
			>
				{{ store.state.BRANDING_HOME_LINK }}
			</a>
			<a v-else href="/">
				<img
					class="-mt-4 h-16 object-contain"
					:src="store.state.BRANDING_LOGO"
				/>
			</a>

			<Menu>
				<MenuButton
					as="div"
					class="flex cursor-pointer items-center text-white"
				>
					Options
					<ChevronDownIcon
						class="ml-1 -mr-1 h-4 w-4"
						aria-hidden="true"
					/>
				</MenuButton>
				<MenuItems
					class="absolute right-2 mt-8 flex w-36 origin-top-right flex-col gap-1 divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<MenuItem as="div" class="flex items-center gap-1">
						<CogIcon class="h-4 w-4" />
						<a href="/dashboard">Dashboard</a>
					</MenuItem>
					<MenuItem as="div" class="flex items-center gap-1">
						<EyeIcon class="h-4 w-4" />
						<a href="/privacy">Privacy Notice</a>
					</MenuItem>
					<MenuItem>
						<LoginButton />
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
		<div class="flex grow flex-col px-8 py-6">
			<router-view />
		</div>
	</div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { ChevronDownIcon, CogIcon, EyeIcon } from '@heroicons/vue/solid';
</script>

<script>
import LoginButton from '@/components/LoginButton.vue';
import store from '@/store';

export default {
	components: { LoginButton },
	setup() {
		return { store };
	},
};
</script>
