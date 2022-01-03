export default function ({ redirect, $axios }) {
  // If the user is not authenticated
  const ACCESS_TOKEN = getCookie('auth._token')

  if (ACCESS_TOKEN) {
    $axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_TOKEN}`
    return redirect('/home')
  }
  delete $axios.defaults.headers.common.Authorization
}

function getCookie(name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}
