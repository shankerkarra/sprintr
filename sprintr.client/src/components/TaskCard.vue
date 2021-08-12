<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between">
    <p class="pt-3 text-dark hoverable">
      {{ task.name }}
    </p>
    <h5 class="pt-3 hoverable" @click="destory(task.id, backlog.id)">
      🗑
    </h5>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { taskService } from '../services/TaskService'
import { backlogService } from '../services/BacklogService'
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      backlog: computed(() => AppState.activeBacklog),
      async destory(id, backlogId) {
        await taskService.destroy(id)
        await backlogService.getTasksbyBacklog(backlogId)
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
