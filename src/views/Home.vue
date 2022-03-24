<template>
    <div class="h-100 d-flex justify-content-center flex-fill">
        <div>
            <div>
                <div>
                    <div class="align-items-center">
                        <h1 class="co">
                            {{ store.state.BRANDING_LONG }}
                        </h1>
                        <h2>
                            This site is dedicated to verifying users for the {{ store.state.BRANDING_SHORT }} Discord server. You cant do anything without clicking a link from the bot first.
                        </h2>
                        <a :href="store.state.BRANDING_LINK">Click here to join</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import store from '@/store';

export default {
	name: 'Home',
	setup() {
		return { store };
	},
};
</script>
