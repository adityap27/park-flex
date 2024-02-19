// module.exports = {
//     plugins: [
//       require('tailwindcss'),
//       require('autoprefixer'),
//     ],
//   }


  module.exports = {
    plugins: [
        require('postcss-import'),
        require('tailwindcss/nesting'),
        require('tailwindcss'),
        require('autoprefixer'),
    ]
}