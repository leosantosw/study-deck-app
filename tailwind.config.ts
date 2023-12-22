import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        blue: {
          '50': '#f0f6ff',
          '100': '#dfedff',
          '200': '#b9dafe',
          '300': '#7bbefe',
          '400': '#349cfc',
          '500': '#0a80ed',
          '600': '#0062cb',
          '700': '#004ea4',
          '800': '#054487',
          '900': '#093364',
          '1000': '#07244a',
        },
        gray: {
          '50': '#f4f5f7',
          '100': '#e4e8e9',
          '200': '#ccd1d5',
          '300': '#a8b2b8',
          '400': '#7c8a94',
          '500': '#616e79',
          '600': '#525c65',
          '700': '#484f56',
          '800': '#40454a',
          '900': '#383b41',
          '1000': '#232529',
        },
        red: {
          '50': '#fff1f1',
          '100': '#ffe1e1',
          '200': '#ffc8c8',
          '300': '#ffa1a2',
          '400': '#fe595a',
          '500': '#f73c3d',
          '600': '#e41e1f',
          '700': '#c01516',
          '800': '#9f1516',
          '900': '#83191a',
          '1000': '#480707',
        },
        green: {
          '50': '#f1fcf3',
          '100': '#defae4',
          '200': '#bef4ca',
          '300': '#8ce9a2',
          '400': '#5ed97b',
          '500': '#2bbc4d',
          '600': '#1d9c3c',
          '700': '#1b7a32',
          '800': '#1a612c',
          '900': '#175027',
          '1000': '#072c11',
        },
      },
      boxShadow: {
        gray: '1px 0px 5px 4px #e4e8e9',
      },
      width: {
        '82': '20.5rem',
        '88': '22rem',
        '100': '25rem',
      },
      height: {
        '100': '25rem',
      },
      fontFamily: {
        primary: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
