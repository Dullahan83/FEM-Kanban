/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontSize: {
      "xl": "24px",
      "xlg": "20px",
      "lg": "18px",
      "md": "15px",
      "mds": "13px",
      "sm": "12px",
    },
    extend: {
      borderRadius: {
        "smd": "4px"
      },
      letterSpacing: {
        "ginormous": "0.15em"
      },
      width: {
        "66": "264px",
        "70": "280px",
        "85.5":"343px",
        "480": "480px"
      },
      height: {
        "3.5": "14px",
        "header-desk": "9.376vh",
        "header-tablet": '7.911vh',
        "header-mobile": '9.596vh',

        "main-desk": "90.624vh",
        "main-tablet": "92.089vh",
        "main-mobile": "90.404vh",

        

      },
      minHeight: {
        "main-desk": "90.624vh"
      },
      lineHeight: {
        "5.5": "22px",
        "5.8": "23px"
      }
      ,
      translate:{
        "5.5": "22px"
      },
      colors: {
        "bgLight": "#F4F7FD",
        "bgDark": "#20212C",
        "linelight": "#E4EBFA",
        "lineDark": "#3E3F4E",
        "primary": "#635FC7",
        "primary-hover": "#A8A4FF",
        "secondary": "#EA5555",
        'secondary-hover': "#FF9898",
        "mediumGrey": '#828FA3',
        "darkGrey": "#2B2C37",
        "lightText": "#000",
        "darkText": "#fff",
        "newCol": "#e9effa",
      },
      padding:{
        "3.5": "14px",
        "4.5": "18px",
        "6.5": "26px",
        "8.5": "34px",
        "82": "82px",
      },
      boxShadow: {
        "taskShadow": "0px 4px 6px 0px #364c7d1a"
      }
    },
  },
  plugins: [],
}