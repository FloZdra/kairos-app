<template>
  <v-container>
    <v-row>
      <v-col>
        <TaskPreview :projects="projects" :tasks="tasks"></TaskPreview>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ListProjects :projects="projects"></ListProjects>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListProjects from '@/components/Projects/ListProjects'
import TaskPreview from '@/components/Tasks/ListTasks'
export default {
  name: 'HomePage',
  components: { TaskPreview, ListProjects },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, store, error }) {
    try {
      const projects = await $axios.get(`/api/projects`)
      const tasks = await $axios.get(`/api/users/${store.state.user.id}/tasks`)
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
