<template>
  <v-chip small label class="px-2 primary--text" color="#e0cfff">
    <v-icon small class="mr-1" color="secondary darken-2">{{ icon }}</v-icon>
    <span class="text-caption secondary--text text--darken-2">{{ roleName }}</span>
  </v-chip>
</template>

<script>
export default {
  name: 'UserRole',
  props: {
    role: {
      type: String,
      default: null,
    },
  },
  computed: {
    manager() {
      return this.role === 'MANAGER'
    },
    admin() {
      return this.role === 'ADMIN'
    },
    roleName() {
      return this.admin ? 'Admin' : this.manager ? 'Manager' : 'User'
    },
    icon() {
      return this.admin ? 'mdi-crown' : this.manager ? 'mdi-account-tie' : 'mdi-account'
    },
  },
}
</script>

<style scoped></style>
