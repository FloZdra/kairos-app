<template>
  <v-container class="fill-height pa-0" fluid>
    <v-row class="fill-height ma-0">
      <v-col
        cols="12"
        md="6"
        :class="{
          'fill-height': $vuetify.breakpoint.mdAndUp,
        }"
        class="justify-center d-flex align-center"
        :style="{
          'height: 200px': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div class="d-flex flex-column align-center">
          <v-img
            src="/kairos-logo.svg"
            :max-width="$vuetify.breakpoint.smAndDown ? 300 : 400"
            contain
            class="mb-4"
          />
          <span class="d-block text-h6 font-weight-bold primary--text">Track your work time.</span>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-self-md-center justify-center">
        <div v-if="show === 'menu'" class="d-flex flex-column align-center">
          <v-hover>
            <template #default="{ hover }">
              <v-card
                :elevation="hover ? 12 : 3"
                class="my-3 py-3 transition-swing"
                :width="$vuetify.breakpoint.xs ? 300 : 350"
                @click="show = 'login'"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 font-weight-bold">Login</v-list-item-title>
                    <v-list-item-subtitle style="white-space: normal">
                      Log in the application.
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
          </v-hover>

          <v-hover>
            <template #default="{ hover }">
              <v-card
                :elevation="hover ? 12 : 3"
                class="my-3 py-3 transition-swing"
                :width="$vuetify.breakpoint.xs ? 300 : 350"
                @click="show = 'register'"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 font-weight-bold">Register</v-list-item-title>
                    <v-list-item-subtitle style="white-space: normal">
                      Don't have an account yet ?
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
          </v-hover>
        </div>

        <div v-else class="d-flex flex-column align-center">
          <v-btn icon class="black--text align-self-start mb-3" large @click="show = 'menu'">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <Login v-show="show === 'login'"></Login>
          <Register v-show="show === 'register'"></Register>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from '~/components/Login'
import Register from '~/components/Register'

export default {
  name: 'WelcomePage',
  components: { Login, Register },
  layout: 'empty',
  middleware: 'guest',
  data() {
    return {
      show: 'menu', // enum('menu', 'login', 'register')
    }
  },
}
</script>

<style scoped></style>
