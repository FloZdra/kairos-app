<template>
  <v-app id="kairos-app">
    <v-app-bar app color="shade" height="70" elevate-on-scroll>
      <v-container class="pa-0 fill-height d-flex align-center">
        <nuxt-link to="/home" class="d-flex" style="text-decoration: none; color: inherit">
          <div class="d-flex flex-column">
            <span class="mt-1 text-caption">KAIROS</span>
            <span class="mt-n1 text-h5 font-weight-medium">{{ pageName }}</span>
          </div>
        </nuxt-link>

        <v-spacer></v-spacer>

        <v-responsive v-if="$vuetify.breakpoint.smAndUp" max-width="260">
          <v-text-field
            v-model="search"
            class="text-caption"
            rounded
            placeholder="Search project"
            hide-details
            dark
            background-color="primary"
            @keydown.enter="lookup"
          ></v-text-field>
        </v-responsive>

        <v-menu offset-y>
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
              <span
                class="text--secondary py-1 d-flex align-center justify-center"
                style="font-size: 10px"
              >
                <v-icon small class="mr-1">mdi-account-circle</v-icon>
                {{ $store.state.user.role }}
              </span>
              <span class="text--secondary" style="font-size: 10px">
                {{ $store.state.user.email }}
              </span>
            </div>
            <v-card-actions class="d-flex justify-center mt-2">
              <v-btn x-small text color="error" @click="logout">Logout</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12" sm="11" lg="10">
            <nuxt></nuxt>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Settings } from 'luxon'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      search: '',
      links: ['Dashboard'],
    }
  },
  computed: {
    pageName() {
      switch (this.$route.name) {
        case 'home-page':
          return 'Home'
      }
      return ''
    },
  },
  beforeCreate() {
    // Define DateTime default locale
    Settings.defaultLocale = 'en'
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
  background-color: #eeeeee;
}
</style>
