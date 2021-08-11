<template>
  <div class="row bg-dark justify-content-start">
    <div class="col-md-2 col-6 border border-dark text-center bg-light">
      <h4> Backlog </h4>
    </div>
    <div class="col-md-2 col-6 border border-dark text-center bg-grey">
      <router-link :to="{ name: 'ProjectSprint' }">
        <h4> Sprint </h4>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'

export default {
  name: 'ProjectBacklog',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await projectService.getBacklogByProject(route.params.id)
      } catch (error) {
        Pop.toast('Error fetching Sprints', error)
      }
    })
  }
}
</script>
