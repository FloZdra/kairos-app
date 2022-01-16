<template>
  <div>
    <v-card class="overflow-hidden">
      <div class="d-flex align-end pa-3">
        <span class="text-h6 font-weight-bold text-no-wrap">Managers</span>
      </div>
      <div v-for="(user, i) in users" :key="i">
        <v-divider></v-divider>
        <div
          v-ripple
          class="d-flex align-start pa-3 text-body-2"
          style="user-select: none; cursor: pointer"
          @click="editUser(user)"
        >
          <v-icon size="20" left style="margin-top: 1px">mdi-account</v-icon>
          <div class="text-no-wrap">
            <span>{{ user.full_name }}</span>
            <!--            <v-icon small>mdi-circle-medium</v-icon>-->
            <v-chip small label class="ml-2 px-2 primary--text" color="#e6f3fe">
              {{ user.email }}
            </v-chip>
          </div>
        </div>
      </div>
      <div v-if="users.length === 0">
        <v-divider></v-divider>
        <div class="d-flex align-center pa-3 text-body-2">There are no managers</div>
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
          <span>Add a manager</span>
        </v-card-text>
      </div>
    </v-card>

    <AddEditUser v-model="addEdit.dialog" :user="addEdit.user" role="MANAGER"></AddEditUser>
  </div>
</template>

<script>
import AddEditUser from '@/components/Users/AddEditUser'
export default {
  name: 'ListManagers',
  components: { AddEditUser },
  props: {
    users: {
      type: Array,
      default: () => [],
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
  },
}
</script>

<style scoped></style>
