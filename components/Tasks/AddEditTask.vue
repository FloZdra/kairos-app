<template>
  <v-dialog
    :value="value"
    transition="dialog-bottom-transition"
    content-class="add-edit-dialog"
    scrollable
    max-width="500"
    @click:outside="closeDialog"
    @keydown.esc="closeDialog"
  >
    <v-card>
      <v-card-title class="pt-5 text-h5 font-weight-bold">
        {{ (task ? 'Edit' : 'Create') + ' a task' }}
      </v-card-title>

      <v-form ref="form" v-model="formValid" lazy-validation :disabled="loading || done || frozen">
        <v-card-text>
          <v-dialog
            ref="dialogDate"
            v-model="dialog.date"
            :return-value.sync="taskData.date"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="taskData.date" color="primary" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog.date = false">Cancel</v-btn>
              <v-btn color="primary" @click="$refs.dialogDate.save(taskData.date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-row>
            <v-col>
              <v-dialog
                ref="dialogStart"
                v-model="dialog.start"
                :return-value.sync="taskData.start"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="taskData.start"
                    label="Start"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    :rules="requiredRule"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="dialog.start"
                  v-model="taskData.start"
                  format="24hr"
                  color="primary"
                  :max="taskData.end"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialog.start = false">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.dialogStart.save(taskData.start)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialogEnd"
                v-model="dialog.end"
                :return-value.sync="taskData.end"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="taskData.end"
                    label="End"
                    prepend-icon="mdi-clock-time-seven-outline"
                    readonly
                    :rules="requiredRule"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="dialog.end"
                  v-model="taskData.end"
                  format="24hr"
                  color="primary"
                  :min="taskData.start"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialog.end = false">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.dialogEnd.save(taskData.end)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-select
            v-model="taskData.project"
            :items="projects"
            item-text="name"
            :rules="requiredRule"
            label="Project"
            :readonly="!!task"
            :menu-props="{ top: false, offsetY: true }"
            return-object
          ></v-select>

          <v-text-field v-model="taskData.name" :rules="requiredRule" label="Name"></v-text-field>

          <v-text-field v-model="taskData.description" label="Description"></v-text-field>
        </v-card-text>
        <v-card-actions class="px-4 pb-8">
          <v-btn
            v-if="task"
            :disabled="loading || done || frozen"
            text
            color="error"
            class="px-3"
            @click="delete_.dialog = true"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text :disabled="loading" @click="closeDialog">Close</v-btn>
          <v-btn
            class="px-3"
            :loading="loading"
            :disabled="loading || done || frozen"
            color="primary"
            @click="submit"
          >
            <v-icon v-if="done">mdi-check</v-icon>
            <span v-else>
              {{ task ? 'Edit' : 'Create' }}
            </span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-dialog v-if="task" v-model="delete_.dialog" max-width="300" persistent>
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">Warning</v-card-title>
        <v-card-text>Are you sure you want to delete this task?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="px-3" @click="delete_.done ? closeDialog() : (delete_.dialog = false)">
            Close
          </v-btn>

          <v-btn
            class="error px-3"
            :loading="delete_.loading"
            :disabled="delete_.loading || delete_.done"
            @click="deleteTask"
          >
            <v-icon v-if="delete_.done">mdi-check</v-icon>
            <span v-else>Delete</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import { DateTime } from 'luxon'

const defaultTask = () => ({
  date: DateTime.now().toISODate(),
  project: null,
  start: '',
  end: '',
  name: '',
  description: '',
})

export default {
  name: 'AddEditTask',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    projects: {
      type: Array,
      default: () => [],
    },
    task: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValid: false,
      requiredRule: [(v) => !!v || 'Required!'],
      dialog: {
        date: false,
        start: false,
        end: false,
      },
      taskData: defaultTask(),
      loading: false,
      done: false,
      delete_: {
        dialog: false,
        loading: false,
        done: false,
      },
    }
  },
  computed: {
    dateFormatted() {
      return DateTime.fromISO(this.taskData.date).toLocaleString(DateTime.DATE_MED)
    },
    frozen() {
      return !!this.task?.frozen_month_id
    },
  },
  watch: {
    task() {
      this.taskData = this.task
        ? {
            date: DateTime.fromISO(this.task.start).toISODate(),
            project: this.projects.find((p) => p.id === this.task.project_id),
            start: DateTime.fromISO(this.task.start).toFormat('HH:mm'),
            end: DateTime.fromISO(this.task.end).toFormat('HH:mm'),
            name: this.task.name,
            description: this.task.description,
          }
        : defaultTask()

      this.$refs.form?.resetValidation()
    },
  },
  methods: {
    closeDialog() {
      if (this.done || this.delete_.done) {
        this.taskData = defaultTask()
        this.done = false
        this.delete_.done = false
        this.$nuxt.refresh()
      }
      this.$refs.form.resetValidation()
      this.$emit('input', false)
    },
    async submit() {
      this.loading = true
      try {
        await this.$refs.form?.validate()
        if (this.formValid) {
          const taskData = {
            name: this.taskData.name,
            description: this.taskData.description,
            start: DateTime.fromISO(this.taskData.date).plus({
              hours: this.taskData.start.split(':')[0],
              minutes: this.taskData.start.split(':')[1],
            }),
            end: DateTime.fromISO(this.taskData.date).plus({
              hours: this.taskData.end.split(':')[0],
              minutes: this.taskData.end.split(':')[1],
            }),
          }

          if (this.task) {
            await this.$axios.patch(
              `/api-adonis/projects/${this.taskData.project.id}/tasks/${this.task.id}`,
              taskData
            )
          } else {
            await this.$axios.post(`/api-adonis/projects/${this.taskData.project.id}/tasks`, taskData)
          }
          this.done = true
        }
      } catch (e) {
        this.$nuxt.$emit('show-error', e)
      }
      this.loading = false
    },
    async deleteTask() {
      this.delete_.loading = true
      try {
        await this.$axios.delete(`/api-adonis/projects/${this.task.project_id}/tasks/${this.task.id}`)
        this.delete_.done = true
      } catch (e) {
        this.$nuxt.$emit('show-error', e)
      }
      this.delete_.loading = false
    },
  },
}
</script>

<style scoped>
>>> .add-edit-dialog {
  align-self: flex-end;
  border-radius: 2rem 2rem 0 0;
}
>>> .add-edit-dialog > .v-card {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
