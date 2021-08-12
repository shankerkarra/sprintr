<template>
  <div class="row bg-dark justify-content-between">
    <div class="col-md-3 col-8 text-light ">
      <h5 class="hoverable pt-1"
          data-toggle="modal"
          data-target="#backlogInfo"
      >
        {{ backlogitem.name }}
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
                {{ backlogitem.name }}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" v-if="!backlogitem.body">
              <p>No Description Provided</p>
              <div class="pt-3" v-if="backlogitem.isOpen">
                Tasks can be created and tracked
              </div>
              <div class="pt-3" v-else>
                🎉 Feature Complete
              </div>
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(backlogitem.id)">
                🗑
              </h5>
            </div>
            <div class="modal-body" v-else>
              <p>{{ backlogitem.body }}</p>
              <div class="pt-3" v-if="backlogitem.isOpen">
                Tasks can be created and tracked
              </div>
              <div class="pt-3" v-else>
                🎉 Feature Complete
              </div>
              <h5 class="pt-3 hoverable text-right pr-3" data-dismiss="modal" @click="destroy(backlogitem.id)">
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
    <div class="col-md-2 col-4 border-left border-light text-light text-center pt-1">
      <span class="hoverable" data-toggle="modal" data-target="#taskCreation"> Create Task</span>

      <div class="modal fade"
           id="taskCreation"
           tabindex="-1"
           role="dialog"
           aria-labelledby="taskCreationLabel"
           aria-hidden="true"
      >
        <div class="modal-dialog text-dark text-left" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="taskCreationLabel">
                New Task
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="create()">
                <div class="form-group">
                  <label for="task-name" class="col-form-label">Name:</label>
                  <input type="text" class="form-control" v-model="state.newTask.name" id="task-name" required>
                </div>
                <div class="form-group">
                  <label for="task-weight" class="col-form-label">Weight:</label>
                  <input type="number" class="form-control" v-model="state.newTask.weight" id="task-weight" required>
                </div>
                <div class="form-group">
                  <label for="task-selection">Task Status</label>
                  <select class="form-control" v-model="state.newTask.status" id="task-selection">
                    <option>pending</option>
                    <option>in-progress</option>
                    <option>review</option>
                    <option>done</option>
                  </select>
                </div>
                <div class="d-flex justify-content-between">
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
  </div>
  <div class="row justify-content-center mt-3">
    <TaskCard v-for="t in tasks" :key="t.id" :task="t" />
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { useRoute, useRouter } from 'vue-router'
import Pop from '../utils/Notifier'
import { taskService } from '../services/TaskService'
import { backlogService } from '../services/BacklogService'
import { logger } from '../utils/Logger'
export default {
  name: 'BackLogItems',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      newTask: { }
    })
    onMounted(async() => {
      try {
        await backlogService.getById(route.params.backlogId)
        await backlogService.getTasksbyBacklog(route.params.backlogId)
      } catch (error) {
        Pop.toast('Error fetching Backlogs', error)
      }
    })
    return {
      state,
      backlogitem: computed(() => AppState.activeBacklog),
      tasks: computed(() => AppState.tasks),
      totalWeight(total) {
        logger.log(total)
      },
      async destroy(id) {
        await backlogService.destroy(id)
        router.push({ name: 'ProjectBacklog' })
      },
      async create() {
        try {
          state.newTask.projectId = AppState.activeBacklog.projectId
          state.newTask.backlogId = AppState.activeBacklog.id
          await taskService.create(state.newTask)
          await backlogService.getTasksbyBacklog(route.params.backlogId)
          state.newTask = { }
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
