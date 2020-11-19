const path = require('path')

module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': path.resolve(__dirname, 'src/'),
          },
        },
      ],
    ],
  }
}
