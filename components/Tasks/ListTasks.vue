<template>
  <div>
    <v-card>
      <div class="d-flex align-baseline pa-3">
        <!--        <v-img-->
        <!--          class="mr-2 align-self-center"-->
        <!--          src="/kairos-logo-clock.svg"-->
        <!--          height="24"-->
        <!--          max-width="24"-->
        <!--        />-->
        <span class="text-h6 font-weight-bold">Recent tasks</span>
        <v-spacer></v-spacer>
        <span class="primary--text text-body-2">See all</span>
      </div>
      <v-divider></v-divider>
      <div
        v-for="(task, i) in tasks"
        :key="i"
        v-ripple
        class="d-flex align-start pa-3 text-body-2 text-truncate"
        style="user-select: none; cursor: pointer"
        @click="editTask(task)"
      >
        <v-icon size="18" left :color="task.frozen ? '' : 'success'">
          {{ task.frozen ? 'mdi-check-circle-outline' : 'mdi-record-circle-outline' }}
        </v-icon>
        <div>
          <span>{{ task.name }}</span>
          <v-icon small>mdi-circle-medium</v-icon>
          <span class="text--secondary text-caption">{{ projectName(task) }}</span>
          <br />
          <span class="text--secondary text-caption">
            {{ task.description || 'No description' }}
          </span>
        </div>
      </div>
      <div v-if="tasks.length === 0" class="d-flex align-center pa-3 text-body-2">No record</div>
      <v-divider></v-divider>
      <v-card-text
        v-ripple
        class="pa-3 text-body-2"
        style="user-select: none; cursor: pointer"
        @click="addTask"
      >
        <v-icon size="18" class="mt-n1" left>mdi-plus</v-icon>
        <span>Add a task</span>
      </v-card-text>
    </v-card>

    <AddEditTask v-model="addEdit.dialog" :projects="projects" :task="addEdit.task"></AddEditTask>
  </div>
</template>

<script>
import AddEditTask from '@/components/Tasks/AddEditTask'
export default {
  name: 'ListTasks',
  components: { AddEditTask },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    tasks: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addEdit: { dialog: false, task: null },
    }
  },
  methods: {
    addTask() {
      this.addEdit.task = null
      this.addEdit.dialog = true
    },
    editTask(task) {
      this.addEdit.task = task
      this.addEdit.dialog = true
    },
    projectName(task) {
      return this.projects.find((p) => p.id === task.project_id)?.name || 'Error'
    },
  },
}
</script>

<style scoped></style>
