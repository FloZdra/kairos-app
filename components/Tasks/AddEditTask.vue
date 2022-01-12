<template>
  <v-dialog
    :value="value"
    transition="dialog-bottom-transition"
    content-class="add-edit-dialog"
    scrollable
    @click:outside="closeDialog"
    @keydown.esc="closeDialog"
  >
    <v-card>
      <v-card-title class="text-h5 font-weight-medium">Add a task</v-card-title>

      <v-form ref="form" v-model="formValid" lazy-validation :disabled="loading || done">
        <v-card-text>
          <v-dialog
            ref="dialogDate"
            v-model="dialog.date"
            :return-value.sync="task.date"
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
              >
                <span>Hello flo</span>
                <template #message>hello</template>
              </v-text-field>
            </template>
            <v-date-picker v-model="task.date" color="primary" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog.date = false">Cancel</v-btn>
              <v-btn color="primary" @click="$refs.dialogDate.save(task.date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-row>
            <v-col>
              <v-dialog
                ref="dialogStart"
                v-model="dialog.start"
                :return-value.sync="task.start"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="task.start"
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
                  v-model="task.start"
                  format="24hr"
                  color="primary"
                  :max="task.end"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialog.start = false">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.dialogStart.save(task.start)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialogEnd"
                v-model="dialog.end"
                :return-value.sync="task.end"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="task.end"
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
                  v-model="task.end"
                  format="24hr"
                  color="primary"
                  :min="task.start"
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialog.end = false">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.dialogEnd.save(task.end)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-select
            v-model="task.project"
            :items="projects"
            item-text="name"
            :rules="requiredRule"
            label="Project"
            :menu-props="{ top: false, offsetY: true }"
            return-object
          ></v-select>

          <v-text-field v-model="task.name" :rules="requiredRule" label="Name"></v-text-field>

          <v-text-field v-model="task.description" label="Description"></v-text-field>
        </v-card-text>
        <v-card-actions class="px-4 pb-8">
          <v-spacer></v-spacer>
          <v-btn text :disabled="loading" @click="closeDialog">Close</v-btn>
          <v-btn
            class="px-3"
            :loading="loading"
            :disabled="loading"
            color="primary"
            @click="submit"
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
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
      task: defaultTask(),
      loading: false,
      done: false,
    }
  },
  computed: {
    dateFormatted() {
      return DateTime.fromISO(this.task.date).toLocaleString(DateTime.DATE_MED)
    },
  },
  methods: {
    closeDialog() {
      if (this.done) {
        this.task = defaultTask()
      }
      this.$refs.form.resetValidation()
      this.$emit('input', false)
    },
    async submit() {
      this.loading = true
      try {
        await this.$refs.form.validate()
        if (this.formValid) {
          // Login with spring boot server
          const start = DateTime.fromISO(this.task.date).plus({
            hours: this.task.start.split(':')[0],
            minutes: this.task.start.split(':')[1],
          })
          const end = DateTime.fromISO(this.task.date).plus({
            hours: this.task.end.split(':')[0],
            minutes: this.task.end.split(':')[1],
          })
          console.log(end.toISO())
          await this.$axios.post(`/api/projects/${this.task.project.id}/tasks`, {
            name: this.task.name,
            description: this.task.description,
            start,
            end,
          })
          this.done = true
        }
      } catch (e) {
        this.error = true
      }
      this.loading = false
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
