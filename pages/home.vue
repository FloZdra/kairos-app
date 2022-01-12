<template>
  <v-container>
    <v-row>
      <v-col>
        <TaskPreview :projects="projects"></TaskPreview>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="pa-2">
          <ListProjects
            :projects="projects"
            @new-project="newProject"
            @edit-project="editProject"
          ></ListProjects>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog v-if="addEdit.dialog" v-model="addEdit.dialog" max-width="350">
      <AddEditProject :project="addEdit.project" @close="closeDialog"></AddEditProject>
    </v-dialog>
  </v-container>
</template>

<script>
import ListProjects from '@/components/Projects/ListProjects'
import AddEditProject from '@/components/Projects/AddEditProject'
import TaskPreview from '@/components/Tasks/TaskPreview'
export default {
  name: 'HomePage',
  components: { TaskPreview, AddEditProject, ListProjects },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, error }) {
    try {
      const response = await $axios.get(`/api/projects`)
      return { projects: response.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      tasks: [],
      projects: [],
      addEdit: {
        dialog: false,
        project: false,
      },
    }
  },
  methods: {
    async closeDialog(refresh) {
      console.log('hey')
      this.addEdit.dialog = false
      if (refresh) await this.$nuxt.refresh()
    },
    newProject() {
      this.addEdit.project = null
      this.addEdit.dialog = true
    },
    editProject(project) {
      this.addEdit.project = project
      this.addEdit.dialog = true
    },
  },
}
</script>

<style scoped></style>
