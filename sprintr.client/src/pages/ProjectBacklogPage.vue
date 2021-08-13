<template>
  <div class="row bg-dark justify-content-start">
    <div class="col-md-2 col-12 text-light">
      <h5 class="hoverable pt-1" data-toggle="modal" data-target="#projectInfo">
        {{ project.name }}
      </h5>

      <div class="modal fade"
           id="projectInfo"
           tabindex="-1"
           role="dialog"
           aria-labelledby="projectInfoTitle"
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
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(project.id)">
                🗑
              </h5>
            </div>
            <div class="modal-body" v-else>
              <p>{{ project.description }}</p>
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(project.id)">
                🗑
              </h5>
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
    <div class="col-md-2 col-6 border-left border-right border-bottom border-dark text-center bg-light">
      <h4> Backlog </h4>
    </div>
    <div class="col-md-2 col-6 border-right border-bottom border-dark text-center bg-grey">
      <router-link :to="{ name: 'ProjectSprint', params: {projectId: project.id} }">
        <h4> Sprint </h4>
      </router-link>
    </div>
  </div>
  <div class="row mt-2 justify-content-center">
    <button type="button" class="btn btn-outline-dark" data-toggle="modal" data-target="#backlogCreation">
      Make Backlog Items
    </button>
    <div class="modal fade"
         id="backlogCreation"
         tabindex="-1"
         role="dialog"
         aria-labelledby="backlogCreationLabel"
         aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="backlogCreationLabel">
              New Backlog Item
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="create()">
              <div class="form-group">
                <label for="backlog-name" class="col-form-label">Name:</label>
                <input type="text" class="form-control" v-model="state.newBacklog.name" id="backlog-name" required>
              </div>
              <div class="form-group">
                <label for="backlog-body" class="col-form-label">Description:</label>
                <textarea class="form-control" v-model="state.newBacklog.body" id="backlog-body"></textarea>
              </div>
              <div class="d-flex justify-content-between">
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="isOpen" v-model="state.newBacklog.isOpen">
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
    <BackLogCard v-for="b in backlogs" :key="b.id" :backlog="b" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { backlogService } from '../services/BacklogService'

export default {
  name: 'ProjectBacklog',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newBacklog: {}
    })
    onMounted(async() => {
      try {
        await projectService.getById(route.params.projectId)
        await projectService.getBacklogByProject(route.params.projectId)
      } catch (error) {
        Pop.toast('Error fetching Sprints', error)
      }
    })
    return {
      state,
      project: computed(() => AppState.activeProject),
      backlogs: computed(() => AppState.backlogitems),
      async destroy(id) {
        await projectService.destroy(id)
        router.push({ name: 'Home' })
      },
      async create() {
        try {
          //       logger.log('The forms info -', state.newBacklog)
          state.newBacklog.projectId = AppState.activeProject.id
          await backlogService.create(state.newBacklog)
          await projectService.getBacklogByProject(route.params.projectId)
          state.newBacklog = {}
        } catch (error) {
          Pop.toast('We couldn\'t make that Backlog Item - ', error)
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
