/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
			  },
		
		},

  },
  plugins: [],
}

