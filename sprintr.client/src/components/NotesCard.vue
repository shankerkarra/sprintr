<template>
  <div class="row bg-dark mt-3">
    <div class="col-md-12 col-12 d-flex justify-content-between align-items-center">
      <p class="pt-3 text-light">
        {{ note.body }}
      </p>
    </div>
    <div class="col-md-12 col-12 d-flex justify-content-around align-items-center">
      <p class="pt-3 text-light">
        {{ account.name }}
      </p>
      <img class="rounded-circle" :src="account.picture" alt="Image" height="40">
      <h5 class="pt-3 pb-2 hoverable" @click="destory(note.id, note.taskId)">
        🗑
      </h5>
    </div>
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
      account: computed(() => AppState.account),
      task: computed(() => AppState.activeTask),
      async destory(id, taskId) {
        await noteService.destroy(id)
        await taskService.getNotesByTasks(taskId)
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
