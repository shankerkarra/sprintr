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
    <div class="col-md-2 col-6 border-left border-right border-bottom border-dark text-center bg-grey">
      <router-link :to="{ name: 'ProjectBacklog', params: {projectId: project.id} }">
        <h4> Backlog </h4>
      </router-link>
    </div>
    <div class="col-md-2 col-6 border-right border-bottom border-dark text-center bg-light">
      <h4> Sprint </h4>
    </div>
  </div>
  <div class="row mt-2 justify-content-center">
    <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#sprint">
      Make Sprint
    </button>
    <div class="modal fade"
         id="sprint"
         tabindex="-1"
         role="dialog"
         aria-labelledby="sprintLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="sprintLabel">
              New Sprint
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="create()">
              <div class="form-group">
                <label for="sprint-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" v-model="state.newSprint.name" id="sprint-name" required>
              </div>
              <div class="form-group">
                <label for="startDate" class="col-form-label">Start Date:</label>
                <input type="date" class="form-control" v-model="state.newSprint.startDate" id="startDate" required>
              </div>
              <div class="form-group">
                <label for="endDate" class="col-form-label">End Date:</label>
                <input type="date" class="form-control" v-model="state.newSprint.endDate" id="endDate" required>
              </div>
              <div class="d-flex justify-content-between">
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="isOpen" v-model="state.newSprint.isOpen">
                    <label class="form-check-label" for="isOpen" required>
                      Is Open?
                    </label>
                  </div>
                </div>
                <button type="submit" class="btn btn-success">
                  Create
                </button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-content-center mt-3">
    <SprintsCard v-for="s in sprints" :key="s.id" :sprint="s" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'
import { AppState } from '../AppState'
import { sprintService } from '../services/SprintService'
export default {
  name: 'ProjectSprint',
  setup() {
    const route = useRoute()
    const state = reactive({
      newSprint: {}
    })
    onMounted(async() => {
      try {
        await projectService.getById(route.params.projectId)
        await projectService.getSprintsByProject(route.params.projectId)
      } catch (error) {
        Pop.toast('Error fetching Sprints', error)
      }
    })
    return {
      state,
      project: computed(() => AppState.activeProject),
      sprints: computed(() => AppState.sprints),
      async create() {
        try {
          state.newSprint.projectId = AppState.activeProject.id
          await sprintService.create(state.newSprint)
          await projectService.getSprintsByProject(route.params.projectId)
          state.newSprint = {}
        } catch (error) {
          Pop.toast('We couldn\'t make that Sprint - ', error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hoverable {
  cursor: pointer;
}
</style>
