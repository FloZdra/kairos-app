<template>
  <div>
    <v-card class="overflow-hidden">
      <div class="d-flex align-center pa-3">
        <span class="text-h6 font-weight-bold text-no-wrap">
          {{ recent ? 'Recent reports' : 'Reports' }}
        </span>
        <v-spacer></v-spacer>
        <v-btn
          v-if="reports.length > 0 && recent"
          text
          class="primary--text text-caption"
          small
          to="/reports"
        >
          {{ `See all (${reports.length})` }}
        </v-btn>
      </div>
      <div v-for="(report, i) in filteredReports" :key="i">
        <v-divider></v-divider>
        <div
          v-ripple
          class="d-flex align-start pa-3 text-body-2"
          style="user-select: none; cursor: pointer"
          @click="editReport(report)"
        >
          <v-icon size="20" left style="margin-top: 1px">mdi-file-clock</v-icon>
          <div class="text-no-wrap">
            <span>{{ reportMonth(report) }}</span>
            <!--            <v-icon small>mdi-circle-medium</v-icon>-->
            <!--            <span class="text&#45;&#45;secondary text-caption">{{ nbTasks(report) }}</span>-->
            <br />
            <span class="text--secondary text-caption">
              {{ nbTasks(report) }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="reports.length === 0">
        <v-divider></v-divider>
        <div class="d-flex align-center pa-3 text-body-2">No reports</div>
      </div>

      <div v-if="!readOnly">
        <v-divider></v-divider>
        <v-card-text
          v-ripple
          class="pa-3 text-body-2"
          style="user-select: none; cursor: pointer"
          @click="addReport"
        >
          <v-icon size="18" class="mt-n1" left>mdi-plus</v-icon>
          <span>Add a report</span>
        </v-card-text>
      </div>
    </v-card>

    <AddEditReport
      v-model="addEdit.dialog"
      :projects="projects"
      :report="addEdit.report"
      :read-only="readOnly"
      :user="user"
    ></AddEditReport>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import AddEditReport from '@/components/Reports/AddEditReport'
export default {
  name: 'ListReports',
  components: { AddEditReport },
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
    reports: {
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
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      addEdit: { dialog: false, report: null },
    }
  },
  computed: {
    filteredReports() {
      if (this.recent) {
        return this.reports.slice(0, 5)
      }
      return this.reports
    },
  },
  methods: {
    addReport() {
      this.addEdit.report = null
      this.addEdit.dialog = true
    },
    editReport(report) {
      this.addEdit.report = report
      this.addEdit.dialog = true
    },
    reportMonth(report) {
      return DateTime.fromISO(report.month).toLocaleString({ month: 'long', year: 'numeric' })
    },
    nbTasks(report) {
      const nb = report.tasks.length
      return `${nb} task${nb > 1 ? 's' : ''}`
    },
  },
}
</script>

<style scoped></style>
