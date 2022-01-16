<template>
  <v-container fluid>
    <PageTitle>Reports</PageTitle>
    <v-row>
      <v-col>
        <ListReports :reports="reports"></ListReports>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListReports from '@/components/Reports/ListReports'
export default {
  name: 'TasksPage',
  components: { ListReports },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, store, error }) {
    try {
      const reports = await $axios.get(`/api-adonis/users/${store.state.user.id}/reports`)
      return { reports: reports.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      reports: [],
    }
  },
  methods: {},
}
</script>

<style scoped></style>
