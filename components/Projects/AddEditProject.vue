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
        {{ (project ? 'Edit' : 'Create') + ' a project' }}
      </v-card-title>

      <v-form ref="form" v-model="formValid" lazy-validation :disabled="loading || done">
        <v-card-text>
          <v-text-field
            v-model="projectData.name"
            :rules="requiredRule"
            label="Name"
          ></v-text-field>

          <v-text-field
            v-model="projectData.description"
            :rules="requiredRule"
            label="Description"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="px-4 pb-8">
          <v-btn
            v-if="project"
            text
            color="error"
            class="px-3"
            :disabled="loading || done"
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
            @click="submit"
          >
            <v-icon v-if="done">mdi-check</v-icon>
            <span v-else>
              {{ project ? 'Edit' : 'Create' }}
            </span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <v-dialog v-if="project" v-model="delete_.dialog" max-width="300" persistent>
      <v-card>
        <v-card-title class="text-h5 font-weight-bold">Warning</v-card-title>
        <v-card-text>Are you sure you want to delete this project?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="px-3" @click="delete_.done ? closeDialog() : (delete_.dialog = false)">
            Close
          </v-btn>

          <v-btn
            class="error px-3"
            :loading="delete_.loading"
            :disabled="delete_.loading || delete_.done"
            @click="deleteProject"
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
const defaultProject = () => ({
  name: '',
  description: '',
})

export default {
  name: 'AddEditProject',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formValid: false,
      requiredRule: [(v) => !!v || 'Required!'],
      projectData: defaultProject(),
      loading: false,
      done: false,
      delete_: {
        dialog: false,
        loading: false,
        done: false,
      },
    }
  },
  watch: {
    project() {
      this.projectData = this.project
        ? {
            name: this.project.name,
            description: this.project.description,
          }
        : defaultProject()

      this.$refs.form?.resetValidation()
    },
  },
  methods: {
    closeDialog() {
      if (this.done || this.delete_.done) {
        this.projectData = defaultProject()
        this.done = false
        this.delete_.done = false
        this.delete_.dialog = false
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
          const projectData = {
            name: this.projectData.name,
            description: this.projectData.description,
          }

          if (this.project) {
            await this.$axios.patch(`/api/projects/${this.project.id}`, projectData)
          } else {
            await this.$axios.post(`/api/projects`, projectData)
          }
          this.done = true
        }
      } catch (e) {
        this.$nuxt.$emit('show-error', e)
      }
      this.loading = false
    },
    async deleteProject() {
      this.delete_.loading = true
      try {
        await this.$axios.delete(`/api/projects/${this.project.id}`)
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
