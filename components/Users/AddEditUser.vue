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
        {{
          (user ? 'Edit ' : 'Create ') +
          (roleAdmin ? 'an admin' : roleManager ? 'a manager' : 'a user')
        }}
      </v-card-title>

      <v-form ref="form" v-model="formValid" lazy-validation :disabled="loading || done">
        <v-card-text>
          <v-text-field
            v-model="userData.firstname"
            :rules="requiredRule"
            label="Firstname"
          ></v-text-field>
          <v-text-field
            v-model="userData.lastname"
            :rules="requiredRule"
            label="Lastname"
          ></v-text-field>
          <v-text-field v-model="userData.email" :rules="requiredRule" label="Email"></v-text-field>
          <v-text-field
            v-if="!user"
            v-model="userData.password"
            :rules="requiredRule"
            label="Password"
            type="password"
            autocomplete="new-password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="px-4 pb-8">
          <v-btn
            v-if="user"
            :disabled="loading || done"
            text
            color="error"
            class="px-3"
            @click="delete_.dialog = true"
          >
            Delete
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text :disabled="loading" @click="closeDialog">Close</v-btn>
          <v-btn
            class="px-3"
            :loading="loading"
            :disabled="loading || done"
            color="primary"
            type="submit"
            @click="submit"
          >
            <v-icon v-if="done">mdi-check</v-icon>
            <span v-else>
              {{ user ? 'Edit' : 'Create' }}
            </span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-dialog v-if="user" v-model="delete_.dialog" max-width="300" persistent>
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">Warning</v-card-title>
        <v-card-text>Are you sure you want to delete this user?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="px-3" @click="delete_.done ? closeDialog() : (delete_.dialog = false)">
            Close
          </v-btn>

          <v-btn
            class="error px-3"
            :loading="delete_.loading"
            :disabled="delete_.loading || delete_.done"
            @click="deleteUser"
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
const defaultUser = () => ({
  email: '',
  password: '',
  firstname: '',
  lastname: '',
})

export default {
  name: 'AddEditUser',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: null,
    },
    role: {
      type: String,
      default: 'USER',
    },
    managerId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      formValid: false,
      requiredRule: [(v) => !!v || 'Required!'],
      userData: defaultUser(),
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
    roleAdmin() {
      return this.role === 'ADMIN'
    },
    roleManager() {
      return this.role === 'MANAGER'
    },
  },
  watch: {
    user() {
      this.userData = this.user
        ? {
            email: this.user.email,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
          }
        : defaultUser()

      this.$refs.form?.resetValidation()
    },
  },
  methods: {
    closeDialog() {
      if (this.done || this.delete_.done) {
        this.userData = defaultUser()
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
          const userData = {
            email: this.userData.email,
            password: this.userData.password,
            firstname: this.userData.firstname,
            lastname: this.userData.lastname,
            role: this.role,
            manager_id: this.managerId,
          }

          if (this.user) {
            await this.$axios.patch(`/api-adonis/users/${this.user.id}`, userData)
          } else {
            await this.$axios.post(`/api-adonis/users`, userData)
          }
          this.done = true
        }
      } catch (e) {
        this.$nuxt.$emit('show-error', e)
      }
      this.loading = false
    },
    async deleteUser() {
      this.delete_.loading = true
      try {
        await this.$axios.delete(`/api-adonis/users/${this.user.id}`)
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
