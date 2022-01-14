<template>
  <v-container>
    <v-row>
      <v-col>
        <ListProjects :projects="projects"></ListProjects>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListProjects from '@/components/Projects/ListProjects'
export default {
  name: 'ProjectsPage',
  components: { ListProjects },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, error }) {
    try {
      const projects = await $axios.get(`/api-adonis/projects`)
      return { projects: projects.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      projects: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
