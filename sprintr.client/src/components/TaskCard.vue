<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between">
    <h5 class="pt-3 pb-2">
      <span class="action" data-toggle="modal" :data-target="'#Task' + task.id" @click="current">{{ task.name }}</span>
    </h5>
    <h5 class="pt-3 pb-2 action" @click="destory(task.id, backlog.id)">
      🗑
    </h5>
  </div>

  <!-- Tasks Modal -->
  <div class="modal fade"
       :id="'Task' + task.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="tasksTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <h5 class="modal-title" id="tasksTitle">
            Task Details
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between">
            <h5>{{ task.name }} </h5>
            <h5>{{ task.weight }} ⚖</h5>
          </div>
          <div class="pt-2">
            <form action="">
              <div class="form-group">
                <label for="task-selection">Current Task Status : {{ task.status }}</label>
                <select class="form-control" id="task-selection">
                  <option v-if="task.status !== 'pending'">
                    pending
                  </option>
                  <option v-if="task.status !== 'in-progress'">
                    in-progress
                  </option>
                  <option v-if="task.status !== 'review'">
                    review
                  </option>
                  <option v-if="task.status !== 'done'">
                    done
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="pt-2">
            <form action="">
              <div class="form-group">
                <label for="task-selection">Current Task's Sprint :</label>
                <select class="form-control" id="task-selection">
                  <option v-if="!task.sprintId">
                    None Assigned
                  </option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <div class="col-md-2 col-2">
            <button type="button" class="btn btn-dark" data-dismiss="modal" data-toggle="modal" :data-target="'#Notes' + task.id">
              Notes
            </button>
          </div>
          <div class="col-md-5 col-8 d-flex justify-content-end">
            <button type="button" class="btn btn-danger" data-dismiss="modal">
              Cancel
            </button>
            <button type="button" class="btn btn-primary ml-3" data-dismiss="modal">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Notes Modal -->
  <div class="modal fade"
       :id="'Notes' + task.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="notesTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header justify-content-between">
          <h5 class="modal-title" id="notesTitle">
            Notes for {{ task.name }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-start">
            <div class="post-form">
              <form class="d-flex" @submit.prevent="create">
                <div class="form-group col-md-12 pt-3">
                  <input
                    type="text"
                    name="body"
                    class="form-control"
                    v-model="state.newNote.body"
                    placeholder="Leave a note..."
                    required
                  />
                </div>
                <div class="d-flex align-items-center">
                  <button type="submit" class="btn btn-outline-dark">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div class="pt-2">
            <NotesCard v-for="n in notes" :key="n.id" :note="n" />
          </div>
        </div>
        <div class="modal-footer justify-content-between">
          <div class="col-md-2 col-2">
            <button type="button" class="btn btn-dark" data-dismiss="modal" data-toggle="modal" :data-target="'#Task' + task.id">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
import { backlogService } from '../services/BacklogService'
import Pop from '../utils/Notifier'
import { noteService } from '../services/NoteService'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newNote: { }
    })
    return {
      state,
      account: computed(() => AppState.account),
      backlog: computed(() => AppState.activeBacklog),
      notes: computed(() => AppState.notes),
      async current() {
        await taskService.getTaskById(props.task.id)
        await taskService.getNotesByTasks(AppState.activeTask.id)
      },
      async destory(id, backlogId) {
        await taskService.destroy(id)
        await backlogService.getTasksbyBacklog(backlogId)
      },
      async create() {
        try {
          state.newNote.taskId = AppState.activeTask.id
          await noteService.create(state.newNote)
          await taskService.getNotesByTasks(AppState.activeTask.id)
          state.newNote = {}
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
 .action{
   cursor: pointer;
   &:hover {
    color: blue;
  }
 }
</style>
