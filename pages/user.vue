<template>
  <v-container fluid>
    <PageTitle>{{ user.full_name }}</PageTitle>
    <v-row>
      <v-col>
        <ListTasks :projects="projects" :tasks="userTasks" read-only></ListTasks>
      </v-col>
      <v-col>
        <ListReports :user="user" :projects="projects" :reports="userReports"></ListReports>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListTasks from '@/components/Tasks/ListTasks'
import ListReports from '@/components/Reports/ListReports'
export default {
  name: 'UserPage',
  components: { ListReports, ListTasks },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, error, params }) {
    try {
      const user = await $axios.get(`/api-adonis/users/${params.user_id}`)
      const projects = await $axios.get(`/api-adonis/projects`)
      const userTasks = await $axios.get(`/api-adonis/users/${params.user_id}/tasks`)
      const userReports = await $axios.get(`/api-adonis/users/${params.user_id}/reports`)
      return {
        user: user.data,
        projects: projects.data,
        userTasks: userTasks.data,
        userReports: userReports.data,
      }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      user: [],
      projects: [],
      userTasks: [],
      userReports: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
