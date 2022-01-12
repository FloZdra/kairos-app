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

      <v-form ref="form" v-model="formValid" lazy-validation>
        <v-card-text>
          <v-dialog
            ref="dialogDate"
            v-model="dialog.date"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                :value="dateFormatted"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              >
                <template #message>hello</template>
              </v-text-field>
            </template>
            <v-date-picker v-model="date" color="primary" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog.date = false">Cancel</v-btn>
              <v-btn color="primary" @click="$refs.dialogDate.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>

          <v-row>
            <v-col>
              <v-dialog
                ref="dialogStart"
                v-model="dialog.start"
                :return-value.sync="start"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="start"
                    label="Start"
                    prepend-icon="mdi-clock-time-four-outline"
                    readonly
                    :rules="requiredRule"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="dialog.start" v-model="start" format="24hr" :max="end">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialog.start = false">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.dialogStart.save(start)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-dialog
                ref="dialogEnd"
                v-model="dialog.end"
                :return-value.sync="end"
                persistent
                width="290px"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="end"
                    label="End"
                    prepend-icon="mdi-clock-time-seven-outline"
                    readonly
                    :rules="requiredRule"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker v-if="dialog.end" v-model="end" format="24hr" :min="start">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="dialog.end = false">Cancel</v-btn>
                  <v-btn color="primary" @click="$refs.dialogEnd.save(end)">OK</v-btn>
                </v-time-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-select
            v-model="project"
            :items="projects"
            item-text="name"
            :rules="requiredRule"
            label="Project"
            :menu-props="{ top: false, offsetY: true }"
            return-object
          ></v-select>

          <v-text-field v-model="name" :rules="requiredRule" label="Name"></v-text-field>

          <v-text-field
            v-model="description"
            :rules="requiredRule"
            label="Description"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="px-4 pb-8">
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Close</v-btn>
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
      project: null,
      name: '',
      description: '',
      dialog: {
        date: false,
        start: false,
        end: false,
      },
      date: DateTime.now().toISODate(),
      start: '',
      end: '',
      loading: false,
    }
  },
  computed: {
    dateFormatted() {
      return DateTime.fromISO(this.date).toLocaleString(DateTime.DATE_MED)
    },
  },
  methods: {
    closeDialog() {
      // this.$refs.form.reset()
      this.$emit('input', false)
    },
    async submit() {
      this.loading = true
      try {
        await this.$refs.form.validate()
        if (this.formValid) {
          // Login with spring boot server
          const response = await this.$axios.post(`/api/projects/${this.project.id}/tasks`, {
            name: this.name,
            description: this.description,
            start: '2021-12-09T11:59:26.562+01:00',
            end: '2021-12-09T12:22:00.562+01:00',
          })

          // Store cookie and go home
          document.cookie = `auth._token=${response.data.accessToken}`
          return this.$router.push('/home')
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
