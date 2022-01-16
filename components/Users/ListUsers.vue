<template>
  <div>
    <v-card class="overflow-hidden">
      <div class="d-flex align-end pa-3">
        <span class="text-h6 font-weight-bold text-no-wrap">
          {{ managers ? 'Managers' : 'Users' }}
        </span>
      </div>
      <div v-for="(user, i) in users" :key="i">
        <v-divider></v-divider>
        <router-link
          v-slot="{ navigate }"
          custom
          :to="managers ? `${user.id}` : `users/${user.id}`"
          append
        >
          <div
            v-ripple
            class="d-flex align-start pa-3 text-body-2"
            style="user-select: none; cursor: pointer"
            @click="navigate"
          >
            <v-icon size="20" left style="margin-top: 1px">
              {{ managers ? 'mdi-account-tie' : 'mdi-account' }}
            </v-icon>
            <div class="text-no-wrap">
              <span>{{ user.full_name }}</span>
              <!--            <v-icon small>mdi-circle-medium</v-icon>-->
              <v-chip small label class="ml-2 px-2 primary--text" color="#e6f3fe">
                {{ user.email }}
              </v-chip>

              <br />

              <div v-if="managers" class="text--secondary text-caption d-flex align-center">
                <v-icon small color="secondary">mdi-account</v-icon>
                <span class="ml-2">
                  {{ user.users.length + ' user' + (user.users.length > 1 ? 's' : '') }}
                </span>
              </div>
              <div v-else class="text--secondary text-caption d-flex align-center">
                <v-icon small color="success">mdi-record-circle-outline</v-icon>
                <span class="ml-1">
                  {{ user.tasks.filter((t) => !t.frozen_month).length }}
                </span>
                <v-icon small color="secondary" class="ml-2">mdi-check-circle-outline</v-icon>
                <span class="ml-1">
                  {{ user.tasks.filter((t) => t.frozen_month).length }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="users.length === 0">
        <v-divider></v-divider>
        <div class="d-flex align-center pa-3 text-body-2">There are no users</div>
      </div>

      <div>
        <v-divider></v-divider>
        <v-card-text
          v-ripple
          class="pa-3 text-body-2"
          style="user-select: none; cursor: pointer"
          @click="addUser"
        >
          <v-icon size="18" class="mt-n1" left>mdi-plus</v-icon>
          <span>{{ managers ? 'Add a manager' : 'Add a user' }}</span>
        </v-card-text>
      </div>
    </v-card>

    <AddEditUser v-model="addEdit.dialog" :user="addEdit.user"></AddEditUser>
  </div>
</template>

<script>
import AddEditUser from '@/components/Users/AddEditUser'
export default {
  name: 'ListUsers',
  components: { AddEditUser },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
    managers: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      addEdit: { dialog: false, user: null },
    }
  },
  computed: {},
  methods: {
    addUser() {
      this.addEdit.user = null
      this.addEdit.dialog = true
    },
    editUser(user) {
      this.addEdit.user = user
      this.addEdit.dialog = true
    },
    getClosedTasks(tasks) {
      return tasks.filter((t) => t.frozen_month).length
    },
  },
}
</script>

<style scoped></style>
