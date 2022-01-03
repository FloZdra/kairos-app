export default async function ({ store, redirect, $axios }) {
  const ACCESS_TOKEN = getCookie('auth._token')

  if (!ACCESS_TOKEN) {
    delete $axios.defaults.headers.common.Authorization
    return redirect('/')
  }

  $axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`
  const response = await $axios.get('/api/auth/user')
  store.commit('SET_USER', response.data)
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
