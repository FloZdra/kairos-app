<template>
  <v-container fluid>
    <PageTitle>{{ `${manager.full_name}'s team` }}</PageTitle>
    <v-row>
      <v-col>
        <ListUsers :users="users"></ListUsers>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListUsers from '@/components/Users/ListUsers'
export default {
  name: 'ManagerPage',
  components: { ListUsers },
  layout: 'default',
  middleware: ['auth', 'manager'],
  async asyncData({ $axios, params, error }) {
    try {
      const manager = await $axios.get(`/api-adonis/users/${params.manager_id}`)
      const users = await $axios.get(`/api-adonis/managers/${params.manager_id}/users`)
      return { manager: manager.data, users: users.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      manager: {},
      users: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
