<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline">
        <span class="text-h5 font-weight-black">{{ `Hello ${$store.getters.fullName}` }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-0">
        <v-sheet min-height="70vh" rounded="lg" class="pa-2">
          <ListProjects :projects="projects"></ListProjects>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListProjects from '@/components/Projects/ListProjects'
export default {
  name: 'HomePage',
  components: { ListProjects },
  layout: 'default',
  middleware: 'auth',
  async asyncData({ $axios, error }) {
    try {
      const response = await $axios.get(`/api/projects`)
      return { projects: response.data }
    } catch (e) {
      return error({ statusCode: 500, message: 'Internal server error' })
    }
  },
  data() {
    return {
      projects: [],
      // organisationSelected: null,
      // dialog: false,
    }
  },
  methods: {
    // async closeDialog(refresh) {
    //   this.dialog = false
    //   if (refresh) await this.$nuxt.refresh()
    // },
    // newOrganisation() {
    //   this.organisationSelected = null
    //   this.dialog = true
    // },
    // editOrganisation(org) {
    //   this.organisationSelected = org
    //   this.dialog = true
    // },
  },
}
</script>

<style scoped></style>
