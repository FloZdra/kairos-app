export default function ({ store, redirect }) {
  if (!['MANAGER', 'ADMIN'].includes(store.state.user.role)) return redirect('/home')
}
