<template>
  <v-container>
    <v-row>
      <v-col>
        <ListTasks :projects="projects" :tasks="tasks"></ListTasks>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListTasks from '@/components/Tasks/ListTasks'
export default {
  name: 'TasksPage',
  components: { ListTasks },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, store, error }) {
    try {
      const projects = await $axios.get(`/api-adonis/projects`)
      const tasks = await $axios.get(`/api-adonis/users/${store.state.user.id}/tasks`)
      return { projects: projects.data, tasks: tasks.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      projects: [],
      tasks: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
