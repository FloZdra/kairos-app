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
      <v-col cols="12" md="6" class="justify-center d-flex">
        <Login class="align-self-start align-self-md-center"></Login>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Login from '~/components/Login'

export default {
  name: 'WelcomePage',
  components: { Login },
  layout: 'empty',
  middleware: 'guest',
}
</script>

<style scoped></style>
