export const state = () => ({
  user: null,
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },
}

export const getters = {
  // fullName: (state) => {
  //   if (!state.user) return ''
  //   return state.user.firstname + ' ' + state.user.lastname
  // },
  isUser: (state) => {
    return state?.user?.role === 'USER'
  },
  isManager: (state) => {
    return state?.user?.role === 'MANAGER'
  },
  isAdmin: (state) => {
    return state?.user?.role === 'ADMIN'
  },
}
