<template>
  <div class="row bg-dark justify-content-start">
    <div class="col-md-2 col-12 text-light">
      <h5 class="hoverable pt-1" data-toggle="modal" data-target="#backlogInfo">
        {{ backlog.name }}
      </h5>

      <div class="modal fade"
           id="backlogInfo"
           tabindex="-1"
           role="dialog"
           aria-labelledby="backlogInfoTitle"
           aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered text-dark" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                {{ backlog.name }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="!backlog.body">
              <p>No Description Provided</p>
              <div class="pt-3" v-if="backlog.isOpen">
                Tasks can be created and tracked
              </div>
              <div class="pt-3" v-else>
                🎉 Feature Complete
              </div>
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(backlog.id)">
                🗑
              </h5>
            </div>
            <div class="modal-body" v-else>
              <p>{{ backlog.body }}</p>
              <div class="pt-3" v-if="backlog.isOpen">
                Tasks can be created and tracked
              </div>
              <div class="pt-3" v-else>
                🎉 Feature Complete
              </div>
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(backlog.id)">
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
  </div>
  <!-- <div class="row justify-content-center mt-3">
    <TaskCard v-for="b in backlogs" :key="b.id" :backlog="b" />
    Cross check whether we are passing the Backlog Id
  </div> -->
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import { projectService } from '../services/ProjectService'
import { taskService } from '../services/TaskService'
import { backlogService } from '../services/BacklogService'
export default {
  name: 'BackLogItems',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newTask: { }
      // defaulting the SprintId = ''
    })
    onMounted(async() => {
      try {
        await backlogService.getById(route.params.id)
        await backlogService.getTasksbyBacklog(route.params.id)
      } catch (error) {
        Pop.toast('Error fetching Backlogs', error)
      }
    })
    return {
      state,
      backlog: computed(() => AppState.activeBacklog),
      async destroy(id) {
        await projectService.destroy(id)
        router.push({ name: 'ProjectBacklog' })
        // Re-check the routing Page
      },
      async create() {
        try {
          await taskService.create(state.newtask)
          await backlogService.getTasksbyBacklog()
          state.newTask = {}
        } catch (error) {
          Pop.toast('We couldn\'t make that Task - ', error)
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
