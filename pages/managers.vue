<template>
  <v-container fluid>
    <PageTitle>Managers</PageTitle>
    <v-row>
      <v-col>
        <ListUsers :users="managers" managers></ListUsers>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListUsers from '@/components/Users/ListUsers'
export default {
  name: 'ManagersPage',
  components: { ListUsers },
  layout: 'default',
  middleware: ['auth', 'admin'],
  async asyncData({ $axios, error }) {
    try {
      const users = await $axios.get(`/api-adonis/users`)
      return { managers: users.data.filter((u) => u.role === 'MANAGER') }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      managers: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
