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
        {{ (report ? 'Edit' : 'Create') + ' a report' }}
      </v-card-title>

      <v-form
        ref="form"
        v-model="formValid"
        lazy-validation
        :disabled="loading || done || !!report || readOnly"
      >
        <v-card-text>
          <v-dialog
            ref="dialogDate"
            v-model="dialog.month"
            :return-value.sync="reportData.month"
            persistent
            width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Month"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="reportData.month"
              color="primary"
              type="month"
              scrollable
              :max="maxMonth"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dialog.month = false">Cancel</v-btn>
              <v-btn color="primary" @click="$refs.dialogDate.save(reportData.month)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-card-text>
        <v-card-actions class="px-4 pb-8">
          <v-btn
            v-if="report && !$store.getters.isUser"
            text
            color="error"
            class="px-3"
            :disabled="readOnly"
            @click="delete_.dialog = true"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text :disabled="loading" @click="closeDialog">Close</v-btn>
          <v-btn
            class="px-3"
            :loading="loading"
            :disabled="loading || done || readOnly"
            color="primary"
            type="submit"
            @click="submit"
          >
            <v-icon v-if="done">mdi-check</v-icon>
            <span v-else>
              {{ report ? 'Download' : 'Create' }}
            </span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-dialog v-if="report" v-model="delete_.dialog" max-width="300" persistent>
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">Warning</v-card-title>
        <v-card-text>Are you sure you want to delete this report?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="px-3" @click="delete_.done ? closeDialog() : (delete_.dialog = false)">
            Close
          </v-btn>

          <v-btn
            class="error px-3"
            :loading="delete_.loading"
            :disabled="delete_.loading || delete_.done"
            @click="deleteReport"
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

const defaultReport = () => ({
  month: DateTime.now().minus({ month: 1 }).toFormat('yyyy-MM'),
})

export default {
  name: 'AddEditReport',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    report: {
      type: Object,
      default: null,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValid: false,
      requiredRule: [(v) => !!v || 'Required!'],
      dialog: {
        month: false,
      },
      reportData: defaultReport(),
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
      return DateTime.fromISO(this.reportData.month).toLocaleString({
        month: 'long',
        year: 'numeric',
      })
    },
    maxMonth() {
      return DateTime.now().minus({ month: 1 }).toISODate()
    },
  },
  watch: {
    report() {
      this.reportData = this.report ? { month: this.report.month } : defaultReport()
      this.$refs.form?.resetValidation()
    },
  },
  methods: {
    closeDialog() {
      if (this.done || this.delete_.done) {
        this.reportData = defaultReport()
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
          const userId = this.user?.id || this.$store.state.user.id

          if (this.report) {
            const response = await this.$axios.get(
              `/api-adonis/users/${userId}/reports/${this.report.id}`,
              {
                responseType: 'blob',
              }
            )
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', this.report.path) // or any other extension
            document.body.appendChild(link)
            link.click()
          } else {
            await this.$axios.post(`/api-adonis/users/${userId}/reports`, {
              month: this.reportData.month,
            })
          }

          this.done = true
        }
      } catch (e) {
        this.$nuxt.$emit('show-error', e)
      }
      this.loading = false
    },
    async deleteReport() {
      this.delete_.loading = true
      try {
        const userId = this.user?.id || this.$store.state.user.id
        await this.$axios.delete(`/api-adonis/users/${userId}/reports/${this.report.id}`)
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
