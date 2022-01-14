<template>
  <div>
    <v-card>
      <div class="d-flex align-end pa-3">
        <!--        <v-img-->
        <!--          class="mr-2 align-self-center"-->
        <!--          src="/kairos-logo-clock.svg"-->
        <!--          height="24"-->
        <!--          max-width="24"-->
        <!--        />-->
        <span class="text-h6 font-weight-bold">Latest projects</span>
        <v-spacer></v-spacer>

        <v-btn v-if="projects.length > 0" text class="primary--text text-body-2" to="/projects">
          {{ `See all (${projects.length})` }}
        </v-btn>
      </div>
      <div v-for="(project, i) in projects" :key="i">
        <v-divider></v-divider>
        <div
          v-ripple
          class="d-flex align-start pa-3 text-body-2 text-truncate"
          style="user-select: none; cursor: pointer"
          @click="editProject(project)"
        >
          <v-icon size="20" left style="margin-top: 1px">mdi-view-list</v-icon>
          <div class="text-truncate">
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
    </v-card>

    <AddEditProject v-model="addEdit.dialog" :project="addEdit.project"></AddEditProject>
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
    limit: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      addEdit: { dialog: false, project: null },
    }
  },
  computed: {
    filteredProjects() {
      if (this.limit) {
        return this.projects.slice(0, +this.limit)
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
