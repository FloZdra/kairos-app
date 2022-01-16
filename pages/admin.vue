<template>
  <v-container fluid>
    <PageTitle>Admin panel</PageTitle>
    <v-row>
      <v-col>
        <ListAdmins :users="admins"></ListAdmins>
      </v-col>
      <v-col>
        <ListManagers :users="managers"></ListManagers>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListAdmins from '@/components/Users/ListAdmins'
import ListManagers from '@/components/Users/ListManagers'
export default {
  name: 'AdminPage',
  components: { ListManagers, ListAdmins },
  layout: 'default',
  middleware: ['auth', 'admin'],
  async asyncData({ $axios, error }) {
    try {
      const users = await $axios.get(`/api-adonis/users`)
      return { users: users.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data: () => ({ users: [] }),
  computed: {
    admins() {
      return this.users.filter((u) => u.role === 'ADMIN')
    },
    managers() {
      return this.users.filter((u) => u.role === 'MANAGER')
    },
  },
  methods: {},
}
</script>

<style scoped></style>
