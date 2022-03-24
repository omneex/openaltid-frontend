const colors = require('tailwindcss/colors');

module.exports = {
	content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#00A0F2',
				secondary: colors.blue['400'],
			},
		},
	},
	plugins: [],
};
