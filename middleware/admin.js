export default function ({ store, redirect }) {
  if (store.state.user.role !== 'ADMIN') return redirect('/home')
}
