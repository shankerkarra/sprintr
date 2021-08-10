<template>
  <div class="col-md-6 bg-primary d-flex">
    <p>{{ project.name }}</p>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { projectService } from '../services/ProjectService'
import Pop from '../utils/Notifier'
export default {
  props: {
    project: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      projects: computed(() => AppState.project),
      async getProjects() {
        try {
          await projectService.getAll()
        } catch (error) {
          Pop.toast('Couldn\'t Get Projects - ', error)
        }
      }
    }
  }
}
</script>
