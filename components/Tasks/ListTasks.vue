<template>
  <div>
    <v-card class="overflow-hidden">
      <div class="d-flex align-center pa-3">
        <span class="text-h6 font-weight-bold text-no-wrap">{{ recent ? 'Recent tasks' : 'Tasks' }}</span>
        <v-spacer></v-spacer>

        <v-btn v-if="tasks.length > 0 && recent" text class="primary--text text-caption" small to="/tasks">
          {{ `See all (${tasks.length})` }}
        </v-btn>
      </div>
      <div v-for="(task, i) in filteredTasks" :key="i">
        <v-divider></v-divider>
        <div
          v-ripple
          class="d-flex align-start pa-3 text-body-2"
          style="user-select: none; cursor: pointer"
          @click="editTask(task)"
        >
          <v-icon
            size="20"
            left
            :color="task.frozen_month_id ? 'secondary' : 'success'"
            style="margin-top: 1px"
          >
            {{ task.frozen_month_id ? 'mdi-check-circle-outline' : 'mdi-record-circle-outline' }}
          </v-icon>
          <div class="text-no-wrap">
            <span>{{ task.name }}</span>
            <!--            <v-icon small>mdi-circle-medium</v-icon>-->
            <v-chip small label class="ml-2 px-2 primary--text" color="#e6f3fe">
              {{ projectName(task) }}
            </v-chip>
            <br />
            <span class="text--secondary text-caption">
              {{ formatStartEnd(task) }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="tasks.length === 0">
        <v-divider></v-divider>
        <div class="d-flex align-center pa-3 text-body-2">No tasks</div>
      </div>

      <div v-if="!readOnly">
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
      </div>
    </v-card>

    <AddEditTask
      v-model="addEdit.dialog"
      :projects="projects"
      :task="addEdit.task"
      :read-only="readOnly"
    ></AddEditTask>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
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
      addEdit: { dialog: false, task: null },
    }
  },
  computed: {
    filteredTasks() {
      if (this.recent) {
        return this.tasks.slice(0, 5)
      }
      return this.tasks
    },
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
    formatStartEnd(task) {
      return (
        DateTime.fromISO(task.start).toLocaleString(DateTime.DATE_MED) +
        ', ' +
        DateTime.fromISO(task.start).toFormat('HH:mm') +
        ' - ' +
        DateTime.fromISO(task.end).toFormat('HH:mm')
      )
    },
  },
}
</script>

<style scoped></style>
