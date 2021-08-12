<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between align-items-center">
    <p class="pt-3 text-dark">
      {{ note.body }}
    </p>
    <h5 class="pt-3 pb-2 action" @click="destory(note.id, note.taskId)">
      🗑
    </h5>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
import { taskService } from '../services/TaskService'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      task: computed(() => AppState.activeTask),
      async destory(id, taskId) {
        await noteService.destroy(id)
        await taskService.getNotesByTasks(taskId)
      }
    }
  }
}
</script>
