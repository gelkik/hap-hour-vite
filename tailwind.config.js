/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'className',
  theme: {
    colors: {
			'primary': '#3490dc',
			'secondary': '#ffed4a',
			'danger': '#e3342f',
		},
		extend: {
			fontFamily: {
				main: ["Quicksand", "sans-serif"],
			},
			screens: {
				maxPro: "430px",
				iphoneXr: "390px",
				samsungS8: '360px',
			},
			width: {
				81: "81.396%",
				69: "69.428%",
			},
			padding: {
				18: "40%",
			},

			spacing: {
				22: "88px",
				193: "192.79px",
			},
			fontSize: {
				"7xl": "56px",
			},
			backgroundColor: {
				'indigo-600': '#4F46E5',
			  },
			colors: {
				red: {
					600: '#DC2626',
				  },
				gray: {
					200: '#696969',
				  },
				white: {
					100: '#FFFFFF',
				  },
				blue: {
					200: '#7CB9E8',
				  },
				blue: {
					200: '#7CB9E8',
					600: '#2563eb',
				  },
				neutral: {
					800: '#262626',
				  },
			  },
		
		},

  },
  plugins: [],
}

