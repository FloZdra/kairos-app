<template>
  <div>
    <v-card class="overflow-hidden">
      <div class="d-flex align-center pa-3">
        <span class="text-h6 font-weight-bold text-no-wrap">
          {{ recent ? 'Recent projects' : 'Projects' }}
        </span>
        <v-spacer></v-spacer>

        <v-btn
          v-if="projects.length > 0 && recent"
          text
          class="primary--text text-caption"
          small
          to="/projects"
        >
          {{ `See all (${projects.length})` }}
        </v-btn>
      </div>
      <div v-for="(project, i) in projects" :key="i">
        <v-divider></v-divider>
        <div
          v-ripple
          class="d-flex align-start pa-3 text-body-2"
          style="user-select: none; cursor: pointer"
          @click="editProject(project)"
        >
          <v-icon size="20" left style="margin-top: 1px">mdi-view-list</v-icon>
          <div class="text-no-wrap">
            <span>{{ project.name }}</span>
            <!--            <v-icon small>mdi-circle-medium</v-icon>-->
            <!--            <span class="text&#45;&#45;secondary text-caption">{{ 'metadata' }}</span>-->
            <br />
            <span class="text--secondary text-caption">{{ project.description }}</span>
          </div>
        </div>
      </div>
      <div v-if="projects.length === 0">
        <v-divider></v-divider>
        <div class="d-flex align-center pa-3 text-body-2">No projects</div>
      </div>

      <div v-if="!$store.getters.isUser">
        <v-divider></v-divider>
        <v-card-text
          v-ripple
          class="pa-3 text-body-2"
          style="user-select: none; cursor: pointer"
          @click="newProject"
        >
          <v-icon size="18" class="mt-n1" left>mdi-plus</v-icon>
          <span>Add a project</span>
        </v-card-text>
      </div>
    </v-card>

    <AddEditProject
      v-model="addEdit.dialog"
      :project="addEdit.project"
      :read-only="readOnly || $store.getters.isUser"
    ></AddEditProject>
  </div>
</template>

<script>
import AddEditProject from '@/components/Projects/AddEditProject'
export default {
  name: 'ListProjects',
  components: { AddEditProject },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    recent: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      addEdit: { dialog: false, project: null },
    }
  },
  computed: {
    filteredProjects() {
      if (this.recent) {
        return this.projects.slice(0, 5)
      }
      return this.projects
    },
  },
  methods: {
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
