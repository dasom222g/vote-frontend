const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderColor: ['first', 'peer-checked'],
      borderOpacity: ['first', 'peer-checked'],
      borderRadius: ['first', 'peer-checked'],
      borderStyle: ['first', 'peer-checked'],
      borderWidth: ['first', 'peer-checked'],
      backgroundColor: ['first', 'peer-checked'],
      backgroundOpacity: ['first', 'peer-checked'],
      margin: ['first', 'peer-checked'],
      padding: ['first', 'peer-checked'],
    },
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('peer-checked', ({ modifySelectors, separator }) => {
        modifySelectors(
          ({ className }) => {
              const eClassName = e(`peer-checked${separator}${className}`); // escape class
              const selector = 'input[type="radio"]'; // your input selector. Could be any
              return [`${selector}:checked ~ .${eClassName}`]; // ~ - CSS selector for siblings
          }
        )
      })
    }),
  ],
}

// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
