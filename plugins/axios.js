// const camelcaseKeys = require('camelcase-keys')
// const snakecaseKeys = require('snakecase-keys')
//
// export default function ({ $axios, error }) {
//   // $axios.onError((err) => {
//   //   const code = parseInt(err.response && err.response.status)
//   //   if (code === 401 && err.response?.data?.message === 'Session expired!') {
//   //     return error({
//   //       name: 'ExpiredAuthSessionError',
//   //       message: 'Session expired!',
//   //     })
//   //   }
//   // })
//
//   $axios.onRequest((config) => {
//     const newConfig = { ...config }
//     if (newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig
//     if (config.params) {
//       newConfig.params = snakecaseKeys(config.params, { deep: true })
//     }
//     if (config.data) {
//       newConfig.data = snakecaseKeys(config.data, { deep: true })
//     }
//     return newConfig
//   })
//
//   $axios.onResponse((response) => {
//     if (response.data && response.headers['content-type'] === 'application/json; charset=utf-8') {
//       response.data = camelcaseKeys(response.data, { deep: true })
//     }
//     return response
//   })
// }
