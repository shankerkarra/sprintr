<template>
  <div class="col-md-7 col-7 bg-light d-flex mt-3 justify-content-between">
    <p class="pt-3 text-light hoverable">
      <!-- Params should be BackLog Id -->
      <router-link :to="{ name: 'ProjectBacklogTask', params: {id: backlog.id} }">
        {{ backlog.name }}
      </router-link>
    </p>
    <!-- Params should be TaskID -->
    <h5 class="pt-3 hoverable" @click="destory(id)">
      🗑
    </h5>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { projectService } from '../services/ProjectService'
import { taskService } from '../services/TaskService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default {
  props: {
    backlog: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      // backlogItem: computed(() => AppState.backlogitems),
      async destory(projectid, id) {
        logger.log(AppState.tasks)
        logger.log(projectid)
        await taskService.destroy(id)
        await projectService.getTasksByProject(projectid, backlog.id)
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
