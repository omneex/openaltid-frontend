<template>
  <b-card>
    <b-card-body>
      <h1>{{ store.state.BRANDING_LINK }} Privacy Policy</h1>

      <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from verify.holoen.fans (the “Site”).</p>

      <h2>PERSONAL INFORMATION WE COLLECT</h2>

      <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone.</p>

      <h3>We collect Device Information using the following technologies:</h3>

      <p>- “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</p>
      <p>- “Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</p>
      <p>- “Discord connections” are the IDs and Types of connections that you have connected to your Discord account.</p>
      <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>

      <h2>HOW DO WE USE YOUR PERSONAL INFORMATION?</h2>

      <p>Your Discord connections will be used to test against a database of other connections to verify your Discord account.</p>
      <p>We do not share your Personal Information with third parties.</p>
      <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

      <h2>DO NOT TRACK</h2>
      <p>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>

      <h2>YOUR RIGHTS</h2>
      <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below. Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above.  Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>

      <h2>DATA RETENTION</h2>
      <p>When login and verify through our website your data will be kept for our records unless and until you ask us to delete this information.</p>

      <h2>MINORS</h2>
      <p>The Site is not intended for individuals under the age of 18.</p>

      <h2>CHANGES</h2>
      <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
      <h2>CONTACT US</h2>
      <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at contact@{{this.$store.state.siteTitle}}</p>
    </b-card-body>
  </b-card>
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
