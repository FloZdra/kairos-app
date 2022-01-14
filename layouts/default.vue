<template>
  <v-app id="kairos-app">
    <v-snackbar v-model="snackbar" top rounded="lg" color="error darken-1">
      <div class="d-flex align-center">
        <v-icon left>mdi-alert-circle-outline</v-icon>
        <span>{{ error }}</span>
      </div>
    </v-snackbar>
    <v-app-bar app color="shade" height="70" elevate-on-scroll>
      <v-container class="pa-0 fill-height d-flex align-center">
        <nuxt-link to="/home" class="d-flex" style="text-decoration: none; color: inherit">
          <div class="d-flex flex-column">
            <span class="mt-1 text-caption">KAIROS</span>
            <span class="mt-n1 text-h5 font-weight-bold">{{ pageName }}</span>
          </div>
        </nuxt-link>

        <v-spacer></v-spacer>

        <v-menu offset-y left>
          <template #activator="{ on, attrs }">
            <v-avatar
              color="primary"
              size="45"
              class="ml-4 my-1 elevation-6"
              v-bind="attrs"
              v-on="on"
            >
              <span class="white--text text-body-1 font-weight-medium">
                {{ $store.state.user.initials }}
              </span>
            </v-avatar>
          </template>
          <v-card width="240">
            <v-card-title class="pa-0 shade">
              <v-avatar
                color="primary"
                size="40"
                class="mt-3 mx-auto mb-n5"
                style="border: solid 2px white"
              >
                <span class="white--text text-body-1 font-weight-medium">
                  {{ $store.state.user.initials }}
                </span>
              </v-avatar>
            </v-card-title>
            <div class="mt-7 px-3 text-center d-flex flex-column">
              <span class="text-caption font-weight-medium">
                {{ $store.state.user.full_name }}
              </span>
              <span class="text--secondary" style="font-size: 10px">
                {{ $store.state.user.email }}
              </span>
              <span
                class="text--secondary py-1 d-flex align-center justify-center"
                style="font-size: 10px"
              >
                <v-icon small class="mr-1">mdi-account-circle</v-icon>
                {{ $store.state.user.role }}
              </span>
            </div>
            <v-card-actions class="d-flex justify-center">
              <v-btn x-small text color="error" @click="logout">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="shade pb-14">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="11" lg="10">
            <nuxt></nuxt>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-bottom-navigation color="primary" background-color="shade" fixed>
      <v-btn value="home" to="/home">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn value="tasks" to="/tasks">
        <span>Tasks</span>

        <v-icon>mdi-view-headline</v-icon>
      </v-btn>

      <v-btn value="Projects" to="/Projects">
        <span>Projects</span>

        <v-icon>mdi-view-list</v-icon>
      </v-btn>

      <v-btn value="reports" to="/reports">
        <span>Reports</span>

        <v-icon>mdi-file-clock</v-icon>
      </v-btn>

      <!--      <v-btn value="timeline" to="/timeline">-->
      <!--        <span>Timeline</span>-->

      <!--        <v-icon>mdi-calendar-text</v-icon>-->
      <!--      </v-btn>-->
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { Settings } from 'luxon'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      search: '',
      snackbar: false,
      error: '',
    }
  },
  computed: {
    pageName() {
      switch (this.$route.name) {
        case 'home-page':
          return 'Home'
        case 'tasks-page':
          return 'Tasks'
        case 'projects-page':
          return 'Projects'
        case 'reports-page':
          return 'Reports'
      }
      return ''
    },
  },
  beforeCreate() {
    // Define DateTime default locale
    Settings.defaultLocale = 'en'
    this.$nuxt.$on('show-error', (e) => {
      if (typeof e === 'object') this.error = e.response?.data?.message || 'An error occurred'
      else if (typeof e === 'string') this.error = e
      else this.error = 'An error occurred'
      this.snackbar = true
      // setTimeout(() => (this.snackbar = false), 5e3)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('show-error')
  },
  methods: {
    logout() {
      document.cookie = 'auth._token=null;expires=Thu, 01 Jan 1970 00:00:01 GMT'
      delete this.$axios.defaults.headers.common.Authorization
      return this.$router.push('/')
    },

    async lookup() {
      await this.$router.push(`/home/lookup/${this.search}`)
    },
  },
}
</script>

<style>
/* width */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* Track */
::-webkit-scrollbar-track {
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #bdc2c9;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #9ba2ab;
}

body {
  background-color: #f3f3f3;
}
</style>
