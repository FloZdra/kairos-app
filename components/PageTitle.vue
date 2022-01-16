<template>
  <v-row>
    <v-col class="text-h5 font-weight-bold align-baseline d-flex">
      <v-btn v-if="!hideBackButton" icon small class="mr-3" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    hideBackButton: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped></style>
