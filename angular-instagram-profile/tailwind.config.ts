import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      zIndex: {
        '200': '200',
        '999': '999',
      },
    },
  },
  plugins: [],
};

export default config;
