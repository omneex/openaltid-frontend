<template>
	<div class="flex flex-col gap-2">
		<h1 class="text-4xl">
			<span class="underline decoration-blue-400 decoration-2">
				{{ store.state.siteTitle }}
			</span>
			Privacy Policy
		</h1>

		<p>
			This Privacy Policy describes how your personal information is
			collected, used, and shared when you visit
			<span class="font-bold">{{ store.state.siteTitle }}</span> (the
			“Site”).
		</p>

		<h2 class="text-3xl">Personal Information We Collect</h2>

		<p>
			When you visit the Site, we automatically collect certain
			information about your device, including information about your web
			browser, IP address, time zone.
		</p>

		<h3 class="text-2xl">
			We collect Device Information using the following technologies:
		</h3>

		<p>
			- “Cookies” are data files that are placed on your device or
			computer and often include an anonymous unique identifier. For more
			information about cookies, and how to disable cookies, visit
			<a href="https://www.allaboutcookies.org"
				>http://www.allaboutcookies.org</a
			>.
		</p>
		<p>
			- “Log files” track actions occurring on the Site, and collect data
			including your IP address, browser type, Internet service provider,
			referring/exit pages, and date/time stamps.
		</p>
		<p>
			- “Discord connections” are the IDs and Types of connections that
			you have connected to your Discord account.
		</p>

		<h2 class="text-3xl">How Do We Use Your Personal Information?</h2>

		<p>
			Your Discord connections will be used to test against a database of
			other connections to verify your Discord account.
		</p>
		<p>We do not share your Personal Information with third parties.</p>
		<p>
			Finally, we may also share your Personal Information to comply with
			applicable laws and regulations, to respond to a subpoena, search
			warrant or other lawful request for information we receive, or to
			otherwise protect our rights.
		</p>

		<h2 class="text-3xl">Do Not Track</h2>
		<p>
			Please note that we do not alter our Site’s data collection and use
			practices when we see a Do Not Track signal from your browser.
		</p>

		<h2 class="text-3xl">Your Rights</h2>
		<p>
			If you are a European resident, you have the right to access
			personal information we hold about you and to ask that your personal
			information be corrected, updated, or deleted. If you would like to
			exercise this right, please contact us through the contact
			information below.
		</p>
		<p>
			Additionally, if you are a European resident we note that we are
			processing your information in order to fulfill contracts we might
			have with you (for example if you make an order through the Site),
			or otherwise to pursue our legitimate business interests listed
			above. Additionally, please note that your information will be
			transferred outside of Europe, including to Canada and the United
			States.
		</p>

		<h2 class="text-3xl">Data Retention</h2>
		<p>
			When login and verify through our website your data will be kept for
			our records unless and until you ask us to delete this information.
		</p>

		<h2 class="text-3xl">Minors</h2>
		<p>The Site is not intended for individuals under the age of 18.</p>

		<h2 class="text-3xl">Changes</h2>
		<p>
			We may update this privacy policy from time to time in order to
			reflect, for example, changes to our practices or for other
			operational, legal or regulatory reasons.
		</p>

		<h2 class="text-3xl">Contact Us</h2>
		<p>
			For more information about our privacy practices, if you have
			questions, or if you would like to make a complaint, please contact
			us by e-mail at {{ store.state.SUPPORT_EMAIL }}
		</p>
	</div>
</template>

<script>
import { useStore } from 'vuex';

export default {
	name: 'Privacy',
	setup() {
		const store = useStore();
		return { store };
	},
};
</script>
