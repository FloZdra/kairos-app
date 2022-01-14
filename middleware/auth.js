export default async function ({ store, redirect, $axios }) {
  const ACCESS_TOKEN = getCookie('auth._token')

  if (!ACCESS_TOKEN) {
    delete $axios.defaults.headers.common.Authorization
    return redirect('/')
  }

  try {
    $axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`
    const response = await $axios.get('/api-adonis/auth/user')
    store.commit('SET_USER', response.data)
  } catch {
    document.cookie = 'auth._token=null;expires=Thu, 01 Jan 1970 00:00:01 GMT'
    delete $axios.defaults.headers.common.Authorization
    return redirect('/')
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
