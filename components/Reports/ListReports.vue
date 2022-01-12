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
        <span class="text-h6 font-weight-bold">Reports</span>
        <v-spacer></v-spacer>
        <span class="primary--text text-body-2">See all</span>
      </div>
      <div v-for="(report, i) in reports" :key="i">
        <v-divider></v-divider>
        <div
          v-ripple
          class="d-flex align-start pa-3 text-body-2 text-truncate"
          style="user-select: none; cursor: pointer"
          @click="editReport(report)"
        >
          <v-icon size="20" left>mdi-file-clock</v-icon>
          <div class="text-truncate">
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
    </v-card>

    <AddEditReport
      v-model="addEdit.dialog"
      :projects="projects"
      :report="addEdit.report"
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
  },
  data() {
    return {
      addEdit: { dialog: false, report: null },
    }
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
