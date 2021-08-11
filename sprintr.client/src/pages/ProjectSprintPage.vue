<template>
  <div class="row bg-dark justify-content-start">
    <div class="col-md-2 col-12 text-light">
      <h5 class="hoverable pt-1" data-toggle="modal" data-target="#exampleModalCenter">
        {{ project.name }}
      </h5>

      <div class="modal fade"
           id="exampleModalCenter"
           tabindex="-1"
           role="dialog"
           aria-labelledby="exampleModalCenterTitle"
           aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered text-dark" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {{ project.name }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="!project.description">
              <p>No Description Provided</p>
            </div>
            <div class="modal-body" v-else>
              <p>{{ project.description }}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2 col-6 border border-dark text-center bg-grey">
      <router-link :to="{ name: 'ProjectBacklog' }">
        <h4> Backlog </h4>
      </router-link>
    </div>
    <div class="col-md-2 col-6 border border-dark text-center bg-light">
      <h4> Sprint </h4>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'
import { AppState } from '../AppState'
export default {
  name: 'ProjectSprint',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await projectService.getById(route.params.id)
        await projectService.getSprintsByProject(route.params.id)
      } catch (error) {
        Pop.toast('Error fetching Sprints', error)
      }
    })
    return {
      project: computed(() => AppState.activeProject)
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor: pointer;
}
</style>
