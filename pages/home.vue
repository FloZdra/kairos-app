<template>
  <v-container>
    <v-row>
      <v-col>
        <ListTasks :projects="projects" :tasks="tasks"></ListTasks>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ListProjects :projects="projects"></ListProjects>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ListReports :projects="projects" :reports="reports"></ListReports>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListProjects from '@/components/Projects/ListProjects'
import ListReports from '@/components/Reports/ListReports'
import ListTasks from '@/components/Tasks/ListTasks'
export default {
  name: 'HomePage',
  components: { ListTasks, ListReports, ListProjects },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, store, error }) {
    try {
      const projects = await $axios.get(`/api-adonis/projects`)
      const tasks = await $axios.get(`/api-adonis/users/${store.state.user.id}/tasks`)
      const reports = await $axios.get(`/api-adonis/users/${store.state.user.id}/reports`)
      return { projects: projects.data, tasks: tasks.data, reports: reports.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      projects: [],
      tasks: [],
      reports: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
