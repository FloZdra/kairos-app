<template>
  <v-container>
    <v-row>
      <v-col v-for="(project, i) in projects" :key="i" cols="12" sm="6" md="4" lg="3">
        <v-card
          height="150"
          class="d-flex flex-column org-card"
          :color="getCardColor(i)"
          :to="{ path: `projects/${project.id}` }"
          append
          dark
        >
          <!--          <div style="position: absolute; right: 1px; top: 1px">-->
          <!--            <v-btn icon @click.stop.prevent="$emit('edit-project', project)">-->
          <!--              <v-icon :class="getTextColor(i)">mdi-dots-vertical</v-icon>-->
          <!--            </v-btn>-->
          <!--          </div>-->
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
        <span>You have no projects at this time.</span>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card height="150" class="d-flex flex-column" color="shade" @click="$emit('new-project')">
          <v-card-title class="pb-0 text-subtitle-1 font-weight-bold">
            <v-icon color="black" left>mdi-plus</v-icon>
            Add
          </v-card-title>
          <v-card-text class="text-caption">Create new project</v-card-text>
          <v-spacer></v-spacer>
          <!--          <v-card-actions>-->
          <!--            <v-spacer></v-spacer>-->
          <!--            <span class="text-caption font-weight-bold ml-2">-->
          <!--              {{ `Invite people` }}-->
          <!--            </span>-->
          <!--          </v-card-actions>-->
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
  methods: {
    getCardColor(index) {
      const colors = ['#0f766e', '#be123c', '#6d28d9', '#047857', '#c2410c', '#4338ca']
      return colors[index]
    },
    getTextColor(bgColor = '#ffffffff') {
      const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
      const r = parseInt(color.substring(0, 2), 16) // hexToR
      const g = parseInt(color.substring(2, 4), 16) // hexToG
      const b = parseInt(color.substring(4, 6), 16) // hexToB
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? 'black--text' : 'white--text'
    },
  },
}
</script>

<style scoped>
.org-card {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
}
</style>
