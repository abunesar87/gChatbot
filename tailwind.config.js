module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        siteColor:{
          light: "#75CD6F",
          dark: "#46c894"
        }
      }
    },
    fontFamily: {
      'sans': ['Josefin Sans', 'sans-serif', ],
      // 'Josefin': ['Josefin Sans', ],
     }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
