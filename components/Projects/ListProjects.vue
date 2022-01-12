<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-baseline pb-0" cols="12">
        <span class="font-weight-bold text-subtitle-1">Recents projects</span>
      </v-col>
      <v-col v-for="(project, i) in projects" :key="i" cols="12" sm="4" md="3">
        <v-card
          height="100"
          color="primary"
          class="d-flex flex-column org-card"
          :to="{ path: `projects/${project.id}` }"
          append
          dark
        >
          <div style="position: absolute; right: 1px; top: 1px">
            <v-btn icon @click.stop.prevent="$emit('edit-project', project)">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </div>
          <v-card-title class="pb-0 text-subtitle-1 font-weight-bold d-inline text-truncate">
            {{ project.name }}
          </v-card-title>
          <v-card-text class="text-caption">
            {{ project.description }}
          </v-card-text>
          <v-spacer></v-spacer>
          <!--          <v-card-actions>-->
          <!--            <v-spacer></v-spacer>-->
          <!--            <v-avatar-->
          <!--              v-for="(user, idx) in org.users.slice(0, 3)"-->
          <!--              :key="idx"-->
          <!--              class="ml-n2"-->
          <!--              :color="user.color"-->
          <!--              size="32"-->
          <!--            >-->
          <!--              <span class="white&#45;&#45;text">{{ user.initials }}</span>-->
          <!--            </v-avatar>-->
          <!--            <span-->
          <!--              v-if="org.users.length > 3"-->
          <!--              class="text-caption ml-2"-->
          <!--              :class="getTextColor(org.color)"-->
          <!--            >-->
          <!--              {{ `+${org.users.length - 3} more` }}-->
          <!--            </span>-->
          <!--          </v-card-actions>-->
        </v-card>
      </v-col>
      <v-col v-if="projects.length === 0" cols="12">
        <span class="text-body-2">You have no projects at this time.</span>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-card height="100" class="d-flex flex-column" color="shade" @click="$emit('new-project')">
          <v-card-title class="pb-0 text-subtitle-1 font-weight-bold">
            <v-icon color="black" left>mdi-plus</v-icon>
            Add
          </v-card-title>
          <v-card-text class="text-caption">Create new project</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ListProjects',
  props: {
    projects: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  methods: {},
}
</script>

<style scoped>
.org-card {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
}
</style>
