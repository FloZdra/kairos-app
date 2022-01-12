<template>
  <div>
    <v-card elevation="8">
      <div class="d-flex align-baseline pa-3">
        <v-img
          class="mr-2 align-self-center"
          src="/kairos-logo-clock.svg"
          height="24"
          max-width="24"
        />
        <span class="text-subtitle-1 font-weight-medium">Your tasks</span>
        <v-spacer></v-spacer>
        <span class="primary--text text-caption">See all</span>
      </div>
      <v-divider></v-divider>
      <v-card-text class="pa-3">No record today</v-card-text>
      <v-divider></v-divider>
      <v-card-text
        v-ripple
        class="pa-3"
        style="user-select: none; cursor: pointer"
        @click="addTask"
      >
        <v-icon small class="mt-n1 pr-2">mdi-plus</v-icon>
        Add a task
      </v-card-text>
    </v-card>

    <AddEditTask v-model="add.dialog" :projects="projects"></AddEditTask>
  </div>
</template>

<script>
import AddEditTask from '@/components/Tasks/AddEditTask'
export default {
  name: 'TaskPreview',
  components: { AddEditTask },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      add: { dialog: false, task: null },
    }
  },
  methods: {
    addTask() {
      this.add.task = null
      this.add.dialog = true
    },
    editTask(task) {
      this.add.task = task
      this.add.dialog = true
    },
  },
}
</script>

<style scoped></style>
